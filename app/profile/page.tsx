import { getAuthSession } from "@/lib/auth";
import { getUserProfile } from "@/src/query/user.query";
import { Profile } from "../users/[userId]/Profile";
import { Button, buttonVariants } from "@/components/ui/button";
import Post from "@/src/feature/post/Post";
import { notFound } from "next/navigation";
import Link from "next/link";

const ProfilePage = async () => {
    const session = await getAuthSession();

    if(!session?.user.id) {
        return notFound();
    }

    const user = await getUserProfile(session.user.id);

    if(!user) {
        return notFound();
    }

    return (
        <div>
            <Profile user={user}>
                <form className="mt-4">
                    <Link
                        className={buttonVariants({
                            variant: 'outline'
                        })}
                        href="/profile/edit"
                    >
                        Edit profile
                    </Link>
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
 
export default ProfilePage;