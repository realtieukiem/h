interface Point {
  x: number;
  y: number;
}

interface Stop {
  y: number;
  zone: HTMLElement;
}

interface Scrub {
  el: HTMLElement;
  top: number;
  value: number;
}

interface Coin {
  el: SVGImageElement;
  y: number;
}

export interface JourneyOptions {
  coinSrc: string;
  onZone: (index: number) => void;
  onCoins: (collected: number, total: number) => void;
}

export interface JourneyHandle {
  setReduced: (reduced: boolean) => void;
  destroy: () => void;
}

const SVG_NS = 'http://www.w3.org/2000/svg';
const ANCHOR = 0.62;
const COIN_GAP = 190;
const COIN_SIZE = 24;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const offsetWithin = (el: HTMLElement, root: HTMLElement): Point => {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
};

const segmentY = (a: Point, b: Point, t: number) => a.y + (b.y - a.y) * (1.5 * t * (1 - t) + t * t * t);

const segmentX = (a: Point, b: Point, t: number) => a.x + (b.x - a.x) * (3 * t * t - 2 * t * t * t);

const solveT = (a: Point, b: Point, y: number) => {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 22; i += 1) {
    const mid = (lo + hi) / 2;
    if (segmentY(a, b, mid) < y) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
};

const buildPath = (points: Point[]) => {
  let d = `M${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 1; i < points.length; i += 1) {
    const a = points[i - 1];
    const b = points[i];
    const mid = ((a.y + b.y) / 2).toFixed(1);
    d += ` C${a.x.toFixed(1)} ${mid} ${b.x.toFixed(1)} ${mid} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`;
  }
  return d;
};

export function mountJourney(root: HTMLElement, options: JourneyOptions): JourneyHandle {
  const svg = root.querySelector<SVGSVGElement>('[data-trail]');
  const basePath = root.querySelector<SVGPathElement>('[data-trail-base]');
  const litPath = root.querySelector<SVGPathElement>('[data-trail-lit]');
  const clipRect = root.querySelector<SVGRectElement>('[data-trail-clip]');
  const coinLayer = root.querySelector<SVGGElement>('[data-coins]');
  const mascot = root.querySelector<HTMLElement>('[data-mascot]');
  const backdrop = document.querySelector<HTMLElement>('[data-backdrop]');
  const zones = Array.from(root.querySelectorAll<HTMLElement>('[data-zone]'));
  const scrubEls = Array.from(root.querySelectorAll<HTMLElement>('[data-scrub]'));

  let points: Point[] = [];
  let stops: Stop[] = [];
  let zoneTops: number[] = [];
  let scrubs: Scrub[] = [];
  let coins: Coin[] = [];
  let rootTop = 0;
  let reduced = false;
  let frame = 0;
  let lastY = -1;
  let lastX = 0;
  let activeZone = -1;
  let collected = -1;
  let walkTimer = 0;

  const findPoint = (y: number) => {
    let index = 1;
    while (index < points.length - 1 && points[index].y < y) index += 1;
    const a = points[index - 1];
    const b = points[index];
    const t = b.y - a.y < 1 ? 1 : solveT(a, b, y);
    return { x: segmentX(a, b, t), y };
  };

  const layout = () => {
    const width = root.offsetWidth;
    const height = root.offsetHeight;
    rootTop = root.getBoundingClientRect().top + window.scrollY;

    const markers = Array.from(root.querySelectorAll<HTMLElement>('[data-wp]')).filter((marker) => marker.offsetParent);
    const raw = markers.map((marker) => ({ marker, ...offsetWithin(marker, root) })).sort((a, b) => a.y - b.y);

    points = [];
    stops = [];
    for (const entry of raw) {
      const previous = points[points.length - 1];
      const y = previous && entry.y <= previous.y ? previous.y + 1 : entry.y;
      points.push({ x: entry.x, y });
      const zone = entry.marker.dataset.wp === 'stop' ? entry.marker.closest<HTMLElement>('[data-zone]') : null;
      if (zone) stops.push({ y, zone });
    }

    zoneTops = zones.map((zone) => offsetWithin(zone, root).y);
    scrubs = scrubEls.map((el) => ({ el, top: offsetWithin(el, root).y, value: -1 }));

    if (points.length < 2 || !svg || !basePath || !litPath || !coinLayer) return;

    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const d = buildPath(points);
    basePath.setAttribute('d', d);
    litPath.setAttribute('d', d);
    clipRect?.setAttribute('width', String(width));

    coinLayer.replaceChildren();
    coins = [];
    const first = points[0].y;
    const last = points[points.length - 1].y;
    for (let y = first + COIN_GAP * 0.6; y < last - 60; y += COIN_GAP) {
      if (stops.some((stop) => Math.abs(stop.y - y) < 80)) continue;
      const point = findPoint(y);
      const el = document.createElementNS(SVG_NS, 'image');
      el.setAttribute('href', options.coinSrc);
      el.setAttribute('width', String(COIN_SIZE));
      el.setAttribute('height', String(COIN_SIZE));
      el.setAttribute('x', (point.x - COIN_SIZE / 2).toFixed(1));
      el.setAttribute('y', (point.y - COIN_SIZE - 6).toFixed(1));
      el.setAttribute('class', 'trail__coin');
      coinLayer.appendChild(el);
      coins.push({ el, y });
    }

    lastY = -1;
    collected = -1;
  };

  const update = () => {
    frame = 0;
    if (points.length < 2) return;

    const scrollY = window.scrollY;
    const viewport = window.innerHeight;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - viewport);
    const progress = clamp(scrollY / maxScroll, 0, 1);
    const first = points[0];
    const last = points[points.length - 1];
    const reach = maxScroll + viewport * ANCHOR - rootTop;
    const stretch = Math.max(0, last.y - reach) * progress;
    const target = clamp(scrollY + viewport * ANCHOR - rootTop + stretch, first.y, last.y);

    let zoneIndex = 0;
    for (let i = 0; i < zoneTops.length; i += 1) {
      if (zoneTops[i] <= target) zoneIndex = i;
    }
    if (zoneIndex !== activeZone) {
      activeZone = zoneIndex;
      options.onZone(zoneIndex);
    }

    for (const stop of stops) stop.zone.classList.toggle('is-reached', reduced || target >= stop.y - 6);

    for (const scrub of scrubs) {
      const value = reduced ? 1 : clamp((scrollY + viewport * 0.94 - rootTop - scrub.top) / (viewport * 0.44), 0, 1);
      if (Math.abs(value - scrub.value) > 0.004 || (value !== scrub.value && (value === 0 || value === 1))) {
        scrub.value = value;
        scrub.el.style.setProperty('--zp', value.toFixed(3));
      }
    }

    backdrop?.style.setProperty('--p', reduced ? '0' : progress.toFixed(4));

    let y = target;
    if (reduced) {
      y = first.y;
      for (const stop of stops) {
        if (stop.y <= target + 6) y = stop.y;
      }
    }

    if (y !== lastY) {
      const point = findPoint(y);
      if (mascot) {
        mascot.style.transform = `translate3d(${point.x.toFixed(1)}px, ${point.y.toFixed(1)}px, 0)`;
        if (lastY >= 0 && Math.abs(point.x - lastX) > 0.4) {
          mascot.style.setProperty('--face', point.x < lastX ? '-1' : '1');
        }
        if (lastY >= 0 && !reduced) {
          mascot.classList.add('is-walking');
          window.clearTimeout(walkTimer);
          walkTimer = window.setTimeout(() => mascot.classList.remove('is-walking'), 160);
        }
      }
      lastX = point.x;
      lastY = y;
      clipRect?.setAttribute('height', reduced ? String(last.y + 20) : (y + 4).toFixed(1));
    }

    let count = 0;
    for (const coin of coins) {
      if (coin.y < target - 4) count += 1;
    }
    if (count !== collected) {
      coins.forEach((coin, index) => coin.el.classList.toggle('is-collected', index < count));
      collected = count;
      options.onCoins(count, coins.length);
    }
  };

  const schedule = () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  };

  const relayout = () => {
    layout();
    schedule();
  };

  const observer = new ResizeObserver(relayout);
  observer.observe(root);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', relayout);
  document.fonts?.ready.then(relayout).catch(() => undefined);

  root.classList.add('is-live');
  relayout();

  return {
    setReduced: (value) => {
      reduced = value;
      lastY = -1;
      schedule();
    },
    destroy: () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', relayout);
      window.cancelAnimationFrame(frame);
      window.clearTimeout(walkTimer);
      root.classList.remove('is-live');
    },
  };
}
