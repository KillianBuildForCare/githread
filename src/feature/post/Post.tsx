import Link from "next/link";
import { PostHome } from "../../query/post.query";
import PostLayout from "./PostLayout";
import { Button, buttonVariants } from "@/components/ui/button";
import { Heart, MessageCircle } from "lucide-react";
import LikeButton from "./LikeButton";
import { getAuthSession } from "@/lib/auth";
import CommentButton from "./CommentButton";

type PostProps = {
    post: PostHome
}

const Post = async ({post}: PostProps) => {
    const session = await getAuthSession();
    console.log('ici', post.likes)
    return (
        <PostLayout user={post.user} postId={post.id} createdAt={post.createdAt}>
            <Link href={`/posts/${post.id}`} className="text-sm text-foreground">
                {post.content}
            </Link>
            <div className="flex items-center gap-2 mt-4">
                <LikeButton postId={post.id} isLiked={post.likes.filter((l) => l.userId === session?.user.id && session?.user.id).length > 0} userId={session?.user.id} />
                <CommentButton postId={post.id} userId={session?.user.id} />
            </div>
            <div>
                <Link className="text-muted-forground text-sm" href={`/posts/${post.id}`}>
                    {post._count.likes} likes
                </Link>
                { ' · '}
                <Link className="text-muted-forground text-sm" href={`/posts/${post.id}`}>
                    {post._count.replies} comments
                </Link>
            </div>
        </PostLayout>
    );
}
 
export default Post;