'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const IMAGES = ['/assets/img/balloon1.png', '/assets/img/balloon2.png', '/assets/img/balloon3.png']

interface Balloon {
  id: number
  left: number
  img: string
  size: number
  duration: number
}

let idCounter = 0

/* configúralo a tu gusto */
const BALLOONS_PER_BATCH = 12 // cuántos globos por oleada
const COOLDOWN_MS = 7000 // espera 7 s antes de otra oleada

export const Balloons: React.FC = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const lastBatch = useRef(0) // timestamp de última oleada

  /* -------- helper que crea N globos -------- */
  const spawnBatch = (n: number) =>
    setBalloons((prev) => [
      ...prev,
      ...Array.from({ length: n }).map(() => ({
        id: idCounter++,
        left: Math.random() * 85 + 5, // 5‒90 %
        img: IMAGES[Math.floor(Math.random() * IMAGES.length)],
        size: 60 + Math.random() * 40, // 60‒100 px
        duration: 6 + Math.random() * 4, // 6‒10 s
      })),
    ])

  /* -------- listener -------- */
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()

      /* ¿estamos en cooldown? */
      if (now - lastBatch.current < COOLDOWN_MS) return

      /* lanza oleada y actualiza timestamp */
      spawnBatch(BALLOONS_PER_BATCH)
      lastBatch.current = now
    }

    /* pequeño throttle: máx 1 check cada 200 ms */
    let ticking = false
    const throttled = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttled)
    return () => window.removeEventListener('scroll', throttled)
  }, [])

  /* -------- render -------- */
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {balloons.map(({ id, img, left, size, duration }) => (
        <Image
          key={id}
          src={img}
          alt=""
          className="balloon-float absolute bottom-0 pointer-events-none"
          style={{
            left: `${left}%`,
            width: size,
            height: size,
            animationDuration: `${duration}s`,
          }}
          width={size}
          height={size}
        />
      ))}
    </div>
  )
}

export default Balloons
