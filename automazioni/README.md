# Automazioni

Due prompt pronti, da programmare come **task programmate** nell'app Claude (desktop, Claude Code) con la cartella della redazione aperta e il connettore Notion attivo. Se preferisci lanciarle a mano, scrivi "lunedì" o "domenica" al caporedattore: fa la stessa cosa.

| File | Quando | Cron (ora italiana) |
|---|---|---|
| `lunedi.md` | lunedì 8:41 | `CRON_TZ=Europe/Rome 41 8 * * 1` |
| `domenica-revisione.md` | domenica 18:13 | `CRON_TZ=Europe/Rome 13 18 * * 0` |

Le task programmate non possono chiedere niente mentre girano: tutto quello che serve una decisione dell'autore finisce nel report, come domanda, e aspetta la sua risposta.
