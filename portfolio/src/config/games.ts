import type { CategoryInfo, Game, ImageAsset } from '../data/types';

const icon = (slug: string, title: string, size = 320): ImageAsset => ({
  src: `media/games/${slug}-icon.webp`,
  width: size,
  height: size,
  alt: { en: `${title} icon` },
});

const shot = (slug: string, title: string, width: number, height: number): ImageAsset => ({
  src: `media/games/${slug}-shot.webp`,
  width,
  height,
  alt: { en: `${title} gameplay` },
});

export const categories: CategoryInfo[] = [
  {
    id: 'mobile',
    anchor: 'mobile-games',
    label: { en: 'Mobile games', vi: 'Game mobile' },
    singular: { en: 'Mobile game', vi: 'Game mobile' },
    blurb: { en: 'Android titles released on Google Play.' },
    platforms: ['Android'],
  },
  {
    id: 'web',
    anchor: 'web-games',
    label: { en: 'Web games', vi: 'Game web' },
    singular: { en: 'Web game', vi: 'Game web' },
    blurb: { en: 'Games that open straight in a browser.' },
    platforms: ['Web browser'],
  },
  {
    id: 'playable',
    anchor: 'playable-ads',
    label: { en: 'Playable ads', vi: 'Playable ads' },
    singular: { en: 'Playable ad', vi: 'Playable ad' },
    blurb: {
      en: 'Playables that run on networks such as Mintegral, AppLovin, Google and Unity.',
      vi: 'Playable chạy trên các mạng Mintegral, Applovin, GG, Unity, etc',
    },
    platforms: ['Ad networks'],
  },
];

const delistedNote = {
  en: 'The Google Play listing linked from the previous site is no longer available.',
};

