"use server";

import { verifyUserToken } from "@/lib/jwt";

import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";

type IPros = {
  token: string;
};

export async function confirmEmail({ token }: IPros) {
  let result: { success: boolean } = {
    success: false,
  };

  try {
    const userEmail = verifyUserToken(token);

    if (userEmail) {
      await prismadb.user.update({
        where: {
          email: userEmail,
        },
        data: {
          emailVerified: true,
        },
      });

      result = { success: true };
    }
  } catch {
    redirect(`/auth/error`);
  } finally {
    if (result.success) {
      redirect("/auth/login?activated=1");
    } else {
      redirect("/auth/confirm?error=1");
    }
  }
}
