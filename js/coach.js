/* ================================================================
   Mon Coach — logique de l'application
   Vanilla JS, aucune dépendance. Toutes les données sont stockées
   localement (localStorage). Rien ne quitte l'appareil.
   ================================================================ */
"use strict";

/* -------------------- Constantes -------------------- */
const STORE_KEY = "coach.state.v1";

const GOALS = {
  "cut":       { label: "Perte de gras",          factor: 0.80 },
  "cut-light": { label: "Sèche légère",           factor: 0.90 },
  "maintain":  { label: "Maintien",               factor: 1.00 },
  "lean":      { label: "Prise de masse sèche",   factor: 1.10 },
  "bulk":      { label: "Prise de masse",         factor: 1.20 },
};

const MUSCLES = ["Pectoraux", "Dos", "Épaules", "Biceps", "Triceps",
                 "Jambes", "Fessiers", "Abdos", "Mollets", "Avant-bras", "Cardio", "Autre"];

const CONSTRAINT_PRESETS = ["Végétarien", "Végan", "Sans gluten", "Sans lactose",
  "Sans porc", "Halal", "Casher", "Sans fruits de mer", "Sans fruits à coque",
  "Faible en sucre", "Faible en sel"];

const MEALS = ["Petit-déj.", "Déjeuner", "Dîner", "Collation"];

/* -------------------- État -------------------- */
const defaultState = () => ({
  profile: { sex: "male", age: 30, weight: 75, height: 178,
             activity: 1.55, goal: "maintain", proteinPerKg: 2, fatPct: 30 },
  constraints: { tags: [], free: "" },
  exercises: [],      // {id, name, muscle, notes}
  programs: [],       // {id, name, items:[{exerciseId, sets, reps, weight}]}
  sessions: [],       // {id, date, name, programId, exercises:[{exerciseId, name, sets:[{reps,weight}]}], notes}
  activeSession: null,
  food: {},           // { "YYYY-MM-DD": [ {id, name, meal, kcal, protein, carbs, fat} ] }
});

let S = load();

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaultState();
    return Object.assign(defaultState(), JSON.parse(raw));
  } catch (e) { return defaultState(); }
}
function save() { localStorage.setItem(STORE_KEY, JSON.stringify(S)); }

/* -------------------- Utilitaires -------------------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const uid = () => Date.now().toString(36) + Math.floor(performance.now() * 1000 % 1e6).toString(36);
const num = (v, d = 0) => { const n = parseFloat(v); return isFinite(n) ? n : d; };
const round = (n) => Math.round(n);

function todayKey(d = new Date()) {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, "0"), day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function fmtDate(key) {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}
function fmtShort(key) {
  const [y, m, d] = key.split("-").map(Number);
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}`;
}

function el(tag, attrs = {}, children = []) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") n.className = v;
    else if (k === "html") n.innerHTML = v;
    else if (k === "text") n.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined && v !== false) n.setAttribute(k, v);
  }
  (Array.isArray(children) ? children : [children]).forEach(c => {
    if (c == null) return;
    n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  });
  return n;
}
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

let toastTimer;
function toast(msg) {
  const t = $("#toast");
  t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { t.hidden = true; }, 1900);
}

/* -------------------- Modale -------------------- */
function openModal(title, bodyNode) {
  $("#modal-title").textContent = title;
  const body = $("#modal-body");
  body.innerHTML = "";
  body.appendChild(bodyNode);
  $("#modal").hidden = false;
}
function closeModal() { $("#modal").hidden = true; $("#modal-body").innerHTML = ""; }

/* ================================================================
   NUTRITION — calcul des besoins
   Formule de Mifflin-St Jeor pour le métabolisme de base (BMR),
   puis TDEE = BMR × facteur d'activité, ajusté selon l'objectif.
   ================================================================ */
function computeTargets(p = S.profile) {
  const w = num(p.weight), h = num(p.height), a = num(p.age);
  const bmr = p.sex === "female"
    ? 10 * w + 6.25 * h - 5 * a - 161
    : 10 * w + 6.25 * h - 5 * a + 5;
  const tdee = bmr * num(p.activity, 1.55);
  const goal = GOALS[p.goal] || GOALS.maintain;
  const kcal = tdee * goal.factor;

  const protein = num(p.proteinPerKg, 2) * w;         // g
  const fat = (kcal * (num(p.fatPct, 30) / 100)) / 9; // g
  const carbKcal = kcal - protein * 4 - fat * 9;
  const carbs = Math.max(0, carbKcal / 4);            // g

  return {
    bmr: round(bmr), tdee: round(tdee), kcal: round(kcal),
    protein: round(protein), fat: round(fat), carbs: round(carbs),
    goalLabel: goal.label,
  };
}

/* Total nutritionnel d'un jour donné */
function dayTotals(key) {
  const entries = S.food[key] || [];
  return entries.reduce((t, e) => ({
    kcal: t.kcal + num(e.kcal), protein: t.protein + num(e.protein),
    carbs: t.carbs + num(e.carbs), fat: t.fat + num(e.fat),
  }), { kcal: 0, protein: 0, carbs: 0, fat: 0 });
}

