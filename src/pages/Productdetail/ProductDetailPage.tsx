import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/api";
import type { Product, ImageFile } from "../../types/strapi";

const STRAPI_URL = (import.meta.env.VITE_API_URL || "http://localhost:1337").replace('/api', '');

// Helper component for displaying errors
function ErrorDisplay({ error }: { error: string }) {
  return <div className="text-center py-20 text-xl text-red-600">Error: {error}</div>;
}

// Helper component for the "Not Found" state
function NotFoundDisplay() {
  return <div className="text-center py-20 text-xl">Product not found</div>;
}

// Helper component for the professional loading state
function LoadingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <div className="w-full aspect-square bg-gray-300 rounded-lg"></div>
          <div className="flex space-x-2">
            <div className="w-20 h-20 bg-gray-300 rounded"></div>
            <div className="w-20 h-20 bg-gray-300 rounded"></div>
            <div className="w-20 h-20 bg-gray-300 rounded"></div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>
          <div className="space-y-2 pt-4">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<ImageFile | null>(null);
  const [tailoringOption, setTailoringOption] = useState("standard");

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

        if (productData.Images && productData.Images.length > 0) {
          setActiveImage(productData.Images[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }
    
    loadProduct(id);
  }, [id]);

  const handleWhatsAppRedirect = () => {
    if (!product) return;
    const { Name, Whatsapp_message, Customizable } = product;
    const isCustom = tailoringOption === "custom";
    let message = `Hello, I'm interested in the "${Name}" suit (ID: ${product.documentId}).\n`;

    if (Customizable && isCustom) {
      message += `I would like to get it custom tailored.\n${Whatsapp_message}`;
    } else {
      message += `I'm interested in the standard sizes.`;
    }

    const phoneNumber = "YOUR_PHONE_NUMBER_HERE"; // IMPORTANT: Replace with your number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay error={error} />;
  if (!product) return <NotFoundDisplay />;

  const { Name, Description, Base_Price, Images, Customizable } = product;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Interactive Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border bg-gray-100">
            {activeImage && (
              <img
                key={activeImage.id}
                src={`${STRAPI_URL}${activeImage.url}`}
                alt={Name}
                className="w-full h-full object-cover object-center"
              />
            )}
          </div>
          {Images && Images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {Images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setActiveImage(image)}
                  className={`w-20 h-20 rounded border-2 p-1 flex-shrink-0 transition-all ${activeImage?.id === image.id ? 'border-blue-500' : 'border-transparent hover:border-gray-400'}`}
                >
                  <img src={`${STRAPI_URL}${image.url}`} alt={`Thumbnail ${image.id}`} className="w-full h-full object-cover rounded-sm" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info & Actions Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">{Name}</h1>
            <p className="text-3xl text-gray-800 mt-3">₹{Base_Price?.toLocaleString("en-IN")}</p>
          </div>
          
          <div className="prose prose-lg text-gray-600">
            <h2 className="text-lg font-semibold text-gray-900">Description</h2>
            <p>{Description}</p>
          </div>

          {Customizable && (
            <fieldset>
              <legend className="text-lg font-semibold text-gray-900 mb-2">Tailoring</legend>
              <div className="flex items-center gap-x-6 bg-gray-50 p-4 rounded-lg border">
                <div className="flex items-center gap-x-2">
                  <input id="standard-size" name="tailoring" type="radio" value="standard" checked={tailoringOption === 'standard'} onChange={(e) => setTailoringOption(e.target.value)} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"/>
                  <label htmlFor="standard-size" className="block text-sm font-medium leading-6 text-gray-900">Standard Size</label>
                </div>
                <div className="flex items-center gap-x-2">
                  <input id="custom-tailored" name="tailoring" type="radio" value="custom" checked={tailoringOption === 'custom'} onChange={(e) => setTailoringOption(e.target.value)} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"/>
                  <label htmlFor="custom-tailored" className="block text-sm font-medium leading-6 text-gray-900">Custom Tailored</label>
                </div>
              </div>
            </fieldset>
          )}

          <div className="space-y-3 pt-4 border-t">
            <button 
              onClick={handleWhatsAppRedirect}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              {/* WhatsApp Icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 16 16"><path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/></svg>
              WhatsApp Inquiry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}