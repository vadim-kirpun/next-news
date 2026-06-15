import "server-only";

import path from "node:path";
import Database from "better-sqlite3";

import {
  DEFAULT_USER_ID,
  DEFAULT_USER_NAME,
  SEED_NEWS,
} from "@/shared/db/seed";

const DB_PATH = path.join(process.cwd(), "data", "news.db");

type GlobalWithDb = typeof globalThis & {
  newsReadDb?: Database.Database;
  newsWriteDb?: Database.Database;
};

function initDb(db: Database.Database) {
  db.prepare(
    "CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY, slug TEXT UNIQUE, title TEXT, content TEXT, date TEXT, image TEXT)",
  ).run();

  db.prepare(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT NOT NULL, created_at TEXT NOT NULL)",
  ).run();

  db.prepare(
    `CREATE TABLE IF NOT EXISTS likes (
      user_id INTEGER NOT NULL,
      news_id INTEGER NOT NULL,
      created_at TEXT NOT NULL,
      PRIMARY KEY (user_id, news_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
    )`,
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

  const { userCount } = db
    .prepare("SELECT COUNT(*) as userCount FROM users")
    .get() as { userCount: number };

  if (userCount === 0) {
    db.prepare("INSERT INTO users (id, name, created_at) VALUES (?, ?, ?)").run(
      DEFAULT_USER_ID,
      DEFAULT_USER_NAME,
      new Date().toISOString(),
    );
  }
}

export function getWriteDb() {
  const globalForDb = globalThis as GlobalWithDb;

  if (!globalForDb.newsWriteDb) {
    globalForDb.newsWriteDb = new Database(DB_PATH);
    initDb(globalForDb.newsWriteDb);
  }

  return globalForDb.newsWriteDb;
}

export function getReadDb() {
  const globalForDb = globalThis as GlobalWithDb;

  if (!globalForDb.newsReadDb) {
    getWriteDb();
    globalForDb.newsReadDb = new Database(DB_PATH, { readonly: true });
  }

  return globalForDb.newsReadDb;
}

/** Writable connection for mutations. Prefer getReadDb for cached reads. */
export function getDb() {
  return getWriteDb();
}
