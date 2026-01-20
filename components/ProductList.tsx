
import React from 'react';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <div key={product.id} className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
          <div className="relative h-64 overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-2 py-1 rounded-lg shadow-sm">
                ${product.price}
              </span>
            </div>
          </div>
          
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex justify-between items-start mb-2">
              <p className="text-[10px] uppercase tracking-widest text-blue-600 font-bold">{product.category}</p>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                <span className="text-xs font-semibold text-slate-500">{product.rating}</span>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{product.name}</h3>
            <p className="text-sm text-slate-500 mt-2 line-clamp-2">{product.description}</p>
            
            <div className="mt-auto pt-6 flex items-center justify-between">
              <span className={`text-[10px] font-bold ${product.stock > 10 ? 'text-green-500' : 'text-orange-500'}`}>
                {product.stock > 0 ? `${product.stock} IN STOCK` : 'OUT OF STOCK'}
              </span>
              <button 
                onClick={() => onAddToCart(product)}
                disabled={product.stock === 0}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 disabled:bg-slate-300 transition-colors active:scale-95 flex items-center gap-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
