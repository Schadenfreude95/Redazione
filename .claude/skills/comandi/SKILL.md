---
name: comandi
description: Mostra la legenda dei comandi della redazione LinkedIn con una riga di spiegazione ciascuno. Usala quando l'utente scrive /comandi, chiede cosa può fare la redazione, quali comandi esistono o come si usa.
---

Mostra questa legenda così com'è. Poi aggiungi una riga con le skill in `.claude/skills/` che non compaiono in `base/MANIFEST.txt` (create dopo l'installazione), con la loro descrizione.

| Comando | Cosa fa |
|---|---|
| `/comandi` | Questa legenda |
| `/starter` | Installazione guidata (si riprende dal punto in cui ci si è fermati) |
| `/nuovo-post` | Da un'idea o da appunti a una bozza revisionata, pronta per l'APPROVO |
| `APPROVO bozze/<file>.md` | Approvi una bozza (scritto su una riga da sola): va in coda e nasce la task su Notion |
| `/pubblicato` | Il post è uscito: lo segna, lo confronta con la proposta del team, chiude la task |
| `/lunedi` | Il giro del lunedì: numeri, notizie, domande, calendario |
| `/domenica` | La revisione: cosa hai cambiato nei post, playbook, tasso di riscrittura |
| `/proposte` | Le proposte di nuove regole in attesa: approvi o rifiuti |
| `/storico` | Backup e ripristino di regole, voce e configurazione |
| `/aggiorna-sistema` | Installa una nuova versione senza toccare niente di tuo |

Flusso tipico: `/nuovo-post` → correggi la bozza → `APPROVO bozze/<file>.md` → pubblichi → `/pubblicato` → la domenica `/domenica`.
