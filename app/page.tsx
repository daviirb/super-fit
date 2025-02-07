'use client';
import { Lock, MailIcon } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  redirect('/login');
  return (
    <div className="flex min-h-screen bg-white">
      <div className="relative hidden overflow-hidden bg-primary lg:flex lg:w-1/2">
        {/* Colocar a imagem do dashboard */}
      </div>

      <div className="flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center">
            <div className="h-36 w-36">
              <Image src="/logosvg.svg" alt="Logo" width={150} height={150} />
            </div>
          </div>
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold text-gray-900">
              Entre com sua conta!
            </h1>
          </div>
          <form className="space-y-6" onSubmit={() => { }}>
            <div className="relative">
              <Input
                name="email"
                type="email"
                placeholder="seu.email@exemplo.com"
              />
              <MailIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <Input name="password" type="password" placeholder="senha" />
              <Lock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none text-gray-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Lembrar de mim
                </label>
              </div>
              <Button variant="link">Recuperar senha</Button>
            </div>
            <Button type="submit" className="w-full py-6">
              Entrar
            </Button>
            <Button className="w-full py-6" variant="outline">
              Criar Conta
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
