'use client'

import React from 'react'
import type { ImageTextSectionBlock as BlockProps } from '@/payload-types'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import Link from 'next/link'

export const ImageTextSectionBlock: React.FC<BlockProps> = ({
  title,
  media,
  content,
  reverse,
  buttonLabel,
  buttonLink,
}) => {
  return (
    <section className="container font-poppins py-16 mb-16">
      <div className="flex flex-col md:flex-row items-center gap-12 animate-fade-in-up">
        {/* Imagen */}
        <div className={cn('md:w-1/2', { 'md:order-last': reverse })}>
          <div className="w-full aspect-[4/3] min-h-[200px] md:min-h-0 relative rounded-xl overflow-hidden shadow-xl transform transition-transform duration-500 hover:scale-105">
            <Media resource={media} fill imgClassName="object-cover object-center" />
          </div>
        </div>

        {/* Texto + Botón */}
        <div className="md:w-1/2 text-center md:text-left">
          {title && (
            <h3 className="text-3xl font-bold text-[#c63a77] mb-6 leading-tight">{title}</h3>
          )}
          {content && <RichText data={content} enableGutter={false} />}

          {buttonLabel && buttonLink && (
            <div className="mt-6">
              <Link
                href={buttonLink}
                className="inline-block bg-[#c63a77] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#a02c5e] transition-colors"
              >
                {buttonLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
