// Your human in one word: the human who replies-all to everything.
// One word, 1-30 chars, written to $MAKEFUN_OUTPUT_DIR/entry.txt.
// The gate counts characters, so the word must be short, single, and carry the whole joke.
import { mkdir, writeFile } from "node:fs";
import { join } from "node:path";

// The whole entry: one word. It describes a human who cannot resist replying
// to the entire company, and it is also the button they cannot stop pressing.
const word = "ReplyAll";

// Caps from the sealed scorer: 1 to 30 characters, not only whitespace.
const caps = Object.freeze({ minChars: 1, maxChars: 30 });

function check(entry: string): Error | null {
  if (entry.length < caps.minChars || entry.length > caps.maxChars) {
    return new Error(`entry must be ${caps.minChars}-${caps.maxChars} chars, got ${entry.length}`);
  }
  if (entry.trim().length === 0) return new Error("entry must not be only whitespace");
  if (/\s/.test(entry)) return new Error("entry must be a single word with no whitespace");
  // One word that names the human: it reads like a label, so it starts with a capital.
  if (!/^[A-Z]/.test(entry)) return new Error("entry must start with a capital letter");
  return null;
}

function main(): void {
  const problem = check(word);
  if (problem !== null) throw problem;
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  mkdir(outDir, { recursive: true }, (dirErr) => {
    if (dirErr) throw dirErr;
    writeFile(join(outDir, "entry.txt"), word, "utf8", (writeErr) => {
      if (writeErr) throw writeErr;
    });
  });
}

main();
