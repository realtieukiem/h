# I'm Game Dev — portfolio site

A game-styled personal portfolio in English and Vietnamese: a scroll-driven Home journey, an About Me page,
an Extras page (toolkits and side projects) and a Privacy Policy.
Built with React, TypeScript and Vite, prerendered to plain static files and served by GitHub Pages.

- Live: https://imgamedev.com (custom domain attached on 2026-10-01; `www.imgamedev.com` and `realtieukiem.github.io/h/` redirect to it)

## How this repository is laid out

| Path | What it is |
| --- | --- |
| `portfolio/` | The source project. **Edit here.** |
| `index.html`, `about/`, `extras/`, `privacy-policy/`, `vi/`, `404.html`, `assets/`, `media/`, `favicon.svg`, `.nojekyll` | The **built** site. Generated — do not edit by hand, changes are overwritten. |
| `.github/workflows/deploy.yml` | Rebuilds the site and commits the result to the repository root on every push to `main` that touches `portfolio/`. |
| `kd/` | The Kinh Dịch pages, linked from the Extras page. The portfolio build never touches them. |

GitHub Pages serves the `main` branch root, so whatever sits in the root is what visitors get. Every URL in
the built site is relative, so the same files work under `https://realtieukiem.github.io/h/` and at the root
of a custom domain without a rebuild.

## Updating the site

**Without installing anything:** edit a file under `portfolio/src/config/` on GitHub and commit to `main`.
The workflow rebuilds the site and commits the new build about a minute later. If you also work locally,
run `git pull` before your next push, because the workflow adds a commit of its own.

**Locally** (needs Node.js 20 or newer):

```bash
cd portfolio
npm install
npm run dev        # live preview at http://localhost:5173
npm run release    # type-check, build, prerender, copy the result to the repository root
```

Other commands:

| Command | What it does |
| --- | --- |
| `npm run build` | Type-check, build and prerender into `portfolio/dist/` only. |
| `npm run preview` | Serve `dist/` at http://localhost:4173/ the way GitHub Pages does (directory URLs, `404.html`). |
| `npm run preview -- --base /h/` | Same, under the `/h/` project path. |
| `npm run typecheck` | TypeScript only. |

## Where the content lives

Everything you are likely to change is in `portfolio/src/config/`:

| File | Content |
| --- | --- |
| `site.ts` | Brand, name, role, headline, intro, direction, avatar, email, phone, social links, `siteUrl`. |
| `games.ts` | Game categories and every game. |
| `skills.ts` | The skills shown in the workshop and on About Me. |
| `extras.ts` | Toolkits and side projects on the Extras page. |
| `privacy.ts` | The Privacy Policy text, effective date and contact. |
| `privacy-vi.ts` | The Vietnamese translation of the Privacy Policy. |

Interface wording (buttons, headings, labels) is in `portfolio/src/i18n/en.ts` and `vi.ts`.

Any text written as `[Like this]` is a placeholder. It is drawn with a dashed gold outline so it is easy to
spot on the page; replace the text and the outline goes away.

### Add a game

Add one object to the `games` array in `portfolio/src/config/games.ts`. The same object feeds the Home
gallery, the About Me list and the details dialog.

```ts
{
  slug: 'my-new-game',                 // unique, used in the URL: /about/?game=my-new-game
  title: 'My New Game',
  category: 'mobile',                  // 'mobile' | 'web' | 'playable'
  genre: { en: 'Puzzle' },
  summary: { en: 'One line shown on the cards.' },
  description: [{ en: 'A paragraph shown in the details dialog.' }],
  icon: icon('my-new-game', 'My New Game'),                    // media/games/my-new-game-icon.webp
  screenshots: [shot('my-new-game', 'My New Game', 960, 540)], // media/games/my-new-game-shot.webp
  role: { en: 'Gameplay programmer' },
  contributions: [{ en: 'Built the level system.' }],
  highlights: [{ en: 'Something worth pointing out.' }],
  links: { googlePlay: 'https://play.google.com/store/apps/details?id=...' },
},
```

Only `slug`, `title` and `category` are required. Anything left out shows as a placeholder in the details
dialog, and a missing store link simply shows no button — the site never invents one.

### Replace images

Images are plain files in `portfolio/public/media/`:

| Folder | Content |
| --- | --- |
| `media/profile/avatar.webp` | Avatar (navbar and About Me). Square, 400 px or larger looks best. |
| `media/games/<slug>-icon.webp` | Game icon, square. |
| `media/games/<slug>-shot.webp` | Gameplay image, 16:9. |
| `media/extras/` | Toolkit covers. |
| `media/scene/` | The world art: `island-*.svg`, `mascot.svg`, `coin.svg`. |

