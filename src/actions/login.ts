"use server";

import { LoginSchema } from "@/schemas";
import { z } from "zod";

export const login = (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields!" };
  }
  return { error: "Logged In" };
};
