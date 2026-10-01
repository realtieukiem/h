import type { CategoryInfo, Game, GameCategory, ImageAsset, Localized } from '../data/types';

const icon = (slug: string, title: string, size = 320): ImageAsset => ({
  src: `media/games/${slug}-icon.webp`,
  width: size,
  height: size,
  alt: { en: `${title} icon`, vi: `Icon ${title}` },
});

const shot = (slug: string, title: string, width: number, height: number): ImageAsset => ({
  src: `media/games/${slug}-shot.webp`,
  width,
  height,
  alt: { en: `${title} gameplay`, vi: `Gameplay ${title}` },
});

const GENRES = {
  adventure: { en: 'Adventure', vi: 'Phiêu lưu' },
  arcade: { en: 'Arcade', vi: 'Arcade' },
  blockPuzzle: { en: 'Block puzzle', vi: 'Xếp khối' },
  bubble: { en: 'Bubble shooter', vi: 'Bắn bóng' },
  coloring: { en: 'Coloring', vi: 'Tô màu' },
  cooking: { en: 'Cooking', vi: 'Nấu ăn' },
  decoration: { en: 'Decoration', vi: 'Trang trí' },
  dressUp: { en: 'Dress up', vi: 'Thời trang' },
  driving: { en: 'Driving', vi: 'Lái xe' },
  hideAndSeek: { en: 'Hide and seek', vi: 'Trốn tìm' },
  incremental: { en: 'Incremental', vi: 'Incremental' },
  match: { en: 'Match puzzle', vi: 'Ghép hình' },
  maze: { en: 'Maze', vi: 'Mê cung' },
  merge: { en: 'Merge', vi: 'Ghép hợp nhất' },
  parkour: { en: 'Parkour', vi: 'Parkour' },
  platformer: { en: 'Platformer', vi: 'Đi cảnh' },
  puzzle: { en: 'Puzzle', vi: 'Giải đố' },
  sort: { en: 'Sort puzzle', vi: 'Sắp xếp' },
  survival: { en: 'Survival', vi: 'Sinh tồn' },
} satisfies Record<string, Localized>;

export const categories: CategoryInfo[] = [
  {
    id: 'mobile',
    anchor: 'mobile-games',
    label: { en: 'Mobile games', vi: 'Game mobile' },
    singular: { en: 'Mobile game', vi: 'Game mobile' },
    blurb: { en: 'Android titles released on Google Play.', vi: 'Các tựa game Android phát hành trên Google Play.' },
    platforms: ['Android'],
    role: { en: 'Game developer', vi: 'Lập trình game' },
    work: {
      en: 'Gameplay and feature development for the mobile release.',
      vi: 'Phát triển gameplay và tính năng cho bản phát hành mobile.',
    },
    about: { en: 'A mobile game released on Google Play.', vi: 'Game mobile phát hành trên Google Play.' },
  },
  {
    id: 'web',
    anchor: 'web-games',
    label: { en: 'Web games', vi: 'Game web' },
    singular: { en: 'Web game', vi: 'Game web' },
    blurb: { en: 'Games that open straight in a browser.', vi: 'Game mở ngay trên trình duyệt.' },
    platforms: ['Web'],
    role: { en: 'Game developer', vi: 'Lập trình game' },
    work: {
      en: 'Built the game for the browser, from gameplay to the final build.',
      vi: 'Làm game cho trình duyệt, từ gameplay đến bản build cuối.',
    },
    about: {
      en: 'A browser game: no install, it opens and plays straight away.',
      vi: 'Game trên trình duyệt: không cần cài đặt, mở là chơi ngay.',
    },
  },
  {
    id: 'playable',
    anchor: 'playable-ads',
    label: { en: 'Playable ads', vi: 'Playable ads' },
    singular: { en: 'Playable ad', vi: 'Playable ad' },
    blurb: {
      en: 'Playables that run on networks such as Mintegral, AppLovin, Google and Unity.',
      vi: 'Playable chạy trên các mạng Mintegral, AppLovin, Google, Unity...',
    },
    platforms: ['Mintegral', 'AppLovin', 'Google', 'Unity'],
    role: { en: 'Playable ad developer', vi: 'Lập trình playable ads' },
    work: {
      en: 'Rebuilt the core gameplay as a lightweight playable and exported it for the ad networks.',
      vi: 'Dựng lại gameplay cốt lõi thành bản playable gọn nhẹ và xuất cho các mạng quảng cáo.',
    },
    about: {
      en: 'A playable ad: a short, interactive slice of the game that runs inside an ad.',
      vi: 'Playable ad: một đoạn chơi thử ngắn của game, chạy ngay bên trong quảng cáo.',
    },
  },
];

