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
}

// A single image file from your 'Images' array
export interface ImageFile {
  id: number;
  url: string; // The original, full-size image URL
  name: string;
  width: number;
  height: number;
  // This object contains the optimized versions of the image
  formats?: {
    small?: ImageFormat;
    medium?: ImageFormat;
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
  Available_Color: AvailableColorStructure;
  Available_sizes: AvailableSizesStructure;
  Customizable: boolean;
  Whatsapp_message: string;
  Images: ImageFile[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Generic Strapi response types
export interface StrapiResponse<T> {
  data: T;
  meta?: any;
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
  };
}