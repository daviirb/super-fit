import { cva, type VariantProps } from 'class-variance-authority';
import { RefreshCw } from 'lucide-react';
import { JSX } from 'react';

import { cn } from '@/utils/sanitizeClassName';

const buttonVariants = cva(
  'flex items-center justify-center rounded-lg text-xg-normal font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-primary/90',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        outline:
          'border border-primary text-primary hover:border-primaryDark hover:text-primaryDark',
        secondary: 'bg-secondary text-white hover:bg-secondary/80',
        ghost:
          'text-accent-foreground hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 underline p-0',
      },
      size: {
        default: 'px-4 py-2',
        sm: 'h-9 rounded-md px-2',
        lg: 'h-16 rounded-lg px-6',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

type ButtonProps = JSX.IntrinsicElements['button'] &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
  };

export function Button({
  className,
  variant,
  size,
  isLoading,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn('relative', buttonVariants({ variant, size, className }))}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <RefreshCw className="absolute h-5 w-5 animate-spin text-white" />
      )}
      <span
        className={cn(
          'flex items-center justify-center gap-2 transition-opacity',
          isLoading ? 'opacity-0' : 'opacity-100',
        )}
      >
        {children}
      </span>
    </button>
  );
}
