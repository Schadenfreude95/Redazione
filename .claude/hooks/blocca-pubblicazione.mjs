#!/usr/bin/env node
// Hook PreToolUse: blocca qualsiasi scrittura in coda/, pubblicati/ o .approvazioni/
// e qualsiasi strumento esterno di pubblicazione. L'unica strada verso coda/ è
// "node scripts/metti-in-coda.mjs bozze/<file>.md", che ricontrolla l'approvazione;
// verso pubblicati/ è "node scripts/segna-pubblicato.mjs".
// Le copie congelate in congelate/ si creano una volta sola e non si modificano mai.
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf8') || '{}');
const tool = String(input.tool_name || '');
const ti = input.tool_input || {};
const protetti = /(^|[\s"'\/=])(coda|pubblicati|congelate|\.approvazioni)(\/|\b)/;
const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();

function blocca(motivo) {
  process.stderr.write(motivo + '\n');
  process.exit(2); // exit 2 = azione bloccata, il motivo torna a Claude
}

if (/^mcp__/.test(tool) && /(publish|schedul|post|share|create.*Post|send)/i.test(tool) && !/^mcp__.*(get|list|read|search)/i.test(tool)) {
  blocca(`Bloccato: ${tool} pubblica o programma contenuti all'esterno. Usa "node scripts/metti-in-coda.mjs bozze/<file>.md" dopo il tuo APPROVO.`);
}
if (['Write', 'Edit', 'MultiEdit', 'NotebookEdit'].includes(tool)) {
  const p = String(ti.file_path || ti.notebook_path || '');
  if (/(^|\/)congelate\/[^/]+\.md$/.test(p)) {
    if (tool === 'Write' && !existsSync(resolve(root, p))) process.exit(0); // prima creazione: ammessa
    blocca(`Bloccato: ${p} è una copia congelata. Si crea una volta e non si modifica mai: serve al confronto con la versione pubblicata.`);
  }
  if (/bozze\/\.versioni\//.test(p)) blocca(`Bloccato: ${p} è lo storico automatico delle versioni. Non si modifica a mano.`);
  if (protetti.test(p)) blocca(`Bloccato: non si scrive direttamente in ${p}. Serve il tuo APPROVO e poi scripts/metti-in-coda.mjs.`);
}
if (tool === 'Bash') {
  const cmd = String(ti.command || '');
  const consentito = /^\s*node\s+scripts\/(metti-in-coda\.mjs\s+bozze\/[\w.\-]+\.md|segna-pubblicato\.mjs\s+coda\/[\w.\-]+\.md(\s+bozze\/[\w.\-]+\.md)?(\s+prima-ora:(si|in-parte|no))?|confronta\.mjs\s+congelate\/[\w.\-]+\.md\s+pubblicati\/[\w.\-]+\.md)\s*$/.test(cmd);
  if (!consentito && protetti.test(cmd) && /(>|cp|mv|rsync|tee|touch|rm|sed\s+-i|ln|install|dd|python|node|perl|ruby|curl|wget)/.test(cmd)) {
    blocca('Bloccato: comando che tocca coda/, pubblicati/, congelate/ o .approvazioni/. Ammessi solo: node scripts/metti-in-coda.mjs, node scripts/segna-pubblicato.mjs, node scripts/confronta.mjs.');
  }
  if (!consentito && /(api\.linkedin\.com|\/rest\/posts|ugcPosts)/i.test(cmd)) {
    blocca('Bloccato: chiamata diretta all\'API di pubblicazione di LinkedIn.');
  }
}
process.exit(0);
