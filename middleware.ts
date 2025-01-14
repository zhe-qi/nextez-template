import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18nNavigation';

// export { auth as middleware } from '@/server/auth';

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh|en)/:path*'],
};

export default createMiddleware(routing);
