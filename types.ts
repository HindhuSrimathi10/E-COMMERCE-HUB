
export enum Category {
  ELECTRONICS = 'Electronics',
  FASHION = 'Fashion',
  ACCESSORIES = 'Accessories',
  FOOTWEAR = 'Footwear',
  OUTERWEAR = 'Outerwear'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  stock: number;
  rating: number;
  sizes?: string[];
  colors?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  avatar?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}
