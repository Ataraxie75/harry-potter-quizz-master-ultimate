/* ============================================================
   LE GRAND GRIMOIRE — moteur de jeu
   Vanilla JS, aucune dépendance, sauvegarde en localStorage.
   ============================================================ */

"use strict";

/* ---------------- Utilitaires ---------------- */

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function shuffled(arr, rnd = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function todayKey() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------------- État persistant ---------------- */

const SAVE_KEY = "grimoire-hp-v1";

const defaultState = () => ({
  name: null,
  house: null,
  points: 0,          // XP totale (rang)
  cupPoints: 0,       // contribution à la Coupe
  sound: true,
  stats: {
    answered: 0, correct: 0, bestStreak: 0,
    timedBest: 0, suddenBest: 0, gringottsBest: 0,
    dailyPerfects: 0, ascensionWins: 0, t5correct: 0,
  },
  pensine: {},        // { "1": "silver"|"gold", ... } souvenirs restaurés
  daysPlayed: [],     // ["2026-07-05", ...]
  dailyDone: null,    // clé du jour déjà joué
  questsDone: [],     // ids de quêtes accomplies
  cupStart: null,     // date de la Répartition : la Coupe démarre là
});

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw);
    return Object.assign(defaultState(), s, { stats: Object.assign(defaultState().stats, s.stats || {}) });
  } catch { return defaultState(); }
}
function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }

/* ---------------- Rangs ---------------- */

const RANKS = [
  { at: 0,    name: "Élève de Première Année" },
  { at: 250,  name: "Membre du Club de Duel" },
  { at: 600,  name: "Préfète de sa Maison" },
  { at: 1200, name: "Lauréate des B.U.S.E." },
  { at: 2200, name: "Major des A.S.P.I.C." },
  { at: 3500, name: "Ordre de Merlin, Première Classe" },
  { at: 5500, name: "Maîtresse du Lore — niveau J.K.R." },
];
function rankOf(pts) {
  let r = RANKS[0], next = null;
  for (let i = 0; i < RANKS.length; i++) {
    if (pts >= RANKS[i].at) { r = RANKS[i]; next = RANKS[i + 1] || null; }
  }
  return { rank: r, next };
}

/* ---------------- Quêtes ---------------- */

const QUESTS = [
  { id: "firststeps", icon: "🪄", name: "Premiers pas", desc: "Réponds à 10 questions.", reward: 50,
    prog: s => [s.stats.answered, 10] },
  { id: "bookworm", icon: "📖", name: "Rat de bibliothèque", desc: "Réponds à 100 questions.", reward: 200,
    prog: s => [s.stats.answered, 100] },
  { id: "flawless", icon: "🔥", name: "Sans-faute", desc: "Enchaîne 10 bonnes réponses d'affilée.", reward: 150,
    prog: s => [s.stats.bestStreak, 10] },
  { id: "seeker", icon: "⚡", name: "Réflexes d'attrapeuse", desc: "12 bonnes réponses en un Contre-la-Montre.", reward: 150,
    prog: s => [s.stats.timedBest, 12] },
  { id: "survivor", icon: "💀", name: "Survivante", desc: "Atteins 15 bonnes réponses en Mort Subite.", reward: 200,
    prog: s => [s.stats.suddenBest, 15] },
  { id: "chosen", icon: "🌙", name: "Élue des astres", desc: "Réussis un Défi du Jour parfait (5/5).", reward: 100,
    prog: s => [s.stats.dailyPerfects, 1] },
  { id: "ascension", icon: "🌠", name: "L'Ascension accomplie", desc: "Termine l'Ascension avec au moins une vie.", reward: 250,
    prog: s => [s.stats.ascensionWins, 1] },
  { id: "unspeakable", icon: "🔮", name: "Langue-de-plomb", desc: "10 bonnes réponses du Département des Mystères.", reward: 300,
    prog: s => [s.stats.t5correct, 10] },
  { id: "regular", icon: "🦉", name: "Courrier quotidien", desc: "Joue 7 jours différents.", reward: 150,
    prog: s => [s.daysPlayed.length, 7] },
  { id: "houseglory", icon: "🏆", name: "Gloire de ta Maison", desc: "Apporte 2 000 points à ta maison.", reward: 250,
    prog: s => [s.cupPoints, 2000] },
  { id: "pensine", icon: "💭", name: "Gardienne des souvenirs", desc: "Restaure les sept souvenirs de la Pensine.", reward: 400,
    prog: s => [Object.keys(s.pensine || {}).length, 7] },
  { id: "goldmemory", icon: "✨", name: "Souvenir de Vif d'or", desc: "Restaure un souvenir sans la moindre erreur (8/8).", reward: 150,
    prog: s => [Object.values(s.pensine || {}).filter(v => v === "gold").length, 1] },
  { id: "heist", icon: "🐉", name: "Le casse du siècle", desc: "Repars de Gringotts avec un butin d'au moins 800 points.", reward: 300,
    prog: s => [Math.min(s.stats.gringottsBest, 800), 800] },
];

