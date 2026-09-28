import { useEffect, useRef } from 'react'

interface NodeItem {
  readonly label: string
  readonly x: number
  readonly y: number
  readonly polarity: 'intelligence' | 'enterprise'
}

// Perimeter-distributed nodes: spreads the network across the outer margins
// leaving the center-left completely free for foreground typography
const nodes: readonly NodeItem[] = [
  { label: 'LLM Orchestrator', x: 0.08, y: 0.16, polarity: 'intelligence' },
  { label: 'MCP Core Gateway', x: 0.48, y: 0.10, polarity: 'intelligence' },
  { label: 'Agent Mesh', x: 0.76, y: 0.13, polarity: 'intelligence' },
  { label: 'SAP BTP Bus', x: 0.90, y: 0.24, polarity: 'enterprise' },
  { label: 'OData Service', x: 0.88, y: 0.50, polarity: 'enterprise' },
  { label: 'Enterprise Dispatch', x: 0.84, y: 0.82, polarity: 'enterprise' },
  { label: 'State Ledger', x: 0.48, y: 0.88, polarity: 'enterprise' },
  { label: 'Telemetry Hub', x: 0.08, y: 0.84, polarity: 'intelligence' },
  { label: 'Context Buffer', x: 0.06, y: 0.50, polarity: 'intelligence' },
]

const edges: readonly (readonly [number, number])[] = [
  [0, 1], // LLM -> MCP Gateway
  [1, 2], // MCP Gateway -> Agent Mesh
  [2, 3], // Agent Mesh -> SAP BTP
  [3, 4], // SAP BTP -> OData Service
  [4, 5], // OData -> Enterprise Dispatch
  [5, 6], // Dispatch -> State Ledger
  [6, 7], // Ledger -> Telemetry Hub
  [7, 8], // Telemetry -> Context Buffer
  [8, 0], // Context Buffer -> LLM Orchestrator (perimeter loop)
  [1, 4], // Internal bus: MCP Gateway -> OData
  [1, 6], // Internal bus: MCP Gateway -> State Ledger
  [8, 6], // Bottom cross-bus: Buffer -> Ledger
]

const mobileNodes: readonly NodeItem[] = [
  { label: 'LLM', x: 0.12, y: 0.18, polarity: 'intelligence' },
  { label: 'MCP Gateway', x: 0.50, y: 0.12, polarity: 'intelligence' },
  { label: 'SAP BTP', x: 0.88, y: 0.20, polarity: 'enterprise' },
]

