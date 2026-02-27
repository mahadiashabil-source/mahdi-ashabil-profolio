import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { usePortfolio } from '../context/PortfolioContext';
import { Save, LogOut, Plus, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { data, refresh } = usePortfolio();
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editedData, setEditedData] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (data) setEditedData(JSON.parse(JSON.stringify(data)));
  }, [data]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        setIsLoggedIn(true);
        setMessage('');
      } else {
        setMessage('Invalid password');
      }
    } catch (err) {
      setMessage('Login failed');
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, data: editedData })
      });
      if (res.ok) {
        setMessage('Saved successfully!');
        refresh();
      } else {
        setMessage('Failed to save');
      }
    } catch (err) {
      setMessage('Save failed');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 w-full max-w-md border border-white/10"
        >
          <h1 className="text-3xl font-display font-bold mb-6 text-center gradient-text">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Admin Password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-400 outline-none"
            />
            <button className="w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-cyan-400 transition-colors">
              Login
            </button>
            {message && <p className="text-red-400 text-center text-sm">{message}</p>}
          </form>
        </motion.div>
      </div>
    );
  }

  if (!editedData) return <div className="text-white text-center p-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-white/5 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-display font-bold gradient-text">Admin Panel</h1>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-colors"
            >
              <Save className="w-5 h-5" /> Save Changes
            </button>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>

        {message && (
          <div className={`mb-8 p-4 rounded-xl text-center ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {message}
          </div>
        )}

        <div className="space-y-12 pb-20">
          {/* Hero Section */}
          <section className="glass-card p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-2">Hero Section</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name</label>
                <input 
                  value={editedData.hero.name}
                  onChange={(e) => setEditedData({...editedData, hero: {...editedData.hero, name: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Title</label>
                <input 
                  value={editedData.hero.title}
                  onChange={(e) => setEditedData({...editedData, hero: {...editedData.hero, title: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-cyan-400"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Image URL</label>
                <input 
                  value={editedData.hero.image}
                  onChange={(e) => setEditedData({...editedData, hero: {...editedData.hero, image: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="glass-card p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-2">About Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Bio Paragraph 1</label>
                <textarea 
                  value={editedData.about.text1}
                  onChange={(e) => setEditedData({...editedData, about: {...editedData.about, text1: e.target.value}})}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Bio Paragraph 2</label>
                <textarea 
                  value={editedData.about.text2}
                  onChange={(e) => setEditedData({...editedData, about: {...editedData.about, text2: e.target.value}})}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-cyan-400"
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {editedData.about.stats.map((stat: any, i: number) => (
                  <div key={i} className="space-y-2">
                    <input 
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...editedData.about.stats];
                        newStats[i].label = e.target.value;
                        setEditedData({...editedData, about: {...editedData.about, stats: newStats}});
                      }}
                      placeholder="Label"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm"
                    />
                    <input 
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...editedData.about.stats];
                        newStats[i].value = e.target.value;
                        setEditedData({...editedData, about: {...editedData.about, stats: newStats}});
                      }}
                      placeholder="Value"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm font-bold"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Ventures Section */}
          <section className="glass-card p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-2">
              <h2 className="text-xl font-bold">Ventures</h2>
              <button 
                onClick={() => {
                  const newVentures = [...editedData.ventures, {
                    title: "New Venture",
                    role: "Role",
                    desc: "Description",
                    img: "https://picsum.photos/seed/new/600/800",
                    tag: "Tag",
                    link: "/new",
                    details: { subtitle: "", description: "", links: [] }
                  }];
                  setEditedData({...editedData, ventures: newVentures});
                }}
                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-8">
              {editedData.ventures.map((venture: any, i: number) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 relative">
                  <button 
                    onClick={() => {
                      const newVentures = editedData.ventures.filter((_: any, idx: number) => idx !== i);
                      setEditedData({...editedData, ventures: newVentures});
                    }}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Title</label>
                      <input 
                        value={venture.title}
                        onChange={(e) => {
                          const newVentures = [...editedData.ventures];
                          newVentures[i].title = e.target.value;
                          setEditedData({...editedData, ventures: newVentures});
                        }}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Role</label>
                      <input 
                        value={venture.role}
                        onChange={(e) => {
                          const newVentures = [...editedData.ventures];
                          newVentures[i].role = e.target.value;
                          setEditedData({...editedData, ventures: newVentures});
                        }}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">Description</label>
                      <textarea 
                        value={venture.desc}
                        onChange={(e) => {
                          const newVentures = [...editedData.ventures];
                          newVentures[i].desc = e.target.value;
                          setEditedData({...editedData, ventures: newVentures});
                        }}
                        className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
                      />
                    </div>
                    {/* Subpage Details */}
                    <div className="md:col-span-2 border-t border-white/5 pt-4 mt-2">
                      <h4 className="text-sm font-bold mb-4 text-cyan-400">Subpage Details</h4>
                      <div className="space-y-4">
                        <input 
                          value={venture.details.subtitle}
                          onChange={(e) => {
                            const newVentures = [...editedData.ventures];
                            newVentures[i].details.subtitle = e.target.value;
                            setEditedData({...editedData, ventures: newVentures});
                          }}
                          placeholder="Subpage Subtitle"
                          className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
                        />
                        <textarea 
                          value={venture.details.description}
                          onChange={(e) => {
                            const newVentures = [...editedData.ventures];
                            newVentures[i].details.description = e.target.value;
                            setEditedData({...editedData, ventures: newVentures});
                          }}
                          placeholder="Subpage Detailed Description"
                          rows={3}
                          className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Socials Section */}
          <section className="glass-card p-6 border border-white/10">
            <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-2">Social Links</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {editedData.socials.map((social: any, i: number) => (
                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-cyan-400">{social.type}</span>
                  </div>
                  <input 
                    value={social.url}
                    onChange={(e) => {
                      const newSocials = [...editedData.socials];
                      newSocials[i].url = e.target.value;
                      setEditedData({...editedData, socials: newSocials});
                    }}
                    className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-1 text-sm"
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