/* Vérifie les quêtes ; renvoie les nouvelles accomplies */
function checkQuests() {
  const fresh = [];
  for (const q of QUESTS) {
    if (state.questsDone.includes(q.id)) continue;
    const [cur, goal] = q.prog(state);
    if (cur >= goal) {
      state.questsDone.push(q.id);
      state.points += q.reward;
      state.cupPoints += q.reward;
      fresh.push(q);
    }
  }
  if (fresh.length) save();
  return fresh;
}

/* ---------------- Sons (WebAudio, zéro fichier) ---------------- */

let audioCtx = null;
function beep(freqs, dur = 0.12, type = "sine", gainV = 0.12) {
  if (!state.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    freqs.forEach((f, i) => {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = type; o.frequency.value = f;
      g.gain.setValueAtTime(gainV, audioCtx.currentTime + i * dur);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + (i + 1) * dur + 0.05);
      o.connect(g).connect(audioCtx.destination);
      o.start(audioCtx.currentTime + i * dur);
      o.stop(audioCtx.currentTime + (i + 1) * dur + 0.1);
    });
  } catch { /* pas de son, pas de drame */ }
}
const sndGood = () => beep([523, 659, 784], 0.09);
const sndBad = () => beep([196, 147], 0.16, "triangle", 0.15);
const sndQuest = () => beep([659, 784, 988, 1319], 0.1);
const sndTick = () => beep([880], 0.05, "square", 0.05);

/* ---------------- Décor : étoiles & bougies ---------------- */

