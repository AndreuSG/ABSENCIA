import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

export function usePayloadForm(form: FormType) {
  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmited, setHasSubmited] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [inputErrors, setInputErrors] = useState<{ [key: string]: boolean }>({})

  const onSubmit = useCallback(
    async (submissionData: Record<string, FormDataEntryValue>) => {
      setError(null)
      setIsLoading(true)
      try {
        const dataToSend = Object.entries(submissionData).map(([field, value]) => ({
          field,
          value,
        }))

        const res = await fetch('/api/form-submissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            form: form.id,
            submissionData: dataToSend,
          }),
        })
        if (!res.ok) {
          const json = await res.json()
          setError(json?.errors[0].message || 'Error al enviar el formulario')
        } else {
          setHasSubmited(true)
          setTimeout(() => setHasSubmited(false), 3000)
        }
      } catch (e: any) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    },
    [form.id]
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const errors: { [key: string]: boolean } = {}

    form.fields?.forEach((field) => {
      if ('name' in field && 'required' in field && field.required && !formData.get(field.name)) {
        errors[field.name] = true
      }
    })

    setInputErrors(errors)

    if (Object.keys(errors).length === 0) {
      const submissionData = Object.fromEntries(formData.entries())
      onSubmit(submissionData)
    }
  }

  const stringInputErrors = Object.fromEntries(
    Object.entries(inputErrors).map(([key, value]) => [
      key,
      value ? 'Campo requerido' : null,
    ])
  )

  return { isLoading, hasSubmited, error, inputErrors: stringInputErrors, onSubmit, handleSubmit }
}
