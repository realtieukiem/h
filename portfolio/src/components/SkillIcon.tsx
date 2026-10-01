import type { SkillIcon as SkillIconName } from '../data/types';

const PATHS: Record<SkillIconName, React.JSX.Element> = {
  engine: (
    <>
      <circle cx="16" cy="16" r="4.5" />
      <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.700 21.700l2.800 2.800M24.500 7.500l-2.800 2.800M10.300 21.700l-2.800 2.800" />
    </>
  ),
  blocks: (
    <>
      <path d="M16 4l10 5.500v11L16 26 6 20.500v-11z" />
      <path d="M6 9.500L16 15l10-5.500M16 15v11" />
    </>
  ),
  play: (
    <>
      <rect x="4" y="6" width="24" height="20" rx="5" />
      <path d="M13.500 11.500v9l8-4.500z" />
    </>
  ),
  phone: (
    <>
      <rect x="9" y="3.500" width="14" height="25" rx="3.500" />
      <path d="M14 24h4" />
    </>
  ),
  globe: (
    <>
      <circle cx="16" cy="16" r="11.500" />
      <path d="M4.500 16h23M16 4.500c4 3.500 4 19.500 0 23M16 4.500c-4 3.500-4 19.500 0 23" />
    </>
  ),
  coin: (
    <>
      <circle cx="16" cy="16" r="11.500" />
      <path d="M19.500 12.500c-.800-1.200-2-1.800-3.500-1.800-2 0-3.500 1-3.500 2.600 0 3.600 7 1.700 7 5.200 0 1.600-1.500 2.800-3.500 2.800-1.700 0-3-.700-3.800-2M16 8.500v2.200M16 21.300v2.200" />
    </>
  ),
  plus: <path d="M16 7v18M7 16h18" />,
};

export function SkillIcon({ name }: { name: SkillIconName }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
