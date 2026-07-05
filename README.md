# ✦ Le Grand Grimoire ✦

**Le quizz Harry Potter ultime — canon strict des sept livres, rien d'autre.**

Une application web complète, sans aucune dépendance : ouvre `index.html`
dans un navigateur et c'est parti. Aucune installation, aucun serveur,
aucune connexion requise. Fonctionne sur mobile.

## 🎮 Les modes de jeu

| Mode | Principe |
|---|---|
| 🌠 **L'Ascension** | Le mode principal : 15 questions, de la Première Année au Département des Mystères, 3 vies. |
| 🌙 **Le Défi du Jour** | 5 questions tirées par la date — les mêmes pour tout le monde, une seule tentative par jour. |
| ⏳ **Contre-la-Montre** | 90 secondes, un maximum de bonnes réponses, la difficulté grimpe. |
| 💀 **Mort Subite** | Une erreur = fin de partie. Les points s'envolent avec les paliers. |
| 💭 **La Pensine** | Replonge dans chaque tome, un souvenir à la fois. 8 questions par livre ; restaure le souvenir en argent (6/8) ou grave-le en Vif d'or (8/8). Les sept médailles se conservent. |
| 🐉 **Le Coffre de Gringotts** | Quitte ou double : chaque bonne réponse **double** ton butin. Encaisse quand tu veux… mais une seule erreur et le dragon garde tout. |
| 📚 **La Bibliothèque** | Révisions libres par niveau, sans enjeu, avec les sources. |

Et une section à part, **🕯️ La Réserve** (la section interdite) : 16 fiches
de *lore étendu* vérifiées et sourcées (Pottermore, interviews de J.K.
Rowling) et 12 *théories de fans* réelles et célèbres, chacune avec son
origine et son statut (saluée par J.K.R. / démentie / jamais tranchée).
C'est le seul endroit de l'appli qui sort du canon des romans — et c'est
assumé.

## ⚡ La progression

- **Points & multiplicateur de série** : enchaîne les bonnes réponses (jusqu'à ×2).
- **7 rangs**, d'« Élève de Première Année » à « Maîtresse du Lore — niveau J.K.R. ».
- **10 quêtes** à accomplir (sans-faute, records, assiduité…), avec points bonus.
- 🏆 **La Coupe des Quatre Maisons** : tes points font vivre ta maison face aux
  trois autres, qui marquent semaine après semaine. La Répartition a lieu au
  premier lancement (le Choixpeau peut décider pour toi).

## 📖 Les questions : 5 niveaux de difficulté

**489 questions**, de « Dans quelle rue habitent les Dursley ? » jusqu'à
« Depuis quand la famille Ollivander fabrique-t-elle des baguettes ? »
(382 av. J.-C., évidemment). Les sept tomes sont couverts, du placard sous
l'escalier jusqu'à l'épilogue.

**Chaque question cite sa source — tome et chapitre — affichée après chaque
réponse.** Le périmètre est le canon strict des 7 romans, dans la traduction
française de Jean-François Ménard : ni films, ni Pottermore, ni *Enfant
maudit*. Le protocole complet de sourcing est décrit dans
[SOURCES.md](SOURCES.md) — et la règle d'or est simple : *le quizz n'a
jamais raison contre le livre.*

## 🛠️ Technique

- HTML / CSS / JavaScript vanilla, un seul écran de ~4 fichiers.
- Sauvegarde locale (`localStorage`) : profil, records, quêtes, Coupe.
- Défi du Jour déterministe (généré à partir de la date).
- Effets sonores en WebAudio (désactivables), ciel étoilé et bougies en CSS pur.

## ➕ Ajouter des questions

Ouvre `js/questions.js` et ajoute une entrée :

```js
{ t: 3,                                // difficulté 1..5
  q: "Ta question ?",
  c: ["Bonne réponse", "Leurre", "Leurre", "Leurre"],  // la bonne TOUJOURS en premier
  src: "Tome X, chap. Y",              // OBLIGATOIRE
  note: "Anecdote optionnelle." }
```

Les choix sont mélangés automatiquement à l'affichage.
