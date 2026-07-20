import { useState, useEffect, useRef, useCallback } from "react";
import Container from "../layout/Container";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// ✅ Optimized image URL generator with proper sizes
const getOptimizedImageUrl = (url, width, quality = 80) => {
  if (!url || !url.includes("/upload/")) return url;
  return url.replace(
    "/upload/",
    `/upload/f_auto,q_${quality},w_${width}/`
  );
};

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Parallax values
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);

  // ✅ Destinations state with richer text
  const [destinations, setDestinations] = useState([
    {
      id: 0,
      title: "Ujjain",
      subtitle: "City of Temples & Spirituality",
      location: "Madhya Pradesh, India",
      hindiName: "उज्जैन",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      mobileImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      gradient: "from-amber-400/30 via-transparent to-amber-400/30",
      color: "#f59e0b",
      description: "Where time stands still at the feet of Mahakal, and every stone whispers ancient prayers.",
      tagline: "City of Cosmic Geometry"
    },
    {
      id: 1,
      title: "Mumbai",
      subtitle: "City of Dreams & Ocean Breeze",
      location: "Maharashtra, India",
      hindiName: "मुंबई",
      image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      mobileImage: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      gradient: "from-blue-400/30 via-transparent to-blue-400/30",
      color: "#3b82f6",
      description: "Where the Arabian Sea meets the city of dreams, and faith finds its home.",
      tagline: "Where Spirituality Meets the Sea"
    },
    {
      id: 2,
      title: "Ayodhya",
      subtitle: "Land of Ancient Heritage",
      location: "Uttar Pradesh, India",
      hindiName: "अयोध्या",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      mobileImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      gradient: "from-orange-400/30 via-transparent to-orange-400/30",
      color: "#f97316",
      description: "Where dharma walked the earth, and the Sarayu River sings of eternal devotion.",
      tagline: "Birthplace of Dharma"
    },
    {
      id: 3,
      title: "Varanasi",
      subtitle: "The Eternal Spiritual Capital",
      location: "Uttar Pradesh, India",
      hindiName: "वाराणसी",
      image: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      mobileImage: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      gradient: "from-red-400/30 via-transparent to-red-400/30",
      color: "#ef4444",
      description: "Where the Ganga flows eternal, and the soul finds its liberation.",
      tagline: "City of Liberation"
    }
  ]);

  // Check mobile & motion preferences
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Mouse tracking for interactive glow
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || isMobile) return;
      const rect = containerRef.current.getBoundingClientRect();
      setCursorPosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Image loading
  const loadImage = useCallback((url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(url);
      img.src = url;
    });
  }, []);

  // ✅ Optimized image preloading
  const preloadImages = useCallback(async (imageUrls) => {
    const loadPromises = imageUrls.map(url => loadImage(url));
    await Promise.allSettled(loadPromises);
  }, [loadImage]);

  // Fetch images from backend
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || "https://travel-portfolio-backend.vercel.app";
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(`${API_URL}/api/hero`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        let imageUrls = [];
        
        if (data.images && Array.isArray(data.images)) {
          const targetWidth = isMobile ? 600 : 1200;
          imageUrls = data.images.map(img => {
            if (!img.secure_url?.includes("/upload/")) return img.secure_url;
            return getOptimizedImageUrl(img.secure_url, targetWidth);
          });
        } else if (data.image) {
          imageUrls = [data.image.secure_url || data.image.url];
        }
        
        if (imageUrls.length > 0) {
          await preloadImages(imageUrls);
          setDestinations(prev => 
            prev.map((dest, index) => ({
              ...dest,
              image: imageUrls[index % imageUrls.length],
              mobileImage: imageUrls[index % imageUrls.length]
            }))
          );
        }
        
        setIsLoaded(true);
      } catch (err) {
        console.warn("Using fallback images:", err.message);
        setError(err.message);
        setIsLoaded(true);
      }
    };

    const timer = setTimeout(() => {
      fetchImages();
    }, 100);

    return () => clearTimeout(timer);
  }, [isMobile, preloadImages]);

  // Auto slide
  useEffect(() => {
    const len = destinations.length;
    if (len <= 1 || reduceMotion) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % len);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [destinations.length, reduceMotion]);

  // Preload next image
  useEffect(() => {
    if (destinations.length > 1 && isLoaded) {
      const nextIndex = (currentIndex + 1) % destinations.length;
      const nextImage = destinations[nextIndex].image;
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          loadImage(nextImage);
        });
      } else {
        setTimeout(() => loadImage(nextImage), 500);
      }
    }
  }, [currentIndex, destinations, isLoaded, loadImage]);

  const current = destinations[currentIndex];
  const currentImage = isMobile ? current?.mobileImage : current?.image;

  if (!isLoaded) {
    return (
      <section className="relative overflow-hidden bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto" />
          <p className="mt-3 text-white/30 text-xs tracking-[0.2em] uppercase font-light">
            Loading...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-black overflow-hidden"
      id="ghar"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.05, opacity: 0 }}
            transition={{ 
              duration: reduceMotion ? 0 : 1.4,
              ease: [0.25, 1, 0.5, 1]
            }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${currentImage})`,
                backgroundPosition: isMobile ? 'center 30%' : 'center center',
                backgroundSize: 'cover',
                backgroundColor: '#000',
              }}
            />
            
            <div className={`absolute inset-0 bg-gradient-to-b ${current?.gradient || 'from-black/50'} opacity-50`} />
            
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/85 md:from-black/60 md:via-black/30 md:to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent md:from-black/60" />
            
            {!isMobile && !reduceMotion && (
              <motion.div
                animate={{
                  background: `radial-gradient(circle at ${cursorPosition.x}% ${cursorPosition.y}%, rgba(255,255,255,0.06) 0%, transparent 60%)`
                }}
                className="absolute inset-0 transition-all duration-300"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl animate-float-delay" />
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 min-h-screen flex items-center">
        <Container>
          <div className="w-full py-6 md:py-8 lg:py-20">
            
            {/* MOBILE LAYOUT */}
            <div className="lg:hidden flex flex-col items-center justify-center gap-6 md:gap-8">
              
              <motion.div
                style={{ y: isMobile ? 0 : y2 }}
                className="flex items-center justify-center"
              >
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-0 rounded-full border border-white/5"
                  />
                  
                  <motion.div
                    animate={{
                      rotate: -360,
                      scale: [1, 0.95, 1],
                    }}
                    transition={{
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-8 rounded-full border border-white/10"
                  />
                  
                  <div className="absolute inset-16 rounded-full bg-gradient-to-br from-amber-400/20 to-transparent backdrop-blur-3xl" />
                  
                  <motion.div
                    animate={{ 
                      y: [0, -8, 0],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ 
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
                  >
                    <img 
                      src={destinations[(currentIndex + 1) % destinations.length]?.mobileImage || destinations[(currentIndex + 1) % destinations.length]?.image} 
                      alt="Next destination"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/40 text-[8px] tracking-wider uppercase">
                        Next
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ 
                      y: [0, 8, 0],
                      rotate: [0, -2, 2, 0]
                    }}
                    transition={{ 
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute -bottom-4 -left-4 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
                  >
                    <img 
                      src={destinations[(currentIndex + 2) % destinations.length]?.mobileImage || destinations[(currentIndex + 2) % destinations.length]?.image} 
                      alt="Future destination"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/30 text-[6px] tracking-wider uppercase">
                        Coming
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* ✅ ENHANCED MOBILE TEXT - Richer styling */}
              <motion.div 
                style={{ y: isMobile ? 0 : y1, opacity }}
                className="flex items-center justify-center w-full px-4"
              >
                <div className="w-full max-w-md space-y-3 md:space-y-5 text-center">
                  
                  {/* Location Badge - Enhanced */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex items-center justify-center gap-3"
                  >
                    <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-amber-400/50" />
                    <span className="text-amber-400/60 text-[10px] md:text-xs tracking-[0.25em] uppercase font-light">
                      {current?.location?.split(',')[0] || ""}
                    </span>
                    <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-amber-400/50" />
                  </motion.div>

                  {/* Title - Enhanced with gradient */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="space-y-2"
                  >
                    <h1 className="text-4xl xs:text-5xl sm:text-6xl font-light text-white leading-[1.05] tracking-tight">
                      {current?.title || ""}
                      <span className="block text-amber-400/60 text-2xl xs:text-3xl sm:text-4xl font-devanagari mt-1">
                        {current?.hindiName || ""}
                      </span>
                    </h1>
                    
                    {/* Tagline - New element */}
                    <p className="text-xs text-amber-400/30 font-light tracking-[0.2em] uppercase">
                      {current?.tagline || ""}
                    </p>
                  </motion.div>

                  {/* Subtitle & Description - Enhanced */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="space-y-2"
                  >
                    <p className="text-base sm:text-lg md:text-xl text-white/50 font-light tracking-wide leading-relaxed">
                      {current?.subtitle || ""}
                    </p>
                    <p className="text-xs sm:text-sm text-white/30 font-light max-w-md mx-auto leading-relaxed italic">
                      "{current?.description || ""}"
                    </p>
                  </motion.div>

                  {/* CTA - Enhanced */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-3 pt-4"
                  >
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const element = document.getElementById('safar');
                        if (element) {
                          element.scrollIntoView({ 
                            behavior: reduceMotion ? 'auto' : 'smooth',
                            block: 'start'
                          });
                        }
                      }}
                      className="group relative px-6 md:px-8 py-3 md:py-3.5 bg-white text-black rounded-full overflow-hidden transition-all text-sm md:text-base"
                    >
                      <span className="relative z-10 font-medium tracking-wider flex items-center gap-2">
                        Explore India
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-[length:200%]"
                        animate={{ 
                          backgroundPosition: isHovering ? ['0% 0%', '100% 100%'] : '0% 0%'
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.button>
                  </motion.div>

                  {/* Counter */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-center gap-3 pt-3"
                  >
                    <span className="text-white/10 text-[10px] tracking-[0.15em]">
                      {String(currentIndex + 1).padStart(2, '0')} / {String(destinations.length).padStart(2, '0')}
                    </span>
                    <div className="w-8 h-[1px] bg-white/10" />
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* ✅ ENHANCED DESKTOP LAYOUT - Richer typography */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-0 items-center">
              
              {/* A1: LEFT HALF */}
              <div className="grid grid-cols-2 gap-0 items-center">
                
                {/* A1.1: TEXT CONTENT - Enhanced */}
                <motion.div 
                  style={{ y: y1, opacity }}
                  className="col-span-1 flex items-center justify-start px-4 md:px-0"
                >
                  <div className="w-full max-w-md space-y-4 md:space-y-6">
                    
                    {/* Location Badge - Enhanced */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-amber-400/50" />
                      <span className="text-amber-400/50 text-[10px] tracking-[0.25em] uppercase font-light">
                        {current?.location?.split(',')[0] || ""}
                      </span>
                      <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-amber-400/50" />
                    </motion.div>

                    {/* Title - Enhanced with gradient text */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="space-y-2"
                    >
                      <h1 className="text-5xl xs:text-6xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white leading-[1.05] tracking-tight">
                        {current?.title || ""}
                        <span className="block text-amber-400/60 text-3xl xs:text-4xl md:text-4xl lg:text-5xl font-devanagari mt-1">
                          {current?.hindiName || ""}
                        </span>
                      </h1>
                      
                      {/* Tagline - New elegant element */}
                      <p className="text-xs text-amber-400/30 font-light tracking-[0.2em] uppercase">
                        {current?.tagline || ""}
                      </p>
                    </motion.div>

                    {/* Subtitle & Description - Enhanced */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      className="space-y-2"
                    >
                      <p className="text-lg sm:text-xl md:text-xl lg:text-2xl text-white/50 font-light tracking-wide leading-relaxed">
                        {current?.subtitle || ""}
                      </p>
                      <p className="text-sm sm:text-base text-white/30 font-light max-w-md leading-relaxed italic">
                        "{current?.description || ""}"
                      </p>
                    </motion.div>

                    {/* CTA - Enhanced */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="flex flex-wrap items-center gap-3 pt-2"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => setIsHovering(true)}
                        onHoverEnd={() => setIsHovering(false)}
                        onClick={() => {
                          const element = document.getElementById('safar');
                          if (element) {
                            element.scrollIntoView({ 
                              behavior: reduceMotion ? 'auto' : 'smooth',
                              block: 'start'
                            });
                          }
                        }}
                        className="group relative px-6 md:px-10 py-3.5 md:py-4 bg-white text-black rounded-full overflow-hidden transition-all hover:shadow-2xl hover:shadow-white/20 text-sm md:text-base"
                      >
                        <span className="relative z-10 font-medium tracking-wider flex items-center gap-2">
                          Explore India
                          <motion.span
                            animate={{ x: isHovering ? 5 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            →
                          </motion.span>
                        </span>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 bg-[length:200%]"
                          animate={{ 
                            backgroundPosition: isHovering ? ['0% 0%', '100% 100%'] : '0% 0%'
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.button>
                    </motion.div>

                    {/* Counter */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="flex items-center gap-3 pt-2"
                    >
                      <span className="text-white/10 text-[10px] tracking-[0.15em]">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(destinations.length).padStart(2, '0')}
                      </span>
                      <div className="w-8 h-[1px] bg-white/10" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* A1.2: EMPTY SPACE */}
                <div className="col-span-1 hidden lg:block" />
              </div>

              {/* A2: RIGHT HALF - CIRCLES */}
              <motion.div
                style={{ y: y2 }}
                className="flex items-center justify-end py-8 lg:py-0"
              >
                <div className="relative w-72 h-72 md:w-80 md:h-80">
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-0 rounded-full border border-white/5"
                  />
                  
                  <motion.div
                    animate={{
                      rotate: -360,
                      scale: [1, 0.95, 1],
                    }}
                    transition={{
                      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                      scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute inset-8 rounded-full border border-white/10"
                  />
                  
                  <div className="absolute inset-16 rounded-full bg-gradient-to-br from-amber-400/20 to-transparent backdrop-blur-3xl" />
                  
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ 
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
                  >
                    <img 
                      src={destinations[(currentIndex + 1) % destinations.length]?.image} 
                      alt="Next destination"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/40 text-[10px] tracking-wider uppercase">
                        Next
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ 
                      y: [0, 10, 0],
                      rotate: [0, -2, 2, 0]
                    }}
                    transition={{ 
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
                  >
                    <img 
                      src={destinations[(currentIndex + 2) % destinations.length]?.image} 
                      alt="Future destination"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/30 text-[8px] tracking-wider uppercase">
                        Coming
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>

      {/* NAVIGATION */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-3 md:px-8 pb-4 md:pb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="group relative focus:outline-none"
                aria-label={`Go to slide ${index + 1}`}
              >
                <motion.div 
                  animate={{
                    width: index === currentIndex ? 16 : 5,
                    height: index === currentIndex ? 2.5 : 1.5,
                    backgroundColor: index === currentIndex ? '#ffffff' : 'rgba(255,255,255,0.2)'
                  }}
                  className="rounded-full transition-all duration-500"
                />
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-white/20 text-[8px] tracking-wider uppercase whitespace-nowrap hidden md:block opacity-0 group-hover:opacity-100 transition-opacity">
                  {destinations[index].title}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setCurrentIndex(prev => prev === 0 ? destinations.length - 1 : prev - 1)}
              className="text-white/20 hover:text-white/60 transition-colors text-[10px] md:text-xs tracking-wider flex items-center gap-1 md:gap-2 px-2 py-1 md:px-0"
              aria-label="Previous slide"
            >
              <span>←</span>
              <span className="hidden sm:inline">Prev</span>
            </button>
            <span className="w-px h-3 md:h-4 bg-white/10" />
            <button
              onClick={() => setCurrentIndex(prev => (prev + 1) % destinations.length)}
              className="text-white/20 hover:text-white/60 transition-colors text-[10px] md:text-xs tracking-wider flex items-center gap-1 md:gap-2 px-2 py-1 md:px-0"
              aria-label="Next slide"
            >
              <span className="hidden sm:inline">Next</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 text-white/10 text-[8px] tracking-[0.3em] uppercase font-light hidden md:block"
      >
        <motion.div
          animate={{ y: reduceMotion ? 0 : [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          Explore
        </motion.div>
      </motion.div>

      {/* Error display */}
      {error && !isLoaded && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <div className="px-4 py-2 bg-red-500/20 backdrop-blur-md rounded-lg border border-red-500/30">
            <p className="text-red-200 text-xs">Using sample images</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;