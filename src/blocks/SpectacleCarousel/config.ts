import type { Block } from 'payload'

export const SpectacleCarousel: Block = {
  slug: 'spectacleCarousel',
  interfaceName: 'SpectacleCarouselBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'slides',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
  ],
  labels: {
    singular: 'Carrusel de espect\u00e1culos',
    plural: 'Carruseles de espect\u00e1culos',
  },
}

export default SpectacleCarousel
