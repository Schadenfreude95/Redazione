# Banco di prova

Serve a misurare se la redazione si avvicina davvero all'autore, invece di sperarlo.

- `casi/`: da 3 a 5 casi. Ognuno è un post già scritto dall'autore, con due sezioni:
  - `## Materiale`: gli appunti, la storia, il messaggio da cui è partito (quello che l'autore avrebbe dato al team)
  - `## Versione dell'autore`: il testo finale, come l'ha pubblicato o scritto lui
- `/banco`: il team riscrive ogni caso dal solo materiale, con le regole e gli esempi di oggi. `scripts/banco.mjs` misura la somiglianza con la versione dell'autore e la registra in `storico.csv`.
- Va lanciato dopo ogni regola approvata e una volta al mese. Se la media sale, il team sta imparando. Se scende, l'ultima modifica ha peggiorato le cose: `/storico` per tornare indietro.

Il banco misura la somiglianza con l'autore, non la qualità del post: un 100% non serve, un trend in salita sì.
