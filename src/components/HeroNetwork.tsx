import { useEffect, useRef } from 'react'

interface NodeItem {
  readonly label: string
  readonly x: number
  readonly y: number
  readonly polarity: 'intelligence' | 'enterprise'
}

// Comprehensive 24-node tech constellation mesh covering Shreyas's full technical stack
const nodes: readonly NodeItem[] = [
  // 0..4: Top Intelligence & Agent Tier
  { label: 'Claude / Gemini API', x: 0.07, y: 0.13, polarity: 'intelligence' },
  { label: 'FastMCP Server', x: 0.26, y: 0.09, polarity: 'intelligence' },
  { label: 'Model Context Protocol', x: 0.49, y: 0.07, polarity: 'intelligence' },
  { label: 'LangGraph Agents', x: 0.72, y: 0.10, polarity: 'intelligence' },
  { label: 'Multi-Agent Mesh', x: 0.91, y: 0.13, polarity: 'intelligence' },

  // 5..8: Right Enterprise & SAP Tier
  { label: 'SAP BTP Core', x: 0.93, y: 0.27, polarity: 'enterprise' },
  { label: 'OData Gateway', x: 0.86, y: 0.43, polarity: 'enterprise' },
  { label: 'SAP MM / SD / FI', x: 0.92, y: 0.58, polarity: 'enterprise' },
  { label: 'Enterprise ERP', x: 0.82, y: 0.70, polarity: 'enterprise' },

  // 9..15: Mid-Canvas Cross-Domain Matrix
  { label: 'FastAPI Services', x: 0.65, y: 0.35, polarity: 'enterprise' },
  { label: 'Vector DB / RAG', x: 0.38, y: 0.22, polarity: 'intelligence' },
  { label: 'RAG Pipeline', x: 0.18, y: 0.26, polarity: 'intelligence' },
  { label: 'Context Buffer', x: 0.05, y: 0.39, polarity: 'intelligence' },
  { label: 'PyTorch & ML', x: 0.12, y: 0.55, polarity: 'intelligence' },
  { label: 'Vision LLM / OCR', x: 0.30, y: 0.46, polarity: 'intelligence' },
  { label: 'WebSocket Stream', x: 0.54, y: 0.48, polarity: 'enterprise' },

  // 16..23: Lower Canvas & Systems Tier
  { label: 'AURUM Engine', x: 0.25, y: 0.68, polarity: 'intelligence' },
  { label: 'Drone Telemetry', x: 0.07, y: 0.74, polarity: 'intelligence' },
  { label: 'Linux / Arch', x: 0.14, y: 0.89, polarity: 'enterprise' },
  { label: 'Docker Engine', x: 0.34, y: 0.87, polarity: 'enterprise' },
  { label: 'PostgreSQL', x: 0.52, y: 0.84, polarity: 'enterprise' },
  { label: 'Redis Cache', x: 0.70, y: 0.86, polarity: 'enterprise' },
  { label: 'TypeScript / React', x: 0.88, y: 0.84, polarity: 'enterprise' },
  { label: 'State Ledger', x: 0.46, y: 0.66, polarity: 'enterprise' },
]

const edges: readonly (readonly [number, number])[] = [
  // Top AI Spine
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 11],
  [1, 10],
  [2, 10],
  [2, 9],
  [3, 9],
  [4, 5],
  // Mid-Left Intelligence Cluster
  [11, 10],
  [11, 12],
  [12, 13],
  [13, 14],
  [10, 14],
  // Enterprise & SAP Bus
  [5, 6],
  [6, 7],
  [7, 8],
  [6, 9],
  [9, 15],
  // MCP ↔ Enterprise Core Bridge
  [2, 6],
  [10, 15],
  [14, 15],
  [14, 23],
  [15, 23],
  [15, 6],
  // Mid to Lower Systems
  [13, 16],
  [13, 17],
  [16, 17],
  [16, 23],
  [23, 20],
  [23, 9],
  [15, 21],
  [8, 22],
  // Bottom Infrastructure Mesh
  [17, 18],
  [18, 19],
  [19, 20],
  [20, 21],
  [21, 22],
  [16, 19],
  [19, 23],
  [20, 15],
  [21, 8],
  [7, 22],
  // Diagonal Grid Reinforcements
  [1, 11],
  [3, 15],
  [6, 23],
  [12, 17],
  [14, 16],
]

const mobileNodes: readonly NodeItem[] = [
  { label: 'Claude / Gemini', x: 0.12, y: 0.14, polarity: 'intelligence' },
  { label: 'Model Context Protocol', x: 0.50, y: 0.10, polarity: 'intelligence' },
  { label: 'SAP BTP', x: 0.88, y: 0.16, polarity: 'enterprise' },
  { label: 'FastMCP', x: 0.22, y: 0.44, polarity: 'intelligence' },
  { label: 'OData Gateway', x: 0.80, y: 0.46, polarity: 'enterprise' },
  { label: 'Vector DB', x: 0.20, y: 0.82, polarity: 'intelligence' },
  { label: 'PostgreSQL', x: 0.80, y: 0.82, polarity: 'enterprise' },
]

