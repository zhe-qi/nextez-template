'use server';

import type { DataResult } from '@/types/types';
import { auth } from '@/auth';
import prismadb from '@/lib/prismadb';

type FormDataDeleteAccount = {
  userEmail: string;
  confirmString: string;
};

export async function deleteAccount({
  userEmail,
  confirmString,
}: FormDataDeleteAccount): Promise<DataResult<FormDataDeleteAccount>> {
  const session = await auth();
  const errors: { userEmail: string[]; confirmString: string[] } = {
    userEmail: [],
    confirmString: [],
  };
  try {
    const email = session?.user?.email;

    if (confirmString != 'delete my account') {
      errors.confirmString.push('Please type \'delete my account\'');
    }

    if (email) {
      const user = await prismadb.user.findUnique({ where: { email } });

      if (user) {
        if (user.email === userEmail) {
          await prismadb.user.delete({
            where: {
              id: user.id,
            },
          });
          return { success: true };
        } else {
          errors.userEmail.push('Wrong email');
        }
      }
    }

    return { success: false, errors };
  } catch {
    return { success: false };
  }
}
