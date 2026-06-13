import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsById } from "@/entities/news/server";
import { NewsImageViewer } from "@/widgets/news-image-viewer";

type NewsImagePageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NewsImagePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getNewsById(id);

  if (!article) {
    return { title: "Image not found" };
  }

  return {
    title: `${article.title} — Image`,
  };
}

export default async function NewsImagePage({ params }: NewsImagePageProps) {
  const { id } = await params;
  const article = await getNewsById(id);

  if (!article) {
    notFound();
  }

  return (
    <NewsImageViewer
      article={article}
      closeHref={`/news/${id}`}
      variant="fullscreen"
    />
  );
}
