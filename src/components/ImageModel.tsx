import React, { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: StaticImageData;
  onClose: () => void;
}

// Enhanced Image Modal with zoom functionality
const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  imageUrl,
  onClose,
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [isOpen]);

  // Handle wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    if (!imageRef.current || !containerRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    // Calculate mouse position relative to image
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate mouse position as percentage of image
    const mouseXPercent = mouseX / rect.width;
    const mouseYPercent = mouseY / rect.height;

    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newScale = Math.min(Math.max(scale * delta, 0.5), 5);

    if (newScale !== scale) {
      // Calculate new position to zoom toward mouse cursor
      const scaleDiff = newScale - scale;
      const newX = position.x - (mouseXPercent - 0.5) * rect.width * scaleDiff;
      const newY = position.y - (mouseYPercent - 0.5) * rect.height * scaleDiff;

      setScale(newScale);
      setPosition({ x: newX, y: newY });
    }
  };

  // Handle mouse down for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setDragOffset({ x: position.x, y: position.y });
      e.preventDefault();
    }
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      setPosition({
        x: dragOffset.x + deltaX,
        y: dragOffset.y + deltaY,
      });
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle double click to reset zoom
  const handleDoubleClick = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-base hover:text-gray-300 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black  hover:bg-opacity-70 transition-all"
        >
          x
        </button>

        {/* Zoom controls */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <button
            onClick={() => {
              const newScale = Math.min(scale * 1.2, 5);
              setScale(newScale);
            }}
            className="w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all"
          >
            +
          </button>
          <button
            onClick={() => {
              const newScale = Math.max(scale * 0.8, 0.5);
              setScale(newScale);
              if (newScale === 1) {
                setPosition({ x: 0, y: 0 });
              }
            }}
            className="w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all"
          >
            −
          </button>
          <button
            onClick={handleDoubleClick}
            className="w-10 h-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full flex items-center justify-center transition-all text-xs"
          >
            1:1
          </button>
        </div>

        {/* Instructions */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black/60 px-4 py-2 rounded-lg">
          <p>Lăn chuột để zoom • Kéo để di chuyển • Double click để reset</p>
        </div>

        {/* Image container */}
        <div
          className="relative overflow-hidden w-full h-full flex items-center justify-center"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
          onClick={(e) => e.stopPropagation()}
          style={{
            cursor: scale > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
          }}
        >
          <img
            ref={imageRef}
            src={imageUrl.src}
            alt="Review image"
            className="max-w-full max-h-full object-contain transition-transform duration-100 select-none"
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${
                position.y / scale
              }px)`,
              transformOrigin: "center",
            }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
