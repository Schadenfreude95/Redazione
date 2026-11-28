---
name: storico
description: Mostra i backup della redazione (regole, voce, playbook, agenti, configurazione) e permette di tornare a una versione precedente. Usala quando l'utente scrive /storico, chiede cosa è cambiato o vuole annullare una modifica alle regole.
---

1. `node scripts/storico.mjs elenco` e mostra gli ultimi 10 backup con il motivo.
2. Se l'autore vuole tornare indietro: mostra cosa cambierebbe (confronta i file principali del backup con quelli attuali: `regole/playbook.md`, `identita/voce.md`, `regole/regole.md`, `configurazione.md`) e chiedi conferma.
3. Con la conferma: `node scripts/storico.mjs ripristina <id>`. Lo script fa prima un backup dello stato attuale, quindi anche il ripristino si può annullare.
4. Il lavoro (idee, bozze, coda, pubblicati, congelate, statistiche) non fa parte dei backup e non viene toccato.
