import { ALGERIAN_STATES } from './deliveryPrice';

export const orderSchema = {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        {
            name: 'fullName',
            title: 'Full Name',
            type: 'string',
        },
        {
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        },
        {
            name: 'wilaya',
            title: 'Wilaya',
            type: 'string',
            options: {
                list: ALGERIAN_STATES,
            },
        },
        {
            name: 'deliveryType',
            title: 'Delivery Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Home Delivery', value: 'home' },
                    { title: 'Office Delivery', value: 'office' },
                ],
            },
        },
        {
            name: 'address',
            title: 'Address',
            type: 'text',
        },
        {
            name: 'notes',
            title: 'Notes',
            type: 'text',
        },
        {
            name: 'products',
            title: 'Ordered Products',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'product',
                            title: 'Product',
                            type: 'reference',
                            to: [{ type: 'product' }],
                        },
                        {
                            name: 'quantity',
                            title: 'Quantity',
                            type: 'number',
                        },
                        {
                            name: 'size',
                            title: 'Size',
                            type: 'string',
                        },
                    ],
                    preview: {
                        select: {
                            title: 'product.name',
                            quantity: 'quantity',
                            size: 'size',
                        },
                        prepare(selection: any) {
                            const { title, quantity, size } = selection;
                            return {
                                title: `${title} - Qty: ${quantity} - Size: ${size || 'N/A'}`,
                            };
                        },
                    },
                },
            ],
        },
        {
            name: 'subtotal',
            title: 'Subtotal',
            type: 'number',
            readOnly: true,
        },
        {
            name: 'deliveryPrice',
            title: 'Delivery Price',
            type: 'number',
        },
        {
            name: 'totalPrice',
            title: 'Total Price',
            type: 'number',
            readOnly: true,
        },
        {
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'New', value: 'new' },
                    { title: 'Confirmed', value: 'confirmed' },
                    { title: 'Shipped', value: 'shipped' },
                ],
                layout: 'radio',
            },
            initialValue: 'new',
        },
    ],
    preview: {
        select: {
            title: 'fullName',
            subtitle: 'phone',
            status: 'status',
            total: 'totalPrice',
        },
        prepare(selection: any) {
            const { title, subtitle, status, total } = selection;
            return {
                title: `${title} (${total} DZD)`,
                subtitle: `${subtitle} - Status: ${status}`,
            };
        },
    },
};
