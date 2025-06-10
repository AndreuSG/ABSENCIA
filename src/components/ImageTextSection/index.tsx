import React from 'react'
import { Media } from '@/components/Media'
import { cn } from '@/utilities/ui'

export interface ImageTextSectionProps {
  media: Parameters<typeof Media>[0]['resource']
  children: React.ReactNode
  /** Optional section title */
  title?: string
  /** Reverse the order of image and text */
  reverse?: boolean
}

export const ImageTextSection: React.FC<ImageTextSectionProps> = ({
  media,
  children,
  title,
  reverse = false,
}) => (
  <div className="flex flex-col md:flex-row gap-8 items-center">
    <div className={cn('md:w-1/2', { 'md:order-last': reverse })}>
      <Media resource={media} />
    </div>
    <div className="md:w-1/2">
      {title && <h3 className="text-2xl font-semibold mb-4">{title}</h3>}
      {children}
    </div>
  </div>
)

export const ImageTextSectionReversed: React.FC<Omit<ImageTextSectionProps, 'reverse'>> = (
  props,
) => <ImageTextSection {...props} reverse />

export default ImageTextSection
