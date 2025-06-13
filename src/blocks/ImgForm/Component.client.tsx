'use client'

import React, { JSX, useEffect, useRef, useState } from 'react'
import { ImgFormPresentational } from './Component'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { usePayloadForm } from './hoooks/usePayloadForm'
import { useFormFeedback } from './hoooks/useFormFeedback'
import { TextField } from './fields/TextField'
import { EmailField } from './fields/EmailField'
import { TextareaField } from './fields/TextareaField'
import { CheckboxField } from './fields/CheckboxField'
import { CountryField } from './fields/CountryField'
import { NumberField } from './fields/NumberField'
import { SelectField } from './fields/SelectField'
import { countryOptions } from '@/blocks/Form/Country/options'

type Media = {
  url: string
  alt: string
}

export type ImgFormProps = {
  sectionId?: string
  title?: string
  description?: string
  image: Media
  form: FormType
  fieldIcons?: [{ icon: string }]
}

export const ImgForm: React.FC<ImgFormProps> = ({
  sectionId,
  title,
  description,
  image,
  form,
  fieldIcons,
}) => {
  const [show, setShow] = useState<boolean>(false)
  const [formHeight, setFormHeight] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const formularioRef = useRef<HTMLDivElement>(null)

  // Observa si el contenedor está en la vista
  useEffect(() => {
    const ref = containerRef.current
    if (!ref) return

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry!.isIntersecting) {
          setShow(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(ref)
    return () => observer.disconnect()
  }, [])

  // Ajusta la altura de la imagen según la altura del formulario
  useEffect(() => {
    const updateHeight = () => {
      if (formularioRef.current) {
        setFormHeight(formularioRef.current.offsetHeight)
      }
    }

    // Actualiza la altura al cargar y al redimensionar la ventana
    updateHeight()
    window.addEventListener('resize', updateHeight)

    return () => {
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  const { isLoading, hasSubmited, error, inputErrors, handleSubmit } =
    usePayloadForm(form)
  const { isButtonDisabled, wrapSubmitHandler } = useFormFeedback({
    isLoading,
    hasSubmited,
    error,
    inputErrors,
    containerRef,
  })

  const fieldRenderers: Record<string, (props: any) => JSX.Element> = {
    text: TextField,
    email: EmailField,
    textarea: TextareaField,
    checkbox: CheckboxField,
    country: CountryField,
    number: NumberField,
    select: SelectField,
  }

  const formFields =
    form.fields?.map((field) => {
      if (field.blockType === 'country') {
        return { ...field, options: countryOptions }
      }
      if (['select', 'state'].includes(field.blockType)) {
        return { ...field, options: (field as any).options || [] }
      }
      return field
    }) || []

  return (
    <ImgFormPresentational
      sectionId={sectionId}
      title={title}
      description={description}
      imageUrl1={image.url}
      imageAltText1={image.alt}
      show={show}
      containerRef={containerRef}
      formularioRef={formularioRef}
      formHeight={formHeight}
      isLoading={isLoading}
      inputErrors={inputErrors}
      formFields={formFields}
      fieldIcons={fieldIcons}
      handleSubmit={wrapSubmitHandler(handleSubmit)}
      fieldRenderers={fieldRenderers}
      isButtonDisabled={isButtonDisabled}
    />
  )
}

export default ImgForm
