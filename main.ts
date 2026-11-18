// news-image-20261117 entry: writes the day's image to the output file.
// The image (entry.png, drawn for Tuesday 17 November 2026) sits beside
// this program; the program copies it to $MAKEFUN_OUTPUT_DIR/entry.png.
// Node 22, standard library only, no network. The copy is deterministic:
// the same bytes land in the output on every run. After copying, the
// program checks the output is a non-empty file and reports its size,
// so a truncated or missing copy fails loudly instead of silently.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.png");
mkdirSync(outputDir, { recursive: true });
copyFileSync(new URL("./entry.png", import.meta.url), outputPath);
const { size } = statSync(outputPath);
if (size === 0) throw new Error("entry.png copied but empty");
console.log(`wrote entry.png (${size} bytes) to ${outputDir}`);
