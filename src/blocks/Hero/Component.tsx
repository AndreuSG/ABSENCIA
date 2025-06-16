// src/blocks/Hero/Component.tsx
import React from 'react'
import { RenderHero } from '@/heros/RenderHero'
import type { HeroBlock as HeroBlockProps } from '@/payload-types'

type Props = HeroBlockProps & { className?: string }

export const HeroBlock: React.FC<Props> = ({ className, hero }) => {
  if (!hero) return null
  return (
    <div className={`mb-16 ${className}`}>
      <RenderHero {...hero} />
    </div>
  )
}
