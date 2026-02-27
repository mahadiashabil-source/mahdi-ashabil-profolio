import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { getIcon } from '../utils/icons';
import { 
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
  Twitter
} from 'lucide-react';

const ParticleBackground = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, duration: number, delay: number}>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 2}px rgba(255,255,255,0.5)`
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const Hero = ({ data }: { data: any }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 blur-xl opacity-50 animate-rotate-glow"></div>
          <img 
            src={data.image} 
            alt={data.name} 
            className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-56 md:h-56 rounded-full object-cover border-2 border-white/10"
            referrerPolicy="no-referrer"
          />
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-4 text-glow"
        >
          {data.name}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-400 font-light tracking-wide"
        >
          {data.title}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute -bottom-24 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const About = ({ data }: { data: any }) => {
  return (
    <section className="py-16 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative p-6 sm:p-8 md:p-12 rounded-3xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-800/90 border border-slate-700/50 shadow-[0_0_40px_rgba(56,189,248,0.1)] overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3"></div>
        
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 bg-gradient-to-r from-sky-400 to-indigo-400 text-transparent bg-clip-text inline-block">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>{data.text1}</p>
            <p>{data.text2}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {data.stats.map((stat: any, i: number) => (
              <div key={i} className="bg-slate-800/40 p-4 sm:p-6 rounded-2xl text-center border border-slate-700/50 hover:border-sky-400/40 hover:bg-slate-800/60 transition-all duration-300 group">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 group-hover:text-sky-400 transition-colors">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const Skills = ({ data }: { data: any[] }) => {
  return (
    <section className="py-16 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-display font-bold mb-8 sm:mb-12 text-center"
      >
        Creative <span className="gradient-text">Arsenal</span>
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {data.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -10 }}
            className="glass-card p-6 sm:p-8 flex flex-col items-center text-center group relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            <motion.div 
              initial={{ scale: 0, opacity: 0, rotate: -15 }}
              whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: i * 0.1 + 0.3 }}
              className="relative z-10 mb-4"
            >
              <div className={`p-4 rounded-full bg-white/5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-white`}>
                {getIcon(skill.icon, { className: "w-8 h-8" })}
              </div>
            </motion.div>
            <h3 className="text-xl font-semibold relative z-10">{skill.name}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Ventures = ({ data }: { data: any[] }) => {
  return (
    <section className="py-16 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-display font-bold mb-8 sm:mb-12 text-center"
      >
        My <span className="gradient-text">Ventures</span>
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {data.map((venture, i) => (
          <Link to={venture.link} key={i}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 h-full flex flex-col"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
              <img 
                src={venture.img} 
                alt={venture.title} 
                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
                <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                  <span className="px-2 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-semibold bg-cyan-500/20 text-cyan-400 rounded-full backdrop-blur-sm border border-cyan-500/30">{venture.tag}</span>
                  <span className="text-[10px] sm:text-xs text-gray-300 font-mono">{venture.role}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-1 sm:mb-2">{venture.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 sm:line-clamp-none">{venture.desc}</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/50 rounded-2xl z-30 transition-colors duration-300 pointer-events-none"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-cyan-400 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

const Achievements = ({ data }: { data: any[] }) => {
  return (
    <section className="py-16 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-display font-bold mb-8 sm:mb-12 text-center"
      >
        Milestones & <span className="gradient-text">Achievements</span>
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {data.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-cyan-400/20 transition-colors duration-500 animate-pulse-glow"></div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-6 p-4 rounded-full bg-black/50 backdrop-blur-md border border-white/10 shadow-lg">
                {getIcon(item.icon, { className: `w-8 h-8 ${item.color}` })}
              </div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <span className="text-sm text-gray-400 font-mono px-3 py-1 bg-white/5 rounded-full">{item.year}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Socials = ({ data }: { data: any[] }) => {
  return (
    <section className="py-16 sm:py-24 px-4 md:px-8 max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-6 sm:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-violet-500"></div>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 sm:mb-10">Connect With Me</h2>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
          {data.map((social, i) => (
            <motion.a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 hover:bg-white/10`}
            >
              {getIcon(social.type, { className: "w-10 h-10" })}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Footer = ({ socials }: { socials: any[] }) => {
  return (
    <footer className="py-8 border-t border-white/10 text-center text-gray-500 text-sm bg-black/50 backdrop-blur-md">
      <div className="flex justify-center gap-6 mb-4">
        {socials.slice(0, 3).map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            {getIcon(s.type, { className: "w-5 h-5" })}
          </a>
        ))}
      </div>
      <p>© {new Date().getFullYear()} Mahdi Ashabil. All rights reserved.</p>
    </footer>
  );
};

export default function Home() {
  const { data, loading, refresh } = usePortfolio();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-cyan-400 font-mono gap-6">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-cyan-900 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-xl tracking-[0.2em] animate-pulse font-bold">LOADING_PORTFOLIO_V2</div>
          <div className="text-[10px] text-cyan-800 uppercase tracking-widest">Establishing secure connection...</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-red-400 font-mono p-4 text-center gap-6">
        <div className="text-2xl font-bold">SYSTEM_FAILURE: DATA_NOT_FOUND</div>
        <p className="text-gray-400 max-w-md">
          Could not connect to the portfolio database. Please check your Supabase connection and RLS policies.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all"
        >
          RETRY_CONNECTION
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grid">
      <Hero data={data.hero} />
      <About data={data.about} />
      <Skills data={data.skills} />
      <Ventures data={data.ventures} />
      <Achievements data={data.achievements} />
      <Socials data={data.socials} />
      <Footer socials={data.socials} />
    </div>
  );
}
