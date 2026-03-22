import React, { useState, useEffect } from 'react';
import { Plus, Package, DollarSign, ShoppingBag, Image as ImageIcon, Trash2, X, Lock, CreditCard } from 'lucide-react';

const Dashboard = ({ orders, products, setProducts }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  // --- 🛡️ MIGHTY GATEKEEPER ---
  useEffect(() => {
    const MIGHTY_PASS = "MIGHTY2026"; 
    const isUnlocked = sessionStorage.getItem('vault_unlocked');

    if (isUnlocked === 'true') {
      setIsAuthorized(true);
    } else {
      const entry = prompt("ENTER ACCESS KEY TO OPEN THE VAULT:");
      if (entry === MIGHTY_PASS) {
        sessionStorage.setItem('vault_unlocked', 'true');
        setIsAuthorized(true);
      } else {
        alert("UNAUTHORIZED ACCESS ATTEMPTED.");
        window.location.href = "/"; 
      }
    }
  }, []);

  const [showNewDrop, setShowNewDrop] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newStripeId, setNewStripeId] = useState(''); // NEW STATE FOR STRIPE

  if (!isAuthorized) return null;

  const handleCreateDrop = (e) => {
    e.preventDefault();
    if (!newName || !newPrice || !newStripeId) {
      alert("Please fill in Name, Price, and Stripe ID.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: newName.toUpperCase(),
      price: parseFloat(newPrice),
      color: 'Original',
      image: newImage || null,
      stripePriceId: newStripeId // SAVING THE STRIPE ID
    };

    setProducts([...products, newProduct]);
    setNewName('');
    setNewPrice('');
    setNewImage('');
    setNewStripeId('');
    setShowNewDrop(false);
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-3xl font-black italic uppercase text-mighty-dark leading-none">Mighty Command</h1>
            <p className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase mt-2">Vault Secured 🛡️</p>
          </div>
          <div className="flex gap-4">
            <button 
                onClick={() => { sessionStorage.removeItem('vault_unlocked'); window.location.href="/"; }}
                className="border border-slate-200 bg-white text-slate-400 px-4 py-4 rounded-sm font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 hover:text-red-500 transition-all"
            >
                <Lock size={12} /> Lock
            </button>
            <button 
                onClick={() => setShowNewDrop(true)}
                className="bg-mighty-dark text-white px-8 py-4 rounded-sm font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 hover:bg-black transition-all shadow-lg"
            >
                <Plus size={14} /> New Drop
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 border border-slate-200 shadow-sm">
            <DollarSign className="text-mighty mb-4" size={24} />
            <div className="text-3xl font-black italic text-mighty-dark">${totalRevenue.toFixed(2)}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Gross Revenue</div>
          </div>
          <div className="bg-white p-8 border border-slate-200 shadow-sm">
            <ShoppingBag className="text-mighty mb-4" size={24} />
            <div className="text-3xl font-black italic text-mighty-dark">{orders.length}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Orders</div>
          </div>
          <div className="bg-white p-8 border border-slate-200 shadow-sm">
            <Package className="text-mighty mb-4" size={24} />
            <div className="text-3xl font-black italic text-mighty-dark">{products.length}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Items</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                <th className="px-8 py-4">Item</th>
                <th className="px-8 py-4">Price</th>
                <th className="px-8 py-4">Stripe ID</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6 font-bold uppercase italic text-mighty-dark">{product.name}</td>
                  <td className="px-8 py-6 font-medium text-slate-600">${product.price}</td>
                  <td className="px-8 py-6 text-[10px] font-mono text-slate-400">{product.stripePriceId || 'MISSING'}</td>
                  <td className="px-8 py-6 text-right">
                    <button onClick={() => deleteProduct(product.id)} className="text-slate-300 hover:text-red-600 transition-colors p-2">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showNewDrop && (
          <div className="fixed inset-0 bg-mighty-dark/95 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <div className="bg-white p-10 max-w-md w-full relative">
              <button onClick={() => setShowNewDrop(false)} className="absolute top-6 right-6 text-slate-400 hover:text-mighty-dark"><X size={24} /></button>
              <h2 className="text-3xl font-black italic uppercase mb-8 text-mighty-dark">Initialize Drop</h2>
              <form onSubmit={handleCreateDrop} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Design Name</label>
                  <input className="w-full border-b-2 border-slate-100 p-2 focus:border-mighty outline-none font-bold uppercase" value={newName} onChange={(e) => setNewName(e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Price ($)</label>
                    <input type="number" className="w-full border-b-2 border-slate-100 p-2 focus:border-mighty outline-none font-bold" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Stripe Price ID</label>
                    <input className="w-full border-b-2 border-slate-100 p-2 focus:border-mighty outline-none font-mono text-[10px]" value={newStripeId} onChange={(e) => setNewStripeId(e.target.value)} placeholder="price_..." required />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Image URL</label>
                  <input className="w-full border-b-2 border-slate-100 p-2 focus:border-mighty outline-none text-slate-500" value={newImage} onChange={(e) => setNewImage(e.target.value)} placeholder="https://i.postimg.cc/..." />
                </div>
                <button type="submit" className="w-full bg-mighty text-white py-5 font-black uppercase text-[12px] tracking-[0.3em] hover:bg-mighty-dark shadow-xl mt-4">Confirm Drop</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;