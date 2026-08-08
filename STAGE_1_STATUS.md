# Stage 1 Status

Stage 1 is the foundation, facts, and direction phase for Shreyas's portfolio website.

## Completed

- React + Vite + TypeScript project scaffolded in the workspace root.
- Required runtime dependencies installed:
  - `gsap`
  - `framer-motion`
  - `lenis`
  - `@fontsource/space-grotesk`
  - `@fontsource/inter`
  - `@fontsource/jetbrains-mono`
- Required styling/build dependencies installed:
  - `tailwindcss`
  - `@tailwindcss/vite`
  - `postcss`
  - `autoprefixer`
- Tailwind CSS v4 connected through `vite.config.ts`.
- Global design tokens defined in `src/index.css`.
- Starter app shell replaced with a portfolio foundation screen.
- Content placeholders created in `src/content/profile.ts`.
- Initial source folders created for future stages:
  - `src/components`
  - `src/sections`
  - `src/content`
  - `src/lib`
  - `src/hooks`
- Resume asset folder created at `public/resume`.
- Production build verified with `npm run build`.
- Lint verified with `npm run lint`.

## Locked Design Direction

- Visual thesis: routing, connection, and signal flow between AI and enterprise systems.
- Base color: `#0B0E14`
- Text color: `#EDEFF3`
- Signal accent: `#FF8A3D`
- Display font: Space Grotesk
- Body font: Inter
- Mono font: JetBrains Mono

## Resume-Dependent Placeholders

The resume PDF is not currently available in the workspace or Codex attachments. These values remain explicit placeholders and should not be invented:

- Full name
- Email
- LinkedIn URL
- Exact education dates
- CGPA/scores
- Resume PDF path/content

Expected resume file path once available:

```text
public/resume/Shreyas_Resume.pdf
```
