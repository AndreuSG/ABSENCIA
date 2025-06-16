import React from 'react'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-black bg-[#fef9c3] text-black font-clown">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in duration-700">
        <div className="flex items-center gap-2">
          <Image
            alt="Codiara logo"
            src="/assets/img/C-codiara.jpg"
            width={32}
            height={32}
            className="rounded-full border border-black shadow-sm"
          />
          <span className="font-semibold text-lg">Codiara</span>
        </div>
        <p className="text-sm text-black">
          © {new Date().getFullYear()} Codiara. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
