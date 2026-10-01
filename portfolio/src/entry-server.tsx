import { renderToString } from 'react-dom/server';
import { App } from './App';
import { dataSource } from './data/source';
import type { SiteData } from './data/types';
import { pick } from './i18n';
import { pageMeta } from './meta';
import { LOCALES, PAGE_IDS, rootPrefix, routePath, type Route } from './routes';

export { LOCALES, PAGE_IDS, rootPrefix, routePath };

const structuredData = (data: SiteData, route: Route, siteUrl: string) => {
  const { site } = data;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: site.brand,
        inLanguage: LOCALES,
        publisher: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: site.profile.name,
        alternateName: site.brand,
        jobTitle: pick(site.profile.role, route.locale),
        description: pick(site.profile.headline, route.locale),
        url: `${siteUrl}/`,
        image: `${siteUrl}/${site.profile.avatar.src}`,
        email: `mailto:${site.contact.email}`,
        sameAs: site.contact.links.map((link) => link.url),
      },
    ],
  };
};

export async function render(route: Route) {
  const data = await dataSource.load();
  const siteUrl = data.site.siteUrl.replace(/\/+$/, '');
  return {
    html: renderToString(<App route={route} data={data} />),
    meta: pageMeta(route, data),
    brand: data.site.brand,
    siteUrl,
    socialImage: data.site.socialImage,
    sitemapExtra: data.site.sitemapExtra,
    structuredData: siteUrl ? structuredData(data, route, siteUrl) : null,
  };
}
