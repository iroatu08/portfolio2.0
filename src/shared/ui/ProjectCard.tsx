import { Link } from 'react-router-dom'
import type { Project } from '@/shared/cms/types'
import { Chip } from '@/shared/ui/Chip'
import { Panel } from '@/shared/ui/Panel'
import { ProjectCover } from '@/shared/ui/ProjectCover'

type ProjectCardProps = {
  project: Project
  showMeta?: boolean
  className?: string
}

/**
 * Project card: clean screenshot on top, solid meta panel underneath (no text overlays).
 */
export function ProjectCard({
  project,
  showMeta = false,
  className = '',
}: ProjectCardProps): React.JSX.Element {
  return (
    <Link to={`/projects/${project.slug}`} className={`group block h-full ${className}`}>
      <Panel className="flex h-full flex-col overflow-hidden p-0 transition-transform duration-300 group-hover:scale-[1.015]">
        <ProjectCover
          title={project.title}
          coverImageUrl={project.coverImageUrl}
          coverGradient={project.coverGradient}
        />
        <div className="flex flex-1 flex-col gap-2 border-t border-border bg-surface p-4 md:p-5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-lime">
            {project.coverLabel}
          </span>
          <h3 className="font-display text-lg font-semibold leading-snug text-ink md:text-xl">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">{project.summary}</p>
          {showMeta ? (
            <>
              <p className="mt-1 text-xs text-muted-dim">
                {project.org} · {project.role}
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {project.stack.slice(0, 3).map((tech) => (
                  <Chip key={tech} label={tech} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </Panel>
    </Link>
  )
}
