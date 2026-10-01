import { useSite } from '../SiteContext';
import { ExternalLink } from './ExternalLink';

export function ContactLinks() {
  const { data, t } = useSite();
  const { contact } = data.site;

  return (
    <ul className="signposts">
      <li>
        <a className="signpost" href={`mailto:${contact.email}`}>
          <span className="signpost__label">{t.contact.email}</span>
          <span className="signpost__value">{contact.email}</span>
        </a>
      </li>
      {contact.phone && (
        <li>
          <a className="signpost" href={`tel:${contact.phone}`}>
            <span className="signpost__label">{t.contact.phone}</span>
            <span className="signpost__value">{contact.phone}</span>
          </a>
        </li>
      )}
      {contact.links.map((link) => (
        <li key={link.id}>
          <ExternalLink className="signpost" href={link.url}>
            <span className="signpost__label">{link.label}</span>
            <span className="signpost__value">{link.handle}</span>
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}
