import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import type { User } from "@/entities/user/types";
import { getDb } from "@/shared/db";
import { DEFAULT_USER_ID } from "@/shared/db/seed";

type UserRow = {
  id: number;
  name: string;
  created_at: string;
};

function normalizeUser(row: UserRow): User {
  return {
    id: String(row.id),
    name: row.name,
    createdAt: row.created_at,
  };
}

export async function getDefaultUserId(): Promise<number> {
  "use cache";
  cacheTag("users");
  cacheLife("max");

  const db = getDb();

  const row = db
    .prepare("SELECT id FROM users WHERE id = ? LIMIT 1")
    .get(DEFAULT_USER_ID) as { id: number } | undefined;

  if (!row) {
    throw new Error("Default user not found");
  }

  return row.id;
}

export async function getDefaultUser(): Promise<User> {
  "use cache";
  cacheTag("users");
  cacheLife("max");

  const db = getDb();

  const row = db
    .prepare("SELECT * FROM users WHERE id = ? LIMIT 1")
    .get(DEFAULT_USER_ID) as UserRow | undefined;

  if (!row) {
    throw new Error("Default user not found");
  }

  return normalizeUser(row);
}
