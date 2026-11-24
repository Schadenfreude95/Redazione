#!/usr/bin/env node
// Hook PreToolUse: blocca qualsiasi scrittura in coda/, pubblicati/ o .approvazioni/
// e qualsiasi strumento esterno di pubblicazione. L'unica strada verso coda/ è
// "node scripts/metti-in-coda.mjs bozze/<file>.md", che ricontrolla l'approvazione.
import { readFileSync } from 'node:fs';

const input = JSON.parse(readFileSync(0, 'utf8') || '{}');
const tool = String(input.tool_name || '');
const ti = input.tool_input || {};
const protetti = /(^|[\s"'\/=])(coda|pubblicati|\.approvazioni)(\/|\b)/;

function blocca(motivo) {
  process.stderr.write(motivo + '\n');
  process.exit(2); // exit 2 = azione bloccata, il motivo torna a Claude
}

if (/^mcp__/.test(tool) && /(publish|schedul|post|share|create.*Post|send)/i.test(tool) && !/^mcp__.*(get|list|read|search)/i.test(tool)) {
  blocca(`Bloccato: ${tool} pubblica o programma contenuti all'esterno. Usa "node scripts/metti-in-coda.mjs bozze/<file>.md" dopo il tuo APPROVO.`);
}
if (['Write', 'Edit', 'MultiEdit', 'NotebookEdit'].includes(tool)) {
  const p = String(ti.file_path || ti.notebook_path || '');
  if (protetti.test(p)) blocca(`Bloccato: non si scrive direttamente in ${p}. Serve il tuo APPROVO e poi scripts/metti-in-coda.mjs.`);
}
if (tool === 'Bash') {
  const cmd = String(ti.command || '');
  const consentito = /^\s*node\s+scripts\/metti-in-coda\.mjs\s+bozze\/[\w.\-]+\.md\s*$/.test(cmd);
  if (!consentito && protetti.test(cmd) && /(>|cp|mv|rsync|tee|touch|rm|sed\s+-i|ln|install|dd|python|node|perl|ruby|curl|wget)/.test(cmd)) {
    blocca('Bloccato: comando che tocca coda/, pubblicati/ o .approvazioni/. L\'unico ammesso è "node scripts/metti-in-coda.mjs bozze/<file>.md".');
  }
  if (!consentito && /(api\.linkedin\.com|\/rest\/posts|ugcPosts)/i.test(cmd)) {
    blocca('Bloccato: chiamata diretta all\'API di pubblicazione di LinkedIn.');
  }
}
process.exit(0);
