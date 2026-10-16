export const article = {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'excerpt', type: 'text' },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'body', type: 'array', of: [{ type: 'text' }] },
    { name: 'coverGradient', type: 'string' },
    { name: 'cover', type: 'image' },
  ],
}
