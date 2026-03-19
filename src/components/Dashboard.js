import React, { useState } from 'react';
import { LayoutDashboard, PlusCircle, Package, TrendingUp } from 'lucide-react';

const Dashboard = ({ orders, products, setProducts }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const totalRev = orders.reduce((sum, o) => sum + o.price, 0);

  const handleAdd = (e) => {
    e.preventDefault();
    setProducts([{ id: Date.now(), name, price: parseInt(price), color: 'New Release' }, ...products]);
    setName(''); setPrice('');
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <aside className="w-64 bg-mighty-dark text-white p-8 hidden lg:block">
        <h2 className="text-xl font-black italic mb-12 tracking-widest uppercase">MN Control</h2>
        <div className="space-y-8 opacity-80 font-bold uppercase text-xs tracking-widest">
            <div className="flex items-center gap-3 text-white border-l-4 border-white -ml-8 pl-7"><LayoutDashboard size={18}/> Dashboard</div>
            <div className="flex items-center gap-3 hover:text-mighty-light cursor-pointer"><Package size={18}/> Inventory</div>
        </div>
      </aside>

      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-12">
            <h1 className="text-3xl font-black italic text-mighty-dark uppercase">Operations</h1>
            <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-mighty flex items-center gap-4">
                <TrendingUp className="text-mighty" />
                <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase">Gross Revenue</p>
                    <p className="text-2xl font-black text-mighty-dark italic">${totalRev}</p>
                </div>
            </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-mighty-light overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-mighty-light/50 text-mighty-dark text-[10px] font-black uppercase">
                        <tr><th className="p-5">Order ID</th><th className="p-5">Product</th><th className="p-5">Status</th><th className="p-5 text-right">Price</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {orders.map(o => (
                            <tr key={o.id} className="text-sm font-bold text-slate-700">
                                <td className="p-5 font-mono text-mighty">{o.id}</td>
                                <td className="p-5 italic uppercase">{o.item}</td>
                                <td className="p-5"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-[10px] uppercase font-black">{o.status}</span></td>
                                <td className="p-5 text-right font-black">${o.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-mighty-light h-fit">
                <h3 className="font-black italic text-mighty-dark mb-6 flex items-center gap-2 uppercase"><PlusCircle size={20}/> New Drop</h3>
                <form onSubmit={handleAdd} className="space-y-4">
                    <input value={name} onChange={e => setName(e.target.value)} placeholder="Product Name" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-mighty outline-none" />
                    <input value={price} onChange={e => setPrice(e.target.value)} type="number" placeholder="Price" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:border-mighty outline-none" />
                    <button className="w-full py-4 bg-mighty text-white font-black italic uppercase hover:bg-mighty-dark transition rounded-lg">Release Item</button>
                </form>
            </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;