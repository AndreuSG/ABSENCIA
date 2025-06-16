import React from 'react'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'

export const DesktopNav: React.FC<{ items: HeaderType['navItems'] }> = ({ items }) => {
  return (
    <nav className="hidden md:flex gap-8 items-center font-bangers text-pop-red text-xl tracking-wider">
      {items!.map((item) => {
        if (item.linkType === 'text') {
          // Modo "text"
          const link = item.link!.link
          let href = '#'
          if (link!.type === 'custom') {
            href = link.url || '#'
          } else if (link.type === 'reference' && link.reference?.value) {
            if (typeof link.reference.value === 'number') {
              href = `/pages/${link.reference.value}`
            } else if (typeof link.reference.value === 'object' && 'slug' in link.reference.value) {
              link.reference.value.slug === 'home' ? (href = `/`) : (href = `/${link.reference.value.slug}`)
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
        } else if (item.linkType === 'dropdown') {
          return (
            <div
              key={item.id || item.dropdown?.label}
              className="relative group"
              style={{ overflow: 'visible' }} // Aseguramos que el contenido no se recorte
            >
              <button className="relative group-hover:text-pop-magenta transition-colors duration-300">
                {item.dropdown?.label}
              </button>
              {/* Contenedor que ajusta el tamaño */}
              <div className="relative">
                {/* Dropdown que no afecta al posicionamiento */}
                <div className="absolute left-0 top-full hidden group-hover:flex bg-white shadow-lg rounded-md z-10">
                  <ul className="flex flex-col gap-2 p-4">
                    {item.dropdown?.dropdownLinks.map((dropdownLink) => {
                      let href = '#'

                      if (dropdownLink.link.type === 'custom') {
                        href = dropdownLink.link.url || '#'
                      } else if (dropdownLink.link.type === 'reference' && dropdownLink.link.reference?.value) {
                        if (typeof dropdownLink.link.reference.value === 'number') {
                          href = `/pages/${dropdownLink.link.reference.value}`
                        } else if (
                          typeof dropdownLink.link.reference.value === 'object' &&
                          'slug' in dropdownLink.link.reference.value
                        ) {
                          dropdownLink.link.reference.value.slug === 'home'
                            ? (href = `/`)
                            : (href = `/${dropdownLink.link.reference.value.slug}`)
                        }
                      }

                      return (
                        <li key={dropdownLink.id || dropdownLink.link.label}>
                          <Link
                            href={href}
                            target={dropdownLink.link.newTab ? '_blank' : '_self'}
                            className="block px-4 py-2 hover:bg-pop-magenta hover:text-white transition-colors"
                          >
                            {dropdownLink.link.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )
        }

        return null
      })}
    </nav>
  )
}
