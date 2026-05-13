// ===== CryptaVault — Cipher Engine & Animations =====
document.addEventListener('DOMContentLoaded', () => {
    initLocalization();
    initMatrixBg();
    initNavigation();
    initCaesarCipher();
    initVigenereCipher();
    initExtendedCiphers();
    initCryptoLab();
    initStatePersistence();
    initVisualizer();
    initAlphabetGrid();
    initHeroWheel();
    initCounters();
    initScrollAnimations();
});

// ===== Matrix Background =====
function initMatrixBg() {
    const c = document.getElementById('matrixCanvas');
    if (!c) return;
    const ctx = c.getContext('2d');
    c.width = window.innerWidth; c.height = window.innerHeight;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789αβγδ';
    const sz = 14, cols = Math.floor(c.width / sz);
    const drops = Array(cols).fill(1);
    function draw() {
        ctx.fillStyle = 'rgba(10,10,15,0.05)';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.fillStyle = '#00F0FF';
        ctx.font = sz + 'px JetBrains Mono';
        for (let i = 0; i < cols; i++) {
            const ch = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(ch, i * sz, drops[i] * sz);
            if (drops[i] * sz > c.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
        requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener('resize', () => { c.width = window.innerWidth; c.height = window.innerHeight; });
}

// ===== Localization =====
const TRANSLATIONS = {
    en: {
        brand: "CryptaVault",
        heroBadge: "🔐 Classical Cryptography Explorer",
        heroTitle1: "The Art of",
        heroTitle2: "Secret Writing",
        heroSubtitle: "Explore Caesar & Vigenere ciphers — the foundations of modern cryptography.",
        startBtn: "Start Encrypting",
        learnBtn: "Learn History",
        caesar: "Caesar Cipher",
        vigenere: "Vigenere Cipher",
        extended: "Extended Ciphers",
        lab: "Crypto Lab",
        history: "History"
    },
    uz: {
        brand: "KriptaVult",
        heroBadge: "🔐 Klassik Kriptografiya Tadqiqotchisi",
        heroTitle1: "Maxfiy Yozish",
        heroTitle2: "San'ati",
        heroSubtitle: "Sezar va Vijener shifrlarini o'rganing — zamonaviy kriptografiyaning poydevori.",
        startBtn: "Shifrlashni Boshlash",
        learnBtn: "Tarixni O'rganish",
        caesar: "Sezar Shifri",
        vigenere: "Vijener Shifri",
        extended: "Kengaytirilgan Shifrlar",
        lab: "Kripto Laboratoriya",
        history: "Tarix",
        encrypt: "Shifrlash",
        decrypt: "Deshifrlash",
        inputText: "Matnni kiriting",
        result: "Natija",
        process: "Bajarish",
        shift: "Siljitish",
        keyword: "Kalit so'z",
        historyTitle: "Yaqindagi harakatlar",
        clear: "Tozalash",
        copy: "Nusxa olish",
        share: "Ulashish"
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

function initLocalization() {
    const btn = document.getElementById('langToggle');
    if (btn) {
        btn.textContent = currentLang === 'en' ? 'UZ' : 'EN';
        btn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'uz' : 'en';
            localStorage.setItem('lang', currentLang);
            location.reload(); // Simple reload to apply all translations
        });
    }
    applyTranslations();
}

function applyTranslations() {
    const t = TRANSLATIONS[currentLang];
    document.title = `${t.brand} — Classical Cryptography Tool`;
    document.querySelectorAll('[data-t]').forEach(el => {
        const key = el.dataset.t;
        if (t[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = t[key];
            else el.textContent = t[key];
        }
    });
    // Manual updates for complex ones
    const brand = document.querySelector('.brand-text'); if (brand) brand.textContent = t.brand;
    const heroBadge = document.querySelector('.hero-badge'); if (heroBadge) heroBadge.textContent = t.heroBadge;
    
    // Update Nav links
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length >= 6) {
        navLinks[0].textContent = currentLang === 'en' ? 'Home' : 'Asosiy';
        navLinks[1].textContent = t.caesar;
        navLinks[2].textContent = t.vigenere;
        navLinks[3].textContent = t.extended;
        navLinks[4].textContent = t.lab;
        navLinks[5].textContent = t.history;
    }
}

function initStatePersistence() {
    // Restore inputs from localStorage
    const inputs = ['caesarInput', 'vigenereInput', 'vigenereKey', 'extInput'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.value = localStorage.getItem(id) || '';
            el.addEventListener('input', () => localStorage.setItem(id, el.value));
        }
    });
}

// ===== Navigation =====
function initNavigation() {
    const nav = document.getElementById('navbar');
    const toggle = document.getElementById('navToggle');
    const links = document.querySelector('.nav-links');
    window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// ===== Caesar Cipher =====
function caesarShift(text, shift, decrypt) {
    if (decrypt) shift = 26 - shift;
    return text.split('').map(ch => {
        if (/[a-z]/.test(ch)) return String.fromCharCode(((ch.charCodeAt(0) - 97 + shift) % 26) + 97);
        if (/[A-Z]/.test(ch)) return String.fromCharCode(((ch.charCodeAt(0) - 65 + shift) % 26) + 65);
        return ch;
    }).join('');
}

function initCaesarCipher() {
    const input = document.getElementById('caesarInput');
    const slider = document.getElementById('caesarShift');
    const shiftVal = document.getElementById('caesarShiftValue');
    const output = document.getElementById('caesarOutput');
    const stepContainer = document.getElementById('caesarStepContainer');
    const processBtn = document.getElementById('caesarProcess');
    const copyBtn = document.getElementById('caesarCopy');
    const charCount = document.getElementById('caesarCharCount');
    const modeToggle = document.getElementById('caesarMode');
    let mode = 'encrypt';

    modeToggle.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            modeToggle.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            mode = btn.dataset.mode;
            processBtn.querySelector('.btn-text').textContent = mode === 'encrypt' ? 'Encrypt Message' : 'Decrypt Message';
        });
    });

    slider.addEventListener('input', () => { shiftVal.textContent = slider.value; processCaesar(); });
    document.getElementById('caesarShiftDown').addEventListener('click', () => { if (+slider.value > 1) { slider.value = +slider.value - 1; shiftVal.textContent = slider.value; processCaesar(); } });
    document.getElementById('caesarShiftUp').addEventListener('click', () => { if (+slider.value < 25) { slider.value = +slider.value + 1; shiftVal.textContent = slider.value; processCaesar(); } });
    input.addEventListener('input', () => { charCount.textContent = input.value.length; processCaesar(); });

    function processCaesar() {
        const text = input.value.trim();
        if (!text) {
            output.innerHTML = `<div class="empty-state"><div class="empty-icon">🔒</div><p>${TRANSLATIONS[currentLang].result}</p></div>`;
            stepContainer.innerHTML = '';
            return;
        }
        const shift = parseInt(slider.value);
        const result = caesarShift(text, shift, mode === 'decrypt');
        output.innerHTML = `<span class="result-text">${escapeHtml(result)}</span>`;
        // Step visualization
        stepContainer.innerHTML = '';
        text.substring(0, 50).split('').forEach((ch, i) => { // Limit visualization for performance
            const mapped = caesarShift(ch, shift, mode === 'decrypt');
            const div = document.createElement('div');
            div.className = 'step-letter';
            div.style.animationDelay = (i * 0.03) + 's';
            if (/[a-zA-Z]/.test(ch)) {
                div.innerHTML = `<span class="step-original">${ch}</span><span class="step-arrow">+${shift}</span><span class="step-result">${mapped}</span>`;
            } else {
                div.innerHTML = `<span class="step-original">${ch}</span><span class="step-arrow">—</span><span class="step-result">${ch}</span>`;
            }
            stepContainer.appendChild(div);
        });
        updateAnalytics(text, result);
    }

    processBtn.addEventListener('click', processCaesar);

    copyBtn.addEventListener('click', () => {
        const text = output.querySelector('.result-text');
        if (!text) return;
        navigator.clipboard.writeText(text.textContent);
        copyBtn.classList.add('copied');
        setTimeout(() => copyBtn.classList.remove('copied'), 1500);
    });
}

