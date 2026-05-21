<div align="center">

# 🔐 CryptaVault — Interactive Classical Cipher Tool

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Canvas_API-2D-FF6B6B?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-8B5CF6?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/builtbysardor/localizing-cipher-tool?style=flat-square" />
  <img src="https://img.shields.io/github/forks/builtbysardor/localizing-cipher-tool?style=flat-square" />
  <img src="https://img.shields.io/badge/Dependencies-Zero-00F0FF?style=flat-square" />
  <img src="https://img.shields.io/badge/Load_Time-Under_100ms-22C55E?style=flat-square" />
  <img src="https://img.shields.io/badge/Animations-60fps-blueviolet?style=flat-square" />
</p>

<br/>

> **Encrypt. Decrypt. Visualize. Learn.**  
> Caesar & Vigenère ciphers with a real-time animated cipher wheel, interactive Vigenère table,  
> and 2,000 years of cryptography history — all in a single HTML file. Zero dependencies.

<br/>

**[🚀 Get Started](#-getting-started) • [✨ Features](#-features) • [📚 Education](#-educational-context) • [🛠 Tech Stack](#️-tech-stack)**

</div>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Site-00C7B7?style=for-the-badge)](https://cipher-tool-two.vercel.app)

---

## 📸 Preview

<div align="center">

| Caesar Cipher | Vigenère Cipher |
|:---:|:---:|
| ![Caesar](assets/screenshot_caesar.png) | ![Vigenere](assets/screenshot_vigenere.png) |
| *Shift slider + step-by-step animation* | *Keyword chips + interactive table* |

| Cipher Wheel | Timeline |
|:---:|:---:|
| ![Wheel](assets/screenshot_wheel.png) | ![Timeline](assets/screenshot_timeline.png) |
| *Real-time rotating cipher wheel* | *2,000 years of crypto history* |

</div>

---

## ✨ Features

### 🔑 Caesar Cipher
- Encrypt & decrypt with a single click
- Adjustable shift slider (1–25) with `+` / `−` buttons
- **Live step-by-step visualization** — watch each letter transform with staggered animation
- Real-time character counter
- One-click copy to clipboard

### 🗝️ Vigenère Cipher
- Keyword-based polyalphabetic encryption
- **Live keyword display** — animated letter chips as you type
- **Interactive Vigenère table** — highlights exact rows/cells used in current encryption
- Encrypt & Decrypt mode toggle
- One-click copy

### 🎡 Cipher Wheel Visualizer
- **Animated cipher wheel** rotates in real time as you adjust the shift
- Type any letter → watch it transform on the wheel instantly
- Full 26-letter mapping grid updates live

### 📜 Cryptography Timeline
- Interactive history from **58 BC to present day**
- Covers: Julius Caesar · Al-Kindi · Vigenère · Kasiski · Enigma · AES/RSA
- Scroll-triggered fade-in animations for each card

---

## 🎨 Design & UX

```
Theme:        Dark glassmorphism — frosted glass cards on deep dark background
Background:   Animated matrix with falling cipher characters
Typography:   Cyan-to-purple gradient headings
Animations:   60fps via requestAnimationFrame — GPU accelerated
Performance:  Loads in under 100ms — zero external dependencies
Responsive:   Mobile hamburger menu · single-column grid on small screens
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|-----------|-------|
| HTML5 | Semantic structure, Canvas elements |
| CSS3 | Glassmorphism, animations, grid/flex layouts |
| Vanilla JS (ES6+) | Cipher logic, DOM manipulation, Canvas 2D API |
| Canvas 2D API | Cipher wheel rendering & animation |
| IntersectionObserver API | Scroll-triggered animations & counters |
| Clipboard API | One-click copy functionality |
| Google Fonts | Inter + JetBrains Mono typefaces |

---

## 🚀 Getting Started

**No installation required.** Open the file directly in any modern browser:

```bash
# Clone the repository
git clone https://github.com/builtbysardor/localizing-cipher-tool.git
cd localizing-cipher-tool/cipher-tool

# Open in browser
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Or simply download `index.html` and open it — it's fully self-contained.

---

## 📁 Project Structure

```
localizing-cipher-tool/
└── cipher-tool/
    ├── index.html      # Complete app — all markup & structure
    ├── style.css       # Design system — tokens, glassmorphism, animations
    └── script.js       # Cipher engine — Caesar, Vigenère, Canvas visualizer
```

---

## 📚 Educational Context

This tool covers these cryptographic concepts:

| Concept | Description |
|---------|-------------|
| **Substitution ciphers** | Replacing each letter with another |
| **Monoalphabetic ciphers** | Caesar — fixed single shift |
| **Polyalphabetic ciphers** | Vigenère — multiple shifts via keyword |
| **Frequency analysis** | Al-Kindi's technique for breaking ciphers |
| **Key length analysis** | Kasiski examination for Vigenère |
| **Modern evolution** | From Enigma → DES → AES |

---

## 🔮 Roadmap

- [ ] 🔤 **More ciphers** — Atbash, Rail Fence, Beaufort, Playfair
- [ ] 📊 **Frequency analysis tool** — letter frequency visualization
- [ ] 🧩 **Cipher breaker** — auto-break Caesar with frequency analysis
- [ ] 🌍 **Multi-language** — support non-ASCII alphabets (Cyrillic, Arabic)
- [ ] 🎮 **Cipher challenge mode** — decode mystery messages game
- [ ] 📱 **PWA** — installable as a mobile app

---

## ⚠️ Security Disclaimer

> Classical ciphers are **not cryptographically secure**.  
> For real data protection, use modern standards: **AES-256** or **RSA**.  
> This tool is for **educational purposes only**.

---

## 📄 License

MIT License — free to use, modify, and distribute with attribution.

---

<div align="center">

**Built with ❤️ by [Sardor Buriyev](https://github.com/builtbysardor)**

⭐ **Star this repo if CryptaVault helped you learn cryptography!**

</div>