const mobileEdges: readonly (readonly [number, number])[] = [
  [0, 1],
  [1, 2],
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

        const lineProgress = Math.min(Math.max(progress * 1.35 - edgeIndex * 0.06, 0), 1)
        const currentX = start.px + (end.px - start.px) * lineProgress
        const currentY = start.py + (end.py - start.py) * lineProgress

        const edgeProximity = Math.max(start.proximity, end.proximity)
        const isEnterprise = end.polarity === 'enterprise' || start.polarity === 'enterprise'

        // Wire Bus Line - Subtle & delicate to keep foreground text prominent
        context.beginPath()
        context.strokeStyle = edgeProximity > 0.25
          ? (isEnterprise ? `rgba(0, 240, 255, ${0.25 + edgeProximity * 0.35})` : `rgba(255, 138, 61, ${0.25 + edgeProximity * 0.35})`)
          : (isEnterprise ? 'rgba(0, 240, 255, 0.08)' : 'rgba(255, 138, 61, 0.08)')
        context.lineWidth = edgeProximity > 0.25 ? 1.6 : 0.9
        context.moveTo(start.px, start.py)
        context.lineTo(currentX, currentY)
        context.stroke()

        // Fast Data Packets
        if (lineProgress > 0.8 && !prefersReduced) {
          const packetOffsets = [0, 0.5]
          packetOffsets.forEach((offset) => {
            const travel = (time / 1150 + edgeIndex * 0.20 + offset) % 1
            const pulseX = start.px + (end.px - start.px) * travel
            const pulseY = start.py + (end.py - start.py) * travel

            // Packet glow halo
            const glowGradient = context.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 6)
            glowGradient.addColorStop(0, isEnterprise ? `rgba(0, 240, 255, ${0.6 + pulse * 0.2})` : `rgba(255, 138, 61, ${0.6 + pulse * 0.2})`)
            glowGradient.addColorStop(1, 'transparent')

            context.fillStyle = glowGradient
            context.beginPath()
            context.arc(pulseX, pulseY, 6, 0, Math.PI * 2)
            context.fill()

            // Core packet
            context.fillStyle = '#ffffff'
            context.beginPath()
            context.arc(pulseX, pulseY, mobile ? 1.5 : 2.0, 0, Math.PI * 2)
            context.fill()
          })
        }
      })

      // 5. Draw Strategic Nodes with Badges
      points.forEach((node, index) => {
        const nodeProgress = Math.min(Math.max(progress * 1.4 - index * 0.05, 0), 1)
        const isEnterprise = node.polarity === 'enterprise'
        const baseColor = isEnterprise ? '#00f0ff' : '#ff8a3d'
        const hoverBoost = node.proximity * 4

        // Concentric Orbit Ring - Ethereal and subtle
        context.beginPath()
        context.strokeStyle = node.isHovered
          ? baseColor
          : (isEnterprise ? `rgba(0, 240, 255, ${0.16 + node.proximity * 0.35})` : `rgba(255, 138, 61, ${0.16 + node.proximity * 0.35})`)
        context.lineWidth = node.isHovered ? 2.0 : 0.9
        context.arc(
          node.px,
          node.py,
          (mobile ? 11 : 14) + pulse * (mobile ? 2 : 3) + hoverBoost,
          0,
          Math.PI * 2
        )
        context.stroke()

        // Inner Core Node
        context.beginPath()
        context.fillStyle = node.isHovered
          ? '#ffffff'
          : (isEnterprise ? 'rgba(0, 240, 255, 0.45)' : 'rgba(255, 138, 61, 0.45)')
        context.arc(
          node.px,
          node.py,
          (mobile ? 3.5 : 4.5) + nodeProgress * (mobile ? 1.5 : 2),
          0,
          Math.PI * 2
        )
        context.fill()

        // Aura Halo Bloom
        if (node.proximity > 0.15) {
          const aura = context.createRadialGradient(node.px, node.py, 2, node.px, node.py, 32)
          aura.addColorStop(0, isEnterprise ? `rgba(0, 240, 255, ${node.proximity * 0.4})` : `rgba(255, 138, 61, ${node.proximity * 0.4})`)
          aura.addColorStop(1, 'transparent')
          context.fillStyle = aura
          context.beginPath()
          context.arc(node.px, node.py, 32, 0, Math.PI * 2)
          context.fill()
        }

        // Crisp Label Pill
        const fontSize = mobile ? 10 : 11
        context.font = `${node.isHovered ? '600' : '400'} ${fontSize}px JetBrains Mono`
        const textWidth = context.measureText(node.label).width
        const pillY = node.py - (mobile ? 16 : 22)

        // Pill background badge (semi-transparent, non-distracting)
        context.fillStyle = node.isHovered ? 'rgba(11, 14, 20, 0.92)' : 'rgba(11, 14, 20, 0.60)'
        context.strokeStyle = node.isHovered ? baseColor : 'rgba(38, 49, 66, 0.45)'
        context.lineWidth = 1
        const padX = 7
        const padY = 3.5
        context.beginPath()
        context.roundRect(node.px - textWidth / 2 - padX, pillY - fontSize + 1, textWidth + padX * 2, fontSize + padY, 4)
        context.fill()
        context.stroke()

        // Text label: muted in background, brightens to primary color when hovered
        context.fillStyle = node.isHovered ? baseColor : 'rgba(237, 239, 243, 0.50)'
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
      className="absolute inset-0 h-full w-full opacity-70 transition-opacity duration-300"
      ref={canvasRef}
    />
  )
}