const mobileEdges: readonly (readonly [number, number])[] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 4],
  [2, 4],
  [3, 5],
  [4, 6],
  [5, 6],
]

const STAR_COUNT = 32
interface Star {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  alpha: number
  color: string
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
    let clickRipple: { x: number; y: number; radius: number; maxRadius: number; alpha: number; color: string } | null = null

    const isMobile = () => window.innerWidth < 640

    // Subtle background particles
    const stars: Star[] = Array.from({ length: STAR_COUNT }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.4 + 0.5,
      speedX: (Math.random() - 0.5) * 0.00015,
      speedY: (Math.random() - 0.5) * 0.00015,
      alpha: Math.random() * 0.20 + 0.08,
      color: i % 2 === 0 ? 'rgba(0, 240, 255, ' : 'rgba(255, 138, 61, ',
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
        pointerX = (rawMouseX - rect.width / 2) * 0.016
        pointerY = (rawMouseY - rect.height / 2) * 0.016
      }
    }

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      clickRipple = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        radius: 6,
        maxRadius: Math.min(width, height) * 0.45,
        alpha: 0.85,
        color: event.clientX > width / 2 ? '#00f0ff' : '#ff8a3d',
      }
    }

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height)

      const mobile = isMobile()
      const activeNodes = mobile ? mobileNodes : nodes
      const activeEdges = mobile ? mobileEdges : edges

      const progress = prefersReduced ? 1 : Math.min(time / 1600, 1)
      const pulse = prefersReduced ? 0.6 : (Math.sin(time / 360) + 1) / 2
      const resolved = prefersReduced ? 1 : Math.min(Math.max((time - 400) / 1200, 0), 1)

      // 1. Draw Ambient Particles
      if (!prefersReduced) {
        stars.forEach((star) => {
          star.x = (star.x + star.speedX + 1) % 1
          star.y = (star.y + star.speedY + 1) % 1
          const sx = star.x * width + pointerX * 0.25
          const sy = star.y * height + pointerY * 0.25
          context.fillStyle = `${star.color}${star.alpha})`
          context.beginPath()
          context.arc(sx, sy, star.size, 0, Math.PI * 2)
          context.fill()
        })
      }

      // 2. Compute Nodes Positions
      const points = activeNodes.map((node, index) => {
        const settleX = (index % 2 === 0 ? -1 : 1) * (1 - resolved) * (mobile ? 12 : 24)
        const settleY = (index < (mobile ? 2 : 4) ? -1 : 1) * (1 - resolved) * (mobile ? 10 : 20)
        const px = node.x * width + (mobile ? 0 : pointerX) + settleX
        const py = node.y * height + (mobile ? 0 : pointerY) + settleY

        const dx = rawMouseX - px
        const dy = rawMouseY - py
        const dist = Math.sqrt(dx * dx + dy * dy)
        const isHovered = !mobile && dist < 65
        const proximity = !mobile && dist < 130 ? Math.max(0, 1 - dist / 130) : 0

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
        context.strokeStyle = clickRipple.color
        context.globalAlpha = clickRipple.alpha
        context.lineWidth = 2.0
        context.beginPath()
        context.arc(clickRipple.x, clickRipple.y, clickRipple.radius, 0, Math.PI * 2)
        context.stroke()
        context.restore()

        clickRipple.radius += 6.0
        clickRipple.alpha *= 0.93
        if (clickRipple.radius > clickRipple.maxRadius || clickRipple.alpha < 0.02) {
          clickRipple = null
        }
      }

      // 4. Draw Edges with Traveling Dual-Tone Packets
      activeEdges.forEach(([from, to], edgeIndex) => {
        const start = points[from]
        const end = points[to]
        if (!start || !end) return

        const lineProgress = Math.min(Math.max(progress * 1.25 - edgeIndex * 0.012, 0), 1)
        const currentX = start.px + (end.px - start.px) * lineProgress
        const currentY = start.py + (end.py - start.py) * lineProgress

        const edgeProximity = Math.max(start.proximity, end.proximity)
        const isEnterprise = end.polarity === 'enterprise' || start.polarity === 'enterprise'

        // Wire Bus Line - Clean, distinguishable cybernetic grid
        context.beginPath()
        context.strokeStyle = edgeProximity > 0.25
          ? (isEnterprise ? `rgba(0, 240, 255, ${0.35 + edgeProximity * 0.40})` : `rgba(255, 138, 61, ${0.35 + edgeProximity * 0.40})`)
          : (isEnterprise ? 'rgba(0, 240, 255, 0.11)' : 'rgba(255, 138, 61, 0.11)')
        context.lineWidth = edgeProximity > 0.25 ? 1.5 : 0.9
        context.moveTo(start.px, start.py)
        context.lineTo(currentX, currentY)
        context.stroke()

        // Fast Data Packets (Subtle, sleek streams)
        if (lineProgress > 0.7 && !prefersReduced) {
          const travel = (time / 1400 + edgeIndex * 0.13) % 1
          const pulseX = start.px + (end.px - start.px) * travel
          const pulseY = start.py + (end.py - start.py) * travel

          // Packet glow halo
          const glowGradient = context.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 5)
          glowGradient.addColorStop(0, isEnterprise ? `rgba(0, 240, 255, ${0.65 + pulse * 0.25})` : `rgba(255, 138, 61, ${0.65 + pulse * 0.25})`)
          glowGradient.addColorStop(1, 'transparent')

          context.fillStyle = glowGradient
          context.beginPath()
          context.arc(pulseX, pulseY, 5, 0, Math.PI * 2)
          context.fill()

          // Core packet
          context.fillStyle = '#ffffff'
          context.beginPath()
          context.arc(pulseX, pulseY, mobile ? 1.2 : 1.6, 0, Math.PI * 2)
          context.fill()
        }
      })

      // 5. Draw Strategic Nodes with Badges
      points.forEach((node, index) => {
        const nodeProgress = Math.min(Math.max(progress * 1.3 - index * 0.02, 0), 1)
        const isEnterprise = node.polarity === 'enterprise'
        const baseColor = isEnterprise ? '#00f0ff' : '#ff8a3d'
        const hoverBoost = node.proximity * 4

        // Concentric Orbit Ring - Ethereal and subtle
        context.beginPath()
        context.strokeStyle = node.isHovered
          ? baseColor
          : (isEnterprise ? `rgba(0, 240, 255, ${0.18 + node.proximity * 0.35})` : `rgba(255, 138, 61, ${0.18 + node.proximity * 0.35})`)
        context.lineWidth = node.isHovered ? 1.8 : 0.9
        context.arc(
          node.px,
          node.py,
          (mobile ? 10 : 13) + pulse * (mobile ? 1.5 : 2.5) + hoverBoost,
          0,
          Math.PI * 2
        )
        context.stroke()

        // Inner Core Node
        context.beginPath()
        context.fillStyle = node.isHovered
          ? '#ffffff'
          : (isEnterprise ? 'rgba(0, 240, 255, 0.50)' : 'rgba(255, 138, 61, 0.50)')
        context.arc(
          node.px,
          node.py,
          (mobile ? 3.0 : 4.0) + nodeProgress * (mobile ? 1.2 : 1.6),
          0,
          Math.PI * 2
        )
        context.fill()

        // Aura Halo Bloom on hover
        if (node.proximity > 0.15) {
          const aura = context.createRadialGradient(node.px, node.py, 2, node.px, node.py, 28)
          aura.addColorStop(0, isEnterprise ? `rgba(0, 240, 255, ${node.proximity * 0.35})` : `rgba(255, 138, 61, ${node.proximity * 0.35})`)
          aura.addColorStop(1, 'transparent')
          context.fillStyle = aura
          context.beginPath()
          context.arc(node.px, node.py, 28, 0, Math.PI * 2)
          context.fill()
        }

        // Crisp Label Pill
        const fontSize = mobile ? 9.5 : 10.5
        context.font = `${node.isHovered ? '600' : '400'} ${fontSize}px JetBrains Mono`
        const textWidth = context.measureText(node.label).width
        const pillY = node.py - (mobile ? 14 : 18)

        // Pill background badge (semi-transparent, non-distracting)
        context.fillStyle = node.isHovered ? 'rgba(11, 14, 20, 0.94)' : 'rgba(11, 14, 20, 0.55)'
        context.strokeStyle = node.isHovered ? baseColor : (isEnterprise ? 'rgba(0, 240, 255, 0.20)' : 'rgba(255, 138, 61, 0.20)')
        context.lineWidth = 1
        const padX = 6
        const padY = 3
        context.beginPath()
        context.roundRect(node.px - textWidth / 2 - padX, pillY - fontSize + 1, textWidth + padX * 2, fontSize + padY, 4)
        context.fill()
        context.stroke()

        // Text label: muted in background, brightens to primary color when hovered
        context.fillStyle = node.isHovered ? baseColor : 'rgba(237, 239, 243, 0.55)'
        context.textAlign = 'center'
        context.fillText(node.label, node.px, pillY)
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
      className="absolute inset-0 h-full w-full opacity-65 hover:opacity-85 transition-opacity duration-300 pointer-events-none sm:pointer-events-auto"
      ref={canvasRef}
    />
  )
}