// ===== Vigenere Cipher =====
function vigenereCipher(text, key, decrypt) {
    if (!key) return text;
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    if (!key) return text;
    let ki = 0;
    return text.split('').map(ch => {
        if (/[a-zA-Z]/.test(ch)) {
            const base = ch === ch.toUpperCase() ? 65 : 97;
            const shift = key.charCodeAt(ki % key.length) - 65;
            ki++;
            const s = decrypt ? (26 - shift) : shift;
            return String.fromCharCode(((ch.charCodeAt(0) - base + s) % 26) + base);
        }
        return ch;
    }).join('');
}

function initVigenereCipher() {
    const input = document.getElementById('vigenereInput');
    const keyInput = document.getElementById('vigenereKey');
    const output = document.getElementById('vigenereOutput');
    const processBtn = document.getElementById('vigenereProcess');
    const copyBtn = document.getElementById('vigenereCopy');
    const charCount = document.getElementById('vigenereCharCount');
    const keyDisplay = document.getElementById('keywordDisplay');
    const modeToggle = document.getElementById('vigenereMode');
    const tableWrap = document.getElementById('vigenereMiniTable');
    let mode = 'encrypt';

    modeToggle.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            modeToggle.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            mode = btn.dataset.mode;
            processBtn.querySelector('.btn-text').textContent = mode === 'encrypt' ? 'Encrypt Message' : 'Decrypt Message';
        });
    });

    input.addEventListener('input', () => { charCount.textContent = input.value.length; processVigenere(); });
    keyInput.addEventListener('input', () => {
        const key = keyInput.value.toUpperCase().replace(/[^A-Z]/g, '');
        keyDisplay.innerHTML = key.split('').map((ch, i) =>
            `<div class="key-letter" style="animation-delay:${i * 0.05}s">${ch}</div>`
        ).join('');
        processVigenere();
    });

    function processVigenere() {
        const text = input.value.trim();
        const key = keyInput.value.trim();
        if (!text || !key) return;
        const result = vigenereCipher(text, key, mode === 'decrypt');
        output.innerHTML = `<span class="result-text">${escapeHtml(result)}</span>`;
        buildVigenereTable(text, key, mode === 'decrypt', tableWrap);
        updateAnalytics(text, result);
    }

    processBtn.addEventListener('click', processVigenere);

    copyBtn.addEventListener('click', () => {
        const text = output.querySelector('.result-text');
        if (!text) return;
        navigator.clipboard.writeText(text.textContent);
        copyBtn.classList.add('copied');
        setTimeout(() => copyBtn.classList.remove('copied'), 1500);
    });
}

