// Defines the structure for image data from Strapi
interface StrapiImageAttributes {
  url: string;
  width: number;
  height: number;
  name: string;
}

interface StrapiImageData {
  id: number;
  attributes: StrapiImageAttributes;
}

// New type for the color options
export interface ColorOption {
  hex: string;
  label: string;
}

// New type for the size options
export interface SizeOption {
  code: string;
  label: string;
}


export interface Product {
  id: number;
  attributes: {
    name: string;
    description: string;
    base_price: number; 
    customizable: boolean;
    whatsapp_message: string;
    availableColors: ColorOption[]; 
    available_sizes: SizeOption[];   
    images: {
      data: StrapiImageData[];
    };
  };
}

// A generic type for a Strapi API response containing a single item
export interface StrapiResponse<T> {
  data: T;
  meta: {};
}

// A generic type for a Strapi API response containing multiple items
export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}