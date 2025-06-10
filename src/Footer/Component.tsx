import React from 'react'

export async function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-black text-white">
      <div className="container py-8 flex items-center justify-between">
        <p>© Codiara, June 2025</p>
        {/* Replace `footer-image.png` with your small image placed in `public/` */}
        <img
          alt="Footer graphic"
          className="h-4 w-auto"
          src="/footer-image.png"
        />
      </div>
    </footer>
  )
}
