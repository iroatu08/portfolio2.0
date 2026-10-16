import { useRef, useState } from 'react'
import type { Testimonial } from '@/shared/cms/types'
import { Panel } from '@/shared/ui/Panel'
import { gsap, useGSAP, withMotionPreference } from '@/shared/motion/gsapSetup'

type TestimonialCarouselProps = {
  items: Testimonial[]
}

export function TestimonialCarousel({ items }: TestimonialCarouselProps): React.JSX.Element {
  const [index, setIndex] = useState(0)
  const quoteRef = useRef<HTMLQuoteElement>(null)
  const active = items[index] ?? items[0]

  useGSAP(
    () => {
      if (!quoteRef.current) {
        return
      }
      const media = withMotionPreference(() => {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.45 },
        )
      })
      return () => media.revert()
    },
    { dependencies: [index], revertOnUpdate: true },
  )

  if (!active) {
    return <></>
  }

  return (
    <Panel className="mt-auto p-5">
      <blockquote ref={quoteRef} className="text-sm leading-relaxed text-muted">
        “{active.quote}”
      </blockquote>
      <p className="mt-4 text-sm font-semibold text-ink">{active.author}</p>
      <p className="text-xs text-muted-dim">{active.title}</p>
      <div className="mt-4 flex gap-2" role="tablist" aria-label="Testimonials">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show testimonial ${i + 1}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === index ? 'bg-lime' : 'bg-border hover:bg-muted-dim'
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </Panel>
  )
}
