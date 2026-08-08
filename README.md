# Shreyas Mudholkar | Portfolio

A high-performance, single-page React/Vite portfolio built around the visual thesis of routing, signal flow, Model Context Protocol (MCP), SAP, and enterprise AI integration. 

The project features a lightweight Canvas 2D interactive hero network, GSAP scroll reveals, Lenis smooth scrolling, and a custom magnetic cursor.

## Run Locally

Make sure you have Node.js installed, then run:

```bash
npm install
npm run dev
```

Your portfolio will be running at `http://localhost:5173`.

## Verify & Build

To run type checking, linting, and generate the static production build:

```bash
npm run lint
npm run build
```

The production-ready assets will be output to the `dist/` folder.

## Project Structure & Customization

This portfolio is component-driven and all data is separated from the UI for easy updates.

### 📝 Where to Update Content
All textual content, projects, experience, and contact links are stored in standard TypeScript objects.
- **Profile Data (Name, Contact, Experience, Skills):** `src/content/profile.ts`
- **Projects Archive:** `src/content/projects.ts`

### 🎨 Where Color & Type Tokens Live
The design system is managed globally via Tailwind v4 CSS variables.
- **Tokens:** Edit `src/index.css` to modify the base ink color, paper text color, and the primary signal accent (`#FF8A3D`).
- **Fonts:** Fonts are self-hosted via `@fontsource`. If you change the font tokens in `src/index.css`, make sure to install and import the corresponding fontsource package.

### 📄 How to Replace the Resume PDF
The resume PDF is hosted as a static asset.
To update your resume:
1. Name your new PDF file `Shreyas_Resume.pdf`.
2. Replace the existing file at `public/resume/Shreyas_Resume.pdf`.
3. The "Resume" buttons across the site will automatically download the new file.

## Deploying to Vercel or Netlify

This project is a standard Vite static application, making deployment straightforward.

### Vercel
1. Push your code to a GitHub repository.
2. Import the project in your Vercel dashboard.
3. Vercel will automatically detect the Vite framework and configure the build settings.
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click Deploy!

### Netlify
1. Push your code to a GitHub repository.
2. Import the project in your Netlify dashboard.
3. Use the following build settings:
   - **Build Command:** `npm run build`
   - **Publish directory:** `dist`
4. Click Deploy!

## Tech Stack
- **Framework:** React 19 + Vite + TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** GSAP, ScrollTrigger, Framer Motion
- **Scroll:** Lenis (Smooth Scrolling)
- **Typography:** Self-hosted Space Grotesk, Inter, JetBrains Mono
- **Canvas:** Custom 2D implementation for Hero Network
