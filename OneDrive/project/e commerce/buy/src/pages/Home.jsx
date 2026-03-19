import { useEffect, useState, useMemo } from 'react';
import { getProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import QuickViewModal from '../components/QuickViewModal';
import { Store, Leaf, ShieldCheck, Truck, SlidersHorizontal, ChevronDown, Utensils, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Wellness', 'Honey', 'Ghee', 'Supplements', 'Spices', 'Personal Care'];

const MOCK_PRODUCTS = [
  { id: '1', name: 'Ashwagandha Kesar Prash', price: 950, category: 'Wellness', stock: 15, image: '/products/ashwagandha.png' },
  { id: '2', name: 'Raw Wild Forest Honey', price: 600, category: 'Honey', stock: 40, image: '/products/honey.png' },
  { id: '3', name: 'Brahmi Coconut Hair Oil', price: 420, category: 'Personal Care', stock: 25, image: '/products/hair-oil.png' },
  { id: '4', name: 'Triphala Wellness Powder', price: 350, category: 'Supplements', stock: 0, image: '/products/triphala.png' },
  { id: '5', name: 'Sun-Dried Ginger & Turmeric', price: 250, category: 'Spices', stock: 50, image: '/products/turmeric.png' },
  { id: '6', name: 'Pure A2 Gir Cow Ghee', price: 1200, category: 'Ghee', stock: 100, image: '/products/ghee.png' }
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      if (data.length === 0) {
        setProducts(MOCK_PRODUCTS);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Price range filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, activeCategory, sortBy, priceRange]);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-sage-gradient py-24 md:py-32 px-4 animate-fade-in shadow-inner">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'svg\'%3E%3Cpath d=\'M30 0l10 20 20 10-20 10-10 20-10-20-20-10 20-10z\' fill=\'%23344C3D\'/%3E%3C/svg%3E")' }} />
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md text-sage-evergreen px-5 py-2 rounded-full text-xs font-bold mb-8 border border-white/50 shadow-sm uppercase tracking-[0.2em]">
            <Sparkles className="h-3.5 w-3.5" /> Authentic Heritage Recipes
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.9]">
            ANCIENT WISDOM <br />
            <span className="text-sage-evergreen">PURE AYURVEDA</span> <br />
            <span className="text-sage-moss">LIFESTYLE</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-sage-evergreen/80 max-w-2xl mx-auto font-medium leading-relaxed">
            REAL | ETHICAL | DELICIOUS <br />
            100% Preservative & Color Free | Ethically Sourced | Made in India
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="btn-primary">Shop All Products</button>
            <button className="btn-outline bg-white/50 backdrop-blur-sm">Our Story</button>
          </div>
        </div>
      </div>

      {/* Why Choose Jaggy (Ayurveda Focused) */}
      <div className="bg-white py-20 border-b border-sage-mint/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-sage-evergreen mb-4">What Jaggy stands for</h2>
            <div className="h-1 w-20 bg-sage-moss mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center group">
              <div className="w-24 h-24 bg-sage-hint/30 rounded-full flex items-center justify-center group-hover:bg-sage-hint/50 transition-all duration-500 mb-6 border border-sage-mint/50">
                <Leaf className="h-10 w-10 text-sage-evergreen" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-widest">Sattvic Purity</h3>
              <p className="text-sage-moss font-medium">100% Pure & Ethical. <br />Aligning with Ayurvedic Doshic Principles.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-24 h-24 bg-sage-hint/30 rounded-full flex items-center justify-center group-hover:bg-sage-hint/50 transition-all duration-500 mb-6 border border-sage-mint/50">
                <ShieldCheck className="h-10 w-10 text-sage-evergreen" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-widest">Ethically Sourced</h3>
              <p className="text-sage-moss font-medium">Supporting Local Farmers. <br />Direct from Source to Your Table.</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-24 h-24 bg-sage-hint/30 rounded-full flex items-center justify-center group-hover:bg-sage-hint/50 transition-all duration-500 mb-6 border border-sage-mint/50">
                <Utensils className="h-10 w-10 text-sage-evergreen" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 uppercase tracking-widest">Truly Delicious</h3>
              <p className="text-sage-moss font-medium">Authentic Heritage Recipes. <br />Handmade in Small Batches.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8 border-none m-0 pt-0 flex-wrap gap-4">
          <h2 id="products-section" className="text-2xl md:text-4xl font-black text-sage-evergreen flex items-center gap-3 border-none m-0 uppercase tracking-tighter scroll-mt-24">
            <Store className="h-10 w-10 text-sage-evergreen" />
            Featured Goodness
          </h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>

        {/* Filter Bar */}
        <div className={`mb-8 space-y-4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                id={`filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
                className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border uppercase tracking-widest ${
                  activeCategory === cat
                    ? 'bg-sage-evergreen text-white border-sage-evergreen shadow-xl shadow-sage/30'
                    : 'bg-white text-sage-moss border-sage-mint hover:border-sage hover:text-sage-evergreen hover:bg-sage-hint/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort & Price Range */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                id="sort-select"
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer hover:border-green-300 transition"
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="name-asc">Name: A → Z</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Price Range */}
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-2">
              <span className="text-sm text-gray-500 font-medium whitespace-nowrap">Price:</span>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                min="0"
                max={priceRange[1]}
                className="w-20 text-sm border border-gray-200 rounded-md px-2 py-1 text-center focus:ring-green-500 focus:border-green-500"
                placeholder="Min"
                id="price-min"
              />
              <span className="text-gray-400">—</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                min={priceRange[0]}
                className="w-20 text-sm border border-gray-200 rounded-md px-2 py-1 text-center focus:ring-green-500 focus:border-green-500"
                placeholder="Max"
                id="price-max"
              />
            </div>

            {/* Result count */}
            {!loading && (
              <span className="text-sm text-gray-500 ml-auto">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="bg-gray-100 h-80 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <SlidersHorizontal className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No products match your filters</h3>
            <p className="text-gray-500 text-sm mb-4">Try adjusting your category, price range, or sort options.</p>
            <button
              onClick={() => { setActiveCategory('All'); setPriceRange([0, 5000]); setSortBy('default'); }}
              className="text-green-600 font-medium text-sm hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </div>

      {/* Our Story Teaser (Relish Inspired) */}
      <div className="bg-sage-hint/20 py-24 border-t border-sage-mint/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-sage-mint rounded-full -z-10 animate-pulse" />
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Our Chief Mama" 
                className="rounded-3xl shadow-2xl border-8 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-500"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-sage-mint/50 flex items-center gap-4">
                <div className="bg-sage-mint p-3 rounded-full">
                  <Heart className="h-6 w-6 text-sage-evergreen fill-sage-evergreen" />
                </div>
                <div>
                  <p className="text-xs font-bold text-sage-moss uppercase tracking-widest">Handmade with</p>
                  <p className="text-lg font-black text-sage-evergreen">Mother's Love</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 bg-sage-mint/50 text-sage-evergreen px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                Our Story
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-[1.1]">
                Authentic Flavors from <br />
                <span className="text-sage-moss">Mother's Kitchen</span>
              </h2>
              <p className="text-lg text-sage-moss font-medium leading-relaxed">
                Jaggy is a sanctuary of health, inspired by the 5,000-year-old wisdom of Ayurveda. Every product we offer is meticulously crafted to balance your unique Dosha and promote holistic well-being through nature's finest herbs and remedies.
              </p>
              <div className="flex gap-4">
                <Link to="/about" className="btn-primary flex items-center gap-3">
                  Read Our Full Story <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
}
