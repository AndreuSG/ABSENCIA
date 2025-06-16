import type { Block } from 'payload'

export const StepFlowImageBlock: Block = {
  slug: 'stepFlowImage',
  interfaceName: 'StepFlowImageBlock',
  fields: [
    {
      name: 'title',
      label: 'Título principal',
      type: 'text',
      required: false,
    },
    {
      name: 'steps',
      label: 'Pasos',
      type: 'array',
      minRows: 3,
      maxRows: 3,
      required: true,
      fields: [
        {
          name: 'title',
          label: 'Título del paso',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Descripción',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      label: 'Imagen',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
  labels: {
    singular: 'Step Flow con Imagen',
    plural: 'Step Flows con Imagen',
  },
}
