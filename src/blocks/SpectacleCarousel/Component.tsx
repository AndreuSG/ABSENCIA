'use client'

import React from 'react'
import { Media } from '@/components/Media'
import type { SpectacleCarouselBlock as BlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const SpectacleCarouselBlock: React.FC<BlockProps & { className?: string }> = ({ title, slides, className }) => {
  if (!slides || slides.length === 0) return null

  return (
    <section className={cn('my-16', className)}>
      {title && <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>}
      <div className="overflow-x-auto">
        <div className="flex gap-4">
          {slides.map((slide, idx) => (
            <div key={idx} className="min-w-[250px] flex-shrink-0 text-center">
              <div className="w-full aspect-video relative mb-4 rounded-lg overflow-hidden">
                <Media resource={slide.image} fill imgClassName="object-cover" />
              </div>
              {slide.description && <p className="text-sm text-muted-foreground">{slide.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SpectacleCarouselBlock
