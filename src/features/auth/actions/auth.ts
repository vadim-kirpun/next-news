"use server";

import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/shared/supabase/server";

function getCredentials(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  return { email, password };
}

function getProfileName(email: string) {
  return email.split("@")[0] || "User";
}

function redirectWithAuthError(error: unknown): never {
  const message =
    error instanceof Error ? error.message : "Authentication failed.";

  redirect(`/login?error=${encodeURIComponent(message)}`);
}

export async function signInAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  try {
    const { email, password } = getCredentials(formData);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    redirectWithAuthError(error);
  }

  redirect("/");
}

export async function signUpAction(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  let confirmationRequired = false;

  try {
    const { email, password } = getCredentials(formData);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: getProfileName(email),
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.session) {
      confirmationRequired = true;
    }
  } catch (error) {
    redirectWithAuthError(error);
  }

  if (confirmationRequired) {
    redirect(
      "/login?message=Registration%20started.%20Check%20your%20email%20to%20confirm%20your%20account.",
    );
  }

  redirect("/");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();

  redirect("/login");
}
