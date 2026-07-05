/* ============================================================
   LE GRIMOIRE DES QUESTIONS
   ------------------------------------------------------------
   Canon STRICT des 7 romans (traduction française de
   Jean-François Ménard, Gallimard). Aucun film, aucun jeu,
   aucun Pottermore, aucun "Enfant maudit".

   Chaque question porte sa source : tome + chapitre.
   t : difficulté 1..5
       1 = Première Année      (échauffement)
       2 = B.U.S.E.            (bon lecteur)
       3 = A.S.P.I.C.          (lecteur assidu)
       4 = Ordre de Merlin     (relectures multiples)
       5 = Département des Mystères (quasi impossible)
   q : question
   c : 4 choix — LA BONNE RÉPONSE EST TOUJOURS c[0]
       (les choix sont mélangés à l'affichage)
   src : citation livre
   note : anecdote optionnelle affichée après la réponse
   ============================================================ */

const TIERS = [
  null,
  { name: "Première Année", icon: "🕯️", pts: 10 },
  { name: "B.U.S.E.", icon: "🦉", pts: 20 },
  { name: "A.S.P.I.C.", icon: "⚗️", pts: 35 },
  { name: "Ordre de Merlin", icon: "🏅", pts: 55 },
  { name: "Département des Mystères", icon: "🔮", pts: 90 },
];

