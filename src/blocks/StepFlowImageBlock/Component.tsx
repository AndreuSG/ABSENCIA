'use client'

import React from 'react'
import { Media } from '@/components/Media'

export interface StepFlowImageBlockProps {
  title?: string
  steps: Array<{
    title: string
    description: string
  }>
  image: any
}

export const StepFlowImageBlock: React.FC<StepFlowImageBlockProps> = ({
  title,
  steps,
  image,
}) => {
  if (!steps || steps.length !== 3) return null

  return (
    <section className="container font-poppins py-16 mt-32">
      {title && <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>}

      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <div className="relative flex flex-col md:flex-row md:justify-between md:items-start">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="relative flex flex-col items-center text-center mb-12 md:mb-0 md:flex-1 z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#c63a77] text-white text-lg font-bold mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-500 max-w-xs">{step.description}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex items-center mt-6 md:mb-0">
                    <div className="w-32 h-px border-t-2 border-dashed border-gray-400 mx-2"></div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {image && (
          <div className="w-full md:w-1/3 aspect-[4/3] relative rounded-xl overflow-hidden shadow-xl">
            <Media resource={image} fill imgClassName="object-cover object-center" />
          </div>
        )}
      </div>
    </section>
  )
}

export default StepFlowImageBlock
