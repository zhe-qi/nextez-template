import { authConfig } from '@/auth.config';
import { routing } from '@/lib/i18n-navigation';
import NextAuth from 'next-auth';
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware(routing);

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isAuthenticated = !!req.auth;

  if (
    (req.nextUrl.pathname.startsWith('/auth/login')
      || req.nextUrl.pathname.startsWith('/auth/register'))
    && isAuthenticated
  ) {
    return Response.redirect(new URL('/tools', req.url));
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(de|en)/:path*',

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    // '/((?!_next|_vercel|.*\\..*).*)',

    '/((?!api|_next/static|_next/image|favicon.ico|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
  ],
};
