/* ============================================================
   LA RÉSERVE — la section interdite de la bibliothèque
   ------------------------------------------------------------
   ATTENTION : ici, on quitte volontairement le canon strict des
   sept romans. Les GRIMOIRES rassemblent le lore étendu, vérifié
   et sourcé (Pottermore / Wizarding World, interviews publiques
   de J.K. Rowling). Les MANUSCRITS INTERDITS recueillent des
   théories de fans célèbres et RÉELLES (Reddit, Tumblr, forums),
   avec leur origine et leur statut — jamais présentées comme des
   faits. Contenu vérifié en ligne avant admission.
   ============================================================ */

// ═══════════════════════════════════════════════════════════════════════
// LA RÉSERVE — Section interdite de la bibliothèque
// Volet 1 : Les Grimoires du Lore Étendu (faits vérifiés hors romans)
// Volet 2 : Les Manuscrits Interdits (théories de fans célèbres et réelles)
// Chaque entrée a été vérifiée et sourcée. Chut... on chuchote, ici.
// ═══════════════════════════════════════════════════════════════════════

const RESERVE_FACTS = [
  {
    icon: "🕯️",
    title: "Le secret de Dumbledore",
    text: "Le 19 octobre 2007, devant une salle comble au Carnegie Hall de New York, J.K. Rowling lâche une phrase qui fait se lever la foule : « J'ai toujours pensé que Dumbledore était gay. » Le grand directeur fut éperdument amoureux de Gellert Grindelwald, ce jeune homme aussi brillant que lui... qui le trahit terriblement. Sa plus grande histoire d'amour fut aussi sa plus grande tragédie.",
    source: "J.K. Rowling, Q&A au Carnegie Hall, 19 octobre 2007"
  },
  {
    icon: "👻",
    title: "Mimi avait un nom de famille",
    text: "La fantôme éplorée des toilettes des filles s'appelait de son vivant Myrtle Elizabeth Warren. J.K. Rowling l'a révélé dans un tweet du 11 mai 2015 — avant de devoir préciser, hilare, que cela n'avait strictement rien à voir avec la sénatrice américaine Elizabeth Warren : « Elizabeth » est simplement un deuxième prénom très britannique.",
    source: "Tweet de J.K. Rowling, 11 mai 2015"
  },
  {
    icon: "⚖️",
    title: "Madame la Ministre Granger",
    text: "Après la guerre, Hermione entre au Département de contrôle et de régulation des créatures magiques, où elle révolutionne le sort des elfes de maison, puis fait abroger les lois pro-sang-pur au Département de la justice magique. Couronnement de carrière : elle devient Ministre de la Magie, comme le confirme L'Enfant Maudit. La Miss-je-sais-tout a fini par tout diriger.",
    source: "Interviews J.K. Rowling 2007 ; Harry Potter et l'Enfant Maudit, 2016"
  },
  {
    icon: "🛡️",
    title: "Le plus jeune chef des Aurors",
    text: "Harry n'a jamais passé ses ASPIC — et pourtant. Recruté directement par le ministre Kingsley Shacklebolt après la bataille de Poudlard, il révolutionne le Bureau des Aurors avec Ron, puis en prend la tête en 2007, à seulement 26 ans. Le plus jeune directeur jamais nommé à ce poste.",
    source: "Interviews J.K. Rowling, 2007 ; écrits Pottermore/Wizarding World"
  },
  {
    icon: "🦄",
    title: "Luna, Madame Scamander",
    text: "La rêveuse de Serdaigle a épousé Rolf Scamander, naturaliste comme elle et petit-fils de Norbert Dragonneau, l'auteur des Animaux fantastiques. Ensemble, ils parcourent le monde à la recherche de créatures étranges et ont eu des jumeaux, Lorcan et Lysander. Qui d'autre que Luna pouvait entrer dans la famille du plus grand magizoologiste du monde ?",
    source: "Révélations de J.K. Rowling, 2007 ; Pottermore"
  },
  {
    icon: "🧡",
    title: "Un fils nommé Fred",
    text: "George Weasley a épousé Angelina Johnson, l'ancienne poursuiveuse de Gryffondor... et l'ex-cavalière de Fred au bal de Noël. Leur premier fils porte le prénom du jumeau tombé à la bataille de Poudlard : Fred. Dans la boutique Weasley, Farces pour sorciers facétieux, un deuxième Fred a donc grandi au milieu des feux d'artifice.",
    source: "Révélations de J.K. Rowling, 2007 (webchat Bloomsbury et interviews)"
  },
  {
    icon: "💔",
    title: "L'aveu qui a secoué le fandom",
    text: "En février 2014, interviewée par Emma Watson elle-même pour le magazine Wonderland, J.K. Rowling avoue avoir écrit le couple Ron/Hermione « par accomplissement d'un désir personnel », en s'accrochant à son intrigue de départ « pour des raisons très personnelles, pas pour des raisons de crédibilité ». Emma Watson acquiesce : certains fans se demandent si Ron aurait vraiment pu la rendre heureuse. Le fandom, lui, ne s'en est jamais remis.",
    source: "Interview par Emma Watson, magazine Wonderland, février 2014"
  },
  {
    icon: "🌫️",
    title: "Les Détraqueurs sont nés d'une dépression",
    text: "Ces créatures qui aspirent toute joie ne sortent pas de nulle part : J.K. Rowling a confié qu'elles sont l'incarnation « entièrement consciente » de sa propre dépression, vécue dans les années les plus sombres de sa vie. Elle la décrit comme « l'absence d'espoir » : l'incapacité totale d'imaginer qu'on sera à nouveau heureux un jour. Le Patronus, lui, est le souvenir heureux qui vous ramène à la vie.",
    source: "Interview au Times, 30 juin 2000 (et interviews ultérieures)"
  },
  {
    icon: "🤫",
    title: "On prononce mal « Voldemort » depuis le début",
    text: "En septembre 2015, J.K. Rowling confirme dans un tweet ce que peu de gens savaient : le « t » final de Voldemort est muet, à la française. Le nom vient de « vol de mort ». Jim Dale, le narrateur des livres audio, le prononçait d'ailleurs correctement... avant de s'aligner sur les films. « Je pensais être la seule à le prononcer ainsi », s'est amusée l'autrice.",
    source: "Tweet de J.K. Rowling, septembre 2015"
  },
  {
    icon: "🐈",
    title: "Pattenrond n'est pas un simple chat",
    text: "Si le chat d'Hermione a démasqué Croûtard dès le premier regard, c'est qu'il est à moitié Fléreur — une créature magique féline douée d'une intelligence remarquable et d'un flair infaillible pour détecter les individus louches. Voilà pourquoi il détestait le « rat » de Ron et faisait confiance au chien noir : il avait tout compris avant tout le monde.",
    source: "Écrit de J.K. Rowling sur Pottermore"
  },
  {
    icon: "☂️",
    title: "Hagrid ne peut pas produire de Patronus",
    text: "Quand un fan demanda à J.K. Rowling quelle forme prendrait le Patronus de Hagrid, la réponse tomba, déchirante : « Hagrid ne pouvait pas produire de Patronus. C'est un sortilège très difficile. » Le demi-géant au cœur immense, expulsé de Poudlard en troisième année avec sa baguette brisée, n'a jamais pu maîtriser cette magie-là.",
    source: "Tweet de J.K. Rowling, août 2015"
  },
  {
    icon: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    title: "Le cœur brisé de Minerva McGonagall",
    text: "Avant d'être la plus stricte des professeures, Minerva fut une joueuse de Quidditch douée à Gryffondor — jusqu'à une faute brutale contre Serpentard qui lui laissa des côtes cassées et une envie tenace de voir Serpentard écrasé sur le terrain. À dix-huit ans, elle tomba follement amoureuse d'un Moldu, Dougal McGregor, fils de fermier écossais. Elle refusa sa demande en mariage pour ne pas renoncer à la magie, et ne s'en remit jamais tout à fait.",
    source: "Écrit de J.K. Rowling « Professor McGonagall », Pottermore"
  },
  {
    icon: "💰",
    title: "La fortune des Potter ? Une potion capillaire",
    text: "Les Potter descendent d'Ignotus Peverell, le troisième frère du conte, d'où la cape d'invisibilité transmise de génération en génération. Mais leur or, lui, vient d'ailleurs : Fleamont Potter, le grand-père de Harry, a quadruplé la fortune familiale en inventant la potion capillaire Sleekeazy, celle-là même qu'Hermione utilisera au bal de Noël. L'ironie : ni Fleamont ni son fils James n'ont jamais réussi à aplatir leurs propres cheveux.",
    source: "Écrit de J.K. Rowling « The Potter Family », Pottermore, 2015"
  },
  {
    icon: "🐺",
    title: "Teddy Lupin, l'orphelin qui a réussi",
    text: "Fils de Remus Lupin et de Nymphadora Tonks, tous deux tombés à la bataille de Poudlard, Teddy fut élevé par sa grand-mère Andromeda, avec Harry pour parrain très présent. Métamorphmage comme sa mère (et sans une once de lycanthropie), il fut réparti à Poufsouffle et devint préfet-en-chef de Poudlard — J.K. Rowling l'a glissé dans un tweet, en taquinant au passage la répartition des enfants Potter.",
    source: "Tweet de J.K. Rowling, 2015 ; Pottermore"
  },
  {
    icon: "🎀",
    title: "Ombrage a existé (ou presque)",
    text: "Dans un essai publié sur Pottermore pour Halloween 2014, J.K. Rowling avoue qu'Ombrage — « l'un des personnages pour lesquels j'éprouve la détestation la plus pure » — est inspirée d'une vraie personne qu'elle a « détestée au premier regard », qui lui enseigna jadis une certaine discipline. Détail qui a tout déclenché : son goût prononcé pour les accessoires mièvres, dont une petite barrette en plastique jaune pâle « digne d'une fillette de trois ans ».",
    source: "Essai de J.K. Rowling sur Ombrage, Pottermore, octobre 2014"
  },
  {
    icon: "📜",
    title: "Les « Quarante Originaux »",
    text: "Dans l'un de ses tout premiers carnets, au début des années 1990, J.K. Rowling a dressé la liste complète des quarante élèves de la promotion de Harry — noms, maisons et statut du sang notés de sa main, avec de petits symboles pour chaque enfant. On y croise déjà Hermione, Neville, Drago... et des versions abandonnées, comme un certain « Gary » Potter du brouillon primitif. Elle a dévoilé cette liste, « the Original Forty », dans un écrit Pottermore.",
    source: "Écrit de J.K. Rowling « The Original Forty », Pottermore"
  }
];

