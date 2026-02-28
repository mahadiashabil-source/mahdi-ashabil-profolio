import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Image as ImageIcon, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { getIcon } from '../utils/icons';

export default function VenturePage() {
  const { slug } = useParams();
  const { data, loading } = usePortfolio();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400 font-mono">LOADING_VENTURE...</div>;
  if (!data) return <Navigate to="/" />;

  const venture = data.ventures.find(v => v.link === `/${slug}`);
  if (!venture) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-grid bg-black text-white p-4 sm:p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 sm:mb-12">
          <ArrowLeft className="w-5 h-5" /> Back to Portfolio
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 sm:p-8 md:p-12 neon-border mb-12"
        >
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-start">
            <img 
              src={venture.img} 
              alt={venture.title} 
              className="w-32 h-32 sm:w-48 sm:h-48 rounded-2xl object-cover border border-white/10"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 text-center md:text-left w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-2 sm:mb-4 gradient-text inline-block">{venture.title}</h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-4 sm:mb-6">{venture.details.subtitle}</p>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6 sm:mb-8">
                {venture.details.description}
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                {venture.details.links.map((link, i) => (
                  <a 
                    key={i} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 px-4 py-3 sm:px-6 sm:py-3 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:text-cyan-400 hover:border-cyan-400/50 w-full sm:w-auto`}
                  >
                    {getIcon(link.type, { className: "w-6 h-6" })}
                    <span className="font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Venture Gallery */}
        {venture.details.gallery && venture.details.gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-2xl font-bold text-center">Project <span className="gradient-text">Gallery</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {venture.details.gallery.map((img, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedImg(img)}
                  className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer border border-white/10 group"
                >
                  <img 
                    src={img} 
                    alt={`${venture.title} gallery ${i}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white/70" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-5xl w-full"
          >
            <button className="absolute -top-12 right-0 text-white/50 hover:text-white transition-colors">
              <X className="w-8 h-8" />
            </button>
            <img 
              src={selectedImg} 
              alt="Gallery Preview" 
              className="w-full h-auto rounded-3xl shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
