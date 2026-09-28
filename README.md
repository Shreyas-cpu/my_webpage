# Shreyas Mudholkar — Enterprise AI & MCP Integration Engineer

> **Personal Portfolio & Technical Showcase**  
> *"Connecting LLMs to the enterprise systems that run the real world."*  
> **Repository:** [`https://github.com/Shreyas-cpu/my_webpage`](https://github.com/Shreyas-cpu/my_webpage)

---

## Technical Overview

A high-performance single-page portfolio engineered with **React 19**, **Vite 8**, and **Tailwind CSS v4**, built around the architectural thesis of signal flow, Model Context Protocol (MCP), SAP ERP integrations, and multi-agent AI systems.

### Core Systems & Visual Engineering
- **Signature Hero Topology**: 2D Canvas routing graph connecting `LLM`, `MCP Gateway`, `SAP BTP`, `OData API`, and `AURUM Engines` with accelerated packet streams, proximity hover resonance, and click shockwaves.
- **Rich Tabor Motion Tokens**: Calibrated cubic-bezier easing (`--ease-out-quart`, `--ease-in-out-cubic`) and duration scales (`120ms`–`300ms`).
- **3D Card Perspectives**: Interactive project cards featuring pointer-driven ±5° pitch/yaw tilt, radial glare lighting, and animated circuit pipelines (`APEX → ORACLE → NEXUS → HELIX`).
- **Dynamic Optical Beam**: Viewport scroll progress indicator tracking reading depth with luminous dual-layer glow.
- **Context-Aware Magnetic Cursor**: Morphs between default beacon, targeting crosshair reticle, and magnetic snapping pill.
- **Accessibility Guarantee**: Full graceful degradation for `prefers-reduced-motion: reduce`.

---

## Tech Stack

| Layer | Tools & Libraries |
| :--- | :--- |
| **Framework** | React 19, TypeScript, Vite 8 |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`), custom CSS custom properties |
| **Motion & Physics** | GSAP 3, ScrollTrigger, Framer Motion 13, Lenis (Smooth Scroll) |
| **Typography** | `@fontsource/space-grotesk`, `@fontsource/inter`, `@fontsource/jetbrains-mono` |
| **Deployment** | Vercel SPA routing (`vercel.json`), Netlify, or Cloudflare Pages |

---

## Local Development

Ensure Node.js (v20+) is installed:

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## Production Verification & Build

```bash
# Lint with oxlint (ultra-fast zero-config linter)
npm run lint

# Compile TypeScript and bundle static assets
npm run build

# Preview production build locally
npm run preview
```

Static production assets will be output to the `dist/` directory.

---

## Content & Token Customization

1. **Profile Data, Bio & Experience**:  
   Edit `src/content/profile.ts` to update contact links, education, work experience, or leadership roles.

2. **Featured Projects & Pipelines**:  
   Edit `src/content/projects.ts` to add or update case studies, tags, and architectural pipeline nodes.

3. **Motion Curves & Color Palette**:  
   Edit `src/index.css` to tune theme variables:
   - Primary Signal: `#FF8A3D`
   - Background Ink: `#0B0E14`
   - Text Paper: `#EDEFF3`
   - Easing tokens: `--ease-out-quart`, `--ease-in-out-cubic`

4. **Resume Asset**:  
   Replace `public/resume/Shreyas_Resume.pdf` with any new version; all download buttons across the application update automatically.

---

## Deployment Instructions

### Deploy to Vercel (Recommended)
This repository includes a preconfigured [`vercel.json`](file:///run/media/promethious/Personal/Projects/My_Webpage/vercel.json):
1. Push code to GitHub: `git push origin main`.
2. Connect your repository on [Vercel Dashboard](https://vercel.com).
3. Framework Preset: **Vite**.
4. Output Directory: **`dist`**.
5. Build Command: `npm run build`.

### Deploy to Netlify
1. Connect repository on Netlify.
2. Build command: `npm run build`.
3. Publish directory: `dist`.

---

## License & Credits
Engineered by **Shreyas Mudholkar** (B.Tech CSE, JNEC MGM University).
All rights reserved.
