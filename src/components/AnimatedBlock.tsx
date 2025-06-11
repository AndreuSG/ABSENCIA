'use client'
import React from 'react'
import { cn } from '@/utilities/ui'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export const AnimatedBlock: React.FC<{
  className?: string
  children: React.ReactNode
}> = ({ className, children }) => {
  const { ref, inView } = useScrollReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      data-in-view={inView}
      className={cn(
        'opacity-0 data-[in-view=true]:opacity-100 data-[in-view=true]:animate-in data-[in-view=true]:fade-in data-[in-view=true]:slide-in-from-bottom-6',
        className,
      )}
    >
      {children}
    </div>
  )
}