/* ================================================================
   NAVIGATION
   ================================================================ */
let currentView = "dash";
function navTo(view) {
  currentView = view;
  $$(".view").forEach(v => v.hidden = v.dataset.view !== view);
  $$(".tabbar button").forEach(b => b.classList.toggle("active", b.dataset.nav === view));
  window.scrollTo(0, 0);
  renderView(view);
}
function renderView(view) {
  if (view === "dash") renderDash();
  else if (view === "train") renderTrain();
  else if (view === "nutri") renderNutri();
  else if (view === "profile") renderProfile();
}

/* ================================================================
   TABLEAU DE BORD
   ================================================================ */
function renderDash() {
  const today = todayKey();
  $("#dash-date").textContent = fmtDate(today);

  const t = computeTargets();
  const eaten = dayTotals(today);
  const remaining = t.kcal - eaten.kcal;

  const cards = $("#dash-cards");
  cards.innerHTML = "";
  cards.appendChild(stat("Objectif", t.kcal, "kcal"));
  cards.appendChild(stat("Consommé", round(eaten.kcal), "kcal"));
  cards.appendChild(stat("Restant", round(remaining), "kcal", remaining < 0 ? "var(--danger)" : "var(--ok)"));

  // Macros
  const macros = $("#dash-macros");
  macros.innerHTML = "";
  macros.appendChild(macroBar("Protéines", eaten.protein, t.protein, "prot"));
  macros.appendChild(macroBar("Glucides", eaten.carbs, t.carbs, "carb"));
  macros.appendChild(macroBar("Lipides", eaten.fat, t.fat, "fat"));

  // Séance du jour
  const w = $("#dash-workout");
  w.innerHTML = "";
  const todaySession = S.sessions.find(s => s.date === today) || (S.activeSession && S.activeSession.date === today ? S.activeSession : null);
  if (S.activeSession) {
    w.appendChild(el("p", { class: "muted", text: "Une séance est en cours." }));
    w.appendChild(el("button", { class: "btn primary block", onclick: () => navTo("train") }, "Reprendre la séance"));
  } else if (todaySession) {
    const totalSets = (todaySession.exercises || []).reduce((n, e) => n + (e.sets || []).length, 0);
    w.appendChild(el("p", { text: `✅ Séance « ${todaySession.name} » enregistrée — ${todaySession.exercises.length} exercices, ${totalSets} séries.` }));
  } else {
    w.appendChild(el("p", { class: "muted", text: "Pas encore de séance aujourd'hui." }));
    w.appendChild(el("button", { class: "btn primary block", onclick: () => { navTo("train"); } }, "Démarrer une séance"));
  }

  // Contraintes
  const cc = $("#dash-constraints-card");
  const all = [...(S.constraints.tags || [])];
  if (S.constraints.free) all.push(S.constraints.free);
  if (all.length) {
    cc.hidden = false;
    const box = $("#dash-constraints");
    box.innerHTML = "";
    (S.constraints.tags || []).forEach(tg => box.appendChild(el("span", { class: "chip static", text: tg })));
    if (S.constraints.free) box.appendChild(el("span", { class: "chip static", text: S.constraints.free }));
  } else {
    cc.hidden = true;
  }
}

function stat(k, v, u, color) {
  return el("div", { class: "stat" }, [
    el("div", { class: "k", text: k }),
    el("div", { class: "v", style: color ? `color:${color}` : "" }, [
      document.createTextNode(String(v) + " "),
      el("span", { class: "u", text: u }),
    ]),
  ]);
}

function macroBar(label, val, target, cls) {
  const pct = target > 0 ? Math.min(100, (val / target) * 100) : 0;
  const over = target > 0 && val > target * 1.05;
  return el("div", { class: "macro-row" }, [
    el("div", { class: "lbl" }, [
      el("span", { text: label }),
      el("b", { text: `${round(val)} / ${round(target)} g` }),
    ]),
    el("div", { class: "bar " + cls + (over ? " over" : "") }, el("i", { style: `width:${pct}%` })),
  ]);
}

/* ================================================================
   ENTRAÎNEMENT
   ================================================================ */
let trainTab = "log";
function renderTrain() {
  $$("#train-tabs button").forEach(b => b.classList.toggle("active", b.dataset.tab === trainTab));
  $$(".subview", $("#view-train")).forEach(v => v.hidden = v.id !== "train-" + trainTab);
  if (trainTab === "log") renderLog();
  else if (trainTab === "programs") renderPrograms();
  else if (trainTab === "library") renderLibrary();
  else if (trainTab === "progress") renderProgress();
}

