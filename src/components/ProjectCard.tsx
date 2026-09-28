import { useRef, useCallback, useState } from 'react'

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
 * High-impact Cyber-Enterprise Project Card:
 * - 3D Perspective tilt with dynamic mouse pitch & yaw
 * - Radial cursor-following glare spotlight
 * - Animated sequential circuit pipeline for architecture flow
 * - Live status radar beacon
 * - Graceful static degradation under prefers-reduced-motion
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const flowRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReduced) return
      const card = cardRef.current
      const glow = glowRef.current
      const flow = flowRef.current
      if (!card) return

      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Subtle, high-end 3D tilt
      const rotateX = ((y - centerY) / centerY) * -5
      const rotateY = ((x - centerX) / centerX) * 5

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`

      // Glare lighting follows pointer
      if (glow) {
        glow.style.opacity = '1'
        glow.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 138, 61, 0.16), transparent 70%)`
      }

      // Parallax depth shift on flow architecture diagram
      if (flow) {
        const shiftX = ((x - centerX) / centerX) * -8
        const shiftY = ((y - centerY) / centerY) * -5
        flow.style.transform = `translate(${shiftX}px, ${shiftY}px)`
      }
    },
    [prefersReduced],
  )

  const onMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setIsHovered(false)
    const card = cardRef.current
    const glow = glowRef.current
    const flow = flowRef.current

    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)'
    }
    if (glow) glow.style.opacity = '0'
    if (flow) flow.style.transform = 'translate(0px, 0px)'
  }, [])

  return (
    <article
      ref={cardRef}
      className="card-tilt-inner group relative overflow-hidden border border-line bg-ink-soft/90 p-6 backdrop-blur transition-all duration-300 hover:border-signal/80 hover:shadow-[0_12px_40px_rgba(11,14,20,0.8)]"
      data-magnetic
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      style={{
        transition: 'transform 0.28s cubic-bezier(0.165, 0.84, 0.44, 1), border-color 0.24s ease, box-shadow 0.28s ease',
        willChange: 'transform',
      }}
    >
      {/* Dynamic Cursor Glare Spotlight */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
      />

      {/* Decorative Cyber Border Accent */}
      <div className="absolute top-0 right-0 h-10 w-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 h-px w-6 bg-gradient-to-l from-signal to-transparent" />
        <div className="absolute top-0 right-0 w-px h-6 bg-gradient-to-b from-signal to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/70 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-signal">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              {project.status}
            </div>

            <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-paper transition-colors duration-200 group-hover:text-paper">
              {project.title}
            </h3>
            <p className="mt-1 font-body text-sm text-muted">{project.subtitle}</p>
          </div>

          {/* Architecture Circuit Pipeline */}
          <div
            ref={flowRef}
            className="min-w-44 border border-line/80 bg-ink/90 p-3 shadow-inner transition-transform duration-300 group-hover:border-signal/50"
          >
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
                      transitionDelay: isHovered ? `${i * 60}ms` : '0ms',
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
                        transitionDelay: isHovered ? `${i * 60}ms` : '0ms',
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
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal shadow-[0_0_6px_#ff8a3d]" />
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
  )
}
