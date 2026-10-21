import { useEffect, useRef, useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Panel } from '@/shared/ui/Panel'

type Question = {
  prompt: string
  options: string[]
  answer: number
  story: string
}

const games = {
  personal: {
    title: 'How well do you know me?',
    description: 'Meet the person behind the pixels. Take a guess, unlock a little of my story.',
    label: 'The person',
    questions: [
      { prompt: 'Where am I building from?', options: ['Nairobi, Kenya', 'Lagos, Nigeria', 'Accra, Ghana'], answer: 1, story: 'Lagos, Nigeria is home base. From here, I build web and mobile products across several industries.' },
      { prompt: 'What kind of products do I build?', options: ['Only websites', 'Only mobile apps', 'Both web and mobile products'], answer: 2, story: 'My work spans responsive web interfaces and React Native apps, from investment dashboards to healthcare on your phone.' },
      { prompt: 'Which role have I taken on at Call A Doctor?', options: ['Mobile engineering lead', 'Brand strategist', 'Data analyst'], answer: 0, story: 'I lead mobile engineering, taking the React Native app from product requirements through store releases.' },
      { prompt: 'What keeps showing up in my work?', options: ['Adding more screens', 'Accessible, reusable UI', 'Following every trend'], answer: 1, story: 'Shared UI systems and accessibility run through my work. I care about products people can use and trust.' },
      { prompt: 'What am I growing into next?', options: ['Game streaming', 'Hardware manufacturing', 'AI engineering and technical leadership'], answer: 2, story: 'My next chapter is AI engineering and leadership: mentoring, architecture decisions, and tools that keep humans in the loop.' },
    ] satisfies Question[],
  },
  projects: {
    title: 'Match the project',
    description: 'A real-world problem. Three possible projects. Can you connect the dots?',
    label: 'The work',
    questions: [
      { prompt: 'Someone needs to speak to a doctor from their phone. Which project helps?', options: ['Fragvest', 'Call A Doctor', 'NomaOS / Agrovesto'], answer: 1, story: 'Call A Doctor brings chat, voice, and video consultations together with prescriptions, labs, and pharmacy delivery.' },
      { prompt: 'An investor wants better access to property. Which project fits?', options: ['Fragvest', 'Aqee', 'iCASEFLOW'], answer: 0, story: 'At Fragvest, I built investor-facing experiences with React and TypeScript, connecting listings, authentication, and portfolio views to backend data.' },
      { prompt: 'A farmer needs financing and access to markets. Where do they go?', options: ['e-Affidavit', 'Call A Doctor', 'NomaOS / Agrovesto'], answer: 2, story: 'NomaOS / Agrovesto connects farmers, co-ops, institutions, and agribusiness. I contributed interfaces for financing, farm operations, and reporting.' },
      { prompt: 'A court needs to move filings and workflows online. Which project is it?', options: ['Aqee', 'iCASEFLOW', 'Fragvest'], answer: 1, story: 'At Lextech, I worked on iCASEFLOW for the Anambra and Enugu judiciaries, building responsive e-filing interfaces with reliable API integration.' },
    ] satisfies Question[],
  },
}

type GameId = keyof typeof games

