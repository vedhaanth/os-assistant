import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCartStore();
  const imageUrl = product.image || 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80';

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col h-full group">
      <Link to={`/product/${product.id}`}>
        {/* Product Image */}
        <div className="relative group overflow-hidden">
          <img 
            src={imageUrl} 
            alt={product.name} 
            className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-1000"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80';
            }}
          />
          {/* Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-white/90 backdrop-blur-md text-sage-evergreen text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg border border-white/20">New Launch</span>
          </div>

          {/* Quick View Overlay (Requested Style) */}
          <div className="absolute inset-x-0 bottom-0 top-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500 cursor-pointer flex flex-col justify-end">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="w-full py-4 bg-white/90 backdrop-blur-md text-gray-900 font-bold text-sm uppercase tracking-[0.2em] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 hover:bg-sage-evergreen hover:text-white"
            >
              Quick View
            </button>
          </div>
          
          {product.stock === 0 && (
            <div className="absolute top-4 right-4 z-10 bg-red-500/90 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">Out of Stock</div>
          )}
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-green-600 font-semibold mb-1 uppercase tracking-wider">{product.category || 'General'}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-green-600 transition">{product.name}</h3>
        </Link>
        
        <div className="mt-auto flex items-end justify-between pt-4">
          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          <button 
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="bg-green-50 p-2.5 rounded-full text-green-600 hover:bg-green-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm active:scale-95"
            title="Add to Cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
