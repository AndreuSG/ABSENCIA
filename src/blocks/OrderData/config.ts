import type { Block } from 'payload';

export const OrderData: Block = {
  slug: 'orderData',
  labels: {
    singular: 'Datos en una lista ordenada',
    plural: 'Datos en unas listas ordenadas',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título de la Sección',
      required: true,
    },
    {
      name: 'media',
      type: 'upload',
      label: 'Imagen de la Sección',
      relationTo: 'media',
    },
    {
      name: 'imagePositionVertical',
      type: 'radio',
      label: 'Posición vertical de la imagen',
      options: [
        { label: 'Arriba', value: 'start' },
        { label: 'Centro', value: 'center' },
        { label: 'Abajo', value: 'end' },
      ],
      defaultValue: 'center',
    },
    {
      name: 'imagePositionHorizontal',
      type: 'radio',
      label: 'Posición horizontal de la imagen',
      options: [
        { label: 'Izquierda', value: 'start' },
        { label: 'Centro', value: 'center' },
        { label: 'Derecha', value: 'end' },
      ],
      defaultValue: 'end',
    },
    {
      name: "dataCollection",
      label: "Lista de datos",
      type: "array",
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'text',
        }
      ]
    },
  ],
};
