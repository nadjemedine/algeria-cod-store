export const productSchema = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'image',
            title: 'Image Principale',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'images',
            title: 'Galerie d\'images',
            type: 'array',
            of: [{ type: 'image' }],
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'sizes',
            title: 'Sizes',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'size', title: 'Size', type: 'string' },
                        { name: 'stock', title: 'Stock', type: 'number' }
                    ],
                    preview: {
                        select: {
                            title: 'size',
                            subtitle: 'stock'
                        }
                    }
                }
            ],
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'stockQuantity',
            title: 'Stock Quantity',
            type: 'number',
        },
        {
            name: 'hidden',
            title: 'Hidden',
            type: 'boolean',
        },
    ],
};
