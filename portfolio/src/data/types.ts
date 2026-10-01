export type Locale = 'en' | 'vi';

export interface Localized {
  en: string;
  vi?: string;
}

export interface ImageAsset {
  src: string;
  width: number;
  height: number;
  alt: Localized;
}

export interface ContactLink {
  id: string;
  label: string;
  url: string;
  handle: string;
}

export interface SiteConfig {
  brand: string;
  siteUrl: string;
  profile: {
    name: string;
    role: Localized;
    headline: Localized;
    intro: Localized[];
    approach: Localized;
    direction: Localized[];
    avatar: ImageAsset;
  };
  contact: {
    invitation: Localized;
    email: string;
    phone: string;
    links: ContactLink[];
  };
}

export type GameCategory = 'mobile' | 'web' | 'playable';

export interface GameLinks {
  googlePlay?: string;
  appStore?: string;
  web?: string;
}

export interface Game {
  slug: string;
  title: string;
  category: GameCategory;
  genre?: Localized;
  platforms?: string[];
  summary?: Localized;
  description?: Localized[];
  icon?: ImageAsset;
  screenshots?: ImageAsset[];
  role?: Localized;
  contributions?: Localized[];
  highlights?: Localized[];
  links?: GameLinks;
  linkNote?: Localized;
}

export interface CategoryInfo {
  id: GameCategory;
  anchor: string;
  label: Localized;
  singular: Localized;
  blurb: Localized;
  platforms: string[];
  role: Localized;
  work: Localized;
  about: Localized;
}

export type SkillIcon = 'engine' | 'blocks' | 'code' | 'play' | 'phone' | 'globe' | 'coin' | 'plus';

export interface Skill {
  id: string;
  name: string;
  icon: SkillIcon;
  detail: Localized;
}

export interface ExtraLink {
  id: string;
  title: string;
  description: Localized;
  url: string;
  linkLabel: Localized;
  image?: ImageAsset;
}

export type PolicyBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'links'; items: { label: string; url: string }[] }
  | { type: 'contact'; label: string; email: string };

export interface PolicySection {
  id: string;
  numeral: string;
  title: string;
  blocks: PolicyBlock[];
}

export interface PrivacyPolicy {
  title: string;
  responsibleParty: string;
  contactEmail: string;
  effectiveDate: string;
  lastUpdated: string;
  sections: PolicySection[];
}

export interface SiteData {
  site: SiteConfig;
  categories: CategoryInfo[];
  games: Game[];
  skills: Skill[];
  toolkits: ExtraLink[];
  sideProjects: ExtraLink[];
  privacy: { en: PrivacyPolicy } & Partial<Record<Locale, PrivacyPolicy>>;
}
