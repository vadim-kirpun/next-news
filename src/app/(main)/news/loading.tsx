import { NewsCardSkeleton } from "@/components/news-skeletons";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-14">
      <div className="mb-8 space-y-3">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-5 w-full max-w-2xl" />
        <Skeleton className="h-10 w-full max-w-md rounded-md" />
        <Skeleton className="mt-6 h-px w-full" />
      </div>

      <div className="grid gap-5">
        {["a", "b", "c", "d", "e"].map((key) => (
          <NewsCardSkeleton key={key} />
        ))}
      </div>
    </main>
  );
}
