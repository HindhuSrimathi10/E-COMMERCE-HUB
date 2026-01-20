
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { getAIStylingTips } from '../services/geminiService';

interface Props {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (p: Product, size?: string) => void;
}

const ProductDetailModal: React.FC<Props> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [stylingTips, setStylingTips] = useState<string>('');
  const [loadingTips, setLoadingTips] = useState(false);

  useEffect(() => {
    if (product) {
      setLoadingTips(true);
      setSelectedSize(product.sizes?.[0] || '');
      getAIStylingTips(product).then(tips => {
        setStylingTips(tips);
        setLoadingTips(false);
      });
    } else {
      setStylingTips('');
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/50 backdrop-blur hover:bg-white rounded-full transition-all"
        >
          <svg className="w-6 h-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden bg-slate-100">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12 overflow-y-auto">
          <div className="mb-8">
            <span className="text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase mb-2 block">
              {product.category}
            </span>
            <h2 className="text-4xl font-black text-slate-900 leading-tight mb-4">
              {product.name}
            </h2>
            <p className="text-2xl font-light text-slate-500">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="space-y-8 flex-grow">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Description</h3>
              <p className="text-slate-500 leading-relaxed">
                {product.description}
              </p>
            </div>

            {product.sizes && (
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`h-12 w-12 flex items-center justify-center rounded-xl border-2 font-bold transition-all ${
                        selectedSize === size 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-600' 
                          : 'border-slate-100 hover:border-slate-300 text-slate-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                AI Styling Assistant
              </h3>
              {loadingTips ? (
                <div className="animate-pulse space-y-2">
                  <div className="h-3 bg-slate-200 rounded w-full"></div>
                  <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-3 bg-slate-200 rounded w-4/6"></div>
                </div>
              ) : (
                <div className="text-sm text-slate-600 leading-relaxed prose prose-indigo">
                  {stylingTips}
                </div>
              )}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100">
            <button 
              onClick={() => onAddToCart(product, selectedSize)}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              Add to Bag — ${product.price.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
