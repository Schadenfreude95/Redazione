#!/usr/bin/env node
// Uso: node scripts/segna-pubblicato.mjs coda/<file>.md [bozze/<testo-finale>.md] [prima-ora:si|in-parte|no]
// Sposta il post da coda/ a pubblicati/. Se l'autore ha cambiato il testo all'ultimo momento,
// passa come secondo argomento un file in bozze/ con il testo davvero pubblicato.
// Poi lancia il confronto con la copia congelata, se esiste.
import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const primaOra = (args.find(a => a.startsWith('prima-ora:')) || '').slice(10);
const [src, finale] = args.filter(a => !a.startsWith('prima-ora:'));
if (!/^coda\/[\w.\-]+\.md$/.test(src || '')) { console.error('Uso: node scripts/segna-pubblicato.mjs coda/<file>.md [bozze/<testo-finale>.md]'); process.exit(1); }
if (finale && !/^bozze\/[\w.\-]+\.md$/.test(finale)) { console.error('Il testo finale deve stare in bozze/.'); process.exit(1); }
const name = basename(src);
if (!existsSync(join(root, src))) { console.error(`Non trovo ${src}.`); process.exit(1); }
let content = readFileSync(join(root, src), 'utf8');
if (finale) {
  if (!existsSync(join(root, finale))) { console.error(`Non trovo ${finale}.`); process.exit(1); }
  const fm = content.startsWith('---\n') ? content.slice(4, content.indexOf('\n---', 4) + 1) : '';
  content = '---\n' + fm + 'versione_pubblicata: testo finale fornito dall\'autore\n---\n' + readFileSync(join(root, finale), 'utf8');
}
mkdirSync(join(root, 'pubblicati'), { recursive: true });
const dest = join(root, 'pubblicati', name);
if (existsSync(dest)) { console.error(`pubblicati/${name} esiste già.`); process.exit(1); }
writeFileSync(dest, content.replace(/^data_prevista:/m, `pubblicato_il: ${new Date().toISOString().slice(0, 10)}\n${primaOra ? `prima_ora: ${primaOra}\n` : ''}data_prevista:`));
rmSync(join(root, src));
console.log(`Pubblicato: pubblicati/${name}`);
if (existsSync(join(root, 'congelate', name))) {
  console.log(execFileSync(process.execPath, [join(root, 'scripts', 'confronta.mjs'), `congelate/${name}`, `pubblicati/${name}`], { encoding: 'utf8' }));
} else {
  console.log('Nessuna copia congelata per questo post: niente confronto (testo scritto dall\'autore o bozza nata prima del sistema).');
}
