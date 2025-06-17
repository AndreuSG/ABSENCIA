import React from 'react';

type Logo = {
  imagen: {
    url: string;
  };
  alt?: string;
};

export type LogosListPresentationalProps = {
  logos?: Logo[];
  hovered: number | null;
  show: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  setHovered: (i: number | null) => void;
};

export const LogosListPresentational: React.FC<LogosListPresentationalProps> = ({
  logos = [],
  hovered,
  show,
  containerRef,
  setHovered,
}) => {
  if (!logos.length) return null;

  return (
    <div
      ref={containerRef}
      className="flex flex-col md:flex-row flex-wrap items-center justify-center w-full gap-y-6 md:gap-y-0"
    >
      {logos.map((logo, i) => (
        <div
          key={i}
          className={`w-1/6 flex justify-center items-center transition-opacity duration-1000 ease-[cubic-bezier(0.22,0.61,0.36,1)]
            ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
          style={{
            transitionDelay: `${i * 400}ms`,
            transitionProperty: 'opacity, transform',
          }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <img
            src={logo.imagen?.url}
            alt={logo.alt || 'Logo'}
            className={`h-8 w-auto object-contain transition-opacity duration-200 ${
              hovered !== null && hovered !== i ? 'opacity-40' : 'opacity-100'
            }`}
          />
        </div>
      ))}
    </div>
  );
};
