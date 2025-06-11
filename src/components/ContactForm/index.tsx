'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export type FieldType = 'text' | 'email' | 'phone' | 'textarea'

export interface FieldOption {
  name: string
  type: FieldType
  label: string
  placeholder?: string
  icon?: string
  required?: boolean
}

export interface ContactFormProps {
  fields?: FieldOption[]
  submitLabel?: string
  onSubmit?: (values: Record<string, string>) => void
  className?: string
}

const defaultFields: FieldOption[] = [
  { name: 'name', type: 'text', label: 'Name', icon: 'pi pi-user', required: true },
  { name: 'email', type: 'email', label: 'Email', icon: 'pi pi-envelope', required: true },
  { name: 'message', type: 'textarea', label: 'Message', icon: 'pi pi-comment', required: true },
]

const defaultIcons: Record<FieldType, string> = {
  text: 'pi pi-user',
  email: 'pi pi-envelope',
  phone: 'pi pi-phone',
  textarea: 'pi pi-comment',
}

export const ContactForm: React.FC<ContactFormProps> = ({
  fields = defaultFields,
  submitLabel = 'Send',
  onSubmit,
  className,
}) => {
  const initialState = React.useMemo(() => {
    return fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.name] = ''
      return acc
    }, {})
  }, [fields])

  const [values, setValues] = React.useState<Record<string, string>>(initialState)

  const handleChange =
    (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [name]: e.target.value }))
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) onSubmit(values)
  }

  return (
    <form className={cn('space-y-4', className)} onSubmit={handleSubmit}>
      {fields.map((field) => {
        const id = `contact-${field.name}`
        const iconClass = field.icon || defaultIcons[field.type]
        const InputComponent = field.type === 'textarea' ? Textarea : Input
        const typeAttr = field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : 'text'

        return (
          <div key={field.name} className="space-y-1">
            <Label htmlFor={id} className="flex items-center gap-2">
              {iconClass && <i className={cn(iconClass, 'text-muted-foreground')} />}
              {field.label}
              {field.required && <span className="text-destructive">*</span>}
            </Label>
            <InputComponent
              id={id}
              onChange={handleChange(field.name)}
              placeholder={field.placeholder}
              required={field.required}
              type={field.type === 'textarea' ? undefined : typeAttr}
              value={values[field.name]}
            />
          </div>
        )
      })}
      <Button type="submit">{submitLabel}</Button>
    </form>
  )
}

export default ContactForm
