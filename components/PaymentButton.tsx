'use client';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';
import { useCallback } from 'react';

import { Button, buttonVariants } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { cn } from '@/lib/utils';

type PaymentButtonProps = {
  children: React.ReactNode;
  className?: string;
  isLoggedIn: boolean;
};

export default function PaymentButton({
  children,
  className,
  isLoggedIn = true,
}: PaymentButtonProps) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
  );

  const fetchClientSecret = useCallback(async () => {
    return fetch('/api/v1/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => data.client_secret);
  }, []);

  const options = { fetchClientSecret };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="submit"
          formMethod="post"
          variant={'default'}
          className={cn(className, 'w-full')}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto py-4">
        {!isLoggedIn && <LoggedOutContent />}
        {isLoggedIn && (
          <>
            <VisuallyHidden.Root>
              <DialogTitle className="text-xl font-semibold">
                Pro Membership
              </DialogTitle>
            </VisuallyHidden.Root>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout className="max-h-[80dvh]" />
            </EmbeddedCheckoutProvider>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function LoggedOutContent() {
  return (
    <>
      <DialogTitle className="flex items-center gap-2">Ops...</DialogTitle>
      <h2>Você precisa possuir uma conta para assinar!</h2>
      <Link href="/cadastro" className={buttonVariants({ variant: 'default' })}>
        Criar Conta
      </Link>

      <p className="mt-2 text-sm text-muted-foreground">
        Já possui conta?
        <Link
          className={cn(
            buttonVariants({ variant: 'link' }),
            'pl-2 text-muted-foreground',
          )}
          href="/login"
        >
          Faça seu login
        </Link>
      </p>
    </>
  );
}
