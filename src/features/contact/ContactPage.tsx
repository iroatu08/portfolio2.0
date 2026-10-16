import { useEffect, useState } from 'react'
import { getSiteSettings } from '@/shared/cms/queries'
import type { SiteSettings } from '@/shared/cms/types'
import { Button } from '@/shared/ui/Button'
import { Panel } from '@/shared/ui/Panel'

import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'

export function ContactPage(): React.JSX.Element {
  useDocumentTitle('Contact | Iroatu Chibuzor Prince')
  const [settings, setSettings] = useState<SiteSettings | null>(null)

  useEffect(() => {
    let cancelled = false
    void getSiteSettings().then((site) => {
      if (!cancelled) {
        setSettings(site)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  if (!settings) {
    return <div className="py-20 text-center text-muted">Loading…</div>
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <header>
        <p className="text-sm font-medium text-lime">Contact</p>
        <h1 className="font-display mt-2 text-4xl font-bold tracking-tight">
          Let&apos;s discuss a project
        </h1>
        <p className="mt-3 text-muted">
          Open to product builds, mobile leadership, and conversations about AI engineering.
        </p>
      </header>

      <Panel className="space-y-6 p-6 md:p-8">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-dim">Email</p>
          <a href={`mailto:${settings.email}`} className="mt-1 block text-lg text-lime hover:underline">
            {settings.email}
          </a>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-dim">Location</p>
          <p className="mt-1 text-ink">{settings.location}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={`mailto:${settings.email}`} variant="outline">
            Send email
          </Button>
          {settings.socials
            .filter((s) => s.label !== 'Email')
            .map((social) => (
              <Button
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                variant="ghost"
              >
                {social.label}
              </Button>
            ))}
        </div>
      </Panel>
    </div>
  )
}
