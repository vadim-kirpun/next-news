import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import slugify from "slugify";

import type { NewsItem } from "@/entities/news/types";
import {
  sanitizeMultilineText,
  sanitizePlainText,
} from "@/shared/api/sanitize";
import { createSupabasePublicClient } from "@/shared/supabase/client";
import { createSupabaseServerClient } from "@/shared/supabase/server";
import type { Database } from "@/shared/supabase/types";

type NewsRow = Database["public"]["Tables"]["news"]["Row"];

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

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data.map(normalizeNewsItem);
}

export async function getLatestNews(): Promise<NewsItem[]> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("date", { ascending: false })
    .limit(3);

  if (error) {
    throw new Error(error.message);
  }

  return data.map(normalizeNewsItem);
}

export async function getLatestNewsItem(): Promise<NewsItem> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("No news items found");
  }

  return normalizeNewsItem(data);
}

export async function getNewsById(id: string): Promise<NewsItem | undefined> {
  "use cache";
  cacheTag("news", `news-item-${id}`);
  cacheLife("minutes");

  const supabase = createSupabasePublicClient();
  const numericId = Number(id);
  const query = supabase.from("news").select("*").limit(1);
  const { data, error } = Number.isInteger(numericId)
    ? await query.eq("id", numericId).maybeSingle()
    : await query.eq("slug", id).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data ? normalizeNewsItem(data) : undefined;
}

export async function getAvailableNewsYears(): Promise<number[]> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase.from("news").select("date");

  if (error) {
    throw new Error(error.message);
  }

  return Array.from(
    new Set(data.map((row) => Number(row.date.slice(0, 4)))),
  ).sort((a, b) => b - a);
}

export async function isValidNewsYear(year: number | string): Promise<boolean> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const parsedYear = Number(year);

  if (!Number.isInteger(parsedYear)) {
    return false;
  }

  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("news")
    .select("id")
    .gte("date", `${parsedYear}-01-01`)
    .lt("date", `${parsedYear + 1}-01-01`)
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data !== null;
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

  const monthStart = new Date(Date.UTC(parsedYear, parsedMonth - 1, 1));
  const nextMonthStart = new Date(Date.UTC(parsedYear, parsedMonth, 1));
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("news")
    .select("id")
    .gte("date", monthStart.toISOString().slice(0, 10))
    .lt("date", nextMonthStart.toISOString().slice(0, 10))
    .limit(1)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data !== null;
}

export async function getAvailableNewsMonths(
  year: number | string,
): Promise<number[]> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const parsedYear = Number(year);
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("news")
    .select("date")
    .gte("date", `${parsedYear}-01-01`)
    .lt("date", `${parsedYear + 1}-01-01`);

  if (error) {
    throw new Error(error.message);
  }

  return Array.from(
    new Set(data.map((row) => Number(row.date.slice(5, 7)))),
  ).sort((a, b) => b - a);
}

export async function getNewsForYear(
  year: number | string,
): Promise<NewsItem[]> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const parsedYear = Number(year);
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .gte("date", `${parsedYear}-01-01`)
    .lt("date", `${parsedYear + 1}-01-01`)
    .order("date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data.map(normalizeNewsItem);
}

export async function getNewsForYearAndMonth(
  year: number | string,
  month: number | string,
): Promise<NewsItem[]> {
  "use cache";
  cacheTag("news");
  cacheLife("minutes");

  const parsedYear = Number(year);
  const parsedMonth = Number(month);
  const monthStart = new Date(Date.UTC(parsedYear, parsedMonth - 1, 1));
  const nextMonthStart = new Date(Date.UTC(parsedYear, parsedMonth, 1));
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("news")
    .select("*")
    .gte("date", monthStart.toISOString().slice(0, 10))
    .lt("date", nextMonthStart.toISOString().slice(0, 10))
    .order("date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data.map(normalizeNewsItem);
}

async function createUniqueSlug(baseTitle: string) {
  const supabase = createSupabasePublicClient();
  const baseSlug =
    slugify(baseTitle, { lower: true, strict: true, trim: true }) ||
    "news-item";

  let candidate = baseSlug;
  let suffix = 1;

  while (true) {
    const { data, error } = await supabase
      .from("news")
      .select("id")
      .eq("slug", candidate)
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
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
  const supabase = await createSupabaseServerClient();

  const sanitizedTitle = sanitizePlainText(title);
  const sanitizedContent = sanitizeMultilineText(content);
  const slug = await createUniqueSlug(sanitizedTitle);
  const date = new Date().toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("news")
    .insert({
      slug,
      title: sanitizedTitle,
      content: sanitizedContent,
      date,
      image,
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return normalizeNewsItem(data);
}
