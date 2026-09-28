/**
 * Encodes source photographs into the three formats the site serves.
 *
 * Drop originals into `media-src/` (any size, any format sharp can read), then:
 *
 *   npm run media
 *
 * Each file becomes `public/media/<name>.avif`, `.webp` and `.jpg`, capped at
 * MAX_WIDTH. The script prints a ready-to-paste content snippet with the real
 * dimensions, because `width` and `height` must match the encoded file or the
 * browser reserves the wrong space and the page shifts as images load.
 *
 * Nothing is optimised at request time — the site runs on Cloudflare Workers,
 * where no image optimiser is available — so this step is how images get small.
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

import sharp from 'sharp';

const SOURCE_DIR = 'media-src';
const OUT_DIR = path.join('public', 'media');
const MAX_WIDTH = 1600;
const READABLE = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tif', '.tiff', '.heic']);

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;

async function main() {
  let entries;
  try {
    entries = await readdir(SOURCE_DIR);
  } catch {
    console.error(
      `No \`${SOURCE_DIR}/\` directory found.\n` +
        `Create it, drop your photographs in, and run this again.`,
    );
    process.exitCode = 1;
    return;
  }

  const files = entries.filter((name) => READABLE.has(path.extname(name).toLowerCase()));
  if (files.length === 0) {
    console.error(`\`${SOURCE_DIR}/\` has no images this script can read.`);
    process.exitCode = 1;
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  const snippets = [];

  for (const file of files) {
    const name = path
      .basename(file, path.extname(file))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const input = path.join(SOURCE_DIR, file);
    const base = sharp(input).rotate().resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
      fit: 'inside',
    });

    const out = (ext) => path.join(OUT_DIR, `${name}.${ext}`);

    const { width, height } = await base
      .clone()
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(out('jpg'));
    await base.clone().avif({ quality: 62, effort: 7 }).toFile(out('avif'));
    await base.clone().webp({ quality: 82, effort: 5 }).toFile(out('webp'));

    const sizes = await Promise.all(
      ['avif', 'webp', 'jpg'].map(async (ext) => `${ext} ${kb((await stat(out(ext))).size)}`),
    );

    console.log(`${name}  ${width}x${height}  ${sizes.join('  ')}`);
    snippets.push(
      `image: {\n` +
        `  src: '${name}',\n` +
        `  alt: 'DESCRIBE WHAT IS HAPPENING IN THIS PHOTO',\n` +
        `  width: ${width},\n` +
        `  height: ${height},\n` +
        `},`,
    );
  }

  console.log(`\nPaste into content/profile.ts or content/ventures.ts:\n`);
  console.log(snippets.join('\n\n'));
  console.log(`\nReplace every alt line before publishing.`);
}

await main();
