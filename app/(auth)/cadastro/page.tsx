import Image from 'next/image';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';

import { FormRegister } from './FormRegister';

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    return redirect('/home');
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="relative hidden overflow-hidden bg-primary lg:flex lg:w-1/2">
        {/* Colocar a imagem do dashboard */}
      </div>

      <div className="mt-10 flex w-full justify-center p-8 lg:w-1/2 lg:items-center">
        <div className="w-full max-w-md space-y-8">
          <div className="flex justify-center">
            <div>
              <Image src="/logosvg.svg" alt="Logo" width={120} height={120} />
            </div>
          </div>
          <div className="space-y-2 text-center">
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
