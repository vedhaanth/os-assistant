import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { Navigate, Link } from 'react-router-dom';
import { getAllOrders } from '../services/orderService';
import { TrendingUp, Users, DollarSign, Package, LayoutDashboard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ADMIN_EMAIL } from '../constants/config';

export default function AdminReports() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    activeUsers: 842, // Mock total users
    avgOrderValue: 0
  });
  const [loading, setLoading] = useState(true);

  // Basic admin check
  const isAdmin = user && user.email === ADMIN_EMAIL;

  useEffect(() => {
    if (isAdmin) {
      calculateStats();
    }
  }, [isAdmin]);

  const calculateStats = async () => {
    setLoading(true);
    const orders = await getAllOrders();
    
    if (orders.length === 0) {
      // Keep placeholder logic for empty DB in demo
      setStats({
        totalSales: 4120,
        totalOrders: 4,
        activeUsers: 842,
        avgOrderValue: 1030
      });
    } else {
      const totalSales = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
      const totalOrders = orders.length;
      
      // Calculate unique users who placed orders
      const uniqueEmails = new Set(orders.map(o => o.userEmail));
      
      setStats({
        totalSales,
        totalOrders,
        activeUsers: uniqueEmails.size + 800, // Combine real + base mock for scale
        avgOrderValue: Math.round(totalSales / totalOrders)
      });
    }
    setLoading(false);
  };

  if (!user || !isAdmin) {
    return <Navigate to="/admin" />;
  }

  const cards = [
    { name: 'Total Revenue', value: `₹${stats.totalSales}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50', trend: '+12.5%', isUp: true },
    { name: 'Total Orders', value: stats.totalOrders, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+5.2%', isUp: true },
    { name: 'Active Customers', value: stats.activeUsers, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50', trend: '-2.1%', isUp: false },
    { name: 'Avg. Order Value', value: `₹${stats.avgOrderValue}`, icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50', trend: '+8.4%', isUp: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 border-none m-0 p-0">Sales Analytics</h1>
          <p className="mt-2 text-sm text-gray-600 font-medium">Insights and business performance metrics.</p>
        </div>
        <Link to="/admin" className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium">
          <LayoutDashboard className="h-5 w-5" /> Back to Products
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-100 rounded-xl"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div key={card.name} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition hover:shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.bg} p-2 rounded-lg`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
                <div className={`flex items-center text-xs font-bold ${card.isUp ? 'text-green-600' : 'text-red-600'}`}>
                  {card.isUp ? <ArrowUpRight className="h-4 w-4 mr-0.5" /> : <ArrowDownRight className="h-4 w-4 mr-0.5" />}
                  {card.trend}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-500">{card.name}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Placeholder for Charts */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-80 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-none m-0 p-0">Weekly Revenue</h3>
          <div className="flex-grow flex items-end justify-between gap-2 px-2">
            {[40, 60, 45, 90, 75, 50, 85].map((h, i) => (
              <div key={i} className="flex flex-col items-center flex-1">
                <div className="w-full bg-green-100 rounded-t hover:bg-green-500 transition cursor-pointer relative group" style={{ height: `${h}%` }}>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">₹{h * 100}</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-2 uppercase">Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-80">
          <h3 className="text-lg font-bold text-gray-900 mb-6 border-none m-0 p-0">Popular Categories</h3>
          <div className="space-y-4 pt-4">
            {[
              { name: 'Spices', percent: 45, color: 'bg-green-500' },
              { name: 'Honey', percent: 30, color: 'bg-blue-500' },
              { name: 'Dry Fruits', percent: 15, color: 'bg-purple-500' },
              { name: 'Oils', percent: 10, color: 'bg-orange-500' }
            ].map(cat => (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{cat.name}</span>
                  <span className="text-gray-500">{cat.percent}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className={`${cat.color} h-2 rounded-full`} style={{ width: `${cat.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
