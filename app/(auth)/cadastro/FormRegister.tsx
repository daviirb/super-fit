'use client';
import { Lock, MailIcon, User2Icon } from 'lucide-react';
import Form from 'next/form';
import Link from 'next/link';
import { useActionState } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import registerAction from './registerAction';

export function FormRegister() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

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
          <Input name="name" type="text" placeholder="Jhon Joe" />
          <User2Icon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-colorGray" />
        </div>
        <div className="relative">
          <Input
            name="email"
            type="email"
            placeholder="seu.email@exemplo.com"
          />
          <MailIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-colorGray" />
        </div>
        <div className="relative">
          <Input name="password" type="password" placeholder="senha" />
          <Lock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-colorGray" />
        </div>
        <div>
          <Button type="submit" className="w-full" isLoading={isPending}>
            Criar
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <p className="text-sm text-zinc-400">Já possui uma conta?</p>
          <Link className="text-sm text-primary" href={'/login'}>
            Login
          </Link>
        </div>
      </Form>
    </>
  );
}
