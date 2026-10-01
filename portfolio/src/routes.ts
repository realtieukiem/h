import type { Locale } from './data/types';

export type PageId = 'home' | 'about' | 'extras' | 'privacy';

export interface Route {
  page: PageId;
  locale: Locale;
}

export const PAGE_PATHS: Record<PageId, string> = {
  home: '',
  about: 'about/',
  extras: 'extras/',
  privacy: 'privacy-policy/',
};

export const PAGE_IDS = Object.keys(PAGE_PATHS) as PageId[];

export const LOCALES: Locale[] = ['en', 'vi'];

export const DEFAULT_LOCALE: Locale = 'en';

export const routePath = (page: PageId, locale: Locale): string =>
  (locale === DEFAULT_LOCALE ? '' : `${locale}/`) + PAGE_PATHS[page];

export const rootPrefix = (page: PageId, locale: Locale): string => {
  const depth = routePath(page, locale).split('/').length - 1;
  return depth ? '../'.repeat(depth) : './';
};

export const routeFromPathname = (pathname: string): Route => {
  const segments = pathname.split('/').filter((part) => part && part !== 'index.html');
  const last = segments[segments.length - 1];
  const page = PAGE_IDS.find((id) => id !== 'home' && PAGE_PATHS[id] === `${last}/`);
  const localeSegment = page ? segments[segments.length - 2] : last;
  const locale = LOCALES.find((code) => code !== DEFAULT_LOCALE && code === localeSegment) ?? DEFAULT_LOCALE;
  return { page: page ?? 'home', locale };
};
