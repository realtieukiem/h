import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const server = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);
const template = await readFile(resolve(dist, 'index.html'), 'utf8');

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

let brand = '';
let siteUrl = '';
let sitemapExtra = [];
const sitemapEntries = [];
const OG_LOCALES = { en: 'en_US', vi: 'vi_VN' };

for (const locale of server.LOCALES) {
  for (const page of server.PAGE_IDS) {
    const route = { page, locale };
    const path = server.routePath(page, locale);
    const prefix = server.rootPrefix(page, locale);
    const result = await server.render(route);
    brand = result.brand;
    siteUrl = result.siteUrl;
    sitemapExtra = result.sitemapExtra;

    const alternateUrls = server.LOCALES.map((code) => [code, `${siteUrl}/${server.routePath(page, code)}`]);
    alternateUrls.push(['x-default', `${siteUrl}/${server.routePath(page, server.LOCALES[0])}`]);
    const alternates = siteUrl
      ? alternateUrls.map(([code, url]) => `<link rel="alternate" hreflang="${code}" href="${url}" />`)
      : [];
    if (siteUrl) sitemapEntries.push({ url: `${siteUrl}/${path}`, alternateUrls });

    const image = siteUrl ? `${siteUrl}/${result.socialImage.src}` : '';
    const social = image
      ? [
          `<meta property="og:image" content="${image}" />`,
          `<meta property="og:image:width" content="${result.socialImage.width}" />`,
          `<meta property="og:image:height" content="${result.socialImage.height}" />`,
          `<meta property="og:image:alt" content="${escapeHtml(result.socialImage.alt.en)}" />`,
          `<meta name="twitter:card" content="summary_large_image" />`,
          `<meta name="twitter:image" content="${image}" />`,
        ]
      : [];
    const structured = result.structuredData
      ? [`<script type="application/ld+json">${JSON.stringify(result.structuredData).replace(/</g, '\\u003c')}</script>`]
      : [];

    const head = [
      `<title>${escapeHtml(result.meta.title)}</title>`,
      `<meta name="description" content="${escapeHtml(result.meta.description)}" />`,
      `<meta property="og:title" content="${escapeHtml(result.meta.title)}" />`,
      `<meta property="og:description" content="${escapeHtml(result.meta.description)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${escapeHtml(brand)}" />`,
      `<meta property="og:locale" content="${OG_LOCALES[locale] ?? locale}" />`,
      result.meta.canonical ? `<link rel="canonical" href="${escapeHtml(result.meta.canonical)}" />` : '',
      result.meta.canonical ? `<meta property="og:url" content="${escapeHtml(result.meta.canonical)}" />` : '',
      ...alternates,
      ...social,
      ...structured,
    ]
      .filter(Boolean)
      .join('\n    ');

    const html = template
      .replace(/(href|src)="\.\//g, `$1="${prefix}`)
      .replace('<html lang="en">', `<html lang="${locale}">`)
      .replace('<!--head-->', head)
      .replace('<!--app-->', result.html);

    const file = resolve(dist, path, 'index.html');
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html);
    console.log(`prerendered ${path || '/'} (${(html.length / 1024).toFixed(1)} kB)`);
  }
}

const notFound = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Page not found · ${escapeHtml(brand)}</title>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px; background: #15103a; color: #f3f0ff; font-family: 'Segoe UI', system-ui, sans-serif; text-align: center; }
      h1 { margin: 0 0 8px; font-size: 2.2rem; }
      p { margin: 0 0 24px; color: #c6bfea; }
      a { display: inline-block; padding: 12px 22px; border-radius: 16px; background: #ffc24b; color: #2a1a00; font-weight: 800; text-decoration: none; }
      a:focus-visible { outline: 3px solid #4fe3e0; outline-offset: 3px; }
    </style>
  </head>
  <body>
    <main>
      <h1>This path leads nowhere</h1>
      <p>The page you are looking for is not on the map.</p>
      <a id="home" href="/">Back to ${escapeHtml(brand)}</a>
    </main>
    <script>
      (function () {
        var parts = location.pathname.split('/').filter(Boolean);
        var onProjectSite = /\\.github\\.io$/.test(location.hostname) && parts.length > 0;
        var base = onProjectSite ? '/' + parts[0] + '/' : '/';
        var rest = (onProjectSite ? parts.slice(1) : parts).join('/').toLowerCase();
        var moved = {
          home: '',
          game: '#games',
          'game/gameweb': 'about/#web-games',
          'game/playableads': 'about/#playable-ads',
          'game/gamemobile': 'about/#mobile-games',
          package: 'extras/#toolkits',
          other: 'extras/#side-projects',
          contact: '#contact'
        };
        document.getElementById('home').href = base;
        if (Object.prototype.hasOwnProperty.call(moved, rest)) location.replace(base + moved[rest]);
      })();
    </script>
  </body>
</html>
`;

await writeFile(resolve(dist, '404.html'), notFound);
await writeFile(resolve(dist, '.nojekyll'), '');

if (siteUrl) {
  const pages = sitemapEntries.map(
    ({ url, alternateUrls }) =>
      `  <url>\n    <loc>${url}</loc>\n${alternateUrls
        .map(([code, href]) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${href}" />`)
        .join('\n')}\n  </url>`,
  );
  const extras = sitemapExtra.map((path) => `  <url>\n    <loc>${siteUrl}/${path}</loc>\n  </url>`);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${[...pages, ...extras].join('\n')}\n</urlset>\n`;
  await writeFile(resolve(dist, 'sitemap.xml'), sitemap);
  await writeFile(resolve(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log(`wrote sitemap.xml (${pages.length + extras.length} URLs) and robots.txt`);
}
await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });
console.log('wrote 404.html and .nojekyll');
