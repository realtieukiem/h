import type { SiteConfig } from '../data/types';

export const site: SiteConfig = {
  brand: "I'm Game Dev",
  siteUrl: '',
  locale: 'en',

  profile: {
    name: 'IGD',
    role: { en: 'Game Developer', vi: 'Nhà phát triển game' },
    headline: {
      en: 'I make mobile games, web games and playable ads.',
    },
    intro: [
      {
        en: 'I am a game developer working across three formats: mobile games published on Google Play, web games that open straight in a browser, and playable ads that run on ad networks such as Mintegral, AppLovin, Google and Unity.',
      },
    ],
    approach: {
      en: '[Add two or three sentences on how you make games: what you care about, how you work, what a player should feel.]',
    },
    direction: [
      {
        en: '[Describe the direction you want to take as a game developer.]',
      },
      {
        en: '[Describe the kinds of experiences you want to create for players.]',
      },
    ],
    avatar: {
      src: 'media/profile/avatar.webp',
      width: 136,
      height: 170,
      alt: { en: 'Illustrated portrait used as the site avatar' },
    },
  },

  contact: {
    invitation: {
      en: 'Have a game, a playable ad or a prototype in mind? Send a message and let us talk about it.',
    },
    email: 'realtieukiem@gmail.com',
    phone: '+84971054793',
    links: [
      {
        id: 'linkedin',
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/in/realtieukiem',
        handle: 'in/realtieukiem',
      },
      {
        id: 'itch',
        label: 'itch.io',
        url: 'https://realtieukiem.itch.io',
        handle: 'realtieukiem.itch.io',
      },
    ],
  },
};
