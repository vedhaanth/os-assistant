import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import OrderDetailsModal from '../components/OrderDetailsModal';
import { ADMIN_EMAIL } from '../constants/config';

export default function Profile() {
  const { user, loading: authLoading } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    setLoading(true);
    const data = await getUserOrders(user.uid);
    setOrders(data);
    setLoading(false);
  };

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-sage-hint/10">
      <div className="h-12 w-12 border-4 border-sage-mint border-t-sage-evergreen rounded-full animate-spin" />
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'shipped': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
        {/* Sidebar / User Info */}
        <aside className="lg:col-span-4 mb-8 lg:mb-0">
          <div className="bg-white rounded-[2rem] shadow-xl shadow-sage/5 border border-sage-mint/30 p-8 sticky top-24">
            <div className="text-center">
              <div className="h-28 w-28 bg-sage-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-sage/10 relative group">
                <User className="h-14 w-14 text-white drop-shadow-sm" />
                <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-xl shadow-md border border-sage-mint">
                  <Package className="h-4 w-4 text-sage-moss" />
                </div>
              </div>
              <h2 className="text-2xl font-black text-gray-900 border-none m-0 pt-0 tracking-tight">{user.displayName || 'Nature Enthusiast'}</h2>
              <p className="text-sm text-sage-moss font-bold flex items-center justify-center gap-1 mt-2 uppercase tracking-widest opacity-70">
                <Mail className="h-3.5 w-3.5" /> {user.email}
              </p>
            </div>

            <div className="mt-10 space-y-5 pt-8 border-t border-sage-mint/20">
              <div className="flex items-center gap-4 p-4 bg-sage-hint/10 rounded-2xl border border-transparent hover:border-sage-mint transition">
                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <ShoppingBag className="h-5 w-5 text-sage-evergreen" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-sage-moss uppercase tracking-widest">Total Orders</p>
                  <p className="text-lg font-bold text-gray-900">{orders.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-sage-hint/10 rounded-2xl border border-transparent hover:border-sage-mint transition">
                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Calendar className="h-5 w-5 text-sage-evergreen" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-sage-moss uppercase tracking-widest">Joined On</p>
                  <p className="text-lg font-bold text-gray-900">
                    {user.creationTime ? new Date(user.creationTime).toLocaleDateString() : 'Mar 19, 2026'}
                  </p>
                </div>
              </div>
            </div>

            {user.email === ADMIN_EMAIL && (
              <div className="mt-8 pt-8 border-t border-sage-mint/20">
                <Link 
                  to="/admin" 
                  className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-sage/20"
                >
                  <ShieldX className="h-5 w-5" />
                  Admin Dashboard
                </Link>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content / Order History */}
        <main className="lg:col-span-8">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-4xl font-black text-gray-900 border-none m-0 pt-0 tracking-tighter uppercase">Order History</h1>
          </div>

          {loading ? (
            <div className="space-y-6 animate-pulse">
              {[1, 2, 3].map(i => <div key={i} className="h-44 bg-sage-hint/10 rounded-[2rem]"></div>)}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-sage-mint p-16 text-center shadow-inner bg-sage-hint/5">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-sage-mint">
                <ShoppingBag className="h-10 w-10 text-sage-mint" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tight">No orders yet</h3>
              <p className="text-sage-moss font-medium mb-8 max-w-xs mx-auto">Explore our natural collection and start your wellness journey today.</p>
              <Link to="/" className="btn-primary px-10 py-4 rounded-2xl shadow-xl shadow-sage/30">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-[2rem] border border-sage-mint/30 shadow-xl shadow-sage/5 overflow-hidden hover:shadow-2xl hover:border-sage-evergreen/30 transition-all duration-500 group">
                  <div className="bg-sage-gradient/50 p-6 sm:px-8 flex flex-wrap items-center justify-between gap-6 border-b border-sage-mint/20">
                    <div className="flex items-center gap-10">
                      <div>
                        <p className="text-[10px] font-black text-sage-moss uppercase tracking-widest mb-1 opacity-60">Order Reference</p>
                        <p className="text-sm font-black text-gray-900 group-hover:text-sage-evergreen transition-colors">{order.id.toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-sage-moss uppercase tracking-widest mb-1 opacity-60">Placed Date</p>
                        <p className="text-sm font-bold text-gray-700">
                          {new Date(order.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-sage-moss uppercase tracking-widest mb-1 opacity-60">Total Value</p>
                        <p className="text-sm font-black text-sage-evergreen">₹{order.totalAmount}</p>
                      </div>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black border uppercase tracking-widest ${getStatusStyle(order.status)} shadow-sm`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-4 overflow-hidden py-1">
                        {order.items.slice(0, 5).map((item, idx) => (
                          <div key={idx} className="relative inline-block h-16 w-16 rounded-[1.25rem] ring-4 ring-white shadow-md overflow-hidden bg-white">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-full w-full object-cover grayscale-[0.2] hover:grayscale-0 transition" 
                              title={item.name}
                            />
                          </div>
                        ))}
                        {order.items.length > 5 && (
                          <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-[1.25rem] bg-sage-hint text-xs font-black text-sage-evergreen ring-4 ring-white shadow-md">
                            +{order.items.length - 5}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="hidden sm:block mb-4">
                          <p className="text-[10px] font-black text-sage-moss uppercase tracking-widest mb-1 opacity-60 text-right">Delivery To</p>
                          <p className="text-xs font-bold text-gray-700 flex items-center justify-end gap-1.5">
                            <MapPin className="h-3.5 w-3.5 text-sage-evergreen" /> {order.shippingAddress.city}
                          </p>
                        </div>
                        <button 
                          onClick={() => { setSelectedOrder(order); setIsModalOpen(true); }}
                          className="h-12 px-6 bg-sage-hint/10 border-2 border-sage-mint/30 rounded-xl text-sage-evergreen hover:bg-sage-evergreen hover:text-white hover:border-sage-evergreen text-sm font-black flex items-center gap-2 transition-all duration-300"
                        >
                          Details <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <OrderDetailsModal 
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
