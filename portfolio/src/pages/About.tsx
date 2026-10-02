import { Backdrop } from '../components/journey/Backdrop';
import { Text } from '../components/Text';
import { useSite } from '../SiteContext';

export function About() {
  const { data, t, tr, asset } = useSite();
  const { profile } = data.site;

  return (
    <>
      <Backdrop />
      <div className="page">
        <header className="profile">
          <div className="profile__avatar">
            <img
              src={asset(profile.avatar.src)}
              width={profile.avatar.width}
              height={profile.avatar.height}
              alt={tr(profile.avatar.alt)}
            />
          </div>
          <div>
            <p className="kicker">{t.nav.about}</p>
            <h1>
              <Text value={profile.name} />
            </h1>
            <p className="profile__role">{tr(profile.role)}</p>
            {profile.intro.map((paragraph) => (
              <p key={paragraph.en} className="lead">
                {tr(paragraph)}
              </p>
            ))}
          </div>
        </header>

        <section className="block" aria-labelledby="direction-title">
          <h2 id="direction-title">{t.about.directionTitle}</h2>
          <ul className="quests">
            {profile.direction.map((item) => (
              <li key={item.en}>
                <Text value={tr(item)} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