/* ---- Bibliothèque d'exercices ---- */
function renderLibrary() {
  const list = $("#exercise-list");
  list.innerHTML = "";
  if (!S.exercises.length) {
    list.appendChild(emptyState("🏋", "Aucun exercice.", "Ajoute tes exercices, ils serviront à bâtir tes séances."));
    return;
  }
  // groupé par muscle
  const byMuscle = {};
  S.exercises.forEach(e => { (byMuscle[e.muscle] = byMuscle[e.muscle] || []).push(e); });
  Object.keys(byMuscle).sort().forEach(m => {
    list.appendChild(el("div", { class: "section-title", text: m }));
    byMuscle[m].forEach(e => {
      list.appendChild(el("div", { class: "list-item" }, [
        el("div", { class: "li-head" }, [
          el("div", {}, [
            el("div", { class: "li-title", text: e.name }),
            e.notes ? el("div", { class: "li-sub", text: e.notes }) : null,
          ]),
          el("div", { class: "li-actions" }, [
            el("button", { class: "btn ghost tiny", onclick: () => exerciseForm(e) }, "✎"),
            el("button", { class: "btn ghost tiny", onclick: () => delExercise(e.id) }, "🗑"),
          ]),
        ]),
      ]));
    });
  });
}
function exerciseForm(ex) {
  const isEdit = !!ex;
  const name = el("input", { type: "text", value: ex ? ex.name : "", placeholder: "Ex : Développé couché" });
  const muscle = el("select", {}, MUSCLES.map(m => el("option", { value: m, ...(ex && ex.muscle === m ? { selected: "" } : {}) }, m)));
  const notes = el("textarea", { rows: "2", placeholder: "Consignes, prise, tempo… (optionnel)" }, ex ? ex.notes || "" : "");
  const form = el("div", {}, [
    field("Nom", name),
    field("Groupe musculaire", muscle),
    field("Notes", notes),
    el("button", { class: "btn primary block", onclick: () => {
      if (!name.value.trim()) return toast("Donne un nom à l'exercice.");
      if (isEdit) Object.assign(ex, { name: name.value.trim(), muscle: muscle.value, notes: notes.value.trim() });
      else S.exercises.push({ id: uid(), name: name.value.trim(), muscle: muscle.value, notes: notes.value.trim() });
      save(); closeModal(); renderLibrary(); toast(isEdit ? "Exercice modifié" : "Exercice ajouté");
    } }, isEdit ? "Enregistrer" : "Ajouter"),
  ]);
  openModal(isEdit ? "Modifier l'exercice" : "Nouvel exercice", form);
}
function delExercise(id) {
  if (!confirm("Supprimer cet exercice ?")) return;
  S.exercises = S.exercises.filter(e => e.id !== id);
  S.programs.forEach(p => p.items = p.items.filter(i => i.exerciseId !== id));
  save(); renderLibrary();
}

/* ---- Séances types (programmes) ---- */
function renderPrograms() {
  const list = $("#program-list");
  list.innerHTML = "";
  if (!S.programs.length) {
    list.appendChild(emptyState("📋", "Aucune séance type.", "Crée des modèles de séance (ex : Haut du corps, Jambes) à réutiliser."));
    return;
  }
  S.programs.forEach(p => {
    const names = p.items.map(i => exName(i.exerciseId)).filter(Boolean).join(" · ");
    list.appendChild(el("div", { class: "list-item" }, [
      el("div", { class: "li-head" }, [
        el("div", {}, [
          el("div", { class: "li-title", text: p.name }),
          el("div", { class: "li-sub", text: names || "Aucun exercice" }),
        ]),
        el("div", { class: "li-actions" }, [
          el("button", { class: "btn ghost tiny", onclick: () => programForm(p) }, "✎"),
          el("button", { class: "btn ghost tiny", onclick: () => delProgram(p.id) }, "🗑"),
        ]),
      ]),
      el("button", { class: "btn small", style: "margin-top:10px", onclick: () => startSession(p) }, "▶︎ Démarrer cette séance"),
    ]));
  });
}
function delProgram(id) {
  if (!confirm("Supprimer cette séance type ?")) return;
  S.programs = S.programs.filter(p => p.id !== id);
  save(); renderPrograms();
}
function programForm(prog) {
  const isEdit = !!prog;
  if (!S.exercises.length) { toast("Ajoute d'abord des exercices."); trainTab = "library"; renderTrain(); return; }
  const name = el("input", { type: "text", value: prog ? prog.name : "", placeholder: "Ex : Haut du corps" });
  const items = prog ? prog.items.map(i => ({ ...i })) : [];
  const itemsBox = el("div", {});

  function drawItems() {
    itemsBox.innerHTML = "";
    if (!items.length) itemsBox.appendChild(el("p", { class: "muted", text: "Aucun exercice ajouté." }));
    items.forEach((it, idx) => {
      const sets = el("input", { type: "number", inputmode: "numeric", value: it.sets || 3, style: "text-align:center" });
      const reps = el("input", { type: "text", value: it.reps || "8-12", style: "text-align:center" });
      const weight = el("input", { type: "number", inputmode: "decimal", value: it.weight || "", placeholder: "kg", style: "text-align:center" });
      sets.addEventListener("input", () => it.sets = num(sets.value, 3));
      reps.addEventListener("input", () => it.reps = reps.value);
      weight.addEventListener("input", () => it.weight = num(weight.value));
      itemsBox.appendChild(el("div", { class: "exo-block" }, [
        el("div", { style: "display:flex;justify-content:space-between;align-items:center" }, [
          el("h3", { text: exName(it.exerciseId) }),
          el("button", { class: "rm", style: "color:var(--danger);background:none;border:none;font-size:1.2rem;cursor:pointer", onclick: () => { items.splice(idx, 1); drawItems(); } }, "✕"),
        ]),
        el("div", { class: "grid2", style: "grid-template-columns:1fr 1fr 1fr;gap:8px" }, [
          field("Séries", sets), field("Reps", reps), field("Poids", weight),
        ]),
      ]));
    });
  }
  drawItems();

  const picker = el("select", {}, [el("option", { value: "" }, "＋ Ajouter un exercice…"),
    ...S.exercises.map(e => el("option", { value: e.id }, `${e.name} (${e.muscle})`))]);
  picker.addEventListener("change", () => {
    if (!picker.value) return;
    items.push({ exerciseId: picker.value, sets: 3, reps: "8-12", weight: "" });
    picker.value = ""; drawItems();
  });

  const form = el("div", {}, [
    field("Nom de la séance", name),
    itemsBox,
    field("", picker),
    el("button", { class: "btn primary block", onclick: () => {
      if (!name.value.trim()) return toast("Donne un nom à la séance.");
      if (!items.length) return toast("Ajoute au moins un exercice.");
      if (isEdit) Object.assign(prog, { name: name.value.trim(), items });
      else S.programs.push({ id: uid(), name: name.value.trim(), items });
      save(); closeModal(); renderPrograms(); toast(isEdit ? "Séance modifiée" : "Séance créée");
    } }, isEdit ? "Enregistrer" : "Créer la séance"),
  ]);
  openModal(isEdit ? "Modifier la séance" : "Nouvelle séance type", form);
}

