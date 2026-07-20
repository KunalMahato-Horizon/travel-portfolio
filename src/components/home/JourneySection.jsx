import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  MapPin, Calendar, ChevronRight, Sparkles, Home, Church, Landmark,
  Loader2, Shield, X, ArrowLeft, ArrowRight, Eye, RotateCw, Star, Waves,
  Heart, Mountain, Hash
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Image optimization helper
const getOptimizedImageUrl = (url, width) => {
  if (!url || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
};

// ✅ Memoized journey data
const JOURNEYS_DATA = [
  {
    id: 1,
    title: "Adiyogi",
    subtitle: "The First Yogi",
    hindi: "आदियोगी",
    location: "Coimbatore, Tamil Nadu",
    date: "Year-round",
    color: "#22c55e",
    lightColor: "rgba(34, 197, 94, 0.15)",
    description: "Home to the world's largest bust sculpture, embodying the source of yoga.",
    duration: "1 day",
    icon: <Sparkles className="w-5 h-5" />,
    mantra: "ॐ नमः शिवाय",
    significance: "Abode of the First Yogi",
    slug: "adiyogi",
    category: "Spiritual",
    energy: "Cosmic",
    element: "Fire",
    symbol: "🔥"
  },
  {
    id: 2,
    title: "Ayodhya",
    subtitle: "Birthplace of Lord Rama",
    hindi: "अयोध्या",
    location: "Uttar Pradesh",
    date: "Year-round",
    color: "#38bdf8",
    lightColor: "rgba(56, 189, 248, 0.15)",
    description: "Where dharma manifested in stone and Lord Rama took avatar.",
    duration: "2 days",
    icon: <Star className="w-5 h-5" />,
    mantra: "श्री राम जय राम",
    significance: "The Sacred Birthplace",
    slug: "ayodhya",
    category: "Spiritual",
    energy: "Divine",
    element: "Water",
    symbol: "💧"
  },
  {
    id: 3,
    title: "Ujjain",
    subtitle: "City of Temples",
    hindi: "उज्जैन",
    location: "Madhya Pradesh",
    date: "Year-round",
    color: "#8b5cf6",
    lightColor: "rgba(139, 92, 246, 0.15)",
    description: "One of the seven sacred cities and home to Mahakaleshwar Jyotirlinga.",
    duration: "2 days",
    icon: <Church className="w-5 h-5" />,
    mantra: "ॐ नमः शिवाय",
    significance: "City of Mahakal",
    slug: "ujjain",
    category: "Spiritual",
    energy: "Mystical",
    element: "Space",
    symbol: "🌀"
  },
  {
    id: 4,
    title: "Varanasi",
    subtitle: "The Eternal City",
    hindi: "काशी",
    location: "Uttar Pradesh",
    date: "Year-round",
    color: "#818cf8",
    lightColor: "rgba(129, 140, 248, 0.15)",
    description: "Walking on the ghats where time stands still and the Ganga flows eternal.",
    duration: "3 days",
    icon: <Waves className="w-5 h-5" />,
    mantra: "ॐ नमः शिवाय",
    significance: "The Liberation City",
    slug: "varanasi",
    category: "Spiritual",
    energy: "Eternal",
    element: "Air",
    symbol: "🌬️"
  },
  {
    id: 5,
    title: "Vrindavan",
    subtitle: "Divine Love",
    hindi: "वृन्दावन",
    location: "Uttar Pradesh",
    date: "Year-round",
    color: "#f472b6",
    lightColor: "rgba(244, 114, 182, 0.15)",
    description: "Where every breeze whispers the names of Radha-Krishna.",
    duration: "2 days",
    icon: <Heart className="w-5 h-5" />,
    mantra: "हरे कृष्ण हरे कृष्ण",
    significance: "Playground of Divine Love",
    slug: "vrindavan",
    category: "Spiritual",
    energy: "Loving",
    element: "Earth",
    symbol: "🌿"
  },
  {
    id: 6,
    title: "Mumbai",
    subtitle: "City of Dreams",
    hindi: "मुंबई",
    location: "Maharashtra",
    date: "Year-round",
    color: "#f59e0b",
    lightColor: "rgba(245, 158, 11, 0.15)",
    description: "Where spirituality meets the sea at Siddhivinayak and Haji Ali.",
    duration: "3 days",
    icon: <Home className="w-5 h-5" />,
    mantra: "ॐ गणेशाय नमः",
    significance: "Gateway to Spiritual India",
    slug: "mumbai",
    category: "Urban",
    energy: "Dynamic",
    element: "Ocean",
    symbol: "🌊"
  },
  {
    id: 7,
    title: "Mysore Palace",
    subtitle: "Royal Splendor",
    hindi: "मैसूर महल",
    location: "Karnataka",
    date: "Year-round",
    color: "#d946ef",
    lightColor: "rgba(217, 70, 239, 0.15)",
    description: "The magnificent palace that stands as a testament to India's royal heritage.",
    duration: "1 day",
    icon: <Landmark className="w-5 h-5" />,
    mantra: "ॐ श्रीमते नमः",
    significance: "Architectural Marvel",
    slug: "mysore-palace",
    category: "Heritage",
    energy: "Royal",
    element: "Light",
    symbol: "✨"
  },
  {
    id: 8,
    title: "Parasnath",
    subtitle: "Jain Pilgrimage",
    hindi: "पारसनाथ",
    location: "Jharkhand",
    date: "Year-round",
    color: "#10b981",
    lightColor: "rgba(16, 185, 129, 0.15)",
    description: "The most important Jain pilgrimage site with 20 temples atop the hill.",
    duration: "2 days",
    icon: <Mountain className="w-5 h-5" />,
    mantra: "णमो अरिहंताणं",
    significance: "Jain Spiritual Summit",
    slug: "parasnath",
    category: "Spiritual",
    energy: "Peaceful",
    element: "Stone",
    symbol: "⛰️"
  }
];

function JourneysSection() {
  // --- State ---
  const [cloudinaryImages, setCloudinaryImages] = useState({});
  const [imagesLoading, setImagesLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJourney, setSelectedJourney] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [particles] = useState(() => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        delay: Math.random() * 2
      });
    }
    return newParticles;
  });

  const autoPlayRef = useRef(null);

  // --- Memoized data ---
  const journeys = useMemo(() => JOURNEYS_DATA, []);

  // --- Effects ---
  // Mobile check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-play with cleanup
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % journeys.length);
      }, 4000);
    }
    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlaying, journeys.length]);

  // Image loading helper
  const loadImage = useCallback((url) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve(url);
    img.src = url;
  }), []);

  // Fetch Cloudinary images with AbortController
  useEffect(() => {
    const fetchCloudinaryImages = async () => {
      try {
        setImagesLoading(true);
        const API_URL = process.env.REACT_APP_API_URL || "https://travel-portfolio-backend.vercel.app";
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(`${API_URL}/api/journeys`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        if (!response.ok) return;
        
        const data = await response.json();
        if (!data.journeys || !Array.isArray(data.journeys)) return;

        const imageMap = {};
        const targetWidth = isMobile ? 700 : 1400;

        // ✅ Preload images in parallel
        const loadPromises = data.journeys.map(async (journey) => {
          if (journey.slug && journey.image) {
            const finalUrl = getOptimizedImageUrl(journey.image, targetWidth);
            imageMap[journey.slug] = finalUrl;
            await loadImage(finalUrl);
          }
        });

        await Promise.allSettled(loadPromises);
        setCloudinaryImages(imageMap);
      } catch (err) {
        console.log("Cloudinary unavailable, using fallbacks");
      } finally {
        setImagesLoading(false);
      }
    };

    if (isMobile !== null) fetchCloudinaryImages();
  }, [isMobile, loadImage]);

  // Keyboard navigation with useCallback
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsAutoPlaying(true);
    document.body.style.overflow = 'auto';
  }, []);

  const nextJourney = useCallback(() => {
    if (!selectedJourney) return;
    const currentIndex = journeys.findIndex(j => j.id === selectedJourney.id);
    const nextIndex = (currentIndex + 1) % journeys.length;
    setSelectedJourney(journeys[nextIndex]);
  }, [selectedJourney, journeys]);

  const prevJourney = useCallback(() => {
    if (!selectedJourney) return;
    const currentIndex = journeys.findIndex(j => j.id === selectedJourney.id);
    const prevIndex = (currentIndex - 1 + journeys.length) % journeys.length;
    setSelectedJourney(journeys[prevIndex]);
  }, [selectedJourney, journeys]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextJourney();
      if (e.key === 'ArrowLeft') prevJourney();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal, nextJourney, prevJourney]);

  // --- Memoized helpers ---
  const getFallbackImage = useCallback((journey) =>
    `linear-gradient(135deg, ${journey.color}20 0%, ${journey.color}10 50%, ${journey.color}05 100%)`, []);

  const getImageStyle = useCallback((journey) => {
    const cloudinaryImage = cloudinaryImages[journey.slug];
    if (cloudinaryImage) {
      return {
        backgroundImage: `url(${cloudinaryImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    return { background: getFallbackImage(journey), backgroundColor: '#000' };
  }, [cloudinaryImages, getFallbackImage]);

  const renderImageContent = useCallback((journey, isFeatured = false) => {
    const cloudinaryImage = cloudinaryImages[journey.slug];

    if (imagesLoading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <Loader2 className="w-6 h-6 animate-spin text-white/20" />
        </div>
      );
    }

    if (cloudinaryImage) {
      return (
        <>
          <div
            className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110"
            style={getImageStyle(journey)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          {isFeatured && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          )}
        </>
      );
    }

    return (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ background: getFallbackImage(journey), backgroundColor: '#000' }}
      >
        <div className="text-4xl opacity-20">{journey.icon}</div>
      </div>
    );
  }, [cloudinaryImages, imagesLoading, getImageStyle, getFallbackImage]);

  const openModal = useCallback((journey) => {
    setIsAutoPlaying(false);
    setSelectedJourney(journey);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const featured = journeys[activeIndex];
  const gridItems = journeys.filter((_, i) => i !== activeIndex);

  // --- Render ---
  return (
    <section className="relative min-h-screen bg-black overflow-hidden py-12 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12">
      {/* ✅ Reduced particles for performance */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              animation: `float ${p.speed + 2}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs - ✅ Reduced size for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-56 h-56 bg-amber-500/5 rounded-full blur-3xl animate-pulse-slower" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto mb-8 md:mb-12"
      >
        <div className="flex items-center gap-4">
          <div className="w-1 h-8 bg-gradient-to-b from-amber-400/50 to-amber-400/0" />
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400/30" />
              <span className="text-amber-400/30 text-xs tracking-[0.2em] uppercase font-light">
                Sacred Portal
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight mt-2">
              <span className="block">Step Into</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-[length:200%] animate-gradient mt-1">
                Sacred India
              </span>
            </h2>
          </div>
        </div>
      </motion.div>

      {/* Main Portal */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Featured Portal - ✅ Reduced animation complexity */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="relative rounded-3xl overflow-hidden mb-6 md:mb-8 cursor-pointer group"
          onClick={() => openModal(featured)}
        >
          <div className="relative aspect-[21/9] w-full">
            {renderImageContent(featured, true)}

            {/* ✅ Simplified portal rings */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-[40px] border border-white/5"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 rounded-[48px] border border-white/5"
              />
            </div>

            {/* Energy Pulse */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 80%, ${featured.color}20, transparent 70%)`,
              }}
            />

            {/* Featured Content */}
            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full backdrop-blur-xl border border-white/10"
                  style={{
                    backgroundColor: featured.lightColor,
                    color: featured.color,
                    borderColor: `${featured.color}30`
                  }}
                >
                  {featured.category}
                </span>
                <span className="text-white/20 text-xs font-light flex items-center gap-1">
                  {featured.symbol}
                  {featured.energy} Energy
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-white">
                {featured.title}
                <span className="block text-white/30 text-sm md:text-base font-light mt-1">
                  {featured.subtitle}
                </span>
              </h3>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-white/20 text-xs">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {featured.location.split(',')[0]}
                </span>
                <span className="w-px h-3 bg-white/10" />
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {featured.duration}
                </span>
                <span className="w-px h-3 bg-white/10" />
                <span className="flex items-center gap-1">
                  {featured.symbol}
                  {featured.element}
                </span>
              </div>

              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mt-4 flex items-center gap-2 text-white/20 text-xs"
              >
                <Eye className="w-3 h-3" />
                <span>Click to enter portal</span>
                <ChevronRight className="w-3 h-3" />
              </motion.div>
            </div>

            {/* Auto-play Toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsAutoPlaying(!isAutoPlaying);
              }}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/10 transition-all duration-300"
              aria-label="Toggle auto-play"
            >
              {isAutoPlaying ? (
                <div className="w-2 h-2 rounded-full bg-amber-400/50 animate-pulse" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-white/20" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Grid Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {gridItems.slice(0, 4).map((journey, index) => (
            <motion.div
              key={journey.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.3 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => {
                setActiveIndex(journeys.indexOf(journey));
                openModal(journey);
              }}
              className="relative rounded-2xl overflow-hidden cursor-pointer group"
            >
              <div className="relative aspect-[4/3] w-full">
                {renderImageContent(journey, false)}

                {/* Mini Portal Ring - ✅ Reduced animation */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-2 rounded-[16px] border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 50% 100%, ${journey.color}20, transparent 70%)`
                    }}
                  />
                </div>

                {/* Card Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="text-[7px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-full backdrop-blur-xl border border-white/10"
                      style={{
                        backgroundColor: journey.lightColor,
                        color: journey.color,
                        borderColor: `${journey.color}30`
                      }}
                    >
                      {journey.category}
                    </span>
                    <span className="text-white/10 text-[8px]">{journey.symbol}</span>
                  </div>
                  <h4 className="text-sm md:text-base font-light text-white">
                    {journey.title}
                  </h4>
                  <p className="text-[10px] text-white/30 mt-0.5">
                    {journey.location.split(',')[0]}
                  </p>

                  <motion.div
                    animate={{ x: hoveredIndex === index ? 4 : 0 }}
                    className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span className="text-[8px] text-white/30 flex items-center gap-1">
                      <Eye className="w-2.5 h-2.5" />
                      Enter Portal
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-3 mt-6 md:mt-8">
          {journeys.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 3000);
              }}
              className="group relative focus:outline-none"
              aria-label={`Go to slide ${index + 1}`}
            >
              <motion.div
                animate={{
                  width: index === activeIndex ? 28 : 6,
                  height: index === activeIndex ? 3 : 1.5,
                  backgroundColor: index === activeIndex ? '#ffffff' : 'rgba(255,255,255,0.15)'
                }}
                className="rounded-full transition-all duration-500"
              />
              {index === activeIndex && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute -inset-1 rounded-full border border-white/30"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-center gap-2 mt-3 text-white/10 text-[8px] tracking-[0.15em] uppercase">
          <RotateCw className="w-3 h-3" />
          <span>{isAutoPlaying ? 'Auto-playing' : 'Paused'}</span>
          <div className="w-px h-3 bg-white/10" />
          <span
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="cursor-pointer hover:text-white/20 transition-colors"
          >
            {isAutoPlaying ? 'Pause' : 'Play'}
          </span>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {journeys.slice(0, 4).map((j) => (
                <div
                  key={j.id}
                  className="w-8 h-8 rounded-full border border-black flex items-center justify-center text-sm"
                  style={{ backgroundColor: j.lightColor }}
                >
                  <span className="text-white/40">{j.icon}</span>
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-white/20">
                +{journeys.length - 4}
              </div>
            </div>
            <span className="text-white/10 text-[10px] tracking-wider">
              {journeys.length} Sacred Portals
            </span>
          </div>

          <div className="text-center">
            <div className="font-devanagari text-white/15 text-sm">
              यात्रा एक प्रार्थना है
            </div>
            <div className="text-white/5 text-[10px] tracking-[0.2em] uppercase mt-0.5">
              Every journey is a prayer
            </div>
          </div>

          <div className="text-white/10 text-[10px] flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Portal Experience
          </div>
        </div>
      </motion.div>

      {/* Keyframes for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-20px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 5s ease-in-out infinite;
        }
        .animate-gradient {
          animation: gradient 3s ease-in-out infinite;
        }
      `}</style>

      {/* Modal - ✅ Same but optimized */}
      <AnimatePresence>
        {isModalOpen && selectedJourney && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-black/60 rounded-3xl border border-white/5 overflow-hidden backdrop-blur-xl">
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-white/10 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:rotate-90"
                >
                  <X className="w-5 h-5 text-white/40" />
                </button>

                {/* Modal Image */}
                <div className="relative aspect-[16/9] w-full">
                  {renderImageContent(selectedJourney, true)}

                  {/* Portal Rings - ✅ Reduced */}
                  <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-4 rounded-[32px] border border-white/5"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-8 rounded-[40px] border border-white/5"
                    />
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={(e) => { e.stopPropagation(); prevJourney(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:scale-110"
                    aria-label="Previous"
                  >
                    <ArrowLeft className="w-5 h-5 text-white/40" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextJourney(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:scale-110"
                    aria-label="Next"
                  >
                    <ArrowRight className="w-5 h-5 text-white/40" />
                  </button>

                  {/* Counter */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 flex items-center gap-3">
                    <span className="text-white/30 text-xs">
                      {String(journeys.findIndex(j => j.id === selectedJourney.id) + 1).padStart(2, '0')} / {String(journeys.length).padStart(2, '0')}
                    </span>
                    <div className="w-px h-3 bg-white/10" />
                    <span className="text-white/20 text-xs flex items-center gap-1">
                      {selectedJourney.symbol}
                      {selectedJourney.energy}
                    </span>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 md:p-8 lg:p-10 space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white">
                          {selectedJourney.title}
                        </h3>
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] tracking-[0.1em] uppercase"
                          style={{
                            backgroundColor: selectedJourney.lightColor,
                            color: selectedJourney.color
                          }}
                        >
                          {selectedJourney.category}
                        </span>
                      </div>
                      <p className="text-white/40 text-sm md:text-base font-light">
                        {selectedJourney.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-white/15 text-sm font-devanagari">
                        {selectedJourney.hindi}
                      </div>
                      <div className="text-white/10 text-xs mt-1">
                        {selectedJourney.symbol} {selectedJourney.element}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 py-3 border-y border-white/5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-white/20" />
                      <span className="text-xs text-white/40">{selectedJourney.location}</span>
                    </div>
                    <div className="w-px h-4 bg-white/5" />
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-white/20" />
                      <span className="text-xs text-white/40">{selectedJourney.date}</span>
                    </div>
                    <div className="w-px h-4 bg-white/5" />
                    <div
                      className="px-3 py-0.5 rounded-full text-xs"
                      style={{
                        backgroundColor: selectedJourney.lightColor,
                        color: selectedJourney.color
                      }}
                    >
                      {selectedJourney.duration}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-white/5">
                        <Hash className="w-4 h-4 text-white/20" />
                      </div>
                      <div className="space-y-1">
                        <div className="font-devanagari text-lg md:text-xl" style={{ color: selectedJourney.color }}>
                          {selectedJourney.mantra}
                        </div>
                        <div className="text-xs text-white/20">
                          {selectedJourney.significance}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-white/40 leading-relaxed">
                    {selectedJourney.description}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-white/10 text-white/60 hover:text-white transition-all duration-300 text-sm font-light tracking-wider flex items-center justify-center gap-2 group"
                  >
                    Enter This Portal
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default JourneysSection;