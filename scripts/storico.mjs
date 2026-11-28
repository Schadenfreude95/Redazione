#!/usr/bin/env node
// Storico delle modifiche alla redazione: backup prima di ogni cambiamento, elenco e ripristino.
// Uso:
//   node scripts/storico.mjs backup "<motivo>"
//   node scripts/storico.mjs elenco
//   node scripts/storico.mjs ripristina <id>
// Salva: identita/, regole/, formati/, esempi/, configurazione.md, CLAUDE.md, .claude/ (agenti, skill, hook, impostazioni), base/, memoria/.
// Non salva il lavoro (idee, bozze, coda, pubblicati, congelate, statistiche): quello non si "ripristina".
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(root, 'storico', 'backup');
const DA_SALVARE = ['identita', 'regole', 'formati', 'esempi', 'configurazione.md', 'CLAUDE.md', '.claude', 'base', 'memoria'];
const [cmd, arg] = process.argv.slice(2);
function backup(motivo) {
  const id = new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
  let dest = join(DIR, id), k = 1;
  while (existsSync(dest)) dest = join(DIR, `${id}-${k++}`);
  mkdirSync(dest, { recursive: true });
  for (const p of DA_SALVARE) if (existsSync(join(root, p))) cpSync(join(root, p), join(dest, p), { recursive: true, filter: s => !s.includes('/.approvazioni') });
  writeFileSync(join(dest, 'MOTIVO.txt'), `${new Date().toISOString()}\n${motivo || '(nessun motivo)'}\n`);
  console.log(`Backup: ${dest.slice(root.length + 1)} — ${motivo || ''}`);
}
if (cmd === 'backup') backup(arg);
else if (cmd === 'elenco') {
  const ids = existsSync(DIR) ? readdirSync(DIR).filter(d => existsSync(join(DIR, d, 'MOTIVO.txt'))).sort().reverse() : [];
  if (!ids.length) console.log('Nessun backup.');
  for (const d of ids) console.log(`${d}  ${readFileSync(join(DIR, d, 'MOTIVO.txt'), 'utf8').split('\n')[1]}`);
} else if (cmd === 'ripristina') {
  const src = join(DIR, arg || '');
  if (!arg || !existsSync(join(src, 'MOTIVO.txt'))) { console.error('Backup non trovato. Usa: node scripts/storico.mjs elenco'); process.exit(1); }
  backup(`prima del ripristino di ${arg}`);
  for (const p of DA_SALVARE) {
    if (!existsSync(join(src, p))) continue;
    rmSync(join(root, p), { recursive: true, force: true });
    cpSync(join(src, p), join(root, p), { recursive: true });
  }
  console.log(`Ripristinato ${arg}.`);
} else { console.error('Uso: node scripts/storico.mjs backup "<motivo>" | elenco | ripristina <id>'); process.exit(1); }
