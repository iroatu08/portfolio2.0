import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Link, useNavigate } from 'react-router-dom'
import { getFeaturedProjects, getSiteSettings } from '@/shared/cms/queries'
import type { Project, SiteSettings } from '@/shared/cms/types'
import { Button } from '@/shared/ui/Button'
import { Panel } from '@/shared/ui/Panel'
import { LabScene } from './LabScene'
import { CameraRig } from './CameraRig'
import { MemoryMatch } from './games/MemoryMatch'
import { ReactionTimer } from './games/ReactionTimer'
import { ClickDodge } from './games/ClickDodge'
import { DiscoveryGames } from './games/DiscoveryGames'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'

type ActiveGame = 'memory' | 'reaction' | 'dodge' | null

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function PlayPage(): React.JSX.Element {
  return (
    <div className="space-y-8">
      <DiscoveryGames />
      <PlayLab />
    </div>
  )
}

function PlayLab(): React.JSX.Element {
  useDocumentTitle('Play Lab | Iroatu Chibuzor Prince')
  const navigate = useNavigate()
  const [projects, setProjects] = useState<Project[]>([])
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [focusedSlug, setFocusedSlug] = useState<string | null>(null)
  const [activeGame, setActiveGame] = useState<ActiveGame>(null)
  const [reduceMotion] = useState(() =>
    typeof window !== 'undefined' ? prefersReducedMotion() : false,
  )

  useEffect(() => {
    let cancelled = false
    void Promise.all([getFeaturedProjects(), getSiteSettings()]).then(([list, site]) => {
      if (!cancelled) {
        setProjects(list)
        setSettings(site)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const cameraTarget = useMemo((): [number, number, number] | null => {
    if (!focusedSlug) {
      return null
    }
    const index = projects.findIndex((p) => p.slug === focusedSlug)
    if (index < 0) {
      return null
    }
    const angle = (index / Math.max(projects.length, 1)) * Math.PI * 2
    const radius = 3.4
    return [Math.cos(angle) * radius * 0.35, 1.4, Math.sin(angle) * radius * 0.35 + 4.5]
  }, [focusedSlug, projects])

  const focusedProject = projects.find((p) => p.slug === focusedSlug) ?? null

  if (!settings) {
    return <div className="py-20 text-center text-muted">Loading lab…</div>
  }

  if (reduceMotion) {
    return (
      <div className="space-y-6">
        <header>
          <p className="text-sm font-medium text-lime">Play</p>
          <h1 className="font-display mt-2 text-3xl font-bold">Lab (reduced motion)</h1>
          <p className="mt-2 text-sm text-muted">
            3D scene disabled for accessibility. Mini-games and projects stay available.
          </p>
        </header>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={() => setActiveGame('memory')}>
            Tech Memory
          </Button>
          <Button type="button" variant="outline" onClick={() => setActiveGame('reaction')}>
            Reaction Pulse
          </Button>
          <Button type="button" variant="outline" onClick={() => setActiveGame('dodge')}>
            Orb Catch
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.id} to={`/projects/${project.slug}`}>
              <Panel className="p-4 hover:border-lime/40">
                <p className="text-xs text-lime">{project.coverLabel}</p>
                <h2 className="font-display mt-1 font-semibold">{project.title}</h2>
              </Panel>
            </Link>
          ))}
        </div>
        {activeGame === 'memory' && <MemoryMatch onClose={() => setActiveGame(null)} />}
        {activeGame === 'reaction' && <ReactionTimer onClose={() => setActiveGame(null)} />}
        {activeGame === 'dodge' && <ClickDodge onClose={() => setActiveGame(null)} />}
      </div>
    )
  }

  return (
    <div className="relative -mx-4 -mt-2 h-[calc(100vh-5.5rem)] overflow-hidden rounded-[var(--radius-panel)] border border-border md:-mx-0 md:h-[calc(100vh-7rem)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4">
        <Panel className="pointer-events-auto max-w-sm p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-lime">The Lab</p>
          <h1 className="font-display mt-1 text-xl font-bold">Explore · click orbs & crystals</h1>
          <p className="mt-1 text-xs text-muted">
            Drag to orbit. Lime crystals open mini-games. Project orbs open case studies.
          </p>
        </Panel>
        <Button to="/" variant="ghost" className="pointer-events-auto bg-surface/90">
          Exit
        </Button>
      </div>

      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.6, 7], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        className="h-full w-full bg-canvas"
      >
        <color attach="background" args={['#0d0d0d']} />
        <Suspense fallback={null}>
          <LabScene
            projects={projects}
            portraitUrl={settings.playPortraitUrl}
            focusedSlug={focusedSlug}
            onSelectProject={(slug) => setFocusedSlug(slug)}
            onSelectGame={(game) => setActiveGame(game)}
          />
          <CameraRig target={cameraTarget} />
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={12}
            maxPolarAngle={Math.PI / 1.7}
          />
        </Suspense>
      </Canvas>

      {focusedProject && (
        <Panel className="absolute bottom-4 left-4 right-4 z-10 max-w-md p-4 md:left-4 md:right-auto">
          <p className="text-xs text-lime">{focusedProject.coverLabel}</p>
          <h2 className="font-display text-lg font-semibold">{focusedProject.title}</h2>
          <p className="mt-1 line-clamp-2 text-xs text-muted">{focusedProject.summary}</p>
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/projects/${focusedProject.slug}`)}
            >
              Open case study
            </Button>
            <Button type="button" variant="ghost" onClick={() => setFocusedSlug(null)}>
              Clear
            </Button>
          </div>
        </Panel>
      )}

      {activeGame === 'memory' && <MemoryMatch onClose={() => setActiveGame(null)} />}
      {activeGame === 'reaction' && <ReactionTimer onClose={() => setActiveGame(null)} />}
      {activeGame === 'dodge' && <ClickDodge onClose={() => setActiveGame(null)} />}
    </div>
  )
}
