"use client";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Lock, MailIcon } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log("Dados do formulário:", { email, password });
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        {/* Colocar a imagem do dashboard */}
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center">
            <div className="w-36 h-36">
              <Image src="/logosvg.svg" alt="Logo" width={150} height={150} />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-gray-900">
              Entre com sua conta!
            </h1>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <Input
                name="email"
                type="email"
                placeholder="seu.email@exemplo.com"
              />
              <MailIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <div className="relative">
              <Input name="password" type="password" placeholder="senha" />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
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
