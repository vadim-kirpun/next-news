import { NewsCard } from "@/components/news-card";
import { H3 } from "@/components/ui/typography";
import { getLatestNewsItem } from "@/lib/news";

export default function LatestNewsSlot() {
  const latestNews = getLatestNewsItem();

  return (
    <>
      <H3 className="text-lg font-semibold">Latest</H3>
      <NewsCard newsItem={latestNews} variant="featured" />
    </>
  );
}
