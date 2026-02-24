import React, { useState, useEffect } from "react";
import { 
  MapPin, Calendar, ChevronRight, Globe,
  Mountain, Waves, Heart, Star, Hash,
  Loader2, ImageOff, Sparkles, Home, Church, Landmark,
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function JourneysSection() {
  const [activeJourney, setActiveJourney] = useState(1);
  const [cloudinaryImages, setCloudinaryImages] = useState({});
  const [imagesLoading, setImagesLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [showJourneyList, setShowJourneyList] = useState(false);

  // Add custom scrollbar styles to global CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Custom scrollbar styles */
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #4f46e5, #8b5cf6);
        border-radius: 10px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #6366f1, #a855f7);
      }
      
      /* Firefox scrollbar */
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #8b5cf6 rgba(255, 255, 255, 0.05);
      }
      
      /* Smooth scroll behavior */
      .custom-scrollbar {
        scroll-behavior: smooth;
      }
      
      /* Hide scrollbar when not needed */
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // 🔹 SACRED PILGRIMAGE DESTINATIONS ONLY with neutral fallback
  const journeys = [
    {
      id: 1,
      title: "Adiyogi",
      subtitle: "The First Yogi",
      hindi: "आदियोगी",
      location: "Coimbatore, Tamil Nadu",
      date: "Year-round",
      color: "#22c55e",
      lightColor: "rgba(34, 197, 94, 0.1)",
      description: "Home to the world's largest bust sculpture, embodying the source of yoga.",
      duration: "1 day",
      icon: <Sparkles className="w-4 h-4" />,
      mantra: "ॐ नमः शिवाय",
      significance: "Abode of the First Yogi",
      slug: "adiyogi"
    },
    {
      id: 2,
      title: "Ayodhya",
      subtitle: "Birthplace of Lord Rama",
      hindi: "अयोध्या",
      location: "Uttar Pradesh",
      date: "Year-round",
      color: "#38bdf8",
      lightColor: "rgba(56, 189, 248, 0.1)",
      description: "Where dharma manifested in stone and Lord Rama took avatar.",
      duration: "2 days",
      icon: <Star className="w-4 h-4" />,
      mantra: "श्री राम जय राम",
      significance: "The Sacred Birthplace",
      slug: "ayodhya"
    },
    {
      id: 3,
      title: "Ujjain",
      subtitle: "City of Temples",
      hindi: "उज्जैन",
      location: "Madhya Pradesh",
      date: "Year-round",
      color: "#8b5cf6",
      lightColor: "rgba(139, 92, 246, 0.1)",
      description: "One of the seven sacred cities and home to Mahakaleshwar Jyotirlinga.",
      duration: "2 days",
      icon: <Church className="w-4 h-4" />,
      mantra: "ॐ नमः शिवाय",
      significance: "City of Mahakal",
      slug: "ujjain"
    },
    {
      id: 4,
      title: "Varanasi",
      subtitle: "The Eternal City",
      hindi: "काशी",
      location: "Uttar Pradesh",
      date: "Year-round",
      color: "#818cf8",
      lightColor: "rgba(129, 140, 248, 0.1)",
      description: "Walking on the ghats where time stands still and the Ganga flows eternal.",
      duration: "3 days",
      icon: <Waves className="w-4 h-4" />,
      mantra: "ॐ नमः शिवाय",
      significance: "The Liberation City",
      slug: "varanasi"
    },
    {
      id: 5,
      title: "Vrindavan",
      subtitle: "Divine Love",
      hindi: "वृन्दावन",
      location: "Uttar Pradesh",
      date: "Year-round",
      color: "#f472b6",
      lightColor: "rgba(244, 114, 182, 0.1)",
      description: "Where every breeze whispers the names of Radha-Krishna.",
      duration: "2 days",
      icon: <Heart className="w-4 h-4" />,
      mantra: "हरे कृष्ण हरे कृष्ण",
      significance: "Playground of Divine Love",
      slug: "vrindavan"
    },
    {
      id: 6,
      title: "Mumbai",
      subtitle: "City of Dreams",
      hindi: "मुंबई",
      location: "Maharashtra",
      date: "Year-round",
      color: "#f59e0b",
      lightColor: "rgba(245, 158, 11, 0.1)",
      description: "Where spirituality meets the sea at Siddhivinayak and Haji Ali.",
      duration: "3 days",
      icon: <Home className="w-4 h-4" />,
      mantra: "ॐ गणेशाय नमः",
      significance: "Gateway to Spiritual India",
      slug: "mumbai"
    },
    {
      id: 7,
      title: "Mysore Palace",
      subtitle: "Royal Splendor",
      hindi: "मैसूर महल",
      location: "Karnataka",
      date: "Year-round",
      color: "#d946ef",
      lightColor: "rgba(217, 70, 239, 0.1)",
      description: "The magnificent palace that stands as a testament to India's royal heritage.",
      duration: "1 day",
      icon: <Landmark className="w-4 h-4" />,
      mantra: "ॐ श्रीमते नमः",
      significance: "Architectural Marvel",
      slug: "mysore-palace"
    },
    {
      id: 8,
      title: "Parasnath",
      subtitle: "Jain Pilgrimage",
      hindi: "पारसनाथ",
      location: "Jharkhand",
      date: "Year-round",
      color: "#10b981",
      lightColor: "rgba(16, 185, 129, 0.1)",
      description: "The most important Jain pilgrimage site with 20 temples atop the hill.",
      duration: "2 days",
      icon: <Mountain className="w-4 h-4" />,
      mantra: "णमो अरिहंताणं",
      significance: "Jain Spiritual Summit",
      slug: "parasnath"
    }
  ];

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setShowJourneyList(false);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  // 🔹 NEUTRAL FALLBACK IMAGES
  const getFallbackImage = (journey) => {
    return `linear-gradient(135deg, ${journey.color}20 0%, ${journey.color}10 50%, ${journey.color}05 100%)`;
  };

  // Image preloading function
  const loadImage = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(url);
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  };

  // 🔹 FETCH CLOUDINARY IMAGES WITH FALLBACK
