import { MainHeader } from "@/components/main-header";
import { Separator } from "@/components/ui/separator";
import { H1, Lead } from "@/components/ui/typography";

type ArchiveLayoutProps = {
  children: React.ReactNode;
  archive: React.ReactNode;
  latest: React.ReactNode;
};

export default function ArchiveLayout({
  children,
  archive,
  latest,
}: ArchiveLayoutProps) {
  return (
    <div className="min-h-full bg-gradient-to-b from-muted/40 via-background to-background dark:from-zinc-950 dark:via-background dark:to-zinc-950">
      <MainHeader currentPath="/archive" />

      <main className="mx-auto w-full max-w-5xl px-6 py-14">
        <div className="mb-8 space-y-3">
          <H1 className="font-semibold">Archive</H1>
          <Lead className="max-w-2xl text-base">
            Parallel routes: latest story and older articles rendered in
            separate slots.
          </Lead>
          <Separator className="mt-6" />
        </div>

        {children}

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="space-y-4">{latest}</section>
          <section className="space-y-4">{archive}</section>
        </div>
      </main>
    </div>
  );
}
