'use client';

import NotFound404 from '@/components/404';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { routing } from '@/lib/i18n-navigation';
import { cn } from '@/lib/utils';
import { ThemeProvider } from 'next-themes';

export default function NotFoundPage() {
  return (
    <html lang={routing.defaultLocale} suppressHydrationWarning>
      <body
        className={cn('min-h-screen antialiased scheme-light dark:scheme-dark')}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MaxWidthWrapper className="mt-20">
            <NotFound404
              message="Oops! Page not found"
              link="/"
              linkText="Back to home"
              showLogo
            />
          </MaxWidthWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
