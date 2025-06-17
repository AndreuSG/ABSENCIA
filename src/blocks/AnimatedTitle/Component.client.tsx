'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatedTitlePresentational } from './Component';

type Color = {
  color: string;
}

type AnimatedTitleBlockProps = {
  title: string;
  animation?: 'swiper' | 'none';
  textColors?: Color[];
};

export const AnimatedTitleBlock: React.FC<AnimatedTitleBlockProps> = ({
  title,
  animation = 'none',
  textColors = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [repeatedTitles, setRepeatedTitles] = useState<string[]>([]);
  const textMeasureRef = useRef<HTMLSpanElement>(null);

  const colors = textColors.map(item => item.color);

  useEffect(() => {
    if (animation === 'swiper') {
      const calculateRepetitions = () => {
        const containerWidth =
          containerRef.current?.offsetWidth || window.innerWidth; // Usa el ancho del contenedor
        const textWidth = textMeasureRef.current?.offsetWidth || 0; // Mide el ancho real del texto
        const dashWidth = 30;

        const pairWidth = textWidth + dashWidth;

        const targetWidth = containerWidth * 2; // Duplica el ancho para asegurar repeticiones
        let requiredPairs = Math.ceil(targetWidth / pairWidth);

        if (title.length < 5) {
          requiredPairs = Math.max(requiredPairs, 15);
        } else if (title.length < 20) {
          requiredPairs = Math.max(requiredPairs, 10);
        } else if (title.length > 50) {
          requiredPairs = Math.max(requiredPairs, 3);
        }

        return Math.min(requiredPairs, 50); // Asegura un límite máximo de repeticiones
      };

      const generateTitles = () => {
        const numRepetitions = calculateRepetitions();

        const result: string[] = [];
        for (let i = 0; i < numRepetitions; i++) {
          result.push(title);
          result.push('-');
        }
        if (numRepetitions % 2 !== 0) result.push('-');
        return result;
      };

      setRepeatedTitles(generateTitles());

      const handleResize = () => {
        setRepeatedTitles(generateTitles());
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [title, animation]);

  return (
    <>
      <span
        ref={textMeasureRef}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          whiteSpace: 'nowrap',
          fontSize: '2rem',
          left: 0,
          top: 0,
          width: 'auto',
          overflow: 'hidden',
          pointerEvents: 'none',
          transform: 'translateX(-9999px)',
        }}
      >
        {title}-
      </span>

      <AnimatedTitlePresentational
        title={title}
        repeatedTitles={repeatedTitles}
        animation={animation}
        containerRef={containerRef as React.RefObject<HTMLDivElement>}
        colors={colors} // Pasamos el array de colores al componente presentacional
      />
    </>
  );
};

export default AnimatedTitleBlock;
