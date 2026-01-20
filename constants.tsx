
import { Category, Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Aura Headphones',
    description: 'Noise-cancelling wireless headphones with 40-hour battery life and spatial audio.',
    price: 299.99,
    category: Category.ELECTRONICS,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    stock: 15,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Minimalist Timepiece',
    description: 'Sleek, stainless steel watch with Italian leather strap and sapphire crystal.',
    price: 189.50,
    category: Category.FASHION,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    stock: 22,
    rating: 4.6
  },
  {
    id: '3',
    name: 'Ceramic Pour-Over Kit',
    description: 'Professional grade coffee brewing set for the ultimate morning ritual.',
    price: 45.00,
    category: Category.HOME,
    image: 'https://images.unsplash.com/photo-1544200175-ca6e80a7b325?auto=format&fit=crop&q=80&w=800',
    stock: 30,
    rating: 4.9
  },
  {
    id: '4',
    name: 'Glow Skin Serum',
    description: 'Hydrating face serum with Vitamin C and hyaluronic acid for radiant skin.',
    price: 65.00,
    category: Category.BEAUTY,
    image: 'https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&q=80&w=800',
    stock: 50,
    rating: 4.5
  },
  {
    id: '5',
    name: 'Ergonomic Desk Chair',
    description: 'Adjustable lumbar support and breathable mesh for all-day comfort.',
    price: 349.00,
    category: Category.HOME,
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
    stock: 8,
    rating: 4.7
  },
  {
    id: '6',
    name: 'Suede Chelsea Boots',
    description: 'Classic handcrafted boots made from premium Italian suede.',
    price: 210.00,
    category: Category.FASHION,
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800',
    stock: 12,
    rating: 4.4
  }
];

export const MOCK_USER: any = {
  id: 'user-1',
  name: 'Alex Rivera',
  email: 'alex@example.com',
  isAdmin: true,
  avatar: 'https://i.pravatar.cc/150?u=alex'
};
