import type { SiteSettings, Skill } from '@/shared/cms/types'
import type { Testimonial } from '@/shared/cms/types'
import { Button } from '@/shared/ui/Button'
import { Chip } from '@/shared/ui/Chip'
import { Panel } from '@/shared/ui/Panel'
import { TestimonialCarousel } from './TestimonialCarousel'

type ProfilePanelProps = {
  settings: SiteSettings
  skills: Skill[]
  testimonials: Testimonial[]
}

export function ProfilePanel({
  settings,
  skills,
  testimonials,
}: ProfilePanelProps): React.JSX.Element {
  return (
    <Panel className="profile-panel flex h-full flex-col gap-6 p-5 md:p-6">
      <div className="flex items-start gap-4">
        <img
          src={settings.avatarUrl}
          alt={settings.name}
          className="avatar-img h-20 w-20 shrink-0 rounded-2xl object-cover object-top ring-1 ring-border md:h-24 md:w-24"
        />
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            {settings.name}
          </h1>
          <p className="mt-1 text-sm font-medium text-lime">{settings.role}</p>
          <p className="mt-1 text-xs text-muted-dim">{settings.location}</p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-muted text-balance">{settings.bio}</p>
      <p className="text-sm font-medium text-ink">{settings.nextFocus}</p>

      <Button to="/contact" variant="outline" className="w-full sm:w-auto">
        <ChatIcon />
        Discuss a Project
      </Button>

      <div className="skill-chips flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Chip key={skill.id} label={skill.label} className="skill-chip" />
        ))}
      </div>

      <TestimonialCarousel items={testimonials} />
    </Panel>
  )
}

function ChatIcon(): React.JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 18l-1 4 4.5-1.5A9 9 0 1 0 5 18z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}
