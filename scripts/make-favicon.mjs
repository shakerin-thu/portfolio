/**
 * Builds public/favicon.ico from app/icon.png.
 *
 * Modern browsers use the <link rel="icon"> that app/icon.png generates, but
 * crawlers, feed readers and older agents still request /favicon.ico directly.
 * An ICO here is a container around a PNG, which every current browser decodes.
 */
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

const SIZE = 48;

const png = await sharp('app/icon.png').resize(SIZE, SIZE, { fit: 'cover' }).png().toBuffer();

// ICONDIR (6 bytes) + one ICONDIRENTRY (16 bytes) + the PNG payload.
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: 1 = icon
header.writeUInt16LE(1, 4); // image count

const entry = Buffer.alloc(16);
entry.writeUInt8(SIZE, 0); // width
entry.writeUInt8(SIZE, 1); // height
entry.writeUInt8(0, 2); // palette size (0 = no palette)
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(1, 4); // colour planes
entry.writeUInt16LE(32, 6); // bits per pixel
entry.writeUInt32LE(png.length, 8); // payload size
entry.writeUInt32LE(header.length + entry.length, 12); // payload offset

writeFileSync('public/favicon.ico', Buffer.concat([header, entry, png]));
console.log(`public/favicon.ico written: ${SIZE}x${SIZE}, ${header.length + entry.length + png.length} bytes`);
