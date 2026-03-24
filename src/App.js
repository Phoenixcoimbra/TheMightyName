import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Storefront from './components/Storefront'; // Assuming these are your components
import Dashboard from './components/Dashboard';
import Impact from './components/Impact';

// Your Public Key (Keep this as is)
const stripePromise = loadStripe('your_publishable_key_here');

function App() {
  const [view, setView] = useState('/');
  const [cart, setCart] = useState([]);

  // --- YOUR MIGHTY PRODUCT DATABASE ---
  const [products] = useState([
    { 
      id: 1, 
      name: 'MIGHTY HOODIE', 
      price: 85, 
      stripePriceId: 'prod_UD3QSRmiUrvU5S' // Your Actual ID
    },
    { 
      id: 2, 
      name: 'MIGHTY CAP', 
      price: 35, 
      stripePriceId: 'prod_UD3joXdd5C142O' // Your Actual ID
    }
  ]);

  // --- THE CART CHECKOUT HANDLER ---
  const handleCheckout = async (cartItems) => {
    try {
      // 1. Send the Mighty Bag to your Namecheap Server
      const response = await fetch('https://themightyname.com/checkout-api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          cartItems: cartItems.map(item => ({
            stripePriceId: item.stripePriceId,
            quantity: item.quantity || 1
          }))
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // 2. Redirect to Stripe's Secure Page using the Session ID
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        alert("Stripe Error: " + error.message);
      }
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Mighty Checkout Error: Make sure your Namecheap Node app is running.");
    }
  };

  const renderContent = () => {
    switch (view) {
      case '/mighty-vault-99':
        return <Dashboard products={products} />;
      case '/impact':
        return <Impact />;
      default:
        return (
          <Storefront 
            products={products} 
            cart={cart}
            setCart={setCart}
            onCheckout={handleCheckout} 
          />
        );
    }
  };

  return (
    <div className="App" style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh' }}>
      {/* Navigation would go here */}
      {renderContent()}
    </div>
  );
}

export default App;