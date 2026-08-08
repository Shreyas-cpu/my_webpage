import { useEffect, useState } from 'react'

export function Preloader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    return sessionStorage.getItem('shreyas-preloaded') !== 'true'
  })

  useEffect(() => {
    if (!visible) return

    const timeout = window.setTimeout(() => {
      sessionStorage.setItem('shreyas-preloaded', 'true')
      setVisible(false)
    }, 1100)

    return () => window.clearTimeout(timeout)
  }, [visible])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink text-paper">
      <div className="w-64">
        <div className="h-px w-full overflow-hidden bg-line">
          <div className="h-full w-1/2 animate-[signal-load_1s_ease-in-out_forwards] bg-signal" />
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-normal text-muted">
          Drawing signal map
        </p>
      </div>
    </div>
  )
}
