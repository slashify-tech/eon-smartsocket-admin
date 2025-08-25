import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'ar',
  localeDetection: false,
  localePrefix: 'as-needed'
});

// No type exports in JS
export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
