import createImageUrlBuilder from '@sanity/image-url'
import { dataset, projectId } from '../env'

const imageBuilder = createImageUrlBuilder({
    projectId: projectId || '',
    dataset: dataset || '',
})

export const urlForImage = (source: any) => {
    if (!source || !source.asset) return undefined;
    return imageBuilder?.image(source)
}

/**
 * Returns an optimized image URL for product/group images.
 * width=800, height=800, fit=crop, auto=format, quality=80
 */
export function productImageUrl(source: any, width = 800, height = 800): string | undefined {
    if (!source || !source.asset) return undefined;
    return imageBuilder
        .image(source)
        .width(width)
        .height(height)
        .fit('crop')
        .auto('format')
        .quality(80)
        .url();
}
