// ProductCard.tsx
import { Link } from "react-router-dom";
import type { Product } from "../../types/strapi";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { ColorSwatches } from "./ColorSwatches";

const STRAPI_URL = (import.meta.env.VITE_API_URL || "http://localhost:1337").replace('/api', '');

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
      <div className="bg-white transition-transform duration-300 group-hover:scale-[1.02]">
        <ProductImage 
          images={Images} 
          productName={Name} 
          strapiUrl={STRAPI_URL}
        />
        <ProductInfo 
          name={Name} 
          price={Base_Price} 
        />
        <ColorSwatches 
          colors={Available_Color} 
        />
      </div>
    </Link>
  );
}
