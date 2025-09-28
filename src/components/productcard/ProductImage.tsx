import type { ImageFile } from "../../types/strapi";

// Get the base URL directly from environment variables for cleaner code
const STRAPI_URL = (import.meta.env.VITE_API_URL || "http://localhost:1337").replace('/api', '');

interface ProductImageProps {
  images?: ImageFile[];
  productName?: string;
}

export function ProductImage({ images, productName }: ProductImageProps) {
  const hasImages = images && images.length > 0;
  const primaryImage = hasImages ? images[0] : null;
  const secondaryImage = images && images.length > 1 ? images[1] : null;

  // Fallback for when no images are available
  if (!primaryImage) {
    return (
      <div className="aspect-[4/5] bg-gray-100 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
      {/* --- Skeleton Loader --- */}
      <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>

      {/* --- Primary Image (Always in the back) --- */}
      <img
        src={`${STRAPI_URL}${primaryImage.url}`}
        alt={productName || 'Product'}
        className="relative z-10 h-full w-full object-cover object-center transition-opacity duration-300"
        loading="lazy"
      />
      
      {/* --- Secondary Image (Fades in on top on hover) --- */}
      {secondaryImage && (
        <img
          src={`${STRAPI_URL}${secondaryImage.url}`}
          alt={productName || 'Product Hover'}
          className="absolute inset-0 z-20 h-full w-full object-cover object-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
          loading="lazy"
        />
      )}

      {/* --- Image Indicator Dots --- */}
      {secondaryImage && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
          <div className="h-2 w-2 rounded-full bg-white/70 transition-opacity duration-300 group-hover:bg-white/50"></div>
          <div className="h-2 w-2 rounded-full bg-white/50 transition-opacity duration-300 group-hover:bg-white/70"></div>
        </div>
      )}
    </div>
  );
}