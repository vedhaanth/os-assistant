import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useLocation } from 'react-router-dom';
import { createOrder } from '../services/orderService';
import { initiateRazorpayPayment } from '../services/paymentService';
import { CheckCircle, AlertCircle, CreditCard, Banknote, Lock } from 'lucide-react';

export default function Checkout() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [transactionId, setTransactionId] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  if (items.length === 0 && !success) {
    navigate('/cart');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: location } });
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: getCartTotal(),
        shippingAddress: formData,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
        paymentMethod: paymentMethod
      };

      if (paymentMethod === 'razorpay') {
        const response = await initiateRazorpayPayment({
          amount: getCartTotal(),
          customerName: formData.fullName,
          customerEmail: user.email,
          customerPhone: formData.phone,
          onSuccess: async (res) => {
            const id = await createOrder({
              ...orderData,
              paymentDetails: {
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_order_id: res.razorpay_order_id
              }
            });
            setTransactionId(res.razorpay_payment_id);
            setOrderNumber(id);
            clearCart();
            setSuccess(true);
          },
          onFailure: (err) => {
            setError('Payment failed: ' + (err?.description || err?.reason || 'Unknown error'));
            setLoading(false);
          }
        });
      } else {
        // Cash on Delivery
        const id = await createOrder(orderData);
        setOrderNumber(id);
        clearCart();
        setSuccess(true);
      }
    } catch (err) {
      console.error('Error placing order:', err);
      if (err.message !== 'Payment cancelled') {
        setError('Failed to place order. Please try again.');
      }
    } finally {
      if (paymentMethod === 'cod') {
        setLoading(false);
      }
    }
  };

  if (success) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-green-100 rounded-full animate-ping opacity-20"></div>
          </div>
          <CheckCircle className="relative mx-auto h-20 w-20 text-green-500 mb-6" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-none m-0 pt-0">Order Placed Successfully!</h2>
        <p className="text-lg text-gray-600 mb-4 border-none">Thank you for trusting Jaggy. Your Ayurvedic products will be delivered soon.</p>
        {transactionId && (
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2 mb-6">
            <Lock className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-800 font-mono">Transaction: {transactionId}</span>
          </div>
        )}
        <div className="mt-4">
          <Link to="/" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition shadow-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-none m-0 pt-0">Checkout</h1>
      
      {error && (
        <div className="mb-6 bg-red-50 p-4 rounded-md flex items-center text-red-800 border border-red-200">
          <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
          <p className="border-none m-0">{error}</p>
        </div>
      )}

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-7">
          <form onSubmit={placeOrder} className="space-y-8">
            {/* Shipping Info */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-medium text-gray-900 mb-6 border-none m-0 pt-0">Shipping Information</h2>
              
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-green-500 focus:border-green-500 shadow-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-green-500 focus:border-green-500 shadow-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea required name="address" rows="3" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-green-500 focus:border-green-500 shadow-sm"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input required type="text" name="city" value={formData.city} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-green-500 focus:border-green-500 shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input required type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2.5 focus:ring-green-500 focus:border-green-500 shadow-sm" />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-medium text-gray-900 mb-6 border-none m-0 pt-0">Payment Method</h2>
              <div className="space-y-3">
                {/* COD Option */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-green-500 bg-green-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  id="payment-cod"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <Banknote className={`h-6 w-6 ${paymentMethod === 'cod' ? 'text-green-600' : 'text-gray-400'}`} />
                  <div>
                    <p className={`font-medium ${paymentMethod === 'cod' ? 'text-green-800' : 'text-gray-700'}`}>Cash on Delivery</p>
                    <p className="text-xs text-gray-500 mt-0.5">Pay when your order arrives</p>
                  </div>
                </label>

                {/* Razorpay Option */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'razorpay'
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  id="payment-razorpay"
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="razorpay"
                    checked={paymentMethod === 'razorpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <CreditCard className={`h-6 w-6 ${paymentMethod === 'razorpay' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${paymentMethod === 'razorpay' ? 'text-blue-800' : 'text-gray-700'}`}>Pay Online</p>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Razorpay</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">UPI · Cards · Net Banking · Wallets</p>
                  </div>
                  <Lock className="h-4 w-4 text-gray-400" />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full border border-transparent rounded-xl shadow-lg py-4 px-4 text-base font-semibold text-white transition disabled:opacity-50 flex items-center justify-center gap-2 ${
                  paymentMethod === 'razorpay'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                    : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                }`}
                id="place-order-btn"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Processing...
                  </span>
                ) : paymentMethod === 'razorpay' ? (
                  <><CreditCard className="h-5 w-5" /> Pay ₹{getCartTotal()} with Razorpay</>
                ) : (
                  <>Place Order · ₹{getCartTotal()}</>
                )}
              </button>
              {paymentMethod === 'razorpay' && (
                <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
                  <Lock className="h-3 w-3" /> Secured by Razorpay · Test Mode
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Order summary */}
        <div className="mt-10 lg:mt-0 lg:col-span-5 bg-white shadow-sm rounded-lg p-6 border border-gray-200 lg:sticky lg:top-24">
          <h2 className="text-lg font-medium text-gray-900 mb-6 border-none m-0 pt-0">Order Summary</h2>
          <ul className="divide-y divide-gray-200 mb-6 max-h-[40vh] overflow-y-auto pr-2">
            {items.map((item) => (
              <li key={item.id} className="py-4 flex">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover border border-gray-100" />
                <div className="ml-4 flex-1 flex flex-col justify-center">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium text-gray-900 ml-4 flex items-center">₹{item.price * item.quantity}</p>
              </li>
            ))}
          </ul>
          <dl className="space-y-4 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">₹{getCartTotal()}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm text-gray-600">Shipping</dt>
              <dd className="text-sm font-medium text-green-600">Free</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <dt className="text-base font-bold text-gray-900">Total</dt>
              <dd className="text-xl font-bold text-gray-900">₹{getCartTotal()}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
