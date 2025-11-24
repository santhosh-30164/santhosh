
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import ChatInterface from './components/ChatInterface';
import { Activity, ShieldCheck, Radio, Target } from 'lucide-react';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="bg-military-dark min-h-screen text-slate-200 selection:bg-tactical-green selection:text-black font-sans overflow-x-hidden">
      <Header />
      <main>
        <Hero onOpenTerminal={() => setIsChatOpen(true)} />
        <ProductGrid />
        
        {/* About / Tech Section */}
        <section id="mission" className="py-24 bg-slate-900 border-t border-slate-800 relative overflow-hidden scroll-mt-24">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-military-dark to-slate-900"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-grid-pattern opacity-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
             <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
                <div className="mb-12 lg:mb-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tactical-green/10 border border-tactical-green/30 text-tactical-green text-xs font-mono uppercase tracking-widest mb-6">
                    <Activity className="w-3 h-3 animate-pulse" />
                    Mission Parameters
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                    Dominance Through <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-tactical-green to-emerald-600">Aerial Intelligence</span>
                  </h2>
                  <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light font-mono text-sm md:text-base">
                    The modern battlefield demands immediate, actionable kinetic responses. KAIS provides commanders with autonomous loitering munitions capable of identifying and neutralizing high-value targets in complex environments with zero latency.
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      { title: "Autonomous Recognition", desc: "Onboard AI processes visual data to identify targets without operator input." },
                      { title: "Swarm Capability", desc: "Inter-unit communication allows for coordinated strikes on multiple vectors." },
                      { title: "Low Acoustic Signature", desc: "Silent electric propulsion ensures surprise is maintained until impact." }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start group">
                        <div className="flex-shrink-0 h-8 w-8 rounded bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-tactical-green transition-colors">
                          <ShieldCheck className="w-4 h-4 text-slate-500 group-hover:text-tactical-green" />
                        </div>
                        <div className="ml-4">
                          <h4 className="text-white font-display font-bold text-sm uppercase group-hover:text-tactical-green transition-colors">{item.title}</h4>
                          <p className="text-slate-500 text-xs mt-1 group-hover:text-slate-400 font-mono">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute -inset-4 bg-tactical-green/5 rounded-lg blur-2xl"></div>
                  <div className="relative rounded-lg overflow-hidden border border-slate-700 shadow-2xl group">
                    <div className="absolute inset-0 bg-grid-pattern opacity-30 z-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <div className="scanlines opacity-30"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1559627764-344640c2d937?q=80&w=2070&auto=format&fit=crop" 
                      alt="Military Technology" 
                      className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                    />
                    
                    {/* Overlay UI */}
                    <div className="absolute bottom-6 left-6 z-20">
                      <div className="flex items-center gap-2 text-tactical-green font-mono text-xs mb-1">
                        <Radio className="w-4 h-4 animate-pulse" />
                        <span>LIVE FEED // CAM-04</span>
                      </div>
                      <div className="w-48 h-1 bg-slate-700 rounded overflow-hidden">
                         <div className="h-full bg-tactical-green w-2/3 animate-scan"></div>
                      </div>
                    </div>
                    <div className="absolute top-6 right-6 z-20 border border-tactical-green/50 p-2 bg-black/50 backdrop-blur">
                      <Target className="w-6 h-6 text-tactical-green animate-pulse" />
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-slate-900 pt-16 pb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-tactical-green/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-white font-display font-bold text-2xl mb-4 flex items-center gap-2">
                KAIS <span className="text-tactical-green text-sm font-mono font-normal opacity-50">| SYSTEMS</span>
              </h4>
              <p className="text-slate-500 text-sm max-w-sm leading-relaxed mb-6 font-mono">
                Karikalan Aerial Intelligence System.
                <br/>
                Authorized for government and defense contractor access only. Unauthorized access is a violation of international cyber-security protocols.
              </p>
              <div className="flex gap-4">
                {['x', 'linkedin', 'github'].map((social) => (
                   <a key={social} href="#" className="w-8 h-8 rounded border border-slate-800 flex items-center justify-center text-slate-500 hover:text-tactical-green hover:border-tactical-green hover:shadow-[0_0_10px_rgba(0,255,157,0.3)] transition-all text-xs uppercase">
                     {social[0]}
                   </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-mono font-bold mb-6 uppercase text-xs tracking-widest border-b border-slate-800 pb-2 inline-block">Platform</h4>
              <ul className="space-y-3 text-slate-500 text-sm font-mono">
                {['T-Series Munitions', 'Swarm OS', 'Ground Control', 'Naval Intercept'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-tactical-green hover:pl-2 transition-all duration-300 block">_ {item}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-mono font-bold mb-6 uppercase text-xs tracking-widest border-b border-slate-800 pb-2 inline-block">Legal & Compliance</h4>
              <ul className="space-y-3 text-slate-500 text-sm font-mono">
                {['ITAR Compliance', 'Export Controls', 'Privacy Protocol', 'Terms of Engagement'].map((item) => (
                  <li key={item}><a href="#" className="hover:text-alert-red hover:pl-2 transition-all duration-300 block">! {item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600 font-mono uppercase">
            <p>&copy; 2024 Karikalan Aerial Intelligence System. All Rights Reserved.</p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-900 border border-tactical-green animate-pulse"></span>
              <span>System Status: Operational</span>
            </div>
          </div>
        </div>
      </footer>

      <ChatInterface isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </div>
  );
};

export default App;
