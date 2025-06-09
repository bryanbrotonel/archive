'use client';
import React, { useEffect, useRef, useState } from 'react';

type ScrollableTextProps = {
  onLoad?: boolean;
  children: React.ReactNode;
  className?: string;
};

export default function ScrollableText({
  onLoad = false,
  children,
  className,
}: ScrollableTextProps): React.ReactNode {
  const textRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [translateStyle, setTranslateStyle] = useState<React.CSSProperties>({});
  const [translateWidth, setTranslateWidth] = useState<number>(0);

  const animationDelay = 1500;
  const textPadding = 12;

  const isAnimating = Object.keys(translateStyle).length !== 0;
  const canTranslate = translateWidth > 0;

  useEffect(() => {
    const textWidth = textRef.current?.offsetWidth || 0;
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const widthDifference = textWidth - containerWidth;

    if (widthDifference > 0) {
      const translateDistance = getTranslateDistance(Math.abs(widthDifference));
      setTranslateWidth(translateDistance);
    }
  }, []);

  useEffect(() => {
    if (onLoad && canTranslate) {
      animate(translateWidth, 3000);
    }
  }, [onLoad, canTranslate, translateWidth]);

  const animate = (translateWidth: number, delay: number) => {
    const speed = 5; // units per second
    const animationDuration = (translateWidth / speed) * 100;

    const animationTimeout = setTimeout(() => {
      setTranslateStyle({
        transform: `translate(-${translateWidth}px, 0)`,
        transitionDuration: `${animationDuration}ms`,
      });

      setTimeout(() => {
        setTranslateStyle({
          transform: 'translate(0)',
          transitionDuration: `${animationDuration}ms`,
        });

        setTimeout(() => {
          setTranslateStyle({});
        }, animationDuration);
      }, animationDuration + animationDelay);
    }, delay);

    return () => clearTimeout(animationTimeout);
  };

  const getTranslateDistance = (width: number) => width + textPadding * 2;

  const handleMouseEnter = () => {
    if (!isAnimating && canTranslate) {
      animate(translateWidth, 0);
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative'
      onMouseEnter={handleMouseEnter}
    >
      <div
        className='whitespace-nowrap group:transition-transform ease-linear'
        style={translateStyle}
      >
        <div className=''>
          <span
            className={`${className} ${canTranslate ? 'select-all' : ''}`}
            ref={textRef}
          >
            {children}
          </span>
        </div>
      </div>
      {canTranslate && (
        <div className='absolute inset-0 bg-gradient-edge-overlay' />
      )}
    </div>
  );
}
