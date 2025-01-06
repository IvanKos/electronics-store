export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  description: string;
}

export interface ProductsFilter {
  name?: string;
  price?: {min: number; max: number};
  category?: string;
}
