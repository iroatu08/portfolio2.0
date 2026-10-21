import {defineType, defineField, defineArrayMember} from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'excerpt', type: 'text'}),
    defineField({name: 'publishedAt', type: 'datetime', validation: (rule) => rule.required()}),
    defineField({name: 'tags', type: 'array', of: [defineArrayMember({type: 'string'})]}),
    defineField({
      name: 'body',
      type: 'array',
      description: 'Plain-text paragraphs, one item per paragraph.',
      of: [defineArrayMember({type: 'text'})],
    }),
    defineField({name: 'coverGradient', type: 'string'}),
    defineField({name: 'cover', type: 'image'}),
  ],
})
