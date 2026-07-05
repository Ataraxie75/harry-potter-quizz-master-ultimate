# 📖 Le Protocole du Grimoire — comment les questions sont sourcées

C'est LA question clé, alors voici le contrat, noir sur parchemin.

## 1. Le périmètre : les sept romans, rien d'autre

Le canon admis dans ce quizz est **exclusivement** :

1. *Harry Potter à l'école des sorciers* (1997)
2. *Harry Potter et la Chambre des Secrets* (1998)
3. *Harry Potter et le Prisonnier d'Azkaban* (1999)
4. *Harry Potter et la Coupe de Feu* (2000)
5. *Harry Potter et l'Ordre du Phénix* (2003)
6. *Harry Potter et le Prince de Sang-Mêlé* (2005)
7. *Harry Potter et les Reliques de la Mort* (2007)

Sont **exclus** — même quand c'est tentant :

- ❌ Les 8 films (et leurs libertés : non, ce n'est PAS Neville qui donne la
  Branchiflore — c'est Dobby, Tome 4, chap. 26 ; le quizz en fait même un piège)
- ❌ Pottermore / Wizarding World et les écrits en ligne de J.K. Rowling
- ❌ *L'Enfant maudit* (pièce de théâtre)
- ❌ Les *Animaux fantastiques* (films) et les livres-compagnons hors récit
- ❌ Les jeux vidéo, LEGO, interviews, tweets

Quand une question frôle une zone film/livre divergente, elle le précise
explicitement (« dans le LIVRE »).

## 2. Une citation par question, sans exception

Chaque entrée de `js/questions.js` porte un champ `src` :

```js
{ t:5, q:"Combien y a-t-il d'escaliers à Poudlard ?",
  c:["142", ...],
  src:"Tome 1, chap. 8",
  note:"« Il y avait cent quarante-deux escaliers, à Poudlard… »" }
```

- **`src`** = tome + chapitre où le fait est établi. Quand un fait est
  disséminé (ex. la révolte des gobelins de 1612), seul le tome est cité.
- **`note`** = contexte ou citation, affichée après chaque réponse : on ne
  répond jamais sans repartir avec la référence. Le quizz est aussi une
  machine à relire les livres.

## 3. Noms et terminologie : la traduction Ménard

Les questions utilisent la traduction française de Jean-François Ménard
(Gallimard) : Rogue, Poudlard, Choixpeau, Queudver, Tom **Elvis** Jedusor
(l'anagramme française de « Je suis Voldemort »), le Magyar à pointes,
B.U.S.E. et A.S.P.I.C., etc. Là où la VF a créé un nom (Elvis Marvolo Gaunt,
Stan Rocade, le Nougat Néansang), c'est la VF qui fait foi.

## 4. La règle de prudence

Un fait n'entre dans le Grimoire que s'il est **explicitement établi dans le
texte des romans**. Les déductions, les à-peu-près et les souvenirs de films
sont refusés à l'entrée, comme un élève sans mot de passe devant la Grosse
Dame. En cas de doute sur un détail, la question est reformulée pour ne
porter que sur la partie certaine — ou supprimée.

## 4 bis. La passe de vérification web

Depuis la deuxième fournée, tout fait « sensible » (chiffre exact, score,
date, nom propre rare, forme VF d'un nom traduit, mot de passe) passe par
une **vérification croisée en ligne** avant d'entrer dans le Grimoire :
HP-Lexicon (le plus rigoureux sur le texte des romans), l'Encyclopédie HP
(encyclopedie-hp.org), le wiki Harry Potter francophone et le Muggles'
Guide (Wikibooks). Un fait invérifiable est reformulé sur sa seule partie
certaine — ou jeté. Les pièges d'édition connus (l'ordre Lily/James du
Priori Incantatem, corrigé après les premiers tirages ; le nombre de
B.U.S.E. d'Hermione, variable selon les éditions) sont soit signalés dans
la question, soit écartés.

## 4 ter. L'exception assumée : la Réserve

La section « 🕯️ La Réserve » est le SEUL endroit de l'application qui
quitte le canon strict des romans — c'est écrit dessus. Ses deux rayons :

- **Les Grimoires du lore étendu** : faits vérifiés et sourcés issus de
  Pottermore / Wizarding World et d'interviews publiques de J.K. Rowling
  (chaque fiche cite sa source).
- **Les Manuscrits interdits** : théories de fans célèbres et RÉELLES,
  collectées sur Reddit, Tumblr et les forums, avec leur origine et leur
  statut (saluée par J.K.R. / démentie / jamais tranchée). Elles ne sont
  jamais présentées comme des faits.

Aucune entrée de la Réserve ne sert de question de quizz : les points ne
se gagnent que sur le canon des romans.

## 5. Vérifiabilité et contestation

La citation affichée après chaque réponse rend toute question **contestable
livre en main** : si la Grande Fan trouve une erreur en relisant le passage
cité, la question est corrigée ou retirée (et elle gagne le droit de se
vanter à vie). C'est le contrat : *le quizz n'a jamais raison contre le
livre.*

## 6. L'échelle de difficulté

| Niveau | Nom | Type de fait |
|---|---|---|
| 1 | 🕯️ Première Année | Les grands repères de l'intrigue |
| 2 | 🦉 B.U.S.E. | Ce qu'un bon lecteur retient |
| 3 | ⚗️ A.S.P.I.C. | Détails précis, pièges films/livres |
| 4 | 🏅 Ordre de Merlin | Noms secondaires, scores, devises, chiffres |
| 5 | 🔮 Département des Mystères | Numéros de coffres, mots de passe oubliés, fabricants de baguettes… le territoire où même J.K.R. consulterait ses notes |
