'use server';

import prismadb from '@/lib/prismadb';

import { has } from '@/lib/rbac';
import { revalidatePath } from 'next/cache';

type IDeleteRolePermission = {
  roleId: number;
  permissionId: number;
};

export async function removePermission({
  roleId,
  permissionId,
}: IDeleteRolePermission) {
  try {
    const isAuthorized = await has({ role: 'admin' });

    if (!isAuthorized) {
      return { success: false, message: 'Unauthorized' };
    }

    await prismadb.rolePermission.deleteMany({
      where: { roleId, permissionId },
    });

    revalidatePath(`/admin/roles/${roleId}/permissions`);

    return { success: true };
  } catch (error) {
    console.error('Error removing permission:', error);
    return { success: false, message: 'Something went wrong' };
  }
}
