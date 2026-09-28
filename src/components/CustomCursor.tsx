import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'

/**
 * Desktop-only interactive high-precision cursor.
 * - Central signal beacon with reactive scale
 * - Outer cyber targeting reticle with corner notches and dynamic magnetism
 * - Morphs when hovering interactive targets (cards, canvas, links)
 * - Automatically disabled on touch and under prefers-reduced-motion
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const isTouch = useRef(false)
  const isVisible = useRef(false)
  const currentHoverType = useRef<'default' | 'card' | 'link' | 'canvas'>('default')

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

    // Dot tracks pointer position precisely
    gsap.set(dot, { x: e.clientX, y: e.clientY })

    // Check hover context
    const target = document.elementFromPoint(e.clientX, e.clientY)
    const magnetic = target?.closest('[data-magnetic]') as HTMLElement | null
    const card = target?.closest('.card-tilt-inner') as HTMLElement | null
    const canvas = target?.closest('canvas') as HTMLElement | null

    if (magnetic) {
      currentHoverType.current = 'link'
      const rect = magnetic.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      gsap.to(ring, {
        x: centerX,
        y: centerY,
        scale: 2.1,
        borderRadius: '8px',
        borderColor: 'rgba(255, 138, 61, 0.85)',
        backgroundColor: 'rgba(255, 138, 61, 0.08)',
        duration: 0.28,
        ease: 'power3.out',
        overwrite: 'auto',
      })

      // Magnetic pull on button
      const pullX = (e.clientX - centerX) * 0.18
      const pullY = (e.clientY - centerY) * 0.18
      gsap.to(magnetic, {
        x: pullX,
        y: pullY,
        duration: 0.28,
        ease: 'power3.out',
      })
    } else if (card || canvas) {
      currentHoverType.current = 'canvas'
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        scale: 1.5,
        borderRadius: '50%',
        borderColor: 'rgba(255, 138, 61, 0.7)',
        backgroundColor: 'rgba(255, 138, 61, 0.03)',
        duration: 0.18,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    } else {
      currentHoverType.current = 'default'
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        scale: 1,
        borderRadius: '50%',
        borderColor: 'rgba(255, 138, 61, 0.4)',
        backgroundColor: 'transparent',
        duration: 0.32,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }, [])

  const onPointerLeaveElement = useCallback(() => {
    const magnetics = document.querySelectorAll<HTMLElement>('[data-magnetic]')
    magnetics.forEach((el) => {
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'power3.out' })
    })

    const ring = ringRef.current
    if (ring) {
      gsap.to(ring, {
        scale: 1,
        borderRadius: '50%',
        borderColor: 'rgba(255, 138, 61, 0.4)',
        backgroundColor: 'transparent',
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }, [])

  const onPointerDown = useCallback(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (ring) {
      gsap.to(ring, { scale: 0.8, duration: 0.12, ease: 'power2.out' })
    }
    if (dot) {
      gsap.to(dot, { scale: 1.4, duration: 0.12, ease: 'power2.out' })
    }
  }, [])

  const onPointerUp = useCallback(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (ring) {
      gsap.to(ring, { scale: 1, duration: 0.24, ease: 'elastic.out(1, 0.5)' })
    }
    if (dot) {
      gsap.to(dot, { scale: 1, duration: 0.24, ease: 'power2.out' })
    }
  }, [])

  useEffect(() => {
    const touchQuery = window.matchMedia('(pointer: coarse)')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (touchQuery.matches || prefersReduced) {
      isTouch.current = true
      return
    }

    document.documentElement.classList.add('custom-cursor-active')

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)

    const magnetics = document.querySelectorAll<HTMLElement>('[data-magnetic]')
    magnetics.forEach((el) => {
      el.addEventListener('pointerleave', onPointerLeaveElement)
    })

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
      {/* Central Signal Point */}
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
          boxShadow: '0 0 8px #ff8a3d',
          opacity: 0,
          willChange: 'transform',
        }}
      />
      {/* Dynamic Cyber Reticle / Snapping Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden md:block"
        style={{
          width: 38,
          height: 38,
          marginLeft: -19,
          marginTop: -19,
          borderRadius: '50%',
          border: '1.5px solid rgba(255, 138, 61, 0.4)',
          boxShadow: '0 0 12px rgba(255, 138, 61, 0.15)',
          opacity: 0,
          willChange: 'transform, border-radius, background-color',
        }}
      />
    </>
  )
}
