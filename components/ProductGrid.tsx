
import React, { useState } from 'react';
import { DRONE_DATA } from '../constants';
import { DroneModel } from '../types';
import { Crosshair, Gauge, Battery, Zap, ArrowUpRight, ChevronDown, ChevronUp, Database, Shield, Box, Clock, Weight, Cpu, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ModelViewer from './ModelViewer';

interface ProductCardProps {
  drone: DroneModel;
  index: number;
  onView3D: (drone: DroneModel) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ drone, index, onView3D }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-military-card/50 border border-slate-800 hover:border-tactical-green/60 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Hover Overlay Effect */}
      <div className="absolute inset-0 bg-tactical-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"></div>
      <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-tactical-green opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-tactical-green opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

      {/* Image Area with Glitch Effect */}
      <div className="relative h-64 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 z-10"></div>
        <img 
          src={drone.imageUrl} 
          alt={drone.model} 
          className="w-full h-full object-contain p-4 opacity-80 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-military-card to-transparent h-24 z-10"></div>
        
        {/* Floating Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className="bg-black/80 backdrop-blur text-tactical-green border border-tactical-green/30 text-xs font-mono px-2 py-1 uppercase tracking-widest">
            {drone.id}
          </span>
        </div>

        {/* 3D View Button (Overlay) */}
        <button 
          onClick={() => onView3D(drone)}
          className="absolute bottom-4 left-4 z-30 bg-black/70 hover:bg-tactical-green hover:text-black text-white border border-slate-600 hover:border-tactical-green px-3 py-1 flex items-center gap-2 transition-all duration-300 backdrop-blur-sm font-mono text-xs uppercase tracking-wider"
        >
           <Box className="w-3 h-3" />
           View 3D Model
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col relative z-20">
        <div className="flex justify-between items-start mb-4">
          <div>
             <h3 className="text-2xl font-display font-bold text-white group-hover:text-tactical-green transition-colors">{drone.model}</h3>
             <p className="text-slate-500 text-xs font-mono uppercase tracking-wider">{drone.type}</p>
          </div>
          <Zap className="w-5 h-5 text-slate-600 group-hover:text-tactical-cyan transition-colors" />
        </div>

        <div className="w-12 h-[2px] bg-slate-700 mb-4 group-hover:bg-tactical-green group-hover:w-full transition-all duration-500"></div>

        <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed font-light border-l-2 border-slate-800 pl-3 group-hover:border-tactical-green transition-colors">
          {drone.description}
        </p>

        {/* Interactive Specs Section - Hover to Expand */}
        <div 
          className="mt-auto group/specs relative"
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Quick Specs Grid with Scaling Animation */}
          <motion.div 
            animate={{ 
              scale: isExpanded ? 1.08 : 1,
              borderColor: isExpanded ? 'rgba(0, 255, 157, 0.8)' : 'rgba(51, 65, 85, 1)',
              y: isExpanded ? -10 : 0,
              boxShadow: isExpanded ? '0 10px 30px -10px rgba(0, 255, 157, 0.3)' : 'none'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="grid grid-cols-3 gap-px bg-slate-800 mb-6 border border-slate-700 relative z-20 cursor-pointer origin-bottom shadow-lg bg-military-card"
          >
            <div className="bg-military-card p-2 text-center group-hover/specs:bg-slate-800/80 transition-colors">
              <Crosshair className="w-3 h-3 text-tactical-green mx-auto mb-1 opacity-70" />
              <p className="text-[9px] text-slate-500 uppercase font-mono">Range</p>
              <p className="text-xs font-bold text-white font-display">{drone.specs.range}</p>
            </div>
            <div className="bg-military-card p-2 text-center group-hover/specs:bg-slate-800/80 transition-colors">
              <Gauge className="w-3 h-3 text-tactical-green mx-auto mb-1 opacity-70" />
              <p className="text-[9px] text-slate-500 uppercase font-mono">Payload</p>
              <p className="text-xs font-bold text-white font-display">{drone.specs.payload.split(' ')[0]}</p>
            </div>
            <div className="bg-military-card p-2 text-center group-hover/specs:bg-slate-800/80 transition-colors">
              <Battery className="w-3 h-3 text-tactical-green mx-auto mb-1 opacity-70" />
              <p className="text-[9px] text-slate-500 uppercase font-mono">Time</p>
              <p className="text-xs font-bold text-white font-display">{drone.specs.endurance}</p>
            </div>
          </motion.div>

          {/* Action Row */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 font-mono text-xs">{drone.priceRange}</span>
            <span 
              className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider transition-colors ${isExpanded ? 'text-tactical-green' : 'text-slate-500'}`}
            >
              {isExpanded ? 'Systems Online' : 'Full Specs'} 
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </span>
          </div>

          {/* Collapsible Details Accordion */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-slate-700 bg-black/40 -mx-6 -mb-6 px-6 pb-6">
                  <div className="flex items-center gap-2 text-tactical-green font-mono text-xs mb-3">
                    <Database className="w-3 h-3" />
                    TECHNICAL SPECIFICATIONS
                  </div>
                  <ul className="space-y-2 font-mono text-xs text-slate-400">
                     <li className="flex justify-between items-center">
                       <span className="flex items-center gap-2"><Crosshair className="w-3 h-3 text-tactical-green" /> OPERATIONAL RANGE:</span>
                       <span className="text-white">{drone.specs.range}</span>
                     </li>
                     <li className="flex justify-between items-center">
                       <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-tactical-green" /> ENDURANCE LOITER:</span>
                       <span className="text-white">{drone.specs.endurance}</span>
                     </li>
                     <li className="flex justify-between items-center">
                       <span className="flex items-center gap-2"><Weight className="w-3 h-3 text-tactical-green" /> WARHEAD CAPACITY:</span>
                       <span className="text-white">{drone.specs.payload}</span>
                     </li>
                     <li className="flex justify-between items-center">
                       <span className="flex items-center gap-2"><Cpu className="w-3 h-3 text-tactical-green" /> GUIDANCE:</span>
                       <span className="text-white">AI/GPS/INS</span>
                     </li>
                     <li className="flex justify-between items-center">
                       <span className="flex items-center gap-2"><Rocket className="w-3 h-3 text-tactical-green" /> LAUNCH METHOD:</span>
                       <span className="text-white">Pneumatic / Rail</span>
                     </li>
                  </ul>
                  <div className="mt-4 pt-2 border-t border-slate-800 flex items-center gap-2 text-xs text-alert-red">
                    <Shield className="w-3 h-3" />
                    CLASSIFIED: LEVEL 3 ACCESS
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
};

const ProductGrid: React.FC = () => {
  const [selectedDrone, setSelectedDrone] = useState<DroneModel | null>(null);

  return (
    <section id="systems" className="py-32 bg-military-dark relative overflow-hidden scroll-mt-24">
      {/* Anchor for Specs navigation */}
      <span id="specs" className="absolute top-0 left-0 w-full h-0 scroll-mt-24 invisible"></span>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-tactical-green/5 rounded-full blur-3xl"></div>
      <div className="absolute left-10 bottom-10 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-tactical-green font-mono font-bold tracking-wider uppercase text-xs mb-2"
            >
              <span className="w-2 h-2 bg-tactical-green rounded-full animate-pulse"></span>
              KAIS Arsenal: 3D Enabled
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-display font-bold text-white"
            >
              3D Hangar
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="max-w-md text-slate-400 text-sm font-mono border-l border-slate-700 pl-4"
          >
            Select a KAIS platform to initiate 3D holographic analysis. Inspect airframe integrity and sensor payloads.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DRONE_DATA.map((drone, index) => (
            <ProductCard 
              key={drone.id} 
              drone={drone} 
              index={index} 
              onView3D={(d) => setSelectedDrone(d)}
            />
          ))}
        </div>
      </div>

      {/* 3D Viewer Modal */}
      <ModelViewer 
        isOpen={!!selectedDrone}
        onClose={() => setSelectedDrone(null)}
        modelUrl={selectedDrone?.modelUrl}
        modelName={selectedDrone?.model || 'Unknown Asset'}
      />
    </section>
  );
};

export default ProductGrid;
