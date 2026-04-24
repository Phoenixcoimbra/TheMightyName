import React from 'react';
import { TrendingUp, Globe, ShieldCheck, ArrowLeft, Sparkles } from 'lucide-react';

const Impact = ({ impactAmount = '0.00' }) => {
  return (
    <div className="bg-white text-black min-h-screen">
      <section className="relative border-b border-black/10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="h-full w-full bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)] bg-[size:42px_42px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-end">
            <div>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="border border-mighty bg-mighty/10 px-4 py-2 text-[9px] font-black uppercase tracking-brand text-mighty">
                  TMN Impact
                </span>
                <span className="border border-black/10 bg-black/[0.03] px-4 py-2 text-[9px] font-black uppercase tracking-brand text-black/55">
                  10% Pledge
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-black italic uppercase tracking-tighter leading-[0.86] text-black">
                Backing
                <br />
                Real Mission.
              </h1>

              <p className="mt-8 max-w-2xl text-sm md:text-base font-bold uppercase tracking-[0.18em] text-black/60 leading-relaxed">
                Every order fuels practical generosity, community support, and Kingdom-minded impact.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="border border-black/10 bg-black/[0.02] p-6">
                <p className="text-[8px] font-black uppercase tracking-brand text-black/35 mb-3">
                  Impact Fund
                </p>

                <div className="flex items-end gap-3">
                  <span className="text-5xl md:text-6xl font-black italic text-black">
                    ${impactAmount}
                  </span>
                </div>

                <p className="mt-4 text-[10px] font-black uppercase tracking-micro text-mighty">
                  Raised To Date
                </p>
              </div>

              <div className="border border-mighty bg-mighty/10 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles size={16} className="text-mighty" />
                  <p className="text-[9px] font-black uppercase tracking-brand text-mighty">
                    TMN Promise
                  </p>
                </div>
                <p className="text-[11px] font-black uppercase tracking-micro text-black leading-relaxed">
                  10% of every order is set apart for impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
          <div className="border border-black/10 bg-black/[0.02] p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="text-mighty" size={22} />
              <p className="text-[10px] font-black uppercase tracking-brand text-mighty">
                Why It Matters
              </p>
            </div>

            <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter leading-[0.9] text-black mb-6">
              Style With
              <br />
              Substance.
            </h2>

            <p className="text-black/65 leading-relaxed font-medium mb-5">
              TMN is not built to sell product without purpose. Every piece carries message, and every order helps move that mission beyond clothing.
            </p>

            <p className="text-black/55 leading-relaxed font-medium">
              We believe excellence, generosity, and witness can live together. The impact fund exists to make that visible.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="border border-black/10 bg-black/[0.02] p-7">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-mighty" size={18} />
                <p className="text-[10px] font-black uppercase tracking-brand text-mighty">
                  Community Support
                </p>
              </div>
              <p className="text-black/65 leading-relaxed font-medium">
                Direct support for practical needs, community-led care, and people who need help in tangible ways.
              </p>
            </div>

            <div className="border border-black/10 bg-black/[0.02] p-7">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="text-mighty" size={18} />
                <p className="text-[10px] font-black uppercase tracking-brand text-mighty">
                  Kingdom Initiatives
                </p>
              </div>
              <p className="text-black/65 leading-relaxed font-medium">
                Support for work that reflects the heart of Christ through outreach, service, generosity, and mission-minded action.
              </p>
            </div>

            <div className="border border-mighty bg-mighty/10 p-7">
              <p className="text-[10px] font-black uppercase tracking-brand text-mighty mb-4">
                TMN Standard
              </p>
              <p className="text-black font-black uppercase tracking-micro leading-relaxed">
                Every order should carry meaning beyond itself.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div>
            <p className="text-[9px] font-black uppercase tracking-brand text-black/35 mb-2">
              The Mighty Name
            </p>
            <p className="text-sm font-bold uppercase tracking-micro text-black/60">
              Rooted in the Kingdom. Built for the called.
            </p>
          </div>

          <a
            href="/"
            className="inline-flex items-center gap-3 border border-black/15 px-6 py-4 font-black uppercase text-[10px] tracking-brand text-black hover:border-mighty hover:text-mighty transition-all"
          >
            <ArrowLeft size={16} />
            Return To Store
          </a>
        </div>
      </section>
    </div>
  );
};

export default Impact;