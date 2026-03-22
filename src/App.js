import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Storefront from './components/Storefront';
import Dashboard from './components/Dashboard';
import Impact from './components/Impact';

// INITIALIZE STRIPE (Replace with your actual Public Key from Stripe Dashboard)
const stripePromise = loadStripe('pk_test_51TDhGQ0229WQ63FBaM86MT50ZVI4AVfmSa0w3l2jBAOzM7XMM0mqItc24TI8mVZ8jIEnMJmOMxp3TI3IcZyNxwjD00JCfHfkMA');

function App() {
  const [view, setView] = useState(window.location.pathname);
  
  // 1. PERSISTENCE: Includes Stripe Price IDs for the checkout
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('mighty_products');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        name: 'MIGHTY HOODIE', 
        price: 85, 
        color: 'Midnight Blue',
        image: 'https://i.postimg.cc/example/hoodie-blue.jpg',
        stripePriceId: 'price_123_EXAMPLE_HOODIE' // Add these from Stripe Dashboard
      },
      { 
        id: 2, 
        name: 'CORE TEE', 
        price: 45, 
        color: 'Arctic White',
        image: 'https://i.postimg.cc/example/tee-white.jpg',
        stripePriceId: 'price_123_EXAMPLE_TEE'
      }
    ];
  });
  
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('mighty_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // 2. SAVING DATA
  useEffect(() => {
    localStorage.setItem('mighty_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mighty_orders', JSON.stringify(orders));
  }, [orders]);

  // 3. NAVIGATION logic
  useEffect(() => {
    const handlePopState = () => setView(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);
  const impactAmount = (totalRevenue * 0.10).toFixed(2);

  // 4. THE STRIPE CHECKOUT LOGIC
  const addOrder = async (product) => {
    const stripe = await stripePromise;

    // Check if Stripe is configured
    if (!product.stripePriceId) {
      alert("This item isn't linked to Stripe yet. Add a Price ID in the Dashboard.");
      return;
    }

    // Redirect to Stripe's Secure Checkout Page
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: product.stripePriceId,
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: `${window.location.origin}/?payment=success`,
      cancelUrl: `${window.location.origin}/`,
    });

    if (error) {
      console.error("Stripe Error:", error.message);
      alert("Checkout failed. Please try again.");
    }
  };

  const renderContent = () => {
    switch (view) {
      case '/mighty-vault-99':
        return <Dashboard orders={orders} products={products} setProducts={setProducts} />;
      case '/impact':
        return <Impact impactAmount={impactAmount} />;
      default:
        return <Storefront products={products} onPurchase={addOrder} />;
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-mighty-light flex flex-col">
      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="py-12 border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
            © 2026 THE MIGHTY NAME // ALL GLORY TO GOD
          </div>
          <nav className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-600">
            <a href="/" className="hover:text-mighty transition-colors">Store</a>
            <a href="/impact" className="hover:text-mighty transition-colors">Impact</a>
            <a href="mailto:support@themightyname.com" className="hover:text-mighty transition-colors">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;