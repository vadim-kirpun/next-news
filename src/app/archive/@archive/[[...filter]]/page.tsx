import { ArchiveSlot } from "@/components/archive-slot";

type ArchiveFilterPageProps = {
  params: Promise<{ filter?: string[] }>;
};

export default async function ArchiveFilterPage({
  params,
}: ArchiveFilterPageProps) {
  const { filter } = await params;
  const year = filter?.[0];
  const month = filter?.[1];

  return <ArchiveSlot year={year} month={month} />;
}
