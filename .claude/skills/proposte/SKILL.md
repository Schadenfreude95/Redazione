---
name: proposte
description: Mostra le proposte di nuove regole in attesa nel playbook della redazione e registra approvazioni e rifiuti dell'autore. Usala quando l'utente scrive /proposte, chiede quali regole sono in attesa o risponde sì/no a una proposta.
---

1. Leggi "Proposte in attesa di approvazione" in `regole/playbook.md`. Se è vuota, dillo e fermati.
2. Mostrale una alla volta: la regola in una riga, le prove (quali post, cosa è cambiato, prima/dopo), la domanda "sì / no / sì ma così: …".
3. Prima di scrivere: `node scripts/storico.mjs backup "proposte del playbook"`.
4. **Sì** → spostala in "Regole confermate" con la data. **Sì ma così** → scrivila con le parole dell'autore. **No** → cancellala e annota il rifiuto in Storico, così non viene riproposta uguale.
5. Dopo almeno un sì, proponi di lanciare `/banco` per vedere se la nuova regola avvicina davvero il team all'autore.
6. Se una proposta contraddice una regola BLOCCANTE o un principio (`base/principi.md`), dillo prima di chiedere.
