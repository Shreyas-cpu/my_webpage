# Build Prompt for Codex - Shreyas's Portfolio Website

## 5-Stage Build Plan

**Current status:** Stages 1, 2, and 3 completed in the workspace. See `STAGE_1_STATUS.md` and `STAGE_2_3_STATUS.md` for verification notes and remaining resume-dependent placeholders.

### Stage 1 - Foundation, Facts, and Direction

- Create the React + Vite project structure.
- Install Tailwind CSS, GSAP, ScrollTrigger, Framer Motion, Lenis, and font packages.
- Add the resume PDF to the project and extract only factual details from it.
- Finalize exact design tokens:
  - Base color: near `#0B0E14`
  - Text color: near `#EDEFF3`
  - One signal accent only: amber/copper `#FF8A3D` or teal `#5EEAD4`
  - Display, body, and monospace font choices
- Define the visual thesis around routing, signal flow, MCP, SAP, and AI systems.
- Set up clean folders for sections, components, animation utilities, content data, and assets.

**Exit condition:** project boots locally, design tokens are configured, resume-backed placeholders are identified, and the site direction is locked before heavy UI work starts.

### Stage 2 - Core Layout and Content System

- Build the single-page section structure:
  - Hero
  - About
  - Experience
  - Featured Projects
  - Leadership & Community
  - Skills
  - Education
  - Contact/Footer
- Create reusable layout components for sections, headings, buttons, tags, project cards, and timeline rows.
- Move content into a structured data file so facts are easy to update later.
- Add all known content from the brief.
- Keep resume-only facts as clear placeholders until the resume is available:
  - Full name
  - Email
  - LinkedIn URL
  - Education dates
  - CGPA/scores
  - Resume download path

**Exit condition:** all sections exist in correct order, all required content is represented, and no invented facts are present.

### Stage 3 - Signature Visual System and Hero Animation

- Build the hero node-network motif using canvas2d or a lightweight WebGL layer.
- Show labeled system nodes such as `LLM`, `MCP`, `SAP`, `OData`, `AURUM`, and `Dispatch`.
- Animate the sequence:
  - Nodes assemble
  - Connection lines draw
  - Signal pulses travel through the network
  - Hero resolves into name, role, and positioning statement
- Add desktop-only cursor-reactive parallax.
- Add a session-based preloader that lasts no more than 1-2 seconds.
- Build mobile and reduced-motion fallbacks for the hero motif.

**Exit condition:** the hero has one memorable orchestrated motion moment and remains readable, responsive, and performant.

### Stage 4 - Interaction, Motion, and Responsive Polish

- Add Lenis smooth scrolling.
- Add GSAP/ScrollTrigger section reveals with restrained pacing.
- Add active-section nav highlighting and smooth anchor navigation.
- Add project-card hover states with subtle tilt/parallax and animated visual previews.
- Add the custom desktop cursor with magnetic interaction near links/cards/buttons.
- Add soft section transitions using a thin connection-line motif or restrained color wipe.
- Make the page fully responsive across mobile, tablet, and desktop.
- Implement accessibility requirements:
  - `prefers-reduced-motion`
  - Keyboard navigation
  - Visible focus states
  - Semantic HTML
  - Strong color contrast

**Exit condition:** the site feels animated and premium without sacrificing legibility, accessibility, or mobile usability.

### Stage 5 - Performance, QA, README, and Deploy Readiness

- Optimize fonts, images, and lazy-loaded assets.
- Confirm the hero canvas does not hurt mobile performance.
- Run production build.
- Check layout across common viewport sizes.
- Run Lighthouse or equivalent performance checks with a target score of 90+.
- Verify all links, contact details, resume link, and placeholders.
- Write a README covering:
  - How to run locally
  - How to replace the resume PDF
  - Where to update content
  - Where color/type tokens live
  - How to deploy to Vercel or Netlify

**Exit condition:** the portfolio is static-build ready, documented, accurate, and suitable for deployment.

---

> Copy everything below into Codex. Attach the resume PDF in the same message - the brief tells Codex to treat it as the source of truth for exact dates, links, and metrics.

---

## 0. Role & Mission

You are a senior creative frontend engineer working at a boutique studio known for portfolios that get featured on Awwwards/Dribbble - sites people rewatch for the motion design alone. Build a **single-page, highly visual, animation-driven personal portfolio** for Shreyas, a final-year Computer Science student who builds AI-to-enterprise integration systems (LLMs talking to SAP via the Model Context Protocol).

This is not a template job. Read the "Design Direction" section below and commit to it - do not default to generic dark-mode-plus-neon-accent or cream-plus-serif portfolio cliches. The reference clip (a Dribbble motion-portfolio showreel - cinematic scroll-driven reveals, oversized kinetic type, smooth eased transitions between full-bleed sections, subtle grain/depth) sets the **bar for motion quality and pacing**, not the literal visual style - the actual palette, type, and signature motif must come from Shreyas's own subject matter (see below).

**Source of truth for facts:** Shreyas's resume is attached. Use it for his full name, exact dates, contact links (email, LinkedIn, GitHub), GPA/scores, and any project detail not spelled out in the Content Bank below. Never invent metrics, employers, or dates - if something's missing from both the resume and this brief, leave a clearly marked placeholder rather than fabricating it.

