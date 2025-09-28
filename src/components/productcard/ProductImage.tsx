// ProductImage.tsx
import { useState } from "react";
import type { ImageFile } from "../../types/strapi";

interface ProductImageProps {
  images?: ImageFile[];
  productName?: string;
  strapiUrl: string;
}

export function ProductImage({ images, productName, strapiUrl }: ProductImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const hasImages = images && images.length > 0;
  const hasMultipleImages = images && images.length > 1;
  const currentImage = hasImages ? images[currentImageIndex] : null;

  const handleMouseEnter = () => {
    if (hasMultipleImages) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  if (!hasImages) {
    return (
      <div className="aspect-[3/4] bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 48 48">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m-16-5c9.837 0 16-3.582 16-8" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative aspect-[3/4] bg-gray-50 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={`${strapiUrl}${currentImage?.url || ''}`}
        alt={productName || 'Product'}
        className={`w-full h-full object-cover transition-all duration-500 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        } group-hover:scale-105`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
      
      {hasMultipleImages && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
          {images.slice(0, 3).map((_, index) => (
            <div
              key={index}
              className={`h-1 w-4 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
