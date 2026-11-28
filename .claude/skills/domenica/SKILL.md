---
name: domenica
description: La revisione della domenica - chiude le task di pubblicazione, legge i confronti tra proposte del team e post pubblicati, aggiorna il playbook e prepara il report con il tasso di riscrittura e le proposte da approvare. Usala quando l'utente scrive /domenica o "domenica", e dalla task programmata della domenica.
---

Segui `automazioni/domenica-revisione.md`. L'`analista` lavora con tutti i segnali: confronti, coppie da spiegare, versioni intermedie, messaggi dell'autore, scelte tra varianti, previsioni. Una proposta di regola va sempre verificata su tutte le coppie ("coerente con N su M"). In più:
- Prima di modificare `regole/playbook.md`: `node scripts/storico.mjs backup "revisione della domenica"`.
- Se gira come task programmata: non fare domande e non promuovere niente a regola. Le proposte restano "in attesa" e finiscono nel report.
- Se nella settimana è stata approvata almeno una regola, lancia `/banco` e metti il risultato nel report.
- Se l'autore è presente: dopo il report, per ogni proposta in attesa chiedi "la facciamo diventare regola? sì/no" e applica la risposta come fa `/proposte`.
