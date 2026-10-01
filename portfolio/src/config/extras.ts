import type { ExtraLink } from '../data/types';

const driveLabel = { en: 'Open on Google Drive', vi: 'Mở trên Google Drive' };

export const toolkits: ExtraLink[] = [
  {
    id: 'pack-unity-admob',
    title: 'Pack Unity AdMob',
    description: { en: 'A shared Unity package for AdMob.', vi: 'Gói Unity dùng chung cho AdMob.' },
    url: 'https://drive.google.com/drive/folders/1nnqi_WiNlCl1ElLt0n_zGCfp5bAHcX3O?usp=sharing',
    linkLabel: driveLabel,
    image: {
      src: 'media/extras/pack-unity-admob.webp',
      width: 720,
      height: 405,
      alt: { en: 'Pack Unity AdMob cover', vi: 'Ảnh bìa Pack Unity AdMob' },
    },
  },
  {
    id: 'pack-cocos-playable',
    title: 'Pack Cocos Playable Ads',
    description: {
      en: 'A shared Cocos package for building playable ads.',
      vi: 'Gói Cocos dùng chung để làm playable ads.',
    },
    url: 'https://drive.google.com/drive/folders/1L0aul-wF5-fkMAH9fKAb0PMdW7Agbhfm?usp=sharing',
    linkLabel: driveLabel,
    image: {
      src: 'media/extras/pack-cocos-playable.webp',
      width: 460,
      height: 258,
      alt: { en: 'Pack Cocos Playable Ads cover', vi: 'Ảnh bìa Pack Cocos Playable Ads' },
    },
  },
];

export const sideProjects: ExtraLink[] = [
  {
    id: 'kinh-dich',
    title: 'Kinh Dịch',
    description: { en: 'A side project hosted on GitHub Pages.', vi: 'Dự án phụ chạy trên GitHub Pages.' },
    url: 'https://realtieukiem.github.io/h/kd/',
    linkLabel: { en: 'Open Kinh Dịch', vi: 'Mở Kinh Dịch' },
  },
  {
    id: 'ma-soi',
    title: 'Ma sói',
    description: { en: 'A side project at boardmaster.top.', vi: 'Dự án phụ tại boardmaster.top.' },
    url: 'https://boardmaster.top/vi',
    linkLabel: { en: 'Open Ma sói', vi: 'Mở Ma sói' },
  },
];
