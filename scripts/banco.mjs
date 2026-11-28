#!/usr/bin/env node
// Banco di prova: misura quanto il team si avvicina all'autore.
// Ogni caso in banco/casi/<nome>.md ha due sezioni: "## Materiale" (gli appunti di partenza)
// e "## Versione dell'autore" (il testo finale). Il team riscrive ogni caso dal materiale in
// banco/risultati/<sessione>/<nome>.md; questo script confronta e registra la media.
// Uso: node scripts/banco.mjs <sessione>      (es. 2026-11-28)
import { readFileSync, readdirSync, existsSync, appendFileSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { testoPost, parole, righe, somiglianza } from './testo.mjs';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sessione = process.argv[2];
if (!/^[\w.\-]+$/.test(sessione || '')) { console.error('Uso: node scripts/banco.mjs <sessione>'); process.exit(1); }
const dirR = join(root, 'banco', 'risultati', sessione);
if (!existsSync(dirR)) { console.error(`Non trovo banco/risultati/${sessione}/`); process.exit(1); }
const sezione = (t, nome) => { const m = t.split(/^## /m).find(x => x.startsWith(nome)); return m ? m.slice(nome.length).trim() : ''; };
const risultati = [];
for (const f of readdirSync(join(root, 'banco', 'casi')).filter(f => f.endsWith('.md'))) {
  const caso = readFileSync(join(root, 'banco', 'casi', f), 'utf8');
  const autore = sezione(caso, "Versione dell'autore");
  const pathR = join(dirR, f);
  if (!autore || !existsSync(pathR)) { console.log(`- ${f}: saltato (${!autore ? 'manca la versione dell\'autore' : 'manca il risultato'})`); continue; }
  const team = testoPost(readFileSync(pathR, 'utf8'));
  const s = somiglianza(parole(team), parole(autore));
  const gancio = somiglianza(parole(righe(team)[0] || ''), parole(righe(autore)[0] || ''));
  risultati.push({ f, s, gancio, lt: team.length, la: autore.length });
  console.log(`- ${basename(f, '.md')}: somiglianza ${Math.round(s * 100)}% · gancio ${Math.round(gancio * 100)}% · lunghezza ${team.length} vs ${autore.length}`);
}
if (!risultati.length) { console.error('Nessun caso confrontato.'); process.exit(1); }
const media = risultati.reduce((a, r) => a + r.s, 0) / risultati.length;
const csv = join(root, 'banco', 'storico.csv');
if (!existsSync(csv)) appendFileSync(csv, 'sessione,casi,somiglianza_media,dettaglio\n');
let precedente = null;
if (existsSync(csv)) { const r = readFileSync(csv, 'utf8').trim().split('\n').slice(1).filter(Boolean).pop(); if (r) precedente = parseFloat(r.split(',')[2]); }
appendFileSync(csv, `${sessione},${risultati.length},${media.toFixed(3)},"${risultati.map(r => `${basename(r.f, '.md')}=${r.s.toFixed(2)}`).join(' ')}"\n`);
console.log(`\nMedia: ${Math.round(media * 100)}%${precedente !== null ? ` (prima: ${Math.round(precedente * 100)}% → ${media > precedente + 0.01 ? 'il team si sta avvicinando' : media < precedente - 0.01 ? 'il team si è allontanato' : 'stabile'})` : ' (prima misura)'}`);
console.log('Registrato in banco/storico.csv');
