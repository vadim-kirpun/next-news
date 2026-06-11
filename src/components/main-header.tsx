import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
] as const;

type MainHeaderProps = {
  currentPath?: string;
};

export function MainHeader({ currentPath }: MainHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Text
          as={Link}
          href="/"
          variant="small"
          className="font-semibold tracking-tight text-foreground"
        >
          Next News
        </Text>

        <div className="flex items-center gap-2">
          <nav className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.href;

              return (
                <Button
                  key={item.href}
                  render={<Link href={item.href} />}
                  variant="ghost"
                  className={cn(
                    "rounded-full px-4 text-sm text-foreground/70 hover:text-foreground",
                    isActive && "bg-muted text-foreground",
                  )}
                >
                  {item.label}
                </Button>
              );
            })}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
