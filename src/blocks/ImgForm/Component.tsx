import React, { JSX } from 'react'

export type ImgFormPresentationalProps = {
  sectionId?: string
  title?: string
  comment?: string
  description?: string
  imageUrl1?: string
  imageAltText1?: string
  show: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
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
  comment,
  description,
  imageUrl1,
  imageAltText1 = 'Imagen de la lista',
  show,
  containerRef,
  isLoading,
  inputErrors,
  formFields,
  fieldIcons,
  handleSubmit,
  fieldRenderers,
  isButtonDisabled,
}) => {
  return (
    <section id={sectionId} ref={containerRef} className="img-list mt-8">
      <div className="py-10">
        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-8 min-h-0">
          {imageUrl1 && (
            <div className="w-full md:w-1/2 min-w-[150px] h-full flex mb-6 md:mb-0">
              <img
                src={imageUrl1}
                alt={imageAltText1}
                className="w-full h-full max-h-[300px] md:max-h-none object-cover transition-all"
              />
            </div>
          )}
          <div className="w-full md:w-4/12 flex flex-col h-full px-6 md:px-0">
            {title && <h2
              className={`font-semibold w-full md:w-[90%] 2xl:w-full tracking-[-0.02em] text-4xl md:text-7xl transition-opacity duration-1000 ease-[cubic-bezier(0.22,0.61,0.36,1)]
                ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
              style={{
                transitionDelay: `${400}ms`,
                transitionProperty: 'opacity, transform'
              }}
            >{title}</h2>}
              <form
                onSubmit={handleSubmit}
                className={`w-full mt-6 transition-opacity duration-1000 ease-[cubic-bezier(0.22,0.61,0.36,1)]
                  ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
                style={{
                  transitionDelay: `${600}ms`,
                  transitionProperty: 'opacity, transform'
                }}
              >
                {formFields?.map((field, idx) => {
                  const iconName = fieldIcons?.[idx]?.icon;
                  console.log('iconName:', iconName);
                  const fieldName = 'name' in field ? field.name : '';
                  const errorClass = fieldName && inputErrors[fieldName] ? 'border-red-500' : 'border-gray-300';
                  const Renderer = fieldRenderers[field.blockType];

                  const extraProps: { options?: any[] } = {};
                  if (field.blockType === 'country') {
                    extraProps.options = field.options;
                  } else if (['select', 'state'].includes(field.blockType)) {
                    extraProps.options = field.options || [];
                  }

                  return Renderer
                    ? (
                      <Renderer
                        key={fieldName}
                        field={field}
                        iconName={iconName}
                        errorClass={errorClass}
                        {...extraProps}
                      />
                    )
                    : null;
                })}
                <button type="submit" disabled={isButtonDisabled}
                  className="flex justify-center items-center gap-2 px-6 py-2 text-base bg-[#232323] text-white rounded-lg shadow-md mb-5 mt-6 h-14 w-full hover:-translate-y-0.5 transition-transform duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? 'Enviando...' : 'Enviar'}
                </button>
                {description && (
                  <p className="text-gray-500 text-sm mb-4">{description}</p>
                )}
              </form>
          </div>
        </div>
      </div>
    </section>
  );
};
