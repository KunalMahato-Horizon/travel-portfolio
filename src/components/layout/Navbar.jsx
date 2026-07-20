import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Container from "./Container";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("ghar");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const navRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // ✅ Memoized nav items
  const navItems = useMemo(() => [
    { name: "Horizon", hindi: "गृह", id: "ghar", num: "01" },
    { name: "Destinations", hindi: "मार्ग", id: "safar", num: "02" },
    { name: "Archive", hindi: "संग्रह", id: "gallery", num: "03" },
    { name: "Topologies", hindi: "स्थान", id: "sthan", num: "04" },
    { name: "Identity", hindi: "परिचय", id: "parichay", num: "05" },
  ], []);

  // ✅ Scroll handler with throttling and cleanup
  useEffect(() => {
    let ticking = false;
    let rafId = null;

    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          const y = window.scrollY;
          const totalH = document.body.scrollHeight - window.innerHeight;
          
          // Only update if values changed significantly
          if (Math.abs(y - lastScrollY) > 2) {
            if (y < 100) {
              setIsVisible(true);
              setScrolled(y > 30);
            } else if (y > lastScrollY && y - lastScrollY > 8 && !isMobileMenuOpen) {
              setIsVisible(false);
            } else if (y < lastScrollY && lastScrollY - y > 4) {
              setIsVisible(true);
            }
            
            setScrolled(y > 30);
            setLastScrollY(y);
            setScrollProgress(Math.min(100, (y / totalH) * 100));
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [lastScrollY, isMobileMenuOpen]);

  // ✅ Viewport Section Detection with Intersection Observer (better performance)
  useEffect(() => {
    const sectionIds = navItems.map(item => item.id);
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section with the highest ratio (most visible)
        let bestSection = null;
        let bestRatio = 0;
        
        entries.forEach(entry => {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestSection = entry.target.id;
          }
        });
        
        if (bestSection && bestRatio > 0.15) {
          setActiveSection(bestSection);
        }
      },
      {
        threshold: [0.1, 0.25, 0.5],
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    sections.forEach(section => observer.observe(section));
    
    return () => observer.disconnect();
  }, [navItems]);

  // ✅ Memoized scroll to section function
  const scrollToSection = useCallback((sectionId) => {
    // Clear any pending scroll timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const element = document.getElementById(sectionId);
    if (element) {
      setIsMobileMenuOpen(false);
      
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        window.scrollTo({
          top: element.offsetTop - 20,
          behavior: "smooth"
        });
      });
    }
  }, []);

  // ✅ Memoized link click handler
  const handleLinkClick = useCallback((sectionId, e) => {
    if (e) e.preventDefault();
    scrollToSection(sectionId);
  }, [scrollToSection]);

  // ✅ Handle hash on mount with cleanup
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        if (navItems.some(item => item.id === sectionId)) {
          scrollTimeoutRef.current = setTimeout(() => {
            scrollToSection(sectionId);
          }, 150);
        }
      }
    };

    // Run once on mount
    handleHash();

    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [scrollToSection, navItems]);

  // ✅ Memoized mobile menu toggle
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // ✅ Memoized close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <nav 
        ref={navRef} 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        } ${
          scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black" : "bg-transparent border-b border-transparent"
        }`}
      >
        <Container>
          <div className="relative flex items-center justify-between py-4 md:py-6">
            
            {/* BRAND LOGO */}
            <button 
              onClick={(e) => handleLinkClick("ghar", e)} 
              className="group flex items-center gap-3 md:gap-4 focus:outline-none"
              aria-label="Go to home section"
            >
              <div className="text-left flex items-center gap-3">
                <h1 className="text-sm md:text-base font-light tracking-widest text-white uppercase flex items-center gap-2">
                  Anoj Kumar
                </h1>
                <div className="w-6 md:w-8 h-[1px] bg-white/20 group-hover:bg-white/60 transition-colors duration-300" />
                <span className="font-devanagari text-sm md:text-base text-white/40 group-hover:text-white/80 transition-colors duration-300">
                  दर्शन
                </span>
              </div>
            </button>

            {/* DESKTOP EDITORIAL NAVIGATION */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button 
                    key={item.id} 
                    onClick={(e) => handleLinkClick(item.id, e)} 
                    className="relative group py-2 focus:outline-none"
                    aria-label={`Go to ${item.name} section`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-[9px] uppercase tracking-widest transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/20 group-hover:text-white/40"
                      }`}>
                        {item.num}
                      </span>
                      <span className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/50 group-hover:text-white"
                      }`}>
                        {item.name}
                      </span>
                    </div>

                    {/* Active State Indicator */}
                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-white"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* MOBILE MENU TOGGLE */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={toggleMobileMenu} 
                className="w-10 h-10 flex items-center justify-end focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-white/60" />
                ) : (
                  <div className="space-y-1.5 flex flex-col items-end">
                    <span className="w-5 h-px bg-white/80 block" />
                    <span className="w-3 h-px bg-white/80 block transition-all duration-300 group-hover:w-5" />
                  </div>
                )}
              </button>
            </div>
            
          </div>
        </Container>

        {/* ULTRA-MINIMAL PROGRESS BAR */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-transparent">
          <div 
            className="h-full bg-white/20 transition-all duration-100 ease-out" 
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </nav>

      {/* MOBILE DARK GLASS MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 lg:hidden bg-[#050505]/95 backdrop-blur-2xl border-b border-white/5 pt-24 pb-8 px-6 flex flex-col"
            onClick={closeMobileMenu}
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button 
                    key={item.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLinkClick(item.id, e);
                    }} 
                    className="w-full flex items-end justify-between py-4 border-b border-white/5 focus:outline-none group"
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className={`font-mono text-[10px] tracking-widest uppercase transition-colors ${
                        isActive ? "text-white/40" : "text-white/20"
                      }`}>
                        SEC // {item.num}
                      </span>
                      <span className={`text-2xl font-light tracking-wide transition-colors ${
                        isActive ? "text-white" : "text-white/60 group-hover:text-white"
                      }`}>
                        {item.name}
                      </span>
                    </div>
                    
                    <span className={`font-devanagari text-lg transition-colors ${
                      isActive ? "text-white/30" : "text-white/10"
                    }`}>
                      {item.hindi}
                    </span>
                  </motion.button>
                );
              })}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-auto pt-8 text-center font-devanagari text-white/10 text-xs tracking-widest uppercase"
            >
              यात्रा एक प्रार्थना है
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Spacer to prevent content jump (Height matches navbar) */}
      <div className="h-16 md:h-20 bg-black"></div>
    </>
  );
}

export default Navbar;