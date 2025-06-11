'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type HighImpactHeroProps = {
  links?: { link: any }[]
  media?: any
  richText?: any
  title?: string
  subtitle?: string
}

export const HighImpactHero: React.FC<HighImpactHeroProps> = ({
  links,
  media,
  richText,
  title,
  subtitle,
}) => {
  /* ---------- header en modo dark ---------- */
  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => setHeaderTheme('dark'), [setHeaderTheme])

  /* ---------- HERO ---------- */
  return (
    <section
      className="relative isolate w-full min-h-[70vh] flex flex-col justify-center pt-24 pb-28 text-white overflow-hidden"
      /* pt-24: empuja el contenido por debajo del header (≈96 px)               *
       * pb-28: deja aire con el bloque siguiente                                */
      data-theme="dark"
    >
      {/* ----- Imagen de fondo ----- */}
      {media && typeof media === 'object' && (
        <Media
          resource={media}
          fill /* ocupa todo el contenedor */
          priority
          imgClassName="object-cover object-center"
          className="-z-10"
        />
      )}

      {/* ----- Contenido centrado ----- */}
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {title && <h1 className="mb-4 text-4xl md:text-5xl font-bold tracking-tight">{title}</h1>}

        {subtitle && <p className="mb-4 text-lg md:text-xl text-gray-200">{subtitle}</p>}

        {richText && (
          <RichText
            data={richText}
            enableGutter={false}
            className="mb-8 prose prose-invert mx-auto"
          />
        )}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-4">
            {links.map(({ link }, i) => (
              <li key={i}>
                <CMSLink {...link} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ----- Wave bottom separator ----- */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full text-white"
      >
        <path
          fill="currentColor"
          d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,176C672,171,768,149,864,138.7C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L0,320Z"
        />
      </svg>
    </section>
  )
}