function DiscoveryQuiz({ gameId, onClose }: { gameId: GameId; onClose: () => void }): React.JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const questionRef = useRef<HTMLHeadingElement>(null)
  const [answers, setAnswers] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const game = games[gameId]
  const question = game.questions[answers.length]
  const score = answers.filter((answer, index) => answer === game.questions[index].answer).length

  useEffect(() => {
    const dialog = dialogRef.current!
    dialog.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
    }
  }, [])

  useEffect(() => {
    questionRef.current?.focus()
  }, [answers.length])

  return (
    <dialog ref={dialogRef} aria-labelledby="discovery-title" onCancel={onClose}
      className="m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-3xl border border-border bg-surface p-5 text-ink shadow-2xl backdrop:bg-black/80 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-lime">A little more about me</p>
          <h2 id="discovery-title" className="font-display mt-2 text-2xl font-bold">{game.title}</h2>
        </div>
        <Button variant="ghost" onClick={onClose}>Close</Button>
      </div>
      {question ? (
        <>
          <div className="mt-6 flex items-center justify-between text-xs text-muted">
            <span>Question {answers.length + 1} of {game.questions.length}</span>
            <span>No timer. Just curiosity.</span>
          </div>
          <progress aria-label="Questions completed" value={answers.length} max={game.questions.length}
            className="mt-3 h-1.5 w-full overflow-hidden rounded-full accent-lime" />
          <h3 ref={questionRef} tabIndex={-1} className="font-display mt-6 text-xl font-semibold outline-none">{question.prompt}</h3>
          <div className="mt-5 grid gap-3" role="group" aria-label="Answer choices">
            {question.options.map((option, index) => (
              <button key={option} type="button" disabled={selected !== null} onClick={() => setSelected(index)}
                aria-pressed={selected === index}
                className={`flex min-h-14 items-center gap-3 rounded-2xl border p-4 text-left text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime ${selected !== null && index === question.answer ? 'border-lime bg-lime/10' : selected === index ? 'border-muted bg-surface-hover' : 'border-border enabled:hover:border-lime/60 enabled:hover:bg-surface-raised'}`}>
                <span className="text-xs text-muted" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
                <span className="flex-1">{option}</span>
                {selected !== null && index === question.answer && <span className="text-xs text-lime">Correct</span>}
                {selected === index && index !== question.answer && <span className="text-xs text-muted">Your pick</span>}
              </button>
            ))}
          </div>
          <div aria-live="polite" aria-atomic="true">
            {selected !== null && (
              <div className="mt-5 rounded-2xl border border-border bg-canvas p-4">
                <p className="text-sm font-medium text-lime">{selected === question.answer ? 'You got it.' : 'Now you know.'}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{question.story}</p>
                <Button className="mt-4" variant="primary" onClick={() => { setAnswers([...answers, selected]); setSelected(null) }}>
                  {answers.length === game.questions.length - 1 ? 'See my results' : 'Next question'}
                </Button>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="mt-8" aria-live="polite">
          <p className="font-display text-5xl font-bold text-lime">{score}<span className="text-2xl text-muted"> / {game.questions.length}</span></p>
          <h3 ref={questionRef} tabIndex={-1} className="font-display mt-5 text-2xl font-semibold outline-none">{score === game.questions.length ? 'You connected all the dots.' : 'A few guesses. A little more connection.'}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">You just discovered {game.questions.length} pieces of my story. If something sparked your curiosity, there’s more to explore.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to={gameId === 'personal' ? '/about' : '/projects'} variant="primary">{gameId === 'personal' ? 'More about me' : 'Explore my work'}</Button>
            <Button onClick={() => { setAnswers([]); setSelected(null) }}>Play again</Button>
            <Button variant="ghost" onClick={onClose}>Back to the lab</Button>
          </div>
        </div>
      )}
    </dialog>
  )
}

export function DiscoveryGames(): React.JSX.Element {
  const [activeGame, setActiveGame] = useState<GameId | null>(null)
  return (
    <section aria-labelledby="discovery-heading" className="space-y-5">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-lime">Curiosity looks good on you</p>
        <h2 id="discovery-heading" className="font-display mt-2 text-3xl font-bold">Want to know me? Make a choice.</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">Go beyond the bio. Pick a game, follow your curiosity, and discover the person and the work behind this portfolio.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {(Object.entries(games) as [GameId, (typeof games)[GameId]][]).map(([id, game], index) => (
          <Panel key={id} className="flex flex-col p-6">
            <div className="flex items-center justify-between text-xs text-muted"><span className="text-lime">0{index + 1} / {game.label}</span><span>{game.questions.length} questions</span></div>
            <h3 className="font-display mt-5 text-xl font-semibold">{game.title}</h3>
            <p className="mb-6 mt-2 flex-1 text-sm leading-relaxed text-muted">{game.description}</p>
            <Button className="self-start" onClick={() => setActiveGame(id)}>Play {id === 'personal' ? 'the quiz' : 'project match'} <span aria-hidden="true">↗</span></Button>
          </Panel>
        ))}
      </div>
      {activeGame && <DiscoveryQuiz key={activeGame} gameId={activeGame} onClose={() => setActiveGame(null)} />}
    </section>
  )
}
