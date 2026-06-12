import { MainHeader } from "@/components/main-header";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <div className="min-h-full bg-gradient-to-b from-muted/40 via-background to-background dark:from-zinc-950 dark:via-background dark:to-zinc-950">
        {children}
      </div>
    </>
  );
}
