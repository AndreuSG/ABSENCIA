'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Media } from '@/components/Media'

export interface ImageGridHeroProps {
  title: string
  subtitle?: string
  description?: string
  images: Array<{
    resource: any // Usa el tipo adecuado según tu modelo de media
    className?: string
  }>
  buttonLabel?: string
  buttonLink?: string
  // También puedes mantener los linkGroup dinámicos si lo usas:
  primaryButton?: React.ReactNode
  secondaryButton?: React.ReactNode
  className?: string
}

export const ImageGridHero: React.FC<ImageGridHeroProps> = ({
  title,
  subtitle,
  description,
  images,
  buttonLabel,
  buttonLink,
  primaryButton,
  secondaryButton,
}) => (
  <section className="w-full py-24 md:py-32 bg-[#d9f5e3] font-poppins relative overflow-hidden">
    <svg
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      className="absolute top-0 left-0 w-full h-[60px] z-10"
    >
      <path fill="white" d="M0,30 Q180,0 360,30 T720,30 T1080,30 T1440,30 L1440,0 L0,0 Z" />
    </svg>
    <div className="container max-w-[90vw] flex flex-col md:flex-row items-center gap-12">
      <div className="flex-1">
        {subtitle && <div className="mb-2 text-sm font-medium">{subtitle}</div>}
        <h1 className="text-4xl font-extrabold mb-4">{title}</h1>
        {description && <p className="mb-6 text-muted-foreground">{description}</p>}
        <div className="flex gap-4">
          {primaryButton}
          {secondaryButton}
        </div>
        {buttonLabel && buttonLink && (
          <div className="mt-4">
            <Link
              href={buttonLink}
              className="inline-block bg-[#c63a77] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#a02c5e] transition-colors font-poppins"
            >
              {buttonLabel}
            </Link>
          </div>
        )}
      </div>
      <div className="flex-1 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className={`
              relative rounded-xl overflow-hidden shadow-lg group aspect-[4/3] w-full min-h-[180px]
              ${idx === 0 ? 'lg:row-span-2 lg:h-[600px]' : 'lg:h-[290px]'}
            `}
          >
            <Media
              resource={img.resource}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

export default ImageGridHero
