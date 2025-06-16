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

  // Xử lý height cho carousel
  // Nếu height là số, thêm 'px', nếu là chuỗi, sử dụng trực tiếp
  const carouselHeight = typeof height === "number" ? `${height}px` : height;

  return (
    <div className="relative w-full mx-auto overflow-hidden shadow-sm">
      <div className="relative" style={{ height: carouselHeight }}>
        {images.map((img, index) => (
          <div
            key={index}
            className={` absolute inset-0 transition-opacity duration-700 ${
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
            />
          </div>
        ))}
      </div>

      <button
        onClick={goToPrev}
        className="absolute top-1/2 z-10 left-4 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white shadow"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 z-10 right-4 -translate-y-1/2 bg-white/50 p-2 rounded-full hover:bg-white shadow"
      >
        <ChevronRight />
      </button>

      {/* Chấm tròn indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              current === idx ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
