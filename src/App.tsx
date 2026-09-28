import { useRef, useEffect } from 'react'
import { ContactForm } from './components/ContactForm'
import { CustomCursor } from './components/CustomCursor'
import { HeroDroid } from './components/HeroDroid'
import { HeroNetwork } from './components/HeroNetwork'
import { MobileNav } from './components/MobileNav'
import { Preloader } from './components/Preloader'
import { ProjectCard } from './components/ProjectCard'
import { SectionDivider } from './components/SectionDivider'
import { SectionShell } from './components/SectionShell'
import { SignalLink } from './components/SignalLink'
import { SplineMatrix } from './components/SplineMatrix'
import { compactProjects, featuredProjects } from './content/projects'
import {
  experience,
  leadership,
  navItems,
  profileFacts,
  skills,
} from './content/profile'
import { useActiveSection } from './hooks/useActiveSection'
import { useLenis } from './hooks/useLenis'
import { useScrollReveal } from './hooks/useScrollReveal'

function App() {
  const activeSection = useActiveSection()
  const lenisRef = useLenis()

  // Refs for scroll-reveal on sections not wrapped in SectionShell
  const heroRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLElement>(null)

  useScrollReveal(heroRef)
  useScrollReveal(footerRef)

  // Scroll Progress Beam Hook
  useEffect(() => {
    const beam = document.getElementById('scroll-progress-beam')
    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0 && beam) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100))
        beam.style.width = `${progress}%`
      }
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  /** Smooth-scroll to anchor via Lenis when available */
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith('#')) return
    e.preventDefault()
    const target = document.querySelector(href)
    if (!target) return

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target as HTMLElement, { offset: -72 })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {/* Scroll Progress Optical Beam */}
      <div id="scroll-progress-beam" aria-hidden="true" />

      <CustomCursor />
      <Preloader />

      {/* Skip to content (a11y) */}
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {/* Floating Header */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line/80 bg-ink/90 px-4 py-3.5 backdrop-blur-md sm:px-8">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex max-w-6xl items-center justify-between gap-5"
        >
          <a
            className="font-display text-lg font-bold tracking-tight text-paper transition hover:text-signal"
            data-magnetic
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
          >
            <span className="text-signal mr-1.5">//</span>
            {profileFacts.initials}
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-6 font-mono text-xs uppercase tracking-wider text-muted md:flex">
            {navItems.map((item) => (
              <a
                className={[
                  'relative transition-colors duration-200',
                  `#${activeSection}` === item.href
                    ? 'text-signal font-medium'
                    : 'hover:text-paper',
                ].join(' ')}
                data-magnetic
                href={item.href}
                key={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
                {/* Active indicator dot */}
                {`#${activeSection}` === item.href && (
                  <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-signal shadow-[0_0_6px_#ff8a3d]" />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              className="border border-signal/80 bg-signal-soft px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide text-signal transition-all duration-200 hover:bg-signal hover:text-ink hover:shadow-[0_0_12px_rgba(255,138,61,0.4)]"
              data-magnetic
              href={profileFacts.resumePath}
            >
              Resume ↗
            </a>
            <MobileNav activeSection={activeSection} />
          </div>
        </nav>
      </header>

      <main className="text-paper" id="main-content">
        {/* ──────────────────────────── HERO ──────────────────────────── */}
        <section
          className="relative isolate min-h-screen overflow-hidden px-6 pb-16 pt-24 sm:px-10 lg:px-16 flex flex-col justify-center"
          id="hero"
          ref={heroRef}
        >
          <div className="absolute inset-0 -z-10">
            <HeroNetwork />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,14,20,0.1),#0b0e14_90%)]" />
          </div>

          <div className="mx-auto grid w-full max-w-6xl items-center gap-8 py-6 sm:py-10 lg:grid-cols-[1fr_auto]">
            <div className="flex flex-col justify-center">
              {/* Live System Signal Badge */}
              <div className="flex items-center gap-2" data-reveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-signal/30 bg-ink-soft/90 px-3.5 py-1.5 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-signal shadow-[0_0_15px_rgba(255,138,61,0.1)]">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                  </span>
                  <span className="hidden sm:inline">
                    MCP System Architecture • SAP ERP Gateway • Enterprise AI
                  </span>
                  <span className="sm:hidden">
                    MCP ARCHITECTURE • SAP ERP • AI
                  </span>
                </div>
              </div>

              <h1
                className="mt-5 sm:mt-6 max-w-3xl font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight sm:leading-[0.94] tracking-tight text-paper drop-shadow-[0_4px_24px_rgba(11,14,20,0.85)]"
                data-reveal
              >
                {profileFacts.displayName}
              </h1>

              <p
                className="mt-4 sm:mt-6 max-w-2xl font-display text-xl sm:text-2xl lg:text-3xl font-semibold leading-snug text-paper drop-shadow-[0_2px_12px_rgba(11,14,20,0.85)]"
                data-reveal
              >
                {profileFacts.role}
              </p>

              <p className="mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-muted/90 drop-shadow-[0_2px_10px_rgba(11,14,20,0.85)]" data-reveal>
                {profileFacts.positioning}
              </p>

              <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3.5" data-reveal>
                <SignalLink
                  href="#projects"
                  variant="primary"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                    handleNavClick(e, '#projects')
                  }
                >
                  Explore Projects ↓
                </SignalLink>
                <SignalLink href={profileFacts.resumePath}>
                  Download CV ↗
                </SignalLink>
                <SignalLink
                  href="#contact"
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                    handleNavClick(e, '#contact')
                  }
                >
                  Contact Me
                </SignalLink>
              </div>
            </div>

            {/* Interactive 3D Droid Companion on the bottom-right of Hero */}
            <div className="hidden lg:flex justify-end items-center" data-reveal>
              <HeroDroid />
            </div>
          </div>
        </section>

        {/* ─────────────── ABOUT ─────────────── */}
        <SectionDivider />
        <SectionShell eyebrow="01 / Context" id="about" title="The Integration Layer">
          <p className="max-w-3xl text-xl leading-9 text-muted/95">{profileFacts.about}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3" data-reveal-stagger>
            {[
              { label: 'Domain Core', val: 'Model Context Protocol (MCP) & Enterprise Multi-Agent Systems' },
              { label: 'Production Impact', val: 'Active SAP BTP & OData Gateway in daily operations' },
              { label: 'Applied AI', val: 'Emergency 108 Dispatch & Indic Logistics OCR Solutions' },
            ].map((item) => (
              <div className="cyber-glow-border border border-line bg-ink-soft/80 p-5 backdrop-blur" data-reveal key={item.label}>
                <p className="font-mono text-xs uppercase tracking-wider text-signal">
                  {item.label}
                </p>
                <p className="mt-2 text-base leading-snug text-paper">{item.val}</p>
              </div>
            ))}
          </div>
        </SectionShell>

        {/* ─────────────── EXPERIENCE ─────────────── */}
        <SectionDivider />
        <SectionShell
          eyebrow="02 / Experience"
          id="experience"
          title="Enterprise Systems in Production"
        >
          <div className="space-y-6">
            {experience.map((item) => (
              <article
                className="cyber-glow-border border border-line bg-ink-soft/90 p-7 backdrop-blur transition-all duration-300 hover:border-signal/70"
                key={item.company}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line/60 pb-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-paper sm:text-3xl">
                      {item.company}
                    </h3>
                    <p className="mt-1 font-body text-base text-signal">{item.role}</p>
                  </div>
                  <span className="border border-line bg-ink px-3 py-1 font-mono text-xs uppercase tracking-wider text-muted">
                    {item.dates}
                  </span>
                </div>
                <ul className="mt-5 space-y-3 font-body text-base leading-7 text-muted">
                  {item.points.map((point) => (
                    <li className="flex items-start gap-3" key={point}>
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal shadow-[0_0_6px_#ff8a3d]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </SectionShell>

        {/* ─────────────── PROJECTS ─────────────── */}
        <SectionDivider />
        <SectionShell eyebrow="03 / Projects" id="projects" title="Routing as Product Logic">
          <div className="grid gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>

          <div className="mt-10 border border-line bg-ink-soft/60 p-6 backdrop-blur">
            <p className="font-mono text-xs uppercase tracking-widest text-signal">
              Additional Research & Prototypes
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {compactProjects.map((project) => (
                <span
                  className="border border-line bg-ink px-3.5 py-2 font-mono text-xs text-muted transition-all duration-200 hover:border-signal hover:text-paper"
                  key={project}
                >
                  {project}
                </span>
              ))}
            </div>
          </div>
        </SectionShell>

        {/* ─────────────── LEADERSHIP ─────────────── */}
        <SectionDivider />
        <SectionShell
          eyebrow="04 / Leadership"
          id="leadership"
          title="Community Leadership & Technical Impact"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-reveal-stagger>
            {leadership.map((item) => (
              <article
                className="cyber-glow-border border border-line bg-ink-soft/90 p-5 backdrop-blur transition-all duration-300 hover:border-signal/60"
                data-reveal
                key={item.title}
              >
                <p className="font-mono text-[10px] uppercase tracking-wider text-signal">
                  {item.dates}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold leading-tight text-paper">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-muted font-medium">{item.role}</p>
                <p className="mt-4 text-sm leading-6 text-muted/90">{item.detail}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        {/* ─────────────── INTERACTIVE 3D BUFFER ─────────────── */}
        <SectionDivider />
        <SplineMatrix />

        {/* ─────────────── SKILLS ─────────────── */}
        <SectionDivider />
        <SectionShell eyebrow="05 / Capabilities" id="skills" title="Technical Signal Matrix">
          <div className="grid gap-5 sm:grid-cols-2" data-reveal-stagger>
            {skills.map((cluster) => (
              <article
                className="cyber-glow-border border border-line bg-ink-soft/90 p-6 backdrop-blur transition-all duration-300 hover:border-signal/60"
                data-reveal
                key={cluster.group}
              >
                <h3 className="font-display text-2xl font-bold text-paper">
                  {cluster.group}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cluster.items.map((skill) => (
                    <span
                      className="border border-line bg-ink px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-muted transition-colors duration-200 hover:border-signal hover:text-signal"
                      key={skill}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionShell>

        {/* ─────────────── EDUCATION ─────────────── */}
        <SectionDivider />
        <SectionShell eyebrow="06 / Education" id="education" title="Academic Foundation">
          <article className="cyber-glow-border border border-line bg-ink-soft/90 p-7 backdrop-blur">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-line/60 pb-4">
              <div>
                <h3 className="font-display text-2xl font-bold text-paper sm:text-3xl">
                  {profileFacts.education.institution}
                </h3>
                <p className="mt-1 text-base text-signal font-medium">
                  {profileFacts.education.degree}
                </p>
              </div>
              <span className="border border-line bg-ink px-3 py-1 font-mono text-xs uppercase tracking-wider text-signal">
                {profileFacts.education.dates}
              </span>
            </div>
            <dl className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="border border-line/60 bg-ink/70 p-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  Degree & Major
                </dt>
                <dd className="mt-1.5 font-display text-lg font-semibold text-paper">
                  {profileFacts.education.degree}
                </dd>
              </div>
              <div className="border border-line/60 bg-ink/70 p-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  Cumulative GPA
                </dt>
                <dd className="mt-1.5 font-display text-lg font-bold text-signal">
                  {profileFacts.education.cgpa}
                </dd>
              </div>
            </dl>
          </article>
        </SectionShell>

        {/* ─────────────── CONTACT ME ─────────────── */}
        <SectionDivider />
        <section
          className="px-6 py-20 sm:px-10 lg:px-16"
          id="contact"
          ref={footerRef}
        >
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.52fr_0.48fr] items-center">
            <div>
              <p
                className="font-mono text-xs uppercase tracking-widest text-signal"
                data-reveal
              >
                Initiate Connection
              </p>
              <h2
                className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight text-paper sm:text-5xl"
                data-reveal
              >
                Bridging intelligence to the systems that run the real world.
              </h2>
              <p className="mt-4 text-base leading-7 text-muted" data-reveal>
                Open for high-impact AI systems engineering, Model Context Protocol integration, and multi-agent infrastructure roles.
              </p>

              <div className="mt-8 flex flex-wrap gap-3" data-reveal>
                <SignalLink href={profileFacts.contact.github}>GitHub ↗</SignalLink>
                <SignalLink href={profileFacts.contact.linkedin}>LinkedIn ↗</SignalLink>
                <SignalLink href={`mailto:${profileFacts.contact.email}`}>
                  Email Me ↗
                </SignalLink>
              </div>
            </div>
            <div data-reveal>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
