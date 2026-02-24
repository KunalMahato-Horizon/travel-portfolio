import { useState, useEffect } from "react";
import Container from "../layout/Container";
import { motion, AnimatePresence } from "framer-motion";

function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isTouching, setIsTouching] = useState(false);

  // 🔹 OPTIMIZED FALLBACK IMAGES FOR MOBILE
  const [heroImages, setHeroImages] = useState([
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  ]);

  // Generic travel-related Hindi words
  const hindiWords = ["यात्रा", "सफर", "अनुभव", "खोज", "स्वप्न", "आनंद"];

  // Stats optimized for mobile
  const stats = [
    { value: "24", label: "Destinations", suffix: "+", hindi: "गंतव्य" },
    { value: "156", label: "Experiences", suffix: "+", hindi: "अनुभव" },
    { value: "1.5K", label: "Memories", suffix: "", hindi: "यादें" },
    { value: "420", label: "Stories", suffix: "+", hindi: "कहानियाँ" },
  ];

  // Check screen size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    
    const handler = (e) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Image preloading function
  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  };

  // 🔹 FETCH IMAGES FROM BACKEND WITH ERROR HANDLING
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        console.log("Fetching hero images from backend...");
        
        const API_URL = process.env.REACT_APP_API_URL || "https://travel-portfolio-backend.vercel.app";
        const response = await fetch(`${API_URL}/api/hero`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Backend response:", data);
        
        let imageUrls = [];
        
        // Check the actual response structure
        if (data.images && Array.isArray(data.images)) {
          const targetWidth = isMobile ? 600 : 1600;

          imageUrls = data.images.map(img => {
            if (!img.secure_url.includes("/upload/")) {
              return img.secure_url; // safety fallback
            }

            return img.secure_url.replace(
              "/upload/",
              `/upload/f_auto,q_auto,w_${targetWidth}/`
            );
          });
        } else if (data.image) {
          imageUrls = [data.image.secure_url || data.image.url];
        } else {
          throw new Error("Unexpected response format");
        }
        
        console.log("Extracted image URLs:", imageUrls);
        
        // Validate and preload images
        if (imageUrls.length > 0) {
          const validImages = [];
          for (const url of imageUrls) {
            try {
              await loadImage(url);
              validImages.push(url);
            } catch (err) {
              console.warn(`Invalid image URL: ${url}`);
            }
          }
          
          if (validImages.length > 0) {
            setHeroImages(validImages);
          } else {
            throw new Error("No valid images found in response");
          }
        } else {
          console.warn("No images found in response, using fallback");
        }
        
        setIsLoaded(true);
      } catch (err) {
        console.error("Error fetching hero images:", err);
        setError(err.message);
        setIsLoaded(true);
        
        // Preload fallback images
        heroImages.forEach(url => loadImage(url).catch(() => {}));
      }
    };

    fetchHeroImages();
  }, [isMobile]);

  // 🔹 AUTO SLIDE EFFECT WITH REDUCED MOTION SUPPORT
  useEffect(() => {
    if (heroImages.length <= 1 || reduceMotion) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages, reduceMotion]);

  // Preload next image for smoother transitions
  useEffect(() => {
    if (heroImages.length > 1) {
      const nextIndex = (currentImageIndex + 1) % heroImages.length;
      loadImage(heroImages[nextIndex]).catch(() => {});
    }
  }, [currentImageIndex, heroImages]);

  // Floating words animation - optimized for performance
  const FloatingWord = ({ word, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: reduceMotion ? 0.02 : [0.02, 0.03, 0.02],
        y: reduceMotion ? 0 : [Math.random() * -10, Math.random() * 10],
        x: reduceMotion ? 0 : [Math.random() * -8, Math.random() * 8]
      }}
      transition={{
        duration: reduceMotion ? 0 : Math.random() * 6 + 6,
        repeat: reduceMotion ? 0 : Infinity,
        delay: reduceMotion ? 0 : index * 0.2,
        ease: "linear"
      }}
      className={`absolute font-devanagari text-white/10 ${
        isMobile ? 'text-sm' : 'text-xl md:text-2xl'
      }`}
      style={{
        left: `${Math.random() * 85 + 5}%`,
        top: `${Math.random() * 85 + 5}%`,
        willChange: 'transform, opacity',
      }}
    >
      {word}
    </motion.div>
  );

  // 🔹 LOADING STATE
  if (!isLoaded) {
    return (
      <section className="relative overflow-hidden bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-white/80 text-sm md:text-base">Loading beautiful destinations...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-black" id="ghar">
      {/* 🔹 OPTIMIZED Background layer with lazy loading */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1 }}
            className="absolute inset-0"
          >
            {/* Background image with fallback color */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `url(${heroImages[currentImageIndex]})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundAttachment: isMobile ? 'scroll' : 'fixed',
                backgroundColor: '#000',
              }}
            />
            
            {/* Dark overlay for text contrast */}
            <div className="absolute inset-0 bg-black/50 md:bg-black/40" />
            
            {/* Gradient overlays optimized for mobile */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/20 md:from-black/70 md:via-black/30 md:to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
            
            {/* Extra gradient for text area */}
            <div className="absolute top-0 left-0 right-0 h-4/5 bg-gradient-to-b from-black/90 via-black/60 to-transparent md:h-3/4 md:from-black/80 md:via-black/40" />
          </motion.div>
        </AnimatePresence>

        {/* Floating Hindi words - Performance optimized */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {hindiWords.map((word, index) => (
            <FloatingWord key={index} word={word} index={index} />
          ))}
        </div>

        {/* Subtle glow effects */}
        <div className={`${
          isMobile ? 'w-32 h-32 top-1/3 left-1/6' : 'w-64 h-64 top-1/4 left-1/4'
        } absolute bg-amber-500/3 rounded-full blur-2xl md:blur-3xl z-10`} />
        <div className={`${
          isMobile ? 'w-32 h-32 bottom-1/3 right-1/6' : 'w-64 h-64 bottom-1/4 right-1/4'
        } absolute bg-orange-500/3 rounded-full blur-2xl md:blur-3xl z-10`} />
      </div>

      {/* 🔹 Main Content Container */}
      <Container className="relative z-30">
        <div className="min-h-screen md:min-h-[calc(100vh-4rem)] flex items-center px-4 md:px-0">
          <div className="w-full py-12 md:py-16 lg:py-20">
            {/* Simple indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: reduceMotion ? 0 : 0.5 }}
              className="mb-4 md:mb-6 lg:mb-8 relative"
            >
              <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-400 rounded-full animate-pulse" />
                <span className="text-white/90 text-xs md:text-sm font-medium">Discover Beautiful</span>
                <span className="text-amber-300 font-devanagari text-xs md:text-sm font-medium">दुनिया</span>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-3xl relative">
              {/* Main Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: reduceMotion ? 0 : 0.5 }}
                className="space-y-2 md:space-y-4"
              >
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-2xl">
                  <span className="block">Discover</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-300 animate-gradient drop-shadow-lg">
                    World's Beauty
                  </span>
                  <span className="block flex items-center gap-1 md:gap-2">
                    Through Travel
                    <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-amber-300/90 font-devanagari drop-shadow">
                      यात्रा
                    </span>
                  </span>
                </h1>
                
                <p className="text-sm sm:text-base md:text-lg text-white/95 max-w-xl drop-shadow-lg">
                  Explore breathtaking destinations and create unforgettable memories.
                  <span className="block mt-1 md:mt-2 text-amber-200/90 font-devanagari drop-shadow text-xs sm:text-sm">
                    सफर खूबसूरत है
                  </span>
                </p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: reduceMotion ? 0 : 0.5 }}
                className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mt-4 md:mt-6 lg:mt-8 relative"
              >
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="p-2 sm:p-3 md:p-4 rounded-lg md:rounded-xl bg-black/60 backdrop-blur-lg border border-white/20 hover:border-amber-500/60 transition-all duration-300 group shadow-lg md:shadow-2xl relative overflow-hidden"
                    style={{ willChange: 'transform' }}
                  >
                    {/* Background blur effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
                    
                    <div className="relative z-10">
                      <div className="flex items-baseline gap-0.5 sm:gap-1">
                        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:text-amber-300 drop-shadow">
                          {stat.value}
                        </div>
                        <div className="text-amber-300 text-xs sm:text-sm md:text-base drop-shadow">
                          {stat.suffix}
                        </div>
                      </div>
                      <div className="text-white/90 text-[10px] xs:text-xs sm:text-sm mt-0.5 sm:mt-1">
                        <div className="font-medium truncate">{stat.label}</div>
                        <div className="text-amber-300/90 font-devanagari text-[9px] xs:text-[10px] sm:text-xs truncate">
                          {stat.hindi}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Main CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: reduceMotion ? 0 : 0.5 }}
                className="mt-6 md:mt-8 lg:mt-10 relative"
              >
                <button 
                  onClick={() => {
                    const element = document.getElementById('safar');
                    if (element) {
                      element.scrollIntoView({ 
                        behavior: reduceMotion ? 'auto' : 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="px-4 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg md:shadow-2xl shadow-amber-500/50 hover:shadow-amber-500/70 group text-xs sm:text-sm md:text-base relative overflow-hidden w-full sm:w-auto"
                  aria-label="Start exploring destinations"
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  
                  <span className="flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 relative z-10">
                    <span>Start Exploring</span>
                    <span className="font-devanagari text-xs sm:text-sm">खोजें</span>
                    <span className="text-base sm:text-lg md:text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </button>
                
                {/* Optional scroll indicator for mobile */}
                {isMobile && (
                  <motion.div
                    animate={{ y: reduceMotion ? 0 : [0, 5, 0] }}
                    transition={{ repeat: reduceMotion ? 0 : Infinity, duration: 2 }}
                    className="text-center mt-4"
                  >
                    <div className="text-white/60 text-xs">Scroll down</div>
                    <div className="text-white/40 text-lg">↓</div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </Container>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="flex gap-1 sm:gap-2 backdrop-blur-md bg-black/40 px-2 sm:px-3 py-1.5 sm:py-2 rounded-full border border-white/20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className="group relative focus:outline-none"
              aria-label={`Go to image ${index + 1}`}
              onTouchStart={() => setIsTouching(true)}
              onTouchEnd={() => setTimeout(() => setIsTouching(false), 100)}
            >
              <div className={`${
                isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'
              } rounded-full transition-all ${
                index === currentImageIndex 
                  ? 'bg-white shadow-[0_0_6px_1px_rgba(255,255,255,0.7)] md:shadow-[0_0_8px_2px_rgba(255,255,255,0.7)]' 
                  : 'bg-white/60 group-hover:bg-white/80'
              }`} />
              {index === currentImageIndex && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute -inset-0.5 sm:-inset-1 rounded-full border border-white/70"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile touch slider with improved UX */}
      {isMobile && (
        <div 
          className="absolute inset-0 z-20"
          onTouchStart={(e) => {
            setIsTouching(true);
            const touchX = e.touches[0].clientX;
            const handleTouchEnd = (e2) => {
              setIsTouching(false);
              const endX = e2.changedTouches[0].clientX;
              const diff = endX - touchX;
              if (Math.abs(diff) > 50) {
                if (diff > 0) {
                  // Swipe right - previous image
                  setCurrentImageIndex(prev => 
                    prev === 0 ? heroImages.length - 1 : prev - 1
                  );
                } else {
                  // Swipe left - next image
                  setCurrentImageIndex(prev => 
                    (prev + 1) % heroImages.length
                  );
                }
              }
              document.removeEventListener('touchend', handleTouchEnd);
            };
            document.addEventListener('touchend', handleTouchEnd);
          }}
        />
      )}

      {/* Error display (non-intrusive) */}
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