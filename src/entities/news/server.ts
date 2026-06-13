import "server-only";

export {
  createNewsItem,
  getAllNews,
  getAvailableNewsMonths,
  getAvailableNewsYears,
  getLatestNews,
  getLatestNewsItem,
  getNewsById,
  getNewsForYear,
  getNewsForYearAndMonth,
  isValidNewsMonth,
  isValidNewsYear,
} from "./queries";
