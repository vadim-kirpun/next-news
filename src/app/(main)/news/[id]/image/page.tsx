import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNewsById } from "@/entities/news/server";
import { createArticleImageMetadata } from "@/shared/lib/metadata";
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
    return {
      title: "Image not found",
      description: "The requested article image could not be found.",
    };
  }

  return createArticleImageMetadata(article);
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