function buildVigenereTable(text, key, decrypt, container) {
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    if (!key) return;
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // Build a compact table showing only used rows
    const usedKeys = [...new Set(key.split(''))];
    let html = '<table class="vig-table"><tr><th></th>';
    for (let c of alpha) html += `<th>${c}</th>`;
    html += '</tr>';
    // Find which cells are actively used
    const activeCells = [];
    let ki = 0;
    for (let ch of text) {
        if (/[a-zA-Z]/.test(ch)) {
            const row = key.charCodeAt(ki % key.length) - 65;
            const col = ch.toUpperCase().charCodeAt(0) - 65;
            activeCells.push({ row, col });
            ki++;
        }
    }
    for (let r = 0; r < 26; r++) {
        if (!usedKeys.includes(alpha[r]) && activeCells.every(c => c.row !== r)) continue;
        const isKeyRow = usedKeys.includes(alpha[r]);
        html += `<tr><th>${alpha[r]}</th>`;
        for (let c = 0; c < 26; c++) {
            const mapped = alpha[(r + c) % 26];
            const isActive = activeCells.some(a => a.row === r && a.col === c);
            const cls = isActive ? 'active-cell' : (isKeyRow ? 'highlight' : '');
            html += `<td class="${cls}">${mapped}</td>`;
        }
        html += '</tr>';
    }
    html += '</table>';
    container.innerHTML = html;
}

// ===== Extended Ciphers Logic =====
const MORSE_CODE = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/'
};

function atbashCipher(text) {
    return text.split('').map(ch => {
        if (/[a-z]/.test(ch)) return String.fromCharCode(122 - (ch.charCodeAt(0) - 97));
        if (/[A-Z]/.test(ch)) return String.fromCharCode(90 - (ch.charCodeAt(0) - 65));
        return ch;
    }).join('');
}

function railFenceCipher(text, rails, decrypt) {
    if (rails < 2) return text;
    if (!decrypt) {
        let fence = Array.from({ length: rails }, () => []);
        let rail = 0, direction = 1;
        for (let ch of text) {
            fence[rail].push(ch);
            rail += direction;
            if (rail === 0 || rail === rails - 1) direction *= -1;
        }
        return fence.flat().join('');
    } else {
        let fence = Array.from({ length: rails }, () => Array(text.length).fill(null));
        let rail = 0, direction = 1;
        for (let i = 0; i < text.length; i++) {
            fence[rail][i] = '*';
            rail += direction;
            if (rail === 0 || rail === rails - 1) direction *= -1;
        }
        let index = 0;
        for (let r = 0; r < rails; r++) {
            for (let i = 0; i < text.length; i++) {
                if (fence[r][i] === '*' && index < text.length) fence[r][i] = text[index++];
            }
        }
        let result = '', curRail = 0, dir = 1;
        for (let i = 0; i < text.length; i++) {
            result += fence[curRail][i];
            curRail += dir;
            if (curRail === 0 || curRail === rails - 1) dir *= -1;
        }
        return result;
    }
}

