import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProjectBySlug } from '@/shared/cms/queries'
import type { Project } from '@/shared/cms/types'
import { Button } from '@/shared/ui/Button'
import { Chip } from '@/shared/ui/Chip'
import { Panel } from '@/shared/ui/Panel'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'

export function ProjectDetailPage(): React.JSX.Element {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null | undefined>(undefined)
  useDocumentTitle(
    project
      ? `${project.title} | Iroatu Chibuzor Prince`
      : 'Project | Iroatu Chibuzor Prince',
  )

  useEffect(() => {
    if (!slug) {
      return
    }
    let cancelled = false
    void getProjectBySlug(slug).then((found) => {
      if (!cancelled) {
        setProject(found ?? null)
      }
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (!slug) {
    return (
      <div className="space-y-4 py-20 text-center">
        <p className="text-muted">Project not found.</p>
        <Button to="/projects" variant="outline">
          Back to projects
        </Button>
      </div>
    )
  }

  if (project === undefined) {
    return <div className="py-20 text-center text-muted">Loading…</div>
  }

  if (!project) {
    return (
      <div className="space-y-4 py-20 text-center">
        <p className="text-muted">Project not found.</p>
        <Button to="/projects" variant="outline">
          Back to projects
        </Button>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <Link to="/projects" className="text-sm text-muted hover:text-lime">
        ← Projects
      </Link>

      <header className="overflow-hidden rounded-[var(--radius-panel)] border border-border bg-surface">
        <div
          className="aspect-[16/9] w-full overflow-hidden border-b border-border"
          style={{ background: project.coverGradient }}
        >
          {project.coverImageUrl ? (
            <img
              src={project.coverImageUrl}
              alt={`${project.title} screenshot`}
              className="h-full w-full object-cover object-top"
            />
          ) : null}
        </div>
        <div className="space-y-3 p-6 md:p-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-lime">
            {project.coverLabel}
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            {project.title}
          </h1>
          <p className="text-sm text-muted">
            {project.org} · {project.role}
          </p>
          <p className="max-w-2xl text-base leading-relaxed text-muted">
            {project.summary}
          </p>
        </div>
      </header>

      <Panel className="space-y-4 p-6 md:p-8">
        <h2 className="font-display text-xl font-semibold">Overview</h2>
        {project.body.map((paragraph) => (
          <p
            key={paragraph.slice(0, 32)}
            className="text-sm leading-relaxed text-muted"
          >
            {paragraph}
          </p>
        ))}
      </Panel>

      <Panel className="p-6 md:p-8">
        <h2 className="font-display text-xl font-semibold">Stack</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <Chip key={tech} label={tech} />
          ))}
        </div>
      </Panel>

      {project.links.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {project.links.map((link) => (
            <Button
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              variant="outline"
            >
              {link.label} ↗
            </Button>
          ))}
          <Button to="/contact" variant="ghost">
            Discuss similar work
          </Button>
        </div>
      )}
    </article>
  )
}