const delistedNote: Localized = {
  en: 'The Google Play listing linked from the previous site is no longer available.',
  vi: 'Trang Google Play được liên kết từ site cũ hiện không còn nữa.',
};

const entry = (
  category: GameCategory,
  slug: string,
  title: string,
  genre: Localized,
  size = 320,
  highlight?: string,
): Game => ({
  slug,
  title,
  category,
  genre,
  icon: icon(slug, title, size),
  highlights: highlight ? [{ en: highlight }] : undefined,
});

export const games: Game[] = [
  {
    slug: 'ocean-odyssey',
    title: 'Ocean Odyssey: Hidden Treasure',
    category: 'mobile',
    genre: GENRES.adventure,
    summary: {
      en: 'A sea adventure through dangerous waters, hidden secrets and naval battles.',
      vi: 'Cuộc phiêu lưu trên biển qua vùng nước nguy hiểm, bí mật ẩn giấu và những trận hải chiến.',
    },
    description: [
      {
        en: 'Set out on an epic sea adventure in "Ocean Odyssey: Hidden Treasure". Navigate dangerous waters, uncover hidden secrets and take part in thrilling naval battles as you follow Arin, a determined seafarer, on the search for a legendary treasure.',
        vi: 'Tham gia vào cuộc phiêu lưu trên biển hoành tráng trong "Ocean Odyssey: Hidden Treasure". Điều hướng qua vùng biển nguy hiểm, khám phá những bí mật ẩn giấu và tham gia vào các trận hải chiến ly kỳ khi bạn theo chân Arin, một người đi biển quyết tâm, trong hành trình tìm kiếm kho báu huyền thoại.',
      },
    ],
    icon: icon('ocean-odyssey', 'Ocean Odyssey: Hidden Treasure'),
    screenshots: [shot('ocean-odyssey', 'Ocean Odyssey: Hidden Treasure', 436, 245)],
    links: {
      googlePlay: 'https://play.google.com/store/apps/details?id=nami.ocean.treasure.odyssey',
    },
    linkNote: {
      en: 'This listing is currently titled "Craft Island: Survival Builder" on Google Play.',
      vi: 'Trang này hiện mang tên "Craft Island: Survival Builder" trên Google Play.',
    },
  },
  {
    slug: 'block-drop',
    title: 'Block Drop - Build Home',
    category: 'mobile',
    genre: GENRES.blockPuzzle,
    summary: {
      en: 'Drop coloured blocks onto the board and fill it to win.',
      vi: 'Thả các khối màu vào bảng và lấp đầy bảng để thắng.',
    },
    description: [
      {
        en: 'Welcome to the world of Block Drop, a completely free block puzzle game with fresh gameplay and a real visual feast. It is easy to pick up and a great way to pass the time and train your brain! Your goal is to drop the coloured blocks onto the board: fill the board and you win. Use strategy and brainpower to beat your own record. You can play completely free and offline!',
        vi: 'Chào mừng đến với thế giới của Block Drop, một trò chơi giải đố khối hoàn toàn miễn phí cung cấp lối chơi mới lạ và bữa tiệc thị giác tuyệt vời. Trò chơi dễ bắt đầu và là lựa chọn tuyệt vời để giết thời gian và rèn luyện trí não của bạn! Mục tiêu của bạn là thả các khối màu vào bảng, lấp đầy bảng và bạn sẽ chiến thắng, hãy sử dụng chiến lược và trí não của mình để phá vỡ kỷ lục của bạn. Bạn có thể chơi trò chơi của chúng tôi hoàn toàn miễn phí và ngoại tuyến!',
      },
    ],
    icon: icon('block-drop', 'Block Drop - Build Home', 246),
    screenshots: [shot('block-drop', 'Block Drop - Build Home', 438, 246)],
    linkNote: delistedNote,
  },
  {
    slug: 'twisted-tangle',
    title: 'Twisted Tangle: Rabbit Rescue',
    category: 'mobile',
    genre: GENRES.puzzle,
    summary: {
      en: 'Untangle the ropes in the right order to free the rabbits.',
      vi: 'Gỡ những sợi dây rối theo đúng thứ tự để giải thoát các chú thỏ.',
    },
    description: [
      {
        en: 'Welcome to the colourful world of cute, playful rabbits. The goal of the game is to untangle the ropes and free the rabbits caught in them.',
        vi: 'Chào mừng đến với thế giới đầy màu sắc của những chú thỏ đáng yêu và vui nhộn. Mục tiêu của trò chơi là gỡ rối và giải thoát những chú thỏ bị mắc kẹt trong những sợi dây rối.',
      },
      {
        en: 'This game will challenge your mind and stimulate your senses. Reveal the secret to solving near-impossible knots by mastering the art of pinning. Just arrange the tangled ropes in the right order and untangle them at the right time! No knot can stand in your way!',
        vi: 'Trò chơi này sẽ thử thách trí óc và kích thích các giác quan của bạn. Tiết lộ bí mật để giải quyết những nút thắt gần như không thể bằng cách thành thạo sự khéo léo của việc ghim. Chỉ cần sắp xếp những sợi dây rối theo đúng thứ tự và gỡ rối chúng vào đúng thời điểm! Không có nút thắt nào có thể cản trở bạn!',
      },
    ],
    icon: icon('twisted-tangle', 'Twisted Tangle: Rabbit Rescue', 135),
    screenshots: [shot('twisted-tangle', 'Twisted Tangle: Rabbit Rescue', 240, 135)],
    linkNote: delistedNote,
  },
  {
    slug: 'node-breaker',
    title: 'Node Breaker',
    category: 'mobile',
    genre: GENRES.incremental,
    summary: {
      en: 'Break nodes, buy upgrades and grow an expanding skill tree.',
      vi: 'Phá các nút, mua nâng cấp và mở rộng cây kỹ năng.',
    },
    description: [
      {
        en: 'Node Breaker is a short, experimental incremental game in which the player breaks nodes to unravel reality. Collect plentiful nodes for resources to buy powerful upgrades and explore an expanding skill tree. Your goal is to become all-powerful by breaking enough nodes and reshaping reality to your will!',
        vi: 'Node Breaker là một trò chơi gia tăng ngắn, mang tính thử nghiệm, trong đó người chơi phá vỡ các nút để làm sáng tỏ thực tế. Thu thập các nút dồi dào để lấy tài nguyên để mua các nâng cấp mạnh mẽ và khám phá một cây kỹ năng mở rộng. Mục tiêu của bạn là trở nên toàn năng bằng cách phá vỡ đủ các nút và định hình lại thực tế theo ý muốn!',
      },
    ],
    icon: icon('node-breaker', 'Node Breaker', 246),
    screenshots: [shot('node-breaker', 'Node Breaker', 438, 246)],
    linkNote: delistedNote,
  },
  {
    slug: 'soul-survival',
    title: 'Soul Survival',
    category: 'mobile',
    genre: GENRES.survival,
    summary: {
      en: 'Face bosses and endless waves, collect souls and be the last survivor.',
      vi: 'Đối đầu trùm và những đợt quái vô tận, thu thập linh hồn và trở thành người sống sót cuối cùng.',
    },
    description: [
      {
        en: 'Soul Survival is a game where you face bosses and their endless waves of destruction. Collect their souls and become the last survivor. Craft weapons, unlock special skills, recruit new heroes, discover secrets and destroy every enemy in your path.',
        vi: 'Soul Survival là trò chơi mà bạn phải đối mặt với những tên trùm và làn sóng hủy diệt vô tận của chúng. Thu thập linh hồn của chúng và trở thành người sống sót cuối cùng. Chế tạo vũ khí, mở khóa các kỹ năng đặc biệt, chiêu mộ anh hùng mới và khám phá bí mật và tiêu diệt tất cả kẻ thù trên đường đi của bạn.',
      },
    ],
    icon: icon('soul-survival', 'Soul Survival'),
    screenshots: [shot('soul-survival', 'Soul Survival', 960, 539)],
    links: {
      googlePlay: 'https://play.google.com/store/apps/details?id=com.saybia.soulsurvival',
    },
  },

  entry('web', 'nobitas-treasure-island', "Nobita's Treasure Island", GENRES.adventure),
  entry('web', 'tiny-painter', 'Tiny Painter', GENRES.coloring),
  entry('web', 'giant-fish', 'Giant Fish', GENRES.arcade),
  entry('web', 'traveling', 'Traveling', GENRES.driving),
  entry('web', 'red-ball-4', 'Red Ball 4', GENRES.platformer),
  entry('web', 'fire-and-water', 'Fire and Water', GENRES.platformer),
  entry('web', 'mouse-and-maze', 'Mouse and Maze', GENRES.maze),
  entry('web', 'knife-throwing', 'Knife Throwing', GENRES.arcade),
  entry('web', 'among-us', 'Among Us', GENRES.arcade),
  entry('web', 'tap-tap', 'Tap Tap', GENRES.arcade),
  entry('web', 'number-swap', 'Number Swap', GENRES.puzzle),
  entry('web', 'watermelon-catch', 'Watermelon Catch', GENRES.arcade),

  entry('playable', 'brain-teaser', 'Brain Teaser: Tricky Puzzle', GENRES.puzzle, 240, 'Top 1 spend Mintegral, Cost > 300k $'),
  entry('playable', 'left-or-right', 'Left Or Right Perfect Dress Up', GENRES.dressUp, 240, 'Top 1 spend Mintegral, Cost > 100k $'),
  entry('playable', 'dreamy-sticker', 'Dreamy Sticker: Room Decor', GENRES.decoration, 240, 'Top 3 spend Mintegral, cost > 100k $'),
  entry('playable', 'prison-escape', 'Prison Escape: 3D Obby Parkour', GENRES.parkour, 240, 'Top spend Mintegral'),
  entry('playable', 'cake-sort-3d', 'Cake Sort 3D', GENRES.sort, 320, 'Top spend Mintegral'),
  entry('playable', 'fruit-fusion-fun', 'Fruit Fusion Fun', GENRES.merge, 240, 'Top spend Mintegral'),
  entry('playable', 'goods-frenzy', 'Goods Frenzy: Closet Sort', GENRES.sort, 320, 'Top spend Mintegral'),
  entry('playable', 'yarn-land-3d', 'Yarn Land 3D', GENRES.puzzle, 256),
  entry('playable', 'match-and-reveal', 'Match & Reveal', GENRES.match, 256),
  entry('playable', 'bubble-blast-3d', 'Bubble Blast 3D', GENRES.bubble, 256),
  entry('playable', 'cozy-knots', 'Cozy Knots: Connect Puzzle', GENRES.puzzle, 240),
  entry('playable', 'chameleon-hunt', 'Chameleon Hunt: Hide & Seek', GENRES.hideAndSeek, 256),
  entry('playable', 'cooking-craze', 'Cooking Craze: Kitchen Fever', GENRES.cooking, 240),
  entry('playable', 'arrow-puzzle', 'Arrow Puzzle: Maze Escape', GENRES.puzzle, 240),
  entry('playable', 'dinosaurcraft', 'DinosaurCraft: Survival Hunter', GENRES.survival, 240),
];
