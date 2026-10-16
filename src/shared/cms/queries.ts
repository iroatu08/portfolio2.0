import {
  articles as seedArticles,
  projects as seedProjects,
  siteSettings as seedSettings,
  skills as seedSkills,
  testimonials as seedTestimonials,
} from './seed'
import { isSanityConfigured, sanityClient } from './client'
import type { Article, Project, SiteSettings, Skill, Testimonial } from './types'

/**
 * Returns site settings from Sanity when configured, otherwise local seed.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured || !sanityClient) {
    return seedSettings
  }

  try {
    const data = await sanityClient.fetch<SiteSettings | null>(`*[_type == "siteSettings"][0]{
      name, role, bio, location, email, nextFocus,
      "avatarUrl": avatar.asset->url,
      "aboutPortraitUrl": aboutPortrait.asset->url,
      "playPortraitUrl": playPortrait.asset->url,
      socials[]{label, href}
    }`)
    return data ?? seedSettings
  } catch {
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
    const data = await sanityClient.fetch<Project[]>(`*[_type == "project"]|order(order asc){
      "id": _id, title, "slug": slug.current, org, role, summary, body, stack,
      links[]{label, href}, "coverImageUrl": coalesce(cover.asset->url, coverImageUrl),
      coverGradient, coverLabel, featured, order
    }`)
    return data?.length ? data : [...seedProjects].sort((a, b) => a.order - b.order)
  } catch {
    return [...seedProjects].sort((a, b) => a.order - b.order)
  }
}

/**
 * Returns a single project by slug.
 */
export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
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
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
  }

  try {
    const data = await sanityClient.fetch<Article[]>(`*[_type == "article"]|order(publishedAt desc){
      "id": _id, title, "slug": slug.current, excerpt, publishedAt, tags, body, coverGradient
    }`)
    return data?.length
      ? data
      : [...seedArticles].sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
        )
  } catch {
    return [...seedArticles].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
  }
}

/**
 * Returns a single article by slug.
 */
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
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
    const data = await sanityClient.fetch<Testimonial[]>(`*[_type == "testimonial"]{
      "id": _id, quote, author, title
    }`)
    return data?.length ? data : seedTestimonials
  } catch {
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
    const data = await sanityClient.fetch<Skill[]>(`*[_type == "skill"]{
      "id": _id, label, category
    }`)
    return data?.length ? data : seedSkills
  } catch {
    return seedSkills
  }
}
