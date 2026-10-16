export type SocialLink = {
  label: string
  href: string
}

export type SiteSettings = {
  name: string
  role: string
  bio: string
  location: string
  email: string
  avatarUrl: string
  aboutPortraitUrl: string
  playPortraitUrl: string
  socials: SocialLink[]
  nextFocus: string
}

export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  id: string
  title: string
  slug: string
  org: string
  role: string
  summary: string
  body: string[]
  stack: string[]
  links: ProjectLink[]
  coverImageUrl: string
  coverGradient: string
  coverLabel: string
  featured: boolean
  order: number
}

export type Article = {
  id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  tags: string[]
  body: string[]
  coverGradient: string
}

export type Testimonial = {
  id: string
  quote: string
  author: string
  title: string
}

export type Skill = {
  id: string
  label: string
  category: string
}
