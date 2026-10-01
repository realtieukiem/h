import { createContext, useContext } from 'react';
import type { Localized, SiteData } from './data/types';
import { getStrings, pick } from './i18n';
import type { Strings } from './i18n/en';
import { PAGE_PATHS, rootPrefix, type PageId } from './routes';

export interface SiteContextValue {
  page: PageId;
  data: SiteData;
  t: Strings;
  tr: (value: Localized) => string;
  asset: (path: string) => string;
  href: (page: PageId, suffix?: string) => string;
}

export const createSiteContext = (page: PageId, data: SiteData): SiteContextValue => {
  const root = rootPrefix(page);
  const locale = data.site.locale;
  return {
    page,
    data,
    t: getStrings(locale),
    tr: (value) => pick(value, locale),
    asset: (path) => root + path,
    href: (target, suffix = '') => root + PAGE_PATHS[target] + suffix,
  };
};

const SiteContext = createContext<SiteContextValue | null>(null);

export const SiteProvider = SiteContext.Provider;

export const useSite = (): SiteContextValue => {
  const value = useContext(SiteContext);
  if (!value) throw new Error('useSite must be used inside SiteProvider');
  return value;
};
