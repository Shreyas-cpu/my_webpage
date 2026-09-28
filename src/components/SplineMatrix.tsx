import { useEffect, useRef, useState } from 'react'
import { Application } from '@splinetool/runtime'

type MatrixModel = 'boxes' | 'orb'

export function SplineMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [model, setModel] = useState<MatrixModel>('boxes')
  const [loading, setLoading] = useState(true)
  const [activeCoords, setActiveCoords] = useState<{ x: number; y: number } | null>(null)
  const appRef = useRef<Application | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let active = true
    setLoading(true)

    // Dispose previous instance if switching
    if (appRef.current) {
      try {
        appRef.current.dispose()
      } catch {
        // teardown
      }
      appRef.current = null
    }

    try {
      const app = new Application(canvas)
      appRef.current = app

      const modelPath =
        model === 'boxes'
          ? '/models/boxeshover.splinecode'
          : '/models/reactiveorb.splinecode'

      app
        .load(modelPath)
        .then(() => {
          if (active) setLoading(false)
        })
        .catch((err) => {
          console.error('Spline scene load failed:', err)
          if (active) setLoading(false)
        })
    } catch (err) {
      console.error('Spline init error:', err)
      if (active) setLoading(false)
    }

    // Viewport Culling: Pause 3D execution when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!appRef.current) return
        try {
          if (entry.isIntersecting) {
            appRef.current.play()
          } else {
            appRef.current.stop()
          }
        } catch {
          // ignore
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    return () => {
      active = false
      observer.disconnect()
      if (appRef.current) {
        try {
          appRef.current.dispose()
        } catch {
          // teardown
        }
        appRef.current = null
      }
    }
  }, [model])

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.round(e.clientX - rect.left)
    const y = Math.round(e.clientY - rect.top)
    setActiveCoords({ x, y })
  }

  const handlePointerLeave = () => {
    setActiveCoords(null)
  }

  return (
    <section className="relative px-6 py-16 sm:px-10 lg:px-16" id="matrix">
      <div className="mx-auto max-w-6xl">
        {/* Header Telemetry & Switcher */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_#ff8a3d]" />
              <p className="font-mono text-xs uppercase tracking-widest text-signal">
                Interactive Buffer // Kinetic 3D Systems
              </p>
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-paper sm:text-3xl">
              {model === 'boxes'
                ? 'Discrete Computational Topology'
                : 'Reactive Neural Particle Nucleus'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Model Switcher Tabs */}
            <div className="flex items-center border border-line bg-ink p-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => setModel('boxes')}
                className={[
                  'px-3 py-1.5 uppercase transition-all duration-200',
                  model === 'boxes'
                    ? 'bg-signal text-ink font-semibold shadow-[0_0_10px_rgba(255,138,61,0.3)]'
                    : 'text-muted hover:text-paper',
                ].join(' ')}
              >
                3D Boxes Grid
              </button>
              <button
                type="button"
                onClick={() => setModel('orb')}
                className={[
                  'px-3 py-1.5 uppercase transition-all duration-200',
                  model === 'orb'
                    ? 'bg-signal text-ink font-semibold shadow-[0_0_10px_rgba(255,138,61,0.3)]'
                    : 'text-muted hover:text-paper',
                ].join(' ')}
              >
                Reactive Orb
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-4 font-mono text-[11px] text-muted">
              <span>
                COORDS:{' '}
                <span className="text-signal">
                  {activeCoords ? `X:${activeCoords.x} Y:${activeCoords.y}` : 'STANDBY'}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* 3D Canvas Viewport */}
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative h-[480px] w-full overflow-hidden border border-line/90 bg-[#000000] shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          {/* Subtle Grid Corner Accents */}
          <div className="pointer-events-none absolute left-3 top-3 z-10 font-mono text-[9px] uppercase tracking-wider text-muted/50">
            LOC // [SYS_3D_{model.toUpperCase()}]
          </div>
          <div className="pointer-events-none absolute right-3 top-3 z-10 font-mono text-[9px] uppercase tracking-wider text-muted/50">
            SCALE: 1.0X • 60 FPS • NO WATERMARK
          </div>
          <div className="pointer-events-none absolute bottom-3 left-3 z-10 font-mono text-[9px] uppercase tracking-wider text-muted/50">
            SPLINE RUNTIME ENGINE • NATIVE WEBGL CANVAS
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/90 font-mono text-xs text-muted">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-signal" />
              <span>INITIALIZING 3D {model.toUpperCase()}...</span>
            </div>
          )}

          {/* Pure Canvas without watermark */}
          <canvas
            ref={canvasRef}
            className="h-full w-full cursor-crosshair touch-none"
            style={{ display: 'block', outline: 'none', willChange: 'transform', transform: 'translateZ(0)' }}
          />
        </div>
      </div>
    </section>
  )
}
