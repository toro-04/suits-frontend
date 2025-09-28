import type { Product } from "../types/strapi";

const STRAPI_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

export async function getProducts(): Promise<Product[]> {
  // Added the required '/api' prefix to the URL
  const response = await fetch(`${STRAPI_URL}/products?populate=*`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }
  
  const json = await response.json();
  
  // Handles your API's structure (returns the array directly or from within a data object)
  return Array.isArray(json) ? json : json.data;
}

export async function getProductById(id: string): Promise<Product> {
  // Added the required '/api' prefix to the URL
  const response = await fetch(`${STRAPI_URL}/products/${id}?populate=*`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }
  
  const json = await response.json();

  // Handles your API's structure for a single item
  return json.data || json;
}