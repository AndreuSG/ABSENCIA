import React from 'react'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="mt-auto border-t-4 border-primary bg-accent/10 text-foreground font-clown">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in duration-700">
        <div className="flex items-center gap-2">
          <Image
            alt="Codiara logo"
            src="/assets/img/C-codiara.jpg"
            width={32}
            height={32}
            className="rounded-full border border-gray-200 shadow-sm"
          />
          <span className="font-semibold text-lg">Codiara</span>
        </div>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Codiara. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
