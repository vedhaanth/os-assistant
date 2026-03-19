import React, { useState } from 'react';
import { X, ShoppingCart, Minus, Plus, ExternalLink } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Link } from 'react-router-dom';

export default function QuickViewModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-sage-evergreen hover:scale-110 transition-all duration-300 shadow-lg border border-gray-100"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Left: Image Section */}
        <div className="md:w-1/2 p-8 bg-sage-hint/5 flex flex-col items-center justify-center">
          <div className="relative group w-full aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-sage/20 border border-sage-mint/30">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80';
              }}
            />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-sage-evergreen"></div>
              <div className="w-2 h-2 rounded-full bg-sage-mint/50"></div>
              <div className="w-2 h-2 rounded-full bg-sage-mint/50"></div>
            </div>
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-2">
             <span className="text-xs font-black text-sage-evergreen uppercase tracking-[0.2em]">{product.category}</span>
          </div>
          
          <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-4 leading-tight">
            {product.name}
          </h2>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-4xl font-bold text-gray-900 tracking-tight">₹{product.price}</span>
            {product.stock > 0 ? (
              <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-100">
                In Stock
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-50 text-red-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-red-100">
                Out of Stock
              </span>
            )}
          </div>

          <div className="space-y-8">
            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-sage-moss uppercase tracking-widest ml-1">Quantity</label>
              <div className="flex items-center w-fit border-2 border-sage-mint/30 rounded-2xl p-1 bg-sage-hint/5">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-sage-evergreen hover:bg-white hover:rounded-xl hover:shadow-sm transition-all"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-black text-lg text-gray-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-3 text-sage-evergreen hover:bg-white hover:rounded-xl hover:shadow-sm transition-all"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-[#5D4E45] text-white py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-[#4A3D36] transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:translate-y-0"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>
              
              <Link 
                to={`/product/${product.id}`}
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 text-sage-evergreen font-bold text-sm hover:underline underline-offset-8 transition-all"
              >
                <span>View More Details</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
