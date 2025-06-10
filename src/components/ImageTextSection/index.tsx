import React from 'react'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export interface ImageTextSectionProps {
  media: Parameters<typeof Media>[0]['resource']
  children: React.ReactNode
  reverse?: boolean
}

export const ImageTextSection: React.FC<ImageTextSectionProps> = ({ media, children, reverse = false }) => (
  <div className="flex flex-col md:flex-row gap-8 items-center">
    <div className={cn('md:w-1/2', { 'md:order-last': reverse })}>
      <Media resource={media} />
    </div>
    <div className="md:w-1/2">
      {children}
    </div>
  </div>
)

export default ImageTextSection
