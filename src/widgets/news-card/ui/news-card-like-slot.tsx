import { getNewsLikeInfo } from "@/entities/like/server";
import { NewsLikeButton } from "@/features/toggle-news-like";

type NewsCardLikeSlotProps = {
  newsId: string;
};

export async function NewsCardLikeSlot({ newsId }: NewsCardLikeSlotProps) {
  const likeInfo = (await getNewsLikeInfo([newsId]))[newsId];

  return (
    <NewsLikeButton
      newsId={newsId}
      initialIsLiked={likeInfo?.isLiked ?? false}
      initialLikeCount={likeInfo?.likeCount ?? 0}
    />
  );
}
