# 🏋️ Mon Coach — Sport & Nutrition

Application web personnelle de coaching sportif : **journal
d'entraînement** + **suivi nutritionnel basé sur tes besoins caloriques**,
le tout **100 % hors-ligne** et privé.

Aucune dépendance, aucun serveur, aucun compte. Ouvre `index.html` dans un
navigateur (ou installe-la sur ton téléphone) et c'est parti. **Toutes tes
données restent sur ton appareil** (`localStorage`).

## Ce que fait l'appli

### 🎯 Profil & besoins caloriques
Tu saisis ton sexe, âge, poids, taille, niveau d'activité et ton objectif
(perte de gras → prise de masse). L'appli calcule automatiquement :

- ton **métabolisme de base** (formule de Mifflin-St Jeor),
- ta **dépense énergétique quotidienne** (TDEE = métabolisme × activité),
- ta **cible calorique** selon l'objectif,
- ta **répartition de macros** (protéines / glucides / lipides), réglable
  (g de protéines par kg, % de lipides).

Tu déclares aussi tes **contraintes alimentaires** (végétarien, sans gluten,
sans lactose, halal, allergies…) : elles sont rappelées quand tu ajoutes un
repas.

### 🍽️ Nutrition
Journal alimentaire jour par jour, réparti par repas
(petit-déj / déjeuner / dîner / collation). Pour chaque aliment tu saisis
calories et macros — et si tu ne connais que les macros, les calories sont
déduites automatiquement. Barres de progression en temps réel vs tes
objectifs, calories restantes du jour, navigation entre les jours.

### 🏋️ Entraînement
- **Bibliothèque d'exercices** : crée tes exercices, classés par groupe
  musculaire, avec des notes (prise, tempo…).
- **Séances types** : assemble des modèles de séance (séries × reps × poids
  cibles) à réutiliser.
- **Journal / séance en direct** : démarre une séance, saisis tes séries
  (reps + poids) au fur et à mesure, ajoute des exercices à la volée,
  note ton ressenti, puis enregistre.
- **Progression** : par exercice, courbe du poids max par séance, record,
  et évolution depuis le début.

### 📊 Tableau de bord
Résumé du jour : calories consommées / restantes, macros, état de la séance
du jour et rappel de tes contraintes.

## 📱 Installation (PWA)

Sur téléphone, ouvre l'adresse puis **« Ajouter à l'écran d'accueil »** :
l'appli s'installe avec son icône, se lance en plein écran et **fonctionne
hors-ligne** (service worker).

## 💾 Sauvegarde

Dans **Profil → Données**, tu peux **exporter** une sauvegarde JSON (à
garder au cas où tu changes de téléphone) et la **réimporter**.

## 🛠️ Technique

- HTML / CSS / JavaScript vanilla, zéro dépendance.
- Stockage local (`localStorage`).
- PWA : `manifest.webmanifest` + service worker (`sw.js`).
- Calculs nutritionnels : Mifflin-St Jeor + facteurs d'activité standards.

> ⚠️ Outil de suivi personnel, pas un avis médical. Pour un objectif de santé
> précis, demande conseil à un professionnel.
