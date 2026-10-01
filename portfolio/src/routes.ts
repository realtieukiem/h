export type PageId = 'home' | 'about' | 'privacy';

export const PAGE_PATHS: Record<PageId, string> = {
  home: '',
  about: 'about/',
  privacy: 'privacy-policy/',
};

export const PAGE_IDS = Object.keys(PAGE_PATHS) as PageId[];

export const rootPrefix = (page: PageId): string => (page === 'home' ? './' : '../');

export const pageFromPathname = (pathname: string): PageId => {
  const segments = pathname.split('/').filter((part) => part && part !== 'index.html');
  const last = segments[segments.length - 1];
  if (last === 'about') return 'about';
  if (last === 'privacy-policy') return 'privacy';
  return 'home';
};
