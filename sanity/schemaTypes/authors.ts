import { UsersIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'authors',
  title: '👥 AUTHORS',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name 👤',
      type: 'string',
      description: "Author's full name.",
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(100)
          .error('The name is required and should be between 5 and 100 characters.'),
    }),
    defineField({
      name: 'websiteUrl',
      title: 'Website URL 🌐',
      type: 'url',
      description: "Author's personal or professional website URL.",
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'reference',
      to: [{ type: 'tags' }],
      description: 'The tag associated with the author.',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'websiteUrl',
    },
  },
});
