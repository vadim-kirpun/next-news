import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { H3, Muted } from "@/components/ui/typography";
import { getNewsImageSrc, type NewsItem } from "@/data/news";
import { cn } from "@/lib/utils";

const cardClassName =
  "overflow-hidden rounded-3xl border-border/60 bg-card/85 shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.35)]";

type NewsCardProps = {
  newsItem: NewsItem;
  variant?: "default" | "compact" | "featured";
};

export function NewsCard({ newsItem, variant = "default" }: NewsCardProps) {
  const articleHref = `/news/${newsItem.id}`;

  if (variant === "featured") {
    return (
      <Card className={cardClassName}>
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={getNewsImageSrc(newsItem.image)}
            alt={newsItem.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 512px"
          />
        </div>
        <CardHeader>
          <CardDescription>{newsItem.date}</CardDescription>
          <H3 className="text-2xl">{newsItem.title}</H3>
        </CardHeader>
        <CardContent className="space-y-4">
          <Muted className="leading-7">{newsItem.content}</Muted>
          <Button
            render={<Link href={articleHref} />}
            variant="outline"
            className="rounded-full px-5"
          >
            Read article
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isCompact = variant === "compact";

  return (
    <Card className={cardClassName}>
      <div className="flex flex-col sm:flex-row">
        <div
          className={cn(
            "relative aspect-[16/9] w-full sm:aspect-[4/3] sm:shrink-0",
            isCompact ? "sm:w-40" : "sm:w-56",
          )}
        >
          <Image
            src={getNewsImageSrc(newsItem.image)}
            alt={newsItem.title}
            fill
            className="object-cover"
            sizes={
              isCompact
                ? "(max-width: 640px) 100vw, 160px"
                : "(max-width: 640px) 100vw, 224px"
            }
          />
        </div>
        <div className="flex flex-1 flex-col">
          <CardHeader className={cn(isCompact && "pb-2")}>
            {isCompact ? (
              <>
                <CardDescription>{newsItem.date}</CardDescription>
                <H3 className="text-xl">{newsItem.title}</H3>
              </>
            ) : (
              <>
                <H3 className="text-2xl">{newsItem.title}</H3>
                <CardDescription>{newsItem.date}</CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent
            className={cn(
              "mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between",
              isCompact ? "gap-4" : "gap-5",
            )}
          >
            <Muted
              className={cn(
                "leading-7",
                isCompact ? "line-clamp-2 max-w-xl" : "max-w-2xl",
              )}
            >
              {newsItem.content}
            </Muted>
            <Button
              render={<Link href={articleHref} />}
              variant="outline"
              className="w-fit rounded-full px-5"
            >
              Open
            </Button>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
