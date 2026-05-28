export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductVariant {
  colour: string;
  colourHex: string;
  size: string;
  stock: number; // 0 = sold out, 1-2 = low stock, 3+ = available
}

export interface EnrichedProduct extends Product {
  brand: string;
  salePrice?: number;
  colours: ColourOption[];
  sizes: SizeOption[];
  variants: ProductVariant[];
  images: string[]; // multiple gallery images
  deliveryEstimate?: string;
  specs: Record<string, string>;
}

export interface ColourOption {
  name: string;
  hex: string;
}

export interface SizeOption {
  label: string;
  value: string;
}

export interface CartItem {
  productId: number;
  title: string;
  image: string;
  colour: string;
  size: string;
  quantity: number;
  price: number;
  salePrice?: number;
}

export interface CartState {
  items: CartItem[];
}

export type StockStatus = "available" | "low" | "soldout";

export interface SelectedVariant {
  colour: string;
  size: string;
}

export type TabId = "description" | "specifications" | "reviews";

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}
