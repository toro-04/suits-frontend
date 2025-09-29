import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../services/api';
import { ProductImageGallery } from './ProductImageGallery';
import { ColorSelector } from './ColorSelector';
import { SizeSelector } from './SizeSelector';
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
      } catch (err) {
        console.error('Error loading product:', err);
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }

    loadProduct(id);
  }, [id]);

  // Helper components
  function ErrorDisplay({ error }: { error: string }) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">{error}</p>
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

  function NotFoundDisplay() {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Link 
            to="/products" 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!product) {
    return <NotFoundDisplay />;
  }

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in ordering "${product.Name}". 
      ${selectedColor ? `Color: ${selectedColor}` : ''}
      ${selectedSize ? `Size: ${selectedSize}` : ''}
      Price: ₹${product.Base_Price.toLocaleString('en-IN')}
      
      ${product.Whatsapp_message || 'Please let me know availability and delivery details.'}`
    );
    window.open(`https://wa.me/your-number?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <ProductImageGallery 
            images={product.Images} 
            productName={product.Name}
          />
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.Name}</h1>
            <div className="text-3xl font-bold text-gray-900 mb-6">
              ₹{product.Base_Price.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Description */}
          {product.Description && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.Description}</p>
            </div>
          )}

          {/* Color Selection */}
          {product.Available_Color && (
            <ColorSelector 
              colors={product.Available_Color}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />
          )}

          {/* Size Selection */}
          {product.Available_sizes && (
            <SizeSelector 
              sizes={product.Available_sizes}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />
          )}

          {/* Customization Info */}
          {product.Customizable && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Customizable Product:</strong> This item can be tailored to your preferences. Contact us for custom options.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
              <span>Order via WhatsApp</span>
            </button>
            
            <button className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}