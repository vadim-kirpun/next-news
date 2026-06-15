import "server-only";

import type { User } from "@/entities/user/types";
import { createSupabaseServerClient } from "@/shared/supabase/server";
import type { Database } from "@/shared/supabase/types";

type UserRow = Database["public"]["Tables"]["profiles"]["Row"];

function normalizeUser(row: UserRow, email?: string): User {
  return {
    id: row.id,
    name: row.name,
    email,
    createdAt: row.created_at,
  };
}

function getNameFromEmail(email: string | undefined) {
  return email?.split("@")[0] || "User";
}

export async function getCurrentUserId(): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user.id;
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  const { data, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .limit(1)
    .maybeSingle();

  if (profileError) {
    throw new Error(profileError.message);
  }

  if (data) {
    return normalizeUser(data, user.email);
  }

  const { data: createdProfile, error: createProfileError } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      name:
        typeof user.user_metadata.name === "string"
          ? user.user_metadata.name
          : getNameFromEmail(user.email),
    })
    .select("*")
    .single();

  if (createProfileError) {
    throw new Error(createProfileError.message);
  }

  return normalizeUser(createdProfile, user.email);
}

export const getDefaultUserId = getCurrentUserId;
export const getDefaultUser = getCurrentUser;