export const games: Game[] = [
  {
    slug: 'ocean-odyssey',
    title: 'Ocean Odyssey: Hidden Treasure',
    category: 'mobile',
    genre: { en: 'Adventure' },
    summary: { en: 'A sea adventure through dangerous waters, hidden secrets and naval battles.' },
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
    },
  },
  {
    slug: 'block-drop',
    title: 'Block Drop - Build Home',
    category: 'mobile',
    genre: { en: 'Block puzzle' },
    summary: { en: 'Drop coloured blocks onto the board and fill it to win.' },
    description: [
      {
        en: 'Welcome to the world of Block Drop, a completely free block puzzle game with fresh gameplay and a real visual feast. It is easy to pick up and a great way to pass the time and train your brain! Your goal is to drop the coloured blocks onto the board: fill the board and you win. Use strategy and brainpower to beat your own record. You can play completely free and offline!',
        vi: 'Chào mừng đến với thế giới của Block Drop, một trò chơi giải đố khối hoàn toàn miễn phí cung cấp lối chơi mới lạ và bữa tiệc thị giác tuyệt vời. Trò chơi dễ bắt đầu và là lựa chọn tuyệt vời để giết thời gian và rèn luyện trí não của bạn! Mục tiêu của bạn là thả các khối màu vào bảng, lấp đầy bảng và bạn sẽ chiến thắng, hãy sử dụng chiến lược và trí não của mình để phá vỡ kỷ lục của bạn. Bạn có thể chơi trò chơi của chúng tôi hoàn toàn miễn phí và ngoại tuyến!',
      },
    ],
    screenshots: [shot('block-drop', 'Block Drop - Build Home', 438, 246)],
    linkNote: delistedNote,
  },
  {
    slug: 'twisted-tangle',
    title: 'Twisted Tangle: Rabbit Rescue',
    category: 'mobile',
    genre: { en: 'Puzzle' },
    summary: { en: 'Untangle the ropes in the right order to free the rabbits.' },
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
    screenshots: [shot('twisted-tangle', 'Twisted Tangle: Rabbit Rescue', 240, 135)],
    linkNote: delistedNote,
  },
  {
    slug: 'node-breaker',
    title: 'Node Breaker',
    category: 'mobile',
    genre: { en: 'Incremental' },
    summary: { en: 'Break nodes, buy upgrades and grow an expanding skill tree.' },
    description: [
      {
        en: 'Node Breaker is a short, experimental incremental game in which the player breaks nodes to unravel reality. Collect plentiful nodes for resources to buy powerful upgrades and explore an expanding skill tree. Your goal is to become all-powerful by breaking enough nodes and reshaping reality to your will!',
        vi: 'Node Breaker là một trò chơi gia tăng ngắn, mang tính thử nghiệm, trong đó người chơi phá vỡ các nút để làm sáng tỏ thực tế. Thu thập các nút dồi dào để lấy tài nguyên để mua các nâng cấp mạnh mẽ và khám phá một cây kỹ năng mở rộng. Mục tiêu của bạn là trở nên toàn năng bằng cách phá vỡ đủ các nút và định hình lại thực tế theo ý muốn!',
      },
    ],
    screenshots: [shot('node-breaker', 'Node Breaker', 438, 246)],
    linkNote: delistedNote,
  },
  {
    slug: 'soul-survival',
    title: 'Soul Survival',
    category: 'mobile',
    genre: { en: 'Survival' },
    summary: { en: 'Face bosses and endless waves, collect souls and be the last survivor.' },
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

  { slug: 'nobitas-treasure-island', title: "Nobita's Treasure Island", category: 'web', icon: icon('nobitas-treasure-island', "Nobita's Treasure Island") },
  { slug: 'tiny-painter', title: 'Tiny Painter', category: 'web', icon: icon('tiny-painter', 'Tiny Painter') },
  { slug: 'giant-fish', title: 'Giant Fish', category: 'web', icon: icon('giant-fish', 'Giant Fish') },
  { slug: 'traveling', title: 'Traveling', category: 'web', icon: icon('traveling', 'Traveling') },
  { slug: 'red-ball-4', title: 'Red Ball 4', category: 'web', icon: icon('red-ball-4', 'Red Ball 4') },
  { slug: 'fire-and-water', title: 'Fire and Water', category: 'web', icon: icon('fire-and-water', 'Fire and Water') },
  { slug: 'mouse-and-maze', title: 'Mouse and Maze', category: 'web', icon: icon('mouse-and-maze', 'Mouse and Maze') },
  { slug: 'knife-throwing', title: 'Knife Throwing', category: 'web', icon: icon('knife-throwing', 'Knife Throwing') },
  { slug: 'among-us', title: 'Among Us', category: 'web', icon: icon('among-us', 'Among Us') },
  { slug: 'tap-tap', title: 'Tap Tap', category: 'web', icon: icon('tap-tap', 'Tap Tap') },
  { slug: 'number-swap', title: 'Number Swap', category: 'web', icon: icon('number-swap', 'Number Swap') },
  { slug: 'watermelon-catch', title: 'Watermelon Catch', category: 'web', icon: icon('watermelon-catch', 'Watermelon Catch') },

  {
    slug: 'brain-teaser',
    title: 'Brain Teaser: Tricky Puzzle',
    category: 'playable',
    icon: icon('brain-teaser', 'Brain Teaser: Tricky Puzzle', 240),
    highlights: [{ en: 'Top 1 spend Mintegral, Cost > 300k $' }],
  },
  {
    slug: 'left-or-right',
    title: 'Left Or Right Perfect Dress Up',
    category: 'playable',
    icon: icon('left-or-right', 'Left Or Right Perfect Dress Up', 240),
    highlights: [{ en: 'Top 1 spend Mintegral, Cost > 100k $' }],
  },
  {
    slug: 'dreamy-sticker',
    title: 'Dreamy Sticker: Room Decor',
    category: 'playable',
    icon: icon('dreamy-sticker', 'Dreamy Sticker: Room Decor', 240),
    highlights: [{ en: 'Top 3 spend Mintegral, cost > 100k $' }],
  },
  {
    slug: 'prison-escape',
    title: 'Prison Escape: 3D Obby Parkour',
    category: 'playable',
    icon: icon('prison-escape', 'Prison Escape: 3D Obby Parkour', 240),
    highlights: [{ en: 'Top spend Mintegral' }],
  },
  {
    slug: 'cake-sort-3d',
    title: 'Cake Sort 3D',
    category: 'playable',
    icon: icon('cake-sort-3d', 'Cake Sort 3D'),
    highlights: [{ en: 'Top spend Mintegral' }],
  },
  {
    slug: 'fruit-fusion-fun',
    title: 'Fruit Fusion Fun',
    category: 'playable',
    icon: icon('fruit-fusion-fun', 'Fruit Fusion Fun', 240),
    highlights: [{ en: 'Top spend Mintegral' }],
  },
  {
    slug: 'goods-frenzy',
    title: 'Goods Frenzy: Closet Sort',
    category: 'playable',
    icon: icon('goods-frenzy', 'Goods Frenzy: Closet Sort'),
    highlights: [{ en: 'Top spend Mintegral' }],
  },
  { slug: 'yarn-land-3d', title: 'Yarn Land 3D', category: 'playable', icon: icon('yarn-land-3d', 'Yarn Land 3D', 256) },
  { slug: 'match-and-reveal', title: 'Match & Reveal', category: 'playable', icon: icon('match-and-reveal', 'Match & Reveal', 256) },
  { slug: 'bubble-blast-3d', title: 'Bubble Blast 3D', category: 'playable', icon: icon('bubble-blast-3d', 'Bubble Blast 3D', 256) },
  { slug: 'cozy-knots', title: 'Cozy Knots: Connect Puzzle', category: 'playable', icon: icon('cozy-knots', 'Cozy Knots: Connect Puzzle', 240) },
  { slug: 'chameleon-hunt', title: 'Chameleon Hunt: Hide & Seek', category: 'playable', icon: icon('chameleon-hunt', 'Chameleon Hunt: Hide & Seek', 256) },
  { slug: 'cooking-craze', title: 'Cooking Craze: Kitchen Fever', category: 'playable', icon: icon('cooking-craze', 'Cooking Craze: Kitchen Fever', 240) },
  { slug: 'arrow-puzzle', title: 'Arrow Puzzle: Maze Escape', category: 'playable', icon: icon('arrow-puzzle', 'Arrow Puzzle: Maze Escape', 240) },
  { slug: 'dinosaurcraft', title: 'DinosaurCraft: Survival Hunter', category: 'playable', icon: icon('dinosaurcraft', 'DinosaurCraft: Survival Hunter', 240) },
];
