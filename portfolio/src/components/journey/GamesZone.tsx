import type { CSSProperties } from 'react';
import type { CategoryInfo, Game } from '../../data/types';
import { useSite } from '../../SiteContext';
import { useGameDetails } from '../GameDetails';
import { GameIcon } from '../GameIcon';
import { Island } from './Island';

const STATION_LIMIT = 6;

const order = (index: number) => ({ '--i': Math.min(index, 6) }) as CSSProperties;

export function GamesZone() {
  const { data, t, tr, href } = useSite();
  const byCategory = (category: CategoryInfo) => data.games.filter((game) => game.category === category.id);

  return (
    <section id="games" className="zone zone--games" data-zone aria-labelledby="games-title">
      <div className="zone__lane" aria-hidden="true">
        <span className="wp wp--enter" data-wp />
        <span className="wp wp--exit" data-wp />
      </div>

      <div className="zone__wide">
        <div className="games-head">
          <div className="games-head__art" aria-hidden="true">
            <Island name="gallery" stopY="57%" />
          </div>
          <div className="zone__body" data-scrub>
            <p className="kicker reveal" style={order(0)}>
              {t.games.kicker}
            </p>
            <h2 id="games-title" className="reveal" style={order(1)}>
              {t.games.title}
            </h2>
            <p className="lead reveal" style={order(2)}>
              {t.games.lead}
            </p>
          </div>
          <span className="wp wp--mid" data-wp aria-hidden="true" />
        </div>

        {data.categories.map((category) => {
          const games = byCategory(category);
          if (!games.length) return null;
          return (
            <div key={category.id} className="cluster" data-scrub>
              <div className="cluster__head reveal" style={order(0)}>
                <h3>{tr(category.label)}</h3>
                <p>{tr(category.blurb)}</p>
              </div>
              {category.id === 'mobile' ? (
                <ul className="portals">
                  {games.map((game, index) => (
                    <Portal key={game.slug} game={game} index={index} />
                  ))}
                </ul>
              ) : (
                <ul className="stations">
                  {games.slice(0, STATION_LIMIT).map((game, index) => (
                    <Station key={game.slug} game={game} index={index} />
                  ))}
                  {games.length > STATION_LIMIT && (
                    <li className="reveal" style={order(STATION_LIMIT)}>
                      <a className="station station--more" href={href('about', `#${category.anchor}`)}>
                        <span className="station__count">+{games.length - STATION_LIMIT}</span>
                        <span className="station__name">
                          {t.games.more}
                          <span className="sr-only"> {tr(category.label)}</span>
                        </span>
                      </a>
                    </li>
                  )}
                </ul>
              )}
            </div>
          );
        })}

        <p className="games-all">
          <a className="button button--ghost" href={href('about', '#games')}>
            {t.games.browseAll}
          </a>
        </p>
      </div>
    </section>
  );
}

function Portal({ game, index }: { game: Game; index: number }) {
  const { t, tr, asset } = useSite();
  const { open } = useGameDetails();
  const image = game.screenshots?.[0];

  return (
    <li className="portal reveal" style={order(index + 1)}>
      <div className="portal__arch">
        {image && (
          <img
            src={asset(image.src)}
            width={image.width}
            height={image.height}
            alt={tr(image.alt)}
            loading="lazy"
            decoding="async"
          />
        )}
        <span className="portal__ring" aria-hidden="true" />
      </div>
      <div className="portal__plate">
        <GameIcon game={game} size={56} />
        <div>
          <h4>{game.title}</h4>
          {game.genre && <p className="chip">{tr(game.genre)}</p>}
        </div>
      </div>
      {game.summary && <p className="portal__summary">{tr(game.summary)}</p>}
      <button type="button" className="button button--small" onClick={() => open(game.slug)}>
        {t.games.details}
        <span className="sr-only">: {game.title}</span>
      </button>
    </li>
  );
}

function Station({ game, index }: { game: Game; index: number }) {
  const { t, tr } = useSite();
  const { open } = useGameDetails();
  const highlight = game.highlights?.[0];

  return (
    <li className="reveal" style={order(index)}>
      <button
        type="button"
        className="station"
        aria-label={`${t.games.detailsFor} ${game.title}`}
        onClick={() => open(game.slug)}
      >
        <GameIcon game={game} size={88} />
        <span className="station__name">{game.title}</span>
        {highlight && <span className="station__note">{tr(highlight)}</span>}
      </button>
    </li>
  );
}
