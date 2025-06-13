'use client'

import React from 'react'
import { HeaderNav } from './Nav/index'

export const Header: React.FC = () => {
  return (
    <header className="w-full z-10">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <HeaderNav />
      </div>
    </header>
  )
}
