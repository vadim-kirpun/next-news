import { getLatestNewsItem } from "@/entities/news/server";
import { H3 } from "@/shared/ui/typography";
import { NewsCard } from "@/widgets/news-card";

export async function LatestNewsPanel() {
  const latestNews = await getLatestNewsItem();

  return (
    <>
      <H3 className="text-lg font-semibold">Latest</H3>
      <NewsCard newsItem={latestNews} variant="featured" />
    </>
  );
}
