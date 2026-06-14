import Image from "next/image";
import Link from "next/link";
import { getNewsImageSrc } from "@/entities/news";
import { getLatestNewsItem } from "@/entities/news/server";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/shared/ui/card";
import { H1, H3, Lead, Muted } from "@/shared/ui/typography";

export default async function Home() {
  const featuredNews = await getLatestNewsItem();

  return (
    <div className="min-h-full bg-gradient-to-b from-muted/40 via-background to-background dark:from-zinc-950 dark:via-background dark:to-zinc-950">
      <main className="mx-auto w-full max-w-5xl px-6 py-14">
        <section className="mb-10 space-y-4">
          <Badge variant="outline" className="rounded-full px-3 py-1">
            Apple-inspired UI
          </Badge>

          <H1 className="max-w-3xl font-semibold text-foreground sm:text-5xl">
            News product starter with clean hierarchy and soft depth.
          </H1>

          <Lead className="max-w-2xl text-base leading-7">
            Built with Next.js and shadcn/ui. Explore the full news feed and
            open each article with a dedicated route.
          </Lead>

          <Button
            render={<Link href="/news" />}
            className="mt-2 rounded-full px-6 font-medium"
          >
            Browse News
          </Button>
        </section>

        <section>
          <Card className="overflow-hidden rounded-3xl border-border/60 bg-card/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={getNewsImageSrc(featuredNews.image)}
                alt={featuredNews.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>

            <CardHeader>
              <CardDescription>Featured story</CardDescription>
              <H3 className="text-2xl">{featuredNews.title}</H3>
            </CardHeader>

            <CardContent className="space-y-4">
              <Muted className="leading-7">{featuredNews.content}</Muted>

              <Button
                render={<Link href={`/news/${featuredNews.id}`} />}
                variant="outline"
                className="rounded-full px-5"
              >
                Read Article
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
