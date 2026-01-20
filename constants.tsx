
import { Category, Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Over-sized Wool Coat',
    description: 'A masterpiece of minimalism. Hand-stitched from 100% premium merino wool with a relaxed, modern silhouette.',
    price: 495.00,
    category: Category.OUTERWEAR,
    image: 'https://images.unsplash.com/photo-1539533377285-b9242d93984d?auto=format&fit=crop&q=80&w=800',
    stock: 8,
    rating: 4.9,
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: '2',
    name: 'Heritage Leather Tote',
    description: 'Full-grain Italian leather that ages beautifully. Features gold-toned hardware and a spacious suede interior.',
    price: 320.00,
    category: Category.ACCESSORIES,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    stock: 12,
    rating: 4.8
  },
  {
    id: '3',
    name: 'Brushed Suede Chelsea',
    description: 'Classic silhouette meet modern comfort. Features a Goodyear-welted sole and water-resistant finish.',
    price: 260.00,
    category: Category.FOOTWEAR,
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800',
    stock: 15,
    rating: 4.7,
    sizes: ['8', '9', '10', '11', '12']
  },
  {
    id: '4',
    name: 'Silk Blend Midi Dress',
    description: 'Flowing elegance for any occasion. A delicate silk-viscose blend with a subtle matte finish.',
    price: 215.00,
    category: Category.FASHION,
    image: 'https://images.unsplash.com/photo-1539109132374-348214a3c33b?auto=format&fit=crop&q=80&w=800',
    stock: 5,
    rating: 4.6,
    sizes: ['XS', 'S', 'M', 'L']
  },
  {
    id: '5',
    name: 'Signature Cotton Tee',
    description: 'The foundation of a great wardrobe. 280GSM heavy-weight cotton with a structured boxy fit.',
    price: 65.00,
    category: Category.FASHION,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    stock: 40,
    rating: 4.9,
    sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: '6',
    name: 'Aviator Gold Frames',
    description: 'Handcrafted acetate and 18k gold-plated titanium. Superior UV protection with a timeless aesthetic.',
    price: 185.00,
    category: Category.ACCESSORIES,
    image: 'https://images.unsplash.com/photo-1511499767010-a588a512f92a?auto=format&fit=crop&q=80&w=800',
    stock: 20,
    rating: 4.5
  }
];

export const MOCK_USER: any = {
  id: 'user-1',
  name: 'Alex Rivera',
  email: 'alex@example.com',
  isAdmin: true,
  avatar: 'https://i.pravatar.cc/150?u=alex'
};
