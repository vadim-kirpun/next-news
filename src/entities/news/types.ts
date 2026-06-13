export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
  content: string;
};

export const getNewsImageSrc = (image: string) => `/images/${image}`;
