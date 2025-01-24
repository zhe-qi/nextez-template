"use client";

import { SessionProvider } from "next-auth/react";
import { type AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "./ui/tooltip";

export default function Providers({
  children,
  messages,
  locale,
}: {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
}) {
  return (
    <>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
        </SessionProvider>
      </NextIntlClientProvider>
    </>
  );
}
