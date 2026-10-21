import { createClient, type SanityClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim()
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim() || 'production'
const apiVersion =
  import.meta.env.VITE_SANITY_API_VERSION?.trim() || '2025-01-01'

function createSanityClient(): SanityClient | null {
  if (!projectId) return null

  try {
    return createClient({
      projectId,
      dataset,
      apiVersion,
      perspective: 'published',
      useCdn: true,
      timeout: 10000,
    })
  } catch (error) {
    console.warn('Invalid Sanity configuration; using seed content.', error)
    return null
  }
}

export const sanityClient = createSanityClient()
/** True when the frontend has a valid Sanity client configuration. */
export const isSanityConfigured = sanityClient !== null

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null

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
