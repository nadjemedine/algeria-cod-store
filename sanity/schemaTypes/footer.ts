import { defineField, defineType } from 'sanity'

export const footerSchema = defineType({
    name: 'footer',
    title: 'Footer',
    type: 'document',
    fields: [
        defineField({
            name: 'instagram',
            title: 'Instagram URL',
            type: 'url',
        }),
        defineField({
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
        }),
        defineField({
            name: 'copyright',
            title: 'Copyright Text',
            type: 'string',
            initialValue: 'Boutique Celinaa © 2026',
        }),
        defineField({
            name: 'footerSize',
            title: 'Footer Padding Vertical',
            type: 'number',
            description: 'Vertical padding for the footer (e.g. 16, 24, 32)',
            initialValue: 24,
        }),
        defineField({
            name: 'fontSize',
            title: 'Font Size',
            type: 'number',
            description: 'Base font size in px (e.g. 12, 14, 16)',
            initialValue: 12,
        }),
        defineField({
            name: 'backgroundColor',
            title: 'Background Color',
            type: 'string',
            description: 'Hex color (e.g. #1c1c1c)',
            initialValue: '#1c1c1c',
        }),
    ],
})
