import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { Navigate, Link } from 'react-router-dom';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';
import { Plus, Edit, Trash2, ShieldX, AlertTriangle, Package, X } from 'lucide-react';
import { ADMIN_EMAIL } from '../constants/config';

const LOW_STOCK_THRESHOLD = 5;

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [alertDismissed, setAlertDismissed] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
    image: ''
  });

  const isAdmin = user && user.email === ADMIN_EMAIL;

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <ShieldX className="mx-auto h-20 w-20 text-red-500 mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4 border-none m-0 pt-0">Access Denied</h2>
        <p className="text-gray-600 mt-2 text-lg">You do not have administrative privileges to view this dashboard.</p>
        <p className="mt-4 text-sm bg-gray-100 inline-block px-4 py-2 rounded-md font-mono text-gray-700 font-semibold border border-gray-200">
          Demo Hint: Login with {ADMIN_EMAIL}
        </p>
      </div>
    );
  }

  const outOfStock = products.filter(p => p.stock === 0);
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= LOW_STOCK_THRESHOLD);
  const healthyStock = products.filter(p => p.stock > LOW_STOCK_THRESHOLD);
  const displayProducts = showLowStockOnly
    ? products.filter(p => p.stock <= LOW_STOCK_THRESHOLD)
    : products;

  const getStockBadge = (stock) => {
    if (stock === 0) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">Out of Stock</span>;
    if (stock <= LOW_STOCK_THRESHOLD) return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-700"><AlertTriangle className="h-3 w-3" /> Low: {stock}</span>;
    return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700"><Package className="h-3 w-3" /> {stock}</span>;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        stock: Number(formData.stock),
        description: formData.description,
        image: formData.image
      };

      if (editingId) {
        await updateProduct(editingId, productData);
      } else {
        await addProduct(productData);
      }
      
      setShowModal(false);
      fetchProducts();
      setFormData({ name: '', price: '', category: '', stock: '', description: '', image: '' });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product in standalone mode.");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
      description: product.description || '',
      image: product.image || ''
    });
    setEditingId(product.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 border-none m-0 pt-0">Admin Dashboard</h1>
          <div className="mt-2 flex items-center gap-4 text-sm font-medium">
            <Link to="/admin" className="text-green-600 border-b-2 border-green-600 pb-0.5">Products</Link>
            <Link to="/admin/orders" className="text-gray-500 hover:text-green-600 transition">Orders</Link>
            <Link to="/admin/reports" className="text-gray-500 hover:text-green-600 transition">Reports</Link>
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => {
              setFormData({ name: '', price: '', category: '', stock: '', description: '', image: '' });
              setEditingId(null);
              setShowModal(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none transition"
          >
            <Plus className="-ml-1 mr-2 h-5 w-5" />
            Add New Product
          </button>
        </div>
      </div>

      {(outOfStock.length > 0 || lowStock.length > 0) && !alertDismissed && (
        <div className={`mb-6 rounded-xl p-4 border flex items-start justify-between ${outOfStock.length > 0 ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`} id="inventory-alert-banner">
          <div className="flex items-start gap-3">
            <AlertTriangle className={`h-6 w-6 mt-0.5 flex-shrink-0 ${outOfStock.length > 0 ? 'text-red-500' : 'text-amber-500'}`} />
            <div>
              <h3 className={`font-bold text-sm ${outOfStock.length > 0 ? 'text-red-800' : 'text-amber-800'}`}>
                Inventory Alert
              </h3>
              <p className={`text-sm mt-1 ${outOfStock.length > 0 ? 'text-red-700' : 'text-amber-700'}`}>
                {outOfStock.length > 0 && <span className="font-semibold">{outOfStock.length} product{outOfStock.length > 1 ? 's' : ''} out of stock. </span>}
                {lowStock.length > 0 && <span>{lowStock.length} product{lowStock.length > 1 ? 's' : ''} running low (≤ {LOW_STOCK_THRESHOLD} units).</span>}
              </p>
              <button
                onClick={() => setShowLowStockOnly(!showLowStockOnly)}
                className={`mt-2 text-sm font-medium underline underline-offset-2 ${outOfStock.length > 0 ? 'text-red-700 hover:text-red-900' : 'text-amber-700 hover:text-amber-900'}`}
              >
                {showLowStockOnly ? 'Show all products' : 'Show only low-stock items'}
              </button>
            </div>
          </div>
          <button onClick={() => setAlertDismissed(true)} className="text-gray-400 hover:text-gray-600 transition ml-4 mt-0.5">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-green-600">{healthyStock.length}</p>
          <p className="text-xs font-medium text-gray-500 mt-1">In Stock</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-amber-500">{lowStock.length}</p>
          <p className="text-xs font-medium text-gray-500 mt-1">Low Stock</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-red-500">{outOfStock.length}</p>
          <p className="text-xs font-medium text-gray-500 mt-1">Out of Stock</p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {loading ? (
            <li className="p-8 text-center text-gray-500 font-medium text-lg animate-pulse">Loading products database...</li>
          ) : displayProducts.length === 0 ? (
            <li className="p-8 text-center text-gray-500">
              <span className="block text-xl font-bold mb-2">No products found</span>
              {showLowStockOnly
                ? 'All products have healthy stock levels!'
                : 'You have not added any products to the database yet. Click "Add New Product" to start.'
              }
            </li>
          ) : (
            displayProducts.map((product) => (
              <li key={product.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-gray-50 transition border-none m-0 pt-0">
                <div className="flex items-center">
                  <div className="h-16 w-16 flex-shrink-0">
                    <img className="h-16 w-16 rounded-md object-cover border border-gray-100 shadow-sm" src={product.image || 'https://via.placeholder.com/150'} alt={product.name} />
                  </div>
                  <div className="ml-4">
                    <div className="text-lg font-bold text-gray-900 border-none m-0 pt-0 line-clamp-1">{product.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-1 flex-wrap">
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-semibold">{product.category}</span>
                      <span>₹{product.price}</span>
                      {getStockBadge(product.stock)}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(product)} className="text-gray-500 hover:text-green-600 bg-gray-50 hover:bg-green-50 p-2 rounded transition">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 p-2 rounded transition">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900/75 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-xl w-full p-8 border border-gray-100 transform transition-all">
            <h2 className="text-2xl font-bold mb-6 border-none m-0 pt-0 text-gray-900">{editingId ? 'Edit Product Details' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input required name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="E.g. Raw Wild Honey" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="99" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input required type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input required name="category" value={formData.category} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="E.g. Spices, Honey, Oils" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input name="image" value={formData.image} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                <textarea required name="description" rows="3" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="Describe the product and its benefits..."></textarea>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end space-x-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition shadow-sm">Save Product Configuration</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
