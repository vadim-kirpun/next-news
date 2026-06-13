import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/shared/lib/utils";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 font-heading text-4xl font-extrabold tracking-tight text-balance",
      h2: "scroll-m-20 font-heading border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 font-heading text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 font-heading text-xl font-semibold tracking-tight",
      p: "font-sans leading-7 [&:not(:first-child)]:mt-6",
      lead: "font-sans text-xl text-muted-foreground",
      large: "font-sans text-lg font-semibold",
      small: "font-sans text-sm leading-none font-medium",
      muted: "font-sans text-sm text-muted-foreground",
      blockquote: "mt-6 border-l-2 pl-6 font-sans italic",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

const variantElements = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  p: "p",
  lead: "p",
  large: "div",
  small: "small",
  muted: "p",
  blockquote: "blockquote",
  code: "code",
} as const;

type TypographyVariant = NonNullable<
  VariantProps<typeof typographyVariants>["variant"]
>;

type TextProps<T extends React.ElementType = "p"> = {
  as?: T;
  variant?: TypographyVariant;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "variant">;

function Text<T extends React.ElementType = "p">({
  as,
  variant = "p",
  className,
  ...props
}: TextProps<T>) {
  const Component = (as ?? variantElements[variant]) as React.ElementType;

  return (
    <Component
      data-slot="text"
      data-variant={variant}
      className={cn(typographyVariants({ variant }), className)}
      {...props}
    />
  );
}

function H1({ className, ...props }: React.ComponentProps<"h1">) {
  return <Text as="h1" variant="h1" className={className} {...props} />;
}

function H2({ className, ...props }: React.ComponentProps<"h2">) {
  return <Text as="h2" variant="h2" className={className} {...props} />;
}

function H3({ className, ...props }: React.ComponentProps<"h3">) {
  return <Text as="h3" variant="h3" className={className} {...props} />;
}

function H4({ className, ...props }: React.ComponentProps<"h4">) {
  return <Text as="h4" variant="h4" className={className} {...props} />;
}

function P({ className, ...props }: React.ComponentProps<"p">) {
  return <Text as="p" variant="p" className={className} {...props} />;
}

function Lead({ className, ...props }: React.ComponentProps<"p">) {
  return <Text as="p" variant="lead" className={className} {...props} />;
}

function Large({ className, ...props }: React.ComponentProps<"div">) {
  return <Text as="div" variant="large" className={className} {...props} />;
}

function Small({ className, ...props }: React.ComponentProps<"small">) {
  return <Text as="small" variant="small" className={className} {...props} />;
}

function Muted({ className, ...props }: React.ComponentProps<"p">) {
  return <Text as="p" variant="muted" className={className} {...props} />;
}

function Blockquote({
  className,
  ...props
}: React.ComponentProps<"blockquote">) {
  return (
    <Text
      as="blockquote"
      variant="blockquote"
      className={className}
      {...props}
    />
  );
}

function InlineCode({ className, ...props }: React.ComponentProps<"code">) {
  return <Text as="code" variant="code" className={className} {...props} />;
}

export {
  Text,
  H1,
  H2,
  H3,
  H4,
  P,
  Lead,
  Large,
  Small,
  Muted,
  Blockquote,
  InlineCode,
  typographyVariants,
};
