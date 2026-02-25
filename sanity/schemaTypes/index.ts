import { type SchemaTypeDefinition } from 'sanity'

import { productSchema } from './product'
import { groupSchema } from './group'
import { deliveryPricesSchema } from './deliveryPrice'
import { orderSchema } from './order'
import { menuSchema } from './menu'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        productSchema,
        groupSchema,
        deliveryPricesSchema,
        orderSchema,
        menuSchema,
    ],
}
