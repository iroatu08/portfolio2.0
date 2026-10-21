import {defineType, defineField} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'quote', type: 'text', validation: (rule) => rule.required()}),
    defineField({name: 'author', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'title', type: 'string'}),
  ],
})
