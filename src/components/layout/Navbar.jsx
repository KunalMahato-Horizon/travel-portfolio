import { useState, useEffect, useRef, useCallback } from "react";
import Container from "./Container";
import { Compass, Camera, User, Home, ChevronRight, Flower, Sparkles, Menu, X, Building2, Globe } from "lucide-react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("ghar");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [navHovered, setNavHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const navRef = useRef(null);

  // Scroll handler with throttle
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const totalH = document.body.scrollHeight - window.innerHeight;
          
          if (y < 100) {
            setIsVisible(true);
            setScrolled(y > 30);
          } else if (y > lastScrollY && y - lastScrollY > 8 && !navHovered) {
            setIsVisible(false);
            setIsMobileMenuOpen(false);
          } else if (y < lastScrollY && lastScrollY - y > 4) {
            setIsVisible(true);
          }
          
          setScrolled(y > 30);
          setLastScrollY(y);
          setScrollProgress(Math.min(100, (y / totalH) * 100));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, navHovered]);

  // Section detection
  useEffect(() => {
    const sections = ["ghar", "safar", "gallery", "sthan", "parichay"];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navbar height
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsMobileMenuOpen(false);
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth"
      });
    }
  }, []);

  // Handle link click
  const handleLinkClick = useCallback((sectionId, e) => {
    if (e) e.preventDefault();
    scrollToSection(sectionId);
  }, [scrollToSection]);

  // Initialize active section on mount
  useEffect(() => {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      if (["ghar", "safar", "gallery", "sthan", "parichay"].includes(sectionId)) {
        setTimeout(() => scrollToSection(sectionId), 100);
      }
    }
  }, [scrollToSection]);

  const getHindiGreeting = () => new Date().getHours() < 12 ? "सुप्रभात" : new Date().getHours() < 18 ? "नमस्ते" : "शुभ संध्या";

  const navItems = [
    { name: "Home", hindi: "गृह", id: "ghar", icon: <Home className="w-3.5 h-3.5" />, gradient: "from-amber-500 to-yellow-400", desc: "यहाँ से शुरुआत" },
    { name: "Journeys", hindi: "यात्रा", id: "safar", icon: <Compass className="w-3.5 h-3.5" />, gradient: "from-emerald-500 to-green-400", desc: "मेरी यात्राओं की गाथा" },
    { name: "Gallery", hindi: "गैलरी", id: "gallery", icon: <Camera className="w-3.5 h-3.5" />, gradient: "from-purple-500 to-pink-400", desc: "यादों का संग्रह" },
    { name: "Destinations", hindi: "स्थान", id: "sthan", icon: <Building2 className="w-3.5 h-3.5" />, gradient: "from-blue-500 to-cyan-400", desc: "भारत के कोने-कोने" },
    { name: "About", hindi: "परिचय", id: "parichay", icon: <User className="w-3.5 h-3.5" />, gradient: "from-indigo-500 to-violet-400", desc: "मेरी कहानी" },
  ];

  return (
    <>
      <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      } backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 border-b ${
        scrolled ? "border-amber-200/30 dark:border-amber-900/30 shadow-md shadow-amber-500/5" : "border-transparent"
      }`} onMouseEnter={() => setNavHovered(true)} onMouseLeave={() => setNavHovered(false)}>
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-amber-500 via-transparent to-emerald-500"></div>
        
        <Container>
          <div className="relative">
            <div className="flex items-center justify-between py-3">
              
              {/* Logo */}
              <button 
                onClick={(e) => handleLinkClick("ghar", e)} 
                onMouseEnter={() => setLogoHovered(true)} 
                onMouseLeave={() => setLogoHovered(false)} 
                className="group relative flex items-center space-x-2 focus:outline-none"
                aria-label="Go to home section"
              >
                <div className="relative">
                  <div className={`absolute -inset-2 rounded-full bg-gradient-to-r from-amber-400/20 to-emerald-400/20 blur-lg transition-all duration-700 ${
                    logoHovered ? "opacity-100 scale-110" : "opacity-0 scale-100"}`}></div>
                  <div className={`relative w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 via-white to-emerald-500 flex items-center justify-center shadow-md shadow-amber-500/20 transition-all duration-500 ${
                    logoHovered ? "rotate-180 scale-105" : ""}`}>
                    <div className="absolute inset-1.5 border-2 border-blue-600 rounded-full"></div>
                    <Flower className="w-5 h-5 text-amber-600" />
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-0.5 w-1 h-1 bg-blue-600 rounded-full"></div>
                  </div>
                  {logoHovered && <>
                    <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
                    <div className="absolute -right-1.5 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-emerald-400 rounded-full animate-ping"></div>
                    <div className="absolute -left-1.5 bottom-0 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay:'0.3s'}}></div>
                  </>}
                </div>
                <div className="text-left">
                  <div className="flex items-baseline gap-1.5">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-amber-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      <span className="font-hindi-decorative tracking-wide">भारत</span>
                      <span className="font-sans font-light mx-1.5">|</span>
                      <span className="font-sans font-semibold">Darshan</span>
                    </h1>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1.5">
                    <span className={`w-1 h-1 rounded-full ${logoHovered?"bg-emerald-500 animate-ping":"bg-amber-500"}`}></span>
                    <span className="font-hindi-regular text-xs text-amber-600 dark:text-amber-400">{getHindiGreeting()}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">Travel Diaries</span>
                  </p>
                </div>
              </button>

              {/* Desktop Nav */}
              <div className="hidden lg:flex items-center space-x-0.5">
                {navItems.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={(e) => handleLinkClick(item.id, e)} 
                    className={`relative group px-4 py-2 focus:outline-none min-w-[100px] transition-all duration-300 ${
                      activeSection === item.id ? 'scale-[1.02]' : ''
                    }`}
                    aria-label={`Go to ${item.name} section`}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                      item.gradient} blur-sm group-hover:blur`}></div>
                    <div className={`absolute inset-0 rounded-lg border-2 ${
                      activeSection === item.id 
                        ? 'border-amber-500/60 opacity-100' 
                        : 'border-transparent opacity-0 group-hover:opacity-100 group-hover:border-amber-500/30'
                    } transition-all duration-300`}></div>
                    <div className="relative flex flex-col items-center space-y-1.5">
                      <span className={`transition-all duration-300 ${
                        activeSection === item.id ? "text-amber-600 scale-110" : "text-gray-600 dark:text-gray-300"}`}>
                        {item.icon}
                      </span>
                      <div className="flex flex-col items-center space-y-0.5">
                        <span className={`font-hindi-decorative text-base tracking-wide transition-all duration-300 ${
                          activeSection === item.id 
                            ? "text-amber-700 dark:text-amber-400 font-bold" 
                            : "text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white"
                        }`}>
                          {item.hindi}
                        </span>
                        <span className={`text-[9px] uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                          activeSection === item.id 
                            ? "text-amber-600 font-bold" 
                            : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                        }`}>
                          {item.name}
                        </span>
                      </div>
                    </div>
                    {activeSection === item.id && (
                      <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full shadow-md shadow-amber-500/40"></div>
                        <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-30"></div>
                      </div>
                    )}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                      <div className="font-hindi-regular">{item.desc}</div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gray-900 rotate-45"></div>
                    </div>
                  </button>
                ))}
                <div className="w-px h-6 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent mx-1.5"></div>
                <div className="ml-3">
                  <button 
                    onClick={(e) => handleLinkClick("safar", e)} 
                    className="group relative px-5 py-2.5 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                    aria-label="Explore journeys section"
                  >
                    <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-white/40 transition-all duration-300"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white/0 via-white/0 to-white/0 group-hover:from-white/10 group-hover:via-white/5 group-hover:to-white/0 transition-all duration-500"></div>
                    <div className="relative z-10 flex items-center gap-2.5">
                      <Globe className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-xs">Explore</span>
                        <span className="font-hindi-decorative text-xs tracking-wide">भारत</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center space-x-1.5">
                <button 
                  className="relative w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 hover:from-amber-500/20 hover:to-emerald-500/20 group"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                  aria-label="Toggle menu"
                  aria-expanded={isMobileMenuOpen}
                >
                  <span className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "bg-amber-600 rotate-45 translate-y-1.5" : "bg-gray-600 dark:bg-gray-300 group-hover:bg-amber-600"}`}></span>
                  <span className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "bg-emerald-600 opacity-0" : "bg-gray-600 dark:bg-gray-300 group-hover:bg-emerald-600"}`}></span>
                  <span className={`w-5 h-0.5 rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? "bg-blue-600 -rotate-45 -translate-y-1.5" : "bg-gray-600 dark:bg-gray-300 group-hover:bg-blue-600"}`}></span>
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "max-h-screen opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
              <div className="py-3 border-t border-amber-500/20 dark:border-amber-500/10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-b-xl shadow-lg">
                <div className="space-y-0.5">
                  {navItems.map((item, i) => (
                    <button 
                      key={item.id} 
                      onClick={(e) => handleLinkClick(item.id, e)} 
                      style={{ transitionDelay: `${i * 40}ms` }}
                      className={`group w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeSection === item.id 
                          ? `bg-gradient-to-r ${item.gradient}/10 border border-amber-500/20` 
                          : "hover:bg-amber-500/5 dark:hover:bg-amber-500/10"
                      }`}
                      aria-label={`Go to ${item.name} section`}
                      aria-current={activeSection === item.id ? 'page' : undefined}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`p-1.5 rounded-md transition-colors duration-200 ${
                          activeSection === item.id 
                            ? `bg-gradient-to-br ${item.gradient} text-white` 
                            : "bg-amber-500/10 text-gray-600 dark:text-gray-300"
                        }`}>
                          {item.icon}
                        </span>
                        <div className="flex flex-col items-start">
                          <span className={`font-medium text-sm transition-colors duration-200 ${
                            activeSection === item.id 
                              ? "text-amber-600 dark:text-amber-400" 
                              : "text-gray-700 dark:text-gray-200"
                          }`}>
                            {item.name}
                          </span>
                          <span className={`font-hindi-decorative text-base tracking-wide transition-colors duration-200 ${
                            activeSection === item.id 
                              ? "text-amber-700 dark:text-amber-300" 
                              : "text-gray-600 dark:text-gray-400"
                          }`}>
                            {item.hindi}
                          </span>
                        </div>
                      </div>
                      {activeSection === item.id && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                          <span className="text-xs text-amber-600 dark:text-amber-400 font-hindi-regular">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                  <button 
                    onClick={(e) => {
                      handleLinkClick("safar", e);
                      setIsMobileMenuOpen(false);
                    }} 
                    className="group w-full mt-3 px-4 py-3 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all duration-300 relative overflow-hidden"
                    aria-label="Explore India section"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-emerald-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center justify-center gap-2.5">
                      <Flower className="w-4 h-4" />
                      <div className="flex flex-col items-center">
                        <span className="font-semibold text-sm">Explore India</span>
                        <span className="font-hindi-decorative text-xs tracking-wide">भारत यात्रा</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500/15 via-white/15 to-emerald-500/15 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-500 via-white to-emerald-500 relative transition-all duration-300 ease-out" style={{width:`${scrollProgress}%`}}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
          <div className="absolute bottom-0 transform translate-y-1/2 w-4 h-4 rounded-full border border-blue-600 bg-white shadow transition-all duration-300 ease-out flex items-center justify-center" style={{left:`${scrollProgress}%`}}>
            <span className="font-hindi-regular text-[10px] text-blue-600">→</span>
            <div className="absolute inset-0 border border-blue-600 rounded-full animate-ping opacity-20"></div>
          </div>
        </div>
      </nav>
      
      {/* Navbar spacer */}
      <div className="h-16"></div>
      
      <style jsx>{`
        @keyframes shimmer { 
          0% { transform: translateX(-100%); } 
          100% { transform: translateX(100%); } 
        }
        .animate-shimmer { 
          animation: shimmer 2s infinite; 
        }
        .font-hindi-decorative { 
          font-family: 'Segoe UI', 'Noto Sans Devanagari', 'Arial', sans-serif; 
          font-weight: 700; 
          letter-spacing: 0.03em; 
          text-shadow: 0 1px 3px rgba(0,0,0,0.1); 
        }
        .font-hindi-regular { 
          font-family: 'Segoe UI', 'Noto Sans Devanagari', 'Arial', sans-serif; 
          font-weight: 500; 
        }
      `}</style>
    </>
  );
}

export default Navbar;