---
name: banco
description: Lancia il banco di prova - il team riscrive i casi in banco/casi dal solo materiale di partenza e uno script misura quanto si avvicina alla versione dell'autore, registrando l'andamento. Usala quando l'utente scrive /banco, dopo ogni regola approvata, una volta al mese, o quando chiede se la redazione sta imparando.
---

1. Elenca i casi in `banco/casi/*.md`. Se sono meno di 3, dillo e proponi quali post usare (servono materiale di partenza e versione finale dell'autore).
2. Sessione = data di oggi (aggiungi `-2`, `-3` se esiste già).
3. Per ogni caso chiama lo `scrittore` dandogli **solo** la sezione `## Materiale` e il formato: non deve vedere la versione dell'autore. Modalità ASSISTITA solo per questo test. Salva in `banco/risultati/<sessione>/<caso>.md`. **Niente copia congelata**: non è una bozza vera.
4. `node scripts/banco.mjs <sessione>`.
5. Riporta in 3 righe: media, confronto con la volta prima, il caso più lontano e cosa lo rende lontano (guardalo tu, una frase).
6. Se la media è scesa dopo una regola appena approvata, dillo chiaramente e proponi `/storico`.
