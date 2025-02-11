'use server';

import type { DataResult } from '@/types/types';
import prismadb from '@/lib/prismadb';
import { has } from '@/lib/rbac';
import { revalidatePath } from 'next/cache';

type IRole = {
  roleId: number;
  userIds?: number[] | undefined;
};

export async function addUsersToRoles({
  roleId,
  userIds,
}: IRole): Promise<DataResult<IRole>> {
  try {
    const isAuthorized = await has({ role: 'admin' });

    if (!isAuthorized) {
      return { success: false, message: 'Unauthorized' };
    }

    const currentUsers = await prismadb.userRole.findMany({
      where: { roleId },
      select: { userId: true },
    });

    const currentUserIds = new Set(currentUsers.map(user => user.userId));
    const newUserIds = new Set(userIds?.map(userId => userId) || []);
    const usersToDelete = currentUsers.filter(
      user => !newUserIds.has(user.userId),
    );
    const usersToAdd
      = userIds?.filter(userId => !currentUserIds.has(userId)) || [];
    const dataToInsert = usersToAdd.map(userId => ({
      roleId,
      userId,
    }));

    await prismadb.userRole.deleteMany({
      where: {
        roleId,
        userId: {
          in: usersToDelete.map(user => user.userId),
        },
      },
    });

    await prismadb.userRole.createMany({ data: dataToInsert });

    revalidatePath(`/admin/roles/${roleId}/users`);

    return { success: true };
  } catch (error) {
    console.error('Error adding user:', error);
    return { success: false, message: 'Something went wrong' };
  }
}
