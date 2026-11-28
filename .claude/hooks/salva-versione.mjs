#!/usr/bin/env node
// Hook PostToolUse (Write/Edit): salva ogni versione di una bozza in bozze/.versioni/<nome>/<ora>.md.
// Così l'analista vede tutto il percorso, non solo la prima proposta e il testo finale.
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve, relative, basename } from 'node:path';
const input = JSON.parse(readFileSync(0, 'utf8') || '{}');
const root = process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd();
const p = String((input.tool_input || {}).file_path || '');
if (!p) process.exit(0);
const rel = relative(join(root, 'bozze'), resolve(root, p));
if (rel.startsWith('..') || rel.includes('/') || !rel.endsWith('.md') || !existsSync(resolve(root, p))) process.exit(0);
const dir = join(root, 'bozze', '.versioni', basename(rel, '.md'));
mkdirSync(dir, { recursive: true });
const testo = readFileSync(resolve(root, p), 'utf8');
const prec = readdirSync(dir).sort().pop();
if (prec && readFileSync(join(dir, prec), 'utf8') === testo) process.exit(0);
writeFileSync(join(dir, new Date().toISOString().replace(/[:.]/g, '-') + '.md'), testo);
process.exit(0);
