import WritePostForm from "@/app/write/WritePostForm";
import Post from "@/src/feature/post/Post";
import { getPost } from "@/src/query/post.query";
import { getUser } from "@/src/query/user.query";
import { createReply } from "./write-reply.action";
import { notFound } from "next/navigation";

const reply = async ({
    params
}: {
    params: {
        postId: string
    }
}) => {
    const user = await getUser();
    const post = await getPost(params.postId, user.id);

    if(!post) {
        return notFound();
    }

    return (
        <div>
            <Post post={post} />
            <WritePostForm
                user={user}
                onSubmit={async (values) => {
                    "use server";
                    return createReply(post.id, values);
                }} />
        </div>
    );
}
 
export default reply;