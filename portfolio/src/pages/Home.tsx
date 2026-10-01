import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ContactLinks } from '../components/ContactLinks';
import { GamesZone } from '../components/journey/GamesZone';
import { Backdrop } from '../components/journey/Backdrop';
import { Island } from '../components/journey/Island';
import { Mascot } from '../components/journey/Mascot';
import { Trail } from '../components/journey/Trail';
import { ZoneIndicator, type ZoneStep } from '../components/journey/ZoneIndicator';
import { SkillIcon } from '../components/SkillIcon';
import { Text } from '../components/Text';
import { mountJourney, type JourneyHandle } from '../journey/controller';
import { useMotionPreference } from '../journey/useMotionPreference';
import { useSite } from '../SiteContext';

const order = (index: number) => ({ '--i': index }) as CSSProperties;

export function Home() {
  const { data, t, tr, asset, href } = useSite();
  const { profile, contact } = data.site;
  const rootRef = useRef<HTMLDivElement>(null);
  const coinsRef = useRef<HTMLSpanElement>(null);
  const handleRef = useRef<JourneyHandle | null>(null);
  const [zone, setZone] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [reduced, toggleMotion] = useMotionPreference();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const handle = mountJourney(root, {
      coinSrc: asset('media/scene/coin.svg'),
      onZone: setZone,
      onCoins: (collected, total) => {
        if (coinsRef.current) coinsRef.current.textContent = `${collected}/${total}`;
      },
    });
    handleRef.current = handle;
    return () => {
      handleRef.current = null;
      handle.destroy();
    };
  }, [asset]);

  useEffect(() => {
    handleRef.current?.setReduced(reduced);
  }, [reduced]);

  const steps: ZoneStep[] = [
    { id: 'start', label: t.zones.start },
    { id: 'intro', label: t.zones.intro },
    { id: 'skills', label: t.zones.skills },
    { id: 'games', label: t.zones.games },
    { id: 'contact', label: t.zones.contact },
  ];

  return (
    <>
      <Backdrop />

      <div className="journey" ref={rootRef}>
        <Trail />

        <section id="start" className="zone zone--hero" data-zone aria-labelledby="hero-title">
          <div className="zone__body hero">
            <p className="eyebrow">{t.hero.eyebrow}</p>
            <h1 id="hero-title">{tr(profile.headline)}</h1>
            <p className="hero__who">
              <Text value={profile.name} />
              <span aria-hidden="true"> · </span>
              {tr(profile.role)}
            </p>
            <p className="hero__actions">
              <a className="button button--gold" href="#intro">
                {t.hero.start}
              </a>
              <a className="button button--ghost" href="#games">
                {t.hero.games}
              </a>
            </p>
            <p className="hero__hint" aria-hidden="true">
              <span className="hero__mouse" />
              {t.hero.scroll}
            </p>
          </div>
          <div className="zone__art" aria-hidden="true">
            <Island name="hero" eager />
            <span className="float float--a" />
            <span className="float float--b" />
            <span className="wp wp--exit" data-wp />
          </div>
        </section>

        <section id="intro" className="zone zone--art-left" data-zone aria-labelledby="intro-title">
          <div className="zone__art" aria-hidden="true">
            <span className="wp wp--enter" data-wp />
            <Island name="intro" />
            <span className="wp wp--exit" data-wp />
          </div>
          <div className="zone__body" data-scrub>
            <p className="kicker reveal" style={order(0)}>
              {t.intro.kicker}
            </p>
            <h2 id="intro-title" className="reveal" style={order(1)}>
              {t.intro.title}
            </h2>
            {profile.intro.map((paragraph) => (
              <p key={paragraph.en} className="lead reveal" style={order(2)}>
                {tr(paragraph)}
              </p>
            ))}
            <div className="note reveal" style={order(3)}>
              <h3>{t.intro.approachTitle}</h3>
              <p>
                <Text value={tr(profile.approach)} />
              </p>
            </div>
            <p className="reveal" style={order(4)}>
              <a className="button button--ghost" href={href('about')}>
                {t.intro.more}
              </a>
            </p>
          </div>
        </section>

        <section id="skills" className="zone zone--art-right" data-zone aria-labelledby="skills-title">
          <div className="zone__art" aria-hidden="true">
            <span className="wp wp--enter" data-wp />
            <Island name="workshop" />
            <span className="wp wp--exit" data-wp />
          </div>
          <div className="zone__body" data-scrub>
            <p className="kicker reveal" style={order(0)}>
              {t.skills.kicker}
            </p>
            <h2 id="skills-title" className="reveal" style={order(1)}>
              {t.skills.title}
            </h2>
            <p className="lead reveal" style={order(2)}>
              {t.skills.lead}
            </p>
            <ul className="bench">
              {data.skills.map((skill, index) => (
                <li
                  key={skill.id}
                  className={`tool reveal${picked === skill.id ? ' is-picked' : ''}`}
                  style={order(Math.min(3 + index * 0.5, 6))}
                  onClick={() => setPicked((value) => (value === skill.id ? null : skill.id))}
                >
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
          </div>
        </section>

        <GamesZone />

        <section id="contact" className="zone zone--art-left zone--contact" data-zone aria-labelledby="contact-title">
          <div className="zone__art" aria-hidden="true">
            <span className="wp wp--enter" data-wp />
            <Island name="contact" />
          </div>
          <div className="zone__body" data-scrub>
            <p className="kicker reveal" style={order(0)}>
              {t.contact.kicker}
            </p>
            <h2 id="contact-title" className="reveal" style={order(1)}>
              {t.contact.title}
            </h2>
            <p className="lead reveal" style={order(2)}>
              {tr(contact.invitation)}
            </p>
            <p className="reveal" style={order(3)}>
              <a className="button button--gold" href={`mailto:${contact.email}`}>
                {t.contact.emailMe}
              </a>
            </p>
            <div className="reveal" style={order(4)}>
              <ContactLinks />
            </div>
          </div>
        </section>

        <Mascot />
      </div>

      <ZoneIndicator steps={steps} active={zone} coinsRef={coinsRef} reduced={reduced} onToggleMotion={toggleMotion} />
    </>
  );
}
