'use client';
import { Lock, MailIcon } from 'lucide-react';
import Form from 'next/form';
import Link from 'next/link';
import { useActionState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import loginAction from './loginAction';

export function FormLogin() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <>
      {state?.success === false && (
        <div>
          <strong>Erro!</strong>
          <span>{state.message}</span>
        </div>
      )}
      <Form className="space-y-4" action={formAction}>
        <div className="relative">
          <Input
            name="email"
            type="email"
            placeholder="seu.email@exemplo.com"
          />
          <MailIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-colorGray" />
        </div>
        <div className="relative">
          <Input name="password" type="password" placeholder="Senha" />
          <Lock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-colorGray" />
        </div>
        {/* <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <label
              htmlFor="remember"
              className="text-sm text-gray-500 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Lembrar de mim
            </label>
          </div>
          <Button variant="link">Recuperar senha</Button>
        </div> */}
        <div>
          <Button type="submit" className="w-full" isLoading={isPending}>
            Entrar
          </Button>
        </div>
        <div>
          <Link href="/cadastro">
            <Button className="w-full py-[7px]" variant="outline">
              Criar Conta
            </Button>
          </Link>
        </div>
      </Form>
    </>
  );
}
