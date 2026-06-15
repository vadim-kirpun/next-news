import type { Metadata } from "next";

import { CreateNewsForm } from "@/features/create-news";
import { Card, CardContent } from "@/shared/ui/card";
import { H1, Lead } from "@/shared/ui/typography";

export const metadata: Metadata = {
  title: "Create News",
  description: "Publish a new article via secure server-side form actions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CreateNewsPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-14">
      <div className="mb-8 space-y-3">
        <H1 className="font-semibold">Create News</H1>

        <Lead className="text-base">
          Publish a new article via secure server-side form actions.
        </Lead>
      </div>

      <Card className="rounded-3xl border-border/60 bg-card/85">
        <CardContent>
          <CreateNewsForm />
        </CardContent>
      </Card>
    </main>
  );
}
