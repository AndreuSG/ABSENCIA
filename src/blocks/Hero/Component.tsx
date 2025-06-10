import React from 'react'
import { RenderHero } from '@/heros/RenderHero'
import type { HeroBlock as HeroBlockProps } from '@/payload-types'

type Props = HeroBlockProps & {
  className?: string
}

export const HeroBlock: React.FC<Props> = (props) => {
  const { className, ...heroProps } = props
  return (
    <div className={className}>
      <RenderHero {...heroProps} />
    </div>
  )
}
