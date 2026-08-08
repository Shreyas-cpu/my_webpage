import { useRef } from 'react'
import { ContactForm } from './components/ContactForm'
import { CustomCursor } from './components/CustomCursor'
import { HeroNetwork } from './components/HeroNetwork'
import { MobileNav } from './components/MobileNav'
import { Preloader } from './components/Preloader'
import { ProjectCard } from './components/ProjectCard'
import { SectionDivider } from './components/SectionDivider'
import { SectionShell } from './components/SectionShell'
import { SignalLink } from './components/SignalLink'
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
      <CustomCursor />
      <Preloader />

      {/* Skip to content (a11y) */}
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="fixed inset-x-0 top-0 z-40 border-b border-line/80 bg-ink/85 px-4 py-3 backdrop-blur sm:px-8">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex max-w-6xl items-center justify-between gap-5"
        >
          <a
            className="font-display text-lg font-semibold text-paper"
            data-magnetic
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
          >
            {profileFacts.initials}
          </a>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-5 font-mono text-xs uppercase tracking-normal text-muted md:flex">
            {navItems.map((item) => (
              <a
                className={[
                  'relative transition',
                  `#${activeSection}` === item.href
                    ? 'text-signal'
                    : 'hover:text-signal',
                ].join(' ')}
                data-magnetic
                href={item.href}
                key={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.label}
                {/* Active indicator dot */}
                {`#${activeSection}` === item.href && (
                  <span className="absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-signal" />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              className="border border-signal px-3 py-2 font-mono text-xs uppercase tracking-normal text-signal transition hover:bg-signal hover:text-ink"
              data-magnetic
              href={profileFacts.resumePath}
            >
              Resume
            </a>
            <MobileNav activeSection={activeSection} />
          </div>
        </nav>
      </header>

      <main className="text-paper" id="main-content">
        {/* ──────────────────────────── HERO ──────────────────────────── */}
        <section
          className="relative isolate min-h-screen overflow-hidden px-6 pb-16 pt-28 sm:px-10 lg:px-16"
          id="hero"
          ref={heroRef}
        >
          <div className="absolute inset-0 -z-10">
            <HeroNetwork />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,14,20,0.1),#0b0e14_88%)]" />
          </div>

          <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-6xl flex-col justify-end">
            <p
              className="font-mono text-sm uppercase tracking-normal text-signal"
              data-reveal
            >
              LLM – MCP – RAG – Agentic-AI
            </p>
            <h1
              className="mt-5 max-w-5xl font-display text-5xl font-semibold leading-[0.94] text-paper sm:text-7xl lg:text-8xl"
              data-reveal
            >
              {profileFacts.displayName}
            </h1>
            <p
              className="mt-6 max-w-2xl font-display text-2xl leading-tight text-paper sm:text-3xl"
              data-reveal
            >
              {profileFacts.role}
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted" data-reveal>
              {profileFacts.positioning}
            </p>
            <div className="mt-8 flex flex-wrap gap-3" data-reveal>
              <SignalLink
                href="#projects"
                variant="primary"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  handleNavClick(e, '#projects')
                }
              >
                View Work
              </SignalLink>
              <SignalLink href={profileFacts.resumePath}>Resume</SignalLink>
              <SignalLink
                href="#contact"
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  handleNavClick(e, '#contact')
                }
              >
                Contact
              </SignalLink>
            </div>
          </div>
        </section>

        {/* ─────────────── ABOUT ─────────────── */}
        <SectionDivider />
        <SectionShell eyebrow="01 / Context" id="about" title="The bridge layer">
          <p className="max-w-3xl text-xl leading-9 text-muted">{profileFacts.about}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3" data-reveal-stagger>
            {['MCP architecture', 'Enterprise AI', 'Indian-context systems'].map(
              (item) => (
                <div className="border border-line bg-ink-soft p-4" data-reveal key={item}>
                  <p className="font-mono text-xs uppercase tracking-normal text-signal">
                    Focus
                  </p>
                  <p className="mt-2 text-paper">{item}</p>
                </div>
              ),
            )}
          </div>
        </SectionShell>

        {/* ─────────────── EXPERIENCE ─────────────── */}
        <SectionDivider />
        <SectionShell
          eyebrow="02 / Experience"
          id="experience"
          title="Enterprise systems in production"
        >
          {experience.map((item) => (
            <article className="border border-line bg-ink-soft p-6" key={item.company}>
              <div className="flex flex-wrap justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl font-semibold text-paper">
                    {item.company}
                  </h3>
                  <p className="mt-2 text-muted">{item.role}</p>
                </div>
                <p className="font-mono text-xs uppercase tracking-normal text-signal">
                  {item.dates}
                </p>
              </div>
              <ul className="mt-6 space-y-3 text-base leading-7 text-muted">
                {item.points.map((point) => (
                  <li className="flex gap-3" key={point}>
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </SectionShell>

        {/* ─────────────── PROJECTS ─────────────── */}
        <SectionDivider />
        <SectionShell eyebrow="03 / Work" id="projects" title="Routing as product logic">
          <div className="grid gap-5">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
          <div className="mt-8 border border-line p-5">
            <p className="font-mono text-xs uppercase tracking-normal text-signal">
              Compact archive
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {compactProjects.map((project) => (
                <span
                  className="border border-line px-3 py-2 text-sm text-muted transition hover:border-signal hover:text-paper"
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
          eyebrow="04 / Community"
          id="leadership"
          title="Teams and developer communities"
        >
          <div className="grid gap-4 sm:grid-cols-3" data-reveal-stagger>
            {leadership.map((item) => (
              <article className="border border-line bg-ink-soft p-5" data-reveal key={item.title}>
                <h3 className="font-display text-2xl font-semibold text-paper">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        {/* ─────────────── SKILLS ─────────────── */}
        <SectionDivider />
        <SectionShell eyebrow="05 / Skills" id="skills" title="Technical signal map">
          <div className="grid gap-4 sm:grid-cols-2" data-reveal-stagger>
            {skills.map((cluster) => (
              <article className="border border-line bg-ink-soft p-5" data-reveal key={cluster.group}>
                <h3 className="font-display text-2xl font-semibold text-paper">
                  {cluster.group}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cluster.items.map((skill) => (
                    <span
                      className="bg-signal-soft px-3 py-1 font-mono text-[11px] uppercase tracking-normal text-signal"
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
        <SectionShell eyebrow="06 / Education" id="education" title="Academic base">
          <article className="border border-line bg-ink-soft p-6">
            <h3 className="font-display text-3xl font-semibold text-paper">
              {profileFacts.education.institution}
            </h3>
            <p className="mt-3 text-muted">{profileFacts.education.degree}</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="font-mono text-xs uppercase tracking-normal text-signal">
                  Dates
                </dt>
                <dd className="mt-2 text-paper">{profileFacts.education.dates}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs uppercase tracking-normal text-signal">
                  CGPA / Score
                </dt>
                <dd className="mt-2 text-paper">{profileFacts.education.cgpa}</dd>
              </div>
            </dl>
          </article>
        </SectionShell>

        {/* ─────────────── CONTACT ME ─────────────── */}
        <SectionDivider />
        <section
          className="px-6 py-16 sm:px-10 lg:px-16"
          id="contact"
          ref={footerRef}
        >
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.5fr_0.5fr] items-center">
            <div>
              <p
                className="font-mono text-xs uppercase tracking-normal text-signal"
                data-reveal
              >
                Contact Me
              </p>
              <h2
                className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-paper sm:text-5xl"
                data-reveal
              >
                Keep the signal moving between models and the systems that matter.
              </h2>
              <div className="mt-8 flex flex-wrap gap-3" data-reveal>
                <SignalLink href={profileFacts.contact.github}>GitHub</SignalLink>
                <SignalLink href={profileFacts.contact.linkedin}>LinkedIn</SignalLink>
                <SignalLink href={`mailto:${profileFacts.contact.email}`}>
                  Email
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
