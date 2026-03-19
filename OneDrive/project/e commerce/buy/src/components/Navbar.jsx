import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { Store, User, LogOut, Search, ShoppingCart, Menu, X } from 'lucide-react';
import { ADMIN_EMAIL } from '../constants/config';

export default function Navbar() {
  const { user, signOut } = useAuthStore();
  const { items } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${searchQuery.trim()}`);
      setIsMenuOpen(false);
    }
  };

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-sage-mint/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="w-10 h-10 bg-sage-gradient rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-sage/20 group-hover:scale-110 transition duration-500">
                <span className="text-white font-black text-xl italic drop-shadow-sm">J</span>
              </div>
              <span className="text-2xl font-black text-gray-900 uppercase tracking-tighter group-hover:text-sage-evergreen transition-colors duration-300">Jaggy</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative group">
              <input
                type="text"
                placeholder="Find Your Natural Cure..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-sage-hint/10 border-2 border-transparent py-2.5 pl-12 pr-4 rounded-2xl text-sm font-medium focus:bg-white focus:border-sage-evergreen focus:ring-0 transition-all duration-300 placeholder:text-sage-moss/50"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-sage-moss group-focus-within:text-sage-evergreen transition-colors" />
            </form>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-black text-gray-900 uppercase tracking-widest hover:text-sage-evergreen transition group relative">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-evergreen transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/#products-section" className="text-sm font-black text-gray-900 uppercase tracking-widest hover:text-sage-evergreen transition group relative">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-evergreen transition-all group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="text-sm font-black text-gray-900 uppercase tracking-widest hover:text-sage-evergreen transition group relative">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-evergreen transition-all group-hover:w-full"></span>
            </Link>
            <a href="#footer" className="text-sm font-black text-gray-900 uppercase tracking-widest hover:text-sage-evergreen transition group relative">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sage-evergreen transition-all group-hover:w-full"></span>
            </a>
          </div>

          {/* Desktop Right Icons */}
          <div className="hidden md:flex items-center ml-8 gap-1">
            <Link to="/cart" className="p-3 text-sage-moss hover:bg-sage-hint/20 rounded-2xl transition relative group">
              <ShoppingCart className="h-6 w-6 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-sage-evergreen text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-lg animate-bounce-slow">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <div className="h-8 w-px bg-sage-mint/30 mx-2"></div>

            {user ? (
              <div className="flex items-center gap-2 sm:gap-4">
                {user.email === ADMIN_EMAIL && (
                  <Link to="/admin" className="p-2 text-sage-moss hover:bg-sage-mint/50 rounded-full transition group relative">
                    <Store className="h-6 w-6" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">Admin Panel</span>
                  </Link>
                )}
                <Link to="/profile" className="flex items-center gap-2 p-1.5 pr-3 hover:bg-sage-mint/50 rounded-full transition group">
                  <div className="h-8 w-8 rounded-full bg-sage-gradient flex items-center justify-center text-white font-bold text-xs ring-2 ring-sage-mint">
                    {user.email?.[0].toUpperCase()}
                  </div>
                  <span className="text-xs font-black text-sage-evergreen hidden lg:block uppercase tracking-widest">{user.displayName?.split(' ')[0] || 'Account'}</span>
                </Link>
                <button 
                  onClick={signOut} 
                  className="p-2 text-sage-moss hover:text-red-600 hover:bg-red-50 rounded-full transition group relative"
                >
                  <LogOut className="h-6 w-6" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2 py-2.5 px-6 bg-sage-gradient text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:shadow-xl hover:shadow-sage/20 transition-all active:scale-95">
                <User className="h-4 w-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Link to="/cart" className="p-2 text-sage-moss relative mr-2">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-sage-evergreen text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-sage-moss hover:bg-sage-hint/20 transition"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-sage-mint/30 animate-fade-in-down">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-sage-hint/10 border-2 border-transparent py-3 pl-12 pr-4 rounded-2xl focus:bg-white focus:border-sage-evergreen transition-all outline-none"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-sage-mint" />
            </form>
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-gray-900 border-l-4 border-transparent hover:border-sage-evergreen hover:bg-sage-hint/5 transition">Home</Link>
            <Link to="/#products-section" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-gray-900 border-l-4 border-transparent hover:border-sage-evergreen hover:bg-sage-hint/5 transition">Products</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-gray-900 border-l-4 border-transparent hover:border-sage-evergreen hover:bg-sage-hint/5 transition">About</Link>
            <a href="#footer" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-gray-900 border-l-4 border-transparent hover:border-sage-evergreen hover:bg-sage-hint/5 transition">Contact</a>
            {user ? (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-gray-900 border-l-4 border-transparent hover:border-sage-evergreen hover:bg-sage-hint/5 transition">Profile</Link>
                {user.email === ADMIN_EMAIL && (
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-sage-evergreen border-l-4 border-sage-evergreen bg-sage-hint/5 transition">Admin Dashboard</Link>
                )}
                <button onClick={() => { signOut(); setIsMenuOpen(false); }} className="w-full text-left px-4 py-3 text-base font-bold text-red-600 border-l-4 border-transparent hover:bg-red-50 transition">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-base font-bold text-sage-evergreen transition">Login / Register</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
