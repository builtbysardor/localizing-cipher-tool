/**
 * Cipher logic unit tests
 * Run with: node tests.js
 */

// ── Caesar cipher ──────────────────────────────────────────
function caesarEncrypt(text, shift) {
  return text.toUpperCase().split('').map(ch => {
    if (ch >= 'A' && ch <= 'Z') return String.fromCharCode(((ch.charCodeAt(0) - 65 + shift) % 26) + 65);
    return ch;
  }).join('');
}

function caesarDecrypt(text, shift) {
  return caesarEncrypt(text, 26 - (shift % 26));
}

// ── Vigenère cipher ────────────────────────────────────────
function vigenereEncrypt(text, key) {
  const k = key.toUpperCase().replace(/[^A-Z]/g, '');
  let ki = 0;
  return text.toUpperCase().split('').map(ch => {
    if (ch >= 'A' && ch <= 'Z') {
      const enc = ((ch.charCodeAt(0) - 65 + k.charCodeAt(ki % k.length) - 65) % 26) + 65;
      ki++;
      return String.fromCharCode(enc);
    }
    return ch;
  }).join('');
}

function vigenereDecrypt(text, key) {
  const k = key.toUpperCase().replace(/[^A-Z]/g, '');
  let ki = 0;
  return text.toUpperCase().split('').map(ch => {
    if (ch >= 'A' && ch <= 'Z') {
      const dec = ((ch.charCodeAt(0) - 65 - (k.charCodeAt(ki % k.length) - 65) + 26) % 26) + 65;
      ki++;
      return String.fromCharCode(dec);
    }
    return ch;
  }).join('');
}

// ── Tests ─────────────────────────────────────────────────
let passed = 0, failed = 0;
function assert(cond, msg) {
  if (cond) { console.log(`  ✓ ${msg}`); passed++; }
  else       { console.error(`  ✗ ${msg}`); failed++; }
}

console.log('\n=== Cipher Tests ===\n');

console.log('Caesar cipher:');
assert(caesarEncrypt('HELLO', 3) === 'KHOOR', 'encrypt HELLO shift 3 → KHOOR');
assert(caesarDecrypt('KHOOR', 3) === 'HELLO', 'decrypt KHOOR shift 3 → HELLO');
assert(caesarEncrypt('XYZ', 3) === 'ABC',   'wrap around XYZ shift 3 → ABC');
assert(caesarEncrypt('HELLO', 0) === 'HELLO', 'shift 0 is identity');
assert(caesarEncrypt('HELLO', 26) === 'HELLO', 'shift 26 is identity');

console.log('\nVigenère cipher:');
assert(vigenereEncrypt('HELLO', 'KEY') === 'RIJVS', 'encrypt HELLO key KEY → RIJVS');
assert(vigenereDecrypt('RIJVS', 'KEY') === 'HELLO', 'decrypt RIJVS key KEY → HELLO');
assert(vigenereDecrypt(vigenereEncrypt('ATTACKATDAWN', 'LEMON'), 'LEMON') === 'ATTACKATDAWN', 'roundtrip ATTACKATDAWN');

console.log(`\n=== ${passed} passed, ${failed} failed ===\n`);
process.exit(failed > 0 ? 1 : 0);
