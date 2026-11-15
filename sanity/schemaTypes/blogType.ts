import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'localizedString',
    }),
    defineField({
      name: 'language',
      type: 'string',
      hidden: true, // Legacy field, hiding it
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title.en', // Update source
      },
    }),
    defineField({
      name: 'author',
      type: 'reference',
      to: { type: 'author' },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'publishedAt',
      type: 'date',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (Short Summary)',
      type: 'localizedText',
      description: 'This ends up on the card in the blog list.',
    }),
    defineField({
      name: 'body',
      type: 'localizedBlockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title.en',
      media: 'mainImage',
    },
    prepare(selection) {
      const { title, media } = selection
      return {
        title: title || 'Untitled Blog',
        media: media,
      }
    }
  },
})