const fs = require('fs');
const file = 'd:/Unity/Finished Projects/Words Wonderland/words-wonderland-landing.html';

// Read as latin1 so raw bytes are preserved 1:1 as char codes
let c = fs.readFileSync(file, 'latin1');

// Map: garbled latin1 sequence -> HTML entity replacement
// Each garbled sequence = UTF-8 bytes of original emoji read as latin1
const map = [
  // Typography
  ['\u00e2\u0080\u0094', '&mdash;'],           // em-dash —
  ['\u00e2\u0080\u009c', '&ldquo;'],           // left "
  ['\u00e2\u0080\u009d', '&rdquo;'],           // right "
  ['\u00e2\u0080\u00a6', '&hellip;'],          // ellipsis …
  ['\u00c2\u00a9', '&copy;'],                  // © 
  ['\u00c3\u0097', '&times;'],                 // ×
  ['\u00e2\u0086\u0092', '&rarr;'],            // →
  ['\u00e2\u0080\u008d', '&#8205;'],           // ZWJ (zero-width joiner)
  // Variation selector FE0F (strip it)
  ['\u00ef\u00b8\u008f', ''],
  // 3-byte symbols
  ['\u00e2\u00ad\u0090', '&#11088;'],          // ⭐
  ['\u00e2\u009c\u00a8', '&#10024;'],          // ✨
  ['\u00e2\u009c\u00a6', '&#10022;'],          // ✦
  ['\u00e2\u00ac\u0087', '&#11015;'],          // ⬇
  ['\u00e2\u00b1', '&#9203;'],                 // ⏱
  ['\u00e2\u009c\u0095', '&#10005;'],          // ✕
  ['\u00e2\u008c\u00a8', '&#9000;'],           // ⌨
  ['\u00e2\u009b\u00b0', '&#9968;'],           // ⛰
  ['\u00e2\u009c\u008f', '&#9999;'],           // ✏
  // 4-byte emoji (F0 9F ...)
  ['\u00f0\u009f\u008e\u00ae', '&#127918;'],   // 🎮
  ['\u00f0\u009f\u008e\u00b2', '&#127922;'],   // 🎲
  ['\u00f0\u009f\u008e\u00a8', '&#127912;'],   // 🎨
  ['\u00f0\u009f\u008c\u009f', '&#127775;'],   // 🌟
  ['\u00f0\u009f\u008c\u00bf', '&#127807;'],   // 🌿
  ['\u00f0\u009f\u008c\u00b2', '&#127794;'],   // 🌲
  ['\u00f0\u009f\u008c\u0090', '&#127760;'],   // 🌐
  ['\u00f0\u009f\u0092\u00ab', '&#128171;'],   // 💫
  ['\u00f0\u009f\u0086\u0093', '&#127379;'],   // 🆓
  ['\u00f0\u009f\u009a\u0080', '&#128640;'],   // 🚀
  ['\u00f0\u009f\u009a\u00ab', '&#128683;'],   // 🚫
  ['\u00f0\u009f\u008f\u0086', '&#127942;'],   // 🏆
  ['\u00f0\u009f\u009b\u00a1', '&#128737;'],   // 🛡
  ['\u00f0\u009f\u0094\u008a', '&#128266;'],   // 🔊
  ['\u00f0\u009f\u0094\u00a4', '&#128292;'],   // 🔤
  ['\u00f0\u009f\u0094\u00a5', '&#128293;'],   // 🔥
  ['\u00f0\u009f\u0093\u009a', '&#128218;'],   // 📚
  ['\u00f0\u009f\u0093\u0096', '&#128214;'],   // 📖
  ['\u00f0\u009f\u0090\u00a7', '&#128039;'],   // 🐧
  ['\u00f0\u009f\u00a6\u008a', '&#129418;'],   // 🦊
  ['\u00f0\u009f\u00a6\u0089', '&#129497;'],   // 🦉
  ['\u00f0\u009f\u0091\u00a8', '&#128104;'],   // 👨
  ['\u00f0\u009f\u0092\u00bb', '&#128187;'],   // 💻
];

let count = 0;
for (const [bad, good] of map) {
  const before = c;
  c = c.split(bad).join(good);
  if (c !== before) count++;
}

// Write back as latin1 — all replacements are ASCII entities, safe
fs.writeFileSync(file, c, 'latin1');
console.log('Fixed ' + count + ' patterns. Done.');
