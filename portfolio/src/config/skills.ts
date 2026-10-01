import type { Skill } from '../data/types';

export const skills: Skill[] = [
  {
    id: 'unity',
    name: 'Unity',
    icon: 'engine',
    detail: {
      en: 'Game engine. I also share a Unity AdMob pack, listed on the Extras page.',
      vi: 'Game engine. Tôi cũng chia sẻ một gói Unity AdMob ở trang Khác.',
    },
  },
  {
    id: 'cocos',
    name: 'Cocos',
    icon: 'blocks',
    detail: {
      en: 'Engine used for playable ads. The Cocos playable pack is listed on the Extras page.',
      vi: 'Engine tôi dùng cho playable ads. Gói Cocos playable có ở trang Khác.',
    },
  },
  {
    id: 'languages',
    name: 'C# & TypeScript',
    icon: 'code',
    detail: {
      en: 'The languages I write day to day: C# in Unity and TypeScript in Cocos.',
      vi: 'Hai ngôn ngữ tôi viết hằng ngày: C# trong Unity và TypeScript trong Cocos.',
    },
  },
  {
    id: 'playable-ads',
    name: 'Playable ads',
    icon: 'play',
    detail: {
      en: 'Interactive ads built for networks such as Mintegral, AppLovin, Google and Unity.',
      vi: 'Quảng cáo tương tác cho các mạng như Mintegral, AppLovin, Google và Unity.',
    },
  },
  {
    id: 'mobile-games',
    name: 'Mobile games',
    icon: 'phone',
    detail: {
      en: 'Android titles released on Google Play.',
      vi: 'Các tựa game Android phát hành trên Google Play.',
    },
  },
  {
    id: 'web-games',
    name: 'Web games',
    icon: 'globe',
    detail: {
      en: 'Games that run straight in a browser.',
      vi: 'Game chạy ngay trên trình duyệt.',
    },
  },
  {
    id: 'admob',
    name: 'AdMob integration',
    icon: 'coin',
    detail: {
      en: 'Ad monetisation setup for Unity projects.',
      vi: 'Tích hợp quảng cáo kiếm tiền cho dự án Unity.',
    },
  },
];
