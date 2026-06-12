import { MainHeader } from "@/components/main-header";
import { NewsCard } from "@/components/news-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { H1, H3, Lead } from "@/components/ui/typography";
import { getAllNews } from "@/lib/news";

export default function NewsPage() {
  const news = getAllNews();

  return (
    <div className="min-h-full bg-gradient-to-b from-muted/40 via-background to-background dark:from-zinc-950 dark:via-background dark:to-zinc-950">
      <MainHeader currentPath="/news" />
      <main className="mx-auto w-full max-w-5xl px-6 py-14">
        <div className="mb-8 space-y-3">
          <H1 className="font-semibold">News</H1>
          <Lead className="max-w-2xl text-base">
            Product and engineering updates presented in a clean editorial
            format.
          </Lead>
          <div className="max-w-md">
            <Input placeholder="Search (dummy UI)" aria-label="Search news" />
          </div>
          <Separator className="mt-6" />
        </div>

        <section className="grid gap-5">
          {news.map((newsItem) => (
            <NewsCard key={newsItem.id} newsItem={newsItem} />
          ))}
          <Card className="rounded-3xl border-dashed border-border/60 bg-card/70">
            <CardHeader>
              <H3 className="text-lg">Loading preview block</H3>
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
