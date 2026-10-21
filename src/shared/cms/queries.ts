import {
  articles as seedArticles,
  projects as seedProjects,
  siteSettings as seedSettings,
  skills as seedSkills,
  testimonials as seedTestimonials,
} from './seed'
import { isSanityConfigured, sanityClient } from './client'
import type {
  Article,
  Project,
  SiteSettings,
  Skill,
  Testimonial,
} from './types'

/**
 * Returns site settings from Sanity when configured, otherwise local seed.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured || !sanityClient) {
    return seedSettings
  }

  try {
    const data = await sanityClient.fetch<
      { [K in keyof SiteSettings]?: SiteSettings[K] | null } | null
    >(`*[_type == "siteSettings"] | order(_updatedAt desc, _id asc)[0]{
      name, role, bio, location, email, nextFocus,
      "avatarUrl": avatar.asset->url,
      "aboutPortraitUrl": aboutPortrait.asset->url,
      "playPortraitUrl": playPortrait.asset->url,
      socials[defined(label) && defined(href)]{label, href}
    }`)
    // GROQ returns null for missing fields; spreading data alone erases seed values.
    return Object.fromEntries(
      Object.entries(seedSettings).map(([key, fallback]) => [
        key,
        data?.[key as keyof SiteSettings] ?? fallback,
      ]),
    ) as SiteSettings
  } catch (error) {
    console.warn(
      'Unable to load Sanity site settings; using seed content.',
      error,
    )
    return seedSettings
  }
}

/**
 * Returns projects ordered for display.
 */
export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured || !sanityClient) {
    return [...seedProjects].sort((a, b) => a.order - b.order)
  }

  try {
    const data = await sanityClient.fetch<
      Project[]
    >(`*[_type == "project" && defined(title) && defined(slug.current)] | order(order asc, _id asc){
      "id": _id, title, "slug": slug.current,
      "org": coalesce(org, ""), "role": coalesce(role, ""),
      "summary": coalesce(summary, ""), "body": coalesce(body, []),
      "stack": coalesce(stack, []),
      "links": coalesce(links[defined(label) && defined(href)]{label, href}, []),
      "coverImageUrl": coalesce(cover.asset->url, coverImageUrl, ""),
      "coverGradient": coalesce(coverGradient, "linear-gradient(135deg, #1a1a1a, #303030)"),
      "coverLabel": coalesce(coverLabel, ""),
      "featured": coalesce(featured, false), "order": coalesce(order, 0)
    }`)
    return data?.length
      ? data
      : [...seedProjects].sort((a, b) => a.order - b.order)
  } catch (error) {
    console.warn('Unable to load Sanity projects; using seed content.', error)
    return [...seedProjects].sort((a, b) => a.order - b.order)
  }
}

/**
 * Returns a single project by slug.
 */
export async function getProjectBySlug(
  slug: string,
): Promise<Project | undefined> {
  const all = await getProjects()
  return all.find((project) => project.slug === slug)
}

/**
 * Returns featured projects for home masonry and play world.
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getProjects()
  return all.filter((project) => project.featured)
}

/**
 * Returns articles newest-first.
 */
export async function getArticles(): Promise<Article[]> {
  if (!isSanityConfigured || !sanityClient) {
    return [...seedArticles].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
  }

  try {
    const data = await sanityClient.fetch<
      Article[]
    >(`*[_type == "article" && defined(title) && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc, _id asc){
      "id": _id, title, "slug": slug.current, publishedAt,
      "excerpt": coalesce(excerpt, ""), "tags": coalesce(tags, []),
      "body": coalesce(body, []),
      "coverGradient": coalesce(coverGradient, "linear-gradient(135deg, #1a1a1a, #303030)")
    }`)
    return data?.length
      ? data
      : [...seedArticles].sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
        )
  } catch (error) {
    console.warn('Unable to load Sanity articles; using seed content.', error)
    return [...seedArticles].sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
  }
}

/**
 * Returns a single article by slug.
 */
export async function getArticleBySlug(
  slug: string,
): Promise<Article | undefined> {
  const all = await getArticles()
  return all.find((article) => article.slug === slug)
}

/**
 * Returns testimonials for the home carousel.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured || !sanityClient) {
    return seedTestimonials
  }

  try {
    const data = await sanityClient.fetch<
      Testimonial[]
    >(`*[_type == "testimonial" && defined(quote) && defined(author)] | order(_id asc){
      "id": _id, quote, author, "title": coalesce(title, "")
    }`)
    return data?.length ? data : seedTestimonials
  } catch (error) {
    console.warn(
      'Unable to load Sanity testimonials; using seed content.',
      error,
    )
    return seedTestimonials
  }
}

/**
 * Returns skill chips.
 */
export async function getSkills(): Promise<Skill[]> {
  if (!isSanityConfigured || !sanityClient) {
    return seedSkills
  }

  try {
    const data = await sanityClient.fetch<
      Skill[]
    >(`*[_type == "skill" && defined(label)] | order(_id asc){
      "id": _id, label, "category": coalesce(category, "")
    }`)
    return data?.length ? data : seedSkills
  } catch (error) {
    console.warn('Unable to load Sanity skills; using seed content.', error)
    return seedSkills
  }
}
