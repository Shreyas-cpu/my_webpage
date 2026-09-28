import { useEffect, useRef } from 'react'
import { Application } from '@splinetool/runtime'

export function ContactOrbCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let app: Application | null = null

    try {
      app = new Application(canvas)
      app.load('/models/reactiveorb.splinecode').catch((err) => {
        console.error('Contact orb load failed:', err)
      })
    } catch (err) {
      console.error('Contact orb init error:', err)
    }

    // Viewport Culling: Pause WebGL rendering when offscreen
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
      observer.disconnect()
      if (app) {
        try {
          app.dispose()
        } catch {
          // safe teardown
        }
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* 3D Canvas - Fully interactive with mouse dragging & rotation */}
      <canvas
        ref={canvasRef}
        className="pointer-events-auto h-full w-full scale-135 object-cover opacity-85 transition-opacity duration-700 cursor-grab active:cursor-grabbing touch-none"
        style={{ display: 'block', outline: 'none', willChange: 'transform', transform: 'translateZ(0)' }}
      />

      {/* Cybernetic telemetry watermark in corner */}
      <div className="pointer-events-none absolute bottom-3 right-4 z-10 font-mono text-[9px] uppercase tracking-wider text-muted/50">
        NUCLEUS // REACTIVE ORB • INTERACTIVE
      </div>

      {/* Frosted glass & contrast diffuser overlay */}
      <div className="pointer-events-none absolute inset-0 bg-ink-soft/45 backdrop-blur-[1.5px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-soft/20 via-transparent to-ink/75" />
    </div>
  )
}
