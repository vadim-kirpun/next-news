import Link from "next/link";

import { NewsCard } from "@/components/news-card";
import { Button } from "@/components/ui/button";
import { H3, Muted } from "@/components/ui/typography";
import {
  getAvailableNewsYears,
  getNewsForYear,
  getNewsForYearAndMonth,
} from "@/lib/news";
import { cn } from "@/lib/utils";

type ArchiveSlotProps = {
  year?: string;
  month?: string;
};

export function ArchiveSlot({ year, month }: ArchiveSlotProps) {
  const years = getAvailableNewsYears();
  const news = year
    ? month
      ? getNewsForYearAndMonth(year, month)
      : getNewsForYear(year)
    : [];

  const title = year
    ? month
      ? `Archive — ${year}/${month}`
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

      {!year ? (
        <Muted>Select a year to browse archived news.</Muted>
      ) : news.length === 0 ? (
        <p className="text-muted-foreground text-sm">No news for this filter.</p>
      ) : (
        <ul className="grid gap-4">
          {news.map((newsItem) => (
            <li key={newsItem.id}>
              <NewsCard newsItem={newsItem} variant="compact" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
