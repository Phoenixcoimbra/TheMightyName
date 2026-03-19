import React, { useState } from 'react';
import Storefront from './components/Storefront';
import Dashboard from './components/Dashboard';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'MIGHTY HOODIE', price: 85, color: 'Midnight Blue' },
    { id: 2, name: 'CORE TEE', price: 45, color: 'Arctic White' },
  ]);
  const [orders, setOrders] = useState([]);

  const addOrder = (product) => {
    const newOrder = {
      id: `MN-${Math.floor(Math.random() * 9000) + 1000}`,
      item: product.name,
      price: product.price,
      status: 'Processing',
      date: new Date().toLocaleDateString()
    };
    setOrders([newOrder, ...orders]);
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-mighty-light">
      {/* Dev Switcher */}
      <div className="fixed bottom-5 right-5 z-50 flex bg-mighty-dark p-1 rounded-full border-2 border-white shadow-xl">
        <button onClick={() => setIsAdmin(false)} className={`px-4 py-2 rounded-full text-xs font-bold ${!isAdmin ? 'bg-white text-mighty-dark' : 'text-white'}`}>STORE</button>
        <button onClick={() => setIsAdmin(true)} className={`px-4 py-2 rounded-full text-xs font-bold ${isAdmin ? 'bg-white text-mighty-dark' : 'text-white'}`}>ADMIN</button>
      </div>

      {isAdmin ? (
        <Dashboard orders={orders} products={products} setProducts={setProducts} />
      ) : (
        <Storefront products={products} onPurchase={addOrder} />
      )}
    </div>
  );
}

export default App;