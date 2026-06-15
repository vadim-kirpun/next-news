"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

import { toggleNewsLike } from "@/entities/like/queries";
import type { NewsLikeInfo } from "@/entities/like/types";

export async function toggleLikeAction(newsId: string): Promise<NewsLikeInfo> {
  let result: NewsLikeInfo;

  try {
    result = await toggleNewsLike(newsId);
  } catch (error) {
    if (error instanceof Error && error.message.includes("sign in")) {
      redirect("/login");
    }

    throw error;
  }

  updateTag("likes");

  return result;
}
