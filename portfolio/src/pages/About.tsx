import { ContactLinks } from '../components/ContactLinks';
import { useGameDetails } from '../components/GameDetails';
import { GameIcon } from '../components/GameIcon';
import { Backdrop } from '../components/journey/Backdrop';
import { SkillIcon } from '../components/SkillIcon';
import { Text } from '../components/Text';
import type { CategoryInfo, Game } from '../data/types';
import { useSite } from '../SiteContext';

export function About() {
  const { data, t, tr, asset } = useSite();
  const { profile, contact } = data.site;

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
            <p>
              <Text value={tr(profile.approach)} />
            </p>
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

        <section className="block" aria-labelledby="about-skills-title">
          <h2 id="about-skills-title">{t.about.skillsTitle}</h2>
          <ul className="bench bench--wide">
            {data.skills.map((skill) => (
              <li key={skill.id} className="tool">
                <span className="tool__icon">
                  <SkillIcon name={skill.icon} />
                </span>
                <span className="tool__text">
                  <strong>
                    <Text value={skill.name} />
                  </strong>
                  <span>
                    <Text value={tr(skill.detail)} />
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section id="games" className="block" aria-labelledby="about-games-title">
          <h2 id="about-games-title">{t.about.gamesTitle}</h2>
          <p className="lead">{t.about.gamesLead}</p>
          <nav className="jump" aria-label={t.about.jump}>
            <ul>
              {data.categories.map((category) => (
                <li key={category.id}>
                  <a href={`#${category.anchor}`}>
                    {tr(category.label)}
                    <span className="jump__count">
                      {data.games.filter((game) => game.category === category.id).length}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {data.categories.map((category) => (
            <CategorySection key={category.id} category={category} />
          ))}
        </section>

        <section id="contact" className="block block--contact" aria-labelledby="about-contact-title">
          <h2 id="about-contact-title">{t.about.contactTitle}</h2>
          <p className="lead">{tr(contact.invitation)}</p>
          <ContactLinks />
        </section>
      </div>
    </>
  );
}

function CategorySection({ category }: { category: CategoryInfo }) {
  const { data, tr } = useSite();
  const games = data.games.filter((game) => game.category === category.id);
  if (!games.length) return null;

  return (
    <section id={category.anchor} className="category" aria-labelledby={`${category.anchor}-title`}>
      <header className="category__head">
        <h3 id={`${category.anchor}-title`}>{tr(category.label)}</h3>
        <p>{tr(category.blurb)}</p>
      </header>
      <ul className={`roster roster--${category.id}`}>
        {games.map((game) => (
          <RosterItem key={game.slug} game={game} category={category} />
        ))}
      </ul>
    </section>
  );
}

function RosterItem({ game, category }: { game: Game; category: CategoryInfo }) {
  const { t, tr, asset } = useSite();
  const { open } = useGameDetails();
  const image = game.screenshots?.[0];
  const platforms = game.platforms ?? category.platforms;

  return (
    <li className="entry">
      {image && (
        <img
          className="entry__shot"
          src={asset(image.src)}
          width={image.width}
          height={image.height}
          alt={tr(image.alt)}
          loading="lazy"
          decoding="async"
        />
      )}
      <div className="entry__main">
        <GameIcon game={game} size={64} />
        <div className="entry__text">
          <h4>{game.title}</h4>
          <p className="entry__meta">
            {[game.genre && tr(game.genre), ...platforms].filter(Boolean).join(' · ')}
          </p>
          {game.summary && <p>{tr(game.summary)}</p>}
          {game.highlights?.map((item) => (
            <p key={item.en} className="entry__note">
              {tr(item)}
            </p>
          ))}
          {(game.role || category.id === 'mobile') && (
            <p className="entry__role">
              <span>{t.game.role}: </span>
              <Text value={tr(game.role ?? category.role)} />
            </p>
          )}
        </div>
      </div>
      <button type="button" className="button button--small" onClick={() => open(game.slug)}>
        {t.games.details}
        <span className="sr-only">: {game.title}</span>
      </button>
    </li>
  );
}
