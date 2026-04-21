import React, { useState } from 'react';
import Storefront from './components/Storefront';
import Dashboard from './components/Dashboard';
import Impact from './components/Impact';

function App() {
  const [view] = useState('/');
  const [orders] = useState([]);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'MIGHTY HOODIE',
      price: 85,
      stripePriceId: 'price_1TEdK10229WQ63FBSQFaaGkT',
      image: 'https://via.placeholder.com/600x800?text=Mighty+Hoodie',
      color: 'Original',
    },
    {
      id: 2,
      name: 'MIGHTY CAP',
      price: 35,
      stripePriceId: 'price_1TEdcR0229WQ63FB9KLLFiRW',
      image: 'https://via.placeholder.com/600x800?text=Mighty+Cap',
      color: 'Original',
    },
  ]);

  const handleCheckout = async (cartItems) => {
    try {
      if (!cartItems || cartItems.length === 0) {
        alert('Your bag is empty.');
        return;
      }

      const response = await fetch(
        'https://themightyname.com/checkout-api/create-checkout-session',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cartItems: cartItems.map((item) => ({
              stripePriceId: item.stripePriceId,
              quantity: item.quantity || 1,
              size: item.size || 'M',
              name: item.name || '',
            })),
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error ${response.status}: ${errorText}`);
      }

      const session = await response.json();

      if (!session.url) {
        throw new Error(session.error || 'No Checkout URL returned from server.');
      }

      window.location.href = session.url;
    } catch (err) {
      console.error('Checkout failed:', err);
      alert(`Mighty Checkout Error: ${err.message}`);
    }
  };

  const renderContent = () => {
    switch (view) {
      case '/mighty-vault-99':
        return (
          <Dashboard
            orders={orders}
            products={products}
            setProducts={setProducts}
          />
        );

      case '/impact':
        return <Impact impactAmount="0.00" />;

      default:
        return (
          <Storefront
            products={products}
            onCheckout={handleCheckout}
          />
        );
    }
  };

  return (
    <div
      className="App"
      style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}
    >
      {renderContent()}
    </div>
  );
}

export default App;