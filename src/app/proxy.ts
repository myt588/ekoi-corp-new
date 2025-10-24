import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ja'],

  // Used when no locale matches
  defaultLocale: 'en',

  // Always use locale prefix in URL (e.g., /en/products, /ja/products)
  localePrefix: 'always',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(ja|en)/:path*'],
};
