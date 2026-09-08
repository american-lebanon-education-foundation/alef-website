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
      name: 'isPinned',
      title: 'Pin / Feature to Top',
      type: 'boolean',
      description: 'Turn this ON to showcase this blog at the top of the Blogs & Articles page and on the Homepage.',
      initialValue: false,
    }),
    defineField({
      name: 'pinnedBadge',
      title: 'Custom Badge Label',
      type: 'string',
      description: 'Custom text shown on the badge (e.g. FEATURED, HOT, SPOTLIGHT, POLICY BRIEF). Defaults to FEATURED.',
      hidden: ({ parent }) => !parent?.isPinned,
      initialValue: 'FEATURED',
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
      isPinned: 'isPinned',
      pinnedBadge: 'pinnedBadge',
    },
    prepare(selection) {
      const { title, media, isPinned, pinnedBadge } = selection
      const badgePrefix = isPinned ? `[${pinnedBadge || 'FEATURED'}] ` : ''
      return {
        title: `${badgePrefix}${title || 'Untitled Blog'}`,
        media: media,
      }
    }
  },
})