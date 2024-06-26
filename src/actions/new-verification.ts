"use server";

import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const existingToken = await db.verificationToken.findUnique({
    where: { token },
  });

  if (!existingToken) {
    return { message: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { message: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { message: "Email does not exist!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({ where: { id: existingToken.id } });

  return { message: "Email verified!" };
};
