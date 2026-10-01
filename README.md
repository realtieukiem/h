# I'm Game Dev — portfolio site

A game-styled personal portfolio: a scroll-driven Home journey, an About Me page, an Extras page
(toolkits and side projects) and a Privacy Policy.
Built with React, TypeScript and Vite, prerendered to plain static files and served by GitHub Pages.

- Live (GitHub Pages): https://realtieukiem.github.io/h/
- Intended custom domain: https://www.imgamedev.com (not switched yet — see [Custom domain](#custom-domain))

## How this repository is laid out

| Path | What it is |
| --- | --- |
| `portfolio/` | The source project. **Edit here.** |
| `index.html`, `about/`, `extras/`, `privacy-policy/`, `404.html`, `assets/`, `media/`, `favicon.svg`, `.nojekyll` | The **built** site. Generated — do not edit by hand, changes are overwritten. |
| `.github/workflows/deploy.yml` | Rebuilds the site and commits the result to the repository root on every push to `main` that touches `portfolio/`. |
| `api/`, `kd/`, `nuoitoi/`, `vlt/` | Older standalone pages. The portfolio build never touches them. |

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

Interface wording (buttons, headings, labels) is in `portfolio/src/i18n/en.ts`.

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

### Add Vietnamese later

Game and profile texts already accept `{ en: '...', vi: '...' }`. For the interface, copy
`portfolio/src/i18n/en.ts` to `vi.ts`, translate it, register it in `portfolio/src/i18n/index.ts`, then set
`locale: 'vi'` in `site.ts`.

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

The domain was **not** touched. DNS as read on 2026-10-01:

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
6. Set `siteUrl: 'https://www.imgamedev.com'` in `portfolio/src/config/site.ts` so pages get a canonical URL.

Good to know:

- The custom domain applies to the whole repository, so `kd/`, `vlt/` and the other folders move with it
  (`https://www.imgamedev.com/kd/`). The old `realtieukiem.github.io/h/...` addresses redirect automatically.
- Old Google Sites addresses (`/home`, `/game`, `/game/gamemobile`, `/package`, `/other`, `/contact`) are
  forwarded to the matching place on the new site by `404.html`. `/privacy-policy` keeps its address.
- Verifying the domain under your GitHub account (**Settings → Pages → Verified domains**) stops anyone else
  from claiming it.

## Information still needed

Placeholders on the site today:

- **Your name** (`site.ts` → `profile.name`). The brand "I'm Game Dev" is taken from the current site.
- **How you make games** (`profile.approach`) and **where you are heading** (`profile.direction`).
- **A larger avatar.** The current one was taken from the old site and is only 136 × 170 px.
- **Skills.** The list contains only what the current site shows (Unity, Cocos, playable ads, mobile and web
  games, AdMob). Add languages, tools and disciplines in `skills.ts`.
- **Per game:** your role and what you built. For web games and playable ads also genre, a short
  description, a gameplay image and a public link where one exists.
- **Icons** for Block Drop, Twisted Tangle and Node Breaker.

Things to confirm:

- **Google Play.** Checked on 2026-10-01: the listings for Block Drop, Twisted Tangle and Node Breaker no
  longer exist, so those games have no store button. The Ocean Odyssey listing is now titled
  "Craft Island: Survival Builder"; the button is kept with a note. Soul Survival is live.
- **Mobile game descriptions** were translated to English from the Vietnamese text on the current site; the
  original is kept in the `vi` field.
- **Playable ad highlights** ("Top 1 spend Mintegral, Cost > 300k $" and similar) are copied word for word
  from the current site.
- **Phone number** is shown because it is on the current contact page. Set `phone: ''` in `site.ts` to hide it.

Privacy Policy — the published text is carried over word for word (effective 2023-11-13); only the layout
changed. It was written for "the Im Game Dev app". To make it cover the website and each game accurately,
these facts are needed, and none of them were assumed:

- Scope: which games and whether the website itself is covered.
- What data is actually collected, from where, and what it is used for — for the website and for each game.
- The advertising, analytics and other third-party SDKs actually in use. The text names Google Play
  Services, AdMob and Facebook.
- Sharing, retention period and security measures.
- Privacy rights and how to send a data request.
- Whether any game is directed at children.
- How changes are announced, the date of the last update, and the legal name of the responsible party.
- The policy refers to "Terms and Conditions"; no such page exists on the site.

The website itself loads no analytics, trackers or third-party scripts. Fonts are self-hosted.
