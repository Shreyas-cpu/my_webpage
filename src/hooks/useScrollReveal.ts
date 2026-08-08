import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Queries all `[data-reveal]` elements inside the given container and
 * animates them in when they enter the viewport.
 *
 * Elements with `data-reveal-stagger` on a parent will have their
 * direct children staggered instead.
 *
 * Under `prefers-reduced-motion` everything is set to its final state
 * immediately — no animations fire.
 */
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) {
      // Make sure nothing is invisible
      const els = container.querySelectorAll<HTMLElement>('[data-reveal]')
      els.forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
      return
    }

    const ctx = gsap.context(() => {
      // Individual reveal elements
      const singles = container.querySelectorAll<HTMLElement>(
        '[data-reveal]:not([data-reveal-stagger] *)',
      )

      singles.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        )
      })

      // Stagger groups
      const staggerGroups = container.querySelectorAll<HTMLElement>(
        '[data-reveal-stagger]',
      )

      staggerGroups.forEach((group) => {
        const children = group.querySelectorAll<HTMLElement>('[data-reveal]')
        if (!children.length) return

        gsap.fromTo(
          children,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        )
      })
    }, container)

    return () => {
      ctx.revert()
    }
  }, [containerRef])
}
