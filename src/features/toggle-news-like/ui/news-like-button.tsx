"use client";

import { Heart } from "lucide-react";
import { useOptimistic, useTransition } from "react";
import { toggleLikeAction } from "@/features/toggle-news-like/actions/toggle-like";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

type NewsLikeButtonProps = {
  newsId: string;
  initialIsLiked: boolean;
  initialLikeCount: number;
  className?: string;
};

export function NewsLikeButton({
  newsId,
  initialIsLiked,
  initialLikeCount,
  className,
}: NewsLikeButtonProps) {
  const [isPending, startTransition] = useTransition();

  const [likeState, setOptimisticLike] = useOptimistic(
    { isLiked: initialIsLiked, likeCount: initialLikeCount },
    (current, nextIsLiked: boolean) => ({
      isLiked: nextIsLiked,
      likeCount: Math.max(0, current.likeCount + (nextIsLiked ? 1 : -1)),
    }),
  );

  function handleClick() {
    const nextIsLiked = !likeState.isLiked;

    startTransition(async () => {
      setOptimisticLike(nextIsLiked);
      await toggleLikeAction(newsId);
    });
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={isPending}
      aria-label={likeState.isLiked ? "Unlike article" : "Like article"}
      aria-pressed={likeState.isLiked}
      className={cn(
        "rounded-full px-3 text-muted-foreground hover:text-foreground",
        likeState.isLiked && "text-red-500 hover:text-red-600",
        className,
      )}
    >
      <Heart
        className={cn(
          "size-4",
          likeState.isLiked && "fill-current text-red-500",
        )}
      />
      <span className="min-w-[1ch] tabular-nums">{likeState.likeCount}</span>
    </Button>
  );
}
