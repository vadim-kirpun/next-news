"use client";

import { Avatar } from "@base-ui/react/avatar";
import { Popover } from "@base-ui/react/popover";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Muted, Text } from "@/shared/ui/typography";

export function UserMenu() {
  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label="Current user menu"
        className="inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-muted/50 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 outline-none"
      >
        <Avatar.Root>
          <Avatar.Fallback>VK</Avatar.Fallback>
        </Avatar.Root>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner align="end" sideOffset={8}>
          <Popover.Popup className="w-56 rounded-xl border border-border/60 bg-card p-3 text-card-foreground shadow-[0_10px_30px_rgba(0,0,0,0.2)] outline-none">
            <div className="mb-3 space-y-1">
              <Text variant="small" className="font-semibold">
                Vadim Kirpun
              </Text>
              <Muted>vadim@example.com</Muted>
            </div>

            <Button
              render={<Link href="/login" />}
              variant="destructive"
              className="h-9 w-full"
            >
              Logout
            </Button>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
