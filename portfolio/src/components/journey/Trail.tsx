export function Trail() {
  return (
    <svg className="trail" data-trail aria-hidden="true" preserveAspectRatio="none">
      <defs>
        <clipPath id="trail-clip">
          <rect data-trail-clip x="0" y="0" width="0" height="0" />
        </clipPath>
      </defs>
      <path className="trail__base" data-trail-base />
      <path className="trail__lit" data-trail-lit clipPath="url(#trail-clip)" />
      <g data-coins />
    </svg>
  );
}
