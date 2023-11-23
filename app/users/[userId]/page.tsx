import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "@/src/query/user.query";
import { notFound, redirect } from "next/navigation";
import { Profile } from "./Profile";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { followUser } from "./follow.action";
import Post from "@/src/feature/post/Post";
import { Metadata } from "next";

type UserPageProps = {
    params: {
        userId: string
    }
};

export const generateMetadata = async ({params}: UserPageProps): Promise<Metadata> => {
    const user = await getUserProfile(params.userId);
    if(!user) {
        throw new Error("User not found");
    }
    return {
        title: `${user.name} (${user?.username})`
    }
}

const removeHttp = (url: string) => {
    return url.replace(/(^\w+:|^)\/\//, '');
  };

  
const UserPage = async ({
    params
}: UserPageProps) => {
    const session = await getAuthSession();
    const user = await getUserProfile(params.userId);

    if(!user) {
        return notFound();
    }
    console.log(user.posts);

    const isFollowing = session?.user.id ? await prisma.follow.findFirst({
        where: {
            followerId: session.user.id,
            followingId: user.id
        },
        select: {
            id: true
        }
    }) : null;

    const isCurrentUser = params.userId === session?.user.id;

    if(isCurrentUser) {
        redirect('/profile');
    }

    return (
        <div>
            <Profile user={user}>
                <form className="mt-4">
                    <Button
                        variant={'outline'}
                        formAction={async () => {
                            "use server";

                            if(!session?.user.id) {
                                return;
                            }
                            await followUser(params.userId);
                        }}
                    >
                        {
                            isFollowing ? "Unfollow" : "Follow"
                        }
                    </Button>
                </form> 
            </Profile>
            <div className="divide-y divide-muted border-t border-accent mt-4">
            {
                user.posts.map((p) => (
                    <Post key={p.id} post={p} />
                ))
            }
            </div>
        </div>
    );
}
 
export default UserPage;