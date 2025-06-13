import { Block } from 'payload';

export const ImgFormBlock: Block = {
  slug: 'imgForm',
  labels: {
    singular: 'Formulario con imagen',
    plural: 'Formularios con imagen',
  },
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'ID de sección',
      admin: {
        description: 'ID para la sección, usado para enlazar desde el menú',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Aviso de uso de datos',
    },
    {
      name:'comment',
      type: 'text',
      label: 'Comentario',
      admin: {
        description: 'Texto que aparece encima del título con un guion',
      }
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen',
      required: true,
    },
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      label: 'Formulario',
    },
    {
      name: 'fieldIcons',
      type: 'array',
      label: 'Iconos para los campos del formulario',
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Nombre del icono FontAwesome',
          admin: {
            description: 'Ejemplo: fa-solid fa-user, etc.',
          },
        },
      ],
      admin: {
        description: 'Añade un icono por cada campo del formulario, en el mismo orden.',
      },
    }
  ],
};

export default ImgFormBlock;
