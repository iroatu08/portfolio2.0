import { useEffect, useRef, useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Panel } from '@/shared/ui/Panel'

type Phase = 'idle' | 'wait' | 'go' | 'result' | 'tooSoon'

type ReactionTimerProps = {
  onClose: () => void
}

export function ReactionTimer({ onClose }: ReactionTimerProps): React.JSX.Element {
  const [phase, setPhase] = useState<Phase>('idle')
  const [ms, setMs] = useState<number | null>(null)
  const startRef = useRef(0)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  function startRound(): void {
    setPhase('wait')
    setMs(null)
    const delay = 1200 + Math.random() * 2200
    timeoutRef.current = window.setTimeout(() => {
      startRef.current = performance.now()
      setPhase('go')
    }, delay)
  }

  function handleTap(): void {
    if (phase === 'wait') {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
      setPhase('tooSoon')
      return
    }
    if (phase === 'go') {
      setMs(Math.round(performance.now() - startRef.current))
      setPhase('result')
    }
  }

  const bg =
    phase === 'go'
      ? 'bg-lime text-canvas'
      : phase === 'wait'
        ? 'bg-red-900/80 text-ink'
        : 'bg-surface-raised text-ink'

  return (
    <Panel className="pointer-events-auto absolute left-1/2 top-1/2 z-20 w-[min(100%,380px)] -translate-x-1/2 -translate-y-1/2 p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Reaction Pulse</h2>
        <Button type="button" variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
      <p className="mt-2 text-xs text-muted">Wait for lime, then tap as fast as you can.</p>
      <button
        type="button"
        onClick={phase === 'idle' || phase === 'result' || phase === 'tooSoon' ? startRound : handleTap}
        className={`mt-4 flex h-40 w-full items-center justify-center rounded-2xl text-center text-sm font-semibold transition-colors ${bg}`}
      >
        {phase === 'idle' && 'Tap to start'}
        {phase === 'wait' && 'Wait…'}
        {phase === 'go' && 'TAP!'}
        {phase === 'tooSoon' && 'Too soon — try again'}
        {phase === 'result' && `${ms} ms — tap to retry`}
      </button>
    </Panel>
  )
}
