import { useState, useEffect } from 'react'

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

/**
 * Zwraca true raz, gdy użytkownik wpisze kod Konami (↑↑↓↓←→←→BA).
 */
export function useKonamiCode(): boolean {
  const [triggered, setTriggered] = useState(false)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (triggered) return
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key
      if (key === KONAMI[index]) {
        if (index === KONAMI.length - 1) {
          setTriggered(true)
          setIndex(0)
        } else {
          setIndex((i) => i + 1)
        }
      } else {
        setIndex(0)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [index, triggered])

  return triggered
}
