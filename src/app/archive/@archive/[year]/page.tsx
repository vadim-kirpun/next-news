import { NewsCard } from "@/components/news-card";
import { H3 } from "@/components/ui/typography";
import { getNewsForYear } from "@/lib/news";

type ArchiveYearNewsProps = {
  params: Promise<{ year: string }>;
};

export default async function ArchiveYearNews({ params }: ArchiveYearNewsProps) {
  const { year } = await params;
  const news = getNewsForYear(year);

  return (
    <>
      <H3 className="text-lg font-semibold">Archive — {year}</H3>

      {news.length === 0 ? (
        <p className="text-muted-foreground text-sm">No news for this year.</p>
      ) : (
        <ul className="grid gap-4">
          {news.map((newsItem) => (
            <li key={newsItem.id}>
              <NewsCard newsItem={newsItem} variant="compact" />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
