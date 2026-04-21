import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Storefront from './components/Storefront';
import Dashboard from './components/Dashboard';
import Impact from './components/Impact';

// Use your Stripe TEST publishable key here
const stripePromise = loadStripe('pk_test_51TDhGQ0229WQ63FBaM86MT50ZVI4AVfmSa0w3l2jBAOzM7XMM0mqItc24TI8mVZ8jIEnMJmOMxp3TI3IcZyNxwjD00JCfHfkMA');

function App() {
  const [view, setView] = useState('/');
  const [orders, setOrders] = useState([]);
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

      const response = await fetch('https://themightyname.com/checkout-api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems: cartItems.map((item) => ({
            stripePriceId: item.stripePriceId,
            quantity: item.quantity || 1,
            size: item.size || 'M',
            name: item.name,
          })),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error ${response.status}: ${errorText}`);
      }

      const session = await response.json();

      if (!session.id) {
        throw new Error(session.error || 'No session ID returned from server.');
      }

      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe failed to load.');
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        throw new Error(error.message);
      }
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