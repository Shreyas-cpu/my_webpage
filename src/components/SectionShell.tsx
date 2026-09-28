import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTextScramble } from '../hooks/useTextScramble'

type SectionShellProps = {
  eyebrow: string
  title: string
  id: string
  children: React.ReactNode
}

function ScrambleHeading({ title }: { title: string }) {
  const [triggered, setTriggered] = useState(false)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const scrambled = useTextScramble(title, triggered)

  return (
    <h2
      className="mt-4 max-w-sm font-display text-3xl font-semibold leading-tight text-paper sm:text-4xl"
      data-reveal
      ref={headingRef}
    >
      {scrambled}
    </h2>
  )
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
          <ScrambleHeading title={title} />
        </div>
        <div data-reveal>{children}</div>
      </div>
    </section>
  )
}

