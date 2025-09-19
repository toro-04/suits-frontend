import type { Product, StrapiCollectionResponse, StrapiResponse } from "../types/strapi";

// Get the Strapi URL from environment variables, with a fallback for local development
const STRAPI_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

// Fetches all products
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${STRAPI_URL}/api/products?populate=*`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data: StrapiCollectionResponse<Product> = await response.json();
  return data.data;
}

// Fetches a single product by its ID
export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${STRAPI_URL}/api/products/${id}?populate=*`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }
  const data: StrapiResponse<Product> = await response.json();
  return data.data;
}