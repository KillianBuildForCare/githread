import { getUser } from "@/src/query/user.query";
import WritePostForm from "./WritePostForm"
import { createPost } from "./write-post.action";

const write = async () => {
    const user = await getUser();

    return (
        <WritePostForm user={user} onSubmit={createPost}/>
    );
}
 
export default write;