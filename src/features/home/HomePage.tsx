import { useEffect, useRef, useState } from 'react'
import {
  getFeaturedProjects,
  getSiteSettings,
  getSkills,
  getTestimonials,
} from '@/shared/cms/queries'
import type { Project, SiteSettings, Skill, Testimonial } from '@/shared/cms/types'
import { gsap, useGSAP, withMotionPreference } from '@/shared/motion/gsapSetup'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'
import { ProfilePanel } from './ProfilePanel'
import { ProjectMasonry } from './ProjectMasonry'

export function HomePage(): React.JSX.Element {
  useDocumentTitle('Iroatu Chibuzor Prince | Software Developer')
  const rootRef = useRef<HTMLDivElement>(null)
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    let cancelled = false
    void Promise.all([
      getSiteSettings(),
      getSkills(),
      getTestimonials(),
      getFeaturedProjects(),
    ]).then(([site, skillList, quotes, featured]) => {
      if (cancelled) {
        return
      }
      setSettings(site)
      setSkills(skillList)
      setTestimonials(quotes)
      setProjects(featured)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useGSAP(
    () => {
      if (!settings || !rootRef.current) {
        return
      }
      const media = withMotionPreference(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.profile-panel', { opacity: 0, x: -24, duration: 0.7 })
          .from('.avatar-img', { opacity: 0, scale: 0.92, duration: 0.5 }, '-=0.4')
          .from('.skill-chip', { opacity: 0, y: 8, stagger: 0.05, duration: 0.4 }, '-=0.3')
          .from('.masonry-tile', { opacity: 0, y: 28, stagger: 0.08, duration: 0.55 }, '-=0.5')
      })
      return () => media.revert()
    },
    { scope: rootRef, dependencies: [settings] },
  )

  if (!settings) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted" aria-live="polite">
        Loading…
      </div>
    )
  }

  return (
    <div ref={rootRef} className="grid gap-4 lg:grid-cols-[minmax(280px,380px)_1fr] lg:gap-6">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <ProfilePanel settings={settings} skills={skills} testimonials={testimonials} />
      </div>
      <ProjectMasonry projects={projects} />
    </div>
  )
}
