export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      title: 'Project Type',
      type: 'string',
      description: 'e.g. Full Stack Web App, Automation Solution, API Integration'
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on the projects index page'
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Text', type: 'string' }
      ]
    },
    {
      name: 'stack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'e.g. React, Node.js, PostgreSQL'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'alt', type: 'string', title: 'Alt Text' }
          ]
        }
      ]
    },
    {
      name: 'externalUrl',
      title: 'Live URL',
      type: 'url',
      description: 'Link to the live project (optional)'
    },
    {
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
      description: 'Show in the Selected Projects section on the homepage'
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first on the homepage (e.g. 1, 2, 3)'
    },
    {
      name: 'completedAt',
      title: 'Completion Date',
      type: 'date'
    }
  ],
  preview: {
    select: { title: 'title', subtitle: 'type', media: 'mainImage' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle || 'No type set', media }
    }
  }
}
