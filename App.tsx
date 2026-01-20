
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import AdminDashboard from './components/AdminDashboard';
import ProductDetailModal from './components/ProductDetailModal';
import { LiveConcierge } from './components/LiveConcierge';
import { ProductService, OrderService } from './services/api';
import { Product, CartItem, User, Order } from './types';
import { INITIAL_PRODUCTS, MOCK_USER } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'store' | 'admin' | 'orders' | 'auth'>('store');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Detail View State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product, size?: string) => {
    setCart(prev => {
      const cartId = size ? `${product.id}-${size}` : product.id;
      const exists = prev.find(i => (i.selectedSize ? `${i.id}-${i.selectedSize}` : i.id) === cartId);
      
      if (exists) {
        return prev.map(i => (i.selectedSize ? `${i.id}-${i.selectedSize}` : i.id) === cartId 
          ? { ...i, quantity: i.quantity + 1 } 
          : i
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    setIsCartOpen(true);
    setSelectedProduct(null); // Close modal on add
  };

  const handleCheckout = async () => {
    const newOrder = await OrderService.create({
      items: cart,
      userId: user?.id || 'guest',
      total: cart.reduce((s, i) => s + (i.price * i.quantity), 0)
    });
    setOrders([newOrder, ...orders]);
    setCart([]);
    setIsCartOpen(false);
    setView('orders');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={user} 
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        setView={setView}
        currentView={view}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-grow container mx-auto px-6 py-12 max-w-7xl">
        {view === 'store' && (
          <div className="space-y-16">
            <div className="relative rounded-[2.5rem] overflow-hidden h-[500px] flex items-center px-12 text-white bg-slate-900 group">
               <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
               <div className="relative z-10 max-w-2xl space-y-8">
                 <span className="text-xs font-bold tracking-[0.4em] text-indigo-400 uppercase">Season 2025</span>
                 <h1 className="text-7xl font-black tracking-tighter leading-[0.9] drop-shadow-2xl">
                   Elegance <br/>Redefined.
                 </h1>
                 <p className="text-xl text-slate-200 max-w-lg leading-relaxed">
                   A masterclass in modern luxury. Explore the curated Essentials Collection.
                 </p>
                 <button className="bg-white text-slate-900 hover:bg-indigo-600 hover:text-white px-10 py-5 rounded-2xl font-black transition-all shadow-2xl flex items-center gap-4 group">
                    View Lookbook
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                 </button>
               </div>
            </div>
            
            <section>
               <div className="flex items-end justify-between mb-12">
                 <div>
                   <h2 className="text-4xl font-black text-slate-900 tracking-tight">Curated Pieces</h2>
                   <p className="text-slate-500 mt-2">Discover the standard of high-end essentials.</p>
                 </div>
                 <div className="flex gap-4">
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                      <button className="px-4 py-2 text-sm font-bold bg-white shadow-sm rounded-lg text-slate-900">All</button>
                      <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900">Mens</button>
                      <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-900">Womens</button>
                    </div>
                 </div>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                  {filteredProducts.map(product => (
                    <div 
                      key={product.id} 
                      onClick={() => setSelectedProduct(product)}
                      className="group cursor-pointer"
                    >
                      <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-100 mb-6">
                        <img 
                          src={product.image} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <span className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform">
                             Quick View
                           </span>
                        </div>
                        <div className="absolute top-6 left-6">
                           <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                             {product.category}
                           </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                          <p className="text-slate-400 text-sm mt-1">{product.category}</p>
                        </div>
                        <p className="text-lg font-black text-slate-900">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </section>
          </div>
        )}

        {view === 'admin' && <AdminDashboard products={products} orders={orders} />}

        {view === 'orders' && (
           <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-500">
             <div className="text-center mb-12">
               <h2 className="text-5xl font-black tracking-tight mb-4">Your Boutique Orders</h2>
               <p className="text-slate-500">Track your premium acquisitions and style history.</p>
             </div>
             {orders.length === 0 ? (
               <div className="bg-white p-16 rounded-[2.5rem] border border-slate-100 text-center space-y-4">
                 <p className="text-slate-400 font-medium">No order history found.</p>
                 <button onClick={() => setView('store')} className="text-indigo-600 font-black hover:underline">Return to Gallery</button>
               </div>
             ) : (
               orders.map(order => (
                 <div key={order.id} className="bg-white p-8 rounded-[2rem] border border-slate-100 flex justify-between items-center group hover:border-indigo-200 transition-all shadow-sm hover:shadow-xl">
                   <div className="flex gap-6 items-center">
                      <div className="h-16 w-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xl">H.</div>
                      <div>
                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">Order Confirmed</p>
                        <p className="font-black text-2xl text-slate-900">{order.id}</p>
                        <p className="text-sm text-slate-400">{new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                   </div>
                   <div className="text-right">
                     <p className="text-2xl font-black text-slate-900">${order.total.toFixed(2)}</p>
                     <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{order.items.length} PIECES</p>
                   </div>
                 </div>
               ))
             )}
           </div>
        )}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={id => setCart(cart.filter(i => (i.selectedSize ? `${i.id}-${i.selectedSize}` : i.id) !== id))}
        onUpdateQty={(id, d) => setCart(cart.map(i => (i.selectedSize ? `${i.id}-${i.selectedSize}` : i.id) === id ? {...i, quantity: Math.max(1, i.quantity + d)} : i))}
        onCheckout={handleCheckout}
      />

      <ProductDetailModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={addToCart}
      />

      <LiveConcierge products={products} />

      <footer className="bg-white border-t py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="space-y-6">
               <h3 className="text-3xl font-black tracking-tighter">HUB<span className="text-indigo-600">.</span></h3>
               <p className="text-sm text-slate-400 leading-relaxed">Defining the digital luxury experience through minimal aesthetics and intelligent commerce.</p>
               <div className="flex gap-4">
                 <div className="w-8 h-8 bg-slate-100 rounded-full"></div>
                 <div className="w-8 h-8 bg-slate-100 rounded-full"></div>
                 <div className="w-8 h-8 bg-slate-100 rounded-full"></div>
               </div>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-8 uppercase tracking-[0.2em] text-xs">Collections</h4>
              <ul className="text-sm text-slate-500 space-y-4">
                <li className="hover:text-indigo-600 transition-colors cursor-pointer">Essentials</li>
                <li className="hover:text-indigo-600 transition-colors cursor-pointer">Outerwear</li>
                <li className="hover:text-indigo-600 transition-colors cursor-pointer">Leather Goods</li>
                <li className="hover:text-indigo-600 transition-colors cursor-pointer">Footwear</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-8 uppercase tracking-[0.2em] text-xs">Assistance</h4>
              <ul className="text-sm text-slate-500 space-y-4">
                <li className="hover:text-indigo-600 transition-colors cursor-pointer">AI Concierge</li>
                <li className="hover:text-indigo-600 transition-colors cursor-pointer">Shipping Policy</li>
                <li className="hover:text-indigo-600 transition-colors cursor-pointer">Returns</li>
                <li className="hover:text-indigo-600 transition-colors cursor-pointer">Size Guide</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-8 uppercase tracking-[0.2em] text-xs">Mailing List</h4>
              <p className="text-xs text-slate-400 mb-4">Access exclusive drops and AI-curated looks.</p>
              <div className="flex border-b border-slate-200 pb-2">
                <input type="email" placeholder="email@address.com" className="bg-transparent text-sm w-full outline-none" />
                <button className="text-indigo-600 font-bold text-xs uppercase">Join</button>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <p>© 2025 HUB. BOUTIQUE INTERNATIONAL</p>
            <div className="flex gap-8">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Accessibility</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
