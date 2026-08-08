import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

/**
 * Desktop-only custom cursor with two elements:
 * - A small inner dot that tracks the pointer tightly
 * - A larger outer ring that trails behind with a lerp
 *
 * Elements with `data-magnetic` attract the ring on hover.
 * Hidden on touch devices and under prefers-reduced-motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const isTouch = useRef(false)
  const isVisible = useRef(false)

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (isTouch.current) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    if (!isVisible.current) {
      isVisible.current = true
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    // Dot tracks exactly
    gsap.set(dot, { x: e.clientX, y: e.clientY })

    // Ring trails with easing
    gsap.to(ring, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.45,
      ease: 'power2.out',
    })

    // Magnetic pull: check if hovering near a [data-magnetic] element
    const target = document.elementFromPoint(e.clientX, e.clientY)
    const magnetic = target?.closest('[data-magnetic]') as HTMLElement | null

    if (magnetic) {
      const rect = magnetic.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      gsap.to(ring, {
        x: centerX,
        y: centerY,
        scale: 2.2,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true,
      })

      // Subtle shift of the magnetic element itself toward cursor
      const pullX = (e.clientX - centerX) * 0.15
      const pullY = (e.clientY - centerY) * 0.15
      gsap.to(magnetic, {
        x: pullX,
        y: pullY,
        duration: 0.35,
        ease: 'power2.out',
      })
    }
  }, [])

  const onPointerLeaveElement = useCallback(() => {
    // Reset all magnetic elements
    const magnetics = document.querySelectorAll<HTMLElement>('[data-magnetic]')
    magnetics.forEach((el) => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' })
    })

    const ring = ringRef.current
    if (ring) {
      gsap.to(ring, { scale: 1, duration: 0.35, ease: 'power2.out' })
    }
  }, [])

  const onPointerDown = useCallback(() => {
    const ring = ringRef.current
    if (ring) {
      gsap.to(ring, { scale: 0.75, duration: 0.15, ease: 'power2.out' })
    }
  }, [])

  const onPointerUp = useCallback(() => {
    const ring = ringRef.current
    if (ring) {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' })
    }
  }, [])

  useEffect(() => {
    // Detect touch device
    const touchQuery = window.matchMedia('(pointer: coarse)')
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (touchQuery.matches || prefersReduced) {
      isTouch.current = true
      return
    }

    // Hide native cursor
    document.documentElement.classList.add('custom-cursor-active')

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)

    // Listen for mouse leaving magnetic elements
    const attachMagneticListeners = () => {
      const magnetics =
        document.querySelectorAll<HTMLElement>('[data-magnetic]')
      magnetics.forEach((el) => {
        el.addEventListener('pointerleave', onPointerLeaveElement)
      })
      return magnetics
    }

    const magnetics = attachMagneticListeners()

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
      magnetics.forEach((el) => {
        el.removeEventListener('pointerleave', onPointerLeaveElement)
      })
    }
  }, [onPointerMove, onPointerDown, onPointerUp, onPointerLeaveElement])

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: '50%',
          backgroundColor: '#ff8a3d',
          opacity: 0,
          willChange: 'transform',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
        style={{
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 138, 61, 0.45)',
          opacity: 0,
          willChange: 'transform',
        }}
      />
    </>
  )
}
