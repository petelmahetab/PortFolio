# 🖤 Mahetab Patel — Portfolio

Personal developer portfolio built with **React + Vite**. Dark-themed, animated, and fully editable.

🔗 **Live:** [your-portfolio-url.vercel.app](#) &nbsp;|&nbsp; ✉️ mahetabpatel33@gmail.com

---

## ⚡ Quick Start

```bash
git clone https://github.com/petelmahetab/portfolio.git
cd portfolio
npm install
npm run dev
```

---

## ✏️ How to Edit

All your personal info lives in one place — open `src/Portfolio.jsx` and edit the `DATA` object at the top:

```js
const DATA = {
  name: "Mahetab Patel",
  email: "mahetabpatel33@gmail.com",
};
```

---

## 🎨 Themes

| File | Accent | Font |
|------|--------|------|
| `Portfolio.jsx` | `#4fffb0` Mint | Syne + DM Sans |
| `Portfolio_Theme2_Blue.jsx` | `#00d4ff` Cyan | Plus Jakarta Sans |
| `Portfolio_Theme3_Crimson.jsx` | `#ff3d5a` Red | Outfit |

To switch themes, change the import in `App.jsx`:
```js
import Portfolio from './Portfolio_Theme2_Blue'
```

---

## 🚀 Deploy to Vercel

```bash
npm run build
# drag the /dist folder to vercel.com — or connect your GitHub repo for auto-deploys
```

---

## 🛠 Tech Stack

`React 18` · `Vite` · `CSS Variables` · `IntersectionObserver` · `Google Fonts`

No UI libraries. No extra dependencies.

---

> Built by [Mahetab Patel](https://github.com/petelmahetab)
