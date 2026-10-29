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
    defineField({
      name: 'category',
      title: 'Topic Category (SEO Pillar)',
      type: 'string',
      options: {
        list: [
          { title: 'Lebanon Sovereignty & Political Reform', value: 'Lebanon sovereignty and political reform' },
          { title: 'Government Transparency & Accountability', value: 'Lebanon government transparency and accountability' },
          { title: 'Anti-Corruption Initiatives in Lebanon', value: 'Anti-corruption initiatives in Lebanon' },
          { title: 'Economic Reform & Recovery', value: 'Lebanon economic reform and recovery' },
          { title: 'Political Analysis & Policy Research', value: 'Lebanon political analysis and policy research' },
          { title: 'Hezbollah Accountability & Security', value: 'Hezbollah accountability and Lebanon security' },
          { title: 'Lebanese Diaspora Engagement & Advocacy', value: 'Lebanese diaspora engagement and advocacy' },
          { title: 'Educational Resources & Policy Briefs', value: 'Educational resources on Lebanon\'s political and economic challenges' },
        ],
      },
      description: 'Select the primary keyword theme for search indexing and categorization.',
    }),
    defineField({
      name: 'seoTitle',
      title: 'Custom SEO Title (Optional)',
      type: 'localizedString',
      description: 'Overrides standard post title in Google search results (recommended: 50-60 characters).',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Custom SEO Meta Description (Optional)',
      type: 'localizedText',
      description: 'Overrides standard excerpt in Google search results (recommended: 140-160 characters).',
    }),
    defineField({
      name: 'keywords',
      title: 'Target Search Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Add specific keywords for search visibility (e.g., "Lebanon banking crisis", "UN Resolution 1701").',
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