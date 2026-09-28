import { useEffect, useRef, useState } from 'react'
import { Application } from '@splinetool/runtime'

export function SplineMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [activeCoords, setActiveCoords] = useState<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let app: Application | null = null
    let active = true

    try {
      app = new Application(canvas)
      app
        .load('/models/boxeshover.splinecode')
        .then(() => {
          if (active) {
            setLoading(false)
          }
        })
        .catch((err) => {
          console.error('Spline scene load failed:', err)
          if (active) {
            setLoading(false)
          }
        })
    } catch (err) {
      console.error('Spline init error:', err)
      setLoading(false)
    }

    return () => {
      active = false
      if (app) {
        try {
          app.dispose()
        } catch {
          // noop on teardown
        }
      }
    }
  }, [])

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
        {/* Header Telemetry */}
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_8px_#ff8a3d]" />
              <p className="font-mono text-xs uppercase tracking-widest text-signal">
                Interactive Buffer // Kinetic Grid
              </p>
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-paper sm:text-3xl">
              Discrete Computational Topology
            </h2>
          </div>

          <div className="flex items-center gap-4 font-mono text-[11px] text-muted">
            <span className="hidden sm:inline">
              COORDS:{' '}
              <span className="text-signal">
                {activeCoords ? `X:${activeCoords.x} Y:${activeCoords.y}` : 'STANDBY'}
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 border border-line bg-ink px-2.5 py-1 text-signal">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
              HOVER ACTIVE
            </span>
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
            LOC // [SYS_GRID_3D]
          </div>
          <div className="pointer-events-none absolute right-3 top-3 z-10 font-mono text-[9px] uppercase tracking-wider text-muted/50">
            SCALE: 1.0X • 60 FPS
          </div>
          <div className="pointer-events-none absolute bottom-3 left-3 z-10 font-mono text-[9px] uppercase tracking-wider text-muted/50">
            SPLINE RUNTIME ENGINE • NO WATERMARK
          </div>

          {/* Loading Indicator */}
          {loading && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/90 font-mono text-xs text-muted">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-signal" />
              <span>INITIALIZING 3D TOPOLOGY...</span>
            </div>
          )}

          {/* Pure Canvas without watermark */}
          <canvas
            ref={canvasRef}
            className="h-full w-full cursor-crosshair touch-none"
            style={{ display: 'block', outline: 'none' }}
          />
        </div>
      </div>
    </section>
  )
}
