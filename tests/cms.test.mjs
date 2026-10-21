import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'
import ts from 'typescript'

const require = createRequire(import.meta.url)
// Use the Studio's GROQ evaluator to exercise the actual query strings offline.
const studioRequire = createRequire(
  new URL('../portfolio/package.json', import.meta.url),
)
const { parse, evaluate } = studioRequire('groq-js')

function load(name, mocks = {}, env = {}) {
  const source = readFileSync(
    new URL(`../src/shared/cms/${name}.ts`, import.meta.url),
    'utf8',
  ).replaceAll('import.meta.env', JSON.stringify(env))
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  })
  const exports = {}
  new Function('require', 'exports', outputText)(
    (id) => (Object.hasOwn(mocks, id) ? mocks[id] : require(id)),
    exports,
  )
  return exports
}

const seed = load('seed')
const getters = [
  'getSiteSettings',
  'getProjects',
  'getArticles',
  'getTestimonials',
  'getSkills',
]
function queries(dataset = [], mode = 'cms') {
  return load('queries', {
    './seed': seed,
    './client': {
      isSanityConfigured: mode !== 'disabled',
      sanityClient:
        mode === 'disabled'
          ? null
          : {
              async fetch(query) {
                if (mode === 'error') throw new Error('Network unavailable')
                return (await evaluate(parse(query), { dataset })).get()
              },
            },
    },
  })
}

test('missing and invalid configuration cannot prevent startup', (t) => {
  const warnings = t.mock.method(console, 'warn', () => {})
  assert.equal(load('client').sanityClient, null)
  for (const env of [
    { VITE_SANITY_PROJECT_ID: 'invalid project' },
    { VITE_SANITY_PROJECT_ID: 'gy3g0tff', VITE_SANITY_DATASET: 'INVALID' },
    { VITE_SANITY_PROJECT_ID: 'gy3g0tff', VITE_SANITY_API_VERSION: 'invalid' },
  ]) {
    assert.equal(load('client', {}, env).sanityClient, null)
  }
  assert.equal(warnings.mock.calls.length, 3)
  const { sanityClient } = load(
    'client',
    {},
    {
      VITE_SANITY_PROJECT_ID: ' gy3g0tff ',
      VITE_SANITY_DATASET: '',
      VITE_SANITY_API_VERSION: '',
    },
  )
  assert.equal(sanityClient.config().dataset, 'production')
  assert.equal(sanityClient.config().perspective, 'published')
  assert.equal(sanityClient.config().useCdn, true)
})

test('disabled CMS, empty dataset and request failure preserve every seed collection', async (t) => {
  t.mock.method(console, 'warn', () => {})
  for (const mode of ['disabled', 'cms', 'error']) {
    const cms = queries([], mode)
    for (const [i, expected] of [
      seed.siteSettings,
      seed.projects,
      seed.articles,
      seed.testimonials,
      seed.skills,
    ].entries()) {
      assert.deepEqual(await cms[getters[i]](), expected)
    }
    assert.deepEqual(
      await cms.getProjectBySlug(seed.projects[0].slug),
      seed.projects[0],
    )
    assert.deepEqual(
      await cms.getArticleBySlug(seed.articles[0].slug),
      seed.articles[0],
    )
  }
})

test('partial settings retain seed values and uploaded images resolve', async () => {
  const partial = await queries([
    { _id: 'partial', _type: 'siteSettings', role: 'CMS role' },
  ]).getSiteSettings()
  assert.deepEqual(partial, { ...seed.siteSettings, role: 'CMS role' })
  const cms = queries([
    {
      _id: 'older',
      _type: 'siteSettings',
      _updatedAt: '2026-01-01',
      name: 'Old',
    },
    {
      _id: 'settings',
      _type: 'siteSettings',
      _updatedAt: '2026-10-21',
      name: 'CMS name',
      avatar: { asset: { _ref: 'image-portrait' } },
      socials: [],
    },
    {
      _id: 'image-portrait',
      _type: 'sanity.imageAsset',
      url: 'https://cdn.sanity.io/portrait.jpg',
    },
  ])
  assert.deepEqual(await cms.getSiteSettings(), {
    ...seed.siteSettings,
    name: 'CMS name',
    avatarUrl: 'https://cdn.sanity.io/portrait.jpg',
    socials: [],
  })
})

test('sparse CMS documents have safe arrays, deterministic ordering and usable routes', async () => {
  const cms = queries([
    {
      _id: 'project-b',
      _type: 'project',
      title: 'B',
      slug: { current: 'b' },
      order: 2,
    },
    {
      _id: 'project-a',
      _type: 'project',
      title: 'A',
      slug: { current: 'a' },
      order: 1,
      featured: true,
      coverImageUrl: '/fallback.jpg',
      cover: { asset: { _ref: 'cover' } },
    },
    {
      _id: 'cover',
      _type: 'sanity.imageAsset',
      url: 'https://cdn.sanity.io/cover.jpg',
    },
    { _id: 'invalid-project', _type: 'project', title: 'Missing slug' },
    {
      _id: 'article',
      _type: 'article',
      title: 'Article',
      slug: { current: 'article' },
      publishedAt: '2026-10-21',
    },
    {
      _id: 'invalid-article',
      _type: 'article',
      title: 'Missing date',
      slug: { current: 'invalid' },
    },
    { _id: 'skill', _type: 'skill', label: 'TypeScript' },
    {
      _id: 'testimonial',
      _type: 'testimonial',
      author: 'Author',
      quote: 'Great',
    },
  ])
  const projects = await cms.getProjects()
  assert.deepEqual(
    projects.map((p) => p.slug),
    ['a', 'b'],
  )
  assert.deepEqual(projects[0].stack, [])
  assert.deepEqual(projects[0].body, [])
  assert.deepEqual(projects[0].links, [])
  assert.equal(projects[0].coverImageUrl, 'https://cdn.sanity.io/cover.jpg')
  assert.equal(projects[1].coverImageUrl, '')
  assert.deepEqual(await cms.getFeaturedProjects(), [projects[0]])
  assert.equal((await cms.getProjectBySlug('a')).id, 'project-a')
  assert.equal(await cms.getProjectBySlug('unknown'), undefined)
  const articles = await cms.getArticles()
  assert.equal(articles.length, 1)
  assert.deepEqual(articles[0].tags, [])
  assert.deepEqual(articles[0].body, [])
  assert.equal((await cms.getSkills())[0].category, '')
  assert.equal((await cms.getTestimonials())[0].title, '')
})
