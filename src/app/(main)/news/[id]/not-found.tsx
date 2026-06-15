import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { H1, Lead, Muted } from "@/shared/ui/typography";

export const metadata: Metadata = {
  title: "Article not found",
  description: "This news story does not exist or may have been removed.",
};

export default function NewsNotFound() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-14">
      <Card className="rounded-3xl border-border/60 bg-card/85 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
        <CardHeader className="space-y-3 text-center">
          <Muted className="text-sm uppercase tracking-widest">404</Muted>

          <H1 className="text-3xl font-semibold tracking-tight">
            Article not found
          </H1>

          <Lead className="mx-auto max-w-lg text-base">
            This news story does not exist or may have been removed.
          </Lead>
        </CardHeader>

        <CardContent className="flex justify-center gap-3 pb-8">
          <Button render={<Link href="/news" />} className="rounded-full px-6">
            Back to News
          </Button>

          <Button
            render={<Link href="/" />}
            variant="outline"
            className="rounded-full px-6"
          >
            Go Home
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
