import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Game } from '../data/types';
import { useSite } from '../SiteContext';
import { ExternalLink } from './ExternalLink';
import { GameIcon } from './GameIcon';
import { Text } from './Text';

interface GameDetailsValue {
  open: (slug: string) => void;
}

const GameDetailsContext = createContext<GameDetailsValue>({ open: () => undefined });

export const useGameDetails = (): GameDetailsValue => useContext(GameDetailsContext);

const syncUrl = (slug: string | null) => {
  const url = new URL(window.location.href);
  if (slug) url.searchParams.set('game', slug);
  else url.searchParams.delete('game');
  window.history.replaceState(null, '', url);
};

export function GameDetailsProvider({ children }: { children: ReactNode }) {
  const { data, t } = useSite();
  const [slug, setSlug] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const game = data.games.find((entry) => entry.slug === slug) ?? null;

  useEffect(() => {
    const requested = new URL(window.location.href).searchParams.get('game');
    if (requested && data.games.some((entry) => entry.slug === requested)) setSlug(requested);
  }, [data.games]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (game && !dialog.open) dialog.showModal();
    if (!game && dialog.open) dialog.close();
  }, [game]);

  const open = useCallback((next: string) => {
    setSlug(next);
    syncUrl(next);
  }, []);

  const handleClose = useCallback(() => {
    setSlug(null);
    syncUrl(null);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <GameDetailsContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        className="game-dialog"
        aria-labelledby="game-dialog-title"
        onClose={handleClose}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        {game && (
          <div className="game-dialog__panel">
            <form method="dialog" className="game-dialog__close">
              <button type="submit" className="icon-button" aria-label={t.game.close}>
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
            </form>
            <GameSheet game={game} />
          </div>
        )}
      </dialog>
    </GameDetailsContext.Provider>
  );
}

function GameSheet({ game }: { game: Game }) {
  const { data, t, tr, asset, href } = useSite();
  const category = data.categories.find((entry) => entry.id === game.category);
  const platforms = game.platforms ?? category?.platforms ?? [];
  const links = game.links ?? {};
  const linkItems = [
    links.googlePlay && { url: links.googlePlay, label: t.game.googlePlay },
    links.appStore && { url: links.appStore, label: t.game.appStore },
    links.web && { url: links.web, label: t.game.web },
  ].filter((item): item is { url: string; label: string } => Boolean(item));

  return (
    <article className="game-sheet">
      <header className="game-sheet__head">
        <GameIcon game={game} size={84} eager />
        <div>
          <h2 id="game-dialog-title">{game.title}</h2>
          <dl className="game-sheet__facts">
            <div>
              <dt>{t.game.category}</dt>
              <dd>{category ? tr(category.singular) : game.category}</dd>
            </div>
            <div>
              <dt>{t.game.genre}</dt>
              <dd>
                <Text value={game.genre ? tr(game.genre) : t.game.genreMissing} />
              </dd>
            </div>
            <div>
              <dt>{t.game.platform}</dt>
              <dd>{platforms.join(', ')}</dd>
            </div>
          </dl>
        </div>
      </header>

      {game.screenshots?.length ? (
        <div className="game-sheet__shots">
          {game.screenshots.map((image) => (
            <img
              key={image.src}
              src={asset(image.src)}
              width={image.width}
              height={image.height}
              alt={tr(image.alt)}
              decoding="async"
            />
          ))}
        </div>
      ) : null}

      <section>
        <h3>{t.game.about}</h3>
        {game.description?.length ? (
          game.description.map((paragraph) => <p key={paragraph.en}>{tr(paragraph)}</p>)
        ) : (
          <p>
            <Text value={category ? tr(category.about) : t.game.descriptionMissing} />
          </p>
        )}
      </section>

      {game.highlights?.length ? (
        <section>
          <h3>{t.game.highlights}</h3>
          <ul className="game-sheet__highlights">
            {game.highlights.map((item) => (
              <li key={item.en}>{tr(item)}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <div className="game-sheet__role">
        <section>
          <h3>{t.game.role}</h3>
          <p>
            <Text value={tr(game.role ?? category?.role ?? { en: t.game.roleMissing })} />
          </p>
        </section>
        <section>
          <h3>{t.game.work}</h3>
          {game.contributions?.length ? (
            <ul>
              {game.contributions.map((item) => (
                <li key={item.en}>{tr(item)}</li>
              ))}
            </ul>
          ) : (
            <p>
              <Text value={category ? tr(category.work) : t.game.workMissing} />
            </p>
          )}
        </section>
      </div>

      <section>
        <h3>{t.game.links}</h3>
        {linkItems.length ? (
          <p className="game-sheet__links">
            {linkItems.map((item) => (
              <ExternalLink key={item.url} href={item.url} className="button button--gold">
                {item.label}
              </ExternalLink>
            ))}
          </p>
        ) : (
          !game.linkNote && <p className="muted">{t.game.noLinks}</p>
        )}
        {game.linkNote && <p className="muted">{tr(game.linkNote)}</p>}
      </section>

      <p className="game-sheet__policy">
        <a href={href('privacy')}>{t.game.privacy}</a>
      </p>
    </article>
  );
}
