'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LogosListPresentational } from './Component';

type Logo = {
  imagen: {
    url: string;
  };
  alt?: string;
};

type Props = {
  logos?: Logo[];
};

export const LogosList: React.FC<Props> = ({ logos = [] }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = containerRef.current;
    if (!ref) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry!.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 1 }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, []);

  return (
    <LogosListPresentational
      logos={logos}
      hovered={hovered}
      show={show}
      containerRef={containerRef}
      setHovered={setHovered}
    />
  );
};

export default LogosList;
