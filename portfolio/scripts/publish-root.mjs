import { cp, rm, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(project, 'dist');
const target = resolve(project, '..');

const MANAGED = ['index.html', '404.html', '.nojekyll', 'favicon.svg', 'about', 'extras', 'privacy-policy', 'vi', 'assets', 'media'];

await stat(resolve(dist, 'index.html')).catch(() => {
  throw new Error('dist/index.html is missing. Run "npm run build" first.');
});

for (const name of MANAGED) {
  await rm(resolve(target, name), { recursive: true, force: true });
  await cp(resolve(dist, name), resolve(target, name), { recursive: true });
  console.log(`published ${name}`);
}
