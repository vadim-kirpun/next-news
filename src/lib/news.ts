import { DUMMY_NEWS, type NewsItem } from "@/data/news";

const sortByDateDesc = (a: NewsItem, b: NewsItem) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

export function getAllNews(): NewsItem[] {
  return DUMMY_NEWS;
}

export function getLatestNews(): NewsItem[] {
  return [...DUMMY_NEWS].sort(sortByDateDesc).slice(0, 3);
}

export function getLatestNewsItem(): NewsItem {
  return [...DUMMY_NEWS].sort(sortByDateDesc)[0];
}

export function getNewsById(id: string): NewsItem | undefined {
  return DUMMY_NEWS.find((item) => item.id === id || item.slug === id);
}

export function getAvailableNewsYears(): number[] {
  return DUMMY_NEWS.reduce<number[]>((years, news) => {
    const year = new Date(news.date).getFullYear();
    if (!years.includes(year)) {
      years.push(year);
    }
    return years;
  }, []).sort((a, b) => b - a);
}

export function isValidNewsYear(year: number | string): boolean {
  const parsedYear = Number(year);
  return (
    Number.isInteger(parsedYear) &&
    getAvailableNewsYears().includes(parsedYear)
  );
}

export function isValidNewsMonth(
  year: number | string,
  month: number | string,
): boolean {
  const parsedMonth = Number(month);
  return (
    Number.isInteger(parsedMonth) &&
    getAvailableNewsMonths(year).includes(parsedMonth)
  );
}

export function getAvailableNewsMonths(year: number | string): number[] {
  return DUMMY_NEWS.reduce<number[]>((months, news) => {
    const newsYear = new Date(news.date).getFullYear();
    if (newsYear === +year) {
      const month = new Date(news.date).getMonth();
      if (!months.includes(month)) {
        months.push(month + 1);
      }
    }
    return months;
  }, []).sort((a, b) => b - a);
}

export function getNewsForYear(year: number | string): NewsItem[] {
  return DUMMY_NEWS.filter(
    (news) => new Date(news.date).getFullYear() === +year,
  ).sort(sortByDateDesc);
}

export function getNewsForYearAndMonth(
  year: number | string,
  month: number | string,
): NewsItem[] {
  return DUMMY_NEWS.filter((news) => {
    const newsYear = new Date(news.date).getFullYear();
    const newsMonth = new Date(news.date).getMonth() + 1;
    return newsYear === +year && newsMonth === +month;
  }).sort(sortByDateDesc);
}
