import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({
  children,
  richText,
  title,
  subtitle,
}) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">
        {title && <h1 className="mb-4 text-3xl md:text-5xl">{title}</h1>}
        {subtitle && <p className="mb-4 text-lg md:text-xl">{subtitle}</p>}
        {children || (richText && <RichText data={richText} enableGutter={false} />)}
      </div>
    </div>
  )
}
