"use server";

import z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values);

  if (!validateFields.success) {
    return { message: "Invalid email!" };
  }

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { message: "Email does not exist!" };
  }

  return { message: "Reset email sent!" };
};
