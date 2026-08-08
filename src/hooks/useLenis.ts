import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Initialises Lenis smooth scrolling and exposes the instance so other
 * parts of the app can call `lenis.scrollTo(target)` for anchor navigation.
 *
 * Disables itself when the user prefers reduced motion — native browser
 * scroll takes over instead.
 */
export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
