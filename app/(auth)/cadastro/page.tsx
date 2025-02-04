import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FormRegister } from "./FormRegister";

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    return redirect("/dashboard");
  }

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
              Cria a sua conta!
            </h1>
          </div>
          <FormRegister />
        </div>
      </div>
    </div>
  );
}
