'use server';

import { AuthError } from 'next-auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

import { signIn } from '@/auth';

type LoginState = {
  success: boolean;
  message?: string;
};

export default async function loginAction(
  _prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  try {
    await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: true,
      redirectTo: '/home',
    });

    return {
      success: true,
    };
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof AuthError && error.type === 'CredentialsSignin') {
      return {
        success: false,
        message: 'Dados de login incorretos.',
      };
    }

    console.log(error);

    return {
      success: false,
      message: 'Ops, algum erro aconteceu!',
    };
  }
}
