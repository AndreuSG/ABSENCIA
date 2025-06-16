import React from 'react'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'

export const MobileNav: React.FC<{ items: HeaderType['navItems']; setOpen: (open: boolean) => void }> = ({
  items,
  setOpen,
}) => {
  return (
    <div className="md:hidden bg-pop-yellow text-pop-red font-bangers text-xl tracking-wider px-6 py-4 shadow-lg">
      <nav className="flex flex-col gap-4">
        {items!.map((item) => {
          if (item.linkType === 'text') {
            // Modo "text"
            const link = item.link
            let href = '#'

            if (link?.link.type === 'custom') {
              href = link?.link.url || '#'
            } else if (link?.link.type === 'reference' && link.link.reference?.value) {
              if (typeof link.link.reference.value === 'number') {
                href = `/pages/${link.link.reference.value}`
              } else if (typeof link.link.reference.value === 'object' && 'slug' in link.link.reference.value) {
                link.link.reference.value.slug === 'home' ? (href = `/`) : (href = `/${link.link.reference.value.slug}`)
              }
            }

            return (
              <Link
                key={item.id || link?.link.label}
                href={href}
                target={link?.link.newTab ? '_blank' : '_self'}
                className="hover:text-pop-magenta transition-colors"
                onClick={() => setOpen(false)}
              >
                {link?.link.label}
              </Link>
            )
          } else if (item.linkType === 'dropdown') {
            // Modo "dropdown"
            return (
              <div key={item.id || item.dropdown?.label} className="flex flex-col gap-2">
                <span className="font-bold">{item.dropdown?.label}</span>
                <ul className="flex flex-col gap-2 pl-4">
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
                          className="hover:text-pop-magenta transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          {dropdownLink.link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          }

          return null
        })}
      </nav>
    </div>
  )
}
