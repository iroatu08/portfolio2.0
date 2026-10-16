export const project = {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'org', type: 'string' },
    { name: 'role', type: 'string' },
    { name: 'summary', type: 'text' },
    { name: 'body', type: 'array', of: [{ type: 'text' }] },
    { name: 'stack', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'href', type: 'url' },
          ],
        },
      ],
    },
    { name: 'coverGradient', type: 'string' },
    { name: 'coverImageUrl', type: 'string' },
    { name: 'coverLabel', type: 'string' },
    { name: 'featured', type: 'boolean', initialValue: false },
    { name: 'order', type: 'number' },
    { name: 'cover', type: 'image', options: { hotspot: true } },
  ],
}