const QUESTIONS = [

  /* ---------- NIVEAU 1 — PREMIÈRE ANNÉE ---------- */

  { t:1, q:"Dans quelle rue habitent les Dursley ?",
    c:["Privet Drive","Magnolia Crescent","L'allée des Embrumes","Godric's Hollow"],
    src:"Tome 1, chap. 1", note:"Au numéro 4, très exactement." },

  { t:1, q:"Quel animal est Hedwige ?",
    c:["Une chouette harfang","Un hibou grand-duc","Un chat","Un rat"],
    src:"Tome 1, chap. 5", note:"Offerte par Hagrid pour les 11 ans de Harry." },

  { t:1, q:"De quelle voie part le Poudlard Express ?",
    c:["Voie 9 ¾","Voie 7 ½","Voie 13","Voie 6 ¼"],
    src:"Tome 1, chap. 6" },

  { t:1, q:"Dans quelle maison le Choixpeau hésite-t-il à envoyer Harry ?",
    c:["Serpentard","Serdaigle","Poufsouffle","Aucune, il choisit tout de suite"],
    src:"Tome 1, chap. 7", note:"« Tu pourrais devenir quelqu'un, ça se voit dans ta tête… »" },

  { t:1, q:"Quel poste Harry occupe-t-il dans l'équipe de Quidditch de Gryffondor ?",
    c:["Attrapeur","Gardien","Poursuiveur","Batteur"],
    src:"Tome 1, chap. 9", note:"Le plus jeune attrapeur depuis un siècle." },

  { t:1, q:"Comment s'appelle le chien à trois têtes qui garde la trappe du deuxième étage ?",
    c:["Touffu","Crockdur","Norbert","Sniffle"],
    src:"Tome 1, chap. 11", note:"Pour l'endormir : un peu de musique." },

  { t:1, q:"Combien de points rapporte la capture du Vif d'or ?",
    c:["150 points","100 points","50 points","200 points"],
    src:"Tome 1, chap. 10" },

  { t:1, q:"Comment s'appelle la chatte de Rusard ?",
    c:["Miss Teigne","Pattenrond","Minerva","Mistigri"],
    src:"Tome 1, chap. 8" },

  { t:1, q:"Que reçoit Harry, anonymement, à son premier Noël à Poudlard ?",
    c:["La cape d'invisibilité de son père","Un Nimbus 2000","La carte du Maraudeur","Un Retourneur de Temps"],
    src:"Tome 1, chap. 12", note:"« Ton père m'a laissé ceci avant de mourir… »" },

  { t:1, q:"Qui se sacrifie sur l'échiquier géant pour laisser passer Harry ?",
    c:["Ron","Hermione","Neville","Personne"],
    src:"Tome 1, chap. 16" },

  { t:1, q:"Que devient Norbert, le dragon de Hagrid ?",
    c:["Il part en Roumanie avec les amis de Charlie","Il est relâché dans la Forêt interdite","Le Ministère le confisque","Il reste caché dans la cabane"],
    src:"Tome 1, chap. 14" },

  { t:1, q:"Comment s'appelle l'elfe de maison qui vient prévenir Harry de ne pas retourner à Poudlard ?",
    c:["Dobby","Kreattur","Winky","Pompom"],
    src:"Tome 2, chap. 2" },

  { t:1, q:"Comment Harry et Ron rejoignent-ils Poudlard en deuxième année ?",
    c:["En Ford Anglia volante","En Magicobus","Par la poudre de Cheminette","À dos de Sombral"],
    src:"Tome 2, chap. 5", note:"Atterrissage dans le Saule cogneur…" },

  { t:1, q:"Quelle créature terrifiante vit dans la Chambre des Secrets ?",
    c:["Un Basilic","Une Acromantule","Un Magyar à pointes","Un Détraqueur"],
    src:"Tome 2, chap. 16" },

  { t:1, q:"Comment s'appelle le phénix d'Albus Dumbledore ?",
    c:["Fumseck","Hedwige","Errol","Fauve"],
    src:"Tome 2, chap. 12" },

  { t:1, q:"Quel objet libère Dobby de la famille Malefoy ?",
    c:["Une chaussette","Un gant","Une écharpe","Un bonnet"],
    src:"Tome 2, chap. 18", note:"Glissée par Harry dans le journal que tenait Lucius." },

  { t:1, q:"Quel bus à trois étages recueille Harry après sa fugue de Privet Drive ?",
    c:["Le Magicobus","Le Poudlard Express","Le Chevalier de la Nuit","Le Bus des Sorciers"],
    src:"Tome 3, chap. 3" },

  { t:1, q:"Qui est le parrain de Harry ?",
    c:["Sirius Black","Remus Lupin","Albus Dumbledore","Arthur Weasley"],
    src:"Tome 3, chap. 10" },

  { t:1, q:"Quel remède le professeur Lupin donne-t-il après une attaque de Détraqueur ?",
    c:["Du chocolat","Une potion Revigorante","Du jus de citrouille","De la Bièraubeurre"],
    src:"Tome 3, chap. 5" },

  { t:1, q:"Quel est le principal journal du monde des sorciers ?",
    c:["La Gazette du sorcier","Le Chicaneur","Sorcière-Hebdo","Le Cri de la Chouette"],
    src:"Tome 1, chap. 5" },

  /* ---------- NIVEAU 2 — B.U.S.E. ---------- */

  { t:2, q:"Quel est le vrai nom complet de Lord Voldemort ?",
    c:["Tom Elvis Jedusor","Tom Marvin Jedusor","Elvis Tom Gaunt","Tom Salazar Jedusor"],
    src:"Tome 2, chap. 17", note:"Anagramme de « Je suis Voldemort »." },

  { t:2, q:"Quelle potion permet de prendre l'apparence d'une autre personne ?",
    c:["Le Polynectar","Le Felix Felicis","L'Amortentia","Le Veritaserum"],
    src:"Tome 2, chap. 10", note:"Préparée en cachette dans les toilettes de Mimi Geignarde." },

  { t:2, q:"Quelle forme prend l'épouvantard face au professeur Lupin ?",
    c:["La pleine lune","Un loup-garou","Un Détraqueur","Rogue"],
    src:"Tome 3, chap. 7", note:"Une sphère argentée que Harry prend d'abord pour une boule de cristal." },

  { t:2, q:"En quel animal le professeur McGonagall se transforme-t-elle ?",
    c:["Un chat tigré","Un hibou","Une chouette","Un corbeau"],
    src:"Tome 1, chap. 1", note:"Reconnaissable aux marques autour des yeux, comme ses lunettes." },

  { t:2, q:"Quels sont les trois Sortilèges Impardonnables ?",
    c:["Imperium, Doloris, Avada Kedavra","Imperium, Sectumsempra, Avada Kedavra","Doloris, Morsmordre, Avada Kedavra","Imperium, Doloris, Feudeymon"],
    src:"Tome 4, chap. 14", note:"Démonstration du faux Maugrey sur des araignées." },

  { t:2, q:"Quel dragon Harry affronte-t-il lors de la première tâche du Tournoi ?",
    c:["Le Magyar à pointes","Le Boutefeu chinois","Le Vert gallois","Le Suédois à museau court"],
    src:"Tome 4, chap. 20" },

  { t:2, q:"Qui a mis le nom de Harry dans la Coupe de Feu ?",
    c:["Barty Croupton Jr","Igor Karkaroff","Ludo Verpey","Peter Pettigrow"],
    src:"Tome 4, chap. 35", note:"Caché toute l'année sous l'apparence de Maugrey Fol Œil." },

  { t:2, q:"Quelle est la forme du Patronus de Severus Rogue ?",
    c:["Une biche","Un cerf","Un serpent","Une chauve-souris"],
    src:"Tome 7, chap. 33", note:"« Après tout ce temps ? — Toujours. »" },

  { t:2, q:"Qui tue Nagini ?",
    c:["Neville Londubat","Harry Potter","Ron Weasley","Molly Weasley"],
    src:"Tome 7, chap. 36", note:"D'un coup d'épée de Gryffondor tirée du Choixpeau en flammes." },

  { t:2, q:"Quel objet permet à Hermione de suivre plusieurs cours en même temps en troisième année ?",
    c:["Un Retourneur de Temps","Une Pensine","Un Portoloin","Un Déluminateur"],
    src:"Tome 3, chap. 21", note:"Prêté par le professeur McGonagall avec l'accord du Ministère." },

  { t:2, q:"Quelle est l'adresse du quartier général de l'Ordre du Phénix ?",
    c:["12, square Grimmaurd","93, Chemin de Traverse","4, Privet Drive","Les Trois Balais"],
    src:"Tome 5, chap. 4" },

  { t:2, q:"Comment s'appelle le frère d'Albus Dumbledore ?",
    c:["Abelforth","Aberdeen","Perceval","Elphias"],
    src:"Tome 5, chap. 5", note:"Barman de la Tête de Sanglier, à Pré-au-Lard." },

  { t:2, q:"Comment s'appelait la sœur d'Albus Dumbledore ?",
    c:["Ariana","Kendra","Bathilda","Ondine"],
    src:"Tome 7, chap. 28" },

  { t:2, q:"Quelle matière enseigne le professeur Chourave ?",
    c:["La botanique","Les potions","La métamorphose","Les soins aux créatures magiques"],
    src:"Tome 1, chap. 8" },

  { t:2, q:"Quel loup-garou a mordu Remus Lupin lorsqu'il était enfant ?",
    c:["Fenrir Greyback","Un loup inconnu","Antonin Dolohov","Rodolphus Lestrange"],
    src:"Tome 6, chap. 16" },

  { t:2, q:"Combien d'usages du sang de dragon Dumbledore a-t-il découverts ?",
    c:["Douze","Sept","Dix","Treize"],
    src:"Tome 1, chap. 6", note:"C'est écrit sur sa carte de Chocogrenouille." },

  { t:2, q:"Quelle est la forme du Patronus d'Hermione ?",
    c:["Une loutre","Un chat","Un écureuil","Un cygne"],
    src:"Tome 5, chap. 27" },

  { t:2, q:"Quels sont les surnoms des quatre Maraudeurs ?",
    c:["Lunard, Queudver, Patmol et Cornedrue","Lunard, Croûtard, Patmol et Cornedrue","Lunard, Queudver, Sniffle et Cornedrue","Fumseck, Queudver, Patmol et Cornedrue"],
    src:"Tome 3, chap. 18" },

  { t:2, q:"Quelle phrase efface la carte du Maraudeur ?",
    c:["« Méfait accompli »","« Je jure solennellement que mes intentions sont mauvaises »","« Finite Incantatem »","« Mischief managed »"],
    src:"Tome 3, chap. 11" },

  { t:2, q:"Quelle phrase Ombrage force-t-elle Harry à graver dans sa propre main ?",
    c:["« Je ne dois pas dire de mensonges »","« Je ne dois pas désobéir »","« Je dois respecter le Ministère »","« Je ne suis pas au-dessus des règles »"],
    src:"Tome 5, chap. 13" },

  { t:2, q:"Dans quelle salle secrète l'armée de Dumbledore s'entraîne-t-elle ?",
    c:["La Salle sur Demande","La Chambre des Secrets","La salle de bains des préfets","La cabane hurlante"],
    src:"Tome 5, chap. 18" },

  { t:2, q:"Combien d'années séparent la bataille de Poudlard de l'épilogue du tome 7 ?",
    c:["Dix-neuf ans","Vingt ans","Quinze ans","Vingt-cinq ans"],
    src:"Tome 7, épilogue", note:"« Dix-neuf ans plus tard »." },

  /* ---------- NIVEAU 3 — A.S.P.I.C. ---------- */

  { t:3, q:"Quel est le numéro du coffre de Gringotts qui contenait la Pierre philosophale ?",
    c:["713","617","394","731"],
    src:"Tome 1, chap. 5", note:"Vidé par Hagrid le jour même de la visite avec Harry." },

  { t:3, q:"En quel animal Rita Skeeter se transforme-t-elle illégalement ?",
    c:["Un scarabée","Une mouche","Un papillon","Une pie"],
    src:"Tome 4, chap. 37", note:"Hermione l'a gardée un moment dans un bocal." },

  { t:3, q:"Qui était le véritable Gardien du Secret des Potter ?",
    c:["Peter Pettigrow","Sirius Black","Remus Lupin","Albus Dumbledore"],
    src:"Tome 3, chap. 19", note:"Le changement de dernière minute qui a tout scellé." },

  { t:3, q:"Que fabrique l'entreprise Grunnings, où travaille Vernon Dursley ?",
    c:["Des perceuses","Des tondeuses","Des voitures","Des assurances"],
    src:"Tome 1, chap. 1" },

  { t:3, q:"Comment s'appelait la mère de Voldemort ?",
    c:["Merope Gaunt","Ariana Gaunt","Eileen Prince","Bathilda Gaunt"],
    src:"Tome 6, chap. 10", note:"Vue dans la Pensine, dans la masure des Gaunt." },

  { t:3, q:"Comment se nomment les trois frères du « Conte des trois frères » ?",
    c:["Antioch, Cadmus et Ignotus Peverell","Antioch, Cadmus et Ignotus Gaunt","Albus, Abelforth et Ariana Peverell","Godric, Salazar et Ignotus Peverell"],
    src:"Tome 7, chap. 21" },

  { t:3, q:"Quelle est la forme du Patronus de Kingsley Shacklebolt ?",
    c:["Un lynx","Un lion","Une panthère","Un aigle"],
    src:"Tome 7, chap. 8", note:"Il interrompt le mariage de Bill et Fleur : « Le Ministère est tombé. »" },

  { t:3, q:"Quel est le nom complet d'Albus Dumbledore ?",
    c:["Albus Perceval Wulfric Brian Dumbledore","Albus Brian Wulfric Perceval Dumbledore","Albus Perceval Abelforth Brian Dumbledore","Albus Wulfric Elphias Brian Dumbledore"],
    src:"Tome 5, chap. 8" },

  { t:3, q:"Quels balais Lucius Malefoy offre-t-il à l'équipe de Serpentard ?",
    c:["Des Nimbus 2001","Des Nimbus 2000","Des Éclairs de Feu","Des Brossdur 7"],
    src:"Tome 2, chap. 7", note:"Le prix d'entrée de Drago au poste d'attrapeur." },

  { t:3, q:"En quel bois est taillée la baguette de Voldemort ?",
    c:["En if","En houx","En sureau","En ébène"],
    src:"Tome 1, chap. 5", note:"« 33,75 centimètres. Une baguette puissante… »" },

  { t:3, q:"Quels sont les tout derniers mots du tome 7 ?",
    c:["« Tout était bien. »","« La cicatrice ne le faisait plus souffrir. »","« Dix-neuf ans plus tard. »","« C'était fini. »"],
    src:"Tome 7, épilogue" },

  { t:3, q:"Quel est le deuxième prénom de Ron ?",
    c:["Bilius","Arthur","Septimus","Fabian"],
    src:"Tome 7, chap. 7", note:"Révélé à la lecture du testament de Dumbledore." },

  { t:3, q:"Qui remporte la finale de la Coupe du Monde de Quidditch 1994 ?",
    c:["L'Irlande, alors que Krum attrape le Vif d'or","La Bulgarie, grâce à Krum","L'Irlande, grâce à son attrapeur","La Bulgarie, malgré Krum"],
    src:"Tome 4, chap. 8", note:"Krum met fin au massacre en attrapant le Vif… tout en perdant." },

  { t:3, q:"Quelle est la profession des parents d'Hermione ?",
    c:["Dentistes","Médecins","Professeurs","Libraires"],
    src:"Tome 1, chap. 12" },

  { t:3, q:"Qui donne la Branchiflore à Harry avant la deuxième tâche (dans le LIVRE) ?",
    c:["Dobby","Neville","Maugrey","Cedric"],
    src:"Tome 4, chap. 26", note:"Piège classique : dans le film c'est Neville, dans le livre c'est Dobby !" },

  { t:3, q:"Quelle incantation fait apparaître la Marque des Ténèbres ?",
    c:["Morsmordre","Mortis Revelio","Serpensortia","Tenebrus"],
    src:"Tome 4, chap. 9" },

  { t:3, q:"Qui prononce le sortilège qui tue Cedric Diggory ?",
    c:["Peter Pettigrow","Lord Voldemort","Barty Croupton Jr","Lucius Malefoy"],
    src:"Tome 4, chap. 32", note:"« Tue l'autre. » L'ordre vient de Voldemort, la baguette est celle de Queudver." },

  { t:3, q:"Que signifient les initiales R.A.B. ?",
    c:["Regulus Arcturus Black","Regulus Alphard Black","Rodolphus Antonin Black","Regulus Arcturus Burke"],
    src:"Tome 7, chap. 10", note:"Le frère de Sirius, qui a volé le vrai médaillon." },

  { t:3, q:"Qui détruit la coupe de Poufsouffle ?",
    c:["Hermione","Ron","Harry","Neville"],
    src:"Tome 7, chap. 31", note:"Avec un crochet de Basilic, dans la Chambre des Secrets rouverte." },

  { t:3, q:"Quel sortilège incontrôlable détruit le diadème de Serdaigle ?",
    c:["Le Feudeymon, lancé par Crabbe","Un Avada Kedavra dévié","Le Sectumsempra, lancé par Harry","Un Expulso de Goyle"],
    src:"Tome 7, chap. 31" },

  { t:3, q:"Qui sert de « lien » lors du Serment Inviolable entre Rogue et Narcissa ?",
    c:["Bellatrix Lestrange","Lucius Malefoy","Queudver","Drago Malefoy"],
    src:"Tome 6, chap. 2" },

  { t:3, q:"D'où Rogue tient-il son surnom de « Prince de Sang-Mêlé » ?",
    c:["Du nom de jeune fille de sa mère, Eileen Prince","D'un titre donné par Voldemort","Du nom de son père moldu","D'un surnom inventé par les Maraudeurs"],
    src:"Tome 7 (révélé Tome 6, chap. 30)" },

  { t:3, q:"Qu'est-il gravé sur la tombe de Dobby ?",
    c:["« Ici repose Dobby, elfe libre »","« Dobby, ami de Harry Potter »","« À Dobby, mort en héros »","« Un elfe parmi les sorciers »"],
    src:"Tome 7, chap. 24", note:"Creusée par Harry, sans magie." },

  { t:3, q:"Comment s'appelle le contrôleur du Magicobus ?",
    c:["Stan Rocade","Ernie Danlmur","Tom","Dedalus Diggle"],
    src:"Tome 3, chap. 3" },

  /* ---------- NIVEAU 4 — ORDRE DE MERLIN ---------- */

  { t:4, q:"Qui a écrit le manuel « Histoire de la magie » ?",
    c:["Bathilda Tourdesac","Adalbert Lasornette","Miranda Fauconnette","Newt Scamander"],
    src:"Tome 1, chap. 5", note:"Sur la liste de fournitures de première année. On la retrouve à Godric's Hollow…" },

  { t:4, q:"Quel est le score final de la finale de la Coupe du Monde de Quidditch 1994 ?",
    c:["Irlande 170 – Bulgarie 160","Irlande 160 – Bulgarie 150","Irlande 180 – Bulgarie 170","Irlande 170 – Bulgarie 20"],
    src:"Tome 4, chap. 8" },

  { t:4, q:"Qui est l'attrapeur de l'équipe d'Irlande lors de cette finale ?",
    c:["Aidan Lynch","Barry Ryan","Troy","Connolly"],
    src:"Tome 4, chap. 8", note:"Victime de deux feintes de Wronski de Krum." },

  { t:4, q:"En quelle année Nick Quasi-Sans-Tête est-il mort ?",
    c:["1492","1592","1066","1512"],
    src:"Tome 2, chap. 8", note:"Son 500e anniversaire de mort est fêté en 1992." },

  { t:4, q:"Quel est le prix de l'Éclair de Feu affiché en vitrine ?",
    c:["« Prix sur demande »","1 000 Gallions","500 Gallions","Il n'est pas à vendre"],
    src:"Tome 3, chap. 4" },

  { t:4, q:"Quelle est la devise de Poudlard ?",
    c:["Draco dormiens nunquam titillandus","Nunquam titillandus draco","Toujours pur","Lumos in tenebris"],
    src:"Page de titre des romans", note:"« Ne chatouillez jamais un dragon qui dort. »" },

  { t:4, q:"Quel code faut-il composer dans la cabine téléphonique pour entrer au Ministère ?",
    c:["62442","64242","24642","62244"],
    src:"Tome 5, chap. 7", note:"Les touches de M-A-G-I-E." },

  { t:4, q:"Quelle est la devise de la famille Black ?",
    c:["« Toujours pur »","« Sang pur, cœur pur »","« Nés pour régner »","« La pureté avant tout »"],
    src:"Tome 5, chap. 6", note:"Brodée sur la tapisserie généalogique du square Grimmaurd." },

  { t:4, q:"Quel est le deuxième prénom d'Hermione ?",
    c:["Jean","Jane","Rose","Wilhelmina"],
    src:"Tome 7, chap. 7", note:"« Hermione Jean Granger », dans le testament de Dumbledore." },

  { t:4, q:"Qui sont les trois poursuiveuses de Gryffondor lors du premier match de Harry ?",
    c:["Angelina Johnson, Alicia Spinnet et Katie Bell","Angelina Johnson, Katie Bell et Cho Chang","Alicia Spinnet, Katie Bell et Ginny Weasley","Angelina Johnson, Alicia Spinnet et Demelza Robins"],
    src:"Tome 1, chap. 11" },

  { t:4, q:"Quel produit de la Boîte à Flemme provoque des saignements de nez ?",
    c:["Le Nougat Néansang","Les Berlingots de Fièvre","Les Pastilles de Gerbe","Les Petits-Fours Tourndelœil"],
    src:"Tome 5", note:"Une invention de Fred et George pour sécher les cours." },

  { t:4, q:"Quel Moldu Voldemort tue-t-il au tout début du tome 4 ?",
    c:["Frank Bryce, le jardinier des Jedusor","Le père de Tom Jedusor","M. Roberts, le gardien du camping","Un policier de Little Hangleton"],
    src:"Tome 4, chap. 1" },

  { t:4, q:"Dans quel village se trouve la maison des Jedusor ?",
    c:["Little Hangleton","Godric's Hollow","Little Whinging","Ottery St Catchpole"],
    src:"Tome 4, chap. 1" },

  { t:4, q:"Quelle employée du Ministère, disparue en Albanie, a été interrogée puis tuée par Voldemort ?",
    c:["Bertha Jorkins","Amelia Bones","Emmeline Vance","Griselda Marchebank"],
    src:"Tome 4, chap. 1", note:"C'est par elle que Voldemort apprend l'existence du Tournoi." },

  { t:4, q:"Quels sont les « trois D » du transplanage ?",
    c:["Destination, Détermination, Décision","Destination, Direction, Décision","Détermination, Discipline, Destination","Décision, Distance, Destination"],
    src:"Tome 6, chap. 18", note:"Enseignés par l'instructeur du Ministère, Wilkie Tycross." },

  { t:4, q:"Quelle inscription apparaît sur le premier Vif d'or attrapé par Harry, légué par Dumbledore ?",
    c:["« Je m'ouvre au terme »","« Je m'ouvre à la fin »","« Pour celui qui doit mourir »","« La mort n'est qu'un passage »"],
    src:"Tome 7, chap. 7", note:"Il contenait la Pierre de Résurrection." },

  { t:4, q:"Sous quels autres noms la Baguette de Sureau est-elle connue ?",
    c:["Le Bâton de la Mort et la Baguette de la Destinée","Le Sceptre de Merlin et la Baguette Suprême","La Baguette Noire et le Bâton des Rois","La Baguette de Sang et le Bâton du Destin"],
    src:"Tome 7, chap. 21" },

  { t:4, q:"À qui Grindelwald a-t-il volé la Baguette de Sureau ?",
    c:["Au fabricant Gregorovitch","À Ollivander","À un descendant des Peverell","À Bathilda Tourdesac"],
    src:"Tome 7, chap. 24" },

  { t:4, q:"Quelle est la forme du Patronus d'Abelforth Dumbledore ?",
    c:["Une chèvre","Un sanglier","Un phénix","Un bouc… non, un mouton"],
    src:"Tome 7, chap. 28", note:"On ne se refait pas." },

  { t:4, q:"Qui dit : « Trois tours devraient suffire » ?",
    c:["Albus Dumbledore","Hermione Granger","Minerva McGonagall","Madame Pomfresh"],
    src:"Tome 3, chap. 21", note:"Le mode d'emploi le plus elliptique de l'histoire du voyage temporel." },

  /* ---------- NIVEAU 5 — DÉPARTEMENT DES MYSTÈRES ---------- */

  { t:5, q:"Combien y a-t-il d'escaliers à Poudlard ?",
    c:["142","112","187","365"],
    src:"Tome 1, chap. 8", note:"« Il y avait cent quarante-deux escaliers, à Poudlard… »" },

  { t:5, q:"Depuis quand la famille Ollivander fabrique-t-elle des baguettes ?",
    c:["Depuis 382 avant J.-C.","Depuis 382 après J.-C.","Depuis 990 après J.-C.","Depuis 1294"],
    src:"Tome 1, chap. 5", note:"C'est écrit sur la devanture de la boutique." },

  { t:5, q:"Quel est le tout premier mot de passe de la tour de Gryffondor ?",
    c:["Caput Draconis","Fortuna Major","Tête de dragon","Chevalier du Catogan"],
    src:"Tome 1, chap. 7" },

  { t:5, q:"Dans quelle salle d'audience se déroule le procès de Harry au Ministère ?",
    c:["La salle numéro dix","La salle numéro sept","La salle du Magenmagot","La salle numéro deux"],
    src:"Tome 5, chap. 7", note:"La même que celle des procès de Mangemorts vus dans la Pensine." },

  { t:5, q:"À quelle heure l'audience de Harry a-t-elle été avancée, pour le piéger ?",
    c:["8 heures","9 heures","7 heures 30","8 heures 30"],
    src:"Tome 5, chap. 7", note:"Heureusement, M. Weasley et Harry étaient très en avance." },

  { t:5, q:"Quel employé du Département des mystères est tué à Ste Mangouste par un Filet du Diable ?",
    c:["Broderick Moroz","Augustus Rookwood","Saul Croaker","Sturgis Podmore"],
    src:"Tome 5, chap. 25", note:"La plante avait été livrée en cadeau « anonyme » sur sa table de nuit." },

  { t:5, q:"La révolte des gobelins de quelle année avait son quartier général dans une auberge de Pré-au-Lard ?",
    c:["1612","1512","1712","1622"],
    src:"Tome 3", note:"Un détail d'« Histoire de la magie » cité à propos de Pré-au-Lard." },

  { t:5, q:"Combien coûtent les Multiplettes à la Coupe du Monde de Quidditch ?",
    c:["10 Gallions","5 Gallions","15 Mornilles","2 Gallions"],
    src:"Tome 4, chap. 7", note:"Harry en achète trois paires — « pas de cadeau pendant dix ans », promet-il à Ron." },

  { t:5, q:"Quelles initiales figurent sur l'étiquette de la prophétie au Département des mystères ?",
    c:["S.P.T. à A.P.W.B.D.","S.T. à A.D.","S.P.T. à H.J.P.","A.P.W.B.D. à S.P.T."],
    src:"Tome 5, chap. 34", note:"Sibylle Patricia Trelawney à Albus Perceval Wulfric Brian Dumbledore." },

  { t:5, q:"Combien de passages secrets mènent hors de Poudlard, selon Fred et George ?",
    c:["Sept","Cinq","Neuf","Douze"],
    src:"Tome 3, chap. 10", note:"Rusard n'en connaît que quatre." },

  { t:5, q:"Qui a écrit le « Manuel avancé de préparation des potions » ?",
    c:["Libatius Borage","Arsenius Beaulitron","Le Prince de Sang-Mêlé","Damocles Belby"],
    src:"Tome 6, chap. 9" },

  { t:5, q:"Quel est le nom complet du grand-père maternel de Voldemort ?",
    c:["Elvis Marvolo Gaunt","Tom Elvis Gaunt","Morfin Elvis Gaunt","Marvolo Salazar Gaunt"],
    src:"Tome 6, chap. 10", note:"C'est de lui que vient le « Elvis » de Tom Elvis Jedusor." },

  { t:5, q:"De quoi est faite la baguette de Fleur Delacour ?",
    c:["Bois de rose et cheveu de Vélane","Chêne et crin de licorne","Bois de rose et plume de phénix","Saule et cheveu de Vélane"],
    src:"Tome 4, chap. 18", note:"Le cheveu vient de sa grand-mère. Ollivander n'aime pas trop ça." },

  { t:5, q:"Qui a fabriqué la baguette de Viktor Krum ?",
    c:["Gregorovitch","Ollivander","Un fabricant de Durmstrang","Son père"],
    src:"Tome 4, chap. 18" },

  { t:5, q:"Quels sont « quelques mots » de Dumbledore avant le banquet de début d'année ?",
    c:["« Nigaud ! Grasdouble ! Bizarre ! Pinçon ! »","« Miam ! Festin ! Magie ! Bonheur ! »","« Silence ! Mangez ! Dormez ! Merci ! »","« Bienvenue ! Bon appétit à tous ! »"],
    src:"Tome 1, chap. 7", note:"« Est-il… un peu fou ? — Fou ? Un génie, tu veux dire ! »" },

  { t:5, q:"À quel numéro du Chemin de Traverse se trouve la boutique de Fred et George ?",
    c:["Au 93","Au 77","Au 129","Au 42"],
    src:"Tome 6, chap. 6", note:"« Farces pour sorciers facétieux », l'unique tache de couleur dans une allée dévastée." },

  /* ============================================================
     EXTENSION DU GRIMOIRE — deuxième fournée
     Faits sensibles (noms VF, chiffres, chapitres) vérifiés via
     HP-Lexicon, EHP et le wiki HP francophone avant admission.
     ============================================================ */

  /* ---------- NIVEAU 1 ---------- */

  { t:1, q:"Comment s'appelle le cousin de Harry ?",
    c:["Dudley","Piers","Vernon","Marjorie"],
    src:"Tome 1, chap. 1" },

  { t:1, q:"Qui apprend à Harry qu'il est un sorcier ?",
    c:["Hagrid","Dumbledore","McGonagall","Le facteur"],
    src:"Tome 1, chap. 4", note:"Dans la cabane sur le rocher, avec un gâteau d'anniversaire un peu écrasé." },

  { t:1, q:"Quels animaux les élèves peuvent-ils apporter à Poudlard, selon la lettre d'admission ?",
    c:["Un hibou, un chat ou un crapaud","Un hibou, un rat ou un serpent","Un chat, un chien ou un hibou","N'importe quel animal magique"],
    src:"Tome 1, chap. 5" },

  { t:1, q:"Comment s'appelle le crapaud de Neville ?",
    c:["Trevor","Trévor le Hardi","Norbert","Gordon"],
    src:"Tome 1, chap. 6", note:"Champion de l'évasion toutes catégories." },

  { t:1, q:"Comment s'appelle le rat de Ron ?",
    c:["Croûtard","Grattepied","Queudver","Miss Teigne"],
    src:"Tome 1, chap. 6" },

  { t:1, q:"Quel pub sert d'entrée au Chemin de Traverse ?",
    c:["Le Chaudron Baveur","Les Trois Balais","La Tête de Sanglier","Le Chicaneur"],
    src:"Tome 1, chap. 5" },

  { t:1, q:"Comment s'appelle l'infirmière de Poudlard ?",
    c:["Madame Pomfresh","Madame Bibine","Madame Pince","Madame Maxime"],
    src:"Tome 1, chap. 10" },

  { t:1, q:"Que cache le turban du professeur Quirrell ?",
    c:["Le visage de Voldemort","Une blessure de vampire","Un troisième œil","Rien du tout"],
    src:"Tome 1, chap. 17" },

  { t:1, q:"Qui a rouvert la Chambre des Secrets, sous l'emprise du journal de Jedusor ?",
    c:["Ginny Weasley","Drago Malefoy","Percy Weasley","Mimi Geignarde"],
    src:"Tome 2, chap. 17" },

  { t:1, q:"Comment s'appelle l'esprit frappeur qui sème le chaos à Poudlard ?",
    c:["Peeves","Le Baron Sanglant","Nick Quasi-Sans-Tête","Kreattur"],
    src:"Tome 1, chap. 7" },

  { t:1, q:"Qui élimine Bellatrix Lestrange lors de la bataille de Poudlard ?",
    c:["Molly Weasley","Ginny Weasley","Hermione","Neville"],
    src:"Tome 7, chap. 36" },

  { t:1, q:"Comment s'appelle le deuxième fils de Harry et Ginny ?",
    c:["Albus Severus","James Sirius","Teddy Remus","Frank Albus"],
    src:"Tome 7, épilogue", note:"« Tu portes les noms de deux directeurs de Poudlard… »" },

  { t:1, q:"Comment le trio s'échappe-t-il de Gringotts ?",
    c:["Sur le dos d'un dragon","En transplanant","Par la cheminée","Cachés dans un wagonnet"],
    src:"Tome 7, chap. 26" },

  { t:1, q:"Quel sortilège de désarmement devient la « signature » de Harry ?",
    c:["Expelliarmus","Stupéfix","Protego","Petrificus Totalus"],
    src:"Tome 2, chap. 11", note:"Appris en voyant Rogue l'utiliser au club de duel." },

  { t:1, q:"Quelle boisson chaude fait la gloire des Trois Balais ?",
    c:["La Bièraubeurre","Le whisky Pur Feu","L'hydromel","Le jus de citrouille"],
    src:"Tome 3, chap. 10" },

  /* ---------- NIVEAU 2 ---------- */

  { t:2, q:"Quel professeur fantôme enseigne l'histoire de la magie ?",
    c:["Le professeur Binns","Le professeur Flitwick","Le Moine Gras","Le professeur Vector"],
    src:"Tome 1, chap. 8", note:"Mort dans son sommeil, il s'est levé pour faire cours sans son corps." },

  { t:2, q:"Comment Harry attrape-t-il son tout premier Vif d'or en match ?",
    c:["Il manque de l'avaler","D'une pirouette sur le manche","En plongeant de dix mètres","En le prenant à Malefoy"],
    src:"Tome 1, chap. 11" },

  { t:2, q:"Que fait la silhouette encapuchonnée que Harry surprend dans la Forêt interdite ?",
    c:["Elle boit du sang de licorne","Elle déterre des mandragores","Elle invoque des Détraqueurs","Elle vole des œufs de dragon"],
    src:"Tome 1, chap. 15" },

  { t:2, q:"Quel centaure prend Harry sur son dos pour le sauver dans la Forêt interdite ?",
    c:["Firenze","Bane","Ronan","Magorian"],
    src:"Tome 1, chap. 15", note:"Un geste que ses congénères lui reprochent durement." },

  { t:2, q:"Pourquoi le sortilège d'Amnésie de Lockhart se retourne-t-il contre lui ?",
    c:["Il utilise la baguette cassée de Ron","Harry le désarme à temps","Le Basilic le frappe","Il bafouille la formule"],
    src:"Tome 2, chap. 16" },

  { t:2, q:"Quelle plante permet de préparer le remède qui ranime les pétrifiés ?",
    c:["La Mandragore","La Branchiflore","Le Filet du Diable","L'Aconit"],
    src:"Tome 2, chap. 6" },

  { t:2, q:"Comment le Basilic est-il privé de son arme la plus mortelle ?",
    c:["Fumseck lui crève les yeux","Harry lui tranche la tête","Le Choixpeau l'aveugle","Ron lui jette un sort"],
    src:"Tome 2, chap. 17" },

  { t:2, q:"D'où Harry tire-t-il l'épée de Gryffondor dans la Chambre des Secrets ?",
    c:["Du Choixpeau magique","Du bureau de Dumbledore","Des mains de la statue de Salazar","Du lac de Poudlard"],
    src:"Tome 2, chap. 17" },

  { t:2, q:"Lequel de ces méfaits n'est PAS l'œuvre de Dobby « pour protéger » Harry ?",
    c:["Ensorceler le Saule cogneur","Intercepter ses lettres","Fermer la barrière de la voie 9 ¾","Truquer un Cognard"],
    src:"Tome 2, chap. 2, 5 et 10" },

  { t:2, q:"Que reçoit Ron de sa mère après l'épisode de la voiture volante ?",
    c:["Une Beuglante","Un Rappeltout","Une retenue","Un balai neuf"],
    src:"Tome 2, chap. 6", note:"« RONALD WEASLEY ! » — toute la Grande Salle en a profité." },

  { t:2, q:"Que fait accidentellement Harry à la tante Marge ?",
    c:["Il la gonfle comme un ballon","Il la transforme en cochon","Il la rend muette","Il fait exploser son verre"],
    src:"Tome 3, chap. 2" },

  { t:2, q:"Comment Sirius s'est-il évadé d'Azkaban ?",
    c:["Sous sa forme de chien, amaigri, entre les barreaux","Grâce à une baguette de contrebande","En soudoyant un Détraqueur","Caché dans un chariot de linge"],
    src:"Tome 3, chap. 19" },

  { t:2, q:"À quoi ressemble l'épouvantard de Neville une fois « ridiculisé » ?",
    c:["Rogue habillé en grand-mère de Neville","Rogue chauve","Un serpent en peluche","McGonagall en tutu"],
    src:"Tome 3, chap. 7" },

  { t:2, q:"Quel balai de Harry finit en miettes à cause du Saule cogneur ?",
    c:["Le Nimbus 2000","L'Éclair de Feu","Le Nimbus 2001","L'Étoile filante"],
    src:"Tome 3, chap. 9" },

  { t:2, q:"Qui révèle « accidentellement » aux Serpentard que Lupin est un loup-garou ?",
    c:["Rogue","Drago Malefoy","Peeves","Ombrage"],
    src:"Tome 3, chap. 22" },

  { t:2, q:"Quel objet sert de Portoloin pour se rendre à la Coupe du Monde de Quidditch ?",
    c:["Une vieille botte","Une bouilloire percée","Un pneu crevé","Un journal roulé"],
    src:"Tome 4, chap. 6" },

  { t:2, q:"Comment s'appelle l'elfe de maison de la famille Croupton ?",
    c:["Winky","Dobby","Kreattur","Hokey"],
    src:"Tome 4, chap. 8" },

  { t:2, q:"Avec qui Hermione se rend-elle au bal de Noël ?",
    c:["Viktor Krum","Ron","Cedric Diggory","Cormac McLaggen"],
    src:"Tome 4, chap. 23", note:"Au grand désespoir de Ron, qui met deux tomes à comprendre pourquoi ça l'agace." },

  { t:2, q:"Comment faut-il écouter l'œuf d'or pour comprendre son message ?",
    c:["Sous l'eau","Dans le noir complet","À minuit pile","En le faisant tourner"],
    src:"Tome 4, chap. 25" },

  { t:2, q:"Qui Harry sauve-t-il du lac en plus de Ron, lors de la deuxième tâche ?",
    c:["Gabrielle Delacour","Cho Chang","Fleur Delacour","Hermione"],
    src:"Tome 4, chap. 26", note:"Ce qui lui vaut des points pour sa « grandeur d'âme »." },

  { t:2, q:"Qui peut voir les Sombrals ?",
    c:["Ceux qui ont vu quelqu'un mourir","Les sorciers de sang pur","Ceux qui ont frôlé la mort","Seuls les professeurs"],
    src:"Tome 5, chap. 21" },

  { t:2, q:"Qui détruit le médaillon de Serpentard ?",
    c:["Ron, avec l'épée de Gryffondor","Harry, avec un crochet de Basilic","Hermione, avec l'épée","Neville"],
    src:"Tome 7, chap. 19" },

  { t:2, q:"Qui est Graup, que Hagrid cache dans la Forêt interdite ?",
    c:["Son demi-frère géant","Un bébé dragon","Un troll apprivoisé","Le fils d'Aragog"],
    src:"Tome 5, chap. 30", note:"Ramené des montagnes pour lui apprendre les bonnes manières. Résultat mitigé." },

  { t:2, q:"Qui est le parrain de Teddy Lupin ?",
    c:["Harry","Ron","Bill Weasley","Kingsley"],
    src:"Tome 7, chap. 25" },

  { t:2, q:"Comment meurt Voldemort ?",
    c:["Son Avada Kedavra rebondit sur l'Expelliarmus de Harry","Harry lui lance l'Avada Kedavra","L'épée de Gryffondor le transperce","Le Feudeymon le consume"],
    src:"Tome 7, chap. 36", note:"La Baguette de Sureau refuse de tuer son véritable maître." },

  { t:2, q:"Qui porte le corps de Harry, cru mort, hors de la forêt ?",
    c:["Hagrid","Voldemort","Les Détraqueurs","Neville"],
    src:"Tome 7, chap. 36" },

  /* ---------- NIVEAU 3 ---------- */

  { t:3, q:"Combien de points Dumbledore accorde-t-il à Neville pour s'être dressé contre ses amis ?",
    c:["10 points","5 points","50 points","20 points"],
    src:"Tome 1, chap. 17", note:"Les points qui offrent la Coupe à Gryffondor." },

  { t:3, q:"Que voit Ron dans le Miroir du Riséd ?",
    c:["Lui-même en préfet-en-chef, vainqueur de la Coupe de Quidditch","Sa famille au complet","Lui-même ministre de la Magie","Hermione"],
    src:"Tome 1, chap. 12", note:"Seul, enfin, sans ses cinq frères aînés." },

  { t:3, q:"Comment Hagrid a-t-il obtenu l'œuf de Norbert ?",
    c:["Gagné aux cartes contre un inconnu","Acheté sur l'allée des Embrumes","Offert par Charlie","Trouvé dans la Forêt interdite"],
    src:"Tome 1, chap. 14", note:"Un inconnu bien curieux de savoir comment endormir un chien à trois têtes…" },

  { t:3, q:"Quelle épreuve protégeant la Pierre philosophale est l'œuvre de Rogue ?",
    c:["L'énigme de logique des potions","L'échiquier géant","Les clés volantes","Le Filet du Diable"],
    src:"Tome 1, chap. 16", note:"Résolue par Hermione : « beaucoup de grands sorciers n'ont pas une once de logique »." },

  { t:3, q:"Comment Mimi Geignarde est-elle morte ?",
    c:["Foudroyée par le regard du Basilic","Noyée dans son bain","Empoisonnée","Poussée dans l'escalier"],
    src:"Tome 2, chap. 16", note:"Dans les toilettes, en ouvrant la porte pour dire de partir à « un garçon » parlant une langue étrange." },

  { t:3, q:"Pourquoi le Polynectar d'Hermione tourne-t-il à la catastrophe ?",
    c:["Elle a utilisé un poil de chat","Elle a trop laissé bouillir la potion","Millicent l'a démasquée","Elle a oublié la peau de serpent"],
    src:"Tome 2, chap. 12", note:"Le poil venait de la robe de Millicent Bulstrode… mais pas de Millicent." },

  { t:3, q:"Quel sortilège de Drago révèle à toute l'école que Harry parle Fourchelang ?",
    c:["Serpensortia","Vipera Evanesca","Morsmordre","Anguis Appare"],
    src:"Tome 2, chap. 11" },

  { t:3, q:"Qui est chargé d'exécuter Buck l'hippogriffe ?",
    c:["Macnair","Rusard","Ombrage","Croupton"],
    src:"Tome 3, chap. 16", note:"Un bourreau du Ministère… et futur Mangemort." },

  { t:3, q:"Que fait la carte du Maraudeur quand Rogue tente de l'interroger ?",
    c:["Elle l'insulte copieusement","Elle s'efface","Elle prend feu","Elle affiche une fausse carte"],
    src:"Tome 3, chap. 14", note:"« M. Lunard présente ses respects au professeur Rogue et le prie de ne pas mettre son nez anormalement long dans les affaires d'autrui. »" },

  { t:3, q:"Pendant quel match Harry tombe-t-il de son balai à cause des Détraqueurs ?",
    c:["Gryffondor contre Poufsouffle","Gryffondor contre Serpentard","Gryffondor contre Serdaigle","La finale"],
    src:"Tome 3, chap. 9", note:"Cedric attrape le Vif d'or et Gryffondor perd — une première pour Harry." },

  { t:3, q:"Quelle prédiction de Trelawney se réalise le soir même où elle la prononce ?",
    c:["Le serviteur rejoindra son maître avant minuit","Harry mourra jeune","Le Sinistros rôde","Un élève quittera l'école à Pâques"],
    src:"Tome 3, chap. 16", note:"Sa deuxième vraie prophétie seulement, d'après Dumbledore." },

  { t:3, q:"Qui « hantait » réellement la Cabane hurlante ?",
    c:["Lupin, les nuits de pleine lune","De vrais fantômes","Sirius Black","Personne, c'est une légende"],
    src:"Tome 3, chap. 18", note:"Les hurlements que les villageois entendaient étaient les siens." },

  { t:3, q:"Avec qui Harry et Ron vont-ils au bal de Noël ?",
    c:["Parvati et Padma Patil","Cho Chang et Lavande","Hermione et Ginny","Les sœurs Delacour"],
    src:"Tome 4, chap. 23", note:"Cavaliers catastrophiques, de l'avis général des intéressées." },

  { t:3, q:"Pourquoi les baguettes de Harry et de Voldemort se connectent-elles en duel ?",
    c:["Elles contiennent deux plumes du même phénix","Elles sont en bois jumeau","Un sortilège de Dumbledore les lie","La prophétie les unit"],
    src:"Tome 4, chap. 36", note:"Deux plumes de Fumseck, révèle Dumbledore. L'effet : Priori Incantatem." },

  { t:3, q:"Où le véritable Maugrey Fol Œil a-t-il passé l'année du Tournoi ?",
    c:["Enfermé dans sa propre malle magique","À Azkaban","À Ste Mangouste","Caché chez Croupton"],
    src:"Tome 4, chap. 35", note:"Au fond d'un compartiment à sept serrures." },

  { t:3, q:"Avec quoi Ludo Verpey paie-t-il le pari de Fred et George ?",
    c:["De l'or de farfadet, qui s'évapore","De faux Gallions","Un chèque de Gringotts en bois","Il ne les paie jamais"],
    src:"Tome 4, chap. 37", note:"L'or disparaît en quelques heures — ruiné, Verpey fuit les gobelins." },

  { t:3, q:"Qui est Arabella Figg, la voisine chez qui Harry passait ses étés ?",
    c:["Une Cracmol chargée de veiller sur lui","Une Moldue ordinaire","Une Auror sous couverture","Une cousine de Dumbledore"],
    src:"Tome 5, chap. 2", note:"Elle témoigne même au procès de Harry." },

  { t:3, q:"En quoi Slughorn s'est-il transformé quand Harry et Dumbledore le trouvent ?",
    c:["En fauteuil","En armoire","En tapis","En horloge comtoise"],
    src:"Tome 6, chap. 4" },

  { t:3, q:"Qui est victime du collier d'opales maudit ?",
    c:["Katie Bell","Hermione","Ginny","Rosmerta"],
    src:"Tome 6, chap. 12" },

  { t:3, q:"Qu'est-ce qui sauve Ron de l'hydromel empoisonné ?",
    c:["Un bézoard enfoncé dans sa gorge par Harry","Un contre-poison de Slughorn","Madame Pomfresh","Un sortilège d'Hermione"],
    src:"Tome 6, chap. 18", note:"Le réflexe vient tout droit du manuel du Prince de Sang-Mêlé." },

  { t:3, q:"Pourquoi Harry n'intervient-il pas au sommet de la tour d'astronomie ?",
    c:["Dumbledore l'a pétrifié sous sa cape d'invisibilité","Il est ligoté par des Mangemorts","Rogue lui a jeté un sort","Il a promis de ne pas bouger"],
    src:"Tome 6, chap. 27", note:"Le dernier sortilège de Dumbledore aura été pour le protéger." },

  { t:3, q:"En combien de morceaux Voldemort voulait-il diviser son âme ?",
    c:["Sept","Six","Treize","Trois"],
    src:"Tome 6, chap. 23", note:"« Sept, le chiffre le plus puissamment magique… » Il a fini par en faire un de plus, sans le savoir." },

  { t:3, q:"D'où vient la main noircie et morte de Dumbledore ?",
    c:["De la malédiction de la bague des Gaunt","D'un duel avec Voldemort","De la potion de la caverne","Du Feudeymon"],
    src:"Tome 7, chap. 33", note:"Rogue a contenu le mal, mais ne lui donnait qu'un an à vivre." },

  { t:3, q:"Qui succède à Cornelius Fudge comme ministre de la Magie ?",
    c:["Rufus Scrimgeour","Pius Thicknesse","Kingsley Shacklebolt","Barty Croupton"],
    src:"Tome 6, chap. 1", note:"L'ancien directeur du Bureau des Aurors. Il mourra sans trahir Harry." },

  { t:3, q:"Quel piège le Ministère déchu pose-t-il sur le nom même de « Voldemort » ?",
    c:["Un Tabou qui révèle la position de qui le prononce","Une amende de 100 Gallions","Un sortilège de mutisme","Rien, c'est une rumeur"],
    src:"Tome 7, chap. 20", note:"C'est ainsi que le trio se fait capturer." },

  { t:3, q:"Où Harry récupère-t-il l'épée de Gryffondor pendant la cavale ?",
    c:["Au fond d'un étang gelé","Dans le coffre des Lestrange","Dans la Salle sur Demande","Sur la tombe de Dumbledore"],
    src:"Tome 7, chap. 19", note:"Guidé par une biche argentée… dont il ignore encore l'expéditeur." },

  { t:3, q:"Qui apparaît auprès de Harry grâce à la Pierre de Résurrection ?",
    c:["Lily, James, Sirius et Lupin","Lily, James et Dumbledore","Sirius, Lupin, Fred et Tonks","Ses parents seulement"],
    src:"Tome 7, chap. 34" },

  { t:3, q:"Que décide Harry de faire de la Baguette de Sureau (dans le LIVRE) ?",
    c:["Réparer sa baguette, puis la remettre dans la tombe de Dumbledore","La briser en deux et la jeter","La garder pour toujours","La donner à Ollivander"],
    src:"Tome 7, chap. 36", note:"La casser, c'est dans le film ! Dans le livre, elle doit retourner d'où elle vient." },

  { t:3, q:"Comment s'appellent les enfants de Ron et Hermione ?",
    c:["Rose et Hugo","Rose et Fred","Hermione et Ronald Jr","Hugo et Jean"],
    src:"Tome 7, épilogue" },

  { t:3, q:"Quel métier exerce Neville, d'après l'épilogue ?",
    c:["Professeur de botanique à Poudlard","Auror","Gardien des clés de Poudlard","Herboriste au Chemin de Traverse"],
    src:"Tome 7, épilogue" },

  { t:3, q:"Comment s'appelle le fils de Drago Malefoy ?",
    c:["Scorpius","Lucius","Draco Jr","Severus"],
    src:"Tome 7, épilogue" },

  { t:3, q:"Quelle créature garde le chemin le plus court vers la Coupe, dans le labyrinthe ?",
    c:["Un sphinx, qui pose une énigme","Un Magyar à pointes","Un Détraqueur","Une Acromantule"],
    src:"Tome 4, chap. 31", note:"La réponse de son énigme : une araignée." },

  { t:3, q:"Quel est le premier ÉLÈVE pétrifié par le Basilic ?",
    c:["Colin Crivey","Justin Finch-Fletchley","Pénélope Deauclaire","Hermione"],
    src:"Tome 2, chap. 10", note:"Miss Teigne fut la toute première victime ; Colin, lui, regardait à travers son appareil photo." },

  /* ---------- NIVEAU 4 ---------- */

  { t:4, q:"Que montre l'épouvantard de Molly Weasley ?",
    c:["Les cadavres des membres de sa famille","Une montagne de dettes","Voldemort en personne","La destruction du Terrier"],
    src:"Tome 5, chap. 9", note:"Ron, Fred, George, Percy, Harry… Lupin doit intervenir." },

  { t:4, q:"Quelle est la forme du Patronus de Cho Chang ?",
    c:["Un cygne","Une hirondelle","Un dauphin","Une colombe"],
    src:"Tome 5, chap. 27" },

  { t:4, q:"Quelle note Harry obtient-il en Potions à ses B.U.S.E. ?",
    c:["Effort exceptionnel","Optimal","Acceptable","Piètre"],
    src:"Tome 6, chap. 5", note:"Insuffisant pour les A.S.P.I.C. de Rogue… mais Slughorn accepte les E." },

  { t:4, q:"Quel est le prénom de Madame Maxime, la directrice de Beauxbâtons ?",
    c:["Olympe","Origine","Ombeline","Odile"],
    src:"Tome 4, chap. 23", note:"« Bonne nuit, Olympe », dit Hagrid — avant de gaffer sur ses origines." },

  { t:4, q:"Dans quel département du Ministère travaille Amos Diggory ?",
    c:["Contrôle et régulation des créatures magiques","Jeux et sports magiques","Coopération magique internationale","Usage abusif de la magie"],
    src:"Tome 4, chap. 6" },

  { t:4, q:"Qu'advient-il du corps de Barty Croupton Sr ?",
    c:["Transformé en os et enterré devant la cabane de Hagrid","Jeté dans le lac","Enterré à Little Hangleton","Jamais retrouvé, dit le Ministère"],
    src:"Tome 4, chap. 35", note:"L'aveu de son propre fils sous Veritaserum." },

  { t:4, q:"Où Sirius se cache-t-il près de Pré-au-Lard pendant le Tournoi ?",
    c:["Dans une grotte, en se nourrissant de rats","Dans la Cabane hurlante","Aux Trois Balais, déguisé","Dans la Forêt interdite"],
    src:"Tome 4, chap. 27" },

  { t:4, q:"Quelles figures composent la fontaine de la Fraternité magique, au Ministère ?",
    c:["Un sorcier, une sorcière, un centaure, un gobelin et un elfe","Quatre sorciers dos à dos","Un sorcier terrassant un dragon","Les quatre fondateurs de Poudlard"],
    src:"Tome 5, chap. 7", note:"Harry trouvera plus tard son or utile… et son message mensonger." },

  { t:4, q:"Sous quel prétexte les cours d'Occlumancie de Harry sont-ils déguisés ?",
    c:["Des cours de rattrapage de potions","Des retenues avec Rogue","Un club de duel privé","Des séances à l'infirmerie"],
    src:"Tome 5, chap. 24" },

  { t:4, q:"Selon la prophétie, quand doit naître celui qui a le pouvoir de vaincre le Seigneur des Ténèbres ?",
    c:["Lorsque mourra le septième mois","La nuit de Halloween","Au solstice d'été","Le premier jour de l'an"],
    src:"Tome 5, chap. 37", note:"Deux garçons correspondaient : Harry… et Neville." },

  { t:4, q:"Quel objet réconcilie Kreattur avec le trio ?",
    c:["Le faux médaillon de Regulus, offert par Harry","Un vêtement propre","La tapisserie des Black restaurée","L'or de Sirius"],
    src:"Tome 7, chap. 10", note:"Le vieux elfe fond en larmes — et cuisine enfin correctement." },

  { t:4, q:"Qui arrache accidentellement l'oreille de George pendant la Bataille des Sept Potter ?",
    c:["Rogue, d'un Sectumsempra dévié","Voldemort","Bellatrix","Un Doloris de Yaxley"],
    src:"Tome 7, chap. 33", note:"Il visait la main d'un Mangemort pour protéger Lupin, révèle la Pensine." },

  { t:4, q:"Quelle matière enseignait Charity Burbage, assassinée par Voldemort au début du tome 7 ?",
    c:["L'étude des Moldus","La divination","L'arithmancie","Les runes anciennes"],
    src:"Tome 7, chap. 1" },

  { t:4, q:"Qui est accusé à tort du meurtre des Jedusor ?",
    c:["Morfin Gaunt","Frank Bryce","Elvis Marvolo Gaunt","Un vagabond moldu"],
    src:"Tome 6, chap. 17", note:"Voldemort a maquillé la mémoire de son propre oncle." },

  { t:4, q:"Après quel événement le poste de professeur de DCFM semble-t-il maudit ?",
    c:["Le refus de Dumbledore d'y nommer Voldemort","La mort de Quirrell","Le renvoi de Lupin","La création du poste"],
    src:"Tome 6, chap. 20", note:"« Nous n'avons jamais pu garder un professeur plus d'un an depuis. »" },

  { t:4, q:"Avec quoi la bague des Gaunt a-t-elle été détruite ?",
    c:["L'épée de Gryffondor","Un crochet de Basilic","Le Feudeymon","La baguette de Sureau"],
    src:"Tome 7, chap. 15", note:"Révélé par le portrait de Phineas Nigellus : c'est ainsi que le trio comprend que l'épée détruit les Horcruxes." },

  { t:4, q:"Combien de temps de chance offre la fiole de Felix Felicis mise en jeu par Slughorn ?",
    c:["Douze heures","Vingt-quatre heures","Une heure","Sept heures"],
    src:"Tome 6, chap. 9", note:"Remportée par Harry… grâce aux astuces du Prince de Sang-Mêlé." },

  { t:4, q:"Quels échos surgissent de la baguette de Voldemort pendant le Priori Incantatem ?",
    c:["Cedric, Frank Bryce, Bertha Jorkins, Lily puis James","Uniquement Lily et James","Cedric, Croupton Sr et les Potter","Tous les Mangemorts tués"],
    src:"Tome 4, chap. 34", note:"Dans l'ordre inverse des meurtres. Les tout premiers tirages inversaient Lily et James — corrigé depuis." },

  { t:4, q:"Où Helena Serdaigle avait-elle caché le diadème de sa mère ?",
    c:["Dans un arbre creux, en Albanie","Dans la Salle sur Demande","Au fond du lac de Poudlard","Dans la tour de Serdaigle"],
    src:"Tome 7, chap. 31", note:"C'est elle, la Dame Grise, qui le confie à Harry. Voldemort l'y a retrouvé des siècles plus tard." },

  { t:4, q:"Qui a tué Helena Serdaigle, la Dame Grise ?",
    c:["Le Baron Sanglant","Salazar Serpentard","Sa propre mère","Un brigand albanais"],
    src:"Tome 7, chap. 31", note:"Fou de rage qu'elle refuse de revenir — il porte ses chaînes en pénitence." },

  { t:4, q:"D'où Voldemort dirige-t-il la bataille de Poudlard ?",
    c:["De la Cabane hurlante","De la tour d'astronomie","De la Forêt interdite","Du bureau du directeur"],
    src:"Tome 7, chap. 32", note:"C'est là que Rogue reçoit sa dernière mission… et Nagini son ordre." },

  { t:4, q:"Sur qui Harry lance-t-il un sortilège Doloris qui fonctionne, à Poudlard ?",
    c:["Amycus Carrow","Bellatrix Lestrange","Fenrir Greyback","Lucius Malefoy"],
    src:"Tome 7, chap. 30", note:"Pour avoir craché au visage de McGonagall. « Il faut le vouloir vraiment », avait dit Bellatrix." },

  { t:4, q:"Quel sortilège McGonagall utilise-t-elle pour animer les statues et armures de Poudlard ?",
    c:["Piertotum Locomotor","Statua Vivificare","Locomotor Armatura","Animus Ferrum"],
    src:"Tome 7, chap. 30", note:"« J'ai toujours rêvé d'utiliser ce sortilège. »" },

  { t:4, q:"Que fait Percy Weasley au beau milieu de la bataille de Poudlard ?",
    c:["Il revient s'excuser auprès de sa famille","Il défend le Ministère","Il s'enfuit avec Fudge","Il est retenu prisonnier"],
    src:"Tome 7, chap. 30", note:"« J'ai été un imbécile ! » — réconciliation en pleine invasion." },

  { t:4, q:"Comment meurt Fred Weasley ?",
    c:["Dans une explosion, en plein éclat de rire","Frappé par Bellatrix","Sous les crocs de Greyback","En protégeant Ginny"],
    src:"Tome 7, chap. 31", note:"Il venait de se réconcilier avec Percy, qui plaisantait — une première." },

  { t:4, q:"Quelle est la PIRE note possible aux examens de Poudlard ?",
    c:["Troll","Désolant","Piètre","Cracmol"],
    src:"Tome 5, chap. 15", note:"Sous « Désolant ». Fred et George en revendiquent fièrement quelques-uns." },

  /* ---------- NIVEAU 5 ---------- */

  { t:5, q:"Comment s'appelle le chien de la tante Marge ?",
    c:["Molaire","Ripper","Crockdur","Touffu"],
    src:"Tome 3, chap. 2", note:"Il a coincé Harry dans un arbre jusqu'à minuit passé." },

  { t:5, q:"Quel mot de passe de la tour de Gryffondor Neville note-t-il sur un papier… qu'il perd ?",
    c:["Les mots de passe de Sir Cadogan","Fortuna Major","Caput Draconis","Balivernes"],
    src:"Tome 3, chap. 13", note:"Sir Cadogan en changeait sans cesse — Sirius n'avait plus qu'à lire la liste." },

  { t:5, q:"Quel est le mot de passe de la salle de bains des préfets ?",
    c:["« Fraîcheur des pins »","« Bulles parfumées »","« Eau claire »","« Propreté magique »"],
    src:"Tome 4, chap. 23", note:"Soufflé à Harry par Cedric, pour l'œuf d'or." },

  { t:5, q:"Derrière quelle vitrine se cache l'entrée de l'hôpital Ste Mangouste ?",
    c:["Purge & Pionce Ltd","Guipure & Fils","Tissard et Brodette","Barjow et Beurk"],
    src:"Tome 5, chap. 22", note:"Un grand magasin condamné, « fermé pour rénovations »." },

  { t:5, q:"Comment s'appelle l'instructeur de transplanage envoyé par le Ministère ?",
    c:["Wilkie Tycross","Barnabas Cuffe","Tiberius McLaggen","Basil Fronsac"],
    src:"Tome 6, chap. 18", note:"Surnommé par les élèves d'après les « trois D »…" },

  { t:5, q:"Dans quelle rangée du Département des mystères se trouve la prophétie ?",
    c:["La rangée 97","La rangée 62","La rangée 13","La rangée 101"],
    src:"Tome 5, chap. 34" },

  { t:5, q:"Combien d'Animagi ont été officiellement recensés au XXe siècle ?",
    c:["Sept","Trois","Douze","Vingt-deux"],
    src:"Tome 3, chap. 18", note:"D'après le registre consulté par Hermione. McGonagall en fait partie — les Maraudeurs et Rita Skeeter, évidemment, non." },

  { t:5, q:"Quelle note scandaleusement basse Karkaroff donne-t-il à Harry après la première tâche ?",
    c:["4","2","6","0"],
    src:"Tome 4, chap. 20", note:"Malgré les 8, 9, 9 et 10 des autres juges. Harry finit tout de même premier ex æquo avec Krum, à 40 points." },

  { t:5, q:"Quel décret d'éducation nomme Ombrage « Grande Inquisitrice de Poudlard » ?",
    c:["Le numéro 23","Le numéro 24","Le numéro 12","Le numéro 26"],
    src:"Tome 5, chap. 15", note:"Annoncé triomphalement à la une de la Gazette du sorcier." },

  { t:5, q:"Qui est le gardien de but de la Bulgarie lors de la finale de la Coupe du Monde ?",
    c:["Zograf","Volkov","Dimitrov","Levski"],
    src:"Tome 4, chap. 8", note:"Sanctionné d'un penalty pour une faute sur la poursuiveuse irlandaise Mullet." },

  { t:5, q:"Combien de faux Potter décollent de Privet Drive lors de l'évasion du tome 7 ?",
    c:["Six","Sept","Cinq","Quatre"],
    src:"Tome 7, chap. 4", note:"Ron, Hermione, Fred, George, Fleur et Mondingus, au Polynectar." },

  { t:5, q:"Qu'est-ce qu'Hermione avoue sentir dans l'Amortentia ?",
    c:["Du gazon fraîchement tondu et du parchemin neuf","De la Bièraubeurre et des livres","Du pain grillé et de l'encre","La pluie et le chocolat"],
    src:"Tome 6, chap. 9", note:"Elle s'interrompt avant le troisième parfum, soudain très rouge…" },

  { t:5, q:"À qui Voldemort a-t-il volé la coupe de Poufsouffle et le médaillon de Serpentard ?",
    c:["Hepzibah Smith","Bathilda Tourdesac","Araminta Meliflua","Hokey"],
    src:"Tome 6, chap. 20", note:"Une vieille collectionneuse, empoisonnée — son elfe Hokey fut accusée." },

  { t:5, q:"Qu'utilise Ombrage comme judas sur la porte de son bureau au Ministère ?",
    c:["L'œil magique de Maugrey","Un miroir à double sens","Un portrait espion","Un Scrutoscope"],
    src:"Tome 7, chap. 13", note:"Harry le récupère — et le rend à sa tombe de fortune." },

  { t:5, q:"Que fait Slughorn pendant l'enterrement d'Aragog ?",
    c:["Il récupère discrètement du venin d'Acromantule","Il pleure sincèrement","Il chante un requiem","Il prend des photos"],
    src:"Tome 6, chap. 22", note:"Denrée rarissime — et le moyen de faire parler Hagrid autour d'une bouteille." },

  { t:5, q:"Quelle annotation accompagne le Sectumsempra dans le manuel du Prince ?",
    c:["« Pour les ennemis »","« Danger de mort »","« Ma plus belle invention »","« Ne jamais utiliser »"],
    src:"Tome 6, chap. 21" },

  { t:5, q:"Quel nom de code Lee Jordan utilise-t-il sur Potterveille ?",
    c:["Rivière","Romulus","Rapière","Ronflak"],
    src:"Tome 7, chap. 22", note:"Romulus, c'est Lupin. Potterveille, la seule radio qui dit la vérité." },

];

/* Utilitaire : questions d'un niveau donné */
function questionsOfTier(t) { return QUESTIONS.filter(q => q.t === t); }
