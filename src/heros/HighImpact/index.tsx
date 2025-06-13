'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import { Media } from '@/components/Media'

type HighImpactHeroProps = {
  desktopLarge?: any
  desktopMedium?: any
  mobile?: any
}

export const HighImpactHero: React.FC<HighImpactHeroProps> = ({
  desktopLarge,
  desktopMedium,
  mobile,
}) => {
  return (
    <section className="relative w-full min-h-[900px] overflow-hidden" data-theme="dark">
      {/* Imatge per a mòbil */}
      {mobile && (
        <Media
          resource={mobile}
          fill
          priority
          className="block md:hidden -z-10"
          imgClassName="object-cover object-center"
        />
      )}

      {/* Imatge per a ordinador mitjà */}
      {desktopMedium && (
        <Media
          resource={desktopMedium}
          fill
          priority
          className="hidden md:block lg:hidden -z-10"
          imgClassName="object-cover object-center"
        />
      )}

      {/* Imatge per a ordinador gran */}
      {desktopLarge && (
        <Media
          resource={desktopLarge}
          fill
          priority
          className="hidden lg:block -z-10"
          imgClassName="object-cover object-center"
        />
      )}
    </section>
  )
}
