import { NewsCard } from "@/components/news-card";
import { H3 } from "@/components/ui/typography";
import { getLatestNewsItem } from "@/lib/news";

export async function LatestNewsSlot() {
  const latestNews = await getLatestNewsItem();

  return (
    <>
      <H3 className="text-lg font-semibold">Latest</H3>
      <NewsCard newsItem={latestNews} variant="featured" />
    </>
  );
}
