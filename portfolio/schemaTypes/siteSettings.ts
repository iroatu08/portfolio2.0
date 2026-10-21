import {defineType, defineField, defineArrayMember} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'name', type: 'string'}),
    defineField({name: 'role', type: 'string'}),
    defineField({name: 'bio', type: 'text'}),
    defineField({name: 'location', type: 'string'}),
    defineField({name: 'email', type: 'string', validation: (rule) => rule.email()}),
    defineField({name: 'nextFocus', type: 'string'}),
    defineField({name: 'avatar', type: 'image', options: {hotspot: true}}),
    defineField({name: 'aboutPortrait', type: 'image', options: {hotspot: true}}),
    defineField({name: 'playPortrait', type: 'image', options: {hotspot: true}}),
    defineField({
      name: 'socials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'href',
              type: 'url',
              validation: (rule) =>
                rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel']}),
            }),
          ],
        }),
      ],
    }),
  ],
})
