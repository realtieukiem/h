import type { Skill } from '../data/types';

export const skills: Skill[] = [
  {
    id: 'unity',
    name: 'Unity',
    icon: 'engine',
    detail: { en: 'Game engine. I also share a Unity AdMob pack, listed under Toolkits.' },
  },
  {
    id: 'cocos',
    name: 'Cocos',
    icon: 'blocks',
    detail: { en: 'Engine used for playable ads. The Cocos playable pack is listed under Toolkits.' },
  },
  {
    id: 'playable-ads',
    name: 'Playable ads',
    icon: 'play',
    detail: { en: 'Interactive ads built for networks such as Mintegral, AppLovin, Google and Unity.' },
  },
  {
    id: 'mobile-games',
    name: 'Mobile games',
    icon: 'phone',
    detail: { en: 'Android titles released on Google Play.' },
  },
  {
    id: 'web-games',
    name: 'Web games',
    icon: 'globe',
    detail: { en: 'Games that run straight in a browser.' },
  },
  {
    id: 'admob',
    name: 'AdMob integration',
    icon: 'coin',
    detail: { en: 'Ad monetisation setup for Unity projects.' },
  },
  {
    id: 'placeholder',
    name: '[Add a skill]',
    icon: 'plus',
    detail: { en: '[Add languages, tools or disciplines you want listed here.]' },
  },
];
