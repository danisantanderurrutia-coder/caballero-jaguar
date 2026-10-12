// Prueba del motor único de XP:  node tests/progress.test.js
const assert = require("assert");
const store = {};
global.localStorage = { getItem: k => store[k] ?? null, setItem: (k, v) => (store[k] = String(v)) };
global.window = { addEventListener() {}, dispatchEvent() {}, reyJaguarState: { character: { xp: 9999, level: 2 } } };
global.CustomEvent = function () {};
require("../js/core/progress.js");
const P = window.CJProgress;

P.init();                                   // migración: conserva rango 2, XP parte en su umbral
assert.strictEqual(P.totalXP(), 1000, "migración conserva rango 2");
assert.strictEqual(P.levelInfo(P.totalXP()).rank, 2);

P.award({ xp: 50, aura: "foco", desc: "t", key: "a" });
assert.strictEqual(P.award({ xp: 50, aura: "foco", key: "a" }), null, "clave duplicada el mismo día");
assert.strictEqual(P.totalXP(), 1050);
assert.strictEqual(P.recent(1)[0].aura, "mente", "alias foco→mente");

P.revoke({ key: "a" });
assert.strictEqual(P.totalXP(), 1000, "revoke revierte");

for (let i = 0; i < 12; i++) P.award({ xp: 50, aura: "salud" });   // 600 → tope
const e = P.award({ xp: 50, aura: "salud" });
assert.strictEqual(e.xp, 25, "sobre el tope vale la mitad");

assert.strictEqual(P.streakInfo().days, 1, "racha de 1 día");
assert.strictEqual(P.levelInfo(3500).rank, 3);
assert.strictEqual(P.levelInfo(17999).rank, 4);
assert.strictEqual(P.levelInfo(1000).gradeRoman, "I");
assert.strictEqual(P.levelInfo(2800).gradeRoman, "III");
assert.strictEqual(window.reyJaguarState.character.xp, P.totalXP(), "character.xp es derivado");
assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(window.cjToday()));
console.log("✅ progress.js OK — XP total:", P.totalXP());
