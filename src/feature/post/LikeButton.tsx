"use client";

import { Loader } from "@/components/ui/loader";
import clsx from "clsx";
import { Heart } from "lucide-react";
import { useTransition } from "react";
import { likeAction } from "./like.action";

const LikeButton = ({
    postId,
    isLiked
} : {
    postId: string,
    isLiked: boolean
}) => {

    const [isPending, startTransition] = useTransition();

    return (
        <button
            className={clsx("rounded-md hover:bg-accent flex gap-1 items-center", {
                'text-red-600': isLiked
            })}
            onClick={() => startTransition(() => likeAction(postId))}
        >
            {
                isPending ? <Loader size={20} /> : <Heart size={20} />
            }
        </button>
    );
}
 
export default LikeButton;