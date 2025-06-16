import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        {
          name: 'linkType',
          type: 'radio',
          defaultValue: 'text',
          options: [
            {
              label: 'Text Link',
              value: 'text',
            },
            {
              label: 'Dropdown Menu',
              value: 'dropdown',
            },
          ],
          admin: {
            layout: 'horizontal',
          },
        },
        {
          name: 'link',
          label: '',
          type: 'group',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.linkType === 'text' || !siblingData?.linkType,
          },
          fields: [
            link(), // Usamos link() para el modo "text"
          ],
        },
        {
          name: 'dropdown',
          type: 'group',
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === 'dropdown',
          },
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              required: true,
            },
            {
              name: 'dropdownLinks',
              label: 'Dropdown Links',
              type: 'array',
              required: true,
              minRows: 1,
              fields: [link()], // Usamos link() para los elementos del dropdown
            },
          ],
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.navItems) {
          data.navItems = data.navItems.map((item:any) => {
            if (item.linkType === 'dropdown' && item.dropdown?.dropdownLinks) {
              item.dropdown.dropdownLinks = item.dropdown.dropdownLinks.map((link:any) => {
                if (link.type === 'reference' && link.reference?.value) {
                  // Normalizamos los datos de referencia
                  link.url = null // Aseguramos que no haya conflicto con `url`
                  link.label = link.reference.value.label || link.label
                }
                return link
              })
            }
            return item
          })
        }
        return data
      },
    ],
    afterChange: [revalidateHeader],
  },
}
