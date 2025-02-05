import { cn } from "@/utils/sanitizeClassName";
import { cva, type VariantProps } from "class-variance-authority";
import { JSX } from "react";

const buttonVariants = cva(
  "flex items-center justify-center rounded-lg text-xg-normal font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border border-primary text-primary hover:border-primaryDark hover:text-primaryDark",
        secondary: "bg-secondary text-white hover:bg-secondary/80",
        ghost:
          "text-accent-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline p-0",
      },
      size: {
        default: "px-4 py-3",
        sm: "h-9 rounded-md px-2",
        lg: "h-16 rounded-lg px-6",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = JSX.IntrinsicElements["button"] &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
