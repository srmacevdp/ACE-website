import React, { useState, useEffect, useRef, useCallback } from "react";

interface ImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlay = true,
  interval = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef< any | null>(null);

  // Use useCallback to prevent function recreation on every render
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Improved Auto-play effect
  useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(nextSlide, interval);
    }
    // Cleanup function to clear the interval
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoPlay, interval, nextSlide]);

  // Reset timer on manual navigation
  const handleInteraction = (action: () => void) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    action();
    if (autoPlay) {
      timerRef.current = setInterval(nextSlide, interval);
    }
  };

  const handleDotClick = (index: number) => {
     handleInteraction(() => setCurrentIndex(index));
  };
  
  const handlePrevClick = () => {
    handleInteraction(prevSlide);
  };

  const handleNextClick = () => {
    handleInteraction(nextSlide);
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[550px] lg:h-[700px] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Slides Container with Perspective */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {images.map((src, idx) => {
          const offset = idx - currentIndex;
          const isVisible = Math.abs(offset) <= 1; // Show current, next, and previous
          
          const transform = `
            translateX(${offset * 40}%) 
            scale(${1 - Math.abs(offset) * 0.2}) 
            rotateY(${offset * -15}deg)
          `;

          return (
            <div
              key={idx}
              className="absolute w-4/5 md:w-3/5 h-full transition-transform duration-700 ease-in-out"
              style={{
                transform: transform,
                opacity: isVisible ? 1 : 0,
                zIndex: images.length - Math.abs(offset),
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevClick}
        aria-label="Previous Slide"
        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-40 bg-black/40 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/60 transition-all duration-300"
      >
        &#10094;
      </button>
      <button
        onClick={handleNextClick}
        aria-label="Next Slide"
        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-40 bg-black/40 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-black/60 transition-all duration-300"
      >
        &#10095;
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 z-40 flex gap-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => handleDotClick(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === idx ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;