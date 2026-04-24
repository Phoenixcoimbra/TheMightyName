import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, ArrowRight } from 'lucide-react';
import Info from './Info';

const Storefront = ({ products, onCheckout, cart, setCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedSize, setSelectedSize] = useState('M');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product, size) => {
    const cartItem = {
      ...product,
      size,
      quantity: 1,
      cartId: Date.now(),
    };

    setCart([...cart, cartItem]);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter((item) => item.cartId !== cartId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return b.id - a.id;
  });

  return (
    <div className="bg-white text-black min-h-screen">
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="/" className="group">
              <div className="leading-none">
                <div className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-black group-hover:text-mighty transition-colors">
                  TMN<span className="text-mighty">.</span>
                </div>
                <div className="text-[8px] font-black uppercase tracking-[0.45em] text-black/35 mt-1 group-hover:text-black/55 transition-colors">
                  The Mighty Name
                </div>
              </div>
            </a>

            <div className="hidden lg:block h-8 w-px bg-black/10"></div>

            <p className="hidden lg:block text-[8px] font-black uppercase tracking-[0.4em] text-black/30">
              Rooted In The Kingdom
            </p>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#shop" className="text-[10px] font-black uppercase tracking-brand text-black/55 hover:text-mighty transition-colors">
              Shop
            </a>
            <a href="#mission" className="text-[10px] font-black uppercase tracking-brand text-black/55 hover:text-mighty transition-colors">
              Mission
            </a>
            <a href="/impact" className="text-[10px] font-black uppercase tracking-brand text-black/55 hover:text-mighty transition-colors">
              Impact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 border border-mighty bg-mighty/10 px-3 py-2">
              <div className="w-2 h-2 rounded-full bg-mighty animate-pulse"></div>
              <span className="text-[8px] font-black uppercase tracking-[0.25em] text-mighty">
                Live
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-11 h-11 border border-black/10 flex items-center justify-center hover:border-mighty hover:text-mighty transition-all"
            >
              <ShoppingBag size={18} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-mighty text-black text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen overflow-hidden border-b border-black/10">
        <div className="absolute inset-0 bg-white" />

        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:42px_42px]" />
        </div>

        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-[24vw] md:text-[18vw] font-black italic uppercase tracking-tighter text-black/[0.04] leading-none">
            TMN
          </div>
        </div>

        <div className="absolute top-24 left-6 md:left-10 border border-black/10 bg-black/[0.02] px-4 py-3 hidden md:block">
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-mighty">
            Christian Cultural Clothing
          </p>
        </div>

        <div className="absolute bottom-10 right-6 md:right-10 hidden lg:block z-20">
          <div className="grid gap-3 w-[270px]">
            <div className="border border-black/10 bg-white/80 backdrop-blur-xl p-4 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.35em] text-black/35 mb-2">
                    Identity
                  </p>
                  <p className="text-2xl font-black italic uppercase tracking-tighter text-black leading-none">
                    TMN<span className="text-mighty">.</span>
                  </p>
                </div>

                <div className="h-8 w-8 border border-mighty bg-mighty/10 flex items-center justify-center">
                  <span className="text-[9px] font-black text-mighty">01</span>
                </div>
              </div>

              <p className="mt-4 text-[9px] font-black uppercase tracking-[0.22em] text-black/45 leading-relaxed">
                The Mighty Name
              </p>
            </div>

            <div className="border border-black/10 bg-white/80 backdrop-blur-xl p-4 shadow-sm">
              <p className="text-[8px] font-black uppercase tracking-[0.35em] text-black/35 mb-2">
                Standard
              </p>

              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black leading-relaxed">
                Rooted in Christ.
                <br />
                Built with excellence.
              </p>
            </div>

            <div className="border border-mighty bg-mighty/10 backdrop-blur-xl p-4 shadow-sm">
              <p className="text-[8px] font-black uppercase tracking-[0.35em] text-mighty mb-2">
                Impact Pledge
              </p>

              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black leading-relaxed">
                10% of every order funds real mission.
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-36 md:pt-44 pb-20 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-end w-full">
            <div>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="border border-mighty bg-mighty/10 px-4 py-2 text-[9px] font-black uppercase tracking-[0.35em] text-mighty">
                  Drop 01
                </span>
                <span className="border border-black/10 bg-black/[0.03] px-4 py-2 text-[9px] font-black uppercase tracking-[0.35em] text-black/55">
                  Set Apart Garments
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-black italic uppercase tracking-tighter leading-[0.82] text-black">
                Rooted In
                <br />
                The Kingdom.
              </h1>

              <p className="mt-8 max-w-2xl text-sm md:text-base font-bold uppercase tracking-[0.18em] text-black/60 leading-relaxed">
                Premium garments carrying eternal identity.
                Built for the called. Worn in culture. Grounded in Christ.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="#shop"
                  className="inline-flex items-center justify-center gap-3 bg-mighty text-black px-8 py-5 font-black uppercase text-[11px] tracking-[0.35em] hover:bg-black hover:text-white transition-all"
                >
                  Shop Drop <ArrowRight size={16} />
                </a>

                <a
                  href="#mission"
                  className="inline-flex items-center justify-center border border-black/15 px-8 py-5 font-black uppercase text-[11px] tracking-[0.35em] text-black hover:border-mighty hover:text-mighty transition-all"
                >
                  View Mission
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 max-w-5xl">
                {[
                  'Heavyweight Quality',
                  'Limited Drops',
                  'Rooted In Christ',
                  'Worldwide Shipping',
                ].map((item) => (
                  <div key={item} className="border border-black/10 px-4 py-4 bg-black/[0.02]">
                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-black/70">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block" />
          </div>
        </div>
      </section>

      <section id="shop" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <p className="text-[10px] font-black uppercase tracking-brand text-mighty mb-3">
              Current Drop
            </p>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none text-black">
              The Mighty Name
            </h2>
            <p className="mt-4 text-[10px] font-black uppercase tracking-micro text-black/40">
              Set Apart Garments
            </p>
          </div>

          <div className="flex items-center gap-4 border-b border-black/10 pb-3">
            <span className="text-[10px] font-black uppercase tracking-micro text-black/40">
              Sort
            </span>
            <select
              className="text-[10px] font-black uppercase outline-none bg-transparent cursor-pointer text-black"
              onChange={(e) => setSortBy(e.target.value)}
              value={sortBy}
            >
              <option value="newest">Newest</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {sortedProducts.map((product, index) => (
            <div
              key={product.id}
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 border border-black/10">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-transparent opacity-90" />

                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 border border-black/10 text-black text-[9px] font-black uppercase tracking-brand px-3 py-2">
                    TMN.0{index + 1}
                  </span>
                  <span className="bg-mighty text-black text-[9px] font-black uppercase tracking-brand px-3 py-2">
                    Set Apart
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[9px] font-black uppercase tracking-brand text-white/55 mb-2">
                    Limited Capsule
                  </p>
                  <div className="flex justify-between items-end gap-4">
                    <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white leading-none">
                      {product.name}
                    </h3>
                    <div className="text-xl font-black italic text-white whitespace-nowrap">
                      ${product.price}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white border-l border-black/10 h-full shadow-2xl flex flex-col p-8 text-black">
            <div className="flex justify-between items-center mb-10">
              <div>
                <p className="text-[9px] font-black uppercase tracking-brand text-mighty mb-2">
                  Drop Ready
                </p>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">
                  TMN Bag
                </h2>
              </div>
              <button onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-8">
              {cart.length === 0 ? (
                <div className="border border-black/10 p-6">
                  <p className="text-sm font-bold uppercase tracking-micro text-black/50">
                    Your bag is empty.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="flex gap-5 border-b border-black/10 pb-8">
                    <img src={item.image} className="w-24 h-32 object-cover bg-neutral-100" alt={item.name} />
                    <div className="flex-grow">
                      <h4 className="font-black italic uppercase text-sm text-black">{item.name}</h4>
                      <p className="text-[10px] font-bold text-black/40 uppercase tracking-micro mt-2">
                        Size: {item.size}
                      </p>
                      <p className="font-black text-mighty mt-4 text-lg">${item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-black/20 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="bg-black/[0.03] border border-black/10 p-6 mt-auto space-y-6">
              <div className="flex justify-between font-black uppercase text-[10px] tracking-brand text-black/40">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>

              <p className="text-[9px] font-black uppercase tracking-micro text-black/30">
                Secure checkout // Worldwide
              </p>

              <button
                onClick={() => onCheckout(cart)}
                disabled={cart.length === 0}
                className="w-full bg-mighty text-black py-5 font-black uppercase text-[12px] tracking-brand hover:bg-black hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Secure Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          />

          <div className="bg-white border border-black/10 w-full max-w-6xl relative z-10 grid md:grid-cols-2 shadow-2xl overflow-hidden text-black">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 z-20 text-black"
            >
              <X size={20} />
            </button>

            <div className="relative">
              <img
                src={selectedProduct.image}
                className="w-full h-full object-cover"
                alt={selectedProduct.name}
              />
              <div className="absolute top-6 left-6 flex gap-2">
                <span className="bg-white/90 border border-black/10 text-black text-[9px] font-black uppercase tracking-brand px-3 py-2">
                  TMN Capsule
                </span>
                <span className="bg-mighty text-black text-[9px] font-black uppercase tracking-brand px-3 py-2">
                  Rooted
                </span>
              </div>
            </div>

            <div className="p-8 md:p-14 flex flex-col justify-center">
              <p className="text-[10px] font-black uppercase tracking-brand text-mighty mb-4">
                The Mighty Name
              </p>

              <h2 className="text-4xl md:text-6xl font-black italic uppercase mb-3 tracking-tighter leading-[0.9]">
                {selectedProduct.name}
              </h2>

              <p className="text-2xl md:text-3xl font-black italic text-black mb-10">
                ${selectedProduct.price}
              </p>

              <p className="text-black/50 font-bold uppercase text-[10px] tracking-micro mb-5">
                Select Size
              </p>

              <div className="flex gap-3 mb-10">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border text-sm font-black transition-all ${
                      selectedSize === size
                        ? 'border-mighty bg-mighty text-black'
                        : 'border-black/10 text-black/40 hover:border-black/40 hover:text-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <p className="text-sm text-black/55 font-medium leading-relaxed mb-10 max-w-md">
                Heavyweight statement wear rooted in identity.
                Designed to represent the Name with excellence.
              </p>

              <button
                onClick={() => addToCart(selectedProduct, selectedSize)}
                className="w-full bg-mighty text-black py-5 font-black uppercase tracking-brand hover:bg-black hover:text-white transition-all flex items-center justify-center gap-4"
              >
                <ShoppingBag size={18} /> Add To Bag
              </button>
            </div>
          </div>
        </div>
      )}

      <Info />
    </div>
  );
};

export default Storefront;