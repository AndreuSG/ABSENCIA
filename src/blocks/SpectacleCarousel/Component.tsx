'use client'

import React, { useState } from 'react'
import { Media } from '@/components/Media'
import type { SpectacleCarouselBlock as BlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const SpectacleCarouselBlock: React.FC<BlockProps & { className?: string }> = ({
  title,
  slides,
  className,
}) => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  if (!slides?.length) return null

  const prevIdx = (current - 1 + slides.length) % slides.length
  const nextIdx = (current + 1) % slides.length

  const goPrev = () => {
    setDirection('left')
    setCurrent(prevIdx)
  }

  const goNext = () => {
    setDirection('right')
    setCurrent(nextIdx)
  }

  return (
    <section className={cn('my-16 px-4', className)}>
      {title && <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>}

      <div className="relative max-w-4xl mx-auto flex items-center">
        {/* ← Anterior */}
        <button
          onClick={goPrev}
          aria-label="Anterior"
          className="z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Carrusel */}
        <div className="flex-1 px-4 flex justify-center items-center overflow-hidden">
          <div className="relative w-full h-[320px] flex items-center justify-center">
            {[prevIdx, current, nextIdx].map((idx, pos) => {
              const isCenter = pos === 1
              // Animación según dirección
              let translateClass = ''
              if (direction === 'right') {
                if (pos === 0) translateClass = '-translate-x-[60%]'
                if (pos === 1) translateClass = 'translate-x-0'
                if (pos === 2) translateClass = 'translate-x-[60%]'
              } else {
                if (pos === 0) translateClass = 'translate-x-[60%]'
                if (pos === 1) translateClass = 'translate-x-0'
                if (pos === 2) translateClass = '-translate-x-[60%]'
              }
              return (
                <div
                  key={idx}
                  className={cn(
                    'absolute w-[400px] h-full rounded-xl overflow-hidden shadow-xl group transition-transform duration-500',
                    isCenter ? 'scale-100 z-20' : 'scale-75 opacity-40 z-0 blur-[2px]',
                    translateClass,
                  )}
                >
                  <Media
                    resource={slides[idx]?.image}
                    imgClassName="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  {isCenter && slides[idx]?.description && (
                    <div className="absolute inset-0 bg-black/40 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {slides[idx].description}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Siguiente → */}
        <button
          onClick={goNext}
          aria-label="Siguiente"
          className="z-20 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Paginación */}
      <div className="flex justify-center space-x-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 'right' : 'left')
              setCurrent(i)
            }}
            className={cn(
              'w-3 h-3 rounded-full transition',
              i === current ? 'bg-gray-800' : 'bg-gray-400',
            )}
            aria-label={`Ir a la imagen ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default SpectacleCarouselBlock
