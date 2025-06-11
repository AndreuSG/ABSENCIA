'use client'
import React, { useEffect, useState } from 'react'

const IMAGES = ['/balloons/balloon1.png', '/balloons/balloon2.png', '/balloons/balloon3.png']

let counter = 0

interface Balloon {
  id: number
  left: number
  img: string
}

export const Balloons: React.FC = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setBalloons((b) => [
        ...b,
        {
          id: counter++,
          left: Math.random() * 80,
          img: IMAGES[Math.floor(Math.random() * IMAGES.length)],
        },
      ])
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {balloons.map((balloon) => (
        <img
          key={balloon.id}
          src={balloon.img}
          className="balloon absolute bottom-0 w-12 h-12"
          style={{ left: `${balloon.left}%` }}
          onAnimationEnd={() => setBalloons((b) => b.filter((item) => item.id !== balloon.id))}
        />
      ))}
    </div>
  )
}
export default Balloons
