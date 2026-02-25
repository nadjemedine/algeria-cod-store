import { type SchemaTypeDefinition } from 'sanity'

import { productSchema } from './product'
import { deliveryPricesSchema } from './deliveryPrice'
import { orderSchema } from './order'
import { menuSchema } from './menu'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        productSchema,
        deliveryPricesSchema,
        orderSchema,
        menuSchema,
    ],
}
