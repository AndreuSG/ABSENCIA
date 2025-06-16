'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ImgDescrCollect } from './Component'

type Media = {
  url: string;
  alt: string;
}

export type ImgDescrCollectProps = {
  sectionId?: string;
  mediaCollection?: {
    media: Media;
    title?: string;
    description?: string;
  }[];
}

export const ImgDescrCollectClient: React.FC<ImgDescrCollectProps> = ({
  sectionId,
  mediaCollection = [],
}) => {
  const [images, setImages] = useState(mediaCollection);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionId && sectionRef.current) {
      sectionRef.current.id = sectionId;
    }
  }, [sectionId]);

  return (
    <section className="img-list mt-8" ref={sectionRef}>
      {images.map((item, index) => (
        <div key={index} className="image-item">
          <img src={item.media.url} alt={item.media.alt} />
          {item.title && <h3>{item.title}</h3>}
          {item.description && <p>{item.description}</p>}
        </div>
      ))}
    </section>
  );
};
export default ImgDescrCollectClient;
