// Utilità condivise: estrae il testo del post da un file bozza (senza intestazione e marcatori del team).
export function testoPost(raw) {
  let s = raw.replace(/\r/g, '');
  if (s.startsWith('---\n')) { const end = s.indexOf('\n---', 4); if (end !== -1) s = s.slice(s.indexOf('\n', end + 1) + 1); }
  return s.split('\n')
    .filter(l => !/^(PRIMA STESURA|BOZZA v?\d|BOZZA —|BOZZA v)/i.test(l.trim()))
    .join('\n').replace(/^\s+|\s+$/g, '');
}