(function decorate() {
  const stars = $("#stars");
  for (let i = 0; i < 90; i++) {
    const s = document.createElement("div");
    s.className = "star";
    const size = Math.random() * 2.2 + 0.8;
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-delay:${Math.random() * 3}s;animation-duration:${2 + Math.random() * 3}s`;
    stars.appendChild(s);
  }
  // Bougies flottantes placées dans les marges latérales, sous la zone
  // du titre, pour encadrer le contenu sans jamais le recouvrir.
  const candleSpots = [
    { l: 3,  t: 40 }, { l: 5,  t: 66 }, { l: 2.5, t: 90 },
    { l: 95, t: 34 }, { l: 93, t: 60 }, { l: 96,  t: 86 },
  ];
  candleSpots.forEach((s, i) => {
    const c = document.createElement("div");
    c.className = "candle";
    c.style.cssText = `left:${s.l}%;top:${s.t}%;animation-delay:${(i * 0.8).toFixed(1)}s`;
    document.body.appendChild(c);
  });
})();

/* ---------------- Navigation ---------------- */

function show(id) {
  $$(".screen").forEach(s => s.classList.remove("active"));
  $("#screen-" + id).classList.add("active");
  window.scrollTo({ top: 0 });
}
$$("[data-nav]").forEach(b => b.addEventListener("click", () => {
  const to = b.dataset.nav;
  if (to === "quests") renderQuests();
  if (to === "cup") renderCup();
  if (to === "home") renderHome();
  if (to === "reserve") renderReserve();
  show(to);
}));

function toast(msg) {
  const t = $("#toast");
  t.innerHTML = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 3200);
}

/* ---------------- Répartition ---------------- */

const HOUSES = {
  gryffondor: { name: "Gryffondor", icon: "🦁" },
  poufsouffle: { name: "Poufsouffle", icon: "🦡" },
  serdaigle: { name: "Serdaigle", icon: "🦅" },
  serpentard: { name: "Serpentard", icon: "🐍" },
};

function finishSorting(houseKey) {
  const name = $("#player-name").value.trim() || "Mystérieuse Sorcière";
  state.name = name;
  state.house = houseKey;
  state.cupStart = Date.now();
  save();
  sndQuest();
  toast(`${HOUSES[houseKey].icon} Le Choixpeau a parlé : <b>${esc(HOUSES[houseKey].name)}</b> !`);
  renderHome();
  show("home");
}
$$(".house-pick button").forEach(b => b.addEventListener("click", () => finishSorting(b.dataset.house)));
$("#hat-decides").addEventListener("click", () => {
  const keys = Object.keys(HOUSES);
  finishSorting(keys[Math.floor(Math.random() * keys.length)]);
});

/* ---------------- Accueil ---------------- */

function renderHome() {
  const h = HOUSES[state.house] || { name: "?", icon: "❔" };
  $("#home-crest").textContent = h.icon;
  $("#home-crest").className = "crest " + (state.house || "");
  $("#home-name").textContent = state.name || "—";
  const { rank, next } = rankOf(state.points);
  $("#home-rank").textContent = rank.name;
  $("#home-pts").textContent = state.points.toLocaleString("fr-FR");
  if (next) {
    const span = next.at - rank.at;
    $("#home-xp").style.width = Math.min(100, Math.round(((state.points - rank.at) / span) * 100)) + "%";
    $("#home-next").textContent = `Prochain rang à ${next.at.toLocaleString("fr-FR")} pts`;
  } else {
    $("#home-xp").style.width = "100%";
    $("#home-next").textContent = "Rang maximal atteint !";
  }
  $("#timed-best").textContent = "Record : " + (state.stats.timedBest || "—");
  $("#sudden-best").textContent = "Record : " + (state.stats.suddenBest || "—");
  $("#gringotts-best").textContent = "Record : " + (state.stats.gringottsBest ? state.stats.gringottsBest + " pts" : "—");
  const restored = Object.keys(state.pensine || {}).length;
  $("#pensine-badge").textContent = restored >= 7 ? "🏅 Mémoire complète !" : `${restored}/7 souvenirs`;
  const dailyPlayed = state.dailyDone === todayKey();
  $("#daily-badge").textContent = dailyPlayed ? "Déjà joué aujourd'hui ✓" : "Nouveau défi ✦";
  $("#mode-daily").classList.toggle("done-today", dailyPlayed);
  $("#btn-sound").textContent = state.sound ? "🔔 Sons : oui" : "🔕 Sons : non";
}

$("#btn-sound").addEventListener("click", () => {
  state.sound = !state.sound; save(); renderHome();
});

/* ---------------- Les sept tomes (mode Pensine) ---------------- */

const TOMES = [
  null,
  { title: "À l'école des sorciers", tag: "Un placard sous l'escalier, et des lettres que personne ne veut te laisser lire…", icon: "⚡" },
  { title: "La Chambre des Secrets", tag: "Quelqu'un a écrit sur le mur. Et la voix dans les murs, personne d'autre ne l'entend.", icon: "🐍" },
  { title: "Le Prisonnier d'Azkaban", tag: "Il s'est échappé. Et on dit qu'il te cherche.", icon: "🌕" },
  { title: "La Coupe de Feu", tag: "Le calice crache un quatrième nom. Le tien.", icon: "🏆" },
  { title: "L'Ordre du Phénix", tag: "Le Ministère nie tout. Alors une armée s'entraîne en secret.", icon: "🐦‍🔥" },
  { title: "Le Prince de Sang-Mêlé", tag: "Un vieux manuel annoté, une tour, un éclair vert.", icon: "📖" },
  { title: "Les Reliques de la Mort", tag: "Trois frères, trois objets, une dernière chasse.", icon: "△" },
];

function tomeOf(q) {
  if (q.src.includes("pilogue")) return 7;
  const m = q.src.match(/Tome (\d)/);
  return m ? Number(m[1]) : 0;
}

/* ---------------- Construction des parties ---------------- */

function pickQuestions(tierSeq, rnd = Math.random) {
  // une question par entrée de tierSeq, sans doublon
  const used = new Set();
  return tierSeq.map(t => {
    const pool = questionsOfTier(t).filter(q => !used.has(q.q));
    const q = pool[Math.floor(rnd() * pool.length)] || questionsOfTier(t)[0];
    used.add(q.q);
    return q;
  });
}

const MODES = {
  ascension: {
    label: "🌠 L'Ascension",
    build: () => ({ questions: pickQuestions([1,1,1,2,2,2,3,3,3,4,4,4,5,5,5]), lives: 3, timed: false }),
  },
  daily: {
    label: "🌙 Défi du Jour",
    build: () => {
      const rnd = mulberry32(hashStr("grimoire-" + todayKey()));
      return { questions: pickQuestions([1,2,3,4,5], rnd), lives: null, timed: false };
    },
  },
  timed: {
    label: "⏳ Contre-la-Montre",
    build: () => ({ questions: null, lives: null, timed: true, seconds: 90 }),
  },
  sudden: {
    label: "💀 Mort Subite",
    build: () => ({ questions: null, lives: 1, timed: false, endless: true }),
  },
  practice: {
    label: "📚 La Bibliothèque",
    build: tier => ({ questions: pickQuestions(Array(10).fill(tier)), lives: null, timed: false, noPoints: true }),
  },
  pensine: {
    label: "💭 La Pensine",
    build: tome => {
      // 8 questions du tome, difficulté croissante — on revit le livre
      const pool = shuffled(QUESTIONS.filter(q => tomeOf(q) === tome));
      const qs = pool.slice(0, 8).sort((a, b) => a.t - b.t);
      return { questions: qs, lives: null, timed: false, tome };
    },
  },
  gringotts: {
    label: "🐉 Le Coffre de Gringotts",
    build: () => ({ questions: null, lives: 1, timed: false, endless: true, vault: true }),
  },
};

/* ---------------- Partie en cours ---------------- */

let game = null;
let timerInt = null;

function startGame(modeKey, opt) {
  const cfg = MODES[modeKey].build(opt);
  game = {
    mode: modeKey,
    label: MODES[modeKey].label,
    questions: cfg.questions,        // null => tirage à la volée (timed / sudden / gringotts)
    endless: !!cfg.endless || !!cfg.timed,
    timed: !!cfg.timed,
    noPoints: !!cfg.noPoints,
    vault: !!cfg.vault,
    tome: cfg.tome || null,
    pot: cfg.vault ? 25 : 0,         // butin de Gringotts (mise de départ)
    lives: cfg.lives,
    seconds: cfg.seconds || 0,
    idx: 0, score: 0, correct: 0, streak: 0, results: [],
    usedQ: new Set(),
    over: false,
  };
  if (modeKey === "daily") { state.dailyDone = todayKey(); save(); }
  markDayPlayed();
  show("quiz");
  if (game.timed) startTimer();
  nextQuestion();
}

function markDayPlayed() {
  const k = todayKey();
  if (!state.daysPlayed.includes(k)) { state.daysPlayed.push(k); save(); }
}

function tierForEndless(i) {
  // montée en difficulté progressive dans les modes sans liste fixe
  if (game && game.vault) return [1, 1, 2, 2, 3, 3, 4, 5][Math.min(i, 7)];
  return Math.min(5, 1 + Math.floor(i / 3));
}

function drawQuestion() {
  if (game.questions) return game.questions[game.idx];
  const t = tierForEndless(game.idx);
  let pool = questionsOfTier(t).filter(q => !game.usedQ.has(q.q));
  if (!pool.length) pool = QUESTIONS.filter(q => !game.usedQ.has(q.q));
  if (!pool.length) { game.usedQ.clear(); pool = questionsOfTier(t); }
  return pool[Math.floor(Math.random() * pool.length)];
}

function totalQuestions() { return game.questions ? game.questions.length : null; }

function nextQuestion() {
  if (game.over) return;
  const total = totalQuestions();
  if (total !== null && game.idx >= total) return endGame(true);

  const q = drawQuestion();
  game.current = q;
  game.usedQ.add(q.q);
  game.answered = false;

  // HUD
  $("#hud-mode").textContent = game.label;
  $("#hud-score").textContent = game.vault ? game.pot : game.score;
  $("#hud-lives").textContent = game.vault ? "💰" : (game.lives !== null && !game.endless ? "❤️".repeat(game.lives) : (game.mode === "sudden" ? "☠️" : ""));
  $("#hud-streak").textContent = game.streak >= 2 ? `🔥 ×${streakMult(game.streak).toFixed(2).replace(".00","")}` : "";
  $("#hud-timer").classList.toggle("hidden", !game.timed);

  // points de progression
  const dots = $("#quiz-dots");
  dots.innerHTML = "";
  if (total !== null) {
    for (let i = 0; i < total; i++) {
      const d = document.createElement("span");
      d.className = "pdot" + (i < game.results.length ? (game.results[i] ? " ok" : " ko") : (i === game.idx ? " now" : ""));
      dots.appendChild(d);
    }
  } else {
    const d = document.createElement("span");
    d.className = "pdot now";
    dots.appendChild(d);
    dots.insertAdjacentHTML("beforeend", `<span style="font-size:.8rem;opacity:.7;margin-left:6px">Question ${game.idx + 1}</span>`);
  }

  // question
  const tier = TIERS[q.t];
  $("#quiz-tier").textContent = `${tier.icon} ${tier.name} — ${tier.pts} pts`;
  $("#quiz-question").textContent = q.q;

  const order = shuffled([0, 1, 2, 3]);
  const box = $("#quiz-answers");
  box.innerHTML = "";
  order.forEach(ci => {
    const b = document.createElement("button");
    b.textContent = q.c[ci];
    b.addEventListener("click", () => answer(b, ci === 0));
    box.appendChild(b);
  });

  $("#quiz-feedback").classList.remove("show");
  $("#btn-next").classList.add("hidden");
  $("#btn-vault-take").classList.add("hidden");
  $("#btn-vault-risk").classList.add("hidden");
}

function streakMult(streak) { return 1 + Math.min(Math.max(streak - 1, 0), 4) * 0.25; } // ×1 → ×2

function answer(btn, ok) {
  if (game.answered || game.over) return;
  game.answered = true;

  const q = game.current;
  $$("#quiz-answers button").forEach(b => {
    b.disabled = true;
    if (b.textContent === q.c[0]) b.classList.add("correct");
    else b.classList.add(b === btn ? "wrong" : "dim");
  });

  state.stats.answered++;
  let gain = 0;

  if (ok) {
    game.correct++;
    game.streak++;
    state.stats.correct++;
    if (q.t === 5) state.stats.t5correct++;
    if (game.streak > state.stats.bestStreak) state.stats.bestStreak = game.streak;
    if (game.vault) {
      game.pot *= 2;               // le butin double !
      game.score = game.pot;
    } else if (!game.noPoints) {
      gain = Math.round(TIERS[q.t].pts * streakMult(game.streak));
      if (game.mode === "sudden") gain = Math.round(gain * (1 + Math.floor(game.idx / 3) * 0.5));
      game.score += gain;
    }
    sndGood();
  } else {
    game.streak = 0;
    if (game.vault) { game.pot = 0; game.score = 0; }  // le dragon garde tout
    if (game.lives !== null) game.lives--;
    sndBad();
  }
  game.results.push(ok);
  save();

  // feedback + source (la clé : chaque réponse cite le livre)
  $("#fb-verdict").textContent = ok
    ? (game.vault
        ? `Le butin double : ${game.pot} points brillent dans le coffre !`
        : ["Dix points pour " + (HOUSES[state.house]?.name || "toi") + " !", "Brillant !", "Exactement !", "Le Choixpeau approuve."][Math.floor(Math.random() * 4)])
    : (game.vault
        ? `Le dragon se réveille ! Le butin est perdu… La bonne réponse était : « ${q.c[0]} »`
        : `Raté… La bonne réponse était : « ${q.c[0]} »`);
  $("#fb-verdict").className = "verdict " + (ok ? "ok" : "ko");
  $("#fb-source").innerHTML = `📖 <b>Source :</b> ${esc(q.src)}` + (q.note ? `<br><span style="opacity:.85">${esc(q.note)}</span>` : "");
  $("#fb-gain").textContent = game.vault ? "" : (gain ? `+${gain} points ✨` : "");
  $("#quiz-feedback").classList.add("show");

  $("#hud-score").textContent = game.vault ? game.pot : game.score;
  if (!game.vault) $("#hud-lives").textContent = game.lives !== null && !game.endless ? "❤️".repeat(Math.max(game.lives, 0)) : (game.mode === "sudden" ? "☠️" : "");

  const dead = game.lives !== null && game.lives <= 0;

  if (game.vault) {
    if (!ok) {
      setTimeout(() => endGame(false), 2000);
    } else if (game.idx >= 7) {
      // fond du coffre atteint : on ne peut que repartir, les bras chargés d'or
      $("#btn-vault-take").textContent = `👑 Vider le coffre : ${game.pot} points !`;
      $("#btn-vault-take").classList.remove("hidden");
    } else {
      $("#btn-vault-take").textContent = `💰 Repartir avec ${game.pot} points`;
      $("#btn-vault-take").classList.remove("hidden");
      $("#btn-vault-risk").classList.remove("hidden");
    }
  } else if (game.timed) {
    // rythme rapide : on enchaîne tout seul
    setTimeout(() => { game.idx++; if (!game.over) nextQuestion(); }, ok ? 900 : 1900);
  } else if (dead) {
    setTimeout(() => endGame(false), 1600);
  } else {
    $("#btn-next").classList.remove("hidden");
    $("#btn-next").focus();
  }
}

$("#btn-vault-take").addEventListener("click", () => endGame(true));
$("#btn-vault-risk").addEventListener("click", () => { game.idx++; nextQuestion(); });

$("#btn-next").addEventListener("click", () => { game.idx++; nextQuestion(); });
$("#btn-quit").addEventListener("click", () => { stopTimer(); endGame(false, true); });

/* ---------------- Chrono ---------------- */

function startTimer() {
  let left = game.seconds;
  const el = $("#hud-timer");
  el.textContent = left + "s";
  el.classList.remove("low", "hidden");
  stopTimer();
  timerInt = setInterval(() => {
    left--;
    el.textContent = left + "s";
    if (left <= 10) { el.classList.add("low"); sndTick(); }
    if (left <= 0) { stopTimer(); endGame(true); }
  }, 1000);
}
function stopTimer() { if (timerInt) { clearInterval(timerInt); timerInt = null; } }

/* ---------------- Fin de partie ---------------- */

function endGame(finished, aborted = false) {
  if (game.over) return;
  game.over = true;
  stopTimer();

  // stats / records par mode
  if (game.mode === "timed" && game.correct > state.stats.timedBest) state.stats.timedBest = game.correct;
  if (game.mode === "sudden" && game.correct > state.stats.suddenBest) state.stats.suddenBest = game.correct;
  if (game.mode === "ascension" && finished && game.lives > 0) state.stats.ascensionWins++;
  if (game.mode === "daily" && game.correct === 5) state.stats.dailyPerfects++;
  if (game.mode === "gringotts" && finished && !aborted && game.pot > state.stats.gringottsBest) state.stats.gringottsBest = game.pot;

  // Pensine : le souvenir est-il restauré ?
  let medal = null;
  if (game.mode === "pensine" && finished && !aborted) {
    if (game.correct === 8) medal = "gold";
    else if (game.correct >= 6) medal = "silver";
    if (medal) {
      const prev = state.pensine[game.tome];
      if (prev !== "gold") state.pensine[game.tome] = medal; // on ne dégrade jamais un Vif d'or
    }
  }

  // gains
  if (!game.noPoints && !aborted) {
    state.points += game.score;
    state.cupPoints += game.score;
  }
  save();

  const fresh = checkQuests();

  // écran de résultat
  const total = totalQuestions();
  const perfect = total !== null && game.correct === total;
  $("#res-emoji").textContent =
    aborted ? "🚪" :
    game.mode === "pensine" ? (medal === "gold" ? "🏅" : medal === "silver" ? "💭" : "🌫️") :
    game.mode === "gringotts" ? (finished ? "💰" : "🐉") :
    perfect ? "🏆" : finished ? "✨" : "💀";
  $("#res-title").textContent =
    aborted ? "Retraite stratégique" :
    game.mode === "pensine" ? (
      medal === "gold" ? "Souvenir gravé en Vif d'or !" :
      medal === "silver" ? "Souvenir restauré !" :
      "Le souvenir se dérobe… il reste trouble.") :
    game.mode === "gringotts" ? (finished ? (game.idx >= 7 ? "LE COFFRE EST VIDE ! Les gobelins n'en reviennent pas." : "Beau casse. File avant qu'ils ne comptent.") : "Le dragon garde son or…") :
    perfect ? "SANS-FAUTE ! Même Hermione applaudit." :
    finished ? "Épreuve terminée !" :
    game.mode === "sudden" ? "L'Avada Kedavra t'a eue…" : "Les vies se sont envolées…";
  $("#res-score").textContent = game.noPoints ? `${game.correct} bonne(s) réponse(s)` : `+${aborted ? 0 : game.score} points`;
  $("#res-line1").textContent = total !== null
    ? `${game.correct} / ${total} bonnes réponses`
    : `${game.correct} bonne(s) réponse(s) en ${game.idx + (game.results.length ? 1 : 0)} question(s)`;
  const { rank } = rankOf(state.points);
  $("#res-line2").textContent = `Total : ${state.points.toLocaleString("fr-FR")} pts — ${rank.name}`;

  const rq = $("#res-quests");
  rq.innerHTML = "";
  fresh.forEach(q => {
    rq.insertAdjacentHTML("beforeend",
      `<div class="new-quest">${q.icon} <b>Quête accomplie : ${esc(q.name)}</b><br>+${q.reward} points bonus !</div>`);
  });
  if (fresh.length) sndQuest();

  $("#btn-replay").onclick = () => {
    if (game.mode === "daily" && state.dailyDone === todayKey()) { renderHome(); show("home"); toast("🌙 Le Défi du Jour ne se joue qu'une fois ! Reviens demain."); return; }
    if (game.mode === "practice") { show("practice"); return; }
    if (game.mode === "pensine") { renderPensine(); show("pensine"); return; }
    startGame(game.mode);
  };
  renderHome();
  show("result");
}

/* ---------------- Quêtes (écran) ---------------- */

function renderQuests() {
  const box = $("#quests-list");
  box.innerHTML = "";
  for (const q of QUESTS) {
    const done = state.questsDone.includes(q.id);
    const [cur, goal] = q.prog(state);
    const pct = Math.min(100, Math.round((cur / goal) * 100));
    box.insertAdjacentHTML("beforeend", `
      <div class="quest ${done ? "done" : ""}">
        <div class="qi">${done ? "✅" : q.icon}</div>
        <div class="qbody">
          <div class="qname">${esc(q.name)}</div>
          <div class="qdesc">${esc(q.desc)}</div>
          <div class="qprog">${done ? "Accomplie !" : `${Math.min(cur, goal)} / ${goal} — ${pct}%`}</div>
        </div>
        <div class="qreward">+${q.reward} pts</div>
      </div>`);
  }
}

/* ---------------- Coupe des Maisons ---------------- */

function cupStandings() {
  // Les maisons rivales marquent des points de façon déterministe,
  // semaine après semaine — la course démarre le jour de TA Répartition.
  const epoch = state.cupStart || Date.now();
  const week = Math.max(1, Math.floor((Date.now() - epoch) / (7 * 24 * 3600 * 1000)) + 1);
  const rows = [];
  for (const key of Object.keys(HOUSES)) {
    let pts = 0;
    for (let w = 1; w <= week; w++) {
      const rnd = mulberry32(hashStr("coupe-" + key + "-" + w));
      pts += 120 + Math.floor(rnd() * 220);
    }
    if (key === state.house) pts = state.cupPoints; // ta maison ne compte que sur TOI
    rows.push({ key, name: HOUSES[key].name, icon: HOUSES[key].icon, pts });
  }
  rows.sort((a, b) => b.pts - a.pts);
  return rows;
}

function renderCup() {
  const rows = cupStandings();
  const max = Math.max(...rows.map(r => r.pts), 1);
  const box = $("#cup-rows");
  box.innerHTML = "";
  rows.forEach((r, i) => {
    box.insertAdjacentHTML("beforeend", `
      <div class="house-row">
        <span class="hname">${i === 0 ? "👑 " : ""}${r.icon} ${esc(r.name)}</span>
        <div class="house-bar hb-${r.key}"><i style="width:${Math.round((r.pts / max) * 100)}%"></i></div>
        <span class="hpts">${r.pts.toLocaleString("fr-FR")}</span>
      </div>`);
  });
  const mine = rows.findIndex(r => r.key === state.house);
  $("#cup-verdict").textContent =
    mine === 0 ? "Ta maison mène la Coupe ! Le sablier déborde !" :
    `Ta maison est ${mine + 1}ᵉ — encore ${(rows[0].pts - rows[mine].pts).toLocaleString("fr-FR")} points pour prendre la tête !`;
}

/* ---------------- Bibliothèque (choix du niveau) ---------------- */

function renderPractice() {
  const box = $("#practice-tiers");
  box.innerHTML = "";
  for (let t = 1; t <= 5; t++) {
    const tier = TIERS[t];
    const n = questionsOfTier(t).length;
    const b = document.createElement("button");
    b.className = "mode-card";
    b.innerHTML = `<span class="mi">${tier.icon}</span><span class="mt">${tier.name}</span>
      <span class="md">${n} questions dans ce rayon.</span>`;
    b.addEventListener("click", () => startGame("practice", t));
    box.appendChild(b);
  }
}

/* ---------------- La Pensine (choix du souvenir) ---------------- */

function renderPensine() {
  const box = $("#pensine-tomes");
  box.innerHTML = "";
  for (let t = 1; t <= 7; t++) {
    const tome = TOMES[t];
    const medal = state.pensine[t];
    const n = QUESTIONS.filter(q => tomeOf(q) === t).length;
    const b = document.createElement("button");
    b.className = "mode-card" + (medal ? " memory-" + medal : "");
    b.innerHTML = `<span class="mi">${tome.icon}</span>
      <span class="mt">Tome ${t} — ${esc(tome.title)}</span>
      <span class="md"><em>${esc(tome.tag)}</em></span>
      <span class="badge">${medal === "gold" ? "🏅 Vif d'or" : medal === "silver" ? "🥈 Restauré" : "🌫️ Souvenir trouble"} · ${n} questions</span>`;
    b.addEventListener("click", () => startGame("pensine", t));
    box.appendChild(b);
  }
}

/* ---------------- La Réserve ---------------- */

let reserveTab = "facts";

function renderReserve() {
  const list = $("#reserve-list");
  const data = reserveTab === "facts"
    ? (typeof RESERVE_FACTS !== "undefined" ? RESERVE_FACTS : [])
    : (typeof RESERVE_THEORIES !== "undefined" ? RESERVE_THEORIES : []);
  $("#tab-facts").className = reserveTab === "facts" ? "btn-gold" : "btn-ghost";
  $("#tab-theories").className = reserveTab === "theories" ? "btn-gold" : "btn-ghost";
  list.innerHTML = "";
  data.forEach((e, i) => {
    const card = document.createElement("div");
    card.className = "reserve-card";
    card.innerHTML = reserveTab === "facts"
      ? `<div class="rc-head">${e.icon || "📜"} <b>${esc(e.title)}</b><span class="rc-arrow">▾</span></div>
         <div class="rc-body"><p>${esc(e.text)}</p><div class="rc-source">🔮 Source : ${esc(e.source)}</div></div>`
      : `<div class="rc-head">🩸 <b>${esc(e.title)}</b><span class="rc-arrow">▾</span></div>
         <div class="rc-body"><p>${esc(e.text)}</p>
           <div class="rc-source">🕸️ Origine : ${esc(e.origin)}</div>
           <div class="rc-status">${esc(e.status)}</div></div>`;
    card.querySelector(".rc-head").addEventListener("click", () => {
      card.classList.toggle("open");
      if (card.classList.contains("open")) sndTick();
    });
    list.appendChild(card);
  });
  if (!data.length) list.innerHTML = "<p style='text-align:center;opacity:.7'>Les grimoires sont encore sous scellés…</p>";
}

$("#tab-facts").addEventListener("click", () => { reserveTab = "facts"; renderReserve(); });
$("#tab-theories").addEventListener("click", () => { reserveTab = "theories"; renderReserve(); });

/* ---------------- Lancement des modes ---------------- */

$$(".mode-card[data-mode]").forEach(card => card.addEventListener("click", () => {
  const m = card.dataset.mode;
  if (m === "daily" && state.dailyDone === todayKey()) {
    toast("🌙 Défi du Jour déjà relevé ! Les astres tireront de nouvelles questions demain.");
    return;
  }
  if (m === "practice") { renderPractice(); show("practice"); return; }
  if (m === "pensine") { renderPensine(); show("pensine"); return; }
  startGame(m);
}));

/* ---------------- Démarrage ---------------- */

if (!state.name || !state.house) {
  show("sorting");
} else {
  renderHome();
  show("home");
}
