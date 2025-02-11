import ConfirmEmail from '@/emails/confirm-email';
import { env } from '@/env';
import { generateUserToken } from '@/lib/jwt';
import { sendMail } from '@/lib/mail';
import prismadb from '@/lib/prismadb';
import { render } from '@react-email/render';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email } = body;

    const userExist = await prismadb.user.findFirst({ where: { email } });

    if (!userExist) {
      return NextResponse.json({ message: 'Email not found' }, { status: 404 });
    }

    if (!userExist.isActive) {
      return NextResponse.json(
        { message: 'Something went wrong' },
        { status: 404 },
      );
    }

    const token: string = generateUserToken(email);

    const url: string = `${env.AUTH_URL}/auth/confirm/${token}`;

    const emailHtml = await render(ConfirmEmail({ url }));

    await sendMail(email, 'Active account', emailHtml);

    return NextResponse.json({ message: 'Email sent' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
