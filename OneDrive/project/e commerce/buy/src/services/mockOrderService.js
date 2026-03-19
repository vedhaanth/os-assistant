// Standalone Mock Order Service
const ORDERS_KEY = 'jaggy_orders';

export const createOrder = async (orderData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    
    const newOrder = {
      ...orderData,
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    
    orders.push(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return newOrder.id;
  } catch (error) {
    console.error("Error creating mock order:", error);
    throw error;
  }
};

export const getUserOrders = async (userId) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    return orders.filter(o => o.userId === userId).reverse();
  } catch (error) {
    console.error("Error fetching mock orders:", error);
    return [];
  }
};

export const getAllOrders = async () => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]').reverse();
  } catch (error) {
    console.error("Error fetching all mock orders:", error);
    return [];
  }
};
