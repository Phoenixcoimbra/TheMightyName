import React from 'react';
import { Star, ShieldCheck, Gift } from 'lucide-react';

const Info = () => {
  return (
    <div className="bg-white py-20 px-6 border-t border-slate-100">
      <div className="max-w-4xl mx-auto space-y-24">
        
        {/* ABOUT SECTION */}
        <section className="text-center">
          <h2 className="text-xs font-black tracking-[0.4em] uppercase text-mighty mb-4 italic">The Heritage</h2>
          <h3 className="text-4xl font-black italic uppercase text-mighty-dark mb-8 leading-tight">
            Built for those who <br/> define the era.
          </h3>
          <p className="text-slate-600 leading-relaxed font-medium text-lg italic">
            [Your story will go here, Igor. We will describe the journey from 
            concept to the "Mighty" reality. Every stitch is a statement of power 
            and every silhouette is a mark of identity.]
          </p>
        </section>

        {/* REWARDS SECTION */}
        <section className="bg-mighty-dark p-12 rounded-2xl text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
            <Star size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="text-mighty-light" size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Loyalty Program</span>
            </div>
            <h3 className="text-3xl font-black italic uppercase mb-4">The Mighty 10</h3>
            <p className="text-blue-200 mb-8 max-w-md font-bold italic">
              Loyalty is a two-way street. Complete 10 orders and the 11th piece 
              is our gift to you. No points, no math, just MIGHTY rewards.
            </p>
            
            <div className="flex gap-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="w-6 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-white group-hover:w-full transition-all duration-1000" style={{ transitionDelay: `${i * 100}ms` }}></div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[10px] font-bold text-blue-300 uppercase italic">Progress: 0/10 Orders to Free Item</p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Info;