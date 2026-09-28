import { useEffect, useState, useRef } from 'react'

const GLYPHS = '01#_//><[]{}=+*~!?$%'

/**
 * High-tech kinetic text scramble effect.
 * Cycles through cyber runes before resolving into the target string.
 * Bypassed completely under prefers-reduced-motion.
 */
export function useTextScramble(targetText: string, trigger: boolean = true) {
  const [displayText, setDisplayText] = useState(targetText)
  const animFrame = useRef<number | null>(null)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || !trigger) {
      setDisplayText(targetText)
      return
    }

    let iteration = 0
    const totalFrames = targetText.length * 2.5

    function step() {
      const scrambled = targetText
        .split('')
        .map((char, index) => {
          if (char === ' ') return ' '
          if (index < iteration / 2.5) {
            return targetText[index]
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        })
        .join('')

      setDisplayText(scrambled)

      if (iteration < totalFrames) {
        iteration += 1
        animFrame.current = window.requestAnimationFrame(step)
      } else {
        setDisplayText(targetText)
      }
    }

    animFrame.current = window.requestAnimationFrame(step)

    return () => {
      if (animFrame.current) {
        window.cancelAnimationFrame(animFrame.current)
      }
    }
  }, [targetText, trigger])

  return displayText
}