// 🔹 FETCH CLOUDINARY IMAGES (FAST VERSION)
useEffect(() => {
  const fetchCloudinaryImages = async () => {
    try {
      setImagesLoading(true);

      const API_URL =
        process.env.REACT_APP_API_URL ||
        "https://travel-portfolio-backend.vercel.app";

      const response = await fetch(`${API_URL}/api/journeys`);

      if (!response.ok) return;

      const data = await response.json();

      if (!data.journeys || !Array.isArray(data.journeys)) return;

      const imageMap = {};

      data.journeys.forEach((journey) => {
        if (journey.slug && journey.image) {
          const targetWidth = isMobile ? 700 : 1400;

          let finalUrl = journey.image;

          // Optimize Cloudinary URL
          if (journey.image.includes("/upload/")) {
            finalUrl = journey.image.replace(
              "/upload/",
              `/upload/f_auto,q_auto,w_${targetWidth}/`
            );
          }

          // Save URL
          imageMap[journey.slug] = finalUrl;

          // Preload in background (no waiting)
          loadImage(finalUrl).catch(() => {});
        }
      });

      setCloudinaryImages(imageMap);
    } catch (err) {
      console.log("Cloudinary images not available, using fallbacks");
    } finally {
      setImagesLoading(false);
    }
  };

  if (isMobile !== null) {
    fetchCloudinaryImages();
  }
}, [isMobile]);

  const selectedJourney = journeys.find(j => j.id === activeJourney) || journeys[0];

  // 🔹 HANDLE IMAGE LOADING ERRORS
  const handleImageError = (journeySlug) => {
    setImageErrors(prev => ({
      ...prev,
      [journeySlug]: true
    }));
  };

  // 🔹 GET IMAGE URL OR FALLBACK
  const getImageStyle = (journey) => {
    const cloudinaryImage = cloudinaryImages[journey.slug];
    const hasError = imageErrors[journey.slug];
    
    if (cloudinaryImage && !hasError) {
      return {
        backgroundImage: `url(${cloudinaryImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      };
    }
    
    return {
      background: getFallbackImage(journey),
      backgroundColor: '#000' // Add fallback background color
    };
  };

  // 🔹 RENDER IMAGE OR FALLBACK
  const renderImageContent = (journey) => {
    const cloudinaryImage = cloudinaryImages[journey.slug];
    const hasError = imageErrors[journey.slug];
    
    if (imagesLoading) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 animate-spin text-gray-600" />
        </div>
      );
    }
    
    if (cloudinaryImage && !hasError) {
      return (
        <>
          <div 
            className="absolute inset-0 transition-transform duration-700 hover:scale-105"
            style={getImageStyle(journey)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </>
      );
    }
    
    // Fallback gradient with text
    return (
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8"
        style={{ 
          background: getFallbackImage(journey),
          backgroundColor: '#000'
        }}
      >
        <div className="text-center space-y-2 sm:space-y-4">
          <div className="text-4xl sm:text-5xl md:text-6xl opacity-20" style={{ color: journey.color }}>
            {journey.icon}
          </div>
          <div className="text-white/80 font-semibold text-lg sm:text-xl">
            {journey.title}
          </div>
          <div className="text-white/60 text-xs sm:text-sm md:text-base max-w-md">
            {cloudinaryImage ? "Loading image..." : "Image coming soon"}
          </div>
        </div>
      </div>
    );
  };

  // 🔹 MOBILE JOURNEY SELECTOR
  const MobileJourneySelector = () => (
    <div className="lg:hidden mb-6">
      <button
        onClick={() => setShowJourneyList(!showJourneyList)}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-lg"
            style={{ 
              backgroundColor: selectedJourney.lightColor,
              color: selectedJourney.color
            }}
          >
            {selectedJourney.icon}
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-100">{selectedJourney.title}</div>
            <div className="text-sm text-gray-500">{selectedJourney.location}</div>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showJourneyList ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {showJourneyList && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 rounded-xl bg-gray-900/80 border border-gray-800 overflow-hidden"
          >
            <div className="max-h-64 overflow-y-auto custom-scrollbar p-2">
              {journeys.map((journey) => (
                <button
                  key={journey.id}
                  onClick={() => {
                    setActiveJourney(journey.id);
                    setShowJourneyList(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                    activeJourney === journey.id
                      ? 'bg-gray-800'
                      : 'hover:bg-gray-800/50'
                  }`}
                >
                  <div 
                    className="p-2 rounded-lg"
                    style={{ 
                      backgroundColor: activeJourney === journey.id 
                        ? journey.lightColor 
                        : 'rgba(255,255,255,0.05)',
                      color: journey.color
                    }}
                  >
                    {journey.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-100">{journey.title}</div>
                    <div className="text-xs text-gray-500">{journey.location}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section id="safar" className="min-h-screen bg-gray-950">
      {/* Minimal Header */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
            </div>
            <span className="text-xs sm:text-sm tracking-widest text-gray-400">
              SACRED PILGRIMAGE
            </span>
          </div>
          
          {/* Status Indicator - Hidden on mobile */}
          <div className="hidden sm:block text-xs text-gray-500">
            {imagesLoading ? (
              <span className="flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Loading Images...
              </span>
            ) : Object.keys(cloudinaryImages).length > 0 ? (
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                {Object.keys(cloudinaryImages).length}/{journeys.length} Images Loaded
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <ImageOff className="w-3 h-3" />
                Using Fallback Images
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-24">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-white">
            Sacred
            <span className="block mt-1 sm:mt-2 font-normal">Pilgrimage</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed text-gray-400">
            Spiritual journeys through India's most sacred destinations. 
            Each pilgrimage tells a unique story of faith and devotion.
          </p>
        </div>
      </div>

      {/* Mobile Journey Selector */}
      <MobileJourneySelector />

      {/* Main Content */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-8 sm:mt-12 lg:mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Left Column - Journey List (Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-6">
              <div className="p-4 sm:p-6 rounded-xl lg:rounded-2xl border bg-gray-900/50 border-gray-800">
                <h2 className="text-xs sm:text-sm font-medium mb-4 tracking-wider text-gray-400">
                  PILGRIMAGE DESTINATIONS
                </h2>
                
                {/* Custom styled scrollbar container */}
                <div className="relative">
                  <div className="custom-scrollbar max-h-[400px] overflow-y-auto pr-2">
                    <div className="space-y-2">
                      {journeys.map((journey) => (
                        <button
                          key={journey.id}
                          onClick={() => setActiveJourney(journey.id)}
                          className={`w-full text-left p-3 sm:p-4 rounded-lg lg:rounded-xl transition-all duration-300 flex items-center gap-3 sm:gap-4 ${
                            activeJourney === journey.id
                              ? 'bg-gray-800 shadow-lg'
                              : 'hover:bg-gray-800/50 hover:shadow-md'
                          }`}
                          style={activeJourney === journey.id ? {
                            borderLeft: `3px solid ${journey.color}`,
                            boxShadow: `0 4px 12px ${journey.color}20`
                          } : {}}
                        >
                          <div 
                            className="p-2 sm:p-2.5 rounded-lg transition-transform duration-300 group-hover:scale-110"
                            style={{ 
                              backgroundColor: activeJourney === journey.id 
                                ? journey.lightColor 
                                : 'rgba(255,255,255,0.05)',
                              color: journey.color
                            }}
                          >
                            {journey.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span className={`text-sm sm:text-base font-medium ${
                                activeJourney === journey.id 
                                  ? 'text-gray-100' 
                                  : 'text-gray-300'
                              }`}>
                                {journey.title}
                              </span>
                              <ChevronRight className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 ${
                                activeJourney === journey.id 
                                  ? 'translate-x-0 opacity-100' 
                                  : 'translate-x-[-4px] opacity-0'
                              } text-gray-500`} />
                            </div>
                            <div className="text-xs sm:text-sm mt-0.5 sm:mt-1 text-gray-500">
                              {journey.location}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Scroll indicator gradient */}
                  <div className="absolute top-0 right-0 w-2 h-8 bg-gradient-to-b from-gray-900/80 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-2 h-8 bg-gradient-to-t from-gray-900/80 to-transparent pointer-events-none" />
                </div>

                {/* Simple Counter */}
                <div className="mt-6 lg:mt-8 pt-4 sm:pt-6 border-t border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl sm:text-2xl font-light text-white">
                        {journeys.length}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        Sacred Sites
                      </div>
                    </div>
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Journey Details */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedJourney.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 sm:space-y-8"
              >
                {/* Hero Image Container */}
                <div className="relative aspect-video sm:aspect-[16/9] rounded-xl lg:rounded-2xl overflow-hidden group">
                  {renderImageContent(selectedJourney)}
                  
                  {/* Hidden image for error detection */}
                  {cloudinaryImages[selectedJourney.slug] && !imageErrors[selectedJourney.slug] && (
                    <img
                      src={cloudinaryImages[selectedJourney.slug]}
                      alt=""
                      className="hidden"
                      onError={() => handleImageError(selectedJourney.slug)}
                    />
                  )}
                  
                  {/* Floating Badge */}
                  <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-md bg-white/10 border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                      <span className="text-white text-xs sm:text-sm font-medium">
                        {selectedJourney.hindi}
                      </span>
                    </div>
                  </div>
                  
                  {/* Image Status */}
                  <div className="absolute bottom-2 sm:bottom-3 lg:bottom-4 left-2 sm:left-3 lg:left-4">
                    <div className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full backdrop-blur-md ${
                      cloudinaryImages[selectedJourney.slug] && !imageErrors[selectedJourney.slug]
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {cloudinaryImages[selectedJourney.slug] && !imageErrors[selectedJourney.slug]
                        ? 'Cloudinary Image'
                        : 'Using Fallback'}
                    </div>
                  </div>
                </div>

                {/* Journey Info */}
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <div className="flex items-center gap-3 sm:gap-4 mb-1 sm:mb-2">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-white">
                        {selectedJourney.title}
                      </h2>
                      <div className="h-px flex-1 bg-gradient-to-r from-gray-700 to-transparent" />
                    </div>
                    <p className="text-base sm:text-lg md:text-xl font-light text-gray-300">
                      {selectedJourney.subtitle}
                    </p>
                  </div>

                  {/* Stats Bar */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 py-3 sm:py-4 border-y border-gray-800">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      <span className="text-xs sm:text-sm text-gray-300">
                        {selectedJourney.location}
                      </span>
                    </div>
                    <div className="hidden sm:block w-px h-4" style={{ backgroundColor: selectedJourney.color + '30' }} />
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                      <span className="text-xs sm:text-sm text-gray-300">
                        {selectedJourney.date}
                      </span>
                    </div>
                    <div className="hidden sm:block w-px h-4" style={{ backgroundColor: selectedJourney.color + '30' }} />
                    <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm" style={{ 
                      backgroundColor: selectedJourney.lightColor,
                      color: selectedJourney.color
                    }}>
                      {selectedJourney.duration}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-300">
                    {selectedJourney.description}
                  </p>

                  {/* Sanskrit Section */}
                  <div className="p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                        <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="font-devanagari text-lg sm:text-xl md:text-2xl" style={{ color: selectedJourney.color }}>
                          {selectedJourney.mantra}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400">
                          {selectedJourney.significance}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Journey Grid */}
                  <div>
                    <h3 className="text-xs sm:text-sm font-medium mb-3 sm:mb-4 tracking-wider text-gray-400">
                      MORE PILGRIMAGES
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {journeys
                        .filter(j => j.id !== selectedJourney.id)
                        .slice(0, 2)
                        .map((journey) => (
                          <button
                            key={journey.id}
                            onClick={() => setActiveJourney(journey.id)}
                            className="group p-3 sm:p-4 rounded-lg sm:rounded-xl text-left transition-all duration-300 bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800 hover:border-gray-700 hover:shadow-lg"
                          >
                            <div className="flex items-center gap-2 sm:gap-3">
                              <div 
                                className="p-1.5 sm:p-2 rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                                style={{ 
                                  backgroundColor: journey.lightColor,
                                  color: journey.color
                                }}
                              >
                                {journey.icon}
                              </div>
                              <div>
                                <div className="text-sm sm:text-base font-medium text-gray-100 group-hover:text-white">
                                  {journey.title}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-400">
                                  {journey.location}
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Simple Sanskrit Quote */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 mt-12 sm:mt-16 lg:mt-20 pb-12 sm:pb-16 lg:pb-20 text-gray-600">
        <div className="max-w-4xl mx-auto">
          <div className="h-px w-full mb-6 sm:mb-8 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
          <div className="text-center">
            <div className="font-devanagari text-base sm:text-lg mb-1 sm:mb-2 opacity-90">
              यात्रा एक प्रार्थना है
            </div>
            <div className="text-xs sm:text-sm italic opacity-70 text-gray-500">
              Every journey is a prayer
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JourneysSection;