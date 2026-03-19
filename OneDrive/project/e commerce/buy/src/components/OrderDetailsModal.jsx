import React from 'react';
import { X, Package, MapPin, Calendar, CreditCard, ShoppingBag, ShieldCheck } from 'lucide-react';

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl shadow-black/20 overflow-hidden animate-zoom-in max-h-[90vh] flex flex-col border border-white/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 sm:p-8 bg-sage-gradient text-white flex items-center justify-between overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl animate-pulse"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-5 w-5 opacity-80" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Order Details</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight border-none m-0 pt-0 uppercase">{order.id}</h2>
          </div>
          <button 
            onClick={onClose}
            className="relative z-10 p-2 hover:bg-white/20 rounded-full transition-colors duration-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
          {/* Status & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-sage-hint/10 p-4 rounded-2xl border border-sage-mint/20">
              <div className="flex items-center gap-2 mb-1 opacity-60">
                <Clock className="h-3.5 w-3.5 text-sage-evergreen" />
                <span className="text-[10px] font-black uppercase tracking-widest">Status</span>
              </div>
              <p className="text-sm font-black text-sage-evergreen uppercase tracking-widest">{order.status}</p>
            </div>
            <div className="bg-sage-hint/10 p-4 rounded-2xl border border-sage-mint/20">
              <div className="flex items-center gap-2 mb-1 opacity-60">
                <Calendar className="h-3.5 w-3.5 text-sage-evergreen" />
                <span className="text-[10px] font-black uppercase tracking-widest">Placed On</span>
              </div>
              <p className="text-sm font-bold text-gray-900">
                {new Date(order.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-sage-evergreen" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-sage-moss">Shipping Address</h3>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-sage-mint/30 shadow-sm border-l-4 border-l-sage-evergreen">
              <p className="font-bold text-gray-900 mb-1">{order.shippingAddress.fullName}</p>
              <p className="text-sm text-sage-moss font-medium leading-relaxed">
                {order.shippingAddress.address}<br />
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                Phone: {order.shippingAddress.phone}
              </p>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag className="h-4 w-4 text-sage-evergreen" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-sage-moss">Order Items</h3>
            </div>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 bg-sage-hint/5 rounded-2xl border border-sage-mint/10 hover:border-sage-mint transition-colors">
                  <div className="h-16 w-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-black text-gray-900 truncate uppercase tracking-tight">{item.name}</h4>
                    <p className="text-xs font-bold text-sage-moss opacity-70">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-sage-evergreen">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Info */}
          <div className="pt-6 border-t border-sage-mint/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-sage-moss" />
                <span className="text-xs font-black uppercase tracking-widest text-sage-moss opacity-70">Payment Method</span>
              </div>
              <span className="text-sm font-bold text-gray-900 uppercase">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}</span>
            </div>
            {order.paymentDetails?.razorpay_payment_id && (
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-sage-moss opacity-50">Transaction ID</span>
                <span className="text-[10px] font-mono font-bold text-gray-500">{order.paymentDetails.razorpay_payment_id}</span>
              </div>
            )}
            
            <div className="mt-6 flex items-center justify-between p-6 bg-sage-gradient rounded-2xl text-white shadow-xl shadow-sage/20">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-black uppercase tracking-tighter">Total Amount</span>
              </div>
              <span className="text-2xl font-black">₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 sm:p-8 bg-gray-50 flex justify-center">
          <button 
            onClick={onClose}
            className="px-12 py-4 bg-white border-2 border-sage-mint rounded-2xl text-sage-evergreen font-black text-sm uppercase tracking-widest hover:bg-sage-evergreen hover:text-white hover:border-sage-evergreen transition-all duration-300 shadow-md transform hover:-translate-y-1 active:translate-y-0"
          >
            Close Summary
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple icon for clock since it's missing in imports above
const Clock = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default OrderDetailsModal;
