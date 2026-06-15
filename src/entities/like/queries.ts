import "server-only";

import type { NewsLikeInfo } from "@/entities/like/types";
import { getCurrentUserId } from "@/entities/user/queries";
import { createSupabasePublicClient } from "@/shared/supabase/client";
import { createSupabaseServerClient } from "@/shared/supabase/server";

function createEmptyLikeInfo(): NewsLikeInfo {
  return { isLiked: false, likeCount: 0 };
}

export async function getNewsLikeInfo(
  newsIds: string[],
  userId?: string,
): Promise<Record<string, NewsLikeInfo>> {
  if (newsIds.length === 0) {
    return {};
  }

  const numericIds = newsIds.map((id) => Number(id));
  const invalidId = numericIds.some((id) => !Number.isInteger(id));

  if (invalidId) {
    return Object.fromEntries(newsIds.map((id) => [id, createEmptyLikeInfo()]));
  }

  const resolvedUserId = userId ?? (await getCurrentUserId());
  const publicSupabase = createSupabasePublicClient();

  const { data: likeRows, error: likeRowsError } = await publicSupabase
    .from("likes")
    .select("news_id")
    .in("news_id", numericIds);

  if (likeRowsError) {
    throw new Error(likeRowsError.message);
  }

  const { data: likedRows, error: likedRowsError } = resolvedUserId
    ? await publicSupabase
        .from("likes")
        .select("news_id")
        .eq("user_id", resolvedUserId)
        .in("news_id", numericIds)
    : { data: [], error: null };

  if (likedRowsError) {
    throw new Error(likedRowsError.message);
  }

  const result = Object.fromEntries(
    newsIds.map((id) => [id, createEmptyLikeInfo()]),
  );

  for (const row of likeRows) {
    const id = String(row.news_id);
    if (result[id]) {
      result[id].likeCount += 1;
    }
  }

  for (const row of likedRows) {
    const id = String(row.news_id);
    if (result[id]) {
      result[id].isLiked = true;
    }
  }

  return result;
}

export async function toggleNewsLike(
  newsId: string,
  userId?: string,
): Promise<NewsLikeInfo> {
  const resolvedUserId = userId ?? (await getCurrentUserId());
  const numericNewsId = Number(newsId);

  if (!resolvedUserId) {
    throw new Error("Please sign in to like news.");
  }

  if (!Number.isInteger(numericNewsId)) {
    throw new Error("Invalid news id");
  }

  const publicSupabase = createSupabasePublicClient();
  const { data: news, error: newsError } = await publicSupabase
    .from("news")
    .select("id")
    .eq("id", numericNewsId)
    .limit(1)
    .maybeSingle();

  if (newsError) {
    throw new Error(newsError.message);
  }

  if (!news) {
    throw new Error("News item not found");
  }

  const supabase = await createSupabaseServerClient();
  const { data: existing, error: existingError } = await supabase
    .from("likes")
    .select("news_id")
    .eq("user_id", resolvedUserId)
    .eq("news_id", numericNewsId)
    .limit(1)
    .maybeSingle();

  if (existingError) {
    throw new Error(existingError.message);
  }

  if (existing) {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", resolvedUserId)
      .eq("news_id", numericNewsId);

    if (error) {
      throw new Error(error.message);
    }
  } else {
    const { error } = await supabase.from("likes").insert({
      user_id: resolvedUserId,
      news_id: numericNewsId,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  const { count, error: countError } = await publicSupabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("news_id", numericNewsId);

  if (countError) {
    throw new Error(countError.message);
  }

  return {
    isLiked: !existing,
    likeCount: count ?? 0,
  };
}
