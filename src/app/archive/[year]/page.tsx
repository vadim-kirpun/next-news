import { ArchiveYearNav } from "@/components/archive-year-nav";

type ArchiveYearPageProps = {
  params: Promise<{ year: string }>;
};

export default async function ArchiveYearPage({ params }: ArchiveYearPageProps) {
  const { year } = await params;

  return <ArchiveYearNav selectedYear={+year} />;
}
