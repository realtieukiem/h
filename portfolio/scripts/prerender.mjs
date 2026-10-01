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

for (const page of server.PAGE_IDS) {
  const prefix = server.rootPrefix(page);
  const result = await server.render(page);
  brand = result.brand;

  const head = [
    `<title>${escapeHtml(result.meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(result.meta.description)}" />`,
    `<meta property="og:title" content="${escapeHtml(result.meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(result.meta.description)}" />`,
    `<meta property="og:type" content="website" />`,
    result.meta.canonical ? `<link rel="canonical" href="${escapeHtml(result.meta.canonical)}" />` : '',
    result.meta.canonical ? `<meta property="og:url" content="${escapeHtml(result.meta.canonical)}" />` : '',
  ]
    .filter(Boolean)
    .join('\n    ');

  const html = template
    .replace(/(href|src)="\.\//g, `$1="${prefix}`)
    .replace('<html lang="en">', `<html lang="${result.lang}">`)
    .replace('<!--head-->', head)
    .replace('<!--app-->', result.html);

  const file = resolve(dist, server.PAGE_PATHS[page], 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  console.log(`prerendered ${server.PAGE_PATHS[page] || '/'} (${(html.length / 1024).toFixed(1)} kB)`);
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
          package: 'about/#toolkits-title',
          other: 'about/#side-title',
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
await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });
console.log('wrote 404.html and .nojekyll');
