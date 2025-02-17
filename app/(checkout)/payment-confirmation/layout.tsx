'use client';
import { ReactNode, useEffect } from 'react';

import { event } from '@/lib/fpixel';

export default function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    event('Subscribe', {
      value: 19.9,
      currency: 'BRL',
      predicted_ltv: 19.9,
    });
  });
  return (
    <section className="flex flex-col items-center justify-center py-40">
      {children}
    </section>
  );
}
