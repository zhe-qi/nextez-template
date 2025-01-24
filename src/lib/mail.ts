"use server";

import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { env } from "@/env";
import nodemailer from "nodemailer";

export async function sendMail(toEmail: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: env.MAIL_SERVER,
    port: env.MAIL_PORT,
    secureConnection: env.MAIL_USE_TLS,
    auth: {
      user: env.MAIL_USERNAME,
      pass: env.MAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  } as SMTPTransport.Options);

  const mailOptions = {
    from: env.MAIL_USERNAME,
    to: toEmail,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch {
    return false;
  }
}
