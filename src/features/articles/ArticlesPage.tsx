import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getArticles } from '@/shared/cms/queries'
import type { Article } from '@/shared/cms/types'
import { Panel } from '@/shared/ui/Panel'
import { Chip } from '@/shared/ui/Chip'
import { gsap, ScrollTrigger, useGSAP, withMotionPreference } from '@/shared/motion/gsapSetup'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso))
}

export function ArticlesPage(): React.JSX.Element {
  useDocumentTitle('Articles | Iroatu Chibuzor Prince')
  const rootRef = useRef<HTMLDivElement>(null)
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    let cancelled = false
    void getArticles().then((list) => {
      if (!cancelled) {
        setArticles(list)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  useGSAP(
    () => {
      if (!articles.length) {
        return
      }
      const media = withMotionPreference(() => {
        gsap.from('.article-card', {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.55,
          scrollTrigger: { trigger: rootRef.current, start: 'top 80%' },
        })
      })
      return () => {
        media.revert()
        ScrollTrigger.getAll().forEach((t) => t.kill())
      }
    },
    { scope: rootRef, dependencies: [articles] },
  )

  return (
    <div ref={rootRef} className="space-y-8">
      <header>
        <p className="text-sm font-medium text-lime">Articles</p>
        <h1 className="font-display mt-2 text-4xl font-bold tracking-tight">Writing</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Notes on product craft, design systems, and the move toward AI engineering & leadership.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <Link key={article.id} to={`/articles/${article.slug}`} className="article-card group">
            <Panel className="h-full overflow-hidden p-0 transition-transform duration-300 group-hover:scale-[1.01]">
              <div className="min-h-28 p-6" style={{ background: article.coverGradient }}>
                <time className="text-xs text-muted" dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
                <h2 className="font-display mt-2 text-xl font-semibold text-ink">{article.title}</h2>
              </div>
              <div className="space-y-3 p-6">
                <p className="text-sm text-muted">{article.excerpt}</p>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <Chip key={tag} label={tag} />
                  ))}
                </div>
              </div>
            </Panel>
          </Link>
        ))}
      </div>
    </div>
  )
}
