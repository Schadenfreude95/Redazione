# Inizia qui — la tua redazione in 5 passi (circa un'ora)

## Cosa ti serve
- **Claude Code** (abbonamento Claude Pro/Max oppure API key): https://claude.com/claude-code
- **Node.js** installato sul pc: serve al blocco APPROVO. https://nodejs.org
- Il tuo profilo LinkedIn. Nient'altro: niente API, niente abbonamenti.

## Passo 1 · Apri la redazione
Scompatta la cartella, apri un terminale dentro, lancia `claude`. Scrivi: **"ciao, primo avvio"**.

## Passo 2 · I tuoi numeri
Su LinkedIn: profilo → Analisi → Impressioni dei post → **Esporta** (scegli il periodo più lungo).
Metti il file in `statistiche/`. L'`analista` lo legge e ti dice cosa funziona.

## Passo 3 · I tuoi testi
- Incolla in `esempi/archivio-post.md` più post possibile (20+). I numeri li ha già l'analista.
- Incolla in `esempi/commenti.md` 10–20 commenti tuoi scritti di getto.
- **È la parte che conta di più.** Senza i tuoi testi, il team scrive come chiunque.

## Passo 4 · Chi sei e per chi scrivi
Chiedi al caporedattore: **"compila voce e cliente ideale"**. Lui ricava tutto dai tuoi testi e dall'export, poi ti fa le domande che mancano:
- cosa vuoi ottenere con LinkedIn,
- cosa conta come post riuscito,
- se vendi nei post o no,
- le regole tue che non si discutono.
Correggi tutto quello che non ti somiglia. Ogni volta che una bozza ti fa schifo, scrivi il perché in `identita/voce.md` → "Errori del team da non ripetere".

## Passo 5 · Il primo lunedì
Scrivi **"lunedì"**. Il team ti chiede i numeri del profilo, cerca le notizie, ti fa 3 domande per tirare fuori le storie e prepara il calendario.

## Come funziona l'approvazione
1. Le bozze finiscono in `bozze/`.
2. Le rileggi, le cambi, le riscrivi.
3. Scrivi, su una riga da sola: `APPROVO bozze/nome-file.md`
4. Il pubblicatore la mette in `coda/`. Tu la pubblichi.

Se cambi la bozza dopo l'APPROVO, l'approvazione decade. Gli hook bloccano ogni scrittura in `coda/` senza APPROVO e ogni strumento esterno che pubblica o invia. Commenti e DM li mandi sempre tu.

## Modalità
In `CLAUDE.md`:
- **ASSISTITA** (predefinita): il team propone idee, ganci e prime stesure.
- **PURISTA**: il team fa domande, verifica e pianifica, ma non scrive mai frasi al posto tuo.

## Un consiglio da chi l'ha già usata
Il team è bravissimo a leggere i numeri, trovare le regole e tenere il calendario. A scrivere come te, meno. Usalo per quello che sa fare. La penna tienila tu.
