import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18nNavigation';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*'],
};
