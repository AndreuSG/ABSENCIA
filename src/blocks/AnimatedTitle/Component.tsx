import React from 'react';
import './style.css';

export type AnimatedTitlePresentationalProps = {
  title: string;
  repeatedTitles: string[];
  animation?: 'swiper' | 'none';
  containerRef: React.RefObject<HTMLDivElement>;
  colors: string[];
};

export const AnimatedTitlePresentational: React.FC<AnimatedTitlePresentationalProps> = ({
  title,
  repeatedTitles,
  animation,
  containerRef,
  colors = [],
}) => {
  const defaultColor = '#000000';

  const getColor = (index: number) => {
    if (colors.length === 0) return defaultColor;
    return colors[index % colors.length];
  };

  // Renderiza cada letra con su propio color
  const renderColoredText = (text: string, startIndex: number = 0) => {
    // Eliminamos la condición especial para el guión
    return Array.from(text).map((char, charIndex) => (
      <span
        key={charIndex}
        style={{ color: getColor(startIndex + charIndex) }}
      >
        {char}
      </span>
    ));
  };

  if (animation === 'swiper') {
    const halfLength = Math.ceil(repeatedTitles.length / 2);
    const firstHalf = repeatedTitles.slice(0, halfLength);
    const secondHalf = repeatedTitles.slice(0, halfLength);

    return (
      <div className="animated-title-block py-8 md:py-12 lg:py-16">
        <div className="title-swiper-container" ref={containerRef}>
          <div className="title-swiper-wrapper">
            <div className="title-group">
              {firstHalf.map((text, index) => (
                <div key={`first-${index}`} className="title-swiper">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                    {/* Aplicamos renderColoredText a todos los textos, incluyendo el guión */}
                    {renderColoredText(text, index * 10)}
                  </h2>
                </div>
              ))}
            </div>

            <div className="title-group">
              {secondHalf.map((text, index) => (
                <div key={`second-${index}`} className="title-swiper">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
                    {/* Aplicamos renderColoredText a todos los textos, incluyendo el guión */}
                    {renderColoredText(text, index * 10)}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animated-title-block py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-center">
          {renderColoredText(title)}
        </h2>
      </div>
    </div>
  );
};
