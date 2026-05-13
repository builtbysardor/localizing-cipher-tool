<div align="center">

```
 ██████╗██████╗ ██╗   ██╗██████╗ ████████╗ █████╗ ██╗   ██╗ █████╗ ██╗   ██╗██╗  ████████╗
██╔════╝██╔══██╗╚██╗ ██╔╝██╔══██╗╚══██╔══╝██╔══██╗██║   ██║██╔══██╗██║   ██║██║  ╚══██╔══╝
██║     ██████╔╝ ╚████╔╝ ██████╔╝   ██║   ███████║██║   ██║███████║██║   ██║██║     ██║
██║     ██╔══██╗  ╚██╔╝  ██╔═══╝    ██║   ██╔══██║╚██╗ ██╔╝██╔══██║██║   ██║██║     ██║
╚██████╗██║  ██║   ██║   ██║        ██║   ██║  ██║ ╚████╔╝ ██║  ██║╚██████╔╝███████╗██║
 ╚═════╝╚═╝  ╚═╝   ╚═╝   ╚═╝        ╚═╝   ╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝
```

### 🔐 Interactive Classical Cipher Tool

*Encrypt. Decrypt. Visualize. Learn.*

---

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-8B5CF6?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

[![No Dependencies](https://img.shields.io/badge/Dependencies-Zero-00F0FF?style=for-the-badge&logo=checkmarx&logoColor=white)]()
[![Canvas API](https://img.shields.io/badge/Canvas-2D%20API-FF6B6B?style=for-the-badge&logo=html5&logoColor=white)]()
[![Google Fonts](https://img.shields.io/badge/Google-Fonts-4285F4?style=for-the-badge&logo=google&logoColor=white)]()
[![Performance](https://img.shields.io/badge/Load%20Time-Under%20100ms-22C55E?style=for-the-badge&logo=speedtest&logoColor=white)]()

</div>

---

## 🌟 Overview

**CryptaVault** is a premium, interactive web application that brings classical cryptography to life. Encrypt and decrypt messages using Caesar and Vigenere ciphers, watch the cipher wheel spin in real time, and explore 2,000 years of secret writing history — all inside a sleek, glassmorphic dark-themed interface with zero external dependencies.

---

## ✨ Features

### 🔑 Caesar Cipher
- **Encrypt & Decrypt** messages with a single click
- **Adjustable shift slider** (1–25) with `+` / `−` buttons for precise control
- **Live step-by-step visualization** — see each letter transform individually with staggered animation
- **Character counter** updates in real time as you type
- **One-click copy** — result copied to clipboard instantly

### 🗝️ Vigenere Cipher
- **Keyword-based encryption** using a polyalphabetic substitution scheme
- **Live keyword display** — each letter of the key appears as animated chips as you type
- **Interactive Vigenere table** — highlights the exact rows and cells used in the current encryption
- **Encrypt & Decrypt** mode toggle
- **One-click copy** for results

### 🎡 Cipher Wheel Visualizer
- **Animated cipher wheel** rotates in real time as you adjust the shift value
- Type any letter and watch it transform on the wheel instantly
- **Full alphabet mapping grid** — shows all 26 letter mappings at once, updates live with shift changes

### 📜 Cryptography Timeline
- Interactive history from **58 BC to present day**
- Covers: Julius Caesar, Al-Kindi's frequency analysis, Vigenere cipher, Kasiski examination, Enigma machine, and modern AES/RSA
- Scroll-triggered animations — each card fades in as you reach it

---

## 🎨 User Experience (UX)

### Visual Design
- **Dark glassmorphism theme** — frosted glass cards on a deep dark background
- **Animated matrix background** — falling cipher characters create an immersive atmosphere
- **Glowing radial backgrounds** — three ambient glow orbs for depth
- **Gradient typography** — cyan-to-purple gradient headings

### Interactions & Animations
- **Hero cipher wheel** auto-rotates with three independent letter rings
- **Animated counters** — statistics count up from zero when they enter the viewport
- **Scroll fade-in** — all sections animate in smoothly as the user scrolls
- **Button particle effects** on click
- **Mode toggle** buttons switch between Encrypt/Decrypt with visual feedback
- **Copy button** shows a "copied" state animation with a 1.5s timeout

### Responsive Design
- Fully responsive layout adapts from mobile to widescreen
- **Hamburger menu** for mobile navigation
- Grid workspace switches to single-column on small screens

### Performance
- **Zero external dependencies** — no React, no Vue, no jQuery
- Single HTML + CSS + JS — loads in under 100ms
- All animations use `requestAnimationFrame` for smooth 60fps rendering

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white&style=flat) HTML5 | Semantic structure, Canvas elements |
| ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&style=flat) CSS3 | Glassmorphism, animations, grid/flex layouts |
| ![JS](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black&style=flat) Vanilla JS | Cipher logic, DOM manipulation, Canvas 2D API |
| ![Google](https://img.shields.io/badge/-Google%20Fonts-4285F4?logo=google&logoColor=white&style=flat) Google Fonts | Inter + JetBrains Mono typefaces |
| Canvas 2D API | Cipher wheel rendering and real-time animation |
| IntersectionObserver API | Scroll-triggered animations and counters |
| Clipboard API | One-click copy functionality |

---

## 🚀 Getting Started

No installation required. Just open the file:

```bash
# Clone the repository
git clone https://github.com/yourusername/cryptavault.git

# Navigate to the project
cd cryptavault/cipher-tool

# Open in browser
open index.html
# or on Linux:
xdg-open index.html
```

---

## 📁 Project Structure

```
cipher-tool/
├── index.html      # Main application — all markup and structure
├── style.css       # Design system — tokens, glassmorphism, animations
└── script.js       # Cipher engine — Caesar, Vigenere, Canvas visualizer
```

---

## 🔒 Security Disclaimer

> ⚠️ **Educational purposes only.**
>
> Caesar and Vigenere ciphers are classical ciphers from the pre-computer era. They are **not cryptographically secure** and should never be used to protect real sensitive data. For actual security needs, use modern encryption standards such as **AES-256** or **RSA**.

---

## 📚 Educational Context

This tool covers the following cryptographic concepts:

- **Substitution ciphers** — replacing each letter with another
- **Monoalphabetic ciphers** — Caesar (fixed single shift)
- **Polyalphabetic ciphers** — Vigenere (multiple shifts via keyword)
- **Frequency analysis** — Al-Kindi's technique for breaking ciphers
- **Key length analysis** — Kasiski examination for breaking Vigenere
- **Modern evolution** — how classical ideas led to Enigma and then AES

---

## 🧑‍💻 Author

**builtbysardor**

---

## 📄 License

MIT License — free to use, modify, and distribute with attribution.
