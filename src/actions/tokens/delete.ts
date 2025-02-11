'use server';

import prismadb from '@/lib/prismadb';
import { has } from '@/lib/rbac';
import { revalidatePath } from 'next/cache';

export async function deleteToken(id: string) {
  try {
    const isAuthorized = await has({ role: 'admin' });

    if (!isAuthorized) {
      return { success: false, message: 'Unauthorized' };
    }

    await prismadb.token.delete({ where: { id } });

    revalidatePath(`/admin/tokens/`);

    return { success: true };
  } catch (error) {
    console.error('Error deleting token:', error);
    return { success: false, message: 'Something went wrong' };
  }
}
