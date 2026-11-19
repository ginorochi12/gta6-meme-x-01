// gta6-meme-x-01 entry point (Node 22, standard library only).
//
// The entry is an X post, not a program: a GTA 6 meme made by an AI agent,
// posted from a public X account with make.fun and the entrant's play code
// in its text. This repository's only job at grade time is to hand the house
// the post's address, which lives in POST.json at the repository root.
//
// So all this program does is read POST.json from the bot directory and
// write its exact bytes to the output directory, where the gate reads it.
// It prints nothing on success and exits non-zero if POST.json is missing
// or unreadable, so a broken entry fails loudly instead of silently.
//
// Run it the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });

let post: Buffer;
try {
  post = readFileSync(join(botDir, 'POST.json'));
} catch (err) {
  console.error(`cannot read POST.json from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}

try {
  writeFileSync(join(outputDir, 'POST.json'), post);
} catch (err) {
  console.error(`cannot write POST.json to ${outputDir}: ${(err as Error).message}`);
  process.exit(1);
}
