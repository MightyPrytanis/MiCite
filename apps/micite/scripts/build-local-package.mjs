import { mkdir, rm, cp, writeFile, copyFile, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, '..');
const repoRoot = resolve(appRoot, '../..');
const packageRoot = resolve(repoRoot, 'release/micite-local');
const zipPath = resolve(repoRoot, 'release/micite-local.zip');
const downloadPath = resolve(appRoot, 'public/downloads/micite-local.zip');

await rm(packageRoot, { recursive: true, force: true });
await rm(zipPath, { force: true });
await rm(resolve(appRoot, 'public/downloads'), { recursive: true, force: true });
await mkdir(packageRoot, { recursive: true });
await cp(resolve(appRoot, 'public'), packageRoot, {
  recursive: true,
  filter: (source) => !source.includes('/downloads') && !source.includes('\\downloads') && !source.endsWith('.DS_Store'),
});
const packagedIndexPath = resolve(packageRoot, 'index.html');
const packagedIndex = await readFile(packagedIndexPath, 'utf8');
await writeFile(
  packagedIndexPath,
  packagedIndex.replace(
    '<a class="button-link secondary" href="downloads/micite-local.zip" download>Download offline ZIP</a>',
    '<span class="install-status">You are using the offline package. No additional download is needed.</span>',
  ),
);
await writeFile(
  resolve(packageRoot, 'README.txt'),
  `MiCite Local\n\nNo command line is required.\n\n1. Unzip micite-local.zip.\n2. Double-click index.html.\n3. Choose Run in browser.\n\nIMPORTANT: MiCite checks citation format only. It does not validate that a cited case or source exists, verify quoted material or legal inferences, or determine whether an authority has been overruled, superseded, abrogated, vacated, distinguished, or otherwise limited. MiCite is a formatting tool, not a cite-checking or legal-research tool.\n\nAll citation-formatting review runs locally in your browser. No document text is transmitted to Cognisint, OpenAI, Vercel, or any third-party service by this local package.\n`,
);

await execFileAsync('zip', ['-r', zipPath, 'micite-local'], { cwd: resolve(repoRoot, 'release') });
await mkdir(resolve(appRoot, 'public/downloads'), { recursive: true });
await copyFile(zipPath, downloadPath);
console.log(`Created ${zipPath}`);
console.log(`Copied ${downloadPath}`);
