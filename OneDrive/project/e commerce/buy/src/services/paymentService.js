/**
 * Razorpay Payment Service - Test Mode
 * 
 * Uses Razorpay Checkout.js (loaded via CDN in index.html)
 * Test key: rzp_test_1234567890 (demo only, replace with your own)
 */

const RAZORPAY_KEY = 'rzp_test_1234567890';

export const initiateRazorpayPayment = ({ amount, orderId, customerName, customerEmail, customerPhone, onSuccess, onFailure }) => {
  return new Promise((resolve, reject) => {
    // Check if Razorpay is loaded
    if (typeof window.Razorpay === 'undefined') {
      // Fallback: simulate payment for demo
      console.warn('Razorpay SDK not loaded. Simulating payment for demo.');
      setTimeout(() => {
        const mockResponse = {
          razorpay_payment_id: 'pay_demo_' + Date.now(),
          razorpay_order_id: orderId || 'order_demo_' + Date.now(),
          razorpay_signature: 'sig_demo_' + Date.now()
        };
        onSuccess?.(mockResponse);
        resolve(mockResponse);
      }, 2000);
      return;
    }

    const options = {
      key: RAZORPAY_KEY,
      amount: amount * 100, // Razorpay expects paise
      currency: 'INR',
      name: 'Jaggy',
      description: 'Purchase from Jaggy',
      image: '',
      order_id: orderId,
      handler: function (response) {
        onSuccess?.(response);
        resolve(response);
      },
      prefill: {
        name: customerName || '',
        email: customerEmail || '',
        contact: customerPhone || ''
      },
      notes: {
        source: 'Jaggy Web App'
      },
      theme: {
        color: '#344C3D' // Sage Evergreen
      },
      modal: {
        ondismiss: function () {
          onFailure?.({ reason: 'Payment cancelled by user' });
          reject(new Error('Payment cancelled'));
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        onFailure?.(response.error);
        reject(response.error);
      });
      rzp.open();
    } catch (err) {
      console.error('Razorpay init error:', err);
      onFailure?.(err);
      reject(err);
    }
  });
};
