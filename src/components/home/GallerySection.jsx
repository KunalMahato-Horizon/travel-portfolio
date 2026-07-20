import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  MapPin, Calendar, Camera, Globe, 
  X, ArrowLeft, ArrowRight, 
  ChevronDown, ChevronUp, BookOpen, 
  Feather, Heart,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Optimized Cloudinary function with better sizing
const optimizeCloudinary = (url, isMobile) => {
  if (!url || !url.includes("/upload/")) return url;
  // Smaller images for faster loading
  const width = isMobile ? 600 : 1200;
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
};

// ✅ Memoized shuffle function
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function GallerySection() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(7);
  
  const ease = [0.16, 1, 0.3, 1];

  // ✅ Memoized poetic descriptions
  const poeticLines = useMemo(() => [
    "In the silence of ancient stones, wisdom whispers through time",
    "Where the Ganga flows, eternity finds its voice",
    "Beneath the cosmic sky, devotion becomes a dance",
    "In the heart of the city, dreams meet the divine",
    "Where love blooms, the universe conspires",
    "On the sacred peak, peace descends like morning mist",
    "In the palace of light, royalty finds its reflection",
    "Through the arch of time, faith walks eternal",
    "Where the ocean meets the sky, prayers find their way",
    "In the garden of devotion, every leaf sings"
  ], []);

  const poets = useMemo(() => ["Rumi", "Kabir", "Mirabai", "Tulsidas", "Tagore"], []);
  const symbols = useMemo(() => ["🕉️", "🔱", "🌙", "🌊", "💕", "🌆", "👑", "⛰️", "🌸", "⭐"], []);

  // ✅ Mobile check with cleanup
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ✅ Fetch gallery data with AbortController
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        const response = await fetch(`${API_BASE_URL}/api/gallery`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        let imagesArray = [];

        if (Array.isArray(data)) imagesArray = data;
        else if (Array.isArray(data.images)) imagesArray = data.images;
        else if (Array.isArray(data.data)) imagesArray = data.data;
        else throw new Error("No valid image array in response");

        if (imagesArray.length === 0) throw new Error("Gallery images array is empty");

        const formattedImages = imagesArray.map((img, index) => {
          const rawUrl = img.image || img.imageUrl || img.url || img.src || img.photo;
          const location = img.location || img.place || img.city || img.state || img.country || `Coordinate ${index + 1}`;
          const poeticIndex = index % poeticLines.length;

          return {
            id: img._id || index + 1,
            rawUrl: rawUrl,
            title: img.title || `${location} Archive`,
            description: img.description || img.caption || poeticLines[poeticIndex],
            location: location,
            date: img.date || "Timeless",
            tags: img.tags || ["Archive", "Visual"],
            poet: poets[index % poets.length],
            symbol: symbols[index % symbols.length]
          };
        });

        setGalleryImages(shuffleArray(formattedImages));
      } catch (err) {
        console.error("Gallery fetch failed:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, [poeticLines, poets, symbols]);

  // ✅ Memoized callbacks with correct dependencies
  const openLightbox = useCallback((image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  }, []);

  const navigateSlide = useCallback((direction) => {
    setSelectedImage((prev) => {
      if (!prev) return galleryImages[0];
      const displayedImages = galleryImages.slice(0, visibleCount);
      const currentIndex = displayedImages.findIndex(img => img.id === prev.id);
      
      let nextIndex = direction === 'next' 
        ? (currentIndex + 1) % displayedImages.length 
        : (currentIndex - 1 + displayedImages.length) % displayedImages.length;
        
      return displayedImages[nextIndex];
    });
  }, [galleryImages, visibleCount]);

  // ✅ Keyboard navigation with correct dependencies
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateSlide('next');
      if (e.key === 'ArrowLeft') navigateSlide('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, closeLightbox, navigateSlide]);

  // ✅ Memoized handlers
  const handleLoadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + 7, galleryImages.length));
  }, [galleryImages.length]);

  const handleShowLess = useCallback(() => {
    setVisibleCount(7);
    document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const getGridItemStyles = useCallback((index) => {
    const patterns = [
      "md:col-span-8 aspect-[16/10] sm:aspect-[21/9] md:aspect-[16/10]",
      "md:col-span-4 aspect-[4/5] md:aspect-[3/4]",
      "md:col-span-4 aspect-square md:aspect-[4/5]",
      "md:col-span-4 aspect-square md:aspect-[4/5]",
      "md:col-span-4 aspect-[16/9] md:aspect-[4/5]",
      "md:col-span-6 aspect-[16/9] md:aspect-[16/10]",
      "md:col-span-6 aspect-[16/9] md:aspect-[16/10]",
    ];
    return patterns[index % patterns.length];
  }, []);

  // ✅ Memoized displayed images
  const displayedImages = useMemo(() => {
    return galleryImages.slice(0, visibleCount);
  }, [galleryImages, visibleCount]);

  // ✅ Loading state
  if (loading) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center py-20">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <BookOpen className="w-8 h-8 text-white/20 mx-auto mb-4" />
          </motion.div>
          <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase font-mono">
            Opening Sacred Archive
          </p>
        </motion.div>
      </section>
    );
  }

  // ✅ Error state
  if (!loading && (galleryImages.length === 0 || error)) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center py-20">
        <div className="text-center">
          <Camera className="w-8 h-8 text-white/10 mx-auto mb-4" />
          <p className="text-white/30 font-mono text-xs uppercase tracking-widest mb-6">
            Archive Unreachable
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 border border-white/10 bg-white/5 text-white/50 hover:text-white rounded-md text-[10px] tracking-widest font-mono transition-all"
          >
            Re-initialize
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="min-h-screen bg-black text-white py-24 select-none border-t border-white/5 relative overflow-hidden">
      
      {/* ✅ Reduced ambient glow for performance */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gradient-to-b from-amber-400/50 to-amber-400/0" />
            <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">
              03 // Sacred Archive
            </span>
            <div className="w-12 h-[1px] bg-white/10" />
            <span className="text-white/30 font-mono text-[10px] tracking-widest uppercase hidden md:block">
              Visual Memory
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-none">
            <span className="block">Fragments of</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-[length:200%] animate-gradient mt-1">
              Sacred India
            </span>
          </h2>
          <p className="text-white/20 text-sm max-w-md font-light mt-2">
            Each image is a verse in the eternal poem of India's spiritual landscape
          </p>
        </motion.div>
      </div>

      {/* ARCHIVE GRID - ✅ Added lazy loading for images */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-auto">
          <AnimatePresence mode="popLayout">
            {displayedImages.map((image, index) => {
              const isLead = index % 7 === 0;
              const optimizedUrl = optimizeCloudinary(image.rawUrl, isMobile);

              return (
                <motion.div
                  key={image.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease, delay: (index % 4) * 0.05 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => openLightbox(image)}
                  className={`relative group rounded-2xl overflow-hidden cursor-pointer bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-500 ${getGridItemStyles(index)}`}
                >
                  {/* ✅ Image with loading="lazy" and decoding="async" */}
                  <div 
                    className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
                      hoveredIndex === index ? "scale-105" : "scale-100"
                    }`}
                    style={{ backgroundImage: `url(${optimizedUrl})` }}
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                  
                  {/* Poetic Symbol */}
                  <div className="absolute top-4 left-4 text-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                    {image.symbol}
                  </div>

                  {/* Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded bg-black/40 backdrop-blur-md border border-white/10 text-white/50 font-mono text-[9px] tracking-widest uppercase">
                      {isLead ? "Featured" : `#${String(index + 1).padStart(2, '0')}`}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="space-y-1">
                      <h3 className={`font-light text-white tracking-tight ${isLead ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}`}>
                        {image.title}
                      </h3>
                      {isLead && (
                        <p className="text-white/40 text-xs md:text-sm font-light line-clamp-2 max-w-md hidden sm:block">
                          {image.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10 text-white/30 font-mono text-[9px] uppercase tracking-wider">
                      <div className="flex items-center gap-1.5 truncate">
                        <MapPin className="w-3 h-3 text-white/20 flex-shrink-0" />
                        <span className="truncate">{image.location.split(',')[0]}</span>
                      </div>
                      <div className="w-px h-3 bg-white/10" />
                      <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Feather className="w-3 h-3 text-white/20" />
                        <span>{image.poet}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Controls */}
        {galleryImages.length > 7 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center justify-center gap-4 mt-12 md:mt-16"
          >
            {visibleCount < galleryImages.length && (
              <button
                onClick={handleLoadMore}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-all duration-300 text-[11px] font-mono tracking-widest uppercase"
              >
                <span>Reveal More</span>
                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>
            )}

            {visibleCount > 7 && (
              <button
                onClick={handleShowLess}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-transparent hover:bg-white/[0.02] border border-transparent hover:border-white/10 text-white/40 hover:text-white/80 transition-all duration-300 text-[11px] font-mono tracking-widest uppercase"
              >
                <span>Show Less</span>
                <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-20 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-[10px] text-white/20 tracking-widest uppercase">
            <Globe className="w-3 h-3" />
            <span>{galleryImages.length} Sacred Fragments</span>
          </div>
          
          <div className="flex items-center gap-4 text-white/10 text-[10px]">
            <span className="flex items-center gap-1">
              <Compass className="w-3 h-3" />
              Discover
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3" />
              Preserve
            </span>
          </div>

          <div className="font-devanagari text-white/10 text-xs tracking-wider">
            यात्रा एक प्रार्थना है
          </div>
        </div>
      </div>

      {/* Lightbox - ✅ Added loading="lazy" */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center cursor-zoom-out"
            onClick={closeLightbox}
          >
            <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20 pointer-events-none">
              <div className="font-mono text-[10px] text-white/40 tracking-widest uppercase px-3 py-1.5 rounded-md bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-3">
                <span>{selectedImage.symbol}</span>
                <span># {displayedImages.findIndex(img => img.id === selectedImage.id) + 1} / {displayedImages.length}</span>
              </div>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all pointer-events-auto hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={(e) => { e.stopPropagation(); navigateSlide('prev'); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all z-20"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <button
              onClick={(e) => { e.stopPropagation(); navigateSlide('next'); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all z-20"
            >
              <ArrowRight className="w-5 h-5" />
            </button>

            <motion.div
              key={selectedImage.id}
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              className="relative w-full max-w-[85vw] md:max-w-[75vw] h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ✅ Image with loading="lazy" and decoding="async" */}
              <img
                src={optimizeCloudinary(selectedImage.rawUrl, false)}
                alt={selectedImage.title}
                className="max-w-full max-h-[65vh] object-contain shadow-2xl"
                loading="lazy"
                decoding="async"
              />

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8 w-full max-w-2xl text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-white/20 text-sm">
                  <span>{selectedImage.symbol}</span>
                  <span className="text-white/20 text-[8px] tracking-widest">—</span>
                  <span className="text-white/30 text-[10px] font-devanagari">{selectedImage.poet}</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-light text-white tracking-tight">
                  {selectedImage.title}
                </h3>
                
                <p className="text-white/40 text-sm md:text-base font-light italic max-w-lg mx-auto">
                  "{selectedImage.description}"
                </p>
                
                <div className="flex items-center justify-center gap-4 text-white/20 font-mono text-[9px] uppercase tracking-widest pt-2">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    {selectedImage.location.split(',')[0]}
                  </span>
                  <span className="w-px h-3 bg-white/10" />
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    {selectedImage.date}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default GallerySection;