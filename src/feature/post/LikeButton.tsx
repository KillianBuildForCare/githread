"use client";

import { Loader } from "@/components/ui/loader";
import clsx from "clsx";
import { Heart } from "lucide-react";
import { useTransition } from "react";
import { likeAction } from "./like.action";
import { getAuthSession } from "@/lib/auth";

const LikeButton = ({
    postId,
    isLiked,
    userId
} : {
    postId: string,
    isLiked: boolean,
    userId?: string
}) => {

    const [isPending, startTransition] = useTransition();

    return (
        <button
            className={clsx("rounded-md hover:bg-accent flex gap-1 items-center", {
                'text-red-600': isLiked,
                'cursor-not-allowed': !userId
            })}
            onClick={() => {
                    if(userId) startTransition(() => likeAction(postId))
                }
            }
        >
            {
                isPending ? <Loader size={20} /> : <Heart size={20} />
            }
        </button>
    );
}
 
export default LikeButton;