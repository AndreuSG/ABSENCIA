import type { Block } from 'payload'
import { hero as heroField } from '@/heros/config'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [heroField],
  labels: {
    singular: 'Hero',
    plural: 'Heros',
  },
}
