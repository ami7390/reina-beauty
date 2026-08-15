import { rm, stat } from 'node:fs/promises';

const legacyPaths = [
  'db',
  'build',
  'worker',
  '.vinext',
  '.openai',
  'vite.config.ts',
  'vite.config.js',
];

for (const path of legacyPaths) {
  try {
    await stat(path);
    await rm(path, { recursive: true, force: true });
    console.log(`[cleanup] removed legacy path: ${path}`);
  } catch {
    // Path does not exist: nothing to clean.
  }
}
