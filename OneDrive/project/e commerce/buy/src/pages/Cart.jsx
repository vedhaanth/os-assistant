import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Trash2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getCartTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any natural products yet.</p>
        <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition">
          <ArrowLeft className="mr-2 h-5 w-5" /> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-none m-0 pt-0">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-8">
          <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {items.map((item) => (
              <li key={item.id} className="flex py-6 sm:py-10 border-none m-0 pt-0">
                <div className="flex-shrink-0">
                  <img
                    src={item.image || 'https://via.placeholder.com/200'}
                    alt={item.name}
                    className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32 shadow-sm"
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-lg font-medium text-gray-900 hover:text-green-600 transition border-none m-0 pt-0">
                          <Link to={`/product/${item.id}`}>{item.name}</Link>
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      <p className="mt-2 text-base font-medium text-gray-900">₹{item.price}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9 flex items-start sm:justify-end">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                        >-</button>
                        <span className="px-3 py-1 font-semibold border-l border-r border-gray-300 min-w-[2.5rem] text-center bg-white">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                          disabled={item.quantity >= item.stock}
                        >+</button>
                      </div>

                      <div className="absolute top-0 right-0">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500 transition"
                        >
                          <span className="sr-only">Remove</span>
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order summary */}
        <section className="mt-16 bg-white rounded-lg shadow-sm px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-4 border border-gray-200">
          <h2 className="text-lg font-medium text-gray-900 mb-6 border-none m-0 pt-0">Order Summary</h2>
          
          <dl className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <dt className="text-gray-600">Subtotal</dt>
              <dd className="font-medium text-gray-900">₹{getCartTotal()}</dd>
            </div>
            <div className="flex items-center justify-between text-sm border-t border-gray-200 pt-4 m-0">
              <dt className="text-gray-600">Shipping</dt>
              <dd className="font-medium text-green-600">Free</dd>
            </div>
            <div className="flex items-center justify-between text-base font-medium text-gray-900 border-t border-gray-200 pt-4 border-none mt-2">
              <dt>Total</dt>
              <dd className="text-xl font-bold">₹{getCartTotal()}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <Link
              to="/checkout"
              className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex justify-center items-center transition"
            >
              Checkout <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
