"use server";

import z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetMail } from "@/lib/mail";

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

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetMail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { message: "Reset email sent!" };
};
