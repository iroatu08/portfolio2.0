import { useMemo, useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Panel } from '@/shared/ui/Panel'

const ICONS = ['⚛️', '📱', '⚖️', '🌾', '🏥', '🚀'] as const

type Card = {
  id: number
  icon: string
  matched: boolean
}

type MemoryMatchProps = {
  onClose: () => void
}

function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j]!, copy[i]!]
  }
  return copy
}

export function MemoryMatch({ onClose }: MemoryMatchProps): React.JSX.Element {
  const initial = useMemo(
    () =>
      shuffle(
        [...ICONS, ...ICONS].map((icon, index) => ({
          id: index,
          icon,
          matched: false,
        })),
      ),
    [],
  )
  const [cards, setCards] = useState<Card[]>(initial)
  const [flipped, setFlipped] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const won = cards.every((card) => card.matched)

  function handleFlip(id: number): void {
    if (flipped.length === 2 || flipped.includes(id)) {
      return
    }
    const card = cards.find((c) => c.id === id)
    if (!card || card.matched) {
      return
    }

    const nextFlipped = [...flipped, id]
    setFlipped(nextFlipped)

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = nextFlipped
      const cardA = cards.find((c) => c.id === a)
      const cardB = cards.find((c) => c.id === b)
      if (cardA && cardB && cardA.icon === cardB.icon) {
        setCards((prev) =>
          prev.map((c) => (c.id === a || c.id === b ? { ...c, matched: true } : c)),
        )
        setFlipped([])
      } else {
        window.setTimeout(() => setFlipped([]), 650)
      }
    }
  }

  return (
    <Panel className="pointer-events-auto absolute left-1/2 top-1/2 z-20 w-[min(100%,420px)] -translate-x-1/2 -translate-y-1/2 p-5 shadow-2xl">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-semibold">Tech Memory</h2>
          <p className="text-xs text-muted">Match the icons · Moves: {moves}</p>
        </div>
        <Button type="button" variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
      {won ? (
        <p className="mt-4 text-sm text-lime">Cleared in {moves} moves. Nice.</p>
      ) : null}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {cards.map((card) => {
          const isFaceUp = card.matched || flipped.includes(card.id)
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleFlip(card.id)}
              className={`flex aspect-square items-center justify-center rounded-xl border text-xl transition-colors ${
                isFaceUp
                  ? 'border-lime/40 bg-surface-raised'
                  : 'border-border bg-canvas hover:border-lime/30'
              }`}
              aria-label={isFaceUp ? card.icon : 'Hidden card'}
            >
              {isFaceUp ? card.icon : '?'}
            </button>
          )
        })}
      </div>
    </Panel>
  )
}
