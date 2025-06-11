import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { ContactFormBlock } from '@/blocks/ContactFormBlock/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { HeroBlock } from '@/blocks/Hero/Component'
import { ImageTextSectionBlock } from '@/blocks/ImageTextSection/Component'
import ImageGridHeroBlock from '@/blocks/ImageGridHero/Component'

const blockComponents = {
  content: ContentBlock,
  formBlock: FormBlock,
  contactForm: ContactFormBlock,
  mediaBlock: MediaBlock,
  hero: HeroBlock,
  imageTextSection: ImageTextSectionBlock,
  imageGridHero: ImageGridHeroBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
