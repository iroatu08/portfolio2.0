import { createClient, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? 'production'
const apiVersion = (import.meta.env.VITE_SANITY_API_VERSION as string | undefined) ?? '2025-01-01'

/** True when a Sanity project is configured for live CMS fetches. */
export const isSanityConfigured = Boolean(projectId && projectId.length > 0)

export const sanityClient: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

/**
 * Builds a Sanity CDN image URL when CMS is configured.
 * @param source - Sanity image source object
 * @returns URL string or empty string when Sanity is offline
 */
export function urlForImage(source: SanityImageSource): string {
  if (!builder) {
    return ''
  }
  return builder.image(source).auto('format').url()
}
