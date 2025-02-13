import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const tags = defineType({
  name: 'tags',
  title: 'TAGS',
  type: 'document',
  icon: TagIcon,
  fieldsets: [
    {
      name: 'labels',
      title: 'Labels 🏷️',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'labelFr',
      title: 'Label 🇫🇷',
      type: 'string',
      description: 'The tag label in French.',
      validation: (Rule) => Rule.required().error('The French label is required.'),
      fieldset: 'labels',
    }),
    defineField({
      name: 'labelEn',
      title: 'Label 🇬🇧',
      type: 'string',
      description: 'The tag label in English.',
      validation: (Rule) => Rule.required().error('The English label is required.'),
      fieldset: 'labels',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'slug',
      options: {
        source: 'labelEn',
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .slice(0, 200),
      },
      description: 'A unique identifier for the project type.',
      validation: (Rule) => Rule.required().error('The value is required.'),
    }),
  ],
  preview: {
    select: {
      title: 'labelEn',
      subtitle: 'value.current',
    },
  },
});
