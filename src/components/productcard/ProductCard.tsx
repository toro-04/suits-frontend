import { Link } from "react-router-dom";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { ColorSwatches } from "./ColorSwatches";
import type { Product } from "../../types/strapi";

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
      aria-label={`View ${Name}`}
    >
      <div className="bg-white transition-shadow duration-300 hover:shadow-md rounded-lg overflow-hidden border border-gray-100">
        {/* Fixed height container to prevent layout shift */}
        <div className="aspect-[4/5] relative overflow-hidden">
          <ProductImage 
            images={Images} 
            productName={Name}
          />
        </div>
        
        <div className="p-4 space-y-3">
          <ProductInfo 
            name={Name} 
            price={Base_Price} 
          />
          <ColorSwatches colors={Available_Color} />
        </div>
      </div>
    </Link>
  );
}
