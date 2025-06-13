import clsx from 'clsx'
import React from 'react'
import Image from 'next/image'

interface Props {
  className?: string
}

export const Logo = ({ className }: Props) => {
  return (
    <Image
      src="/assets/img/logo-sin-transparencia.jpg"
      alt="Absencia logo"
      width={200}
      height={60}
      className={clsx(className)}
      priority
    />
  )
}
