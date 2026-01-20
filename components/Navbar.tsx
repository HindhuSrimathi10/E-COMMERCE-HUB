
import React from 'react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  cartCount: number;
  onCartClick: () => void;
  setView: (v: 'store' | 'admin' | 'orders') => void;
  currentView: string;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, cartCount, onCartClick, setView, currentView, searchQuery, setSearchQuery }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setView('store')}
            className="text-2xl font-black text-slate-900 tracking-tighter"
          >
            HUB<span className="text-blue-600">.</span>
          </button>
          
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setView('store')}
              className={`text-sm font-medium transition-colors ${currentView === 'store' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Shop
            </button>
            <button 
              onClick={() => setView('orders')}
              className={`text-sm font-medium transition-colors ${currentView === 'orders' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              My Orders
            </button>
            {user?.isAdmin && (
              <button 
                onClick={() => setView('admin')}
                className={`text-sm font-medium transition-colors ${currentView === 'admin' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Dashboard
              </button>
            )}
          </div>
        </div>

        <div className="flex-grow max-w-md mx-8 hidden sm:block">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute right-4 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onCartClick}
            className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          {user && (
            <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-none">{user.name}</p>
                <p className="text-[10px] text-slate-400">{user.isAdmin ? 'Admin' : 'Customer'}</p>
              </div>
              <img src={user.avatar} className="h-8 w-8 rounded-full border border-slate-200" alt="avatar" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
