"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationMail } from "@/lib/mail";
import { generateVerficationToken } from "@/lib/token";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { message: "Invalid Fields!" };
  }

  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { message: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verficationToken = await generateVerficationToken(existingUser.email);

    await sendVerificationMail(verficationToken.email, verficationToken.token);

    return {
      message: "You need to verify your email. Verification email sent!",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials!" };
        default:
          return { message: "Something went wrong!" };
      }
    }
    throw error;
  }
};
