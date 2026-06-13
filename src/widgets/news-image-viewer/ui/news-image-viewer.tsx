import Image from "next/image";
import { getNewsImageSrc, type NewsItem } from "@/entities/news";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { NewsImageCloseButton } from "./news-image-close-button";

type NewsImageViewerProps = {
  article: NewsItem;
  closeHref: string;
  variant: "modal" | "fullscreen";
};

export function NewsImageViewer({
  article,
  closeHref,
  variant,
}: NewsImageViewerProps) {
  const isModal = variant === "modal";

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex text-white",
        isModal
          ? "items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          : "flex-col bg-black",
      )}
    >
      <div
        className={cn(
          "flex w-full flex-col",
          isModal
            ? "h-[min(90vh,calc(100dvh-2rem))] max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl"
            : "h-full min-h-0",
        )}
      >
        <header className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Badge
              variant="outline"
              className={cn(
                "shrink-0 rounded-full border-white/20 bg-white/10 text-white",
                !isModal && "border-white/30 bg-white/15",
              )}
            >
              {isModal ? "Intercepting route" : "Full page route"}
            </Badge>
            <p className="truncate text-sm text-white/70">{article.title}</p>
          </div>

          <NewsImageCloseButton closeHref={closeHref} useBack={isModal} />
        </header>

        <div className="relative min-h-0 flex-1 basis-0">
          <Image
            src={getNewsImageSrc(article.image)}
            alt={article.title}
            fill
            priority
            className="object-contain"
            sizes={isModal ? "(max-width: 1024px) 100vw, 1024px" : "100vw"}
          />
        </div>
      </div>
    </div>
  );
}
