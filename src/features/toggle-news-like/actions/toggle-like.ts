"use server";

import { revalidatePath } from "next/cache";

import { toggleNewsLike } from "@/entities/like/queries";
import type { NewsLikeInfo } from "@/entities/like/types";

export async function toggleLikeAction(newsId: string): Promise<NewsLikeInfo> {
  const result = toggleNewsLike(newsId);

  revalidatePath("/news");
  revalidatePath("/archive", "layout");
  revalidatePath("/");

  return result;
}
