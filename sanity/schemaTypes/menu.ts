import { defineField, defineType } from 'sanity'

export const menuSchema = defineType({
    name: 'menu',
    title: 'Menu',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'link',
            title: 'Link / URL',
            type: 'string',
            description: 'The URL or path this menu item points to (e.g., /category/shoes or https://example.com)',
        }),
        defineField({
            name: 'icon',
            title: 'Icon Image',
            type: 'image',
            description: 'Optional icon image for the menu item',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'iconName',
            title: 'Icon Name (Lucide)',
            type: 'string',
            description: 'Optional Lucide icon name (e.g., ShoppingCart, Heart, Phone). Overrides image if both present.',
        }),
        defineField({
            name: 'order',
            title: 'Order',
            type: 'number',
            description: 'Used to sort menu items',
        }),
        defineField({
            name: 'isButton',
            title: 'Show as Button',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'style',
            title: 'Button Style',
            type: 'string',
            options: {
                list: [
                    { title: 'Normal Link', value: 'link' },
                    { title: 'Primary Button', value: 'primary' },
                    { title: 'Outline Button', value: 'outline' },
                ],
            },
            hidden: ({ parent }) => !parent?.isButton,
        }),
    ],
})
