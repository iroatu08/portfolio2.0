import {projectId, dataset} from '../portfolio/project'
import {schemaTypes} from '../portfolio/schemaTypes'

/**
 * Studio lives in `portfolio/` (created with `npm create sanity@latest`).
 * Run it with: `cd portfolio && npm run dev`
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
  projectId,
  dataset,
  schemaTypes,
}
