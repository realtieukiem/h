import { ExternalLink } from '../components/ExternalLink';
import { Backdrop } from '../components/journey/Backdrop';
import { useSite } from '../SiteContext';

export function Extras() {
  const { data, t, tr, asset } = useSite();

  return (
    <>
      <Backdrop />
      <div className="page">
        <header className="page__head">
          <p className="kicker">{t.nav.extras}</p>
          <h1>{t.extras.title}</h1>
          <p className="lead">{t.extras.lead}</p>
        </header>

        <section id="toolkits" className="block" aria-labelledby="toolkits-title">
          <h2 id="toolkits-title">{t.extras.toolkitsTitle}</h2>
          <p className="lead">{t.extras.toolkitsLead}</p>
          <ul className="kits">
            {data.toolkits.map((kit) => (
              <li key={kit.id} className="kit">
                {kit.image && (
                  <img
                    src={asset(kit.image.src)}
                    width={kit.image.width}
                    height={kit.image.height}
                    alt={tr(kit.image.alt)}
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div>
                  <h3>{kit.title}</h3>
                  <p>{tr(kit.description)}</p>
                  <ExternalLink className="button button--small" href={kit.url}>
                    {tr(kit.linkLabel)}
                  </ExternalLink>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section id="side-projects" className="block" aria-labelledby="side-title">
          <h2 id="side-title">{t.extras.sideTitle}</h2>
          <p className="lead">{t.extras.sideLead}</p>
          <ul className="sides">
            {data.sideProjects.map((item) => (
              <li key={item.id}>
                <h3>{item.title}</h3>
                <p>{tr(item.description)}</p>
                <ExternalLink className="text-link" href={item.url}>
                  {tr(item.linkLabel)}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
