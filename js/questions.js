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
];

/* Utilitaire : questions d'un niveau donné */
function questionsOfTier(t) { return QUESTIONS.filter(q => q.t === t); }
