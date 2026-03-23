import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Storefront from './components/Storefront';
import Dashboard from './components/Dashboard';
import Impact from './components/Impact';

// 1. STRIPE INITIALIZATION
// Make sure you have run: npm install @stripe/stripe-js
const stripePromise = loadStripe('pk_test_51TDhGQ0229WQ63FBaM86MT50ZVI4AVfmSa0w3l2jBAOzM7XMM0mqItc24TI8mVZ8jIEnMJmOMxp3TI3IcZyNxwjD00JCfHfkMA');

function App() {
  const [view, setView] = useState(window.location.pathname);
  
  // 2. PRODUCT STATE (Prioritizes hard-coded IDs for new builds)
  const [products, setProducts] = useState(() => {
    const hardCoded = [
      { 
        id: 1, 
        name: 'MIGHTY HOODIE', 
        price: 85, 
        color: 'Midnight Blue',
        image: 'https://i.postimg.cc/w3KPVc4z/Gemini_Generated_Image_80kffb80kffb80kf.png',
        stripePriceId: 'price_1TDhrx0229WQ63FBYoWhTrLR' // REPLACE WITH YOUR ACTUAL TEST PRICE ID
      },
      { 
        id: 2, 
        name: 'TMN CAP', 
        price: 45, 
        color: 'Arctic White',
        image: 'https://i.postimg.cc/T1xTQ5tg/2d433420_243d_11f1_ab29_01c105d570ac.png',
        stripePriceId: 'price_123_EXAMPLE_CAP' // REPLACE WITH YOUR ACTUAL TEST PRICE ID
      }
    ];

    const saved = localStorage.getItem('mighty_products');
    if (saved) {
      const parsedSaved = JSON.parse(saved);
      // Merges saved Dashboard "Drops" with the Hard-coded items above
      const newDrops = parsedSaved.filter(sp => !hardCoded.find(hp => hp.id === sp.id));
      return [...hardCoded, ...newDrops];
    }
    return hardCoded;
  });
  
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('mighty_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // 3. SUCCESS MESSAGE LOGIC
  // Checks URL for ?payment=success after Stripe redirects back
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('payment') === 'success') {
      alert("MIGHTY SUCCESS! Order received. Check your email for confirmation.");
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  // 4. PERSISTENCE
  useEffect(() => {
    localStorage.setItem('mighty_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mighty_orders', JSON.stringify(orders));
  }, [orders]);

  // 5. NAVIGATION
  useEffect(() => {
    const handlePopState = () => setView(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);
  const impactAmount = (totalRevenue * 0.10).toFixed(2);

  // 6. STRIPE CHECKOUT ACTION
  const addOrder = async (product) => {
    const stripe = await stripePromise;

    // Safety check: Prevent redirect if ID is missing or placeholder
    if (!product.stripePriceId || product.stripePriceId.includes('EXAMPLE')) {
      alert(`ERROR: No valid Stripe Price ID found for ${product.name}. \n\nPlease update the ID in App.js or the Dashboard.`);
      return;
    }

    // Attempt the redirect
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
      alert("STRIPE ERROR: " + error.message);
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