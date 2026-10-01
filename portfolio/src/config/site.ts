import type { SiteConfig } from '../data/types';

export const site: SiteConfig = {
  brand: "I'm Game Dev",
  siteUrl: '',

  profile: {
    name: 'IGD',
    role: { en: 'Game Developer', vi: 'Nhà phát triển game' },
    headline: {
      en: 'I make mobile games, web games and playable ads.',
      vi: 'Tôi làm game mobile, game web và playable ads.',
    },
    intro: [
      {
        en: 'I am a game developer working across three formats: mobile games published on Google Play, web games that open straight in a browser, and playable ads that run on ad networks such as Mintegral, AppLovin, Google and Unity.',
        vi: 'Tôi là nhà phát triển game, làm việc trên ba định dạng: game mobile phát hành trên Google Play, game web chơi ngay trên trình duyệt, và playable ads chạy trên các mạng quảng cáo như Mintegral, AppLovin, Google và Unity.',
      },
    ],
    approach: {
      en: 'I start from the first thirty seconds: a player should understand the goal, make a meaningful move and get a clear response without reading a tutorial. I build small, test early on real devices and keep polishing the feel of every tap until it is satisfying.',
      vi: 'Tôi bắt đầu từ ba mươi giây đầu tiên: người chơi phải hiểu mục tiêu, thực hiện được một nước đi có ý nghĩa và nhận phản hồi rõ ràng mà không cần đọc hướng dẫn. Tôi làm từng phần nhỏ, thử sớm trên thiết bị thật và mài giũa cảm giác của từng lần chạm cho đến khi thật đã tay.',
    },
    direction: [
      {
        en: 'Keep making casual games that are easy to pick up and still worth coming back to: clear rules, short sessions and a satisfying finish to every level.',
        vi: 'Tiếp tục làm những game casual dễ bắt đầu mà vẫn đáng để quay lại: luật chơi rõ ràng, phiên chơi ngắn và một cái kết thoả mãn cho mỗi màn.',
      },
      {
        en: 'Push playable ads further, so that a few seconds of play show honestly what the full game feels like.',
        vi: 'Đưa playable ads đi xa hơn, để vài giây chơi thử thể hiện trung thực cảm giác của game đầy đủ.',
      },
      {
        en: 'Share more of what I learn through toolkits that save other developers time.',
        vi: 'Chia sẻ nhiều hơn những gì tôi học được qua các bộ công cụ giúp nhà phát triển khác tiết kiệm thời gian.',
      },
    ],
    avatar: {
      src: 'media/profile/avatar.webp',
      width: 136,
      height: 170,
      alt: { en: 'Illustrated portrait used as the site avatar', vi: 'Chân dung minh hoạ dùng làm ảnh đại diện' },
    },
  },

  contact: {
    invitation: {
      en: 'Have a game, a playable ad or a prototype in mind? Send a message and let us talk about it.',
      vi: 'Bạn đang có ý tưởng về một game, một playable ad hay một bản prototype? Hãy nhắn cho tôi để cùng trao đổi.',
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
