import { useEffect, useRef } from 'react'

const nodes = [
  { label: 'LLM', x: 0.2, y: 0.28 },
  { label: 'MCP', x: 0.48, y: 0.2 },
  { label: 'SAP', x: 0.76, y: 0.32 },
  { label: 'OData', x: 0.62, y: 0.58 },
  { label: 'AURUM', x: 0.32, y: 0.68 },
  { label: 'Dispatch', x: 0.82, y: 0.76 },
] as const

const edges = [
  [0, 1],
  [1, 2],
  [1, 3],
  [0, 4],
  [4, 5],
  [3, 5],
] as const

// Reduced node set for mobile — keeps the three most important labels
const mobileNodes = [
  { label: 'LLM', x: 0.22, y: 0.3 },
  { label: 'MCP', x: 0.5, y: 0.22 },
  { label: 'SAP', x: 0.78, y: 0.34 },
] as const

const mobileEdges = [
  [0, 1],
  [1, 2],
] as const

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
    let width = 0
    let height = 0

    const isMobile = () => window.innerWidth < 640

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
      // Disable parallax on mobile
      if (isMobile()) return
      const rect = canvas.getBoundingClientRect()
      pointerX = (event.clientX - rect.left - rect.width / 2) * 0.018
      pointerY = (event.clientY - rect.top - rect.height / 2) * 0.018
    }

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height)

      const mobile = isMobile()
      const activeNodes = mobile ? mobileNodes : nodes
      const activeEdges = mobile ? mobileEdges : edges

      const progress = prefersReduced ? 1 : Math.min(time / 2200, 1)
      const pulse = prefersReduced ? 0.7 : (Math.sin(time / 420) + 1) / 2
      const resolved = prefersReduced ? 1 : Math.min(Math.max((time - 700) / 1800, 0), 1)

      context.globalCompositeOperation = 'source-over'
      context.strokeStyle = 'rgba(237, 239, 243, 0.08)'
      context.lineWidth = 1

      const points = activeNodes.map((node, index) => {
        const settleX = (index % 2 === 0 ? -1 : 1) * (1 - resolved) * (mobile ? 18 : 36)
        const settleY = (index < (mobile ? 2 : 3) ? -1 : 1) * (1 - resolved) * (mobile ? 14 : 28)
        return {
          ...node,
          px: node.x * width + (mobile ? 0 : pointerX) + settleX,
          py: node.y * height + (mobile ? 0 : pointerY) + settleY,
        }
      })

      activeEdges.forEach(([from, to], edgeIndex) => {
        const start = points[from]
        const end = points[to]
        const lineProgress = Math.min(Math.max(progress * 1.4 - edgeIndex * 0.08, 0), 1)
        const currentX = start.px + (end.px - start.px) * lineProgress
        const currentY = start.py + (end.py - start.py) * lineProgress

        context.beginPath()
        context.moveTo(start.px, start.py)
        context.lineTo(currentX, currentY)
        context.stroke()

        if (lineProgress > 0.9) {
          const travel = (time / 950 + edgeIndex * 0.18) % 1
          const pulseX = start.px + (end.px - start.px) * travel
          const pulseY = start.py + (end.py - start.py) * travel
          context.beginPath()
          context.fillStyle = `rgba(255, 138, 61, ${0.35 + pulse * 0.45})`
          context.arc(pulseX, pulseY, mobile ? 2.5 : 3.2, 0, Math.PI * 2)
          context.fill()
        }
      })

      points.forEach((node, index) => {
        const nodeProgress = Math.min(Math.max(progress * 1.5 - index * 0.07, 0), 1)
        context.beginPath()
        context.fillStyle = `rgba(255, 138, 61, ${0.25 + nodeProgress * 0.75})`
        context.arc(node.px, node.py, (mobile ? 3 : 4) + nodeProgress * (mobile ? 3 : 4), 0, Math.PI * 2)
        context.fill()

        context.beginPath()
        context.strokeStyle = `rgba(237, 239, 243, ${0.14 + nodeProgress * 0.28})`
        context.arc(node.px, node.py, (mobile ? 10 : 14) + pulse * (mobile ? 2 : 4), 0, Math.PI * 2)
        context.stroke()

        context.fillStyle = `rgba(237, 239, 243, ${0.38 + nodeProgress * 0.62})`
        context.font = `500 ${mobile ? 9 : 11}px JetBrains Mono`
        context.textAlign = 'center'
        context.fillText(node.label, node.px, node.py - (mobile ? 14 : 20))
      })

      if (!prefersReduced) {
        animationFrame = window.requestAnimationFrame(draw)
      }
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointer)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointer)
    }
  }, [])

  return (
    <canvas
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-95"
      ref={canvasRef}
    />
  )
}
