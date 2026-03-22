import React, { useState, useEffect } from 'react';
import { Plus, Package, DollarSign, ShoppingBag, Image as ImageIcon, Trash2, X, Lock } from 'lucide-react';

const Dashboard = ({ orders, products, setProducts }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  // --- 🛡️ MIGHTY GATEKEEPER ---
  useEffect(() => {
    const MIGHTY_PASS = "MIGHTY2026"; // Set your desired password here
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

  // State for the modal
  const [showNewDrop, setShowNewDrop] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImage, setNewImage] = useState('');

  // Security: Stop rendering if not authorized
  if (!isAuthorized) return null;

  const handleCreateDrop = (e) => {
    e.preventDefault();
    if (!newName || !newPrice) return;

    const newProduct = {
      id: Date.now(),
      name: newName.toUpperCase(),
      price: parseFloat(newPrice),
      color: 'Original',
      image: newImage || null
    };

    setProducts([...products, newProduct]);
    setNewName('');
    setNewPrice('');
    setNewImage('');
    setShowNewDrop(false);
  };

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to remove this item from the store?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.price, 0);

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Logout */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-3xl font-black italic uppercase text-mighty-dark leading-none">Mighty Command</h1>
            <p className="text-[10px] font-bold text-slate-400 tracking-[0.3em] uppercase mt-2">Inventory & Revenue Management</p>
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
                className="bg-mighty-dark text-white px-8 py-4 rounded-sm font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95"
            >
                <Plus size={14} /> New Drop
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-8 border border-slate-200 shadow-sm">
            <DollarSign className="text-mighty mb-4" size={24} />
            <div className="text-3xl font-black italic text-mighty-dark">${totalRevenue.toFixed(2)}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Gross Revenue</div>
          </div>
          <div className="bg-white p-8 border border-slate-200 shadow-sm">
            <ShoppingBag className="text-mighty mb-4" size={24} />
            <div className="text-3xl font-black italic text-mighty-dark">{orders.length}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Orders</div>
          </div>
          <div className="bg-white p-8 border border-slate-200 shadow-sm">
            <Package className="text-mighty mb-4" size={24} />
            <div className="text-3xl font-black italic text-mighty-dark">{products.length}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Active Items</div>
          </div>
        </div>

        {/* Inventory Management Table */}
        <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-mighty-dark">Current Inventory</h2>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                <th className="px-8 py-4">Item</th>
                <th className="px-8 py-4">Price</th>
                <th className="px-8 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6 font-bold uppercase italic text-mighty-dark">{product.name}</td>
                  <td className="px-8 py-6 font-medium text-slate-600">${product.price}</td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => deleteProduct(product.id)}
                      className="text-slate-300 hover:text-red-600 transition-colors p-2"
                      title="Remove Product"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* New Drop Modal */}
        {showNewDrop && (
          <div className="fixed inset-0 bg-mighty-dark/95 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <div className="bg-white p-10 max-w-md w-full relative">
              <button 
                onClick={() => setShowNewDrop(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-mighty-dark transition-colors"
              >
                <X size={24} />
              </button>
              
              <h2 className="text-3xl font-black italic uppercase mb-8 text-mighty-dark">Initialize Drop</h2>
              
              <form onSubmit={handleCreateDrop} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Design Name</label>
                  <input 
                    className="w-full border-b-2 border-slate-100 p-2 focus:border-mighty outline-none font-bold uppercase text-lg"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="HEAVYWEIGHT HOODIE"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">Price ($)</label>
                  <input 
                    type="number"
                    className="w-full border-b-2 border-slate-100 p-2 focus:border-mighty outline-none font-bold text-lg"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="95"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2 flex items-center gap-2">
                    <ImageIcon size={12} /> Image URL
                  </label>
                  <input 
                    type="text"
                    className="w-full border-b-2 border-slate-100 p-2 focus:border-mighty outline-none font-bold text-slate-500"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-mighty text-white py-5 font-black uppercase text-[12px] tracking-[0.3em] hover:bg-mighty-dark transition-colors shadow-xl mt-4"
                >
                  Confirm Drop
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;