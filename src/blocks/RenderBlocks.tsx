import React from 'react'

import type { Page } from '@/payload-types'

import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { ContactFormBlock } from '@/blocks/ContactFormBlock/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeroBlock } from '@/blocks/Hero/Component'
import { ImageTextSectionBlock } from '@/blocks/ImageTextSection/Component'
import ImageGridHeroBlock from '@/blocks/ImageGridHero/Component'
import { ImgDescrCollectClient } from '@/blocks/ImgDescrCollect/Component.client'

import ImgForm from '@/blocks/ImgForm/Component.client'
import StepFlowBlock from './StepFlowBlock/Component'
import SpectacleCarouselBlock from '@/blocks/SpectacleCarousel/Component'
import { OrderDataClient } from '@/blocks/OrderData/Component.client'

const blockComponents = {
  content: ContentBlock,
  formBlock: FormBlock,
  contactForm: ContactFormBlock,
  mediaBlock: MediaBlock,
  hero: HeroBlock,
  imageTextSection: ImageTextSectionBlock,
  imageGridHero: ImageGridHeroBlock,
  imgForm: ImgForm,
  spectacleCarousel: SpectacleCarouselBlock,
  stepFlow: StepFlowBlock,
  imgDescrCollect: ImgDescrCollectClient,
  orderData: OrderDataClient
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <div>
      {blocks.map((block, i) => {
        const Block = blockComponents[block.blockType]
        return Block ? <Block key={i} {...block} /> : null
      })}
    </div>
  )
}
