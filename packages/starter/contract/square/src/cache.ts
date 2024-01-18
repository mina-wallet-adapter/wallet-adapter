import fs from 'fs/promises';
import { Cache } from 'o1js';
import { Square } from './square.js';

const cacheDir = 'build/cache';
const listFile = `${cacheDir}/list.json`;

async function cacheCompile() {
  // clean destination folder
  await fs.rm(cacheDir, { recursive: true, force: true });

  // compile
  const cache = Cache.FileSystem(cacheDir);
  await Square.compile({ cache });

  // write the list of compilation files into a json file
  const files = (await fs.readdir(cacheDir, 'utf8')).filter(
    (file) => !file.toLowerCase().endsWith('.header')
  );
  await fs.writeFile(listFile, JSON.stringify({ files }));
}

console.log('Compiling Square...');
console.time('Done');
await cacheCompile().catch((e) => console.error(e));
console.timeEnd('Done');
