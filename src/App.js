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
      image: 'https://themightyname.com/images/mighty-hoodie.png',
      color: 'Original',
    },
    {
      id: 2,
      name: 'MIGHTY CAP',
      price: 35,
      stripePriceId: 'price_1TEdcR0229WQ63FB9KLLFiRW',
      image: 'https://themightyname.com/images/mighty-cap.png',
      color: 'Original',
    },
    {
      id: 3,
      name: 'MIGHTY TEE',
      price: 45,
      stripePriceId: 'price_YOUR_STRIPE_PRICE_ID',
      image: 'https://themightyname.com/images/mighty-tee.jpg',
      color: 'Original',
    },
  ]);

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

  useEffect(() => {
    const path = window.location.pathname;
    setTimeout(() => {}, 0);

    if (path === '/impact') return;

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
    const currentPath = window.location.pathname;

    if (currentPath === '/impact') {
      return <Impact impactAmount="0.00" />;
    }

    switch (view) {
      case '/mighty-vault-99':
        return (
          <Dashboard
            orders={orders}
            products={products}
            setProducts={setProducts}
          />
        );

      default:
        return (
          <Storefront
            products={products}
            onCheckout={handleCheckout}
            cart={cart}
            setCart={setCart}
          />
        );
    }
  };

  return (
    <div
      className="App bg-mighty-black text-white min-h-screen"
      style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh' }}
    >
      {renderContent()}

      {showSuccessPopup && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6">
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setShowSuccessPopup(false)}
          />

          <div className="relative z-10 w-full max-w-2xl border border-white/10 bg-mighty-black text-white shadow-2xl overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
              <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:34px_34px]" />
            </div>

            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="border border-mighty bg-mighty/10 px-4 py-2 text-[9px] font-black uppercase tracking-brand text-mighty">
                  Order Confirmed
                </span>
                <span className="border border-white/10 bg-white/5 px-4 py-2 text-[9px] font-black uppercase tracking-brand text-white/55">
                  TMN Checkout
                </span>
              </div>

              <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-10 items-end">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.45em] text-white/35 mb-4">
                    The Mighty Name
                  </p>

                  <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.88] text-white">
                    Thank You
                    <br />
                    For Backing
                    <br />
                    The Mission.
                  </h2>

                  <p className="mt-6 max-w-xl text-sm md:text-base font-medium leading-relaxed text-white/65">
                    Your order was placed successfully. Thank you for supporting a Christian cultural clothing brand rooted in the Kingdom.
                  </p>

                  <div className="mt-8 border-l-2 border-mighty pl-4">
                    <p className="text-[10px] font-black uppercase tracking-micro text-white/45">
                      10% of your order helps fund real impact.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-[8px] font-black uppercase tracking-brand text-white/35 mb-2">
                      Status
                    </p>
                    <p className="text-lg font-black italic uppercase text-white">
                      Payment Complete
                    </p>
                  </div>

                  <div className="border border-mighty bg-mighty/10 p-5">
                    <p className="text-[8px] font-black uppercase tracking-brand text-mighty mb-2">
                      Identity
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-micro text-white leading-relaxed">
                      Conviction worn publicly.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="flex-1 bg-mighty text-black py-5 font-black uppercase text-[11px] tracking-brand hover:bg-white transition-all"
                >
                  Continue Shopping
                </button>

                <a
                  href="/impact"
                  className="flex-1 border border-white/15 py-5 text-center font-black uppercase text-[11px] tracking-brand text-white hover:border-mighty hover:text-mighty transition-all"
                >
                  View Impact
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;