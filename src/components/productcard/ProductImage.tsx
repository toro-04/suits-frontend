import { useState } from "react";
import type { ImageFile } from "../../types/strapi";
import { getImageUrl } from "../../services/api";

interface ProductImageProps {
  images?: ImageFile[];
  productName?: string;
}

export function ProductImage({ images, productName }: ProductImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  // Auto-cycle through images on hover (simpler than state management)
  const handleMouseEnter = () => {
    if (images && images.length > 1) {
      setCurrentImageIndex(1);
    }
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[3/4] bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No Image Available</span>
      </div>
    );
  }

  const currentImage = images[currentImageIndex];

  return (
    <div
      className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {currentImage && !imageError ? (
        <img
          src={getImageUrl(currentImage.url)}
          alt={currentImage.alternativeText || productName || "Product image"}
          className="w-full h-full object-cover transition-opacity duration-300"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500 bg-gray-100">
          {imageError ? "Failed to load image" : "No Image Available"}
        </div>
      )}

      {/* Simple image indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.slice(0, 3).map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
