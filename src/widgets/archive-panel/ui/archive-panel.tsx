import Link from "next/link";

import { getNewsLikeInfo } from "@/entities/like/server";
import {
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/entities/news/server";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { H3, Muted } from "@/shared/ui/typography";
import { NewsCard } from "@/widgets/news-card";

type ArchivePanelProps = {
  year?: string;
  month?: string;
};

function formatMonthName(month: number, year: number | string): string {
  return new Intl.DateTimeFormat("en", { month: "long" }).format(
    new Date(Number(year), month - 1, 1),
  );
}

export async function ArchivePanel({ year, month }: ArchivePanelProps) {
  const years = await getAvailableNewsYears();
  const months = year ? await getAvailableNewsMonths(year) : [];
  const news = year
    ? month
      ? await getNewsForYearAndMonth(year, month)
      : await getNewsForYear(year)
    : [];
  const likeInfoByNewsId = await getNewsLikeInfo(news.map((item) => item.id));

  const title = year
    ? month
      ? `Archive — ${formatMonthName(Number(month), year)} ${year}`
      : `Archive — ${year}`
    : "Archive";

  return (
    <div className="space-y-4">
      <H3 className="text-lg font-semibold">{title}</H3>

      <nav aria-label="Archive years" className="flex flex-wrap gap-2">
        {years.map((item) => (
          <Button
            key={item}
            render={<Link href={`/archive/${item}`} />}
            variant={year === String(item) ? "default" : "outline"}
            className={cn(
              "rounded-full px-5",
              year !== String(item) && "bg-transparent",
            )}
          >
            {item}
          </Button>
        ))}
      </nav>

      {year && months.length > 0 ? (
        <nav aria-label="Archive months" className="flex flex-wrap gap-2">
          <Button
            render={<Link href={`/archive/${year}`} />}
            variant={!month ? "default" : "outline"}
            className={cn("rounded-full px-5", month && "bg-transparent")}
          >
            All months
          </Button>

          {months.map((item) => (
            <Button
              key={item}
              render={<Link href={`/archive/${year}/${item}`} />}
              variant={month === String(item) ? "default" : "outline"}
              className={cn(
                "rounded-full px-5",
                month !== String(item) && "bg-transparent",
              )}
            >
              {formatMonthName(item, year)}
            </Button>
          ))}
        </nav>
      ) : null}

      {!year ? (
        <Muted>Select a year to browse archived news.</Muted>
      ) : news.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No news for this filter.
        </p>
      ) : (
        <ul className="grid gap-4">
          {news.map((newsItem) => (
            <li key={newsItem.id}>
              <NewsCard
                newsItem={newsItem}
                variant="compact"
                likeInfo={likeInfoByNewsId[newsItem.id]}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
