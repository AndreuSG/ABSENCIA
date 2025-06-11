import React from 'react'
import { ContactForm } from '@/components/ContactForm'

// Minimal props definition to avoid depending on generated types
export interface BlockProps {
  fields: Parameters<typeof ContactForm>[0]['fields']
  submitLabel?: string
}

export const ContactFormBlock: React.FC<BlockProps> = ({ fields, submitLabel }) => {
  return (
    <div className="container">
      <ContactForm fields={fields} submitLabel={submitLabel} />
    </div>
  )
}