---

## 1. Design Direction (commit to this before writing code)

**The thesis:** Shreyas's actual work is *routing* - he connects LLMs to SAP's enterprise systems through MCP gateways, and built a multi-engine dispatch/routing system (AURUM) for ambulance networks. "Connection," "routing," and "signal flow between systems" is his real subject matter - build the visual identity around that instead of a generic AI/tech look.

- **Signature element:** An animated node-and-connection network in the hero - small nodes labeled with the systems he bridges (LLM <-> MCP <-> SAP, or similar), linked by animated flowing signal lines/pulses. On load, the network resolves/settles into his name and title. This single moment is the thing people remember - everything else on the page should be quieter than this.
- **Palette (commit to specific hex values, not defaults):** a deep ink-navy/charcoal base (near `#0B0E14`), a soft warm off-white for text (near `#EDEFF3`), and one signal accent used sparingly - a warm amber/copper (`#FF8A3D`) or an electric teal (`#5EEAD4`); pick one, not both, and use it only for active states, the signature network lines, and one accent per section. Do not use Anthropic's clay/terracotta (`#D97757`) or a stock cream background.
- **Typography:** pair a geometric/technical display face (e.g. Space Grotesk, General Sans, or similar) for headlines with a clean, highly readable body face (e.g. Inter or IBM Plex Sans), plus a monospace face (e.g. JetBrains Mono, IBM Plex Mono) for labels, section eyebrows, and code-flavored details - this is a developer's site, let the mono face carry that texture in small doses (nav labels, timestamps, tags), not paragraphs.
- **Structural devices:** if you use numbered markers or timeline dots, only do it where it's literally sequential (the Experience/Education timeline) - not decoratively elsewhere.
- **Restraint:** spend the animation budget on one big orchestrated hero sequence and a handful of well-timed scroll reveals. Cut anything decorative that doesn't serve legibility or storytelling - the difference between "impressive" and "AI-generated-feeling" is restraint everywhere except the signature moment.

---

## 2. Tech Stack

- **Framework:** React + Vite (single-page app, no router needed - everything is in-page scroll)
- **Styling:** Tailwind CSS with a custom design-token config (colors, type scale, spacing) matching Section 1
- **Animation:**
  - GSAP + ScrollTrigger for scroll-linked reveals, pinning, and the hero sequence
  - Framer Motion for component-level micro-interactions (hover states, button transitions)
  - Lenis (or similar) for buttery smooth-scroll with custom easing
  - A lightweight WebGL/canvas layer (OGL, or plain canvas2d if simplicity is better) for the hero node-network - must stay performant, no heavy Three.js scene needed for something this scoped
- **Fonts:** self-hosted via `@fontsource` or similar, not render-blocking
- **Deployment target:** static build, deployable to Vercel/Netlify as-is

---

## 3. Motion & Interaction Spec

1. **Preloader (1-2s max):** minimal, on-brand loading sequence - e.g. the node network drawing itself in - that hands off directly into the hero animation. Skippable on repeat visits (session-based).
2. **Hero sequence:** nodes assemble -> connecting lines animate/pulse -> resolves into name, role, and one-line positioning statement. Include a subtle cursor-reactive parallax on the node layer (desktop only).
3. **Scroll storytelling:** as the user scrolls, sections reveal with staggered text/element entrances (words or lines animating in, not just fade-ins). Use ScrollTrigger pinning for at most one section beyond the hero - don't pin everything.
4. **Custom cursor:** a minimal custom cursor on desktop that reacts (magnetic pull, scale change) near interactive elements - project cards, links, nav.
5. **Project cards:** hover micro-interactions - subtle tilt/parallax on the card, an image or visual preview that animates in, not a static thumbnail.
6. **Nav:** a persistent minimal nav (logo/initials + section links + resume/contact CTA) that highlights the active in-view section as the user scrolls; smooth-scrolls to anchors on click.
7. **Section transitions:** treat each section boundary like a soft scene change - a shared transition element, color-field wipe, or continuity motif (e.g. the connection-line motif reappearing thinner between sections) rather than an abrupt cut.
8. **Accessibility:** respect `prefers-reduced-motion` - provide a materially calmer experience (crossfades instead of complex motion, no parallax) rather than just disabling everything. Full keyboard navigability and visible focus states throughout. All animation must not block content from being reachable/readable without JS running.
9. **Performance:** target 60fps on the hero canvas; lazy-load below-the-fold imagery; keep total JS payload reasonable; Lighthouse performance score 90+ on both mobile and desktop. Simplify or disable the WebGL layer on low-power/mobile devices - fall back to a static or CSS-only version of the node motif there rather than dropping the section.

---

## 4. Site Structure & Content Bank

Single scrolling page, sections in this order. Use the facts below as-is; pull anything bracketed `[ ]` from the attached resume.

### Hero

