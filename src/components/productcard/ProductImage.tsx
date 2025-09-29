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
      <div className="w-full aspect-[3/4] bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">No Image Available</span>
      </div>
    );
  }

  const currentImage = images[currentImageIndex];

  return (
    <div
      className="relative w-full aspect-[3/4] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {currentImage && !imageError ? (
        <img
          src={getImageUrl(currentImage.url)}
          alt={currentImage.alternativeText || productName || "Product image"}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          {imageError ? "Failed to load image" : "No Image Available"}
        </div>
      )}

      {images.length > 1 && isHovered && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setCurrentImageIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