const RESERVE_THEORIES = [
  {
    title: "Dumbledore est la Mort",
    text: "Relis le Conte des trois frères : Voldemort est l'aîné, qui voulait une baguette invincible et mourut par orgueil. Rogue est le cadet, rongé par le deuil d'un amour perdu. Harry est Ignotus, le troisième frère, qui reçut la cape d'invisibilité... des mains de Dumbledore. Et à King's Cross, entre la vie et la mort, qui accueille Harry « comme un vieil ami » ? Dumbledore. Interrogée sur sa théorie de fans préférée, J.K. Rowling a désigné celle-ci.",
    origin: "Tumblr/Reddit, popularisée vers 2015",
    status: "Saluée par J.K. Rowling"
  },
  {
    title: "Le message caché dans la première question de Rogue",
    text: "« Que se passe-t-il si on ajoute de la racine d'asphodèle en poudre à une infusion d'armoise ? » Dans le langage victorien des fleurs, l'asphodèle — une variété de lys, comme Lily — signifie « mes regrets te suivent jusqu'à la tombe », et l'armoise symbolise l'absence et le chagrin amer. La toute première phrase de Rogue à Harry serait donc un aveu codé : « Je regrette amèrement la mort de Lily. » Frisson garanti... mais J.K. Rowling n'a jamais confirmé l'avoir voulu.",
    origin: "Tumblr, ~2015",
    status: "Jamais tranchée — à toi de juger"
  },
  {
    title: "Knight2King : Ron est Dumbledore",
    text: "Avant la sortie du tome 7, la théorie « Knight2King » enflammait les forums : Ron serait Dumbledore revenu du futur pour guider Harry. Les indices ? Aux échecs géants du tome 1, Ron est le cavalier (knight) mais joue en stratège, comme Dumbledore dirige la guerre ; tous deux sont roux (jadis, pour Dumbledore), grands, et raffolent des sucreries. J.K. Rowling a pris la peine de la démentir elle-même en avril 2005 : « Votre inventivité est sans limites... mais c'est faux. »",
    origin: "Fandom en ligne (LiveJournal et site knight2king), ~2004-2005",
    status: "Démentie officiellement"
  },
  {
    title: "Harry est devenu immortel",
    text: "« Aucun d'eux ne peut vivre tant que l'autre survit », dit la prophétie. Des fans en ont tiré une lecture vertigineuse : si seul Voldemort pouvait tuer Harry, alors depuis la mort du mage noir... plus rien ne peut tuer Harry. Le Survivant aurait sacrifié sa propre mort — condamné à voir disparaître tous ceux qu'il aime. L'Enfant Maudit montre certes un Harry vieillissant et vulnérable, mais la lettre de la prophétie continue de faire débat dans le fandom.",
    origin: "Forums de fans, avant la sortie du tome 7 (2007)",
    status: "Jamais tranchée — à toi de juger"
  },
  {
    title: "La malédiction du poste de Défense contre les forces du Mal",
    text: "Depuis que Dumbledore a refusé le poste à Tom Jedusor, aucun professeur de Défense contre les forces du Mal n'a tenu plus d'un an. Les fans ont longtemps parié que le mauvais sort ne pouvait se briser qu'avec la mort de son lanceur — et J.K. Rowling leur a donné raison : après la chute de Voldemort, la malédiction s'est levée et le poste est redevenu aussi stable que les autres. Une théorie devenue quasi-canon.",
    origin: "Forums de fans, années 2000 ; confirmée au webchat Bloomsbury, juillet 2007",
    status: "Saluée par J.K. Rowling"
  },
  {
    title: "Drago Malefoy est un loup-garou",
    text: "Dans le tome 6, Drago est pâle, malade, absent des cours, et Fenrir Greyback — le loup-garou qui a mordu Lupin enfant — fréquente le manoir Malefoy et semble le connaître. Pour certains fans, Voldemort aurait fait mordre Drago pour punir l'échec de Lucius. La théorie, brillamment argumentée sur Tumblr, a fait tant de bruit que J.K. Rowling a fini par trancher sur Twitter : « Drago n'est définitivement pas un loup-garou. »",
    origin: "Tumblr, ~2014",
    status: "Démentie officiellement"
  },
  {
    title: "Hagrid, Mangemort infiltré",
    text: "Un pavé de près de 10 000 mots posté sur Reddit, puis des vidéos des SuperCarlinBrothers, ont rendu célèbre cette théorie iconoclaste : Hagrid aurait secrètement servi Voldemort. Les « preuves » : il aide Harry à chaque tâche du Tournoi (dont Voldemort a besoin que Harry gagne), il l'expose sans cesse à des créatures mortelles, et il fut mêlé jadis à l'affaire de la Chambre des Secrets. Même son auteur admet que c'est « pour le plaisir »... mais les indices s'empilent troublamment.",
    origin: "Reddit (u/Whoofph), popularisée sur YouTube par les SuperCarlinBrothers",
    status: "Jamais tranchée — à toi de juger"
  },
  {
    title: "Les Dursley, empoisonnés par un Horcruxe",
    text: "Et si les Dursley étaient odieux... parce qu'ils ont hébergé un Horcruxe vivant pendant dix ans ? On a vu ce que le médaillon de Serpentard faisait à Ron en quelques jours : rancœur, paranoïa, méchanceté. Imagine seize ans avec le fragment d'âme logé dans Harry. Séduisante, la théorie a conquis Reddit — mais l'écrit de J.K. Rowling sur Pottermore donne une tout autre explication : la jalousie dévorante de Pétunia et l'insécurité de Vernon, bien humaines, suffisaient.",
    origin: "Reddit, ~2015",
    status: "Démentie officiellement"
  },
  {
    title: "La cicatrice a la forme du sortilège qui l'a créée",
    text: "Pourquoi un éclair ? Selon cette théorie, la cicatrice de Harry reproduirait le mouvement de baguette de l'Avada Kedavra — un zigzag sec, tel qu'illustré dans certains supports officiels du Wizarding World. La marque ne serait pas un hasard : le sortilège de mort aurait littéralement gravé son propre geste dans la chair de Harry en ricochant. J.K. Rowling, elle, a toujours dit avoir choisi l'éclair parce que c'était « une forme cool »... sans jamais commenter cette coïncidence troublante.",
    origin: "Reddit et forums, devenue virale en 2019",
    status: "Jamais tranchée — à toi de juger"
  },
  {
    title: "J.K. Rowling est Rita Skeeter",
    text: "Renvoyée de la Gazette du sorcier, ruinée et rancunière, Rita Skeeter serait passée du côté moldu pour se venger : tout révéler, dans sept volumes, sous le pseudonyme de « J.K. Rowling ». Le plan aurait échoué de la plus délicieuse des manières — les Moldus ont pris l'histoire pour de la fiction, et le monde sorcier ne peut rien faire sans se dévoiler. Pendant ce temps, Rita est devenue riche et célèbre chez les Moldus. La théorie culte de Tumblr, vertigineusement méta.",
    origin: "Tumblr (harrypotterfantheories), ~2014",
    status: "Jamais tranchée — à toi de juger"
  },
  {
    title: "Harry n'a jamais quitté le placard sous l'escalier",
    text: "La plus sombre de toutes : maltraité et affamé, le petit Harry aurait sombré dans la folie dans son placard, et les sept tomes ne seraient que le monde imaginaire qu'il s'est construit pour survivre. Le plus troublant ? Interrogée en 2012 lors d'une conversation avec le scénariste Steve Kloves, J.K. Rowling a qualifié l'idée de « remarquable », confiant qu'on la lui avait déjà suggérée plusieurs fois... sans jamais la démentir. Elle qui démonte tant de théories a laissé celle-ci en suspens.",
    origin: "Reddit et forums, avant 2012",
    status: "Jamais tranchée — à toi de juger"
  },
  {
    title: "Le Choixpeau s'est trompé d'Élu",
    text: "La prophétie désignait deux garçons nés fin juillet de parents ayant défié trois fois Voldemort : Harry... et Neville. Cette théorie va plus loin : le Choixpeau aurait voulu envoyer Harry à Serpentard (il a dû supplier pour y échapper) et a dû batailler longuement avec Neville, qui se croyait indigne de Gryffondor. Le « vrai » Gryffondor de la prophétie serait Neville — seul autre élève à avoir tiré l'épée de Godric du Choixpeau, et c'est lui qui détruit le dernier Horcruxe. Deux Élus, un seul marqué.",
    origin: "Forums et essais de fans (Beyond Hogwarts), après 2005",
    status: "Jamais tranchée — à toi de juger"
  }
];
