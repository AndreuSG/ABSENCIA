import Image from 'next/image'
import React from 'react'

export const metadata = {
  title: 'Inici',
}

export default function Home() {
  return (
    <main>
      <div className="relative h-[70vh] w-full">
        <Image
          src="/assets/img/C-codiara.jpg"
          alt="Hero"
          fill
          priority
          className="object-cover"
        />
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,176C672,171,768,149,864,138.7C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>
    </main>
  )
}
