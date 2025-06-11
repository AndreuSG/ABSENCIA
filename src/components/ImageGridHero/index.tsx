import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'

export interface ImageGridHeroProps {
  title: string
  subtitle?: string
  description?: string
  images: Array<{
    resource: any // Usa el tipo adecuado según tu modelo de media
    className?: string
  }>
  primaryButton?: React.ReactNode
  secondaryButton?: React.ReactNode
  className?: string
}

export const ImageGridHero: React.FC<ImageGridHeroProps> = ({
  title,
  subtitle,
  description,
  images,
  primaryButton,
  secondaryButton,
  className,
}) => (
  <section className={cn('w-full py-16 bg-muted', className)}>
    <div className="container flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1">
        {subtitle && <div className="mb-2 text-sm font-medium">{subtitle}</div>}
        <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
        {description && <p className="mb-6 text-muted-foreground">{description}</p>}
        <div className="flex gap-4">
          {primaryButton}
          {secondaryButton}
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-6">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={cn(
              'rounded-xl overflow-hidden shadow-lg',
              // Puedes personalizar el tamaño de cada imagen aquí
              idx === 0 ? 'row-span-2 col-span-1' : 'row-span-1 col-span-1',
              img.className,
            )}
          >
            <Media resource={img.resource} />
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default ImageGridHero
