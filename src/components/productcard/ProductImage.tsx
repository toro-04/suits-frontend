import { useState } from "react";
import type { ImageFile } from "../../types/strapi";
import { getImageUrl } from "../../services/api";

interface ProductImageProps {
  images?: ImageFile[];
  productName?: string;
}

export function ProductImage({ images, productName }: ProductImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No Image Available</span>
      </div>
    );
  }

  const currentImage = images[currentImageIndex];

  return (
    <div
      className="relative w-full h-80 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {currentImage && !imageError ? (
        <img
          src={getImageUrl(currentImage.url)}
          alt={currentImage.alternativeText || productName || "Product image"}
          className="w-full h-full object-cover transition-all duration-300"
          onError={(e) => {
            console.error("Image failed to load:", getImageUrl(currentImage.url));
            setImageError(true);
          }}
          loading="lazy"
          crossOrigin="anonymous"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          {imageError ? "Failed to load image" : "No Image Available"}
        </div>
      )}

      {/* Show image indicators if multiple images */}
      {images.length > 1 && isHovered && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}