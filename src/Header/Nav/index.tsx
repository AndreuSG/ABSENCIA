'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo/Logo'
import { DesktopNav } from './DesktopNav'
import { MobileNav } from './MobileNav'
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
        <DesktopNav items={items} />

        {/* Mobile menu button */}
        <button className="md:hidden text-pop-red" onClick={() => setOpen((prev) => !prev)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && <MobileNav items={items} setOpen={setOpen} />}
    </header>
  )
}
