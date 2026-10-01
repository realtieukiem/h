import { useEffect, useState } from 'react';
import { useSite } from '../../SiteContext';

export function Mascot() {
  const { asset, t } = useSite();
  const [taps, setTaps] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!taps) return;
    setSpeaking(true);
    const timer = window.setTimeout(() => setSpeaking(false), 3600);
    return () => window.clearTimeout(timer);
  }, [taps]);

  const line = taps ? t.mascot.lines[(taps - 1) % t.mascot.lines.length] : '';

  return (
    <div className="mascot" data-mascot>
      <button
        type="button"
        className="mascot__body"
        aria-label={t.mascot.label}
        onClick={() => setTaps((value) => value + 1)}
      >
        <span className="mascot__flip">
          <img
            key={taps}
            className={taps ? 'is-jumping' : undefined}
            src={asset('media/scene/mascot.svg')}
            width={96}
            height={108}
            alt=""
          />
        </span>
      </button>
      <p className={`mascot__bubble${speaking ? ' is-visible' : ''}`} role="status">
        {speaking ? line : ''}
      </p>
    </div>
  );
}
