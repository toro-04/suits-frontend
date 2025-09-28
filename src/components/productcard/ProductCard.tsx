import { Link } from "react-router-dom";
import type { Product } from "../../types/strapi";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { ColorSwatches } from "./ColorSwatches";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  if (!product) return null;

  const { Name, Base_Price, Images, Available_Color, documentId, id } = product;

  return (
    <Link 
      to={`/product/${documentId || id}`} 
      className="block group"
      aria-label={`View details for ${Name}`}
    >
      {/* This outer div provides a more polished container and hover effect */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1">
        
        {/* Your custom image component */}
        <ProductImage 
          images={Images} 
          productName={Name}
        />

        {/* This div wraps the text content for better spacing and separation */}
        <div className="p-4 space-y-3 border-t border-gray-100">
          <ProductInfo 
            name={Name} 
            price={Base_Price} 
          />
          {/* Passing the actual array of colors to the component */}
          <ColorSwatches 
            colors={Available_Color?.availableColors} 
          />
        </div>

      </div>
    </Link>
  );
}