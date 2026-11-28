---
name: domenica
description: La revisione della domenica - chiude le task di pubblicazione, legge i confronti tra proposte del team e post pubblicati, aggiorna il playbook e prepara il report con il tasso di riscrittura e le proposte da approvare. Usala quando l'utente scrive /domenica o "domenica", e dalla task programmata della domenica.
---

Segui `automazioni/domenica-revisione.md`. In più:
- Prima di modificare `regole/playbook.md`: `node scripts/storico.mjs backup "revisione della domenica"`.
- Se gira come task programmata: non fare domande e non promuovere niente a regola. Le proposte restano "in attesa" e finiscono nel report.
- Se l'autore è presente: dopo il report, per ogni proposta in attesa chiedi "la facciamo diventare regola? sì/no" e applica la risposta come fa `/proposte`.
