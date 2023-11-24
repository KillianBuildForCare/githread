"use client";

import { Loader } from "@/components/ui/loader";
import clsx from "clsx";
import { Heart, MessageCircle } from "lucide-react";
import { useTransition } from "react";
import { likeAction } from "./like.action";
import { getAuthSession } from "@/lib/auth";
import { useRouter } from "next/navigation";

const CommentButton = ({
    postId,
    userId
} : {
    postId: string,
    userId?: string
}) => {

    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    return (
        <button
            className={clsx("rounded-md hover:bg-accent flex gap-1 items-center", {
                'cursor-not-allowed': !userId
            })}
            onClick={() => {
                    if(userId) router.push(`/posts/${postId}/reply`);
                }
            }
        >
            <MessageCircle size={20}/>
        </button>
    );
}
 
export default CommentButton;