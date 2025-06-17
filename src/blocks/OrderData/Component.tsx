import React from 'react';
import { Media } from './Component.client';

export type OrderDataProps = {
  sectionId?: string;
  title?: string;
  media?: Media;
  imagePositionHorizontal?: 'start' | 'center' | 'end';
  imagePositionVertical?: 'start' | 'center' | 'end';
  mediaCollection?: {
    title?: string;
    description?: string;
  }[];
};


export const OrderData: React.FC<OrderDataProps> = ({
  sectionId,
  title,
  media,
  imagePositionHorizontal = 'start',
  imagePositionVertical = 'center',
  mediaCollection = [],
}) => {
  return (
  <div className="flex justify-start">
    <section
      id={sectionId}
      className=""
    >
      <div className="mx-auto py-12">
        <h2 className="text-3xl font-bold px-4 sm:px-6 xl:px-8 text-center mb-8">{title}</h2>
        <div className='w-screen grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-8 gap-6 px-10 sm:px-12 xl:px-14 mb-6'>
          <div className="space-y-2 col-start-1 xl:col-start-2 xl:col-span-3">
            {mediaCollection.map((item, index) => (
              <div
                key={index}
                className={`mb-4 ${index !== mediaCollection.length - 1 ? 'pb-4 border-b border-gray-300' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 text-black flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-gray-700 ml-11">{item.description}</p>
              </div>
            ))}
          </div>
          <div className={`flex justify-${imagePositionHorizontal} items-${imagePositionVertical} xl:col-span-4`}>
            <img src={media?.url} alt={media?.alt || 'Section Image'} className="w-auto min-h-96 rounded-lg shadow-md" />
          </div>
        </div>
      </div>
    </section>
  </div>
  );
};
