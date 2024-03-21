"use server";

import { SignUpSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export const signup = async (values: z.infer<typeof SignUpSchema>) => {
  const validateFields = SignUpSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }
  const { email, name, password } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) return { error: "Email alredy in use!" };
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return { error: "User created" };
};
