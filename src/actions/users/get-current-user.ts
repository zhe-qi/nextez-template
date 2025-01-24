"use server";

import { auth } from "@/auth";

import prismadb from "@/lib/prismadb";

import { redirect } from "next/navigation";

export async function getCurrentUser(redirectPage?: string) {
  const session = await auth();

  if (redirectPage) {
    if (!session) {
      redirect(redirectPage);
    }
  }

  try {
    const email = session?.user.email;

    if (email) {
      const user = await prismadb.user.findUnique({ where: { email } });
      return user;
    }
    return null;
  } catch {
    return null;
  }
}
