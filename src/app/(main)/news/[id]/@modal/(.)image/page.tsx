import { notFound } from "next/navigation";
import { getNewsById } from "@/entities/news/server";
import { NewsImageViewer } from "@/widgets/news-image-viewer";

type NewsImageModalProps = {
  params: Promise<{ id: string }>;
};

export default async function NewsImageModal({ params }: NewsImageModalProps) {
  const { id } = await params;
  const article = await getNewsById(id);

  if (!article) {
    notFound();
  }

  return (
    <NewsImageViewer
      article={article}
      closeHref={`/news/${id}`}
      variant="modal"
    />
  );
}
