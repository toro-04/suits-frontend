import { useState } from "react";
import type { ImageFile } from "../../types/strapi";
import { getImageUrl } from "../../services/api";

interface ProductImageGalleryProps {
  images?: ImageFile[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  // Use the same pattern as ProductImage component
  if (!images || images.length === 0) {
    return (
      <div className="space-y-4">
        <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden flex items-center justify-center">
          <span className="text-gray-500">No Image Available</span>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleMainImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = event.currentTarget;
    const currentSrc = target.src;
    
    // Prevent infinite loops by tracking failed images
    if (!failedImages.has(currentSrc)) {
      setFailedImages(prev => new Set([...prev, currentSrc]));
    }
  };

  const handleThumbnailError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = event.currentTarget;
    const currentSrc = target.src;
    
    // Prevent infinite loops by tracking failed images
    if (!failedImages.has(currentSrc)) {
      setFailedImages(prev => new Set([...prev, currentSrc]));
    }
  };

  const currentImage = images[currentImageIndex];

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        {currentImage && !failedImages.has(getImageUrl(currentImage.url)) ? (
          <img
            src={getImageUrl(currentImage.url)}
            alt={currentImage.alternativeText || `${productName} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            onError={handleMainImageError}
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 bg-gray-100">
            Failed to load image
          </div>
        )}
        
        {/* Navigation Arrows - Only show if more than one image */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation - Only show if more than one image */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`aspect-square bg-gray-100 overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex 
                  ? 'border-black' 
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              {!failedImages.has(getImageUrl(image.url)) ? (
                <img
                  src={getImageUrl(image.url)}
                  alt={image.alternativeText || `${productName} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={handleThumbnailError}
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-xs text-gray-400">
                  No Image
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}