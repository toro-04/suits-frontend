import { useState } from "react";
import type { ImageFile } from "../../types/strapi";

interface ProductImageGalleryProps {
  images?: ImageFile[]; // Changed from ImageStructure to ImageFile[]
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Extract image URLs from the ImageFile array
  const imageUrls: string[] = [];
  
  if (images && images.length > 0) {
    images.forEach(img => {
      if (img?.url) {
        imageUrls.push(`http://localhost:1337${img.url}`);
      }
    });
  }

  // Fallback to a placeholder if no images
  if (imageUrls.length === 0) {
    imageUrls.push('/api/placeholder/600/800');
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        <img
          src={imageUrls[currentImageIndex]}
          alt={`${productName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Handle broken images by showing placeholder
            if (e.currentTarget && e.currentTarget.src !== '/api/placeholder/600/800') {
              e.currentTarget.src = '/api/placeholder/600/800';
            }
          }}
        />
        
        {/* Navigation Arrows - Only show if more than one image */}
        {imageUrls.length > 1 && (
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
        {imageUrls.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {imageUrls.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation - Only show if more than one image */}
      {imageUrls.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {imageUrls.map((url, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`aspect-square bg-gray-100 overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex 
                  ? 'border-black' 
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <img
                src={url}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Handle broken thumbnail images
                  if (e.currentTarget && e.currentTarget.src !== '/api/placeholder/150/150') {
                    e.currentTarget.src = '/api/placeholder/150/150';
                  }
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}