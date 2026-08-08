import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

type SectionShellProps = {
  eyebrow: string
  title: string
  id: string
  children: React.ReactNode
}

export function SectionShell({ eyebrow, title, id, children }: SectionShellProps) {
  const sectionRef = useRef<HTMLElement>(null)
  useScrollReveal(sectionRef)

  return (
    <section
      className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28"
      id={id}
      ref={sectionRef}
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-normal text-signal" data-reveal>
            {eyebrow}
          </p>
          <h2
            className="mt-4 max-w-sm font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl"
            data-reveal
          >
            {title}
          </h2>
        </div>
        <div data-reveal>{children}</div>
      </div>
    </section>
  )
}
