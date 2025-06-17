'use client'

import React, { useEffect, useRef, useState } from 'react'
import { OrderData } from './Component'

export type Media = {
  url: string;
  alt: string;
}

export type OrderDataProps = {
  sectionId?: string;
  title?: string;
  media?: Media;
  imagePositionHorizontal?: 'start' | 'center' | 'end';
  imagePositionVertical?: 'start' | 'center' | 'end';
  dataCollection?: {
    title?: string;
    description?: string;
  }[];
}

export const OrderDataClient: React.FC<OrderDataProps> = ({
  sectionId,
  title,
  media,
  imagePositionHorizontal = 'start',
  imagePositionVertical = 'center',
  dataCollection = [],
}) => {

  return (
    <OrderData
      sectionId={sectionId}
      title={title}
      media={media}
      imagePositionHorizontal={imagePositionHorizontal}
      imagePositionVertical={imagePositionVertical}
      mediaCollection={dataCollection.map(item => ({
        title: item.title,
        description: item.description,
      }))}
    />
  );
};
export default OrderDataClient;
