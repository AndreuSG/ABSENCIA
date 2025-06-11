import React from 'react'
import { ImageGridHero as ImageGridHeroComponent } from '@/components/ImageGridHero'

export const Component = (props: any) => {
  // Adaptar los datos del CMS a las props del componente visual
  return (
    <ImageGridHeroComponent
      title={props.title}
      subtitle={props.subtitle}
      description={props.description}
      images={
        props.images?.map((img: any) => ({
          resource: img.media,
          className: img.className,
        })) || []
      }
      primaryButton={
        props.links?.[0] && (
          // Renderiza tu botón según tu sistema de enlaces
          <a href={props.links[0].url} className="btn btn-primary">
            {props.links[0].label}
          </a>
        )
      }
      secondaryButton={
        props.links?.[1] && (
          <a href={props.links[1].url} className="btn btn-outline">
            {props.links[1].label}
          </a>
        )
      }
    />
  )
}

export default Component
