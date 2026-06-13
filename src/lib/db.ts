import "server-only";

import path from "node:path";
import Database from "better-sqlite3";

import { SEED_NEWS } from "@/data/seed-news";

const DB_PATH = path.join(process.cwd(), "data", "news.db");

type GlobalWithDb = typeof globalThis & {
  newsDb?: Database.Database;
};

function initDb(db: Database.Database) {
  db.prepare(
    "CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY, slug TEXT UNIQUE, title TEXT, content TEXT, date TEXT, image TEXT)",
  ).run();

  const { count } = db.prepare("SELECT COUNT(*) as count FROM news").get() as {
    count: number;
  };

  if (count === 0) {
    const insert = db.prepare(
      "INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)",
    );

    for (const news of SEED_NEWS) {
      insert.run(news.slug, news.title, news.content, news.date, news.image);
    }
  }
}

export function getDb() {
  const globalForDb = globalThis as GlobalWithDb;

  if (!globalForDb.newsDb) {
    globalForDb.newsDb = new Database(DB_PATH);
    initDb(globalForDb.newsDb);
  }

  return globalForDb.newsDb;
}
