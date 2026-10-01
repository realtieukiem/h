import { useEffect, useMemo } from 'react';
import { Footer } from './components/Footer';
import { GameDetailsProvider } from './components/GameDetails';
import { Navbar } from './components/Navbar';
import type { SiteData } from './data/types';
import { pageMeta } from './meta';
import { About } from './pages/About';
import { Extras } from './pages/Extras';
import { Home } from './pages/Home';
import { Privacy } from './pages/Privacy';
import type { PageId, Route } from './routes';
import { SiteProvider, createSiteContext } from './SiteContext';

interface AppProps {
  route: Route;
  data: SiteData;
}

const PAGES: Record<PageId, () => React.JSX.Element> = {
  home: Home,
  about: About,
  extras: Extras,
  privacy: Privacy,
};

export function App({ route, data }: AppProps) {
  const context = useMemo(() => createSiteContext(route, data), [route, data]);
  const { page } = route;
  const Page = PAGES[page];

  useEffect(() => {
    document.title = pageMeta(route, data).title;
    document.documentElement.lang = route.locale;
  }, [route, data]);

  return (
    <SiteProvider value={context}>
      <GameDetailsProvider>
        <div className={`app app--${page}`}>
          <a className="skip-link" href="#main">
            {context.t.nav.skip}
          </a>
          <Navbar />
          <main id="main" tabIndex={-1}>
            <Page />
          </main>
          <Footer />
        </div>
      </GameDetailsProvider>
    </SiteProvider>
  );
}
