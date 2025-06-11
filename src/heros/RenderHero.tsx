import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
}

// Define the expected props type for RenderHero
type HeroProps = {
  type?: 'highImpact' | 'mediumImpact' | 'lowImpact' | 'none'
  [key: string]: any
}

export const RenderHero: React.FC<HeroProps> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  type HeroType = keyof typeof heroes

  if (!type || !(type in heroes)) return null

  const HeroToRender = heroes[type as HeroType]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
