import React, { useState, useEffect } from 'react';
import Storefront from './components/Storefront';
import Dashboard from './components/Dashboard';
import Impact from './components/Impact';

function App() {
  const [view, setView] = useState(window.location.pathname);
  
  // INITIAL LOAD: Look in the browser's "Safe" for existing data
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('mighty_products');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'MIGHTY HOODIE', price: 85, color: 'Midnight Blue' },
      { id: 2, name: 'CORE TEE', price: 45, color: 'Arctic White' },
    ];
  });
  
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('mighty_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // AUTO-SAVE: Every time products or orders change, lock them into memory
  useEffect(() => {
    localStorage.setItem('mighty_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mighty_orders', JSON.stringify(orders));
  }, [orders]);

  // URL Listener
  useEffect(() => {
    const handlePopState = () => setView(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);
  const impactAmount = (totalRevenue * 0.10).toFixed(2);

  const addOrder = (product) => {
    const newOrder = {
      id: `MN-${Math.floor(Math.random() * 9000) + 1000}`,
      item: product.name,
      price: product.price,
      status: 'Processing',
      date: new Date().toLocaleDateString()
    };
    setOrders([newOrder, ...orders]);
    alert(`Order Confirmed: ${product.name} has been logged.`);
  };

  const renderContent = () => {
    switch (view) {
      case '/admin':
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
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          <div>© 2026 THE MIGHTY NAME // GLOBAL OPERATIONS</div>
          <nav className="flex gap-8 text-slate-600">
            <a href="/" className="hover:text-mighty">Store</a>
            <a href="/impact" className="hover:text-mighty">Impact</a>
            <a href="mailto:contact@themightyname.com" className="hover:text-mighty text-slate-300">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;