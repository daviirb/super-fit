'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-8 bg-green-800 py-6 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; 2025 Super Fit - Todos os direitos reservados.
            </p>
          </div>
          <nav className="flex space-x-4">
            <Link href="/termos" className="text-sm hover:underline">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="text-sm hover:underline">
              Política de Privacidade
            </Link>
            <Link href="/contato" className="text-sm hover:underline">
              Contato
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
