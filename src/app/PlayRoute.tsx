import { lazy, Suspense } from 'react'

const PlayPage = lazy(async () => {
  const mod = await import('@/features/play/PlayPage')
  return { default: mod.PlayPage }
})

function PlayFallback(): React.JSX.Element {
  return (
    <div className="flex min-h-[50vh] items-center justify-center text-muted" aria-live="polite">
      Warming up the lab…
    </div>
  )
}

export function PlayRoute(): React.JSX.Element {
  return (
    <Suspense fallback={<PlayFallback />}>
      <PlayPage />
    </Suspense>
  )
}
