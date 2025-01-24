import { ApiError, getIdInputOrThrow, parseRequestBody } from '@/lib/api';
import { withAdmin } from '@/lib/auth';

import prismadb from '@/lib/prismadb';
import { userUpdateMetadataSchema } from '@/schemas/users';

import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { ZodError } from 'zod';

export const PUT = withAdmin(async ({ req, context }) => {
  try {
    const { userId } = context.params;
    if (!userId) {
      throw new ApiError({ message: 'User ID is required', code: 400 });
    }
    const id: number = getIdInputOrThrow(userId);

    const bodyRaw = await parseRequestBody(req);
    const { metadata } = userUpdateMetadataSchema.parse(bodyRaw);

    await prismadb.userMetadata.upsert({
      where: { userId: id },
      update: { metadata: metadata === null ? Prisma.JsonNull : metadata },
      create: {
        userId: id,
        metadata: metadata === null ? Prisma.JsonNull : metadata,
      },
    });

    revalidatePath(`/admin/user/${id}/metadata`);

    return NextResponse.json({
      success: true,
      message: 'Metadata saved successfully',
    });
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.code },
      );
    }
    if (error instanceof ZodError) {
      const errorsValidation = error.flatten().fieldErrors;
      return NextResponse.json({ errors: errorsValidation }, { status: 422 });
    }
    return NextResponse.json(
      { success: false, message: 'Failed to save metadata' },
      { status: 500 },
    );
  }
});