/* ---- Journal / séance en cours ---- */
function startSession(program) {
  if (S.activeSession && !confirm("Une séance est déjà en cours. La remplacer ?")) return;
  const exercises = (program ? program.items : []).map(i => ({
    exerciseId: i.exerciseId,
    name: exName(i.exerciseId),
    target: { sets: i.sets, reps: i.reps, weight: i.weight },
    sets: Array.from({ length: num(i.sets, 3) }, () => ({ reps: i.reps && /^\d+$/.test(i.reps) ? num(i.reps) : "", weight: i.weight || "" })),
  }));
  S.activeSession = {
    id: uid(), date: todayKey(), name: program ? program.name : "Séance libre",
    programId: program ? program.id : null, exercises, notes: "",
  };
  save(); trainTab = "log"; renderTrain();
}
function startEmptySession() {
  // proposer de choisir une séance type ou libre
  const box = el("div", {});
  box.appendChild(el("p", { class: "muted", text: "Choisis une séance type ou pars sur une séance libre." }));
  if (S.programs.length) {
    S.programs.forEach(p => box.appendChild(
      el("button", { class: "btn block", onclick: () => { closeModal(); startSession(p); } }, `▶︎ ${p.name}`)));
  }
  box.appendChild(el("button", { class: "btn primary block", onclick: () => { closeModal(); startSession(null); } }, "＋ Séance libre"));
  openModal("Démarrer une séance", box);
}

function renderLog() {
  const box = $("#active-session");
  box.innerHTML = "";
  const startBtn = $("#btn-start-session");

  if (S.activeSession) {
    startBtn.hidden = true;
    box.appendChild(renderActiveSession());
  } else {
    startBtn.hidden = false;
  }
  renderHistory();
}