function morseCipher(text, decrypt) {
    if (!decrypt) {
        return text.toUpperCase().split('').map(ch => MORSE_CODE[ch] || ch).join(' ');
    } else {
        const reverseMorse = Object.fromEntries(Object.entries(MORSE_CODE).map(([k, v]) => [v, k]));
        return text.split(' ').map(code => reverseMorse[code] || code).join('');
    }
}

function initExtendedCiphers() {
    const input = document.getElementById('extInput');
    const output = document.getElementById('extOutput');
    const railControls = document.getElementById('railControls');
    const railInput = document.getElementById('railCount');
    const railValue = document.getElementById('railValue');
    const processBtn = document.getElementById('extProcess');
    const tabs = document.querySelectorAll('.tab-btn');
    let currentCipher = 'atbash';

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCipher = tab.dataset.cipher;
            railControls.style.display = currentCipher === 'rail' ? 'block' : 'none';
        });
    });

    railInput.addEventListener('input', () => railValue.textContent = railInput.value);

    processBtn.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) return;
        let result = '';
        if (currentCipher === 'atbash') result = atbashCipher(text);
        else if (currentCipher === 'rail') result = railFenceCipher(text, parseInt(railInput.value), false);
        else if (currentCipher === 'morse') result = morseCipher(text, false);
        
        output.innerHTML = `<span class="result-text">${escapeHtml(result)}</span>`;
        updateAnalytics(text, result);
    });
}

