
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
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-[60] shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-xl font-bold">Your Bag</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="bg-slate-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto text-slate-300">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-slate-500 font-medium">Your bag is empty.</p>
              <button onClick={onClose} className="text-blue-600 font-bold">Start Shopping</button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <img src={item.image} className="h-24 w-24 rounded-xl object-cover border border-slate-100" alt={item.name} />
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-slate-900">{item.name}</h4>
                    <button onClick={() => onRemove(item.id)} className="text-slate-300 hover:text-red-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-slate-500">${item.price}</p>
                  <div className="mt-auto flex items-center gap-3">
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="px-2 py-1 bg-slate-50 hover:bg-slate-100">-</button>
                      <span className="px-3 text-xs font-bold w-8 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="px-2 py-1 bg-slate-50 hover:bg-slate-100">+</button>
                    </div>
                    <span className="text-sm font-bold text-slate-900 ml-auto">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-slate-100 space-y-4 bg-slate-50/50">
          <div className="flex justify-between items-center text-slate-500">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-slate-500">
            <span>Shipping</span>
            <span className="text-green-500 font-medium">Free</span>
          </div>
          <div className="flex justify-between items-center text-xl font-bold text-slate-900 border-t border-slate-200 pt-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95 disabled:bg-slate-300 disabled:shadow-none mt-2"
          >
            Complete Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
