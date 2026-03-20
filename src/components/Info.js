import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

const Info = () => {
  return (
    <div className="bg-white py-24 px-6 border-t border-slate-100">
      <div className="max-w-4xl mx-auto space-y-32">
        
        {/* THE MANIFESTO */}
        <section className="text-center">
          {/* SCRIPTURE: Subtle and elegant */}
         
          
          <h2 className="text-[10px] font-black tracking-[0.5em] uppercase text-mighty mb-6 italic">The Manifesto</h2>
          
          <h3 className="text-4xl md:text-6xl font-black italic uppercase text-mighty-dark mb-10 leading-[0.9] tracking-tighter">
            A Name Above <br/> Every Name.
          </h3>
          <p className="text-[9px] font-bold tracking-[0.6em] uppercase text-slate-400 mb-12 italic">
            Philippians 2:9
          </p>

          <div className="space-y-6 text-slate-600 font-medium text-lg italic leading-relaxed max-w-2xl mx-auto">
            <p>
              The Mighty Name was founded on a singular, unwavering truth: 
              <span className="text-mighty-dark font-black"> Jesus has the power to change everything.</span>
            </p>
            
            <p>
              We believe that apparel is more than just fabric—it is a silent witness. 
              Our mission is to spark a transformation starting with the person wearing the brand, 
              extending to every person who sees it, and ultimately reaching those in desperate need 
              through our Impact Pledge.
            </p>

            {/* THE FOUNDER'S QUOTE */}
            <div className="bg-slate-50 p-10 border-l-4 border-mighty text-left mt-12 shadow-sm">
              <p className="text-mighty-dark font-bold not-italic text-xl leading-relaxed mb-6">
                "My prayer and my hope is that people would be ultimately saved. If that journey 
                starts with a single look at a piece of our apparel, then the mission is fulfilled."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-8 bg-mighty"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-mighty-dark">
                  Igor // Founder
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REWARDS SECTION */}
        <section className="bg-mighty-dark p-12 rounded-2xl text-white relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
            <Star size={150} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="text-mighty-light" size={20} />
              <span className="text-[10px] font-black uppercase tracking-widest">Faithful Rewards</span>
            </div>
            <h3 className="text-3xl font-black italic uppercase mb-4 text-white">The Mighty 10</h3>
            <p className="text-blue-200 mb-8 max-w-md font-bold italic text-sm leading-relaxed">
              Community is built on loyalty. Complete 10 orders and your 11th piece 
              is on us. A gift to those who walk with the brand and support the mission.
            </p>
            
            <div className="flex gap-2 mb-2">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-mighty-light group-hover:w-full transition-all duration-1000" style={{ transitionDelay: `${i * 150}ms` }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest italic">Progress Tracking Active</p>
              <p className="text-[9px] font-black text-white/40 uppercase tracking-widest">Buy 10 // Get 1</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Info;