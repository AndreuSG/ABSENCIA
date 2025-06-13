import type { Block } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ImageTextSection: Block = {
  slug: 'imageTextSection',
  interfaceName: 'ImageTextSectionBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'reverse',
      type: 'checkbox',
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Button Label',
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link (URL)',
    },
  ],
  labels: {
    singular: 'Image Text Section',
    plural: 'Image Text Sections',
  },
}
