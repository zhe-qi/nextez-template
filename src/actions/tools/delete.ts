'use server';

import prismadb from '@/lib/prismadb';
import { has } from '@/lib/rbac';
import { revalidatePath } from 'next/cache';

export async function deleteTool(id: number) {
  try {
    const isAuthorized = await has({ role: 'admin' });

    if (!isAuthorized) {
      return { success: false, message: 'Unauthorized' };
    }

    await prismadb.tool.delete({ where: { id } });

    revalidatePath(`/admin/tools/`);

    return { success: true };
  } catch (error) {
    console.error('Error deleting tool:', error);
    return { success: false, message: 'Something went wrong' };
  }
}
