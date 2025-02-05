'use client';

import type { AbstractIntlMessages } from 'next-intl';
import { AppConfig } from '@/lib/app-config';
import { SessionProvider } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { TooltipProvider } from './ui/tooltip';

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
      <NextIntlClientProvider timeZone={AppConfig.timeZone} messages={messages} locale={locale}>
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
