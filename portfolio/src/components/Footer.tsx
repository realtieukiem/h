import { useSite } from '../SiteContext';
import { ExternalLink } from './ExternalLink';

export function Footer() {
  const { data, t, href } = useSite();
  const { contact } = data.site;

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <p className="footer__name">{data.site.brand}</p>
          <p>{t.footer.tagline}</p>
        </div>

        <nav aria-label={t.footer.explore}>
          <h2 className="footer__title">{t.footer.explore}</h2>
          <ul>
            <li>
              <a href={href('home')}>{t.nav.home}</a>
            </li>
            <li>
              <a href={href('about')}>{t.nav.about}</a>
            </li>
            <li>
              <a href={href('extras')}>{t.nav.extras}</a>
            </li>
            <li>
              <a href={href('privacy')}>{t.nav.privacy}</a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="footer__title">{t.footer.reach}</h2>
          <ul>
            <li>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            {contact.links.map((link) => (
              <li key={link.id}>
                <ExternalLink href={link.url}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
