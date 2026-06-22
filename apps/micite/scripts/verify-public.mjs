import { access, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const publicRoot = resolve(here, '../public');

const requiredFiles = [
  'index.html',
  'app.html',
  'privacy.html',
  'terms.html',
  'help.html',
  'app.js',
  'landing.js',
  'share.js',
  'install.js',
  'service-worker.js',
  'styles.css',
  'manifest.webmanifest',
  'downloads/micite-local.zip',
  'assets/micite-logo.png',
  'assets/micite-icon.png',
  'assets/cognisint-logo-horizontal-reversed.png',
];

await Promise.all(requiredFiles.map((file) => access(resolve(publicRoot, file))));
JSON.parse(await readFile(resolve(publicRoot, 'manifest.webmanifest'), 'utf8'));

console.log('MiCite static public assets verified.');
