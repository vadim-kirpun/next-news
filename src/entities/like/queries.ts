import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import type { NewsLikeInfo } from "@/entities/like/types";
import { getDefaultUserId } from "@/entities/user/queries";
import { getReadDb, getWriteDb } from "@/shared/db";

type LikeRow = {
  news_id: number;
  like_count: number;
};

function createEmptyLikeInfo(): NewsLikeInfo {
  return { isLiked: false, likeCount: 0 };
}

export async function getNewsLikeInfo(
  newsIds: string[],
  userId?: number,
): Promise<Record<string, NewsLikeInfo>> {
  "use cache";
  cacheTag("likes");
  cacheLife("minutes");

  const resolvedUserId = userId ?? (await getDefaultUserId());

  if (newsIds.length === 0) {
    return {};
  }

  const db = getReadDb();
  const numericIds = newsIds.map((id) => Number(id));
  const placeholders = numericIds.map(() => "?").join(", ");

  const likeCounts = db
    .prepare(
      `SELECT news_id, COUNT(*) AS like_count
       FROM likes
       WHERE news_id IN (${placeholders})
       GROUP BY news_id`,
    )
    .all(...numericIds) as LikeRow[];

  const likedRows = db
    .prepare(
      `SELECT news_id
       FROM likes
       WHERE user_id = ? AND news_id IN (${placeholders})`,
    )
    .all(resolvedUserId, ...numericIds) as { news_id: number }[];

  const result = Object.fromEntries(
    newsIds.map((id) => [id, createEmptyLikeInfo()]),
  );

  for (const row of likeCounts) {
    const id = String(row.news_id);
    if (result[id]) {
      result[id].likeCount = row.like_count;
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
  userId?: number,
): Promise<NewsLikeInfo> {
  const resolvedUserId = userId ?? (await getDefaultUserId());
  const db = getWriteDb();
  const numericNewsId = Number(newsId);

  if (!Number.isInteger(numericNewsId)) {
    throw new Error("Invalid news id");
  }

  const news = db
    .prepare("SELECT id FROM news WHERE id = ? LIMIT 1")
    .get(numericNewsId);

  if (!news) {
    throw new Error("News item not found");
  }

  const existing = db
    .prepare("SELECT 1 FROM likes WHERE user_id = ? AND news_id = ? LIMIT 1")
    .get(resolvedUserId, numericNewsId);

  if (existing) {
    db.prepare("DELETE FROM likes WHERE user_id = ? AND news_id = ?").run(
      resolvedUserId,
      numericNewsId,
    );
  } else {
    db.prepare(
      "INSERT INTO likes (user_id, news_id, created_at) VALUES (?, ?, ?)",
    ).run(resolvedUserId, numericNewsId, new Date().toISOString());
  }

  const likeCount = db
    .prepare("SELECT COUNT(*) AS count FROM likes WHERE news_id = ?")
    .get(numericNewsId) as { count: number };

  return {
    isLiked: !existing,
    likeCount: likeCount.count,
  };
}
