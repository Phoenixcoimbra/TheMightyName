import React, { useState } from 'react';
import { ShoppingBag, X, ChevronDown, Check, Ruler, ArrowRight } from 'lucide-react';
import Info from './Info';

const Storefront = ({ products, onPurchase }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedSize, setSelectedSize] = useState('M');

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  // Sorting Logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return b.id - a.id; // Newest based on ID/Timestamp
  });

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setSelectedSize('M'); // Reset to default size when opening new product
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: helps on mobile
  };

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="pt-32 pb-12 px-6 text-center">
        <h1 className="text-[12px] font-black tracking-[0.8em] uppercase text-mighty mb-4 italic animate-pulse">
          New Drop // Now Active
        </h1>
        <p className="text-6xl md:text-8xl font-black italic uppercase text-mighty-dark tracking-tighter leading-none">
          The Mighty Name
        </p>
      </section>

      {/* TOOLBAR: Sorting */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-end border-b border-slate-100 pb-4">
        <div className="relative flex items-center gap-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Sort By:</span>
          <div className="flex items-center gap-1 group">
            <select 
              className="text-[10px] font-black uppercase tracking-widest outline-none bg-transparent cursor-pointer hover:text-mighty transition-colors appearance-none pr-4"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest Drops</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
            <ChevronDown size={12} className="text-slate-400 -ml-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {sortedProducts.map((product) => (
            <div 
              key={product.id} 
              className="group cursor-pointer" 
              onClick={() => handleOpenModal(product)}
            >
              {/* Image Container */}
              <div className="aspect-[3/4] bg-slate-100 mb-6 overflow-hidden rounded-sm relative shadow-sm">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src = "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&h=500&auto=format&fit=crop"; 
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200">
                    <ShoppingBag size={48} strokeWidth={1} />
                  </div>
                )}
                
                {/* Visual Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                
                {/* Detail Prompt */}
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
                  Quick View
                </div>
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-black italic uppercase text-mighty-dark leading-tight tracking-tight group-hover:text-mighty transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
                    {product.color || 'Original Design'}
                  </p>
                </div>
                <div className="text-xl font-black italic text-mighty-dark">${product.price}</div>
              </div>
              
              <div className="mt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-300">
                View Details <ArrowRight size={10} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-mighty-dark/90 backdrop-blur-md animate-in fade-in duration-300" 
            onClick={() => setSelectedProduct(null)} 
          />
          
          <div className="bg-white w-full max-w-5xl h-fit max-h-[90vh] overflow-y-auto relative z-10 grid md:grid-cols-2 shadow-2xl rounded-sm animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 z-20 hover:rotate-90 transition-transform p-2 bg-white/80 rounded-full shadow-sm"
            >
              <X size={20} />
            </button>

            {/* Modal Left: Image */}
            <div className="bg-slate-50">
              <img 
                src={selectedProduct.image} 
                className="w-full h-full object-cover"
                alt={selectedProduct.name}
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=400&h=500&auto=format&fit=crop"; }}
              />
            </div>

            {/* Modal Right: Content */}
            <div className="p-8 md:p-16 flex flex-col justify-center">
              <h2 className="text-4xl font-black italic uppercase text-mighty-dark mb-2 tracking-tighter leading-none">
                {selectedProduct.name}
              </h2>
              <p className="text-2xl font-black italic text-mighty mb-10">${selectedProduct.price}</p>
              
              {/* SIZE SELECTION */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Select Size</label>
                  <button className="text-[9px] font-black uppercase tracking-widest text-mighty flex items-center gap-1 hover:underline">
                    <Ruler size={10} /> Size Guide
                  </button>
                </div>
                <div className="flex gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center font-black transition-all border-2 
                        ${selectedSize === size 
                          ? 'border-mighty-dark bg-mighty-dark text-white' 
                          : 'border-slate-100 text-slate-400 hover:border-mighty hover:text-mighty'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* PRODUCT DETAILS */}
              <div className="space-y-4 mb-10 pb-10 border-b border-slate-100">
                <p className="text-slate-500 text-sm italic font-medium leading-relaxed mb-4">
                  A garment built for impact. Featuring our signature <span className="text-mighty-dark font-black tracking-tight underline decoration-mighty decoration-2 underline-offset-4">MIGHTY-WEIGHT</span> cotton blend.
                </p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-700">
                        <Check size={12} className="text-mighty" /> 450GSM Fleece
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-700">
                        <Check size={12} className="text-mighty" /> Oversized Fit
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-700">
                        <Check size={12} className="text-mighty" /> Dropped Shoulder
                    </div>
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-700">
                        <Check size={12} className="text-mighty" /> 10% Pledge
                    </div>
                </div>
              </div>

              {/* ADD TO CART */}
              <button 
                onClick={() => {
                  onPurchase({...selectedProduct, size: selectedSize});
                  setSelectedProduct(null);
                }}
                className="w-full bg-mighty-dark text-white py-6 font-black uppercase text-[12px] tracking-[0.4em] hover:bg-mighty transition-all shadow-xl flex items-center justify-center gap-4 group active:scale-95"
              >
                <ShoppingBag size={18} className="group-hover:animate-bounce" /> Add to Cart (Size {selectedSize})
              </button>
              
              <p className="mt-6 text-center text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                Secure checkout via Stripe // World shipping
              </p>
            </div>
          </div>
        </div>
      )}

      {/* BRAND INFO / MANIFESTO */}
      <Info />
    </div>
  );
};

export default Storefront;