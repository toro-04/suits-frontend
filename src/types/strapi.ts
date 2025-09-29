// A single size option
export interface SizeOption {
  code: string;
  label: string;
}

// A single color option
export interface ColorOption {
  hex: string;
  code: string;
  label: string;
}

// The structure of the Available_sizes object from your API
export interface AvailableSizesStructure {
  altSuitSizing: SizeOption[];
  availableSizes: SizeOption[];
}

// The structure of the Available_Color object from your API
export interface AvailableColorStructure {
  availableColors: ColorOption[];
}

// A specific format of an image (e.g., small, medium)
export interface ImageFormat {
  url: string;
  width: number;
  height: number;
  size?: number; // File size in bytes
}

// A single image file from your 'Images' array
export interface ImageFile {
  id: number;
  documentId?: string; // Add documentId for Strapi v5 compatibility
  url: string; // The original, full-size image URL
  name: string;
  width: number;
  height: number;
  alternativeText?: string; // For accessibility
  caption?: string; // Image caption
  mime?: string; // MIME type (e.g., 'image/jpeg')
  size?: number; // File size in bytes
  // This object contains the optimized versions of the image
  formats?: {
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
    thumbnail?: ImageFormat;
  };
}

// The main Product type, matching your unique API response
export interface Product {
  id: number;
  documentId: string;
  Name: string;
  Description: string;
  Base_Price: number;
  Available_Color?: AvailableColorStructure; // Make optional in case not all products have colors
  Available_sizes?: AvailableSizesStructure; // Make optional in case not all products have sizes
  Customizable: boolean;
  Whatsapp_message: string;
  Images?: ImageFile[]; // Make optional in case some products don't have images
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string; // For internationalization
  slug?: string; // URL-friendly version of the name
}

// Generic Strapi response types
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    availableLocales?: string[];
    [key: string]: any;
  };
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
    availableLocales?: string[];
    [key: string]: any;
  };
}

// API Error response type
export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details?: any;
  };
}

// Union type for API responses that might return errors
export type StrapiApiResponse<T> = StrapiResponse<T> | StrapiCollectionResponse<T> | StrapiError;

// Helper type for handling loading states
export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}