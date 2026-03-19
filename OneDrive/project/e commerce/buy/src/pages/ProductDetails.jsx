import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useCartStore } from '../store/cartStore';
import { ShoppingCart, ArrowLeft, Truck, Shield, RotateCcw, Leaf } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  useEffect(() => {
    async function fetchProduct() {
      const data = await getProductById(id);
      if (data) {
        setProduct(data);
      } else {
        // Mock fallback for UI evaluation if Firestore is empty
        const mockMap = {
          '1': { id: '1', name: 'Premium Kashmiri Saffron', price: 950, category: 'Spices', stock: 15, description: 'Handpicked, pure Grade A saffron straight from the valleys of Kashmir. Excellent for biryanis, sweets, and healthy milk preparation.', image: 'https://images.unsplash.com/photo-1596502213702-86311cebc91d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          '2': { id: '2', name: 'Raw Wild Honey', price: 600, category: 'Honey', stock: 40, description: 'Pure, unprocessed honey collected directly from wild bees in deep forests. Rich in antioxidants and natural enzymes.', image: 'https://images.unsplash.com/photo-1587049352847-4d4b12fe34e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
          '3': { id: '3', name: 'Cold Pressed Virgin Coconut Oil', price: 420, category: 'Oils', stock: 25, description: 'Extracted using traditional cold-pressed methods without any heat or chemicals to retain maximum nutritional value.', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
        };
        setProduct(mockMap[id] || { id, name: 'Sample Product', price: 100, category: 'General', stock: 10, description: 'This is a sample description.', image: 'https://via.placeholder.com/800x600?text=Product+Image' });
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse"><div className="h-96 bg-gray-200 rounded-lg"></div></div>;
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Product not found.</h2>
        <Link to="/" className="text-green-600 hover:underline mt-4 inline-block">Return to Home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-green-600 mb-8 transition font-medium">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Products
      </Link>

      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        {/* Product Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-8 lg:mb-0">
          <img 
            src={product.image || 'https://via.placeholder.com/800x600'} 
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col border-none m-0 pt-0">
          <div className="mb-2">
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">{product.category}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 border-none m-0 mt-2 mb-4">
            {product.name}
          </h1>

          <div className="mb-6">
            <p className="text-3xl font-bold text-gray-900">₹{product.price}</p>
            <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>

          <div className="prose prose-sm text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <div className="flex items-center mb-6">
              <span className="font-semibold text-gray-900 mr-4">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                  disabled={product.stock === 0}
                >-</button>
                <span className="px-4 py-1 font-semibold border-l border-r border-gray-300">{quantity}</span>
                <button 
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                  disabled={product.stock === 0 || quantity >= product.stock}
                >+</button>
              </div>
              <span className="ml-4 text-sm text-gray-500">
                {product.stock > 0 ? `${product.stock} available` : <span className="text-red-500 font-bold">Out of stock</span>}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-green-600 border border-transparent rounded-lg shadow-sm py-4 px-8 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-green-500" />
              <span>Standard delivery in 3-5 days</span>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-500" />
              <span>Secure, encrypted payments</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-green-500" />
              <span>7-day easy returns</span>
            </div>
            <div className="flex items-center gap-3">
              <Leaf className="h-5 w-5 text-green-500" />
              <span>100% natural guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
