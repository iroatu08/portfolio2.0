import { useEffect, useRef, useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Panel } from '@/shared/ui/Panel'

type ClickDodgeProps = {
  onClose: () => void
}

type Orb = {
  id: number
  x: number
  y: number
}

export function ClickDodge({ onClose }: ClickDodgeProps): React.JSX.Element {
  const [score, setScore] = useState(0)
  const [orb, setOrb] = useState<Orb>({ id: 0, x: 40, y: 40 })
  const [timeLeft, setTimeLeft] = useState(20)
  const [running, setRunning] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
      }
    }
  }, [])

  function start(): void {
    setScore(0)
    setTimeLeft(20)
    setRunning(true)
    relocate()
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
    }
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) {
            window.clearInterval(timerRef.current)
          }
          setRunning(false)
          return 0
        }
        return t - 1
      })
    }, 1000)
  }

  function relocate(): void {
    setOrb({
      id: Date.now(),
      x: 10 + Math.random() * 70,
      y: 15 + Math.random() * 55,
    })
  }

  function hit(): void {
    if (!running) {
      return
    }
    setScore((s) => s + 1)
    relocate()
  }

  return (
    <Panel className="pointer-events-auto absolute left-1/2 top-1/2 z-20 w-[min(100%,420px)] -translate-x-1/2 -translate-y-1/2 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold">Orb Catch</h2>
          <p className="text-xs text-muted">
            Score {score} · {timeLeft}s
          </p>
        </div>
        <Button type="button" variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
      <div className="relative mt-4 h-52 overflow-hidden rounded-2xl border border-border bg-canvas">
        {!running && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-canvas/80">
            <p className="text-sm text-muted">{timeLeft === 0 ? `Final score: ${score}` : 'Catch the lime orb'}</p>
            <Button type="button" variant="outline" onClick={start}>
              {timeLeft === 0 ? 'Play again' : 'Start'}
            </Button>
          </div>
        )}
        {running && (
          <button
            type="button"
            onClick={hit}
            className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime shadow-[0_0_20px_#c6f43288] transition-transform hover:scale-110"
            style={{ left: `${orb.x}%`, top: `${orb.y}%` }}
            aria-label="Catch orb"
          />
        )}
      </div>
    </Panel>
  )
}
