import db from "@/utils/db";
import { Prisma } from "@prisma/client";
import { compareSync } from "bcrypt-ts";

export type User = Prisma.usersGetPayload<{}>;

export async function findUserByCredentials(
  email: string,
  password: string
): Promise<Pick<User, "name" | "email"> | null> {
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
