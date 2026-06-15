import type { Metadata } from "next";

import { isValidNewsMonth, isValidNewsYear } from "@/entities/news/server";
import { createArchiveMetadata } from "@/shared/lib/metadata";
import { ArchivePanel } from "@/widgets/archive-panel";

type ArchiveFilterPageProps = {
  params: Promise<{ filter?: string[] }>;
};

export async function generateMetadata({
  params,
}: ArchiveFilterPageProps): Promise<Metadata> {
  const { filter } = await params;

  return createArchiveMetadata(filter?.[0], filter?.[1]);
}

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

  return <ArchivePanel year={year} month={month} />;
}
