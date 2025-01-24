'use server';

import prismadb from '@/lib/prismadb';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from './get-current-user';

export async function AddFavTool({ toolId }: { toolId: number }) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    try {
      await prismadb.userToolFavorites.create({
        data: { toolId, userId: currentUser.id },
      });
      revalidatePath('/tools');
      return { success: true, message: 'Tool added to favorites!' };
    } catch {
      return {
        success: false,
        message: 'Failed to add tool to favorites. Please try again.',
      };
    }
  }

  return {
    success: false,
    message: 'Failed to add tool to favorites. Please try again.',
  };
}

export async function RemoveFavTool({ toolId }: { toolId: number }) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    try {
      await prismadb.userToolFavorites.deleteMany({
        where: { toolId, userId: currentUser.id },
      });
      revalidatePath('/tools');
      return { success: true, message: 'Tool removed from favorites!' };
    } catch {
      return {
        success: false,
        message: 'Failed to remove tool from favorites. Please try again.',
      };
    }
  }

  return {
    success: false,
    message: 'Failed to remove tool from favorites. Please try again.',
  };
}
