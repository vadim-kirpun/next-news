import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getAvailableNewsYears } from "@/lib/news";
import { cn } from "@/lib/utils";

type ArchiveYearNavProps = {
  selectedYear?: number;
};

export function ArchiveYearNav({ selectedYear }: ArchiveYearNavProps) {
  const years = getAvailableNewsYears();

  return (
    <nav aria-label="Archive years" className="mb-8 flex flex-wrap gap-2">
      {years.map((year) => (
        <Button
          key={year}
          render={<Link href={`/archive/${year}`} />}
          variant={selectedYear === year ? "default" : "outline"}
          className={cn("rounded-full px-5", selectedYear !== year && "bg-transparent")}
        >
          {year}
        </Button>
      ))}
    </nav>
  );
}