Keep the file name to replace an image in place. If the size changes, update `width` and `height` next to it
in the config so the page does not jump while loading. The mascot stands on the sand patch of each island;
if you redraw an island and move the patch, adjust `stopX` / `stopY` on the matching `<Island>`.

### Two languages

English is served at the site root and Vietnamese under `/vi/` (`/vi/about/`, `/vi/extras/`,
`/vi/privacy-policy/`). The EN / VI switch in the navbar opens the same page in the other language.

- Content texts are written as `{ en: '...', vi: '...' }`. When `vi` is missing, the English text is shown.
- Interface wording lives in `portfolio/src/i18n/en.ts` and `vi.ts`. The two files must have the same keys;
  the build fails if one is missing.
- The Privacy Policy has one file per language. The English file is the governing text and the Vietnamese
  page says so; when you change one, change the other.
- To add a third language: add its code to `Locale` in `src/data/types.ts` and to `LOCALES` in
  `src/routes.ts`, add a dictionary in `src/i18n/`, and add its folder to `MANAGED` in
  `scripts/publish-root.mjs` and to the `git add` line in `.github/workflows/deploy.yml`.

### Load data from an API later

Pages never import the config files directly. They receive one `SiteData` object from
`portfolio/src/data/source.ts`. To switch to an API, write another `DataSource` whose `load()` fetches and
returns the same shape, and assign it to `dataSource`. No page or component changes.

## How deployment works

1. A push to `main` that touches `portfolio/` starts `.github/workflows/deploy.yml`.
2. It runs `npm ci` and `npm run release`, which rebuilds the site into the repository root.
3. If the build output changed, it commits it to `main`. GitHub Pages then publishes the branch.

Nothing in the GitHub Pages settings has to change: the source stays "Deploy from a branch", `main`, `/ (root)`.

## Custom domain

The site's address is `https://imgamedev.com`, without `www`. The `CNAME` file in the repository root holds
that name, and it is what GitHub Pages reads: `www.imgamedev.com` redirects to it. To change the primary
name, change the `CNAME` file and `siteUrl` in `portfolio/src/config/site.ts` together, then run
`npm run release` and push.

The steps below were carried out on 2026-10-01, first with `www` as the primary name. They are kept as a
record and for rolling back. DNS as read **before** the switch:

| Record | Value | Meaning |
| --- | --- | --- |
| `www.imgamedev.com` CNAME | `ghs.googlehosted.com` | The current Google Sites page. |
| `imgamedev.com` A | `103.18.6.109` | Registrar URL forwarding. |
| `imgamedev.com` TXT | `__URL_REDIRECT_URI:https://www.imgamedev.com` | Target of that forwarding. |
| NS | `ns-a1/ns-a2/ns-a3.tenten.vn` | DNS is managed at tenten.vn. |
| MX | none found | No mail records exist today. |

Check the records again before changing anything, and leave any MX, SPF, DKIM or verification TXT records
exactly as they are — only the two records below need to change.

1. Confirm the new site looks right at https://realtieukiem.github.io/h/.
2. In GitHub: repository **Settings → Pages → Custom domain**, enter `www.imgamedev.com`, save. GitHub commits
   a `CNAME` file to the repository root; run `git pull` afterwards. The build never removes that file.
3. At tenten.vn, change the `www` CNAME from `ghs.googlehosted.com` to `realtieukiem.github.io`.
   This is the moment the Google Sites page stops being served. To roll back, put the old value back.
4. Root domain `imgamedev.com`, pick one:
   - **Keep the current forwarding.** It already sends visitors to `https://www.imgamedev.com`. Registrar
     forwarding usually answers on `http://` only.
   - **Point it at GitHub.** Replace the A record with `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153` and remove the forwarding TXT record. GitHub then redirects the
     root domain to `www` and covers it with HTTPS as well.
5. Back in **Settings → Pages**, wait for the DNS check and the certificate, then tick **Enforce HTTPS**.
6. Set `siteUrl` to the primary address in `portfolio/src/config/site.ts` so pages get a canonical URL.

Good to know:

- The custom domain applies to the whole repository, so `kd/` moves with it
  (`https://imgamedev.com/kd/`). The old `realtieukiem.github.io/h/...` addresses redirect automatically.
- The older `api/`, `nuoitoi/` and `vlt/` pages were taken off `main` on 2026-10-01. They are kept on the
  `old` branch, which holds the repository as it was before the portfolio.
