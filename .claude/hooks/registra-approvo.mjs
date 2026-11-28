#!/usr/bin/env node
// Hook UserPromptSubmit: gira SOLO sui messaggi scritti da te.
// Se il messaggio contiene "APPROVO bozze/<file>.md", registra l'impronta (sha256)
// della bozza in .approvazioni/. Se la bozza cambia dopo, l'approvazione decade.
import { readFileSync, writeFileSync, mkdirSync, existsSync, appendFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve, relative, basename } from 'node:path';

const input = JSON.parse(readFileSync(0, 'utf8') || '{}');
const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const prompt = String(input.prompt || '');
// Registro dei messaggi dell'autore: la domenica l'analista ci cerca i commenti sulle bozze
// ("troppo ordinato", "frasi staccate"…), che altrimenti andrebbero persi.
try {
  mkdirSync(join(root, 'memoria'), { recursive: true });
  appendFileSync(join(root, 'memoria', 'messaggi.jsonl'), JSON.stringify({ quando: new Date().toISOString(), testo: prompt.slice(0, 4000) }) + '\n');
} catch {}
const found = [...prompt.matchAll(/^\s*APPROVO\s+(\S+\.md)\s*$/gm)].map(m => m[1]);
const notes = [];
for (const f of found) {
  const abs = resolve(root, f);
  const rel = relative(join(root, 'bozze'), abs);
  if (rel.startsWith('..') || rel.includes('/') || !existsSync(abs)) {
    notes.push(`APPROVO ignorato: ${f} non è un file in bozze/.`);
    continue;
  }
  const hash = createHash('sha256').update(readFileSync(abs)).digest('hex');
  mkdirSync(join(root, '.approvazioni'), { recursive: true });
  writeFileSync(join(root, '.approvazioni', basename(abs) + '.ok'),
    JSON.stringify({ file: 'bozze/' + basename(abs), sha256: hash, approvato_il: new Date().toISOString() }, null, 2));
  notes.push(`Approvazione registrata per bozze/${basename(abs)}. Vale solo per questa versione del testo.`);
}
if (notes.length) process.stdout.write(notes.join('\n') + '\n');
process.exit(0);
