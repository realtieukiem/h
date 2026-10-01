import { renderToString } from 'react-dom/server';
import { App } from './App';
import { dataSource } from './data/source';
import { pageMeta } from './meta';
import { PAGE_IDS, PAGE_PATHS, rootPrefix, type PageId } from './routes';

export { PAGE_IDS, PAGE_PATHS, rootPrefix };

export async function render(page: PageId) {
  const data = await dataSource.load();
  return {
    html: renderToString(<App page={page} data={data} />),
    meta: pageMeta(page, data),
    lang: data.site.locale,
    brand: data.site.brand,
  };
}
