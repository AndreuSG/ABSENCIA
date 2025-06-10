import React from 'react'
import type { ImageTextSectionBlock as BlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const ImageTextSectionBlock: React.FC<BlockProps> = ({ media, content, reverse }) => {
  return (
    <div className="container">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className={cn('md:w-1/2', { 'md:order-last': reverse })}>
          <Media resource={media} />
        </div>
        <div className="md:w-1/2">
          {content && <RichText data={content} enableGutter={false} />}
        </div>
      </div>
    </div>
  )
}
