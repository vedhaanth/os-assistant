import productsData from '../data/products.json';

const PRODUCTS_KEY = 'jaggy_products';

// Initialize products in local storage if not present
const getStoredProducts = () => {
  const stored = localStorage.getItem(PRODUCTS_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    // Migration: If images are not yet local, refresh storage
    if (parsed.length > 0 && !parsed[0].image.startsWith('/products/')) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productsData));
      return productsData;
    }
    return parsed;
  }
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productsData));
  return productsData;
};

// Fetch all products
export const getProducts = async (category = null) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const products = getStoredProducts();
    if (category) {
      return products.filter(p => p.category === category);
    }
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch a single product by ID
export const getProductById = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const products = getStoredProducts();
    return products.find(p => p.id === id) || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Admin: Add a product
export const addProduct = async (product) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const products = getStoredProducts();
  const newProduct = {
    ...product,
    id: Math.random().toString(36).substring(2, 9),
    rating: 0,
    reviews: 0
  };
  products.push(newProduct);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  return newProduct;
};

// Admin: Update a product
export const updateProduct = async (id, productData) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  const products = getStoredProducts();
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...productData };
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return true;
  }
  return false;
};

// Admin: Delete a product
export const deleteProduct = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const products = getStoredProducts();
  const filtered = products.filter(p => p.id !== id);
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
  return true;
};
