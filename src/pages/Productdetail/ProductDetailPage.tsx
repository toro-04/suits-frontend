import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../services/api';
import { ProductImageGallery } from './ProductImageGallery';
import { ColorSelector } from './ColorSelector';
import { SizeSelector } from './SizeSelector';
import { ProductInfo } from './ProductInfo';
import { ActionButtons } from './ActionButtons';
import type { Product } from '../../types/strapi';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  useEffect(() => {
    if (!id) {
      setError('No product ID provided');
      setLoading(false);
      return;
    }

    async function loadProduct(productId: string) {
      try {
        setLoading(true);
        setError(null);
        const productData = await getProductById(productId);
        setProduct(productData);
        
        // Debug logging
        console.log('Product data loaded:', {
          product: productData,
          colors: productData.Available_Color,
          sizes: productData.Available_sizes,
          customizable: productData.Customizable
        });
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }

    loadProduct(id);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-900 text-lg">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-900 text-lg">Product not found</p>
          <Link 
            to="/" 
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          <div className="order-1">
            <ProductImageGallery 
              images={product.Images}
              productName={product.Name}
            />
          </div>

          <div className="order-2 space-y-8">
            <ProductInfo 
              name={product.Name}
              price={product.Base_Price}
              description={product.Description}
            />

            {/* BIG RED TEST SECTION */}
            <div style={{ 
              padding: '20px', 
              backgroundColor: 'red', 
              color: 'white', 
              fontSize: '20px',
              border: '5px solid black'
            }}>
              <h1>🚨 TEST SECTION 🚨</h1>
              <p>Colors: {JSON.stringify(product.Available_Color)}</p>
              <p>Sizes: {JSON.stringify(product.Available_sizes)}</p>
              <p>Customizable: {product.Customizable ? 'Yes' : 'No'}</p>
            </div>

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
