import type { Product } from "../types/strapi";

// Separate URLs for API calls vs image assets
const API_BASE_URL = (import.meta.env.VITE_API_URL || "https://suitsbackend-production.up.railway.app/api").replace(/\/$/, '');
const STRAPI_BASE_URL = (import.meta.env.VITE_API_URL || "https://suitsbackend-production.up.railway.app").replace(/\/api$/, '').replace(/\/$/, '');


export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products?populate=*`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include credentials for CORS
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }
  
  const json = await response.json();
  return Array.isArray(json) ? json : json.data || [];
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${API_BASE_URL}/products/${id}?populate=*`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Include credentials for CORS
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}: ${response.status} ${response.statusText}`);
  }
  
  const json = await response.json();
  return json.data || json;
}

// Helper function to construct image URLs correctly
export function getImageUrl(imageUrl: string): string {
  if (!imageUrl) return '';
  
  // If it's already a full URL, return as-is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Construct the full image URL using the base Strapi URL (without /api)
  const cleanImageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${STRAPI_BASE_URL}${cleanImageUrl}`;
}

// Export the base URL for use in components
export { STRAPI_BASE_URL as STRAPI_URL };