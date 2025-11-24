import React from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Target, Cpu, Box, MessageSquare, FileText } from 'lucide-react';

interface HeroProps {
  onOpenTerminal: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="hero" className="relative bg-military-dark overflow-hidden h-screen flex items-center justify-center">
      
      {/* Tech Grid Background */}
      <div className="absolute inset-0 z-0 perspective-grid overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-50"></div>
        <motion.div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#00ff9d_1px,transparent_1px),linear-gradient(to_bottom,#00ff9d_1px,transparent_1px)] bg-[size:100px_100px] opacity-5"
          animate={{ 
            backgroundPosition: ["0px 0px", "100px 100px"] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </div>

      {/* Image Overlay with Scan Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-military-dark/80 z-10"></div>
        <img
          className="w-full h-full object-cover grayscale opacity-20"
          src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop"
          alt="Drone surveillance"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-military-dark via-transparent to-military-dark z-10"></div>
      </div>

      {/* Scanlines */}
      <div className="scanlines"></div>

      {/* Main Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center">
          
          {/* Top HUD Element */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6 flex items-center gap-4 text-tactical-green/70 font-mono text-xs tracking-[0.3em] border-b border-tactical-green/30 pb-2"
          >
            <Crosshair className="w-4 h-4 animate-spin-slow" />
            TARGET ACQUISITION ACTIVE
            <span className="animate-blink">_</span>
          </motion.div>

          {/* Main Title with Glitch Effect */}
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-7xl md:text-9xl font-display font-black text-white mb-4 tracking-tighter relative"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600 drop-shadow-[0_0_15px_rgba(0,255,157,0.1)]">
              KAIS
            </span>
            <span className="absolute -top-4 -right-8 text-tactical-green text-xs font-mono font-normal tracking-widest opacity-60 border border-tactical-green px-1">V.2.0</span>
            <div className="absolute inset-0 animate-pulse opacity-10 text-tactical-green blur-[2px]">KAIS</div>
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-3xl text-slate-300 font-mono uppercase tracking-widest mb-8"
          >
            Karikalan Aerial <span className="text-tactical-green font-bold">Intelligence</span> System
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl mx-auto text-slate-400 mb-12 text-sm md:text-base leading-relaxed border-l-2 border-tactical-green pl-6 text-left font-mono bg-black/30 p-4 rounded-r-lg backdrop-blur-sm"
          >
            Next-generation autonomous loitering munitions designed for surgical precision. 
            Deploying advanced AI algorithms for real-time threat assessment and kinetic neutralization.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-stretch"
          >
            {/* Button 1: 3D Hangar (Primary) */}
            <button 
              onClick={() => scrollToSection('systems')}
              className="group relative px-8 py-4 bg-tactical-green/10 border border-tactical-green text-tactical-green font-mono font-bold uppercase tracking-wider overflow-hidden hover:bg-tactical-green hover:text-black transition-all duration-300 clip-path-button min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Box className="w-5 h-5" />
                3D Hangar
              </span>
              <div className="absolute inset-0 bg-tactical-green transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out -z-0"></div>
            </button>
            
            {/* Button 2: AI Chat (Secondary Tech) */}
            <button 
              onClick={onOpenTerminal}
              className="group px-8 py-4 bg-black/50 border border-slate-500 text-slate-200 font-mono font-bold uppercase tracking-wider hover:border-tactical-cyan hover:text-tactical-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300 flex items-center justify-center gap-2 clip-path-button min-w-[200px]"
            >
              <MessageSquare className="w-5 h-5 group-hover:animate-pulse" />
              AI Command
            </button>

            {/* Button 3: Mission Intel (Secondary Info) */}
            <button 
              onClick={() => scrollToSection('mission')}
              className="group px-8 py-4 bg-transparent border border-slate-700 text-slate-400 font-mono font-bold uppercase tracking-wider hover:border-white hover:text-white transition-all duration-300 flex items-center justify-center gap-2 clip-path-button min-w-[200px]"
            >
              <FileText className="w-5 h-5" />
              Mission Intel
            </button>
          </motion.div>

          {/* HUD Footer Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 w-full max-w-6xl flex justify-between text-[10px] font-mono text-slate-500 uppercase px-8"
          >
            <div className="flex flex-col text-left gap-1">
              <span className="flex items-center gap-2"><div className="w-1 h-1 bg-tactical-green rounded-full"></div>Coords: 34.0522° N, 118.2437° W</span>
              <span>Alt: 35,000ft | Spd: 120kn</span>
            </div>
            <div className="hidden md:flex gap-8 border-t border-slate-800 pt-2">
               <span>Encryption: AES-256</span>
               <span>SatLink: ACTIVE</span>
               <span>AI Core: ON</span>
            </div>
            <div className="flex flex-col text-right gap-1">
              <span className="flex items-center justify-end gap-2">Wind: 12kn NW <div className="w-1 h-1 bg-tactical-green rounded-full"></div></span>
              <span>Vis: 100% | Hum: 45%</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Decorative Corner Brackets */}
      <div className="absolute top-24 left-4 w-16 h-16 border-l-2 border-t-2 border-tactical-green/50 rounded-tl-lg hidden md:block opacity-50"></div>
      <div className="absolute top-24 right-4 w-16 h-16 border-r-2 border-t-2 border-tactical-green/50 rounded-tr-lg hidden md:block opacity-50"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-tactical-green/50 rounded-bl-lg hidden md:block opacity-50"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-tactical-green/50 rounded-br-lg hidden md:block opacity-50"></div>
    </div>
  );
};

export default Hero;