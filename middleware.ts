import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18nNavigation';

// export { auth as middleware } from '@/server/auth';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // 匹配所有路径，但排除不需要国际化的路径
    '/((?!api|_next|.*\\.|favicon.ico).*)',
    // 或者更具体的匹配
    '/',
    '/(zh|en)/:path*',
  ],
};
