import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';

const Info = () => {
  return (
    <div id="mission" className="bg-white text-black border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 space-y-24">
        <section className="grid lg:grid-cols-[0.95fr_1.05fr] gap-16 items-start">
          <div>
            <div className="border border-black/10 bg-black/[0.02] p-6 mb-8">
              <p className="text-[9px] font-black uppercase tracking-brand text-mighty mb-3">
                TMN Mission
              </p>
              <div className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.9] text-black">
                Rooted In
                <br />
                The Kingdom.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-black/10 p-5 bg-black/[0.02]">
                <p className="text-[8px] font-black uppercase tracking-brand text-black/35 mb-2">Identity</p>
                <p className="text-[10px] font-bold uppercase tracking-micro text-black/60">
                  Christian cultural
                  <br />
                  clothing brand
                </p>
              </div>

              <div className="border border-mighty p-5 bg-mighty/10">
                <p className="text-[8px] font-black uppercase tracking-brand text-mighty mb-2">Purpose</p>
                <p className="text-[10px] font-bold uppercase tracking-micro text-black">
                  Represent Christ
                  <br />
                  with excellence
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-black/75 text-lg leading-relaxed font-medium">
              TMN exists to glorify Jesus Christ through culture-shaping apparel.
            </p>

            <p className="text-black/60 leading-relaxed font-medium">
              Every piece is designed to carry truth boldly, reflect excellence,
              and represent Christ in everyday life without compromise.
            </p>

            <p className="text-black/60 leading-relaxed font-medium">
              This is not merch with a message added later.
              This brand is rooted in the Kingdom from the beginning.
            </p>

            <div className="border border-black/10 bg-black/[0.02] p-8 mt-8">
              <p className="text-xl md:text-2xl font-black italic leading-relaxed text-black mb-6">
                "My prayer and my hope is that people would be ultimately saved. If that journey
                starts with a single look at a piece of our apparel, then the mission is fulfilled."
              </p>

              <div className="flex items-center gap-4">
                <div className="h-px w-10 bg-mighty"></div>
                <p className="text-[10px] font-black uppercase tracking-brand text-black/45">
                  Igor // Founder
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative border border-black/10 bg-black/[0.02] p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 right-0 opacity-[0.05] p-8 text-black">
            <Star size={180} />
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <ShieldCheck className="text-mighty" size={18} />
                <span className="text-[10px] font-black uppercase tracking-brand text-mighty">
                  Loyal To The Mission
                </span>
              </div>

              <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-[0.9] mb-6">
                The Mighty 10
              </h3>

              <p className="text-black/60 font-medium leading-relaxed max-w-md">
                Ten completed orders unlock your eleventh piece free.
                A reward for those who keep building with the brand and backing the mission.
              </p>
            </div>

            <div>
              <div className="grid grid-cols-5 gap-2 mb-6">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="h-3 border border-black/10 bg-white overflow-hidden"
                  >
                    <div
                      className="h-full bg-mighty w-0 hover:w-full transition-all duration-700"
                      style={{ transitionDelay: `${i * 70}ms` }}
                    ></div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-brand">
                <span className="text-black/35">Progress Tracking Active</span>
                <span className="text-black">Buy 10 // Get 1</span>
              </div>

              <div className="mt-8 border-t border-black/10 pt-8">
                <p className="text-sm text-black/45 font-bold uppercase tracking-micro">
                  Conviction worn publicly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Info;