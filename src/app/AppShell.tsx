import { Outlet, useLocation } from 'react-router-dom'
import { useRef } from 'react'
import { SiteNav } from '@/shared/ui/SiteNav'
import { gsap, useGSAP, withMotionPreference } from '@/shared/motion/gsapSetup'

export function AppShell(): React.JSX.Element {
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const media = withMotionPreference(() => {
        gsap.fromTo(
          mainRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, clearProps: 'all' },
        )
      }, () => {
        if (mainRef.current) {
          gsap.set(mainRef.current, { opacity: 1, y: 0 })
        }
      })
      return () => media.revert()
    },
    { dependencies: [location.pathname], revertOnUpdate: true },
  )

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-lime focus:px-4 focus:py-2 focus:text-canvas"
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main" ref={mainRef} className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <Outlet />
      </main>
    </div>
  )
}
