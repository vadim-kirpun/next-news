"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3, Muted } from "@/components/ui/typography";

type ArchiveSlotErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ArchiveSlotError({
  error,
  reset,
}: ArchiveSlotErrorProps) {
  return (
    <div className="space-y-4">
      <H3 className="text-lg font-semibold">Archive</H3>

      <Card
        size="sm"
        className="gap-3 rounded-2xl border-destructive/30 bg-destructive/5 py-3"
      >
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Muted className="text-xs uppercase tracking-widest text-destructive">
              Invalid filter
            </Muted>
            <p className="text-sm text-foreground/90">{error.message}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              render={<Link href="/archive" />}
              className="rounded-full px-5"
            >
              Back to Archive
            </Button>

            <Button
              onClick={reset}
              variant="outline"
              className="rounded-full px-5"
            >
              Try again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
