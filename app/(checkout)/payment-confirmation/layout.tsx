import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className="flex flex-col items-center justify-center py-40">
      {children}
    </section>
  );
}
