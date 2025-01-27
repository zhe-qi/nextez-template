'use client';

import { routing } from '@/lib/i18n-navigation';
import { cn } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'next-themes';
import NextError from 'next/error';

export default function GlobalError() {
  return (
    <html lang={routing.defaultLocale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background antialiased',
          GeistSans.className,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* `NextError` is the default Next.js error page component. Its type
          definition requires a `statusCode` prop. However, since the App Router
          does not expose status codes for errors, we simply pass 0 to render a
          generic error message. */}
          <NextError statusCode={0} />
        </ThemeProvider>
      </body>
    </html>
  );
}
