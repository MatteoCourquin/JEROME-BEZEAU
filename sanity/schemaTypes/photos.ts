import { ImageIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const photos = defineType({
  name: 'photos',
  title: 'PHOTOS',
  type: 'document',
  icon: ImageIcon,
  fieldsets: [
    {
      name: 'photoInfo',
      title: 'Photo Information 📸',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'mediaInfo',
      title: 'Media 📸',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title 📸',
      type: 'string',
      description: 'The title of the photo.',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(100)
          .error('The title is required and should be between 1 and 100 characters.'),
      fieldset: 'photoInfo',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: (input: string) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 200),
      },
      description: 'Slug for the photo based on the title.',
      validation: (Rule) => Rule.required(),
      fieldset: 'photoInfo',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image Desktop 🖥',
      type: 'image',
      description: 'The main image for the photo.',
      validation: (Rule) => Rule.required(),
      fieldset: 'mediaInfo',
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery 📸',
      type: 'array',
      of: [{ type: 'image' }],
      description: 'The gallery of images for the photo.',
      validation: (Rule) => Rule.min(1).max(12),
      fieldset: 'mediaInfo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'mainImageDesktop',
    },
  },
});
