import { createOrder as mockCreateOrder, getUserOrders as mockGetUserOrders, getAllOrders as mockGetAllOrders } from './mockOrderService';

export const createOrder = async (orderData) => {
  return await mockCreateOrder(orderData);
};

export const getUserOrders = async (userId) => {
  return await mockGetUserOrders(userId); 
};

export const getAllOrders = async () => {
  return await mockGetAllOrders();
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const orders = JSON.parse(localStorage.getItem('jaggy_orders') || '[]');
    const index = orders.findIndex(o => o.id === orderId);
    if (index !== -1) {
      orders[index].status = status;
      localStorage.setItem('jaggy_orders', JSON.stringify(orders));
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating order status:", error);
    return false;
  }
};
