import type { Game } from '../data/types';
import { useSite } from '../SiteContext';

interface GameIconProps {
  game: Game;
  size: number;
  eager?: boolean;
}

export function GameIcon({ game, size, eager = false }: GameIconProps) {
  const { asset } = useSite();

  if (!game.icon) {
    return (
      <span className="game-icon game-icon--blank" style={{ width: size, height: size }} aria-hidden="true">
        {game.title.charAt(0)}
      </span>
    );
  }

  return (
    <img
      className="game-icon"
      src={asset(game.icon.src)}
      width={size}
      height={size}
      alt=""
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
