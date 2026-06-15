import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { H1, Lead, Muted } from "@/shared/ui/typography";

export default function AuthPage() {
  return (
    <div className="min-h-full bg-gradient-to-b from-muted/40 via-background to-background dark:from-zinc-950 dark:via-background dark:to-zinc-950">
      <main className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-5xl items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md rounded-3xl border-border/60 bg-card/85 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
          <CardHeader className="space-y-2 text-center">
            <Muted className="text-sm uppercase tracking-[0.2em]">
              Mock auth
            </Muted>

            <H1 className="text-3xl font-semibold tracking-tight">Sign in</H1>

            <Lead className="text-base">
              Temporary interface without real authentication logic.
            </Lead>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <CardTitle className="text-sm font-medium">Email</CardTitle>
              <Input
                type="email"
                placeholder="you@example.com"
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <CardTitle className="text-sm font-medium">Password</CardTitle>
              <Input type="password" placeholder="••••••••" className="h-10" />
            </div>

            <Button render={<Link href="/" />} className="h-10 w-full">
              Login
            </Button>

            <Button render={<Link href="/" />} variant="outline" className="h-10 w-full">
              Registration
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
