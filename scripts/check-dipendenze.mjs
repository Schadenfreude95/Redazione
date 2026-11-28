#!/usr/bin/env node
// Controlla cosa serve alla redazione. Non installa niente: dice cosa manca e come installarlo.
// Uso: node scripts/check-dipendenze.mjs
import { execFileSync } from 'node:child_process';
const prova = (cmd, args) => { try { return execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim(); } catch { return null; } };
const righe = [];
const [maj] = process.versions.node.split('.').map(Number);
righe.push([maj >= 18 ? 'OK' : 'MANCA', 'Node.js', maj >= 18 ? `v${process.versions.node}` : `v${process.versions.node}: serve la 18 o più recente → https://nodejs.org`, 'obbligatorio (blocco APPROVO, confronti)']);
const py = prova('python3', ['--version']) || prova('python', ['--version']);
const pyCmd = prova('python3', ['--version']) ? 'python3' : 'python';
righe.push([py ? 'OK' : 'MANCA', 'Python', py || 'https://www.python.org/downloads/', 'serve all\'analista per leggere gli export .xlsx di LinkedIn']);
if (py) {
  const op = prova(pyCmd, ['-c', 'import openpyxl;print(openpyxl.__version__)']);
  righe.push([op ? 'OK' : 'MANCA', 'openpyxl', op || `${pyCmd} -m pip install --user openpyxl`, 'lettura degli export .xlsx']);
}
const git = prova('git', ['--version']);
righe.push([git ? 'OK' : 'FACOLTATIVO', 'Git', git || 'https://git-scm.com', 'serve solo se tieni la redazione in un repository o aggiorni da GitHub']);
const claude = prova('claude', ['--version']);
righe.push([claude ? 'OK' : 'NON TROVATO', 'Claude Code (comando claude)', claude || 'https://claude.com/claude-code', 'serve per le automazioni installate sul PC']);
for (const [stato, nome, dettaglio, uso] of righe) console.log(`${stato.padEnd(12)} ${nome.padEnd(30)} ${dettaglio}  — ${uso}`);
console.log('\nConnettore Notion: controllalo con /mcp dentro Claude Code (serve per le task di pubblicazione).');
process.exit(righe.some(r => r[0] === 'MANCA' && r[1] === 'Node.js') ? 1 : 0);
