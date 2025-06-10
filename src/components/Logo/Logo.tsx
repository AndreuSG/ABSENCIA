import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
}

export const Logo = ({ className }: Props) => {
  return <span className={clsx('text-xl font-bold', className)}>ABSENCIA</span>
}
