import type { SiteData } from './data/types';
import { getStrings } from './i18n';
import { PAGE_PATHS, type PageId } from './routes';

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

export const pageMeta = (page: PageId, data: SiteData): PageMeta => {
  const t = getStrings(data.site.locale).meta;
  const brand = data.site.brand;
  const base = data.site.siteUrl.replace(/\/+$/, '');
  const canonical = base ? `${base}/${PAGE_PATHS[page]}` : '';

  if (page === 'about') return { title: `${t.aboutTitle} · ${brand}`, description: t.aboutDescription, canonical };
  if (page === 'extras') return { title: `${t.extrasTitle} · ${brand}`, description: t.extrasDescription, canonical };
  if (page === 'privacy') return { title: `${t.privacyTitle} · ${brand}`, description: t.privacyDescription, canonical };
  return { title: `${brand} · ${t.homeTitle}`, description: t.homeDescription, canonical };
};
