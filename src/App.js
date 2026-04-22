import React, { useEffect, useState } from 'react';
import Storefront from './components/Storefront';
import Dashboard from './components/Dashboard';
import Impact from './components/Impact';

function App() {
  const [view] = useState('/');
  const [orders] = useState([]);
  const [cart, setCart] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get('payment');

    if (paymentStatus === 'success') {
      setCart([]);
      localStorage.removeItem('mighty_cart');
      setShowSuccessPopup(true);

      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('mighty_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('mighty_cart', JSON.stringify(cart));
  }, [cart]);

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
            cart={cart}
            setCart={setCart}
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

      {showSuccessPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowSuccessPopup(false)}
          />

          <div className="relative z-10 w-full max-w-lg bg-white text-mighty-dark p-10 md:p-12 shadow-2xl border border-slate-200 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-mighty mb-4 italic">
              Payment Complete
            </p>

            <h2 className="text-4xl md:text-5xl font-black italic uppercase leading-none tracking-tighter mb-6">
              Thank You
            </h2>

            <div className="h-1.5 w-20 bg-mighty mx-auto mb-8"></div>

            <p className="text-slate-600 font-medium text-lg leading-relaxed mb-6">
              Your order was placed successfully.
            </p>

            <p className="text-slate-500 font-bold italic mb-10">
              Thank you for supporting The Mighty Name. 10% of your purchase helps fuel the mission.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="flex-1 bg-mighty-dark text-white py-4 font-black uppercase text-[11px] tracking-[0.3em] hover:bg-black transition-all"
              >
                Continue Shopping
              </button>

              <a
                href="/impact"
                className="flex-1 border border-slate-200 py-4 font-black uppercase text-[11px] tracking-[0.3em] hover:border-mighty hover:text-mighty transition-all"
              >
                View Impact
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;