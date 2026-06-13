import { cn } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

const cardClassName =
  "overflow-hidden rounded-3xl border-border/60 bg-card/85 shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)]";

export function FeaturedNewsSkeleton() {
  return (
    <Card className={cardClassName}>
      <Skeleton className="aspect-[16/9] w-full rounded-none" />

      <CardHeader className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-2/3" />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        <Skeleton className="h-10 w-32 rounded-full" />
      </CardContent>
    </Card>
  );
}

export function NewsCardSkeleton({
  variant = "default",
}: {
  variant?: "default" | "compact" | "featured";
}) {
  if (variant === "featured") {
    return <FeaturedNewsSkeleton />;
  }

  const isCompact = variant === "compact";

  return (
    <Card className={cardClassName}>
      <div className="flex flex-col sm:flex-row">
        <Skeleton
          className={cn(
            "aspect-[16/9] w-full rounded-none sm:aspect-[4/3] sm:shrink-0",
            isCompact ? "sm:w-40" : "sm:w-56",
          )}
        />

        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className={cn("h-7", isCompact ? "w-3/4" : "w-2/3")} />
          </div>

          <div className="mt-auto space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>

            <Skeleton className="h-10 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function NewsDetailSkeleton() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-14">
      <Card className="overflow-hidden rounded-3xl border-border/60 bg-card/85 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <Skeleton className="aspect-[16/9] w-full rounded-none" />

        <CardHeader className="space-y-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-4 w-28" />
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </div>

          <Skeleton className="h-10 w-36 rounded-full" />
        </CardContent>
      </Card>
    </main>
  );
}

export function HomeFeaturedSkeleton() {
  return (
    <div className="min-h-full bg-gradient-to-b from-muted/40 via-background to-background dark:from-zinc-950 dark:via-background dark:to-zinc-950">
      <main className="mx-auto w-full max-w-5xl px-6 py-14">
        <section className="mb-10 space-y-4">
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-12 w-full max-w-3xl" />
          <Skeleton className="h-12 w-full max-w-2xl" />
          <Skeleton className="h-5 w-full max-w-xl" />
          <Skeleton className="h-10 w-36 rounded-full" />
        </section>

        <FeaturedNewsSkeleton />
      </main>
    </div>
  );
}

export function LatestNewsSlotSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-7 w-20" />
      <FeaturedNewsSkeleton />
    </div>
  );
}

export function ArchiveSlotSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-7 w-40" />

      <div className="flex flex-wrap gap-2">
        {["2024", "2023", "2022", "2021"].map((year) => (
          <Skeleton key={year} className="h-10 w-16 rounded-full" />
        ))}
      </div>

      <Skeleton className="h-4 w-56" />
    </div>
  );
}
