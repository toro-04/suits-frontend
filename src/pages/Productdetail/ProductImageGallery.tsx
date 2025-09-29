import { useState } from "react";
import type { ImageFile } from "../../types/strapi";
import { getImageUrl } from "../../services/api";

interface ProductImageGalleryProps {
  images?: ImageFile[];
  productName?: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  console.log('Gallery rendering with:', { images, productName });
  const [activeIndex, setActiveIndex] = useState(0);

  // Fallback for when no images are provided
  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/5] bg-gray-100 flex items-center justify-center rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  const nextImage = () => setActiveIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length);

  // Touch handlers for mobile swipe (simplified for clarity)
  const [touchStart, setTouchStart] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 75) nextImage(); // Left swipe
    if (touchStart - touchEnd < -75) prevImage(); // Right swipe
  };

  return (
    <div className="space-y-4">
      {/* Main Image Viewer with Cross-fade Effect */}
      <div 
        className="relative group aspect-[4/5] overflow-hidden rounded-lg bg-gray-100 select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <img
            key={image.id}
            src={getImageUrl(image.url)}
            alt={image.alternativeText || `${productName} - view ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
            draggable={false}
            crossOrigin="anonymous"
            onError={(e) => {
              console.error('Gallery image failed to load:', getImageUrl(image.url));
            }}
          />
        ))}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage} 
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        
        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex justify-center space-x-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setActiveIndex(index)}
              className={`flex-shrink-0 w-16 h-20 overflow-hidden rounded-md border-2 p-1 transition-all duration-200 ${
                activeIndex === index ? 'border-blue-500' : 'border-transparent hover:border-gray-400'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={getImageUrl(image.url)}
                alt={image.alternativeText || `Thumbnail ${index + 1}`}
                className="w-full h-full object-cover rounded-sm"
                crossOrigin="anonymous"
                onError={(e) => {
                  console.error('Thumbnail failed to load:', getImageUrl(image.url));
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}