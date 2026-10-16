import { useEffect, useRef, useState } from 'react'
import { getSiteSettings, getSkills } from '@/shared/cms/queries'
import type { SiteSettings, Skill } from '@/shared/cms/types'
import { Chip } from '@/shared/ui/Chip'
import { Panel } from '@/shared/ui/Panel'
import { Button } from '@/shared/ui/Button'
import { gsap, ScrollTrigger, useGSAP, withMotionPreference } from '@/shared/motion/gsapSetup'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'

export function AboutPage(): React.JSX.Element {
  useDocumentTitle('About | Iroatu Chibuzor Prince')
  const rootRef = useRef<HTMLDivElement>(null)
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])

  useEffect(() => {
    let cancelled = false
    void Promise.all([getSiteSettings(), getSkills()]).then(([site, skillList]) => {
      if (!cancelled) {
        setSettings(site)
        setSkills(skillList)
      }
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
        gsap.from('.about-hero', { opacity: 0, y: 24, duration: 0.7 })
        gsap.from('.about-copy', {
          opacity: 0,
          y: 20,
          duration: 0.6,
          scrollTrigger: { trigger: '.about-copy', start: 'top 85%' },
        })
        gsap.from('.about-portrait', {
          opacity: 0,
          scale: 1.04,
          duration: 1,
          scrollTrigger: { trigger: '.about-portrait', start: 'top 80%' },
        })
      })
      return () => {
        media.revert()
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    },
    { scope: rootRef, dependencies: [settings] },
  )

  if (!settings) {
    return <div className="py-20 text-center text-muted">Loading…</div>
  }

  return (
    <div ref={rootRef} className="space-y-8">
      <div className="about-hero grid gap-6 lg:grid-cols-2 lg:items-end">
        <div>
          <p className="text-sm font-medium text-lime">About</p>
          <h1 className="font-display mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Software Developer building products people trust
          </h1>
          <p className="mt-4 max-w-xl text-muted text-balance">
            {settings.bio} {settings.nextFocus}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/contact" variant="outline">
              Discuss a Project
            </Button>
            <Button to="/projects" variant="ghost">
              View work
            </Button>
          </div>
        </div>
        <Panel className="about-portrait overflow-hidden p-0">
          <img
            src={settings.aboutPortraitUrl}
            alt={`${settings.name} — studio portrait`}
            className="aspect-[4/5] w-full object-cover object-top"
          />
        </Panel>
      </div>

      <div className="about-copy grid gap-4 md:grid-cols-3">
        <Panel className="p-6 md:col-span-2">
          <h2 className="font-display text-xl font-semibold">The path so far</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Over 5+ years I have shipped web and mobile interfaces across agritech, legaltech,
              proptech, fintech, and edtech — owning shared UI systems, accessibility, and API-backed
              product surfaces in Agile teams.
            </p>
            <p>
              Recently I have led mobile engineering for Call A Doctor, contributed to Fragvest and
              NomaOS / Agrovesto, and modernised judiciary platforms with Lextech&apos;s iCASEFLOW —
              including AI-assisted tooling for transcription and research.
            </p>
            <p>
              I am intentional about the next chapter: deepening AI engineering while growing as a
              technical leader — mentoring, architecture decisions, and product framing that keeps
              humans in the loop.
            </p>
          </div>
        </Panel>
        <Panel className="p-6">
          <h2 className="font-display text-xl font-semibold">Off duty</h2>
          <img
            src={settings.playPortraitUrl}
            alt={`${settings.name} — casual`}
            className="mt-4 aspect-square w-full rounded-2xl object-cover"
          />
          <p className="mt-4 text-sm text-muted">
            Curious builder. Enter the Lab when you want to play.
          </p>
          <Button to="/play" variant="outline" className="mt-4 w-full">
            Enter the Lab
          </Button>
        </Panel>
      </div>

      <Panel className="p-6">
        <h2 className="font-display text-xl font-semibold">Skills & focus</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Chip key={skill.id} label={skill.label} />
          ))}
        </div>
      </Panel>
    </div>
  )
}
