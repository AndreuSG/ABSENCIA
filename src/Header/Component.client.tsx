'use client'
import type { Header } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  navItems: Header
}

export const HeaderClient: React.FC<HeaderClientProps>= ({navItems}) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <div className="container relative z-20" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-8 flex items-center justify-between animate-in fade-in duration-700">
        <Link href="/">
          <Logo />
        </Link>
        <HeaderNav navItems={navItems}/>
      </div>
    </div>
  )
}