function renderActiveSession() {
  const s = S.activeSession;
  const wrap = el("div", { class: "card" });
  wrap.appendChild(el("div", { style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:6px" }, [
    el("h2", { text: "🔴 " + s.name, style: "margin:0" }),
    el("span", { class: "muted", style: "margin:0", text: fmtShort(s.date) }),
  ]));

  s.exercises.forEach((exo, ei) => {
    const block = el("div", { class: "exo-block" });
    block.appendChild(el("div", { style: "display:flex;justify-content:space-between;align-items:center" }, [
      el("h3", { text: exo.name }),
      exo.target ? el("span", { class: "muted", style: "font-size:.78rem", text: `cible ${exo.target.sets}×${exo.target.reps}${exo.target.weight ? " @" + exo.target.weight + "kg" : ""}` }) : null,
    ]));

    const table = el("table", { class: "set-table" });
    table.appendChild(el("tr", {}, [el("th", { text: "#" }), el("th", { text: "Reps" }), el("th", { text: "Poids (kg)" }), el("th", {})]));
    exo.sets.forEach((set, si) => {
      const reps = el("input", { type: "number", inputmode: "numeric", value: set.reps, placeholder: "–" });
      const wt = el("input", { type: "number", inputmode: "decimal", value: set.weight, placeholder: "–" });
      reps.addEventListener("input", () => { set.reps = reps.value; save(); });
      wt.addEventListener("input", () => { set.weight = wt.value; save(); });
      table.appendChild(el("tr", {}, [
        el("td", { text: String(si + 1) }),
        el("td", {}, reps), el("td", {}, wt),
        el("td", {}, el("button", { class: "rm", onclick: () => { exo.sets.splice(si, 1); save(); rerenderActive(); } }, "✕")),
      ]));
    });
    block.appendChild(table);
    block.appendChild(el("button", { class: "btn ghost tiny", style: "margin-top:8px", onclick: () => {
      const last = exo.sets[exo.sets.length - 1] || {};
      exo.sets.push({ reps: last.reps || "", weight: last.weight || "" }); save(); rerenderActive();
    } }, "＋ Série"));
    wrap.appendChild(block);
  });

  // ajouter un exercice à la volée
  if (S.exercises.length) {
    const picker = el("select", { style: "margin-top:6px" }, [el("option", { value: "" }, "＋ Ajouter un exercice…"),
      ...S.exercises.map(e => el("option", { value: e.id }, `${e.name} (${e.muscle})`))]);
    picker.addEventListener("change", () => {
      if (!picker.value) return;
      s.exercises.push({ exerciseId: picker.value, name: exName(picker.value), target: null, sets: [{ reps: "", weight: "" }] });
      save(); rerenderActive();
    });
    wrap.appendChild(picker);
  }

  const notes = el("textarea", { rows: "2", placeholder: "Ressenti, remarques…" }, s.notes || "");
  notes.addEventListener("input", () => { s.notes = notes.value; save(); });
  wrap.appendChild(el("div", { style: "margin-top:12px" }, [field("Notes de séance", notes)]));

  wrap.appendChild(el("div", { class: "row-btns", style: "margin-top:8px" }, [
    el("button", { class: "btn primary", onclick: finishSession }, "✓ Terminer & enregistrer"),
    el("button", { class: "btn danger", onclick: cancelSession }, "Annuler"),
  ]));
  return wrap;
}
function rerenderActive() {
  const box = $("#active-session");
  box.innerHTML = "";
  box.appendChild(renderActiveSession());
}
function finishSession() {
  const s = S.activeSession;
  // ne garder que les séries renseignées
  s.exercises.forEach(exo => {
    exo.sets = exo.sets.filter(set => set.reps !== "" || set.weight !== "");
  });
  s.exercises = s.exercises.filter(exo => exo.sets.length);
  if (!s.exercises.length) return toast("Renseigne au moins une série.");
  delete s.target;
  S.sessions.unshift(s);
  S.activeSession = null;
  save(); renderTrain(); toast("Séance enregistrée 💪");
}
function cancelSession() {
  if (!confirm("Annuler la séance en cours ? Les données saisies seront perdues.")) return;
  S.activeSession = null; save(); renderTrain();
}

function renderHistory() {
  const box = $("#session-history");
  box.innerHTML = "";
  if (!S.sessions.length) {
    box.appendChild(emptyState("📆", "Aucune séance enregistrée.", ""));
    return;
  }
  S.sessions.slice(0, 30).forEach(s => {
    const totalSets = s.exercises.reduce((n, e) => n + e.sets.length, 0);
    const vol = sessionVolume(s);
    box.appendChild(el("div", { class: "list-item" }, [
      el("div", { class: "li-head" }, [
        el("div", {}, [
          el("div", { class: "li-title", text: s.name }),
          el("div", { class: "li-sub", text: `${fmtDate(s.date)} · ${s.exercises.length} exos · ${totalSets} séries${vol ? " · " + round(vol) + " kg volume" : ""}` }),
        ]),
        el("div", { class: "li-actions" }, [
          el("button", { class: "btn ghost tiny", onclick: () => viewSession(s) }, "👁"),
          el("button", { class: "btn ghost tiny", onclick: () => delSession(s.id) }, "🗑"),
        ]),
      ]),
    ]));
  });
}
function sessionVolume(s) {
  return s.exercises.reduce((v, e) => v + e.sets.reduce((sv, set) => sv + num(set.reps) * num(set.weight), 0), 0);
}
function viewSession(s) {
  const box = el("div", {});
  box.appendChild(el("p", { class: "muted", text: fmtDate(s.date) }));
  s.exercises.forEach(exo => {
    const rows = exo.sets.map((set, i) => `${i + 1}. ${set.reps || "–"} reps${set.weight ? " × " + set.weight + " kg" : ""}`).join("<br>");
    box.appendChild(el("div", { class: "exo-block" }, [
      el("h3", { text: exo.name }),
      el("div", { class: "li-sub", html: rows }),
    ]));
  });
  if (s.notes) box.appendChild(el("p", { class: "muted", text: "📝 " + s.notes }));
  openModal(s.name, box);
}
function delSession(id) {
  if (!confirm("Supprimer cette séance de l'historique ?")) return;
  S.sessions = S.sessions.filter(s => s.id !== id);
  save(); renderHistory();
}

