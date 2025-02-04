"use server";

import { User } from "@/models/user";
import db from "@/utils/db";
import { hashSync } from "bcrypt-ts";
import { redirect } from "next/navigation";

export default async function registerAction(
  _prevState: any,
  formData: FormData
) {
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
  return redirect("/login");
}
