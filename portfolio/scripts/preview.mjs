import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = resolve(project, option('dir', 'dist'));
const base = `/${option('base', '/').replace(/^\/+|\/+$/g, '')}/`.replace('//', '/');
const port = Number(option('port', '4173'));

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
};

const isFile = async (path) => (await stat(path).catch(() => null))?.isFile() ?? false;
const isDirectory = async (path) => (await stat(path).catch(() => null))?.isDirectory() ?? false;

const send = (response, status, path) => {
  response.writeHead(status, { 'Content-Type': TYPES[extname(path)] ?? 'application/octet-stream' });
  createReadStream(path).pipe(response);
};

createServer(async (request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);

  if (!pathname.startsWith(base)) {
    if (`${pathname}/` === base) {
      response.writeHead(301, { Location: base });
      response.end();
      return;
    }
    send(response, 404, join(dir, '404.html'));
    return;
  }

  const relative = normalize(pathname.slice(base.length)).replace(/^(\.\.[/\\])+/, '');
  const path = join(dir, relative);

  if (await isDirectory(path)) {
    if (!pathname.endsWith('/')) {
      response.writeHead(301, { Location: `${pathname}/` });
      response.end();
      return;
    }
    if (await isFile(join(path, 'index.html'))) {
      send(response, 200, join(path, 'index.html'));
      return;
    }
  }

  if (await isFile(path)) {
    send(response, 200, path);
    return;
  }

  send(response, 404, join(dir, '404.html'));
}).listen(port, () => {
  console.log(`Serving ${dir} at http://localhost:${port}${base}`);
});
