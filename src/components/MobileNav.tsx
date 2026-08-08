import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { navItems } from '../content/profile'

type MobileNavProps = {
  activeSection: string
}

/**
 * A mobile hamburger menu with a slide-down panel.
 * Shown only below the `md` breakpoint.
 */
export function MobileNav({ activeSection }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  // Close on click outside
  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        close()
      }
    }
    window.addEventListener('pointerdown', onClick)
    return () => window.removeEventListener('pointerdown', onClick)
  }, [open, close])

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        className="relative flex h-9 w-9 flex-col items-center justify-center gap-1.5"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <motion.span
          animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
          className="block h-px w-5 bg-paper"
          transition={{ duration: 0.25 }}
        />
        <motion.span
          animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
          className="block h-px w-5 bg-paper"
          transition={{ duration: 0.15 }}
        />
        <motion.span
          animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
          className="block h-px w-5 bg-paper"
          transition={{ duration: 0.25 }}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-x-0 top-full z-50 border-b border-line bg-ink/95 backdrop-blur-lg"
            exit={{ opacity: 0, y: -8 }}
            initial={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-5"
            >
              {navItems.map((item) => (
                <a
                  className={[
                    'block px-3 py-3 font-mono text-sm uppercase tracking-normal transition-colors',
                    `#${activeSection}` === item.href
                      ? 'text-signal'
                      : 'text-muted hover:text-paper',
                  ].join(' ')}
                  href={item.href}
                  key={item.href}
                  onClick={close}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
