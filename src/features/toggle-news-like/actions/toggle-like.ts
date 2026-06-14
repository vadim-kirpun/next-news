"use server";

import { updateTag } from "next/cache";

import { toggleNewsLike } from "@/entities/like/queries";
import type { NewsLikeInfo } from "@/entities/like/types";

export async function toggleLikeAction(newsId: string): Promise<NewsLikeInfo> {
  const result = await toggleNewsLike(newsId);

  updateTag("likes");

  return result;
}
