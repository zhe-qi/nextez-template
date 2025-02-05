import NotFound404 from '@/components/404';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import Providers from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/lib/i18n-navigation';
import { cn } from '@/lib/utils';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistSans } from 'geist/font/sans';
import { getMessages, setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function NotFound() {
  const locale = routing.defaultLocale;
  setRequestLocale(locale);

  const messages = await getMessages();
  return (
    <html lang={routing.defaultLocale} suppressHydrationWarning>
      <body className={cn('min-h-screen bg-background antialiased', GeistSans.className)}>
        <div className="relative flex min-h-screen flex-col">
          <Providers messages={messages} locale={locale}>
            <div className="flex-1">
              <MaxWidthWrapper className="mt-20">
                <NotFound404
                  message="Oops! Page not found"
                  link="/"
                  linkText="Back to home"
                  showLogo
                />
              </MaxWidthWrapper>
              <SpeedInsights />
              <Analytics />
            </div>
            <Toaster richColors position="top-center" />
          </Providers>
        </div>
      </body>
    </html>
  );
}
