import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getSupabasePublicEnv } from "./env";
import type { Database } from "./types";

export function createSupabasePublicClient() {
  const { url, publishableKey } = getSupabasePublicEnv();

  return createClient<Database>(url, publishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
