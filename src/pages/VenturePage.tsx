import React from 'react';
import { motion } from 'motion/react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { getIcon } from '../utils/icons';

export default function VenturePage() {
  const { slug } = useParams();
  const { data, loading } = usePortfolio();

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
          className="glass-card p-6 sm:p-8 md:p-12 neon-border"
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
      </div>
    </div>
  );
}
