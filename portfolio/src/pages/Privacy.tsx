import { ExternalLink } from '../components/ExternalLink';
import type { PolicyBlock } from '../data/types';
import { useSite } from '../SiteContext';

export function Privacy() {
  const { data, t, locale, switchHref } = useSite();
  const policy = data.privacy[locale] ?? data.privacy.en;

  return (
    <div className="policy">
      <header className="policy__head">
        <p className="kicker">{t.nav.privacy}</p>
        <h1 id="top">{policy.title}</h1>
        <dl className="policy__facts">
          <div>
            <dt>{t.privacy.effective}</dt>
            <dd>
              <time dateTime={policy.effectiveDate}>{policy.effectiveDate}</time>
            </dd>
          </div>
          {policy.lastUpdated && (
            <div>
              <dt>{t.privacy.updated}</dt>
              <dd>
                <time dateTime={policy.lastUpdated}>{policy.lastUpdated}</time>
              </dd>
            </div>
          )}
          <div>
            <dt>{t.privacy.responsible}</dt>
            <dd>{policy.responsibleParty}</dd>
          </div>
          <div>
            <dt>{t.privacy.contact}</dt>
            <dd>
              <a href={`mailto:${policy.contactEmail}`}>{policy.contactEmail}</a>
            </dd>
          </div>
        </dl>
        {t.privacy.translationNote && (
          <p className="policy__note">
            {t.privacy.translationNote}{' '}
            <a href={switchHref('en')} lang="en" hrefLang="en">
              {t.privacy.original}
            </a>
          </p>
        )}
        <button type="button" className="button button--small policy__print" onClick={() => window.print()}>
          {t.privacy.print}
        </button>
      </header>

      <div className="policy__layout">
        <nav className="policy__toc" aria-labelledby="toc-title">
          <h2 id="toc-title">{t.privacy.contents}</h2>
          <ol>
            {policy.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span className="policy__numeral">{section.numeral}.</span> {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="policy__body">
          {policy.sections.map((section) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`}>
                <span className="policy__numeral">{section.numeral}.</span> {section.title}
              </h2>
              {section.blocks.map((block, index) => (
                <Block key={index} block={block} />
              ))}
            </section>
          ))}
          <p className="policy__top">
            <a href="#top">{t.privacy.top}</a>
          </p>
        </div>
      </div>
    </div>
  );
}

function Block({ block }: { block: PolicyBlock }) {
  if (block.type === 'p') return <p>{block.text}</p>;

  if (block.type === 'list') {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === 'links') {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item.url}>
            <ExternalLink href={item.url}>{item.label}</ExternalLink>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p>
      {block.label} : <a href={`mailto:${block.email}`}>{block.email}</a>
    </p>
  );
}
