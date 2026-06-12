"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

type NewsImageCloseButtonProps = {
  closeHref: string;
  useBack?: boolean;
};

export function NewsImageCloseButton({
  closeHref,
  useBack = false,
}: NewsImageCloseButtonProps) {
  const router = useRouter();

  if (useBack) {
    return (
      <Button
        type="button"
        onClick={() => router.back()}
        variant="ghost"
        size="icon"
        aria-label="Close fullscreen image"
        className="shrink-0 text-white hover:bg-white/10 hover:text-white"
      >
        <X />
      </Button>
    );
  }

  return (
    <Button
      render={<Link href={closeHref} aria-label="Close fullscreen image" />}
      variant="ghost"
      size="icon"
      className="shrink-0 text-white hover:bg-white/10 hover:text-white"
    >
      <X />
    </Button>
  );
}
