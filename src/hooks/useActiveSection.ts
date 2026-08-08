import { useEffect, useState } from 'react'

const SECTION_IDS = ['hero', 'about', 'experience', 'projects', 'leadership', 'skills', 'education', 'contact']

/**
 * Uses IntersectionObserver to track which section is currently most
 * visible in the viewport. Returns the `id` of that section so the nav
 * can highlight the active link.
 */
export function useActiveSection(): string {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!sections.length) return

    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.intersectionRatio)
        })

        // Find the section with the highest intersection ratio
        let bestId = active
        let bestRatio = -1

        ratios.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        if (bestId !== active && bestRatio > 0) {
          setActive(bestId)
        }
      },
      {
        // Multiple thresholds to get frequent updates
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [active])

  return active
}
