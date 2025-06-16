import React from 'react';


export type ImgDescrCollectProps = {
  sectionId?: string;
  mediaCollection?: {
    media: {
      url: string;
      alt: string;
    };
    title?: string;
    description?: string;
  }[];
};


export const ImgDescrCollect: React.FC<ImgDescrCollectProps> = ({
  sectionId,
  mediaCollection = [],
}) => {
  return (
  <div className="flex justify-center">
    <section
      id={sectionId}
      className="img-list mt-8 inline-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {mediaCollection.map((item, index) => (
        <div
          key={index}
          className="image-item bg-white p-4 text-center"
        >
          <div className="relative max-w-[10rem] sm:max-w-[10rem] md:max-w-[17rem] lg:max-w-[25rem] aspect-[6/4] overflow-hidden rounded-md mb-4">
            <img
              src={item.media.url}
              alt={item.media.alt}
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          {item.title && (
            <h3 className="relative max-w-[10rem] sm:max-w-[10rem] md:max-w-[17rem] lg:max-w-[25rem] text-sm lg:text-xl font-semibold mb-2 break-words">
              {item.title}
            </h3>
          )}
          {item.description && (
            <p className="relative text-gray-600 max-w-[10rem] sm:max-w-[10rem] md:max-w-[17rem] lg:max-w-[25rem] text-[0.5rem] lg:text-base break-words">
              {item.description}
            </p>
          )}
        </div>
      ))}
    </section>
  </div>
  );
};
