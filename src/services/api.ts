import type { Product, StrapiCollectionResponse, StrapiResponse } from "../types/strapi";

const STRAPI_URL = (import.meta.env.VITE_API_URL || "http://localhost:1337").replace(/\/$/, '');

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${STRAPI_URL}/products?populate=*`);
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }
  
  const data: StrapiCollectionResponse<Product> = await response.json();
  return data.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${STRAPI_URL}/products/${id}?populate=*`);
  if (!response.ok) {
    throw new Error(`Failed to fetch product with id ${id}`);
  }
  const data: StrapiResponse<Product> = await response.json();
  return data.data;
}