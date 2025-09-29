import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/api";
import type { Product } from "../../types/strapi";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductInfo } from "./ProductInfo";
import { SizeSelector } from "./SizeSelector";
import { ColorSelector } from "./ColorSelector";
import { ActionButtons } from "./ActionButtons";
import { LoadingSkeleton } from "./LoadingSkeleton";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Selection states
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setError('No product ID provided');
      setLoading(false);
      return;
    }
    
    async function loadProduct(productId: string) {
      try {
        setLoading(true);
        const productData = await getProductById(productId);
        setProduct(productData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }
    
    loadProduct(id);
  }, [id]);

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay error={error} />;
  if (!product) return <NotFoundDisplay />;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          <ProductImageGallery 
            images={product.Images}
            productName={product.Name}
           
          />

          <div className="space-y-6 lg:space-y-8 lg:pt-8">
            <ProductInfo 
              name={product.Name}
              price={product.Base_Price}
              description={product.Description}
            />

            <ColorSelector 
              colors={product.Available_Color}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />

            <SizeSelector 
              sizes={product.Available_sizes}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
              customizable={product.Customizable}
            />

            <ActionButtons 
              product={product}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper components with original elegant styling
function ErrorDisplay({ error }: { error: string }) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-gray-900 text-lg">Error: {error}</p>
      </div>
    </div>
  );
}

function NotFoundDisplay() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-gray-900 text-lg">Product not found</p>
      </div>
    </div>
  );
}
