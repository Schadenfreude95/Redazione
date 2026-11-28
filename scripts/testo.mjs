// Utilità condivise: estrae il testo del post da un file bozza (senza intestazione e marcatori del team).
export function testoPost(raw) {
  let s = raw.replace(/\r/g, '');
  if (s.startsWith('---\n')) { const end = s.indexOf('\n---', 4); if (end !== -1) s = s.slice(s.indexOf('\n', end + 1) + 1); }
  return s.split('\n')
    .filter(l => !/^(PRIMA STESURA|BOZZA v?\d|BOZZA —|BOZZA v)/i.test(l.trim()))
    .join('\n').replace(/^\s+|\s+$/g, '');
}

export const parole = t => t.toLowerCase().normalize('NFC').match(/[\p{L}\p{N}']+/gu) || [];
export const righe = t => t.split('\n').map(x => x.trim()).filter(Boolean);
function lcs(x, y) {
  let prev = new Array(y.length + 1).fill(0);
  for (let i = 1; i <= x.length; i++) {
    const cur = new Array(y.length + 1).fill(0);
    for (let j = 1; j <= y.length; j++) cur[j] = x[i - 1] === y[j - 1] ? prev[j - 1] + 1 : Math.max(prev[j], cur[j - 1]);
    prev = cur;
  }
  return prev[y.length];
}
// Somiglianza 0..1 tra due sequenze di parole (2*LCS / somma delle lunghezze).
export const somiglianza = (x, y) => (x.length + y.length) ? 2 * lcs(x, y) / (x.length + y.length) : 1;
