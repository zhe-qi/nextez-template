import { getUserByEmail } from "@/data/user";

import ResetPasswordEmail from "@/emails/reset-email";
import { env } from "@/env";
import { generateUserToken } from "@/lib/jwt";

import { sendMail } from "@/lib/mail";
import { render } from "@react-email/render";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email } = body;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return NextResponse.json(
        { error: "Email does not exists" },
        { status: 404 },
      );
    }

    const token: string = generateUserToken(email);

    const url: string = `${env.AUTH_URL}/auth/reset-password/${token}`;

    const emailHtml = await render(ResetPasswordEmail({ url }));

    await sendMail(email, "Reset password", emailHtml);

    return NextResponse.json({ message: "Email sent" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
