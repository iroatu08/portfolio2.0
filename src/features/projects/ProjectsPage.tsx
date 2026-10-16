import { useEffect, useRef, useState } from 'react'
import { getProjects } from '@/shared/cms/queries'
import type { Project } from '@/shared/cms/types'
import { ProjectCard } from '@/shared/ui/ProjectCard'
import { gsap, ScrollTrigger, useGSAP, withMotionPreference } from '@/shared/motion/gsapSetup'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'

export function ProjectsPage(): React.JSX.Element {
  useDocumentTitle('Projects | Iroatu Chibuzor Prince')
  const rootRef = useRef<HTMLDivElement>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState<string>('All')

  useEffect(() => {
    let cancelled = false
    void getProjects().then((list) => {
      if (!cancelled) {
        setProjects(list)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  const labels = ['All', ...Array.from(new Set(projects.map((p) => p.coverLabel)))]
  const visible =
    filter === 'All' ? projects : projects.filter((project) => project.coverLabel === filter)

  useGSAP(
    () => {
      if (!projects.length) {
        return
      }
      const media = withMotionPreference(() => {
        gsap.from('.project-card', {
          opacity: 0,
          y: 24,
          stagger: 0.08,
          duration: 0.55,
          scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
        })
      })
      return () => {
        media.revert()
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    },
    { scope: rootRef, dependencies: [projects, filter], revertOnUpdate: true },
  )

  return (
    <div ref={rootRef} className="space-y-8">
      <header>
        <p className="text-sm font-medium text-lime">Projects</p>
        <h1 className="font-display mt-2 text-4xl font-bold tracking-tight">Selected work</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Case studies from healthcare, legaltech, proptech, agritech, and relocation products.
        </p>
      </header>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {labels.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setFilter(label)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              filter === label
                ? 'bg-lime text-canvas'
                : 'border border-border bg-surface text-muted hover:text-ink'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} showMeta className="project-card" />
        ))}
      </div>
    </div>
  )
}
