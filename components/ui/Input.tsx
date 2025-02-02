import { cn } from "@/utils/sanitizeClassName";
import { JSX } from "react";

type InputProps = JSX.IntrinsicElements["input"];

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        "flex w-full rounded-lg border border-input bg-background px-2 py-4 text-base text-gray-500 ring-offset-background",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-gray-400",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
