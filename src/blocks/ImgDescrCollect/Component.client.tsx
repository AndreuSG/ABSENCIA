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

  return (
    <ImgDescrCollect
      sectionId={sectionId}
      mediaCollection={images}
    />
  );
};
export default ImgDescrCollectClient;
