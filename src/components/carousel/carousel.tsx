"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: StaticImageData[];
  height?: number | string;
  objFit?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  height = 600,
  objFit = "object-cover",
}) => {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [length]);

  const goToNext = () => setCurrent(current === length - 1 ? 0 : current + 1);
  const goToPrev = () => setCurrent(current === 0 ? length - 1 : current - 1);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full mx-auto overflow-hidden">
      {/* Container với responsive height bằng Tailwind */}
      <div className="relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt={`Slide ${index + 1}`}
              fill
              quality={100}
              className={`${objFit} max-w-[100vw]`}
              priority={index === 0}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
            />
          </div>
        ))}
      </div>

      {/* Navigation buttons - responsive size */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 z-10 left-2 sm:left-4 -translate-y-1/2 bg-white/50 backdrop-blur-sm p-1.5 sm:p-2 rounded-full hover:bg-white/80 shadow-md transition-all duration-200"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 z-10 right-2 sm:right-4 -translate-y-1/2 bg-white/50 backdrop-blur-sm p-1.5 sm:p-2 rounded-full hover:bg-white/80 shadow-md transition-all duration-200"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      </button>

      {/* Dots indicator - responsive size và position */}
      <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full transition-all duration-200 ${
              current === idx 
                ? "bg-white scale-110 shadow-sm" 
                : "bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;