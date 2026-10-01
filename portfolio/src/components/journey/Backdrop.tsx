const FAR_ISLANDS = [
  { left: '6%', top: '18%', size: 120 },
  { left: '78%', top: '9%', size: 170 },
  { left: '58%', top: '46%', size: 90 },
  { left: '14%', top: '66%', size: 150 },
  { left: '86%', top: '74%', size: 110 },
];

const CLOUDS = [
  { left: '-4%', top: '12%', width: 300 },
  { left: '62%', top: '30%', width: 380 },
  { left: '20%', top: '54%', width: 260 },
  { left: '70%', top: '80%', width: 320 },
];

export function Backdrop() {
  return (
    <div className="sky" data-backdrop aria-hidden="true">
      <div className="sky__stars sky__stars--far" />
      <div className="sky__stars sky__stars--near" />
      <div className="sky__layer sky__layer--far">
        {FAR_ISLANDS.map((item) => (
          <svg
            key={item.left}
            className="sky__island"
            viewBox="0 0 120 90"
            width={item.size}
            style={{ left: item.left, top: item.top }}
          >
            <path d="M8 30h104L92 52 78 48 62 84 46 50 30 54z" />
            <ellipse cx="60" cy="30" rx="54" ry="13" />
          </svg>
        ))}
      </div>
      <div className="sky__layer sky__layer--clouds">
        {CLOUDS.map((item) => (
          <span key={item.left} className="sky__cloud" style={{ left: item.left, top: item.top, width: item.width }} />
        ))}
      </div>
      <div className="sky__dawn" />
    </div>
  );
}
