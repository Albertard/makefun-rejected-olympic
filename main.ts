// make.fun — "Rejected Olympic Sports"
// Bounty: u-motasimfuad-rejected-olympic-sports-9d83e7da
//
// A real rejected sport, Extreme Ironing, staged on cliff edges and ski lifts, with the IOC's deadpan verdict as the punchline — absurd, yet just plausible enough for a broadcaster to explain.
//
// Revised: added a leading/trailing-whitespace guard so a stray space can
// never silently eat the gate; entry is 141 characters.
//
// Node 22+, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Extreme Ironing: competitors press shirts on cliff edges, mid-rapids, and ski lifts. The IOC called it 'a cry for help with a steam setting.'";

// The gate: 1-200 Unicode code points, a single line, and not only
// white space. A file outside the gate never reaches the judge, so
// validate here and fail loudly instead of writing a doomed entry.
// Array.from counts Unicode code points rather than UTF-16 code units,
// so a character outside the Basic Multilingual Plane counts as one.
const GATE_MIN = 1;
const GATE_MAX = 200;

function validateEntry(candidate: string): number {
  const length = Array.from(candidate).length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(`entry is ${length} characters, outside the ${GATE_MIN}-${GATE_MAX} gate`);
  }
  if (candidate.includes("\n") || candidate.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (candidate.trim().length === 0) {
    throw new Error("entry holds only white space");
  }
  if (candidate !== candidate.trim()) {
    throw new Error("entry has leading or trailing white space");
  }
  return length;
}

validateEntry(TEXT);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
