import type { Metadata } from "next";
import Providers from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/lib/i18n-navigation";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
  title: "nextjs template",
  description: "nextjs template",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  // Using internationalization in Client Components
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          GeistSans.className,
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Providers messages={messages} locale={locale}>
            <div className="flex-1">
              {children}
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
