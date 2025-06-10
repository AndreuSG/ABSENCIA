'use client'

import React from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  { href: '/inici', label: 'Inici' },
  { href: '/qui-soc', label: 'Qui soc?' },
  { href: '/serveis', label: 'Serveis' },
  { href: '/productes', label: 'Productes' },
  { href: '/contacte', label: 'Contacte' },
]

export const HeaderNav: React.FC = () => {
  return (
    <nav className="flex gap-3 items-center">
      {NAV_ITEMS.map((item) => (
        <Link key={item.href} href={item.href} className="hover:underline">
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
