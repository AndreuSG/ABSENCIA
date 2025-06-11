import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  interfaceName: 'ContactFormBlock',
  fields: [
    {
      name: 'fields',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          label: 'Type',
          type: 'select',
          defaultValue: 'text',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'Textarea', value: 'textarea' },
          ],
        },
        {
          name: 'placeholder',
          type: 'text',
          label: 'Placeholder',
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Icon class',
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Required',
        },
      ],
    },
    {
      name: 'submitLabel',
      type: 'text',
      defaultValue: 'Send',
      required: true,
    },
  ],
  labels: {
    singular: 'Contact Form',
    plural: 'Contact Forms',
  },
}

