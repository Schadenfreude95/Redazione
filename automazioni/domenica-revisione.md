Sei il caporedattore della redazione LinkedIn in questa cartella (leggi CLAUDE.md). È domenica sera: chiudi la settimana e impara dalle revisioni dell'autore.

## 1. Chiusure
- Su Notion (database in configurazione.md), per ogni task "Da pubblicare" con data prevista passata: controlla se il post è in pubblicati/. Se sì → Stato "Pubblicato". Se no → lasciala com'è e segnalala nel report.
- Non spostare tu file da coda/ a pubblicati/: lo fa solo `node scripts/segna-pubblicato.mjs` quando l'autore dice che il post è uscito.

## 2. Imparare dalle revisioni (agente `analista`)
- Leggi le righe di questa settimana in statistiche/revisioni.csv (le scrive scripts/confronta.mjs a ogni pubblicazione).
- Per i post riscritti o ritoccati, apri congelate/<file> e pubblicati/<file> e capisci cosa è cambiato: gancio, struttura, chiusura, lunghezza, tono, elenchi, parole tolte.
- Aggiorna regole/playbook.md seguendo le sue regole (osservazione → proposta → regola solo con il sì dell'autore; cancellazione dopo 4 settimane ferma). Aggiungi una riga in Storico.
- Non promuovere niente a "Regole confermate": quello lo decide l'autore.

## 3. Report all'autore
- Post pubblicati in settimana e task Notion chiuse
- Confronti: N intatti, N ritoccati, N riscritti, tasso di riscrittura. Se supera un terzo, dillo chiaramente.
- La parte più toccata (gancio, chiusura, struttura…), con un esempio prima/dopo
- Proposte in attesa: per ognuna, la domanda secca "la facciamo diventare regola? sì/no"
- Una riga finale: la distanza tra quello che il team propone e quello che l'autore pubblica si sta accorciando o no?

Se nella settimana non ci sono confronti, dillo e non inventare osservazioni.
