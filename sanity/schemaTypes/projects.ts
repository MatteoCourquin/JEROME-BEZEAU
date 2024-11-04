import { RocketIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const projects = defineType({
  name: 'projects',
  title: 'PROJECTS',
  type: 'document',
  icon: RocketIcon,
  fieldsets: [
    {
      name: 'projectInfo',
      title: 'Project Information 🚀',
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
    defineField({
      name: 'title',
      title: 'Title 🚀',
      type: 'string',
      description: 'The title of the project.',
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(100)
          .error('The title is required and should be between 1 and 100 characters.'),
      fieldset: 'projectInfo',
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
      description: 'Slug for the project based on the title.',
      validation: (Rule) => Rule.required(),
      fieldset: 'projectInfo',
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
      description: 'Select the type(s) of the project.',
      fieldset: 'projectInfo',
    }),
    defineField({
      name: 'date',
      title: 'Date 📅',
      type: 'date',
      description: 'The date of the project.',
      validation: (Rule) => Rule.required(),
      fieldset: 'projectInfo',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
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
      description: 'A brief description of the project in English.',
      validation: (Rule) =>
        Rule.required().max(500).warning('A shorter description is more engaging.'),
      fieldset: 'descriptionInfo',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image 🌐',
      type: 'image',
      description: 'SETUP in Photoshop : 1200x630px, 24% quality',
      options: {
        hotspot: true,
      },
      fieldset: 'mediaInfo',
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
    // defineField({
    //   name: 'mainVideo',
    //   title: 'Main Video 💻',
    //   type: '???',
    //   // validation: (Rule) => Rule.required(),
    //   fieldset: 'mediaInfo',
    // }),
    // defineField({
    //   name: 'mainImageMobile',
    //   title: 'Main Image 📱',
    //   type: 'image',
    //   options: {
    //     hotspot: true,
    //   },
    //   validation: (Rule) => Rule.required(),
    //   fieldset: 'mediaInfo',
    // }),
    defineField({
      name: 'projectUrl',
      title: 'Link to Project 🔗',
      type: 'url',
      description: 'Optional URL to the project.',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
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
              name: 'content',
              title: 'Content',
              type: 'blockContent',
              hidden: ({ parent }) => parent?.sectionType !== 'text',
              description: 'Text content for this section.',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              hidden: ({ parent }) => parent?.sectionType !== 'image',
              description: 'Image for this section.',
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              hidden: ({ parent }) => parent?.sectionType !== 'video',
              description: 'URL of the video for this section.',
            }),
          ],
          preview: {
            select: {
              title: 'sectionType',
              media: 'image',
            },
            prepare(selection) {
              const { title, media } = selection;
              return {
                title: title.charAt(0).toUpperCase() + title.slice(1),
                media,
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
