
import { Product, Order, User } from '../types';

/**
 * PRO-TIP: This service is structured to easily switch to your Python/FastAPI backend.
 * Replace the mock logic with: return await fetch(`${BASE_URL}/products`).then(r => r.json());
 */

const BASE_URL = 'http://localhost:8000/api'; // Standard Python Backend URL

export const ProductService = {
  async getAll(): Promise<Product[]> {
    // Simulated fetch - replace with real API call to your Python server
    const { INITIAL_PRODUCTS } = await import('../constants');
    return INITIAL_PRODUCTS;
  },
  
  async search(query: string): Promise<Product[]> {
    const all = await this.getAll();
    return all.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }
};

export const OrderService = {
  async create(order: Partial<Order>): Promise<Order> {
    console.log("Posting to Python Backend /orders...", order);
    return { ...order, id: `ord-${Math.random().toString(36).substr(2, 9)}`, status: 'completed', date: new Date().toISOString() } as Order;
  }
};

export const AuthService = {
  async login(credentials: any): Promise<User> {
    console.log("Authenticating with Python/JWT...", credentials);
    const { MOCK_USER } = await import('../constants');
    return MOCK_USER;
  }
};
