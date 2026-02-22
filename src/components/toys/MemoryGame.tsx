import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EMOJIS = ['🎯', '🚀', '⭐', '❤️', '🔥', '💎']
const PAIRS = 6
const TOTAL = PAIRS * 2

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

interface CardState {
  id: number
  emoji: string
}

function buildDeck(): CardState[] {
  const emojis = EMOJIS.slice(0, PAIRS).flatMap((e) => [e, e])
  return shuffle(emojis).map((emoji, id) => ({ id, emoji }))
}

/**
 * Minigra Memory – odkrywaj po dwie karty, znajdź pary. Licznik ruchów.
 */
export default function MemoryGame() {
  const [deck, setDeck] = useState<CardState[]>(() => buildDeck())
  const [flipped, setFlipped] = useState<number[]>([])
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [moves, setMoves] = useState(0)
  const [lock, setLock] = useState(false)

  const isFlipped = useCallback(
    (id: number) => flipped.includes(id) || matched.has(id),
    [flipped, matched]
  )

  const handleClick = useCallback(
    (index: number) => {
      if (lock || isFlipped(deck[index]!.id) || flipped.length >= 2) return
      const id = deck[index]!.id
      const nextFlipped = [...flipped, id]
      setFlipped(nextFlipped)
      if (nextFlipped.length === 2) {
        setMoves((m) => m + 1)
        const [a, b] = nextFlipped
        const cardA = deck.find((c) => c.id === a)!
        const cardB = deck.find((c) => c.id === b)!
        if (cardA.emoji === cardB.emoji) {
          setMatched((m) => new Set([...m, a!, b!]))
          setFlipped([])
        } else {
          setLock(true)
          setTimeout(() => {
            setFlipped([])
            setLock(false)
          }, 800)
        }
      }
    },
    [deck, flipped, lock, isFlipped]
  )

  const reset = useCallback(() => {
    setDeck(buildDeck())
    setFlipped([])
    setMatched(new Set())
    setMoves(0)
    setLock(false)
  }, [])

  const won = matched.size === TOTAL

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-between w-full max-w-sm gap-4">
        <span className="text-sm text-[var(--color-muted)]">Ruchy: {moves}</span>
        <button
          type="button"
          onClick={reset}
          className="px-4 py-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] text-sm font-medium hover:bg-[var(--color-bg)] transition-colors"
        >
          Nowa gra
        </button>
      </div>
      {won && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold text-[var(--color-accent)]"
        >
          Gratulacje! Ukończono w {moves} ruchach.
        </motion.p>
      )}
      <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
        <AnimatePresence mode="wait">
          {deck.map((card, index) => (
            <motion.button
              key={card.id}
              type="button"
              onClick={() => handleClick(index)}
              disabled={won}
              className="aspect-square rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface)] flex items-center justify-center text-2xl sm:text-3xl overflow-hidden hover:border-[var(--color-accent)]/50 disabled:opacity-60 disabled:cursor-default min-h-[48px]"
              initial={false}
              whileHover={!won ? { scale: 1.05 } : undefined}
              whileTap={!won ? { scale: 0.98 } : undefined}
            >
              <motion.span
                className="w-full h-full flex items-center justify-center"
                initial={false}
                animate={{
                  scale: isFlipped(card.id) ? 1 : 0.8,
                  opacity: isFlipped(card.id) ? 1 : 0.7,
                }}
                transition={{ duration: 0.2 }}
              >
                {isFlipped(card.id) ? card.emoji : '?'}
              </motion.span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
      <p className="text-sm text-[var(--color-muted)]">
        Odkrywaj po dwie karty i znajdź wszystkie pary.
      </p>
    </div>
  )
}
