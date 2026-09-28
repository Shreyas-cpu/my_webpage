import { useEffect, useRef, useState } from 'react'
import { Application } from '@splinetool/runtime'

export function HeroDroid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let app: Application | null = null
    let active = true

    try {
      app = new Application(canvas)
      app
        .load('/models/droid.splinecode')
        .then(() => {
          if (active) setLoading(false)
        })
        .catch((err) => {
          console.error('Droid load failed:', err)
          if (active) setLoading(false)
        })
    } catch (err) {
      console.error('Droid init error:', err)
      setLoading(false)
    }

    // Pause WebGL rendering when offscreen to preserve 100% GPU for rest of page
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!app) return
        try {
          if (entry.isIntersecting) {
            app.play()
          } else {
            app.stop()
          }
        } catch {
          // safe ignore
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    return () => {
      active = false
      observer.disconnect()
      if (app) {
        try {
          app.dispose()
        } catch {
          // teardown safely
        }
      }
    }
  }, [])

  return (
    <div className="relative pointer-events-auto h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] lg:h-[440px] lg:w-[440px]">
      {/* Telemetry Pill */}
      <div className="absolute bottom-2 right-6 z-10 flex items-center gap-2 rounded-full border border-signal/30 bg-ink-soft/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-signal shadow-[0_0_12px_rgba(255,138,61,0.15)] backdrop-blur">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
        </span>
        AI Companion • Interactive
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[11px] text-muted">
          <span className="animate-pulse">SYNCHRONIZING DROID...</span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab active:cursor-grabbing touch-none"
        style={{ display: 'block', outline: 'none', willChange: 'transform', transform: 'translateZ(0)' }}
      />
    </div>
  )
}
