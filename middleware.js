import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n/settings';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 