"use server";

import { SignUpSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const signup = async (values: z.infer<typeof SignUpSchema>) => {
  const validateFields = SignUpSchema.safeParse(values);
  if (!validateFields.success) {
    return { message: "Invalid Fields!" };
  }
  const { email, name, password } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) return { message: "Email alredy in use!" };
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return { message: "User created" };
};
