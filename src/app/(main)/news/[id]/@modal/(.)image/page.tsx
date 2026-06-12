import { notFound } from "next/navigation";

import { NewsImageViewer } from "@/components/news-image-viewer";
import { getNewsById } from "@/lib/news";

type NewsImageModalProps = {
  params: Promise<{ id: string }>;
};

export default async function NewsImageModal({ params }: NewsImageModalProps) {
  const { id } = await params;
  const article = getNewsById(id);

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
