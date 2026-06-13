import Link from "next/link";

import { NewsCard } from "@/components/news-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { H1, Lead } from "@/components/ui/typography";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-14">
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <H1 className="font-semibold">News</H1>

          <Button
            render={<Link href="/news/create" />}
            className="rounded-full px-5"
          >
            Create
          </Button>
        </div>

        <Lead className="max-w-2xl text-base">
          Product and engineering updates presented in a clean editorial format.
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
      </section>
    </main>
  );
}
