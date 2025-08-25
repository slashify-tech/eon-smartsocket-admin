import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  try {
    const messages = await import(`../../dictionary/${locale}.json`).then((mod) => mod.default);
    return {
      locale,
      messages
    };
  } catch (error) {
    console.error(`Error loading translation file for locale "${locale}":`, error);
    return {
      locale: routing.defaultLocale,
      messages: {}
    };
  }
});
