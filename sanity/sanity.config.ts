import { schemaTypes } from './schemas'

/**
 * Plug these schema types into a Sanity Studio project:
 * `npm create sanity@latest` then import `schemaTypes` from `./schemas`.
 *
 * Env for the Vite app:
 * - VITE_SANITY_PROJECT_ID
 * - VITE_SANITY_DATASET=production
 *
 * Until configured, the site uses local seed data in `src/shared/cms/seed.ts`.
 */
export const sanityStudioHint = {
  name: 'iroatu-portfolio',
  title: 'Iroatu Portfolio',
  schemaTypes,
}
