#!/usr/bin/env node
// Registra quale variante l'autore ha scelto (gancio, chiusura…) e quali ha scartato.
// Ogni scelta dice "questa è meglio di quelle": un segnale che le correzioni non danno.
// Uso: node scripts/registra-scelta.mjs <bozza.md> <parte> "<scelta>" "<scartata 1>" ["<scartata 2>" …]
import { appendFileSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [file, parte, scelta, ...scartate] = process.argv.slice(2);
if (!file || !parte || !scelta) { console.error('Uso: node scripts/registra-scelta.mjs <bozza.md> <parte> "<scelta>" "<scartata>" …'); process.exit(1); }
const csv = join(root, 'statistiche', 'scelte.csv');
const q = v => `"${String(v).replace(/"/g, '""')}"`;
if (!existsSync(csv)) appendFileSync(csv, 'data,bozza,parte,scelta,scartate,riscritta_da_autore\n');
const propria = scelta.startsWith('*'); // '*' davanti = l'autore ha scritto una versione sua
appendFileSync(csv, [new Date().toISOString().slice(0, 10), basename(file), parte, q(scelta.replace(/^\*/, '')), q(scartate.join(' | ')), propria ? 'sì' : 'no'].join(',') + '\n');
console.log(`Scelta registrata: ${parte} di ${basename(file)}.`);
