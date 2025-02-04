"use server";

import { User } from "@/models/user";
import db from "@/utils/db";
import { hashSync } from "bcrypt-ts";
import { redirect } from "next/navigation";

type RegisterState = {
  success: boolean;
  message?: string;
};

export default async function registerAction(
  _prevState: RegisterState | null,
  formData: FormData
): Promise<RegisterState | null> {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries) as Pick<
    User,
    "email" | "name" | "password"
  >;

  if (!data.email || !data.name || !data.password) {
    return {
      success: false,
      message: "Você precisa preencher todos os campos corretamente!",
    };
  }

  const user = await db.users.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    return {
      success: false,
      message: "Usuário já existe",
    };
  }

  await db.users.create({
    data: {
      email: data.email,
      password: hashSync(data.password),
      name: data.name,
      plan: "default_plan",
    },
  });

  // Para evitar que `void` seja retornado, retornamos `null`
  redirect("/login");
  return null;
}
