import { useState, useEffect, useCallback, useMemo } from "react";
import { 
  Heart, Compass, ArrowUp, Sparkles, 
  Mountain, Waves, Globe, ArrowUpRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ✅ Memoized static data
  const directoryLinks = useMemo(() => [
    { label: "The Horizon (Home)", href: "#ghar" },
    { label: "Sacred Spaces (Destinations)", href: "#sthan" },
    { label: "Visual Memory (Gallery)", href: "#gallery" },
    { label: "The Author (About)", href: "#parichay" }
  ], []);

  const journeyTypes = useMemo(() => [
    { type: "Spiritual Centers", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { type: "High Altitudes", icon: <Mountain className="w-3.5 h-3.5" /> },
    { type: "Coastal Shrines", icon: <Waves className="w-3.5 h-3.5" /> },
    { type: "Heritage Sites", icon: <Globe className="w-3.5 h-3.5" /> }
  ], []);

  const socialLinks = useMemo(() => [
    { name: "Instagram", url: "https://www.instagram.com/travelwithanoj?igsh=ajR3cWVnN3gwMm5q" },
    { name: "YouTube", url: "https://www.youtube.com/@yourchannel" }
  ], []);

  // ✅ Memoized scroll handler with cleanup
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    let ticking = false;
    let rafId = null;

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          setShowScrollTop(window.scrollY > 800);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ✅ Memoized scroll to top function
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className="relative w-full bg-black text-white border-t border-white/5 pt-20 pb-8 overflow-hidden select-none">
      
      {/* ✅ Reduced background ambience for performance */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/[0.01] rounded-full blur-3xl" />
      </div>

      {/* 🔝 MINIMAL SCROLL TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed z-50 bottom-8 right-8 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 bg-black/50 backdrop-blur-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all focus:outline-none"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        
        {/* REFINED ELEGANT TYPOGRAPHY */}
        <div className="pb-12 md:pb-16 border-b border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">07 // अंत (CONCLUSION)</span>
            <div className="w-12 h-[1px] bg-white/10" />
            <span className="text-white/40 font-mono text-[10px] tracking-widest uppercase">The Horizon Awaits</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight tracking-tight leading-tight text-white max-w-4xl">
            Beyond the horizon, every journey is an internal pilgrimage. <span className="text-white/20 font-devanagari font-light tracking-normal block mt-2 sm:inline sm:mt-0">अनंत क्षितिज</span>
          </h2>
        </div>

        {/* ARCHITECTURAL GRID DIRECTORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 py-12 md:py-16 border-b border-white/5">
          
          {/* Column 1: Identity & Mission */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                <Compass className="w-4 h-4 text-white/60" />
              </div>
              <div>
                <h3 className="text-lg font-light tracking-wide text-white">Anoj Kumar</h3>
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/30">Visual Archive</div>
              </div>
            </div>
            <p className="text-sm text-white/40 font-light leading-relaxed max-w-sm">
              Documenting the profound intersection of human devotion, ancient geometry, and the timeless spiritual landscapes of India.
            </p>
          </div>

          {/* Column 2: Navigation Directory */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/20">Directory</h4>
            <div className="space-y-4">
              {directoryLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href}
                  className="flex items-center justify-between border-b border-white/5 pb-2 group transition-all"
                >
                  <span className="text-sm text-white/40 font-light group-hover:text-white/80 transition-colors">{link.label}</span>
                  <ArrowUpRight className="w-3 h-3 text-white/10 group-hover:text-white/40 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Topologies */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/20">Environments</h4>
            <div className="space-y-4">
              {journeyTypes.map((type, idx) => (
                <div key={idx} className="flex items-center gap-3 group">
                  <span className="text-white/30 transition-colors">{type.icon}</span>
                  <span className="text-sm text-white/40 font-light transition-colors">{type.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Network */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/20">Network</h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 rounded-lg border border-transparent hover:border-white/10 hover:bg-white/[0.02] transition-all"
                >
                  <span className="text-sm text-white/40 font-light group-hover:text-white transition-colors">{link.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <div className="flex items-center gap-2 text-white/30 text-[10px] sm:text-[11px] uppercase tracking-widest font-mono">
              <Heart className="w-3 h-3 text-white/20" />
              <span>Documented with reverence</span>
            </div>
            <div className="hidden sm:block w-px h-3 bg-white/10" />
            <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
              © {currentYear} Anoj Kumar
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-[10px] font-mono text-white/20 uppercase tracking-widest">
            <button 
              onClick={() => {/* Handle privacy policy action */}}
              className="hover:text-white transition-colors focus:outline-none"
              aria-label="Privacy Policy"
            >
              Privacy
            </button>
            <button 
              onClick={() => {/* Handle terms of service action */}}
              className="hover:text-white transition-colors focus:outline-none"
              aria-label="Terms of Service"
            >
              Terms
            </button>
            <span className="font-devanagari text-white/20 text-xs tracking-normal opacity-40 ml-2 hidden sm:inline">यात्रा एक प्रार्थना है</span>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;