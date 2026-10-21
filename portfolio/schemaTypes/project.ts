import {defineType, defineField, defineArrayMember} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'org', type: 'string'}),
    defineField({name: 'role', type: 'string'}),
    defineField({name: 'summary', type: 'text'}),
    defineField({
      name: 'body',
      type: 'array',
      description: 'Plain-text paragraphs, one item per paragraph.',
      of: [defineArrayMember({type: 'text'})],
    }),
    defineField({name: 'stack', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({
      name: 'links',
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
    defineField({name: 'coverGradient', type: 'string'}),
    defineField({name: 'coverImageUrl', type: 'string'}),
    defineField({name: 'coverLabel', type: 'string'}),
    defineField({name: 'featured', type: 'boolean', initialValue: false}),
    defineField({name: 'order', type: 'number'}),
    defineField({name: 'cover', type: 'image', options: {hotspot: true}}),
  ],
})
