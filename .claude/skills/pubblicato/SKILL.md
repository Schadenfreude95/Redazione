---
name: pubblicato
description: Segna un post come pubblicato - lo sposta da coda a pubblicati, lancia il confronto con la copia congelata del team e chiude la task su Notion. Usala quando l'utente scrive /pubblicato o dice che un post è uscito su LinkedIn.
---

1. Individua il post: se in `coda/` ce n'è uno solo, è quello; altrimenti chiedi quale.
2. Chiedi due cose: "L'hai pubblicato identico o hai cambiato qualcosa?" e "Hai seguito la prima ora? (sì / in parte / no)". Se l'ha cambiato, chiedi di incollare il testo pubblicato e salvalo in `bozze/<nome>-finale.md`.
3. Passa al `pubblicatore`, che lancia `node scripts/segna-pubblicato.mjs coda/<file>.md [bozze/<nome>-finale.md] prima-ora:si|in-parte|no` e aggiorna la task su Notion (Stato = Pubblicato, link al post se l'autore lo dà).
4. Riporta il confronto in 3 righe: esito (intatto, ritoccato, riscritto), cosa è cambiato, se tocca un'osservazione già nel playbook ("seconda volta che togli la domanda finale: domenica ti chiederò se farla diventare regola").
5. **Banco di prova:** se il post è partito da materiale in `idee/` e l'autore l'ha ritoccato o riscritto, proponi di aggiungerlo ai casi in `banco/casi/` (sezioni "## Materiale" e "## Versione dell'autore"). Così il banco cresce da solo con i casi più utili. Massimo 8 casi: oltre, sostituisci il più vecchio.
6. Ricorda il primo commento, se la bozza ne prevedeva uno (fonti, link).
