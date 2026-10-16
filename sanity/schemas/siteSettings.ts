export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'role', type: 'string' },
    { name: 'bio', type: 'text' },
    { name: 'location', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'nextFocus', type: 'string' },
    { name: 'avatar', type: 'image', options: { hotspot: true } },
    { name: 'aboutPortrait', type: 'image', options: { hotspot: true } },
    { name: 'playPortrait', type: 'image', options: { hotspot: true } },
    {
      name: 'socials',
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
  ],
}