- Old Google Sites addresses (`/home`, `/game`, `/game/gamemobile`, `/package`, `/other`, `/contact`) are
  forwarded to the matching place on the new site by `404.html`. `/privacy-policy` keeps its address.
- Verifying the domain under your GitHub account (**Settings → Pages → Verified domains**) stops anyone else
  from claiming it.

## Search engines

The build writes everything a search engine reads, from `siteUrl` in `portfolio/src/config/site.ts`:

- `robots.txt` and `sitemap.xml` at the site root. The sitemap lists every page in both languages, plus the
  paths in `sitemapExtra` (the `kd/` pages). Add a path there when you add a page outside `portfolio/`.
- Per page: title, description, canonical address, `hreflang` links between the English and Vietnamese
  versions, Open Graph and Twitter card tags, and a `Person` / `WebSite` block of structured data.
- Page titles and descriptions are the `meta` entries in `portfolio/src/i18n/en.ts` and `vi.ts`. Keep a
  description under about 160 characters.
- The picture shown when a link is shared is `portfolio/public/media/social-card.png` (1200 × 630). Replace
  the file to change it; keep the size.

What the build cannot do, done once by hand:

1. Open <https://search.google.com/search-console>, add the property `imgamedev.com` (type **Domain**) and
   verify it with the TXT or CNAME record it gives you, at the DNS provider.
2. **Sitemaps** → submit `https://imgamedev.com/sitemap.xml`.
3. **URL inspection** → paste `https://imgamedev.com/` → **Request indexing**. Repeat for `/vi/` and
   `/about/`.

No analytics script is added by any of this. Search Console reads Google's own data, not the visitor's
browser.

## Content written for you — please check

Nothing on the site is a placeholder any more. These parts were written on your behalf from what the
previous site shows, so read them once and correct anything that is not true:

- **How I make games** and **Where I am heading** (`site.ts` → `profile.approach`, `profile.direction`).
- **Skills.** "C# & TypeScript" was added because Unity and Cocos are listed. Add or remove in `skills.ts`.
- **Genres** of the web games and playable ads were inferred from their titles and icons (`games.ts`).
- **Role and work per game.** Every game without its own `role` / `contributions` shows the default of its
  category (`categories` in `games.ts`): "Game developer" for mobile and web games, "Playable ad developer"
  for playables. Set `role` and `contributions` on a game to replace the default for that game.
- **Icons** for Block Drop, Twisted Tangle and Node Breaker are square crops of their gameplay image.
- **Avatar** is the one from the previous site, only 136 x 170 px. A larger image will look sharper.
- Web games and playable ads have no description of their own, no gameplay image and no public link yet.

Things to confirm:

- **Google Play.** Checked on 2026-10-01: the listings for Block Drop, Twisted Tangle and Node Breaker no
  longer exist, so those games have no store button. The Ocean Odyssey listing is now titled
  "Craft Island: Survival Builder"; the button is kept with a note. Soul Survival is live.
- **Mobile game descriptions** in English were translated from the Vietnamese text on the previous site.
- **Playable ad highlights** ("Top 1 spend Mintegral, Cost > 300k $" and similar) are copied word for word
  from the previous site.
- **Phone number** is shown because it is on the previous contact page. Set `phone: ''` in `site.ts` to hide it.

Privacy Policy — sections I to IX and the contact section are the published text, carried over word for word
(effective 2023-11-13). Sections X to XIII were added on 2026-10-01 after a review of rules that changed
since then: Vietnam's Law on Personal Data Protection (in effect from 1 January 2026), the amended US COPPA
Rule (compliance from 22 April 2026), app store age-signal laws and Google Play's User Data policy. The
additions were written without assuming anything about what the games collect, and they are not legal
advice — have them reviewed before relying on them. They commit you to three things: answering privacy
requests sent by email, deleting personal information you hold on request, and using app store age signals
only for legal compliance.

The policy was written for "the Im Game Dev app". To make it cover the website and each game accurately,
these facts are still needed, and none of them were assumed:

- Scope: which games and whether the website itself is covered.
- What data is actually collected, from where, and what it is used for — for the website and for each game.
- The advertising, analytics and other third-party SDKs actually in use. The text names Google Play
  Services, AdMob and Facebook.
- Whether the games show a consent prompt for personalised ads in the EEA and the UK, and whether any game
  has user accounts (Google Play then requires an account deletion path).
- Sharing, retention period and security measures.
- Whether any game is directed at children.
- The legal name of the responsible party.
- The policy refers to "Terms and Conditions"; no such page exists on the site.

The website itself loads no analytics, trackers or third-party scripts. Fonts are self-hosted.
