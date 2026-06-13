import { cache } from "react";

import type { NewsItem } from "@/data/news";

const NEWS_API_URL = process.env.NEWS_API_URL ?? "http://localhost:8080";

type ApiNewsItem = {
  id: number | string;
  slug: string;
  title: string;
  image: string;
  date: string;
  content: string;
};

const sortByDateDesc = (a: NewsItem, b: NewsItem) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

function normalizeNewsItem(item: ApiNewsItem): NewsItem {
  return {
    ...item,
    id: String(item.id),
  };
}

export const getAllNews = cache(async (): Promise<NewsItem[]> => {
  const response = await fetch(`${NEWS_API_URL}/news`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = (await response.json()) as ApiNewsItem[];
  return data.map(normalizeNewsItem);
});

export async function getLatestNews(): Promise<NewsItem[]> {
  const news = await getAllNews();
  return [...news].sort(sortByDateDesc).slice(0, 3);
}

export async function getLatestNewsItem(): Promise<NewsItem> {
  const news = await getAllNews();
  return [...news].sort(sortByDateDesc)[0];
}

export async function getNewsById(id: string): Promise<NewsItem | undefined> {
  const news = await getAllNews();
  return news.find((item) => item.id === id || item.slug === id);
}

export async function getAvailableNewsYears(): Promise<number[]> {
  const news = await getAllNews();
  return news
    .reduce<number[]>((years, item) => {
      const year = new Date(item.date).getFullYear();
      if (!years.includes(year)) {
        years.push(year);
      }
      return years;
    }, [])
    .sort((a, b) => b - a);
}

export async function isValidNewsYear(year: number | string): Promise<boolean> {
  const parsedYear = Number(year);
  const years = await getAvailableNewsYears();
  return Number.isInteger(parsedYear) && years.includes(parsedYear);
}

export async function isValidNewsMonth(
  year: number | string,
  month: number | string,
): Promise<boolean> {
  const parsedMonth = Number(month);
  const months = await getAvailableNewsMonths(year);
  return Number.isInteger(parsedMonth) && months.includes(parsedMonth);
}

export async function getAvailableNewsMonths(
  year: number | string,
): Promise<number[]> {
  const news = await getAllNews();
  return news
    .reduce<number[]>((months, item) => {
      const newsYear = new Date(item.date).getFullYear();
      if (newsYear === +year) {
        const month = new Date(item.date).getMonth();
        if (!months.includes(month)) {
          months.push(month + 1);
        }
      }
      return months;
    }, [])
    .sort((a, b) => b - a);
}

export async function getNewsForYear(
  year: number | string,
): Promise<NewsItem[]> {
  const news = await getAllNews();
  return news
    .filter((item) => new Date(item.date).getFullYear() === +year)
    .sort(sortByDateDesc);
}

export async function getNewsForYearAndMonth(
  year: number | string,
  month: number | string,
): Promise<NewsItem[]> {
  const news = await getAllNews();
  return news
    .filter((item) => {
      const newsYear = new Date(item.date).getFullYear();
      const newsMonth = new Date(item.date).getMonth() + 1;
      return newsYear === +year && newsMonth === +month;
    })
    .sort(sortByDateDesc);
}
