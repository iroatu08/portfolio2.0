import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

gsap.defaults({
  ease: 'power3.out',
  duration: 0.8,
})

/**
 * Runs a setup callback only when the user has not requested reduced motion.
 * Falls back to an instant callback that should set final styles without animation.
 */
export function withMotionPreference(
  animate: () => void,
  instant?: () => void,
): gsap.MatchMedia {
  const media = gsap.matchMedia()
  media.add('(prefers-reduced-motion: no-preference)', () => {
    animate()
  })
  media.add('(prefers-reduced-motion: reduce)', () => {
    instant?.()
  })
  return media
}

export { gsap, ScrollTrigger, useGSAP }
