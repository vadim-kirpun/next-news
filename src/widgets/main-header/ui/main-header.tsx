import Link from "next/link";

import { Text } from "@/shared/ui/typography";
import { HeaderNav } from "./header-nav";
import { UserMenu } from "./user-menu";

export function MainHeader() {
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
          <HeaderNav />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
