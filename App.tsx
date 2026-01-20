
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import AdminDashboard from './components/AdminDashboard';
import AICustomerSupport from './components/AICustomerSupport';
import { INITIAL_PRODUCTS, MOCK_USER } from './constants';
import { Product, CartItem, User, Order } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'store' | 'admin' | 'orders'>('store');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(MOCK_USER); // Logged in as Admin by default for demo
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const checkout = () => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      userId: user?.id || 'guest',
      items: [...cart],
      total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: 'completed',
      date: new Date().toISOString()
    };
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setIsCartOpen(false);
    alert('Order placed successfully! Redirecting to orders...');
    setView('orders');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar 
        user={user} 
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        setView={setView}
        currentView={view}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {view === 'store' && (
          <div className="space-y-8">
            <header className="text-center space-y-2">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Discover Premium Tech & Lifestyle</h1>
              <p className="text-slate-500 max-w-2xl mx-auto">Handpicked essentials curated for the modern professional. Seamless, secure, and AI-driven.</p>
            </header>
            <ProductList products={filteredProducts} onAddToCart={addToCart} />
          </div>
        )}

        {view === 'admin' && user?.isAdmin && (
          <AdminDashboard products={products} orders={orders} />
        )}

        {view === 'orders' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Your Orders</h2>
            {orders.length === 0 ? (
              <div className="bg-white p-12 rounded-xl shadow-sm text-center">
                <p className="text-slate-500">You haven't placed any orders yet.</p>
                <button onClick={() => setView('store')} className="mt-4 text-blue-600 font-semibold hover:underline">Start Shopping</button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-slate-400 font-mono">{order.id}</p>
                      <p className="font-semibold">{order.items.length} items</p>
                      <p className="text-xs text-slate-500">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">${order.total.toFixed(2)}</p>
                      <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full font-medium">
                        {order.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateQuantity}
        onCheckout={checkout}
      />

      <AICustomerSupport products={products} />

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} E-Commerce Hub. Powered by Gemini AI.
        </div>
      </footer>
    </div>
  );
};

export default App;
