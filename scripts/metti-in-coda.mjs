#!/usr/bin/env node
// Sposta una bozza approvata in coda/. Rifiuta se manca l'APPROVO o se il testo
// è cambiato dopo l'approvazione.
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const arg = process.argv[2] || '';
if (!/^bozze\/[\w.\-]+\.md$/.test(arg)) { console.error('Uso: node scripts/metti-in-coda.mjs bozze/<file>.md'); process.exit(1); }
const src = join(root, arg);
const name = basename(arg);
const okFile = join(root, '.approvazioni', name + '.ok');
if (!existsSync(src)) { console.error(`Non trovo ${arg}.`); process.exit(1); }
if (!existsSync(okFile)) { console.error(`Rifiutato: manca "APPROVO ${arg}" scritto da te.`); process.exit(3); }
const content = readFileSync(src);
const hash = createHash('sha256').update(content).digest('hex');
const ok = JSON.parse(readFileSync(okFile, 'utf8'));
if (ok.sha256 !== hash) { console.error(`Rifiutato: ${arg} è stato modificato dopo l'APPROVO. Serve un nuovo APPROVO.`); process.exit(3); }
mkdirSync(join(root, 'coda'), { recursive: true });
const dest = join(root, 'coda', name);
if (existsSync(dest)) { console.error(`coda/${name} esiste già.`); process.exit(1); }
writeFileSync(dest, content);
rmSync(okFile); // un APPROVO vale una volta sola
console.log(`In coda: coda/${name} (approvato il ${ok.approvato_il}).`);