- Name: `[Full name from resume]`
- Role line: *AI Systems Integration Engineer / MCP & Enterprise AI Developer* (adjust wording to match resume's own framing if it differs)
- One-line positioning statement, e.g.: "Connecting LLMs to the enterprise systems that run the real world."
- Primary CTAs: "View Work" (scrolls to Projects) and "Resume" (opens resume PDF) / "Contact"

### About

Final-year B.Tech Computer Science Engineering student at Jawaharlal Nehru Engineering College (JNEC), MGM University, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra. Currently completing a six-month internship at ETZEL IT Solutions & Consultancy while finishing his degree. His focus: building the bridge between large language models and enterprise systems - Model Context Protocol (MCP) architecture, multi-agent AI, and applied AI for Indian-context problems (emergency dispatch, logistics, government/enterprise dashboards).

### Experience

**ETZEL IT Solutions & Consultancy** - MCP / SAP ERP Integration Intern (June - December 2026)

- Built the **SAP.MCP Intelligence Gateway**, connecting LLMs to SAP OData services across MM (Materials Management), SD (Sales & Distribution), FI (Finance), CO (Controlling), PM (Plant Maintenance), and WF (Workflow) modules.
- The gateway is in active production use - approving purchase orders, querying vendor master data, managing inventory, and processing workflow items through natural-language/LLM-driven interaction with SAP.
- Attended the MCP Dev Summit Mumbai 2026 (Linux Foundation, Jio World Convention Centre).

### Featured Projects

Present 4-5 as rich cards/case-study blocks; list the rest more compactly.

1. **AURUM** - *Adaptive Unified Routing for Urgent Medicine*: an AI-powered emergency medical dispatch system targeting India's 108 ambulance network, built around four coordinated engines (APEX, ORACLE, NEXUS, HELIX). Presented at HackArena 2.0 Mumbai Zonals with a full SRS document and architectural feasibility review (covering WebSocket reliability, HL7/FHIR integration, and DPDP Act compliance).
2. **VIGIL VMS** - a WhatsApp-first, QR-powered visitor management system. React 18, TypeScript, Vite, TailwindCSS front end with a PHP/MySQL backend; delivered under a hard client deadline with a full design system.
3. **SAP.MCP Intelligence Gateway** - see Experience above; can be featured again here as the flagship technical project with more implementation depth (architecture diagram of LLM <-> MCP <-> SAP OData flow - ties directly into the hero's node motif).
4. **NoteSphere** - a full-stack notes/knowledge platform built with Next.js 14, Firebase, and Gemini Pro, in collaboration with Manish Patil and Abid Abdulla.
5. **SCRIPT** *(in development)* - a multilingual (Marathi / Hindi / English) courier parcel-tracking system that reads ink stamps and handwritten waybill data via OCR and vision-LLMs, using a hybrid pipeline with a human-in-the-loop review console.
6. *(Optional, compact list)* Quantum Variational Classifier (IBM Qiskit), SeaQuel, Smart Dynamic Traffic Management, Barcode Generator.

### Leadership & Community

- **E-Cell** - member of a 113-person team driving campus entrepreneurship initiatives.
- **TEDx JNEC** - member of a 64-person organizing committee.
- **Google Student Ambassador**, building and supporting a developer community of 800+ members.

### Skills

Group into 3-4 clusters (exact fill from resume where more precise, otherwise use):

- **AI / Integration:** Model Context Protocol (MCP), multi-agent AI systems, LLM tool-use, SAP OData, prompt engineering, OCR/vision-LLM pipelines
- **Frontend:** React, TypeScript, Next.js, TailwindCSS, Vite
- **Backend / Data:** Node.js, PHP/MySQL, Firebase
- **Other:** IBM Qiskit / quantum computing fundamentals, Python

### Education

Jawaharlal Nehru Engineering College (JNEC), MGM University - B.Tech, Computer Science Engineering, final year. `[exact dates/CGPA from resume]`

### Contact / Footer

- GitHub: `Shreyas-cpu` (github.com/Shreyas-cpu)
- `[LinkedIn URL from resume]`
- `[Email from resume]`
- Resume download link
- A closing line that echoes the hero's positioning statement, and a final small instance of the node/connection motif closing the loop.

---

## 5. Non-Negotiables Checklist

- [ ] Distinctive palette/type/signature per Section 1 - no generic dark+neon or cream+serif defaults
- [ ] One orchestrated hero animation sequence; scroll reveals elsewhere are restrained, not scattered
- [ ] Fully responsive, mobile has a performant fallback for the WebGL/canvas hero layer
- [ ] `prefers-reduced-motion` respected with a genuinely calmer alternative, not just "off"
- [ ] Keyboard-navigable, visible focus states, semantic HTML, good color contrast
- [ ] All content in Section 4 present and accurate; nothing about Shreyas fabricated beyond what's given or in the resume
- [ ] Fast: lazy-loaded assets, optimized fonts/images, 90+ Lighthouse performance
- [ ] Clean, componentized code (not one giant file) so sections are easy to edit later
- [ ] Deploy-ready static build for Vercel/Netlify

---

## 6. What to Deliver

1. The working single-page site (React + Vite project, ready to `npm install && npm run dev`)
2. A short README noting how to swap in real contact links/resume PDF and how the color/type tokens are organized for future edits
