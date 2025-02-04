"use client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Lock, MailIcon, User2Icon } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useActionState } from "react";
import registerAction from "./registerAction";

export function FormRegister() {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  //TODO: implementar um toast para exibir a mensagem de erro e o loader no isPending
  console.log(isPending)
  
  return (
    <>
      {state?.success === false && (
        <div>
          <strong>Erro!</strong>
          <span>{state.message}</span>
        </div>
      )}
      <Form className="space-y-6" action={formAction}>
        <div className="relative">
          <Input name="name" type="text" placeholder="Jhon Joe" />
          <User2Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-colorGray h-5 w-5" />
        </div>
        <div className="relative">
          <Input
            name="email"
            type="email"
            placeholder="seu.email@exemplo.com"
          />
          <MailIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-colorGray h-5 w-5" />
        </div>
        <div className="relative">
          <Input name="password" type="password" placeholder="senha" />
          <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-colorGray h-5 w-5" />
        </div>
        <div className="flex items-center justify-between">
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
        </div>
        <div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </div>
        <div>
          <Link href="/cadastro">
            <Button className="w-full" variant="outline">
              Criar Conta
            </Button>
          </Link>
        </div>
      </Form>
    </>
  );
}
