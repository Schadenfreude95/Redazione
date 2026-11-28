#!/usr/bin/env node
// Uso: node scripts/confronta.mjs congelate/<file>.md pubblicati/<file>.md
// Confronta la copia congelata (proposta del team) con la versione pubblicata.
// Calcoli deterministici, niente IA: la lettura dei risultati la fa l'agente analista.
import { readFileSync, appendFileSync, existsSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { testoPost } from './testo.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const [a, b] = process.argv.slice(2);
if (!/^congelate\/[\w.\-]+\.md$/.test(a || '') || !/^pubblicati\/[\w.\-]+\.md$/.test(b || '')) {
  console.error('Uso: node scripts/confronta.mjs congelate/<file>.md pubblicati/<file>.md'); process.exit(1);
}
const prima = testoPost(readFileSync(join(root, a), 'utf8'));
const dopo = testoPost(readFileSync(join(root, b), 'utf8'));
const parole = t => t.toLowerCase().normalize('NFC').match(/[\p{L}\p{N}']+/gu) || [];
const righe = t => t.split('\n').map(x => x.trim()).filter(Boolean);
function lcs(x, y) {
  let prev = new Array(y.length + 1).fill(0);
  for (let i = 1; i <= x.length; i++) {
    const cur = new Array(y.length + 1).fill(0);
    for (let j = 1; j <= y.length; j++) cur[j] = x[i - 1] === y[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]);
    prev = cur;
  }
  return prev[y.length];
}
const sim = (x, y) => (x.length + y.length) ? 2 * lcs(x, y) / (x.length + y.length) : 1;
const pA = parole(prima), pB = parole(dopo);
const s = sim(pA, pB);
const hookA = righe(prima)[0] || '', hookB = righe(dopo)[0] || '';
const hookCambiato = sim(parole(hookA), parole(hookB)) < 0.8;
const chiusA = righe(prima).slice(-3).join(' '), chiusB = righe(dopo).slice(-3).join(' ');
const chiusuraCambiata = sim(parole(chiusA), parole(chiusB)) < 0.8;
const domandaA = /\?\s*$/.test(righe(prima).slice(-1)[0] || ''), domandaB = /\?\s*$/.test(righe(dopo).slice(-1)[0] || '');
const elenchiA = righe(prima).filter(l => /^[-•*]\s/.test(l)).length, elenchiB = righe(dopo).filter(l => /^[-•*]\s/.test(l)).length;
const conta = arr => arr.reduce((m, w) => (m[w] = (m[w] || 0) + 1, m), {});
const cA = conta(pA), cB = conta(pB);
const tolte = Object.keys(cA).filter(w => w.length > 3 && (cA[w] - (cB[w] || 0)) > 0).sort((x, y) => (cA[y] - (cB[y] || 0)) - (cA[x] - (cB[x] || 0))).slice(0, 8);
const aggiunte = Object.keys(cB).filter(w => w.length > 3 && (cB[w] - (cA[w] || 0)) > 0).sort((x, y) => (cB[y] - (cA[y] || 0)) - (cB[x] - (cA[x] || 0))).slice(0, 8);
const esito = (s >= 0.97 && !hookCambiato && !chiusuraCambiata) ? 'intatto' : (s < 0.6 || (hookCambiato && s < 0.75)) ? 'riscritto' : 'ritoccato';
const data = new Date().toISOString().slice(0, 10);
const csv = join(root, 'statistiche', 'revisioni.csv');
if (!existsSync(csv)) appendFileSync(csv, 'data,file,esito,somiglianza,hook_cambiato,chiusura_cambiata,domanda_finale_prima,domanda_finale_dopo,caratteri_prima,caratteri_dopo,elenchi_prima,elenchi_dopo,parole_tolte,parole_aggiunte\n');
const q = v => `"${String(v).replace(/"/g, '""')}"`;
appendFileSync(csv, [data, basename(b), esito, s.toFixed(2), hookCambiato, chiusuraCambiata, domandaA, domandaB, prima.length, dopo.length, elenchiA, elenchiB, q(tolte.join(' ')), q(aggiunte.join(' '))].join(',') + '\n');
console.log(`Confronto ${basename(b)}
- Esito: ${esito.toUpperCase()} (somiglianza ${Math.round(s * 100)}%)
- Gancio: ${hookCambiato ? `CAMBIATO\n    prima: ${hookA}\n    dopo:  ${hookB}` : 'uguale'}
- Chiusura: ${chiusuraCambiata ? 'CAMBIATA' : 'uguale'} · domanda finale: prima ${domandaA ? 'sì' : 'no'}, dopo ${domandaB ? 'sì' : 'no'}
- Lunghezza: ${prima.length} → ${dopo.length} caratteri · elenchi puntati: ${elenchiA} → ${elenchiB}
- Parole tolte: ${tolte.join(', ') || '—'}
- Parole aggiunte: ${aggiunte.join(', ') || '—'}
Registrato in statistiche/revisioni.csv`);
