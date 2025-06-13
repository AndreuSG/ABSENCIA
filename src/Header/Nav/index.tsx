'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'

const NAV_ITEMS = [
  { href: '/', label: 'Inici' },
  { href: '/qui-soc', label: 'Qui soc?' },
  { href: '/serveis', label: 'Serveis' },
  { href: '/productes', label: 'Productes' },
  { href: '/contacte', label: 'Contacte' },
]

export const HeaderNav: React.FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Logo className="w-24" />

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center font-bangers text-pop-red text-xl tracking-wider">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative group hover:-translate-y-1 transition-transform"
            >
              <span className="group-hover:text-pop-magenta transition-colors duration-300">
                {item.label}
              </span>
              <span className="block h-1 w-0 bg-pop-magenta group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-pop-red" onClick={() => setOpen((prev) => !prev)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-pop-yellow text-pop-red font-bangers text-xl tracking-wider px-6 py-4 shadow-lg">
          <nav className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-pop-magenta transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
