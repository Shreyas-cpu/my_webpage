/**
 * SectionDivider: Dynamic high-precision data bus conduit between sections.
 * Displays traveling signal pulses across an optical line with micro-telemetry tags.
 * Fully static under prefers-reduced-motion.
 */
export function SectionDivider() {
  return (
    <div className="relative mx-auto my-6 max-w-6xl px-6 sm:px-10 lg:px-16">
      <div className="relative flex items-center justify-between">
        {/* Terminal hash mark left */}
        <span className="font-mono text-[9px] uppercase tracking-widest text-line select-none">
          +SYS.BUS
        </span>

        {/* Central data trace */}
        <div className="relative mx-4 h-px flex-1 bg-gradient-to-r from-line via-line/80 to-line">
          {/* Animated primary signal packet */}
          <div
            className="signal-divider-dot absolute top-1/2 h-1.5 w-2 -translate-y-1/2 rounded-full bg-signal shadow-[0_0_8px_#ff8a3d]"
            style={{ willChange: 'left, opacity' }}
          />
          {/* Ambient packet glow echo */}
          <div
            className="signal-divider-dot absolute top-1/2 h-4 w-6 -translate-y-1/2 rounded-full opacity-40 blur-[1px]"
            style={{
              background: 'radial-gradient(ellipse at center, #ff8a3d 0%, transparent 70%)',
              willChange: 'left, opacity',
            }}
          />
        </div>

        {/* Terminal hash mark right */}
        <span className="font-mono text-[9px] uppercase tracking-widest text-line select-none">
          ROUTE.OK+
        </span>
      </div>
    </div>
  )
}
