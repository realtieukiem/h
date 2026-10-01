import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App';
import { dataSource } from './data/source';
import { pageFromPathname } from './routes';
import './styles/index.css';

const container = document.getElementById('root');

if (container) {
  const page = pageFromPathname(window.location.pathname);
  dataSource.load().then((data) => {
    const app = <App page={page} data={data} />;
    if (container.firstElementChild) hydrateRoot(container, app);
    else createRoot(container).render(app);
  });
}
