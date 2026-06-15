import type { Metadata } from "next";

import type { NewsItem } from "@/entities/news";

import { getMetadataBase, SITE_DESCRIPTION, SITE_NAME } from "./site";

export function createExcerpt(text: string, maxLength = 160): string {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

export function createRootMetadata(): Metadata {
  return {
    metadataBase: getMetadataBase(),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
  };
}

export function createArticleMetadata(article: NewsItem): Metadata {
  const description = createExcerpt(article.content);

  return {
    title: article.title,
    description,
  };
}

export function createArticleImageMetadata(article: NewsItem): Metadata {
  const description = `Full-size image for “${article.title}”.`;

  return {
    title: `${article.title} — Image`,
    description,
  };
}

export function createArchiveMetadata(
  year?: string,
  month?: string,
): Metadata {
  if (year && month) {
    const monthName = new Date(Number(year), Number(month) - 1).toLocaleString(
      "en-US",
      { month: "long" },
    );
    const title = `${monthName} ${year}`;

    return {
      title: { absolute: `${title} | ${SITE_NAME}` },
      description: `News archive for ${monthName} ${year}.`,
    };
  }

  if (year) {
    return {
      title: { absolute: `${year} | ${SITE_NAME}` },
      description: `News archive for ${year}.`,
    };
  }

  return {
    title: { absolute: `Archive | ${SITE_NAME}` },
    description:
      "Parallel routes archive with the latest story and older articles.",
  };
}
