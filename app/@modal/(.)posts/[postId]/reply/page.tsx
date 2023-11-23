import { WriteModal } from '@/app/@modal/(.)write/WriteModal';
import { createReply } from '@/app/posts/[postId]/reply/write-reply.action';
import { createPost } from '@/app/write/write-post.action';
import { getUser } from '@/src/query/user.query';

export default async function Page({
    params
}: {
    params: {
        postId: string
    }
}) {
  const user = await getUser();

  return <WriteModal path="reply" user={user} createPost={async (values) => {
    "use server";
    const reply = await createReply(params.postId, values);
    return reply;
  }} />;
}