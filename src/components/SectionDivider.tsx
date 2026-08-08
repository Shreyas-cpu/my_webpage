/**
 * A thin visual motif placed between sections.
 * Renders a horizontal line with a small animated signal dot
 * that pulses across it — echoing the hero network's signal aesthetic.
 *
 * Under prefers-reduced-motion, just renders a static line.
 */
export function SectionDivider() {
  return (
    <div className="relative mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
      <div className="relative h-px w-full bg-line">
        {/* Animated signal dot */}
        <div
          className="signal-divider-dot absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-signal"
          style={{ willChange: 'transform' }}
        />
        {/* Glow echo */}
        <div
          className="signal-divider-dot absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #ff8a3d 0%, transparent 70%)',
            willChange: 'transform',
          }}
        />
      </div>
    </div>
  )
}
