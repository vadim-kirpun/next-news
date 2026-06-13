"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/shared/ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      nativeButton
      type="submit"
      className="rounded-full px-6"
      disabled={pending}
    >
      {pending ? "Publishing..." : "Publish news"}
    </Button>
  );
}
