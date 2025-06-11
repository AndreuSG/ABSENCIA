import type { Block } from 'payload'
import { linkGroup } from '@/fields/linkGroup'

export const ImageGridHero: Block = {
  slug: 'imageGridHero',
  interfaceName: 'ImageGridHeroBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      required: true,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'className',
          type: 'text',
          admin: {
            description: 'Opcional: clases extra para el tamaño o estilo de la imagen',
          },
        },
      ],
    },
    linkGroup({
      appearances: ['default', 'outline'],
      overrides: {
        maxRows: 2,
      },
    }),
  ],
  labels: {
    singular: 'Image Grid Hero',
    plural: 'Image Grid Heros',
  },
}
