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
    {/* Rest of your code stays the same */}

        <ProductImage 
          images={Images} 
          productName={Name}
        />
        
        <div className="space-y-3">
          <ProductInfo 
            name={Name} 
            price={Base_Price} 
          />
          <div className="px-4 pb-4">
            <ColorSwatches colors={Available_Color} />
          </div>
        </div>
      </div>
    </Link>
  );
}
