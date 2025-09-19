import type { Product } from "../types/strapi";

// The base URL of your Strapi instance
const STRAPI_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Get the first image as the primary display image
  const primaryImage = product.attributes.images.data[0]?.attributes;

  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="aspect-w-3 aspect-h-4">
        {primaryImage ? (
          <img
            src={`${STRAPI_URL}${primaryImage.url}`}
            alt={product.attributes.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {product.attributes.name}
        </h3>
        <p className="mt-1 text-md font-bold text-gray-900">
          ₹{product.attributes.base_price.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}