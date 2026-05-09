import { useState, useEffect } from 'react';
import styles from './Slider.module.scss';

export interface SlideImage {
  url: string;
  alt: string;
}

interface FadeSliderProps {
  images: SlideImage[];
  interval?: number; 
}

export default function FadeSlider({ images, interval = 3000 }: FadeSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return <div>No images to display.</div>;
  }

  return (
    <div className={styles['slider']}>
      {/* 1. The Images */}
      {images.map((image, index) => (
        <img
          key={image.url} 
          src={image.url}
          alt={image.alt}
          className={`${styles['slide']} ${index === currentIndex ? styles['active'] : ''}`}
        />
      ))}

      <div className={styles['slider-nav']}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles['slider-nav__line']} ${index === currentIndex ? styles['active'] : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}