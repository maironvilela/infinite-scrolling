import React, { useEffect, useRef } from 'react';

type ScrollInfinitProps = {
  updatePage: () => void
}

export const ScrollInfinit = ({ updatePage }: ScrollInfinitProps) => {
  const scrollInfinitReg = useRef();

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }

    let observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        console.log("carregando")
        observer.disconnect;
        updatePage();
      }
    }, options);

    observer.observe(scrollInfinitReg.current)

    return () => {
      observer.disconnect();
    }
  }, [])

  return <div ref={scrollInfinitReg} />;
}

