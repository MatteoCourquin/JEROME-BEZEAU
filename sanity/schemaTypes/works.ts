import { DocumentVideoIcon, EditIcon, ImageIcon, RocketIcon, TextIcon } from '@sanity/icons';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';
import { defineField, defineType } from 'sanity';

export const works = defineType({
  name: 'works',
  title: 'WORKS',
  type: 'document',
  icon: RocketIcon,
  orderings: [orderRankOrdering],
  fieldsets: [
    {
      name: 'workInfo',
      title: 'Work Information 🚀',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'descriptionInfo',
      title: 'Description 📝',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'mediaInfo',
      title: 'Media 📸',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'sectionsInfo',
      title: 'Sections 📑',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    orderRankField({ type: 'works' }),
    defineField({
      name: 'title',
      title: 'Title 🚀',
      type: 'string',
      description: 'The title of the work.',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(100)
          .error('The title is required and should be between 1 and 100 characters.'),
      fieldset: 'workInfo',
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
      description: 'Slug for the work based on the title.',
      validation: (Rule) => Rule.required(),
      fieldset: 'workInfo',
    }),
    defineField({
      name: 'date',
      title: 'Date 📅',
      type: 'date',
      description: 'The date of the work.',
      validation: (Rule) => Rule.required(),
      fieldset: 'workInfo',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'workUrl',
      title: 'Link to Work 🔗',
      type: 'url',
      description: 'Optional URL to the work.',
      fieldset: 'workInfo',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image 🌐',
      type: 'image',
      description: 'SETUP in Photoshop : 1200x630px, 24% quality',
      options: {
        hotspot: true,
      },
      fieldset: 'workInfo',
    }),
    defineField({
      name: 'tags',
      title: 'Types 🏷️',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'tags' }] }],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(3)
          .error('At least one type is required and a maximum of 3 types are allowed.'),
      description: 'Select the type(s) of the work.',
    }),
    defineField({
      name: 'credits',
      title: 'Credits 🙏',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'author',
              title: 'Author',
              type: 'reference',
              to: [{ type: 'authors' }],
              description: 'The author of the work.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role',
              type: 'reference',
              to: [{ type: 'tags' }],
              description: 'The role of the person in the work.',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'author.name',
              subtitle: 'role.labelEn',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'descriptionFr',
      title: 'Description 🇫🇷',
      type: 'blockContent',
      description: 'Une brève description du projet en français.',
      validation: (Rule) =>
        Rule.required().max(500).warning('A shorter description is more engaging.'),
      fieldset: 'descriptionInfo',
    }),
    defineField({
      name: 'descriptionEn',
      title: 'Description 🇬🇧',
      type: 'blockContent',
      description: 'A brief description of the work in English.',
      validation: (Rule) =>
        Rule.required().max(500).warning('A shorter description is more engaging.'),
      fieldset: 'descriptionInfo',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image 💻',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fieldset: 'mediaInfo',
    }),
    defineField({
      name: 'mainVideo',
      title: 'Main Video 💻',
      type: 'file',
      description: 'The main video of the work.',
      options: {
        accept: 'video/webm',
      },
      fieldset: 'mediaInfo',
    }),
    defineField({
      name: 'sections',
      title: 'Sections 📑',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'sectionType',
              title: 'Section Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Text', value: 'text' },
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'contentFr',
              title: 'Contenu 🇫🇷',
              type: 'blockContent',
              hidden: ({ parent }) => parent?.sectionType !== 'text',
              description: 'Contenu en français pour cette section.',
            }),
            defineField({
              name: 'contentEn',
              title: 'Content 🇺🇸',
              type: 'blockContent',
              hidden: ({ parent }) => parent?.sectionType !== 'text',
              description: 'Content in English for this section.',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              hidden: ({ parent }) => parent?.sectionType !== 'image',
              description: 'Image for this section.',
            }),
            defineField({
              name: 'video',
              title: 'Video',
              type: 'file',
              hidden: ({ parent }) => parent?.sectionType !== 'video',
              description: 'Video for this section.',
              options: {
                accept: 'video/webm',
              },
            }),
          ],
          preview: {
            select: {
              title: 'sectionType',
              media: 'image',
              contentPreview: 'contentEn',
            },
            prepare(selection) {
              const { title, media, contentPreview } = selection;
              let text = '';
              let icon;
              switch (title) {
                case 'text':
                  text = contentPreview ? contentPreview[0].children[0].text : 'Text (empty)';
                  icon = TextIcon;
                  break;
                case 'image':
                  text = media ? 'Image' : 'Image (empty)';
                  icon = ImageIcon;
                  break;
                case 'video':
                  text = 'Video';
                  icon = DocumentVideoIcon;
                  break;
                default:
                  text = 'Edit';
                  icon = EditIcon;
              }

              return {
                title: text,
                media: media || icon,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'mainImage',
    },
  },
});
