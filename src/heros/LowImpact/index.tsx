'use client'

import React from 'react'
// Ensure you import the correct type that includes 'hero'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
      title?: string
      subtitle?: string
      desktopLarge?: any
      desktopMedium?: any
      mobile?: any
    }
  | {
      children?: never
      richText?: any
      title?: string
      subtitle?: string
      desktopLarge?: any
      desktopMedium?: any
      mobile?: any
    }

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
  children,
  richText,
  title,
  subtitle,
  desktopLarge,
  desktopMedium,
  mobile,
}) => {
  return (
    <section className="relative mx-auto my-16 w-full max-w-5xl overflow-hidden rounded-3xl min-h-[300px] md:min-h-[400px] lg:min-h-[500px]">
      {/* Imatge Mobile */}
      {mobile && (
        <Media
          resource={mobile}
          fill
          priority
          className="block md:hidden -z-10"
          imgClassName="object-cover object-center"
        />
      )}

      {/* Imatge Desktop Medium */}
      {desktopMedium && (
        <Media
          resource={desktopMedium}
          fill
          priority
          className="hidden md:block lg:hidden -z-10"
          imgClassName="object-cover object-center"
        />
      )}

      {/* Imatge Desktop Large */}
      {desktopLarge && (
        <Media
          resource={desktopLarge}
          fill
          priority
          className="hidden lg:block -z-10"
          imgClassName="object-cover object-center"
        />
      )}

      {/* Contingut */}
      <div className="relative z-10 container px-8 py-12 text-white">
        <div className="max-w-3xl">
          {title && <h1 className="mb-4 text-3xl md:text-5xl">{title}</h1>}
          {subtitle && <p className="mb-4 text-lg md:text-xl">{subtitle}</p>}
          {children || (richText && <RichText data={richText} enableGutter={false} />)}
        </div>
      </div>
    </section>
  )
}

export default LowImpactHero
