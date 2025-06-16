'use client'

import React from 'react'

export interface StepFlowBlockProps {
  title?: string
  steps: Array<{
    title: string
    description: string
  }>
}

export const StepFlowBlock: React.FC<StepFlowBlockProps> = ({ title, steps }) => {
  if (steps.length < 3 || steps.length > 6) return null

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16 font-poppins mt-32">
      {title && <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>}

      {/*  ➜  fila horizontal en desktop, columna en móvil  */}
      <div className="relative flex flex-col md:flex-row md:justify-between md:items-start">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            {/* Bolita */}
            <div className="relative flex flex-col items-center text-center mb-12 md:mb-0 md:flex-1 z-10">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#c63a77] text-white text-lg font-bold mb-4">
                {idx + 1}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-500 max-w-xs">{step.description}</p>
            </div>
            {/* Línea (excepto después de la última bolita) */}
            {idx < steps.length - 1 && (
              <div className="hidden md:flex items-center mt-6 md:mb-0">
                <div className="w-32 h-px border-t-2 border-dashed border-gray-400 mx-2"></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

export default StepFlowBlock
