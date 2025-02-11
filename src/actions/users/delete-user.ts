'use server';

import prismadb from '@/lib/prismadb';
import { has } from '@/lib/rbac';
import { revalidatePath } from 'next/cache';

export async function deleteUser(id: number) {
  try {
    const isAuthorized = await has({ role: 'admin' });

    if (!isAuthorized) {
      return { success: false, message: 'Unauthorized' };
    }

    await prismadb.user.delete({ where: { id } });

    revalidatePath(`/admin/users`);

    return { success: true };
  } catch {
    return { success: false, message: 'Something went wrong' };
  }
}
