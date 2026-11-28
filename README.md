# Redazione
La redazione per Linkedin fatta a sfregio perchè qualcuno ci faceva lead magnet e non volevo.

## La redazione, quella regalata davvero

14 agenti AI e un caporedattore per gestire il tuo LinkedIn con **Claude Code**. Gratis, davvero: niente form, niente email.

Analizzano i tuoi numeri, trovano le regole che funzionano per te, ti fanno le domande giuste per tirare fuori le storie, tengono il calendario e controllano le bozze.
**Non pubblicano niente senza che tu scriva APPROVO.** E imparano da te in cinque modi:
- ogni proposta viene confrontata con quello che pubblichi davvero, e diventa un esempio "prima/dopo" con il perché;
- scrivono partendo dai tuoi post, non da una descrizione della tua voce;
- ti fanno scegliere tra varianti, e si ricordano cosa scegli;
- una correzione ricorrente diventa regola solo se regge su tutti i post e se dici sì;
- un banco di prova misura se si stanno davvero avvicinando a te.

Funziona per **uso personale** o per **un team** che pubblica con la stessa voce e angoli diversi: lo scegli al primo avvio.

→ **Parti da [INIZIA-QUI.md](INIZIA-QUI.md)**: apri la cartella con Claude Code e scrivi `/starter`.

Comandi: `/starter` · `/nuovo-post` · `APPROVO` · `/prima-ora` · `/pubblicato` · `/banco` · `/lunedi` · `/domenica` · `/proposte` · `/storico` · `/aggiorna-sistema` · `/comandi`

## La redazione
| Reparto | Chi |
|---|---|
| Scrittura | ganci · scrittore · editor · verificatore |
| Ricerca | ricerca-trend · analista-virali · intervistatore |
| Identità | custode-voce · cliente-ideale |
| Piano | archivio-idee · calendario |
| Pubblicazione e community | pubblicatore · community |
| Analytics | analista |

## La cartella
```
CLAUDE.md                 il caporedattore
INIZIA-QUI.md             come si parte (/starter)
base/                     principi, gerarchia, regole comuni e di team, modelli, versione, manifest
.claude/agents/           i 14 agenti
.claude/hooks/            il blocco APPROVO
.claude/settings.json     permessi e hook
identita/                 voce, cliente ideale, persone del team (da compilare)
regole/                   regole di partenza + quelle dai tuoi numeri
formati/                  5 formati di post
esempi/                   i tuoi post e i tuoi commenti (da compilare)
statistiche/              export LinkedIn e numeri settimanali
profilo/                  checklist del profilo
idee/ bozze/ coda/ pubblicati/
scripts/                  metti-in-coda, segna-pubblicato, confronta, storico, check-dipendenze
.claude/skills/           i comandi (/starter, /nuovo-post, /pubblicato…)
memoria/                  progressi dello Starter, errori delle automazioni
congelate/                prime proposte del team, intoccabili
automazioni/              prompt del lunedì e della domenica
configurazione.md         uso personale o team, task su Notion
```

## Aggiornamenti
`/aggiorna-sistema` installa la nuova versione sostituendo solo i file di sistema (`base/MANIFEST.txt`). Voce, regole, playbook, post e configurazione restano tuoi.

## Requisiti
Claude Code e Node.js. Nessuna API di LinkedIn: i numeri arrivano dall'export che fai dal tuo profilo.

Creata da Shasa Damiano Bettini. Prendila, cambiala, migliorala.
