import { useEffect, useRef } from 'react'

interface NodeItem {
  readonly label: string
  readonly x: number
  readonly y: number
}

const nodes: readonly NodeItem[] = [
  { label: 'LLM', x: 0.18, y: 0.28 },
  { label: 'MCP Gateway', x: 0.46, y: 0.22 },
  { label: 'SAP BTP', x: 0.78, y: 0.32 },
  { label: 'OData API', x: 0.65, y: 0.62 },
  { label: 'AURUM Engines', x: 0.30, y: 0.68 },
  { label: 'Enterprise Dispatch', x: 0.82, y: 0.76 },
]

const edges: readonly (readonly [number, number])[] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [0, 4],
  [4, 5],
  [3, 5],
  [2, 3],
]

const mobileNodes: readonly NodeItem[] = [
  { label: 'LLM', x: 0.20, y: 0.30 },
  { label: 'MCP', x: 0.50, y: 0.24 },
  { label: 'SAP', x: 0.80, y: 0.34 },
]

const mobileEdges: readonly (readonly [number, number])[] = [
  [0, 1],
  [1, 2],
]

// Ambient background starfield particles
const STAR_COUNT = 32
interface Star {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  alpha: number
}

export function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = canvas.getContext('2d')
    if (!context) return

    let animationFrame = 0
    let pointerX = 0
    let pointerY = 0
    let rawMouseX = -1000
    let rawMouseY = -1000
    let width = 0
    let height = 0
    let clickRipple: { x: number; y: number; radius: number; maxRadius: number; alpha: number } | null = null

    const isMobile = () => window.innerWidth < 640

    // Initialize ambient stars
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.00015,
      speedY: (Math.random() - 0.5) * 0.00015,
      alpha: Math.random() * 0.3 + 0.1,
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const handlePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      rawMouseX = event.clientX - rect.left
      rawMouseY = event.clientY - rect.top
      if (!isMobile()) {
        pointerX = (rawMouseX - rect.width / 2) * 0.024
        pointerY = (rawMouseY - rect.height / 2) * 0.024
      }
    }

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      clickRipple = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        radius: 4,
        maxRadius: Math.min(width, height) * 0.45,
        alpha: 0.9,
      }
    }

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height)

      const mobile = isMobile()
      const activeNodes = mobile ? mobileNodes : nodes
      const activeEdges = mobile ? mobileEdges : edges

      const progress = prefersReduced ? 1 : Math.min(time / 1800, 1)
      const pulse = prefersReduced ? 0.6 : (Math.sin(time / 380) + 1) / 2
      const resolved = prefersReduced ? 1 : Math.min(Math.max((time - 500) / 1400, 0), 1)

      // 1. Draw Ambient Constellation Starfield
      if (!prefersReduced) {
        context.fillStyle = 'rgba(237, 239, 243, 0.25)'
        stars.forEach((star) => {
          star.x = (star.x + star.speedX + 1) % 1
          star.y = (star.y + star.speedY + 1) % 1
          const sx = star.x * width + pointerX * 0.3
          const sy = star.y * height + pointerY * 0.3
          context.globalAlpha = star.alpha
          context.beginPath()
          context.arc(sx, sy, star.size, 0, Math.PI * 2)
          context.fill()
        })
      }

      // 2. Compute Nodes Positions
      const points = activeNodes.map((node, index) => {
        const settleX = (index % 2 === 0 ? -1 : 1) * (1 - resolved) * (mobile ? 18 : 36)
        const settleY = (index < (mobile ? 2 : 3) ? -1 : 1) * (1 - resolved) * (mobile ? 14 : 28)
        const px = node.x * width + (mobile ? 0 : pointerX) + settleX
        const py = node.y * height + (mobile ? 0 : pointerY) + settleY

        // Proximity detection
        const dx = rawMouseX - px
        const dy = rawMouseY - py
        const dist = Math.sqrt(dx * dx + dy * dy)
        const isHovered = !mobile && dist < 70
        const proximity = !mobile && dist < 120 ? Math.max(0, 1 - dist / 120) : 0

        return {
          ...node,
          px,
          py,
          isHovered,
          proximity,
        }
      })

      // 3. Draw Click Ripple Shockwave
      if (clickRipple && !prefersReduced) {
        context.save()
        context.strokeStyle = `rgba(255, 138, 61, ${clickRipple.alpha})`
        context.lineWidth = 2
        context.beginPath()
        context.arc(clickRipple.x, clickRipple.y, clickRipple.radius, 0, Math.PI * 2)
        context.stroke()
        context.restore()

        clickRipple.radius += 5.5
        clickRipple.alpha *= 0.94
        if (clickRipple.radius > clickRipple.maxRadius || clickRipple.alpha < 0.02) {
          clickRipple = null
        }
      }

      // 4. Draw Edges with Traveling Packets
      activeEdges.forEach(([from, to], edgeIndex) => {
        const start = points[from]
        const end = points[to]
        const lineProgress = Math.min(Math.max(progress * 1.3 - edgeIndex * 0.08, 0), 1)
        const currentX = start.px + (end.px - start.px) * lineProgress
        const currentY = start.py + (end.py - start.py) * lineProgress

        const edgeProximity = Math.max(start.proximity, end.proximity)

        // Bus Wire Line
        context.beginPath()
        context.strokeStyle = edgeProximity > 0.3
          ? `rgba(255, 138, 61, ${0.25 + edgeProximity * 0.35})`
          : 'rgba(237, 239, 243, 0.09)'
        context.lineWidth = edgeProximity > 0.3 ? 1.8 : 1
        context.moveTo(start.px, start.py)
        context.lineTo(currentX, currentY)
        context.stroke()

        // Multi-packet Data Stream
        if (lineProgress > 0.85 && !prefersReduced) {
          const packetOffsets = [0, 0.45]
          packetOffsets.forEach((offset) => {
            const travel = (time / 1100 + edgeIndex * 0.22 + offset) % 1
            const pulseX = start.px + (end.px - start.px) * travel
            const pulseY = start.py + (end.py - start.py) * travel

            // Packet glow halo
            const glowGradient = context.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 6)
            glowGradient.addColorStop(0, `rgba(255, 138, 61, ${0.75 + pulse * 0.25})`)
            glowGradient.addColorStop(1, 'rgba(255, 138, 61, 0)')

            context.fillStyle = glowGradient
            context.beginPath()
            context.arc(pulseX, pulseY, 6, 0, Math.PI * 2)
            context.fill()

            // Core packet
            context.fillStyle = '#ffffff'
            context.beginPath()
            context.arc(pulseX, pulseY, mobile ? 1.8 : 2.2, 0, Math.PI * 2)
            context.fill()
          })
        }
      })

      // 5. Draw Strategic Nodes
      points.forEach((node, index) => {
        const nodeProgress = Math.min(Math.max(progress * 1.4 - index * 0.06, 0), 1)
        const hoverBoost = node.proximity * 4

        // Concentric Orbit Ring
        context.beginPath()
        context.strokeStyle = node.isHovered
          ? 'rgba(255, 138, 61, 0.85)'
          : `rgba(237, 239, 243, ${0.14 + nodeProgress * 0.2 + node.proximity * 0.3})`
        context.lineWidth = node.isHovered ? 2 : 1
        context.arc(
          node.px,
          node.py,
          (mobile ? 12 : 16) + pulse * (mobile ? 2.5 : 4) + hoverBoost,
          0,
          Math.PI * 2
        )
        context.stroke()

        // Inner Core Node
        context.beginPath()
        context.fillStyle = node.isHovered
          ? '#ffffff'
          : `rgba(255, 138, 61, ${0.45 + nodeProgress * 0.55})`
        context.arc(
          node.px,
          node.py,
          (mobile ? 3.5 : 5) + nodeProgress * (mobile ? 2.5 : 3.5),
          0,
          Math.PI * 2
        )
        context.fill()

        // Node Glow Aura on Hover
        if (node.proximity > 0.2) {
          const aura = context.createRadialGradient(node.px, node.py, 2, node.px, node.py, 32)
          aura.addColorStop(0, `rgba(255, 138, 61, ${node.proximity * 0.45})`)
          aura.addColorStop(1, 'rgba(255, 138, 61, 0)')
          context.fillStyle = aura
          context.beginPath()
          context.arc(node.px, node.py, 32, 0, Math.PI * 2)
          context.fill()
        }

        // High-Precision Label
        context.fillStyle = node.isHovered
          ? '#ff8a3d'
          : `rgba(237, 239, 243, ${0.45 + nodeProgress * 0.55})`
        context.font = `${node.isHovered ? '600' : '500'} ${mobile ? 9.5 : 12}px JetBrains Mono`
        context.textAlign = 'center'
        context.fillText(node.label, node.px, node.py - (mobile ? 16 : 24))
      })

      if (!prefersReduced) {
        animationFrame = window.requestAnimationFrame(draw)
      }
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointer, { passive: true })
    window.addEventListener('click', handleClick)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointer)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <canvas
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-95 transition-opacity duration-300"
      ref={canvasRef}
    />
  )
}
