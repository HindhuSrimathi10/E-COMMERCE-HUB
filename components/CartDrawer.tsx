
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQty, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[120] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[130] shadow-2xl transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Shopping Bag</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{items.length} Items</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-white rounded-full transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-8 space-y-8">
          {items.length === 0 ? (
            <div className="text-center py-20 space-y-6">
              <div className="bg-slate-50 h-24 w-24 rounded-[2rem] flex items-center justify-center mx-auto text-slate-200">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="space-y-2">
                <p className="text-slate-900 font-black text-lg">Your bag is empty.</p>
                <p className="text-slate-400 text-sm">Discover the collection to find your perfect pieces.</p>
              </div>
              <button onClick={onClose} className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all">Start Shopping</button>
            </div>
          ) : (
            items.map(item => {
              const cartId = item.selectedSize ? `${item.id}-${item.selectedSize}` : item.id;
              return (
                <div key={cartId} className="flex gap-6 group animate-in slide-in-from-right-4 duration-300">
                  <div className="relative h-32 w-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
                    <img src={item.image} className="h-full w-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-grow flex flex-col justify-center">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.name}</h4>
                      <button onClick={() => onRemove(cartId)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      {item.selectedSize && (
                         <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase tracking-widest">
                           Size: {item.selectedSize}
                         </span>
                      )}
                      <span className="text-sm text-slate-400">${item.price.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-slate-100 rounded-xl px-1">
                        <button onClick={() => onUpdateQty(cartId, -1)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">-</button>
                        <span className="px-3 text-xs font-black text-slate-900">{item.quantity}</span>
                        <button onClick={() => onUpdateQty(cartId, 1)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">+</button>
                      </div>
                      <span className="font-black text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-8 border-t border-slate-100 space-y-6 bg-slate-50/50">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-slate-400 text-sm font-bold uppercase tracking-widest">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-slate-400 text-sm font-bold uppercase tracking-widest">
              <span>Delivery</span>
              <span className="text-green-600">Complimentary</span>
            </div>
          </div>
          <div className="flex justify-between items-center text-3xl font-black text-slate-900 border-t border-slate-200 pt-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95 disabled:bg-slate-200 disabled:shadow-none mt-4"
          >
            Checkout Securely
          </button>
          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Free shipping & 30-day premium returns
          </p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
