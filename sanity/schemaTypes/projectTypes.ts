import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const projectTypes = defineType({
  name: 'projectTypes',
  title: 'PROJECT TYPES',
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
      description: 'The project type label in French.',
      validation: (Rule) => Rule.required().error('The French label is required.'),
      fieldset: 'labels',
    }),
    defineField({
      name: 'labelEn',
      title: 'Label 🇬🇧',
      type: 'string',
      description: 'The project type label in English.',
      validation: (Rule) => Rule.required().error('The English label is required.'),
      fieldset: 'labels',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'slug',
      options: {
        source: 'labelFr',
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
