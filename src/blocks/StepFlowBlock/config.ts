import type { Block } from 'payload'

export const StepFlowBlock: Block = {
  slug: 'stepFlow',
  interfaceName: 'StepFlowBlock',
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
      maxRows: 6,
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
  ],
  labels: {
    singular: 'Step Flow',
    plural: 'Step Flows',
  },
}
