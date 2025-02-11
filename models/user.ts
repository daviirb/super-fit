import { Prisma } from '@prisma/client';
import { compareSync } from 'bcrypt-ts';

import { auth } from '@/auth';
import db from '@/utils/db';

import { operationResult } from './operation-result';

export type User = Prisma.usersGetPayload<{}>;
export type UserInfo = {
  weight: number;
  height: number;
  age: number;
  goal: string;
  gender: string;
};

export async function findUserByCredentials(
  email: string,
  password: string,
): Promise<Pick<User, 'name' | 'email'> | null> {
  const user = await db.users.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return null;
  }

  const passwordMatch = compareSync(password, user.password);

  if (passwordMatch) {
    return { email: user.email, name: user.name };
  }

  return null;
}

export async function findUserInformations() {
  const session = await auth();
  if (!session?.user?.email) {
    return operationResult.failure({ message: 'Sessão não encontrada' });
  }

  const user = await db.users.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return operationResult.failure({ message: 'Usuário não encontrado' });
  }

  const userId = user.id;

  const userInfo = await db.user_info.findUnique({
    where: { userId },
    select: {
      weight: true,
      height: true,
      age: true,
      goal: true,
      gender: true,
    },
  });

  return operationResult.success(userInfo);
}
