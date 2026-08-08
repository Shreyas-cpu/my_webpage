import { useRef, useCallback } from 'react'

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
 * Rich project card with 3D tilt on hover, cursor-following glow,
 * and parallax shift on the flow diagram.
 * All effects disabled under prefers-reduced-motion.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const flowRef = useRef<HTMLDivElement>(null)

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

      // 3D tilt — subtle rotation
      const rotateX = ((y - centerY) / centerY) * -4
      const rotateY = ((x - centerX) / centerX) * 4

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`

      // Glow effect following cursor
      if (glow) {
        glow.style.opacity = '1'
        glow.style.background = `radial-gradient(320px circle at ${x}px ${y}px, rgba(255, 138, 61, 0.12), transparent 60%)`
      }

      // Parallax on flow diagram — shifts opposite to cursor
      if (flow) {
        const shiftX = ((x - centerX) / centerX) * -6
        const shiftY = ((y - centerY) / centerY) * -4
        flow.style.transform = `translate(${shiftX}px, ${shiftY}px)`
      }
    },
    [prefersReduced],
  )

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current
    const glow = glowRef.current
    const flow = flowRef.current

    if (card) card.style.transform = ''
    if (glow) glow.style.opacity = '0'
    if (flow) flow.style.transform = ''
  }, [])

  return (
    <article
      ref={cardRef}
      className="group relative border border-line bg-ink-soft p-5 transition-[border-color] duration-300 hover:border-signal"
      data-magnetic
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
      style={{
        transition: 'transform 0.4s cubic-bezier(0.03,0.98,0.52,0.99), border-color 0.3s',
        willChange: 'transform',
      }}
    >
      {/* Cursor glow overlay */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
      />

      <div className="relative z-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-normal text-signal">
              {project.status}
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold leading-tight text-paper">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
          </div>
          <div
            ref={flowRef}
            className="min-w-40 border border-line bg-ink p-3 transition-transform duration-300"
          >
            <div className="flex flex-wrap gap-2">
              {project.flow.map((node) => (
                <span
                  className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-normal text-muted transition-colors duration-300 group-hover:border-signal group-hover:text-paper"
                  key={node}
                >
                  {node}
                </span>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-6 text-base leading-7 text-muted">{project.description}</p>
        <ul className="mt-5 space-y-2 text-sm leading-6 text-muted">
          {project.details.map((detail) => (
            <li className="flex gap-3" key={detail}>
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              className="bg-signal-soft px-3 py-1 font-mono text-[11px] uppercase tracking-normal text-signal"
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
