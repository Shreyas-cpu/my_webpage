import { useEffect, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Standardized Scroll-Reveal Engine adhering to Rich Tabor Motion Guidelines:
 * - Enter curve: power3.out (cubic-bezier(0.165, 0.84, 0.44, 1) / --ease-out-quart)
 * - Restrained scale: from scale(0.98) to scale(1) (never scale(0))
 * - Fast initial acceleration for responsiveness, calm landing
 * - Strict reduced-motion fallback (instant reveal, zero transform)
 */
export function useScrollReveal(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) {
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
          { y: 28, scale: 0.985, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.65,
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
          { y: 24, scale: 0.985, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 86%',
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
