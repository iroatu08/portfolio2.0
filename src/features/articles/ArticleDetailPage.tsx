import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getArticleBySlug } from '@/shared/cms/queries'
import type { Article } from '@/shared/cms/types'
import { Button } from '@/shared/ui/Button'
import { Chip } from '@/shared/ui/Chip'
import { Panel } from '@/shared/ui/Panel'
import { useDocumentTitle } from '@/shared/hooks/useDocumentTitle'

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso))
}

export function ArticleDetailPage(): React.JSX.Element {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<Article | null | undefined>(undefined)
  useDocumentTitle(
    article ? `${article.title} | Iroatu Chibuzor Prince` : 'Article | Iroatu Chibuzor Prince',
  )

  useEffect(() => {
    if (!slug) {
      return
    }
    let cancelled = false
    void getArticleBySlug(slug).then((found) => {
      if (!cancelled) {
        setArticle(found ?? null)
      }
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (!slug) {
    return (
      <div className="space-y-4 py-20 text-center">
        <p className="text-muted">Article not found.</p>
        <Button to="/articles" variant="outline">
          Back to articles
        </Button>
      </div>
    )
  }

  if (article === undefined) {
    return <div className="py-20 text-center text-muted">Loading…</div>
  }

  if (!article) {
    return (
      <div className="space-y-4 py-20 text-center">
        <p className="text-muted">Article not found.</p>
        <Button to="/articles" variant="outline">
          Back to articles
        </Button>
      </div>
    )
  }

  return (
    <article className="mx-auto max-w-2xl space-y-8">
      <Link to="/articles" className="text-sm text-muted hover:text-lime">
        ← Articles
      </Link>

      <header
        className="rounded-[var(--radius-panel)] border border-border p-8"
        style={{ background: article.coverGradient }}
      >
        <time className="text-xs text-muted" dateTime={article.publishedAt}>
          {formatDate(article.publishedAt)}
        </time>
        <h1 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          {article.title}
        </h1>
        <div className="mt-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Chip key={tag} label={tag} />
          ))}
        </div>
      </header>

      <Panel className="space-y-5 p-6 md:p-8">
        {article.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-muted">
            {paragraph}
          </p>
        ))}
      </Panel>
    </article>
  )
}
