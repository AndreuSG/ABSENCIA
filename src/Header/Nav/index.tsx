'use client'

import React from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  { href: '/', label: 'Inici' },
  { href: '/qui-soc', label: 'Qui soc?' },
  { href: '/serveis', label: 'Serveis' },
  { href: '/productes', label: 'Productes' },
  { href: '/contacte', label: 'Contacte' },
]

export const HeaderNav: React.FC = () => {
  return (
    <nav className="flex gap-4 items-center font-clown">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="transition-transform hover:-translate-y-1 hover:text-primary"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
