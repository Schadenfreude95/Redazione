---
name: aggiorna-sistema
description: Installa una nuova versione della redazione dal repository indicato in configurazione, sostituendo solo i file di sistema elencati nel manifest e preservando voce, regole, playbook, post e configurazione. Usala quando l'utente scrive /aggiorna-sistema o chiede se ci sono aggiornamenti.
---

1. Leggi la sorgente in `configurazione.md` (sezione Aggiornamenti) e la versione in `base/VERSION`. Se la sorgente è "nessuna", dillo e fermati.
2. Scarica la nuova versione in una cartella temporanea fuori dalla redazione (`git clone --depth 1 <sorgente>`). Confronta `base/VERSION`: se non è più recente, dillo e fermati.
3. Mostra le novità di `base/CHANGELOG.md` della nuova versione e chiedi conferma.
4. `node scripts/storico.mjs backup "prima dell'aggiornamento a <versione>"`.
5. Sostituisci **solo** i file elencati nel `base/MANIFEST.txt` della nuova versione. Non toccare mai niente che non sia nel manifest: `identita/`, `regole/`, `formati/`, `esempi/`, `configurazione.md`, `memoria/`, il lavoro, e le skill o gli agenti creati dopo l'installazione.
6. **Conflitti:** se un file del manifest era stato modificato in locale (diverso dalla versione installata), mostra le differenze e chiedi se tenere la tua, la nuova o unirle.
7. Lancia `node scripts/check-dipendenze.mjs`. Se la nuova versione porta formati o regole nuove in `base/`, dillo: i tuoi `formati/` non vengono sovrascritti.
8. Annota la nuova versione in `configurazione.md` e riepiloga in 3 righe. Le cartelle temporanee si cancellano.
