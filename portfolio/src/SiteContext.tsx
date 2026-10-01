import { createContext, useContext } from 'react';
import type { Locale, Localized, SiteData } from './data/types';
import { getStrings, pick } from './i18n';
import type { Strings } from './i18n/en';
import { rootPrefix, routePath, type PageId, type Route } from './routes';

export interface SiteContextValue {
  page: PageId;
  locale: Locale;
  data: SiteData;
  t: Strings;
  tr: (value: Localized) => string;
  asset: (path: string) => string;
  href: (page: PageId, suffix?: string) => string;
  switchHref: (locale: Locale) => string;
}

export const createSiteContext = ({ page, locale }: Route, data: SiteData): SiteContextValue => {
  const root = rootPrefix(page, locale);
  return {
    page,
    locale,
    data,
    t: getStrings(locale),
    tr: (value) => pick(value, locale),
    asset: (path) => root + path,
    href: (target, suffix = '') => root + routePath(target, locale) + suffix,
    switchHref: (target) => root + routePath(page, target),
  };
};

const SiteContext = createContext<SiteContextValue | null>(null);

export const SiteProvider = SiteContext.Provider;

export const useSite = (): SiteContextValue => {
  const value = useContext(SiteContext);
  if (!value) throw new Error('useSite must be used inside SiteProvider');
  return value;
};
