"use server";

import prismadb from "@/lib/prismadb";

import { has } from "@/lib/rbac";
import { revalidatePath } from "next/cache";

type IDeleteRoleUser = {
  roleId: number;
  userId: number;
};

export async function removeUser({ roleId, userId }: IDeleteRoleUser) {
  try {
    const isAuthorized = await has({ role: "admin" });

    if (!isAuthorized) {
      return { success: false, message: "Unauthorized" };
    }

    await prismadb.userRole.deleteMany({
      where: { roleId, userId },
    });

    revalidatePath(`/admin/roles/${roleId}/users`);

    return { success: true };
  } catch (error) {
    console.error("Error removing user:", error);
    return { success: false, message: "Something went wrong" };
  }
}