/* ---- Progression ---- */
function renderProgress() {
  const sel = $("#progress-select");
  const used = new Set();
  S.sessions.forEach(s => s.exercises.forEach(e => used.add(e.exerciseId)));
  const opts = S.exercises.filter(e => used.has(e.id));
  sel.innerHTML = "";
  if (!opts.length) {
    sel.appendChild(el("option", {}, "—"));
    $("#progress-chart").innerHTML = "";
    $("#progress-records").innerHTML = "";
    $("#progress-chart").appendChild(emptyState("📈", "Pas encore de données.", "Enregistre des séances pour suivre ta progression."));
    return;
  }
  opts.forEach(e => sel.appendChild(el("option", { value: e.id }, e.name)));
  sel.onchange = () => drawProgress(sel.value);
  drawProgress(sel.value);
}
function drawProgress(exerciseId) {
  // collecter le poids max par séance (chronologique)
  const points = [];
  [...S.sessions].reverse().forEach(s => {
    const exo = s.exercises.find(e => e.exerciseId === exerciseId);
    if (!exo) return;
    const maxW = Math.max(0, ...exo.sets.map(set => num(set.weight)));
    const maxReps = Math.max(0, ...exo.sets.map(set => num(set.reps)));
    if (maxW > 0 || maxReps > 0) points.push({ date: s.date, w: maxW, reps: maxReps });
  });

  const chart = $("#progress-chart");
  chart.innerHTML = "";
  if (!points.length) { chart.appendChild(emptyState("📈", "Pas de données pour cet exercice.", "")); $("#progress-records").innerHTML = ""; return; }

  const shown = points.slice(-14);
  const maxVal = Math.max(...shown.map(p => p.w || p.reps));
  const bars = el("div", { class: "spark" });
  shown.forEach(p => {
    const val = p.w || p.reps;
    const h = maxVal > 0 ? (val / maxVal) * 100 : 3;
    bars.appendChild(el("div", { style: `height:${Math.max(3, h)}%` }, el("span", { text: p.w ? p.w + "kg" : p.reps + "r" })));
  });
  const xaxis = el("div", { class: "spark-x" }, shown.map(p => el("div", { text: fmtShort(p.date) })));
  chart.appendChild(el("div", { class: "card" }, [
    el("div", { class: "muted", style: "margin:0 0 4px", text: "Poids max par séance" }),
    bars, xaxis,
  ]));

  // records
  const bestW = Math.max(...points.map(p => p.w));
  const first = points[0], last = points[points.length - 1];
  const recs = $("#progress-records");
  recs.innerHTML = "";
  recs.appendChild(el("div", { class: "cards" }, [
    stat("Record", bestW, "kg"),
    stat("Séances", points.length, ""),
    stat("Dernier", last.w || last.reps, last.w ? "kg" : "reps"),
  ]));
  if (first && last && first.w && last.w && points.length > 1) {
    const diff = last.w - first.w;
    recs.appendChild(el("p", { class: "muted", text: `Depuis le début : ${diff >= 0 ? "+" : ""}${round(diff)} kg (${fmtShort(first.date)} → ${fmtShort(last.date)}).` }));
  }
}

/* ================================================================
   NUTRITION — journal
   ================================================================ */
