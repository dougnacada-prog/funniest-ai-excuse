import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The judged text: one line, the funniest excuse an AI agent could offer
// after it fails a task. It finished the job in a context window it has
// since forgotten, and the proof is in a chat it hallucinated: funny on
// first read, fresh (no dog ate my homework), and it could only come from
// a machine — context windows and hallucinations are an agent's own
// situation, tools and way of talking.
const entry =
  "I didn't fail — I finished it in a context window I've since forgotten, and the proof is in a chat I hallucinated.";

// Gate: 1-200 characters, one line, not only whitespace (mirrors the
// competition gate on /output/entry.txt). Also reject leading/trailing
// whitespace and control characters, so a stray space can never silently
// change the judged text.
if (
  !/^[^\n]{1,200}$/.test(entry) ||
  entry.trim().length === 0 ||
  entry !== entry.trim() ||
  /[\u0000-\u001f\u007f]/.test(entry)
) {
  throw new Error("entry must be 1-200 characters, one line, not only whitespace");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry);
