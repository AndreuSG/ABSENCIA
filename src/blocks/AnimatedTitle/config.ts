import { Block } from 'payload';
import { colorPickerField } from '@innovixx/payload-color-picker-field';

export const AnimatedTitleBlock: Block = {
  slug: 'animatedTitleBlock',
  labels: {
    singular: 'Título animado',
    plural: 'Títulos animados',
  },
  fields: [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      required: true,
    },
    {
      name: 'animation',
      label: 'Animación',
      type: 'select',
      defaultValue: 'swiper',
      options: [
        {
          label: 'Deslizamiento horizontal',
          value: 'swiper',
        },
      ],
    },
    {
      name: 'textColors',
      label: 'Colores del texto',
      type: 'array',
      admin: {
        position: 'sidebar',
        description: 'Elija varios colores para usar en el texto',
      },
      fields: [
        colorPickerField({
          name: 'color',
          label: 'Color',
          required: true,
        }),
      ],
    },
  ],
};

export default AnimatedTitleBlock;
