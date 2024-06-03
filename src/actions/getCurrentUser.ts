"use server";

import { auth } from "@/auth";
import { getUserById } from "@/data/user";

export const getCurrentUser = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user || !user.id) return null;
  const currUser = await getUserById(user.id);
  if (!currUser) return null;
  return currUser;
};
