import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import slugify from "slugify";

import type { NewsItem } from "@/entities/news/types";
import {
  sanitizeMultilineText,
  sanitizePlainText,
} from "@/shared/api/sanitize";
import { getDb } from "@/shared/db";

type NewsRow = {
  id: number;
  slug: string;
  title: string;
  image: string;
  date: string;
  content: string;
};

type CreateNewsInput = {
  title: string;
  content: string;
  image: string;
};

function normalizeNewsItem(item: NewsRow): NewsItem {
  return {
    ...item,
    id: String(item.id),
  };
}

export async function getAllNews(): Promise<NewsItem[]> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM news ORDER BY date DESC")
    .all() as NewsRow[];

  return rows.map(normalizeNewsItem);
}

export async function getLatestNews(): Promise<NewsItem[]> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3")
    .all() as NewsRow[];

  return rows.map(normalizeNewsItem);
}

export async function getLatestNewsItem(): Promise<NewsItem> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const db = getDb();
  const row = db
    .prepare("SELECT * FROM news ORDER BY date DESC LIMIT 1")
    .get() as NewsRow | undefined;

  if (!row) {
    throw new Error("No news items found");
  }

  return normalizeNewsItem(row);
}

export async function getNewsById(id: string): Promise<NewsItem | undefined> {
  "use cache";
  cacheTag("news", `news-item-${id}`);
  cacheLife("minutes");

  const db = getDb();
  const row = db
    .prepare(
      "SELECT * FROM news WHERE slug = ? OR CAST(id AS TEXT) = ? LIMIT 1",
    )
    .get(id, id) as NewsRow | undefined;

  return row ? normalizeNewsItem(row) : undefined;
}

export async function getAvailableNewsYears(): Promise<number[]> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const db = getDb();
  const rows = db
    .prepare(
      "SELECT DISTINCT CAST(strftime('%Y', date) AS INTEGER) AS year FROM news ORDER BY year DESC",
    )
    .all() as { year: number }[];

  return rows.map((row) => row.year);
}

export async function isValidNewsYear(year: number | string): Promise<boolean> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const parsedYear = Number(year);

  if (!Number.isInteger(parsedYear)) {
    return false;
  }

  const db = getDb();
  const row = db
    .prepare("SELECT 1 FROM news WHERE strftime('%Y', date) = ? LIMIT 1")
    .get(String(parsedYear));

  return row !== undefined;
}

export async function isValidNewsMonth(
  year: number | string,
  month: number | string,
): Promise<boolean> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const parsedYear = Number(year);
  const parsedMonth = Number(month);

  if (!Number.isInteger(parsedYear) || !Number.isInteger(parsedMonth)) {
    return false;
  }

  const db = getDb();
  const row = db
    .prepare(
      "SELECT 1 FROM news WHERE strftime('%Y', date) = ? AND CAST(strftime('%m', date) AS INTEGER) = ? LIMIT 1",
    )
    .get(String(parsedYear), parsedMonth);

  return row !== undefined;
}

export async function getAvailableNewsMonths(
  year: number | string,
): Promise<number[]> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const db = getDb();
  const rows = db
    .prepare(
      "SELECT DISTINCT CAST(strftime('%m', date) AS INTEGER) AS month FROM news WHERE strftime('%Y', date) = ? ORDER BY month DESC",
    )
    .all(String(+year)) as { month: number }[];

  return rows.map((row) => row.month);
}

export async function getNewsForYear(
  year: number | string,
): Promise<NewsItem[]> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const db = getDb();
  const rows = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC",
    )
    .all(String(+year)) as NewsRow[];

  return rows.map(normalizeNewsItem);
}

export async function getNewsForYearAndMonth(
  year: number | string,
  month: number | string,
): Promise<NewsItem[]> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const db = getDb();
  const rows = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND CAST(strftime('%m', date) AS INTEGER) = ? ORDER BY date DESC",
    )
    .all(String(+year), +month) as NewsRow[];

  return rows.map(normalizeNewsItem);
}

function createUniqueSlug(baseTitle: string) {
  const db = getDb();
  const baseSlug =
    slugify(baseTitle, { lower: true, strict: true, trim: true }) ||
    "news-item";

  let candidate = baseSlug;
  let suffix = 1;

  while (true) {
    const row = db
      .prepare("SELECT 1 FROM news WHERE slug = ? LIMIT 1")
      .get(candidate);

    if (!row) {
      return candidate;
    }

    suffix += 1;
    candidate = `${baseSlug}-${suffix}`;
  }
}

export async function createNewsItem({
  title,
  content,
  image,
}: CreateNewsInput): Promise<NewsItem> {
  const db = getDb();

  const sanitizedTitle = sanitizePlainText(title);
  const sanitizedContent = sanitizeMultilineText(content);
  const slug = createUniqueSlug(sanitizedTitle);
  const date = new Date().toISOString().slice(0, 10);

  const result = db
    .prepare(
      "INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)",
    )
    .run(slug, sanitizedTitle, sanitizedContent, date, image);

  const created = db
    .prepare("SELECT * FROM news WHERE id = ? LIMIT 1")
    .get(result.lastInsertRowid) as NewsRow | undefined;

  if (!created) {
    throw new Error("Failed to create news item");
  }

  return normalizeNewsItem(created);
}
