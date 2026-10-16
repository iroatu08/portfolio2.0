import { Link } from 'react-router-dom'
import type { Project } from '@/shared/cms/types'
import { Panel } from '@/shared/ui/Panel'
import { ProjectCard } from '@/shared/ui/ProjectCard'

type ProjectMasonryProps = {
  projects: Project[]
}

export function ProjectMasonry({ projects }: ProjectMasonryProps): React.JSX.Element {
  return (
    <div className="masonry-grid grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Link to="/play" className="masonry-tile group block sm:col-span-2">
        <Panel className="relative overflow-hidden p-0 transition-transform duration-300 group-hover:scale-[1.01]">
          <div
            className="flex min-h-40 flex-col justify-end bg-gradient-to-br from-[#1a2e0a] via-[#2a4010] to-surface p-6 md:min-h-48"
            style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #c6f43233, transparent 45%)' }}
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-lime">Interactive</span>
            <h2 className="font-display mt-2 text-2xl font-bold text-ink md:text-3xl">Enter the Lab</h2>
            <p className="mt-2 max-w-md text-sm text-muted">
              A playful 3D world — project orbs, mini-games, and motion. Built with Three.js + GSAP.
            </p>
          </div>
        </Panel>
      </Link>

      {projects.map((project) => (
        <div key={project.id} className="masonry-tile">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  )
}