// ===== Interactive Visualizer =====
function initVisualizer() {
    const canvas = document.getElementById('vizWheelCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const inputEl = document.getElementById('vizInput');
    const shiftEl = document.getElementById('vizShift');
    const inputLetter = document.getElementById('vizInputLetter');
    const outputLetter = document.getElementById('vizOutputLetter');
    let currentShift = 3, currentAngle = 0, targetAngle = 0;
    let isDragging = false, lastAngle = 0;

    function drawWheel() {
        const w = canvas.width, h = canvas.height;
        const cx = w / 2, cy = h / 2;
        ctx.clearRect(0, 0, w, h);
        const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // Outer ring
        ctx.beginPath(); ctx.arc(cx, cy, 200, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 40; ctx.stroke();
        // Inner ring (Rotatable)
        ctx.beginPath(); ctx.arc(cx, cy, 155, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0,240,255,0.15)'; ctx.lineWidth = 36; ctx.stroke();
        // Outer letters
        for (let i = 0; i < 26; i++) {
            const angle = (i * Math.PI * 2 / 26) - Math.PI / 2;
            const x = cx + Math.cos(angle) * 200;
            const y = cy + Math.sin(angle) * 200;
            ctx.font = '600 16px "JetBrains Mono"';
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(alpha[i], x, y);
        }
        // Inner letters (shifted)
        for (let i = 0; i < 26; i++) {
            const angle = (i * Math.PI * 2 / 26) - Math.PI / 2 + currentAngle;
            const x = cx + Math.cos(angle) * 155;
            const y = cy + Math.sin(angle) * 155;
            ctx.font = '700 15px "JetBrains Mono"';
            ctx.fillStyle = '#00F0FF';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(alpha[i], x, y);
        }
        // Center
        ctx.beginPath(); ctx.arc(cx, cy, 60, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,240,255,0.05)'; ctx.fill();
        ctx.strokeStyle = 'rgba(0,240,255,0.2)'; ctx.lineWidth = 1; ctx.stroke();
        ctx.font = '800 24px "JetBrains Mono"';
        ctx.fillStyle = '#00F0FF'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('+' + currentShift, cx, cy);
        // Animate towards target
        if (!isDragging) {
            const diff = targetAngle - currentAngle;
            if (Math.abs(diff) > 0.001) currentAngle += diff * 0.1;
            else currentAngle = targetAngle;
        }
        requestAnimationFrame(drawWheel);
    }
    drawWheel();

    function getAngle(e) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - (rect.left + rect.width / 2);
        const y = (e.clientY || e.touches[0].clientY) - (rect.top + rect.height / 2);
        return Math.atan2(y, x);
    }

    function startDrag(e) { isDragging = true; lastAngle = getAngle(e); }
    function endDrag() { 
        isDragging = false; 
        const shift = Math.round((-currentAngle / (Math.PI * 2)) * 26) % 26;
        currentShift = (shift + 26) % 26;
        targetAngle = -(currentShift * Math.PI * 2 / 26);
        shiftEl.value = currentShift;
        updateViz();
    }
    function onDrag(e) {
        if (!isDragging) return;
        const angle = getAngle(e);
        currentAngle += (angle - lastAngle);
        lastAngle = angle;
        // Update shift real-time during drag
        const shift = Math.round((-currentAngle / (Math.PI * 2)) * 26) % 26;
        currentShift = (shift + 26) % 26;
        shiftEl.value = currentShift;
        updateViz(true);
    }

    canvas.addEventListener('mousedown', startDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('mousemove', onDrag);
    canvas.addEventListener('touchstart', startDrag);
    window.addEventListener('touchend', endDrag);
    window.addEventListener('touchmove', onDrag);

    function updateViz(fromDrag = false) {
        const shift = parseInt(shiftEl.value) || 0;
        currentShift = shift;
        if (!fromDrag) targetAngle = -(shift * Math.PI * 2 / 26);
        const letter = inputEl.value.toUpperCase() || 'A';
        inputLetter.textContent = letter;
        if (/[A-Z]/.test(letter)) {
            outputLetter.textContent = String.fromCharCode(((letter.charCodeAt(0) - 65 + shift) % 26) + 65);
        }
        updateAlphabetGrid(shift);
    }

    inputEl.addEventListener('input', () => { inputEl.value = inputEl.value.toUpperCase().replace(/[^A-Z]/g, ''); updateViz(); });
    shiftEl.addEventListener('input', updateViz);
    updateViz();
}

// ===== Alphabet Grid =====
function initAlphabetGrid() {
    const grid = document.getElementById('alphabetGrid');
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < 26; i++) {
        const cell = document.createElement('div');
        cell.className = 'alpha-cell';
        cell.dataset.index = i;
        cell.innerHTML = `<span class="alpha-original">${alpha[i]}</span><span class="alpha-mapped">${alpha[(i + 3) % 26]}</span>`;
        grid.appendChild(cell);
    }
}

function updateAlphabetGrid(shift) {
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    document.querySelectorAll('.alpha-cell').forEach((cell, i) => {
        cell.querySelector('.alpha-mapped').textContent = alpha[(i + shift) % 26];
    });
}

// ===== Hero Cipher Wheel =====
function initHeroWheel() {
    const canvas = document.getElementById('cipherWheelCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rot = 0;
    function draw() {
        const w = canvas.width, h = canvas.height, cx = w / 2, cy = h / 2;
        ctx.clearRect(0, 0, w, h);
        const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        rot += 0.002;
        // Outer glow
        const grad = ctx.createRadialGradient(cx, cy, 100, cx, cy, 200);
        grad.addColorStop(0, 'rgba(0,240,255,0.02)');
        grad.addColorStop(1, 'rgba(139,92,246,0.02)');
        ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(cx, cy, 190, 0, Math.PI * 2); ctx.fill();
        // Rings
        [180, 140, 100].forEach((r, ri) => {
            ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(0,240,255,${0.08 + ri * 0.04})`;
            ctx.lineWidth = ri === 0 ? 2 : 1; ctx.stroke();
        });
        // Letters
        for (let i = 0; i < 26; i++) {
            const a1 = (i * Math.PI * 2 / 26) - Math.PI / 2;
            const a2 = a1 + rot;
            // Outer
            ctx.font = '500 13px "JetBrains Mono"';
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(alpha[i], cx + Math.cos(a1) * 165, cy + Math.sin(a1) * 165);
            // Middle
            ctx.font = '600 12px "JetBrains Mono"';
            ctx.fillStyle = 'rgba(0,240,255,0.7)';
            ctx.fillText(alpha[i], cx + Math.cos(a2) * 125, cy + Math.sin(a2) * 125);
            // Inner
            ctx.font = '500 10px "JetBrains Mono"';
            ctx.fillStyle = 'rgba(139,92,246,0.6)';
            ctx.fillText(alpha[(i + 7) % 26], cx + Math.cos(a1 - rot * 1.5) * 88, cy + Math.sin(a1 - rot * 1.5) * 88);
        }
        // Center
        ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,240,255,0.06)'; ctx.fill();
        ctx.strokeStyle = 'rgba(0,240,255,0.15)'; ctx.lineWidth = 1; ctx.stroke();
        ctx.font = '700 11px Inter';
        ctx.fillStyle = 'rgba(0,240,255,0.8)';
        ctx.fillText('CIPHER', cx, cy - 6);
        ctx.font = '600 9px Inter';
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillText('WHEEL', cx, cy + 8);
        requestAnimationFrame(draw);
    }
    draw();
}

// ===== Counter Animation =====
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-number').forEach(el => {
                    const target = parseInt(el.dataset.count);
                    let current = 0;
                    const step = target / 60;
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) { current = target; clearInterval(timer); }
                        el.textContent = Math.floor(current).toLocaleString();
                        if (el.dataset.count === '403') el.textContent += '+';
                    }, 16);
                });
                observer.disconnect();
            }
        });
    });
    const stats = document.querySelector('.hero-stats');
    if (stats) observer.observe(stats);
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.cipher-section, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== Crypto Lab & Analytics =====
let lastInput = '', lastOutput = '';

function calculateFrequency(text) {
    const freq = {};
    const filtered = text.toUpperCase().replace(/[^A-Z]/g, '');
    if (!filtered.length) return freq;
    for (let ch of filtered) freq[ch] = (freq[ch] || 0) + 1;
    for (let ch in freq) freq[ch] = (freq[ch] / filtered.length) * 100;
    return freq;
}

function calculateEntropy(text) {
    const freq = {};
    for (let ch of text) freq[ch] = (freq[ch] || 0) + 1;
    let entropy = 0;
    for (let ch in freq) {
        let p = freq[ch] / text.length;
        entropy -= p * Math.log2(p);
    }
    return entropy;
}

function detectPatterns(text) {
    const patterns = [];
    if (text.length < 4) return patterns;
    for (let len = 3; len <= 5; len++) {
        for (let i = 0; i <= text.length - len; i++) {
            const sub = text.substring(i, i + len);
            if (/[^A-Za-z0-9]/.test(sub)) continue;
            const rest = text.substring(i + len);
            if (rest.includes(sub)) patterns.push(sub);
        }
    }
    return [...new Set(patterns)];
}

function initCryptoLab() {
    const toggles = document.querySelectorAll('.lab-toggle .mini-btn');
    toggles.forEach(btn => {
        btn.addEventListener('click', () => {
            toggles.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderFrequencyChart(btn.dataset.type === 'input' ? lastInput : lastOutput);
        });
    });
}

function updateAnalytics(input, output) {
    lastInput = input;
    lastOutput = output;
    
    const activeToggle = document.querySelector('.lab-toggle .mini-btn.active');
    if (activeToggle) renderFrequencyChart(activeToggle.dataset.type === 'input' ? input : output);

    const entropy = calculateEntropy(output);
    const entropyVal = document.getElementById('entropyValue');
    const entropyProgress = document.getElementById('entropyProgress');
    if (entropyVal) entropyVal.textContent = entropy.toFixed(2) + ' bits';
    if (entropyProgress) entropyProgress.style.width = Math.min((entropy / 4.7) * 100, 100) + '%';

    const patterns = detectPatterns(output);
    const patternList = document.getElementById('patternList');
    if (patternList) {
        if (patterns.length) {
            patternList.innerHTML = patterns.map(p => `<span class="pattern-match">${p}</span>`).join(', ');
        } else {
            patternList.textContent = 'No repeated patterns detected.';
        }
    }

    const uniqueDist = (input.length / (1 - (entropy / 4.7))).toFixed(1);
    const uniqueEl = document.getElementById('uniquenessValue');
    if (uniqueEl) uniqueEl.textContent = uniqueDist + ' chars';
}

function renderFrequencyChart(text) {
    const chart = document.getElementById('freqChart');
    if (!chart) return;
    const freq = calculateFrequency(text);
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    chart.innerHTML = alpha.map(ch => {
        const val = freq[ch] || 0;
        return `
            <div class="freq-bar-wrap">
                <div class="freq-bar" style="height: ${val * 4}%" data-val="${val.toFixed(1)}%"></div>
                <div class="freq-label">${ch}</div>
            </div>
        `;
    }).join('');
}

// ===== Utility =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
