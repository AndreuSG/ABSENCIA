'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import type { Header as HeaderType } from '@/payload-types'

export interface HeaderNavProps {
  navItems: HeaderType
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ navItems }) => {
  const [open, setOpen] = useState(false)

  const items = navItems.navItems || []

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Logo className="w-24" />

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8 items-center font-bangers text-pop-red text-xl tracking-wider">
          {items.map((item) => {
            const link = item.link
            let href = '#'

            if (link.type === 'custom') {
              href = link.url || '#'
            } else if (link.type === 'reference' && link.reference?.value) {
              if (typeof link.reference.value === 'number') {
                href = `/pages/${link.reference.value}`
              } else if (typeof link.reference.value === 'object' && 'slug' in link.reference.value) {
                link.reference.value.slug === 'home'? href = `/`: href = `/${link.reference.value.slug}`
              }
            }

            return (
              <Link
                key={item.id || link.label}
                href={href}
                target={link.newTab ? '_blank' : '_self'}
                className="relative group hover:-translate-y-1 transition-transform"
              >
                <span className="group-hover:text-pop-magenta transition-colors duration-300">
                  {link.label}
                </span>
                <span className="block h-1 w-0 bg-pop-magenta group-hover:w-full transition-all duration-300"></span>
              </Link>
            )
          })}
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
            {items.map((item) => {
              const link = item.link
              let href = '#'

              if (link.type === 'custom') {
                href = link.url || '#'
              } else if (link.type === 'reference' && link.reference?.value) {
                if (typeof link.reference.value === 'number') {
                  href = `/${link.reference.value}`
                } else if (typeof link.reference.value === 'object' && 'slug' in link.reference.value) {
                  link.reference.value.slug === 'home'? href = `/`: href = `/${link.reference.value.slug}`
                }
              }

              return (
                <Link
                  key={item.id || link.label}
                  href={href}
                  target={link.newTab ? '_blank' : '_self'}
                  className="hover:text-pop-magenta transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </div>
      )}
    </header>
  )
}
