import React from 'react';
import { ShoppingBag, Zap } from 'lucide-react';
import Info from './Info';

const Storefront = ({ products, onPurchase }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <nav className="flex justify-between items-center p-6 border-b border-mighty-light sticky top-0 bg-white/90 backdrop-blur-md z-10">
        <h1 className="text-2xl font-black italic tracking-tighter text-mighty-dark uppercase underline decoration-mighty decoration-4 underline-offset-4">The Mighty Name</h1>
        <ShoppingBag className="text-mighty-dark cursor-pointer hover:text-mighty transition" />
      </nav>

      <header className="py-24 px-6 text-center bg-mighty-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
            <h1 className="text-[25vw] font-black italic">MIGHTY</h1>
        </div>
        <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black italic mb-6">WEAR THE POWER.</h2>
            <p className="text-mighty-light tracking-[0.3em] uppercase font-bold text-sm">Official Drop 01 // 2026</p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((p) => (
          <div key={p.id} className="group">
            <div className="aspect-[4/5] bg-mighty-light mb-6 flex items-center justify-center relative overflow-hidden rounded-sm">
                <Zap size={48} className="text-blue-200 opacity-50" />
                <button 
                  onClick={() => onPurchase(p)}
                  className="absolute bottom-0 w-full py-5 bg-mighty-dark text-white font-black uppercase italic translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  Add to Bag — ${p.price}
                </button>
            </div>
            <h3 className="text-xl font-black italic uppercase text-mighty-dark">{p.name}</h3>
            <p className="text-mighty font-bold">{p.color}</p>
          </div>
        ))}
      </section>
      <section>
        {/* Your product grid ends here */}
      </section>

      <Info /> {/* This adds the About/Rewards section */}
    </div>
  );
};
  

export default Storefront;