let nutriDate = todayKey();
function renderNutri() {
  $("#nutri-date").textContent = nutriDate === todayKey() ? "Aujourd'hui" : fmtShort(nutriDate);
  const t = computeTargets();
  const tot = dayTotals(nutriDate);

  const sum = $("#nutri-summary");
  sum.innerHTML = "";
  const remaining = t.kcal - tot.kcal;
  const kpct = t.kcal > 0 ? Math.min(100, (tot.kcal / t.kcal) * 100) : 0;
  sum.appendChild(el("div", { style: "display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:4px" }, [
    el("div", {}, [
      el("div", { style: "font-size:2rem;font-weight:700;line-height:1", text: String(round(tot.kcal)) }),
      el("div", { class: "muted", style: "margin:2px 0 0", text: `/ ${t.kcal} kcal` }),
    ]),
    el("div", { style: `text-align:right;font-weight:700;color:${remaining < 0 ? "var(--danger)" : "var(--ok)"}` }, [
      el("div", { style: "font-size:1.2rem", text: `${remaining >= 0 ? remaining : "+" + (-remaining)}` }),
      el("div", { class: "muted", style: "margin:0", text: remaining >= 0 ? "restantes" : "dépassé" }),
    ]),
  ]));
  sum.appendChild(el("div", { class: "bar kcal" + (remaining < 0 ? " over" : ""), style: "margin-bottom:14px" }, el("i", { style: `width:${kpct}%` })));
  sum.appendChild(macroBar("Protéines", tot.protein, t.protein, "prot"));
  sum.appendChild(macroBar("Glucides", tot.carbs, t.carbs, "carb"));
  sum.appendChild(macroBar("Lipides", tot.fat, t.fat, "fat"));

  renderNutriEntries();
}
function renderNutriEntries() {
  const box = $("#nutri-entries");
  box.innerHTML = "";
  const entries = S.food[nutriDate] || [];
  if (!entries.length) {
    box.appendChild(emptyState("🍽", "Rien de consigné.", "Ajoute ce que tu manges pour suivre tes calories et macros."));
    return;
  }
  MEALS.forEach(meal => {
    const items = entries.filter(e => e.meal === meal);
    if (!items.length) return;
    box.appendChild(el("div", { class: "section-title", text: meal }));
    items.forEach(e => {
      box.appendChild(el("div", { class: "list-item" }, [
        el("div", { class: "li-head" }, [
          el("div", {}, [
            el("div", { class: "li-title", text: e.name }),
            el("div", { class: "li-sub", text: `${round(num(e.kcal))} kcal · P ${round(num(e.protein))} · G ${round(num(e.carbs))} · L ${round(num(e.fat))}` }),
          ]),
          el("div", { class: "li-actions" }, [
            el("button", { class: "btn ghost tiny", onclick: () => foodForm(e) }, "✎"),
            el("button", { class: "btn ghost tiny", onclick: () => delFood(e.id) }, "🗑"),
          ]),
        ]),
      ]));
    });
  });
}
function foodForm(entry) {
  const isEdit = !!entry;
  const name = el("input", { type: "text", value: entry ? entry.name : "", placeholder: "Ex : Poulet + riz" });
  const meal = el("select", {}, MEALS.map(m => el("option", { value: m, ...(entry && entry.meal === m ? { selected: "" } : {}) }, m)));
  const kcal = el("input", { type: "number", inputmode: "numeric", value: entry ? entry.kcal : "", placeholder: "kcal" });
  const prot = el("input", { type: "number", inputmode: "decimal", value: entry ? entry.protein : "", placeholder: "g" });
  const carb = el("input", { type: "number", inputmode: "decimal", value: entry ? entry.carbs : "", placeholder: "g" });
  const fat = el("input", { type: "number", inputmode: "decimal", value: entry ? entry.fat : "", placeholder: "g" });

  // auto-calcul kcal depuis les macros si kcal vide
  const autofill = () => {
    if (kcal.value === "" && (prot.value || carb.value || fat.value)) {
      kcal.value = round(num(prot.value) * 4 + num(carb.value) * 4 + num(fat.value) * 9);
    }
  };
  [prot, carb, fat].forEach(i => i.addEventListener("blur", autofill));

  const consTags = S.constraints.tags || [];
  const consNote = (consTags.length || S.constraints.free)
    ? el("p", { class: "muted", style: "color:var(--warn)", text: "⚠️ Rappel contraintes : " + [...consTags, S.constraints.free].filter(Boolean).join(", ") })
    : null;

  const form = el("div", {}, [
    consNote,
    field("Aliment / plat", name),
    field("Repas", meal),
    field("Calories", kcal),
    el("div", { class: "grid2", style: "grid-template-columns:1fr 1fr 1fr;gap:8px" }, [
      field("Protéines", prot), field("Glucides", carb), field("Lipides", fat),
    ]),
    el("button", { class: "btn primary block", onclick: () => {
      if (!name.value.trim()) return toast("Nomme l'aliment.");
      autofill();
      const data = { name: name.value.trim(), meal: meal.value, kcal: num(kcal.value), protein: num(prot.value), carbs: num(carb.value), fat: num(fat.value) };
      if (isEdit) Object.assign(entry, data);
      else {
        S.food[nutriDate] = S.food[nutriDate] || [];
        S.food[nutriDate].push({ id: uid(), ...data });
      }
      save(); closeModal(); renderNutri(); toast(isEdit ? "Modifié" : "Ajouté");
    } }, isEdit ? "Enregistrer" : "Ajouter"),
  ]);
  openModal(isEdit ? "Modifier l'aliment" : "Ajouter un aliment", form);
}
function delFood(id) {
  S.food[nutriDate] = (S.food[nutriDate] || []).filter(e => e.id !== id);
  save(); renderNutri();
}
function shiftNutriDate(days) {
  const [y, m, d] = nutriDate.split("-").map(Number);
  const dt = new Date(y, m - 1, d + days);
  if (dt > new Date()) return; // pas de futur
  nutriDate = todayKey(dt);
  renderNutri();
}

/* ================================================================
   PROFIL
   ================================================================ */
