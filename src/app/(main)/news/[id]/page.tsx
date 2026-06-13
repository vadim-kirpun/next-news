import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsImageSrc } from "@/entities/news";
import { getNewsById } from "@/entities/news/server";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { H1, Muted, P } from "@/shared/ui/typography";

type NewsDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { id } = await params;
  const article = await getNewsById(id);

  if (!article) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-14">
      <Card className="overflow-hidden rounded-3xl border-border/60 bg-card/85 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <Link
          href={`/news/${id}/image`}
          className="relative block aspect-[16/9] w-full"
        >
          <Image
            src={getNewsImageSrc(article.image)}
            alt={article.title}
            fill
            priority
            className="object-cover transition-opacity hover:opacity-90"
            sizes="(max-width: 896px) 100vw, 896px"
          />
        </Link>

        <CardHeader className="space-y-4">
          <H1 className="text-3xl font-semibold tracking-tight">
            {article.title}
          </H1>

          <Muted>{article.date}</Muted>
        </CardHeader>

        <CardContent className="space-y-8">
          <P className="text-lg leading-8 text-foreground/90">
            {article.content}
          </P>

          <Button
            render={<Link href="/news" />}
            variant="outline"
            className="rounded-full px-5"
          >
            Back to News
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
