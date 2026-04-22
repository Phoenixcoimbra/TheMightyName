import React, { useState } from 'react';
import { ShoppingBag, X, Trash2 } from 'lucide-react';
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
    <div className="bg-white min-h-screen">
      <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-black italic uppercase tracking-tighter text-mighty-dark">
          The Mighty Name<span className="text-mighty">.</span>
        </div>
        <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:text-mighty">
          <ShoppingBag size={20} />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-mighty text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>
      </nav>

      <section className="pt-32 pb-24 px-6 bg-mighty-dark text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none italic font-black text-9xl uppercase flex items-center justify-center">
          Mighty // Mighty // Mighty
        </div>
        <div className="relative z-10">
          <h1 className="text-[10px] font-black tracking-[0.8em] uppercase text-mighty-light mb-6 italic">A Name Above Every Name</h1>
          <p className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none mb-6">The Mighty Name</p>
          <div className="h-1.5 w-24 bg-mighty mx-auto"></div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-end mb-12">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Filter By:</span>
            <select
              className="text-[10px] font-black uppercase outline-none bg-transparent cursor-pointer"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {sortedProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
              <div className="aspect-[3/4] bg-slate-50 mb-6 overflow-hidden relative shadow-sm">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black italic uppercase text-mighty-dark group-hover:text-mighty transition-colors">{product.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Limited Edition Drop</p>
                </div>
                <div className="text-xl font-black italic text-mighty-dark">${product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-mighty-dark/60 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter">Mighty Bag</h2>
              <button onClick={() => setIsCartOpen(false)}><X size={24} /></button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-8">
              {cart.map((item) => (
                <div key={item.cartId} className="flex gap-6 border-b border-slate-50 pb-8">
                  <img src={item.image} className="w-24 h-32 object-cover" alt={item.name} />
                  <div className="flex-grow">
                    <h4 className="font-black italic uppercase text-sm">{item.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400">Size: {item.size}</p>
                    <p className="font-black text-mighty mt-3 text-lg">${item.price}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.cartId)} className="text-slate-200 hover:text-red-500">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 p-6 mt-auto space-y-6">
              <div className="flex justify-between font-black uppercase text-[10px] tracking-[0.2em] text-slate-400">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button
                onClick={() => onCheckout(cart)}
                disabled={cart.length === 0}
                className="w-full bg-mighty-dark text-white py-6 font-black uppercase text-[12px] tracking-[0.4em] hover:bg-black transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Secure Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-mighty-dark/90 backdrop-blur-md" onClick={() => setSelectedProduct(null)} />
          <div className="bg-white w-full max-w-5xl relative z-10 grid md:grid-cols-2 shadow-2xl overflow-hidden">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-20">
              <X size={20} />
            </button>
            <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
            <div className="p-8 md:p-16 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase mb-2 tracking-tighter leading-none">{selectedProduct.name}</h2>
              <p className="text-2xl font-black italic text-mighty mb-10">${selectedProduct.price}</p>

              <div className="flex gap-3 mb-10">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 border-2 font-black ${selectedSize === size ? 'border-mighty-dark bg-mighty-dark text-white' : 'border-slate-100 text-slate-300'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button
                onClick={() => addToCart(selectedProduct, selectedSize)}
                className="w-full bg-mighty-dark text-white py-6 font-black uppercase tracking-[0.4em] hover:bg-mighty shadow-xl flex items-center justify-center gap-4"
              >
                <ShoppingBag size={18} /> Add to Bag
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