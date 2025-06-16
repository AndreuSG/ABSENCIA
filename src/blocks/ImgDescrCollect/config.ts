import type { Block } from 'payload'
// Configuración por defecto
export const ImgDescrCollect: Block = {
  slug: 'imgDescrCollect',
  interfaceName: 'Imagenes con Descripción',
  fields: [
    {
      name: 'sectionId',
      type: 'text',
      label: 'Section ID',
      required: true,
    },
    {
      name: "mediaCollection",
      label: "Lista de Imágenes con Descripción",
      type: "array",
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
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
