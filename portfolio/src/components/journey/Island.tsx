import type { CSSProperties } from 'react';
import { useSite } from '../../SiteContext';

interface IslandProps {
  name: 'hero' | 'intro' | 'workshop' | 'gallery' | 'contact';
  stopX?: string;
  stopY?: string;
  eager?: boolean;
}

export function Island({ name, stopX = '50%', stopY = '52%', eager = false }: IslandProps) {
  const { asset } = useSite();
  const style = { '--sx': stopX, '--sy': stopY } as CSSProperties;

  return (
    <div className={`island island--${name}`} data-scrub style={style}>
      <img
        src={asset(`media/scene/island-${name}.svg`)}
        width={480}
        height={440}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
      <span className="island__flag" />
      <span className="wp wp--stop" data-wp="stop" />
    </div>
  );
}
