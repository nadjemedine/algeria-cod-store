import { type SchemaTypeDefinition } from 'sanity'

import { productSchema } from './product'
import { deliveryPricesSchema } from './deliveryPrice'
import { orderSchema } from './order'
import { menuSchema } from './menu'
import { groupSchema } from './group'
import { footerSchema } from './footer'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [
        productSchema,
        deliveryPricesSchema,
        orderSchema,
        menuSchema,
        groupSchema,
        footerSchema,
    ],
}