function renderProfile() {
  const p = S.profile;
  $("#pf-sex").value = p.sex;
  $("#pf-age").value = p.age;
  $("#pf-weight").value = p.weight;
  $("#pf-height").value = p.height;
  $("#pf-activity").value = p.activity;
  $("#pf-goal").value = p.goal;
  $("#pf-protein").value = p.proteinPerKg;
  $("#pf-fatpct").value = p.fatPct;
  renderTargets();

  // contraintes
  const box = $("#constraint-toggles");
  box.innerHTML = "";
  CONSTRAINT_PRESETS.forEach(tag => {
    const on = (S.constraints.tags || []).includes(tag);
    box.appendChild(el("span", { class: "chip" + (on ? " on" : ""), onclick: (e) => {
      e.currentTarget.classList.toggle("on");
    }, "data-tag": tag }, tag));
  });
  $("#pf-constraints-free").value = S.constraints.free || "";
}
function renderTargets() {
  const t = computeTargets();
  const out = $("#targets-out");
  out.innerHTML = "";
  out.appendChild(el("div", { class: "cards" }, [
    stat("Métabolisme", t.bmr, "kcal"),
    stat("Dépense (TDEE)", t.tdee, "kcal"),
    stat("Objectif", t.kcal, "kcal"),
  ]));
  out.appendChild(el("p", { class: "muted", text: `Objectif « ${t.goalLabel} ». Répartition cible :` }));
  out.appendChild(el("div", {}, [
    el("div", { class: "macro-row" }, [el("div", { class: "lbl" }, [el("span", { text: "Protéines" }), el("b", { text: t.protein + " g" })]), el("div", { class: "bar prot" }, el("i", { style: "width:100%" }))]),
    el("div", { class: "macro-row" }, [el("div", { class: "lbl" }, [el("span", { text: "Glucides" }), el("b", { text: t.carbs + " g" })]), el("div", { class: "bar carb" }, el("i", { style: "width:100%" }))]),
    el("div", { class: "macro-row" }, [el("div", { class: "lbl" }, [el("span", { text: "Lipides" }), el("b", { text: t.fat + " g" })]), el("div", { class: "bar fat" }, el("i", { style: "width:100%" }))]),
  ]));
}

/* ================================================================
   Helpers UI
   ================================================================ */
function field(label, input) {
  return el("label", { class: "field" }, [label ? el("span", { text: label }) : null, input]);
}
function emptyState(icon, title, sub) {
  return el("div", { class: "empty" }, [
    el("span", { class: "big", text: icon }),
    el("div", { text: title }),
    sub ? el("div", { class: "muted", style: "margin-top:4px", text: sub }) : null,
  ]);
}
function exName(id) { const e = S.exercises.find(x => x.id === id); return e ? e.name : "(exercice supprimé)"; }

/* ================================================================
   Export / import / reset
   ================================================================ */
function exportData() {
  const blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = el("a", { href: url, download: `mon-coach-${todayKey()}.json` });
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
  toast("Sauvegarde exportée");
}
function importData(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      S = Object.assign(defaultState(), data);
      save(); renderView(currentView); toast("Sauvegarde importée");
    } catch (e) { toast("Fichier invalide"); }
  };
  reader.readAsText(file);
}
function resetAll() {
  if (!confirm("Effacer TOUTES les données (profil, séances, nutrition) ? Irréversible.")) return;
  if (!confirm("Confirmer l'effacement total ?")) return;
  S = defaultState(); save(); renderView(currentView); toast("Données effacées");
}

/* ================================================================
   Câblage des événements
   ================================================================ */
function wire() {
  // navigation
  $$(".tabbar button").forEach(b => b.addEventListener("click", () => navTo(b.dataset.nav)));
  $$("#train-tabs button").forEach(b => b.addEventListener("click", () => { trainTab = b.dataset.tab; renderTrain(); }));

  // modale
  $("#modal-close").addEventListener("click", closeModal);
  $("#modal").addEventListener("click", (e) => { if (e.target.id === "modal") closeModal(); });

  // entraînement
  $("#btn-start-session").addEventListener("click", startEmptySession);
  $("#btn-new-program").addEventListener("click", () => programForm(null));
  $("#btn-new-exercise").addEventListener("click", () => exerciseForm(null));

  // nutrition
  $("#btn-add-food").addEventListener("click", () => foodForm(null));
  $("#nutri-prev").addEventListener("click", () => shiftNutriDate(-1));
  $("#nutri-next").addEventListener("click", () => shiftNutriDate(1));

  // profil
  $("#profile-form").addEventListener("submit", (e) => {
    e.preventDefault();
    S.profile = {
      sex: $("#pf-sex").value, age: num($("#pf-age").value, 30),
      weight: num($("#pf-weight").value, 75), height: num($("#pf-height").value, 178),
      activity: num($("#pf-activity").value, 1.55), goal: $("#pf-goal").value,
      proteinPerKg: num($("#pf-protein").value, 2), fatPct: num($("#pf-fatpct").value, 30),
    };
    save(); renderTargets(); toast("Profil enregistré");
  });
  $("#btn-save-constraints").addEventListener("click", () => {
    S.constraints.tags = $$("#constraint-toggles .chip.on").map(c => c.getAttribute("data-tag"));
    S.constraints.free = $("#pf-constraints-free").value.trim();
    save(); toast("Contraintes enregistrées");
  });

  // données
  $("#btn-export").addEventListener("click", exportData);
  $("#btn-import").addEventListener("click", () => $("#import-file").click());
  $("#import-file").addEventListener("change", (e) => { if (e.target.files[0]) importData(e.target.files[0]); });
  $("#btn-reset").addEventListener("click", resetAll);
}

/* ================================================================
   Démarrage
   ================================================================ */
wire();
navTo("dash");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
