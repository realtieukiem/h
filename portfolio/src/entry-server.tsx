import { renderToString } from 'react-dom/server';
import { App } from './App';
import { dataSource } from './data/source';
import { pageMeta } from './meta';
import { LOCALES, PAGE_IDS, rootPrefix, routePath, type Route } from './routes';

export { LOCALES, PAGE_IDS, rootPrefix, routePath };

export async function render(route: Route) {
  const data = await dataSource.load();
  return {
    html: renderToString(<App route={route} data={data} />),
    meta: pageMeta(route, data),
    brand: data.site.brand,
    siteUrl: data.site.siteUrl.replace(/\/+$/, ''),
  };
}
