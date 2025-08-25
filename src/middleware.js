import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing'; // assuming routing.locales = ['en', 'ar'], etc.

const intlMiddleware = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localeDetection: true,
});

export function middleware(request) {
  const authToken = request.cookies.get('authToken')?.value;

  const pathname = request.nextUrl.pathname;
  const isLoginPath = pathname.includes('/login');

  // Redirect to /[locale]/login if not authenticated
  // if (!authToken && !isLoginPath) {
  //   const locale = routing.locales.find((loc) => pathname.startsWith(`/${loc}`)) || routing.defaultLocale;
  //   const loginUrl = new URL(`/${locale}/login`, request.url);
  //   return NextResponse.redirect(loginUrl);
  // }

  // Run the locale middleware if authenticated or on login page
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(ar|en)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)',
    '/((?!_next|images|favicon.ico|fonts|api).*)',
  ],
};