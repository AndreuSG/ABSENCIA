import React, { JSX } from 'react'

export type ImgFormPresentationalProps = {
  sectionId?: string
  title?: string
  description?: string
  imageUrl1?: string
  imageAltText1?: string
  show: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
  formularioRef: React.RefObject<HTMLDivElement | null>
  formHeight: number | null
  isLoading: boolean
  inputErrors: Record<string, string | null>
  formFields: any[]
  fieldIcons?: { icon: string }[]
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  fieldRenderers: Record<string, (props: any) => JSX.Element>
  isButtonDisabled: boolean
}

export const ImgFormPresentational: React.FC<ImgFormPresentationalProps> = ({
  sectionId,
  title,
  description,
  imageUrl1,
  imageAltText1 = 'Imagen de la lista',
  show,
  containerRef,
  formularioRef,
  formHeight,
  isLoading,
  inputErrors,
  formFields,
  fieldIcons,
  handleSubmit,
  fieldRenderers,
  isButtonDisabled,
}) => {
  return (
    <section
      id={sectionId}
      ref={containerRef}
      className="img-list bg-[#d9f5e3] overflow-hidden pb-32"
    >
      <div className="py-10">
        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-8 min-h-0">
          {imageUrl1 && (
            <div
              className="w-full md:w-1/2 min-w-[150px] flex justify-center items-center mb-6 md:mb-0"
              style={{ height: formHeight || 'auto' }} // Ajusta la altura de la imagen
            >
              <div className="h-full flex items-center justify-center">
                <img
                  src={imageUrl1}
                  alt={imageAltText1}
                  className="w-auto h-full object-contain transition-all"
                />
              </div>
            </div>
          )}
          <div
            id="formulario"
            ref={formularioRef}
            className="w-full md:w-4/12 flex flex-col h-full px-6 md:px-0"
          >
            {title && (
              <h2
                className={`font-semibold w-full md:w-[90%] 2xl:w-full tracking-[-0.02em] text-4xl md:text-7xl transition-opacity duration-1000 ease-[cubic-bezier(0.22,0.61,0.36,1)]
                ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                style={{
                  transitionDelay: `${400}ms`,
                  transitionProperty: 'opacity, transform',
                }}
              >
                {title}
              </h2>
            )}
            <form
              onSubmit={handleSubmit}
              className={`w-full mt-6 transition-opacity duration-1000 ease-[cubic-bezier(0.22,0.61,0.36,1)]
                  ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
              style={{
                transitionDelay: `${600}ms`,
                transitionProperty: 'opacity, transform',
              }}
            >
              {formFields?.map((field, idx) => {
                let iconName = fieldIcons?.[idx]?.icon
                const fieldName = 'name' in field ? field.name : ''
                const errorClass =
                  fieldName && inputErrors[fieldName] ? 'border-red-500' : 'border-gray-300'
                const Renderer = fieldRenderers[field.blockType]

                const extraProps: { options?: any[] } = {}
                if (field.blockType === 'country') {
                  extraProps.options = field.options
                } else if (['select', 'state'].includes(field.blockType)) {
                  extraProps.options = field.options || []
                }

                // Evitar íconos para SelectField y NumberField
                const shouldRenderIcon = !['select', 'number'].includes(field.blockType)

                // Si no se debe renderizar el ícono, busca el siguiente campo que lo permita
                if (!shouldRenderIcon && iconName) {
                  for (let i = idx + 1; i < formFields.length; i++) {
                    const nextField = formFields[i]
                    const nextFieldType = nextField.blockType
                    if (!['select', 'number'].includes(nextFieldType)) {
                      if (!fieldIcons![i]?.icon) {
                        // Solo reasignar si el siguiente campo no tiene ícono
                        fieldIcons![i] = { icon: iconName } // Asigna el ícono al siguiente campo permitido
                        iconName = undefined // Elimina el ícono del campo actual
                        break
                      }
                    }
                  }
                }

                return Renderer ? (
                  <Renderer
                    key={fieldName}
                    field={field}
                    iconName={shouldRenderIcon ? iconName : undefined} // No pasar iconName si no debe renderizarse
                    errorClass={errorClass}
                    {...extraProps}
                  />
                ) : null
              })}
              <button
                type="submit"
                disabled={isButtonDisabled}
                className="flex justify-center items-center gap-2 px-6 py-2 text-base bg-[#c63a77] hover:bg-[#a02c5e] text-white rounded-lg shadow-md mb-5 mt-6 h-14 w-full hover:-translate-y-0.5 transition-transform duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Enviando...' : 'Enviar'}
              </button>
              {description && <p className="text-gray-500 text-sm mb-4">{description}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
