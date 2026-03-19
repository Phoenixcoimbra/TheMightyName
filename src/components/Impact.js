import React from 'react';
import { Heart, Globe, TrendingUp, Zap } from 'lucide-react';

const Impact = ({ impactAmount }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black italic uppercase text-mighty-dark mb-4 tracking-tighter">The 10% Pledge</h1>
          <div className="h-2 w-24 bg-mighty mx-auto mb-8"></div>
          <p className="text-xl text-slate-600 font-bold italic uppercase tracking-tight">
            Mighty Power for a Mighty Cause.
          </p>
        </div>

        {/* The Breakdown Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200">
            <Heart className="text-mighty mb-6" size={32} />
            <h3 className="text-xl font-black italic uppercase mb-4">Why we give</h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              We believe a brand is only as strong as the community it supports. 
              The Mighty Name isn't just about apparel; it's about providing 
              the resources for others to find their own strength.
            </p>
          </div>

          {/* LIVE TRACKER CARD */}
          <div className="bg-mighty-dark p-10 rounded-2xl text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <TrendingUp className="text-blue-300 mb-6" size={32} />
              <h3 className="text-xl font-black italic uppercase mb-2">The Impact Fund</h3>
              <p className="text-blue-200 text-sm mb-6 font-bold italic">10% of every sale goes here.</p>
              
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white italic">${impactAmount}</span>
                <span className="text-blue-400 text-xs font-black uppercase tracking-widest">Raised to date</span>
              </div>
              
              <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-300">
                <Zap size={12} className="fill-blue-300" />
                <span>Live Tracking Active</span>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -bottom-4 -right-4 opacity-5 text-white">
                <TrendingUp size={160} />
            </div>
          </div>
        </div>

        {/* Accountability Section */}
        <section className="bg-white border-2 border-mighty-dark p-12 rounded-2xl text-center">
            <Globe className="mx-auto mb-6 text-mighty-dark" size={40} />
            <h2 className="text-2xl font-black italic uppercase mb-6">How the funds help</h2>
            <div className="space-y-4 text-left max-w-lg mx-auto italic font-bold text-slate-700">
                <div className="flex gap-4 items-start border-b border-slate-100 pb-4">
                    <span className="text-mighty">01.</span>
                    <p>Direct aid to community-led social initiatives.</p>
                </div>
                <div className="flex gap-4 items-start border-b border-slate-100 pb-4">
                    <span className="text-mighty">02.</span>
                    <p>Funding for emerging creative talent in urban areas.</p>
                </div>
                <div className="flex gap-4 items-start">
                    <span className="text-mighty">03.</span>
                    <p>Environmental restoration and sustainable textile research.</p>
                </div>
            </div>
        </section>

        {/* Back to Store link for easy navigation */}
        <div className="mt-12 text-center">
          <a href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-mighty transition-colors italic">
            ← Return to Store
          </a>
        </div>

      </div>
    </div>
  );
};

export default Impact;