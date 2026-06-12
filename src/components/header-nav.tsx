"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/news", label: "News" },
  { href: "/archive", label: "Archive" },
] as const;

function isNavActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2">
      {navItems.map((item) => {
        const isActive = isNavActive(pathname, item.href);

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
  );
}
