
import React, { useState } from 'react';
import { Menu, X, Radar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-military-dark/80 border-b border-slate-800 fixed w-full z-50 backdrop-blur-md"
    >
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tactical-green/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo */}
          <div className="flex items-center group cursor-pointer gap-4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex-shrink-0 relative w-20 h-20 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-tactical-green/30 rounded-full"
              />
              <motion.div
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 transition={{ type: "spring", stiffness: 260, damping: 20 }}
                 className="relative z-10"
              >
                 <img 
                   src="https://i.postimg.cc/Czsv9wgY/1763789268716-removebg-preview.png" 
                   alt="KAIS Logo" 
                   className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(0,255,157,0.5)]"
                 />
              </motion.div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-white font-display font-bold text-2xl tracking-widest leading-none group-hover:text-tactical-green transition-colors glitch-hover">
                KAIS
              </span>
              <span className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase mt-1">
                Karikalan Aerial Intel
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {['Mission', 'Systems', 'Specs'].map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  key={item}
                >
                  <button 
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="relative group px-3 py-2 text-sm font-mono font-medium text-slate-300 hover:text-tactical-green transition-colors inline-block bg-transparent border-none cursor-pointer"
                  >
                    <span className="relative z-10">{item}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-tactical-green group-hover:w-full transition-all duration-300"></span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center text-xs text-tactical-green/80 font-mono border border-tactical-green/20 px-2 py-1 rounded bg-emerald-900/10"
            >
              <Radar className="w-4 h-4 mr-2 animate-spin-slow" />
              <span className="animate-pulse">SYSTEMS: ONLINE</span>
            </motion.div>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,255,157,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-tactical-green text-black px-6 py-2 clip-path-button font-display font-bold text-xs tracking-widest uppercase hover:bg-white transition-all"
            >
              Secure Login
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 font-mono">
              <button onClick={() => scrollToSection('mission')} className="w-full text-left text-slate-300 hover:text-tactical-green block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-tactical-green bg-slate-800/50 hover:bg-slate-800">Mission</button>
              <button onClick={() => scrollToSection('systems')} className="w-full text-left text-slate-300 hover:text-tactical-green block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-tactical-green bg-slate-800/50 hover:bg-slate-800">Systems</button>
              <button onClick={() => scrollToSection('specs')} className="w-full text-left text-slate-300 hover:text-tactical-green block px-3 py-2 rounded-md text-base font-medium border-l-2 border-transparent hover:border-tactical-green bg-slate-800/50 hover:bg-slate-800">Specs</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;
