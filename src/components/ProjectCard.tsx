import { useRef, useCallback, useState } from 'react'
import { gsap } from 'gsap'

type ProjectCardProps = {
  project: {
    title: string
    subtitle: string
    status: string
    description: string
    details: readonly string[]
    tags: readonly string[]
    flow: readonly string[]
  }
}

/**
 * Butter-Smooth 3D Perspective Card (Zero Jitter / Zero Flicker Architecture)
 * - Outer container handles stable hit-testing without geometric feedback loops
 * - Inner card transforms via GSAP dampening (power2.out)
 * - Cursor glare spotlight with smooth radial diffusion
 * - Interactive circuit pipeline architecture
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardInnerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return
      const container = containerRef.current
      const inner = cardInnerRef.current
      const glow = glowRef.current
      if (!container || !inner) return

      // Measure relative to the static outer container
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Smooth clamped rotation (max ±4.5 degrees)
      const rotateX = Math.max(-4.5, Math.min(4.5, ((y - centerY) / centerY) * -4.5))
      const rotateY = Math.max(-4.5, Math.min(4.5, ((x - centerX) / centerX) * 4.5))

      // Smoothly animate inner card via GSAP to eliminate jitter
      gsap.to(inner, {
        rotateX,
        rotateY,
        y: -4,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      })

      // Glare lighting follows pointer smoothly
      if (glow) {
        glow.style.opacity = '1'
        glow.style.background = `radial-gradient(420px circle at ${x}px ${y}px, rgba(255, 138, 61, 0.15), transparent 70%)`
      }
    },
    [prefersReduced],
  )

  const onMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsHovered(false)
    const inner = cardInnerRef.current
    const glow = glowRef.current

    if (inner) {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    }
    if (glow) {
      glow.style.opacity = '0'
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{ perspective: '1100px' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      <article
        ref={cardInnerRef}
        className="group relative overflow-hidden border border-line bg-ink-soft/90 p-6 backdrop-blur transition-[border-color,box-shadow] duration-300 hover:border-signal/80 hover:shadow-[0_12px_36px_rgba(11,14,20,0.85)]"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Dynamic Cursor Glare Spotlight */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
        />

        {/* Decorative Corner Accents */}
        <div className="pointer-events-none absolute top-0 right-0 h-8 w-8 overflow-hidden">
          <div className="absolute top-0 right-0 h-px w-5 bg-gradient-to-l from-signal to-transparent" />
          <div className="absolute top-0 right-0 h-5 w-px bg-gradient-to-b from-signal to-transparent" />
        </div>

        <div className="relative z-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              {/* Live Status Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/80 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-signal">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                </span>
                {project.status}
              </div>

              <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-paper sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-1 font-body text-sm text-muted">{project.subtitle}</p>
            </div>

            {/* Architecture Circuit Pipeline */}
            <div className="min-w-44 border border-line/80 bg-ink/90 p-3 shadow-inner transition-colors duration-300 group-hover:border-signal/50">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-muted/70">
                Pipeline Architecture
              </p>
              <div className="flex flex-wrap items-center gap-1.5">
                {project.flow.map((node, i) => (
                  <div key={node} className="flex items-center gap-1.5">
                    <span
                      className={[
                        'border px-2 py-0.5 font-mono text-[10px] uppercase tracking-tight transition-all duration-300',
                        isHovered
                          ? 'border-signal/60 bg-signal/10 text-paper shadow-[0_0_8px_rgba(255,138,61,0.2)]'
                          : 'border-line bg-ink-soft text-muted',
                      ].join(' ')}
                      style={{
                        transitionDelay: isHovered ? `${i * 50}ms` : '0ms',
                      }}
                    >
                      {node}
                    </span>
                    {i < project.flow.length - 1 && (
                      <span
                        className={[
                          'font-mono text-[10px] transition-colors duration-300',
                          isHovered ? 'text-signal' : 'text-line',
                        ].join(' ')}
                        style={{
                          transitionDelay: isHovered ? `${i * 50}ms` : '0ms',
                        }}
                      >
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-5 font-body text-base leading-7 text-muted/95">
            {project.description}
          </p>

          <ul className="mt-5 space-y-2 font-body text-sm leading-6 text-muted">
            {project.details.map((detail) => (
              <li className="flex items-start gap-3" key={detail}>
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal shadow-[0_0_6px_#ff8a3d]" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>

          {/* Tech Stack Tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                className="border border-signal/20 bg-signal-soft px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-signal transition-colors duration-200 group-hover:border-signal/40"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
