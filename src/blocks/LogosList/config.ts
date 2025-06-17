import type { Block } from 'payload'

export const LogosList: Block = {
  slug: 'logosList',
  labels: {
    singular: 'Lista de logos',
    plural: 'Listas de logos',
  },
  fields: [
    {
      name: 'logos',
      label: 'Logos',
      type: 'array',
      labels: {
        singular: 'logo',
        plural: 'logos',
      },
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'imagen',
          label: 'Imagen',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
