import type { RefObject } from 'react';
import { useSite } from '../../SiteContext';

export interface ZoneStep {
  id: string;
  label: string;
}

interface ZoneIndicatorProps {
  steps: ZoneStep[];
  active: number;
  coinsRef: RefObject<HTMLSpanElement | null>;
  reduced: boolean;
  onToggleMotion: () => void;
}

export function ZoneIndicator({ steps, active, coinsRef, reduced, onToggleMotion }: ZoneIndicatorProps) {
  const { t, asset } = useSite();

  return (
    <nav className="hud" aria-label={t.zones.indicator}>
      <ol className="hud__steps">
        {steps.map((step, index) => (
          <li key={step.id} className={index <= active ? 'is-done' : undefined}>
            <a href={`#${step.id}`} aria-current={index === active ? 'step' : undefined}>
              <span className="hud__dot" aria-hidden="true" />
              <span className="hud__label">{step.label}</span>
            </a>
          </li>
        ))}
      </ol>
      <p className="hud__coins">
        <img src={asset('media/scene/coin.svg')} width={18} height={18} alt="" />
        <span ref={coinsRef}>0/0</span>
        <span className="sr-only"> {t.mascot.coins}</span>
      </p>
      <button type="button" className="hud__motion" aria-pressed={reduced} onClick={onToggleMotion}>
        {t.zones.motion}
      </button>
    </nav>
  );
}
