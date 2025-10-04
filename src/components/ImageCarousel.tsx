import React, { useState, useEffect, useRef } from "react";

interface ImageCarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  autoPlay = true,
  interval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    const slideInterval = setInterval(nextSlide, interval);
    return () => clearInterval(slideInterval);
  }, [currentIndex, autoPlay, interval]);

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchEndX.current - touchStartX.current > 50) prevSlide();
  };

  return (
    <div className="relative w-full md:w-11/12 lg:w-5/6 mx-auto flex flex-col items-center">
      <div
        className="flex items-center w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Arrow (hidden on mobile) */}
        <button
          onClick={prevSlide}
          className="hidden md:block text-6xl md:text-7xl text-white mx-8 cursor-pointer hover:text-primary transition"
        >
          &#10094;
        </button>

        {/* Image Container */}
        <div className="overflow-hidden rounded-xl flex-1">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Slide ${idx + 1}`}
                className="w-full flex-shrink-0 object-cover h-72 sm:h-96 md:h-[500px] lg:h-[600px]"
              />
            ))}
          </div>
        </div>

        {/* Next Arrow (hidden on mobile) */}
        <button
          onClick={nextSlide}
          className="hidden md:block text-6xl md:text-7xl text-white mx-8 cursor-pointer hover:text-primary transition"
        >
          &#10095;
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-3">
        {images.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full cursor-pointer transition ${
              currentIndex === idx ? "bg-primary" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
