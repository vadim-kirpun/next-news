import { ArchiveSlot } from "@/components/archive-slot";
import { isValidNewsMonth, isValidNewsYear } from "@/lib/news";

type ArchiveFilterPageProps = {
  params: Promise<{ filter?: string[] }>;
};

export default async function ArchiveFilterPage({
  params,
}: ArchiveFilterPageProps) {
  const { filter } = await params;
  const year = filter?.[0];
  const month = filter?.[1];

  if (year && !(await isValidNewsYear(year))) {
    throw new Error("Invalid year entered.");
  }

  if (month && (!year || !(await isValidNewsMonth(year, month)))) {
    throw new Error("Invalid month entered.");
  }

  return <ArchiveSlot year={year} month={month} />;
}
