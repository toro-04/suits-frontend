// A single color option
export interface ColorOption {
  hex: string;
  code: string;
  label: string;
}

// The structure of the Available_Color object
export interface AvailableColorStructure {
  availableColors: ColorOption[];
}

// A single size option
export interface SizeOption {
  code: string;
  label: string;
}

// The structure of the Available_sizes object
export interface AvailableSizesStructure {
  altSuitSizing: SizeOption[];
  availableSizes: SizeOption[];
}

// A single image file from your 'Images' array
export interface ImageFile {
  id: number;
  url: string;
  name: string;
  width: number;
  height: number;
  // Add other image properties if you need them
}

// The main Product type, now fully typed
export interface Product {
  id: number;
  documentId: string;
  Name: string;
  Description: string;
  Base_Price: number;
  Available_Color: AvailableColorStructure; // Updated from 'any'
  Available_sizes: AvailableSizesStructure; // Updated from 'any'
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