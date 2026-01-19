import { useState, useRef, useEffect } from "react";
import { 
  X, ChevronLeft, ChevronRight,
  Camera, MapPin, Calendar, Eye,
  Download, Share2,
  Loader2, WifiOff,
  Menu, Grid, List // Added responsive icons
} from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// API Configuration
const API_BASE_URL = "http://localhost:5000/api";

function GallerySection() {
  // State for gallery data
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageStats, setImageStats] = useState({});

  // UI states
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleCount, setVisibleCount] = useState(12);
  const [gridView, setGridView] = useState(true); // For mobile toggle between grid/list
  const [isMobile, setIsMobile] = useState(false);
  
  const containerRef = useRef(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 30 });

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Helper function to get layout class for masonry grid - RESPONSIVE VERSION
  const getLayoutClass = (index) => {
    // Different patterns for different screen sizes
    const mobilePatterns = [
      { height: "h-56", colSpan: "col-span-1" },
      { height: "h-64", colSpan: "col-span-1" },
      { height: "h-48", colSpan: "col-span-1" },
    ];
    
    const tabletPatterns = [
      { height: "h-64", colSpan: "col-span-1" },
      { height: "h-80", colSpan: "col-span-1" },
      { height: "h-72", colSpan: "col-span-1" },
      { height: "h-96", colSpan: "col-span-1" },
      { height: "h-64 sm:col-span-2 sm:h-72", colSpan: "col-span-1 sm:col-span-2" },
    ];
    
    const desktopPatterns = [
      { height: "h-64", colSpan: "col-span-1" },
      { height: "h-80", colSpan: "col-span-1" },
      { height: "h-96", colSpan: "col-span-1" },
      { height: "h-72", colSpan: "col-span-1" },
      { height: "h-64 lg:col-span-2 lg:h-80", colSpan: "col-span-1 lg:col-span-2" },
      { height: "h-80", colSpan: "col-span-1" },
      { height: "h-96", colSpan: "col-span-1" },
      { height: "h-72 xl:col-span-2 xl:h-64", colSpan: "col-span-1 xl:col-span-2" },
    ];
    
    // Use different patterns based on screen size
    if (isMobile) {
      return mobilePatterns[index % mobilePatterns.length];
    } else if (window.innerWidth < 1024) { // Tablet
      return tabletPatterns[index % tabletPatterns.length];
    } else {
      return desktopPatterns[index % desktopPatterns.length];
    }
  };

  // Fetch gallery data from backend
  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_BASE_URL = process.env.REACT_APP_API_URL;
        console.log("API BASE URL:", API_BASE_URL);

        const response = await fetch(`${API_BASE_URL}/api/gallery`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Backend response:", data);

        let imagesArray = [];

        if (Array.isArray(data)) {
          imagesArray = data;
        } else if (Array.isArray(data.images)) {
          imagesArray = data.images;
        } else if (Array.isArray(data.data)) {
          imagesArray = data.data;
        } else {
          throw new Error("No valid image array in response");
        }

        if (imagesArray.length === 0) {
          throw new Error("Gallery images array is empty");
        }

        const formattedImages = imagesArray.map((img, index) => {
          const layout = getLayoutClass(index);

          const imageUrl =
            img.image ||
            img.imageUrl ||
            img.url ||
            img.src ||
            img.photo ||
            `https://via.placeholder.com/600x800?text=Image+${index + 1}`;

          const location =
            img.location ||
            img.place ||
            img.city ||
            img.state ||
            img.country ||
            `Location ${index + 1}`;

          return {
            id: img._id || index + 1,
            url: imageUrl,
            title: `${location} की यात्रा`,
            english: location,
            description:
              img.description ||
              img.caption ||
              `Sacred moments from ${location}`,
            location,
            date:
              img.date ||
              new Date().toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            views: img.views || Math.floor(Math.random() * 8000),
            tags: img.tags || [location.split(",")[0], "spiritual", "journey"],
            heightClass: layout.height,
            colSpan: layout.colSpan,
          };
        });

        setGalleryImages(formattedImages);

        const stats = {};
        formattedImages.forEach((img) => {
          stats[img.id] = { views: img.views, viewed: false };
        });
        setImageStats(stats);

      } catch (err) {
        console.error("Gallery fetch failed:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryData();
  }, []);


  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Only add cursor effect on desktop
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Helper function to get current stats for an image
  const getImageStats = (imageId) => {
    const stats = imageStats[imageId] || { views: 0, viewed: false };
    return {
      views: stats.views + (stats.viewed ? 1 : 0),
      viewed: stats.viewed
    };
  };

  const displayedImages = galleryImages.slice(0, visibleCount);

  const openLightbox = (image) => {
    setSelectedImage(image);
    const index = galleryImages.findIndex(img => img.id === image.id);
    setCurrentSlide(index);
    document.body.style.overflow = 'hidden';
    
    // Mark as viewed
    if (!imageStats[image.id]?.viewed) {
      setImageStats(prev => ({
        ...prev,
        [image.id]: {
          ...prev[image.id],
          viewed: true
        }
      }));
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateSlide = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentSlide + 1) % galleryImages.length 
      : (currentSlide - 1 + galleryImages.length) % galleryImages.length;
    
    const newImage = galleryImages[newIndex];
    setCurrentSlide(newIndex);
    setSelectedImage(newImage);
    
    // Mark as viewed
    if (!imageStats[newImage.id]?.viewed) {
      setImageStats(prev => ({
        ...prev,
        [newImage.id]: {
          ...prev[newImage.id],
          viewed: true
        }
      }));
    }
  };

  const loadMore = () => {
    const increment = isMobile ? 4 : 8;
    setVisibleCount(prev => prev + increment);
  };

  const resetView = () => {
    setVisibleCount(isMobile ? 6 : 12);
  };

  const retryFetch = () => {
    window.location.reload();
  };

  // Calculate total stats for display
  const totalViews = galleryImages.reduce((sum, img) => {
    const stats = getImageStats(img.id);
    return sum + stats.views;
  }, 0);

  // Loading state
  if (loading) {
    return (
      <section className="min-h-screen py-12 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-transparent border-t-rose-400 border-r-purple-400 mx-auto mb-4 md:mb-6"
          />
          <h3 className="text-xl md:text-2xl text-white mb-2 md:mb-3">Loading Divine Moments...</h3>
          <p className="text-gray-400 text-sm md:text-base">Connecting to spiritual database</p>
          <div className="mt-4 md:mt-6 flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-200"></div>
          </div>
        </motion.div>
      </section>
    );
  }

  // Empty state
  if (!loading && galleryImages.length === 0) {
    return (
      <section className="min-h-screen py-12 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto mb-4">
            <Camera className="w-6 h-6 md:w-8 md:h-8 text-rose-400" />
          </div>
          <h3 className="text-lg md:text-xl text-white mb-2">No Images Found</h3>
          <p className="text-gray-400 text-sm md:text-base mb-4">Unable to load gallery images. Please check:</p>
          <ul className="text-gray-500 text-xs md:text-sm text-left mb-6">
            <li className="mb-1">• Backend server is running at {API_BASE_URL}</li>
            <li className="mb-1">• CORS is properly configured</li>
            <li>• API endpoint returns valid image data</li>
          </ul>
          <button 
            onClick={retryFetch}
            className="px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity text-sm md:text-base"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  // Main render
  return (
    <>
      <section id="gallery" className="min-h-screen py-12 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-4 md:left-10 w-48 md:w-96 h-48 md:h-96 bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-4 md:right-10 w-48 md:w-96 h-48 md:h-96 bg-rose-500/5 rounded-full blur-3xl" />
        </div>

        {!isMobile && (
          <motion.div
            className="fixed w-8 h-8 rounded-full border border-rose-400/30 pointer-events-none z-50 mix-blend-difference"
            style={{
              x: springX,
              y: springY,
            }}
          />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 md:gap-3 mb-4 md:mb-8 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-800"
            >
              <div className="w-4 md:w-8 h-px bg-gradient-to-r from-transparent to-gray-700" />
              <Camera className="w-4 h-4 md:w-5 md:h-5 text-rose-400" />
              <span className="text-xs md:text-sm text-gray-400 tracking-wider md:tracking-widest">VISUAL NARRATIVES</span>
              <div className="w-4 md:w-8 h-px bg-gradient-to-l from-transparent to-gray-700" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tight mb-4 md:mb-8"
            >
              <span className="text-white">Visual</span>
              <span className="block mt-2 md:mt-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400">
                  Chronicles
                </span>
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-6 md:mb-12 leading-relaxed px-4"
            >
              A collection of moments from spiritual journeys, where every photograph tells a story of 
              <span className="text-rose-300"> faith</span>, 
              <span className="text-purple-300"> culture</span>, and 
              <span className="text-amber-300"> timeless beauty</span>.
            </motion.p>

            {/* Mobile View Toggle */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mb-6"
              >
                <div className="inline-flex rounded-xl bg-gray-900/50 border border-gray-800 p-1">
                  <button
                    onClick={() => setGridView(true)}
                    className={`px-4 py-2 rounded-lg transition-all ${gridView ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setGridView(false)}
                    className={`px-4 py-2 rounded-lg transition-all ${!gridView ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-16 max-w-3xl mx-auto"
            >
              {[
                { 
                  value: galleryImages.length, 
                  label: "Photographs", 
                  sub: "Moments captured",
                  icon: <Camera className="w-4 h-4 md:w-5 md:h-5" />,
                  color: "from-amber-500 to-orange-500"
                },
                { 
                  value: totalViews.toLocaleString(), 
                  label: "Total Views", 
                  sub: "Memories shared",
                  icon: <Eye className="w-4 h-4 md:w-5 md:h-5" />,
                  color: "from-sky-500 to-cyan-500"
                },
                { 
                  value: [...new Set(galleryImages.map(img => img.location.split(',')[0]))].length, 
                  label: "Locations", 
                  sub: "Across India",
                  icon: <MapPin className="w-4 h-4 md:w-5 md:h-5" />,
                  color: "from-emerald-500 to-teal-500"
                },
                { 
                  value: "Spiritual", 
                  label: "Theme", 
                  sub: "Divine journeys",
                  icon: "🕉️",
                  color: "from-rose-500 to-pink-500"
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="group p-3 md:p-6 rounded-xl md:rounded-2xl bg-gray-900/30 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
                >
                  <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-2 md:mb-4`}>
                    <div className="text-white text-sm md:text-lg">{typeof stat.icon === 'string' ? stat.icon : stat.icon}</div>
                  </div>
                  <div className="text-lg md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm font-medium text-gray-300 mb-1">{stat.label}</div>
                  <div className="text-xs md:text-xs text-gray-500">{stat.sub}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Featured Image Section */}
            {galleryImages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-xl md:rounded-3xl overflow-hidden mb-8 md:mb-16 group cursor-pointer"
                onClick={() => openLightbox(galleryImages[0])}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ 
                    backgroundImage: `url(${galleryImages[0].url})`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                  <div className="max-w-4xl">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                      <div className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs md:text-sm font-medium">
                        Featured
                      </div>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">{galleryImages[0].english}</h3>
                    <div className="font-devanagari text-sm sm:text-base md:text-xl text-gray-300 mb-2 md:mb-4">{galleryImages[0].title}</div>
                    
                    <div className="flex flex-wrap items-center gap-2 md:gap-6 text-gray-300 text-xs md:text-base">
                      <span className="flex items-center gap-1 md:gap-2">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4" /> 
                        <span className="truncate max-w-[100px] md:max-w-none">{galleryImages[0].location}</span>
                      </span>
                      <span className="hidden sm:flex items-center gap-1 md:gap-2">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4" /> {galleryImages[0].date}
                      </span>
                      <span className="flex items-center gap-1 md:gap-2">
                        <Eye className="w-3 h-3 md:w-4 md:h-4 text-gray-400" /> 
                        {getImageStats(galleryImages[0].id).views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                  <div className="flex gap-1 md:gap-2">
                    {galleryImages[0].tags.slice(0, isMobile ? 2 : 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white text-xs font-devanagari">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 p-2 md:p-3 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                  <Eye className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Masonry Grid */}
          <div className={`mb-8 md:mb-12 ${
            isMobile && !gridView 
              ? "flex flex-col gap-4" 
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          }`}>
            <AnimatePresence>
              {displayedImages.slice(1).map((image, index) => {
                const stats = getImageStats(image.id);
                const heightClass = image.heightClass || "h-56 md:h-80";
                const colSpan = image.colSpan || "col-span-1";
                
                // Mobile list view
                if (isMobile && !gridView) {
                  return (
                    <motion.div
                      key={image.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative rounded-xl overflow-hidden cursor-pointer bg-gray-900/30 border border-gray-800"
                      onClick={() => openLightbox(image)}
                    >
                      <div className="flex items-center p-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                          <img 
                            src={image.url} 
                            alt={image.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-sm mb-1 font-devanagari line-clamp-1">
                            {image.title}
                          </h3>
                          <p className="text-gray-400 text-xs mb-2 line-clamp-2">
                            {image.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-400 text-xs">
                                {image.location.split(',')[0]}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-400 text-xs">
                                {stats.views > 999 ? `${(stats.views / 1000).toFixed(1)}k` : stats.views}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                }
                
                // Grid view
                return (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className={`group relative rounded-xl md:rounded-2xl overflow-hidden cursor-pointer ${colSpan}`}
                    onClick={() => openLightbox(image)}
                  >
                    <div className={`relative w-full ${heightClass} overflow-hidden`}>
                      {/* Image */}
                      <img 
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Info overlay */}
                      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="backdrop-blur-sm bg-black/30 p-3 md:p-4 rounded-lg md:rounded-xl">
                          <h3 className="text-white font-semibold text-sm md:text-lg mb-1 md:mb-2 font-devanagari line-clamp-2">
                            {image.title}
                          </h3>
                          <p className="text-gray-300 text-xs md:text-sm mb-2 md:mb-4 line-clamp-2">
                            {image.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-2 md:mb-4">
                            <div className="flex items-center gap-1 md:gap-2">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-400 text-xs truncate max-w-[80px] md:max-w-[100px]">
                                {image.location.split(',')[0]}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-400 text-xs">
                                {stats.views > 999 ? `${(stats.views / 1000).toFixed(1)}k` : stats.views}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {image.tags.slice(0, 2).map((tag, idx) => (
                              <span key={idx} className="px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-white text-xs font-devanagari truncate">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Viewed indicator */}
                      {stats.viewed && (
                        <div className="absolute top-2 right-2 md:top-4 md:right-4">
                          <div className="px-2 py-1 rounded-full text-xs bg-emerald-500/20 backdrop-blur-sm text-emerald-300 border border-emerald-500/30">
                            <Eye className="w-2 h-2 inline mr-1" />
                            Viewed
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* START OF UPDATED SECTION: Dual Button Controls */}
          {galleryImages.length > (isMobile ? 6 : 12) && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-4 mt-8 md:mt-12"
            >
              {/* Button Controls */}
              <div className="flex flex-wrap justify-center gap-3">
                
                {/* Show Less Button: Only visible when more than initial images are shown */}
                {visibleCount > (isMobile ? 6 : 12) && (
                  <button
                    onClick={resetView}
                    className="group px-5 py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 border border-gray-700 hover:border-gray-600 text-white font-medium transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Show Less</span>
                  </button>
                )}
                
                {/* Show More Button: Only visible when there are still images to load */}
                {visibleCount < galleryImages.length && (
                  <button
                    onClick={loadMore}
                    className="group px-5 py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl bg-gradient-to-r from-rose-800/30 to-pink-800/30 hover:from-rose-700/40 hover:to-pink-700/40 border border-rose-700/30 hover:border-rose-600/40 text-white font-medium transition-all duration-300 flex items-center gap-2 text-sm md:text-base"
                  >
                    <span>Show More</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
                
              </div>
              
              {/* Image Counter Display */}
              <div className="text-gray-500 text-xs md:text-sm text-center">
                Showing {Math.min(visibleCount, galleryImages.length)} of {galleryImages.length} images
                {visibleCount < galleryImages.length && (
                  <span className="text-rose-400 ml-2">
                    • {galleryImages.length - visibleCount} more available
                  </span>
                )}
              </div>
              
            </motion.div>
          )}
          {/* END OF UPDATED SECTION */}

          {/* Error State Display */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-8 md:mt-12"
            >
              <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 px-4 py-3 md:px-6 md:py-4 rounded-lg md:rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm">
                <WifiOff className="w-5 h-5 text-amber-400 flex-shrink-0" />
                <div className="text-center sm:text-left">
                  <p className="text-amber-300 text-sm font-medium">Note</p>
                  <p className="text-gray-400 text-xs">
                    Showing sample images. {error}
                  </p>
                </div>
                <button
                  onClick={retryFetch}
                  className="mt-2 sm:mt-0 sm:ml-4 px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs md:text-sm transition-colors"
                >
                  Retry Connection
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (() => {
          const stats = getImageStats(selectedImage.id);
          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-lg"
              onClick={closeLightbox}
            >
              <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
                <motion.img
                  key={selectedImage.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[50vh] md:max-h-[60vh] lg:max-h-[70vh] xl:max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                
                <motion.div 
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black via-black/95 to-transparent"
                >
                  <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
                      <div className="lg:col-span-2">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">{selectedImage.english}</h2>
                        <div className="font-devanagari text-base sm:text-lg md:text-xl text-gray-300 mb-2 md:mb-4">{selectedImage.title}</div>
                        <p className="text-gray-400 text-sm md:text-lg mb-3 md:mb-6 line-clamp-2 md:line-clamp-3">{selectedImage.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6">
                          <div className="flex items-center gap-1 md:gap-2">
                            <MapPin className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                            <span className="text-gray-300 text-sm md:text-base truncate max-w-[100px] md:max-w-none">
                              {selectedImage.location}
                            </span>
                          </div>
                          <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
                          <div className="flex items-center gap-1 md:gap-2">
                            <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                            <span className="text-gray-300 text-sm md:text-base">{selectedImage.date}</span>
                          </div>
                          <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
                          <div className="flex items-center gap-1 md:gap-2">
                            <Eye className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                            <span className="text-gray-300 text-sm md:text-base">{stats.views.toLocaleString()} views</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 md:gap-2">
                          {selectedImage.tags.slice(0, isMobile ? 3 : selectedImage.tags.length).map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-gray-800 text-gray-300 text-xs md:text-sm border border-gray-700 truncate">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="hidden lg:block space-y-6">
                        <div className="p-4 md:p-6 rounded-xl bg-gray-900/50 border border-gray-800">
                          <h4 className="text-sm font-medium text-gray-400 mb-4">PHOTO DETAILS</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Views</span>
                              <div className="flex items-center gap-2">
                                <Eye className="w-5 h-5 text-gray-400" />
                                <span className="text-white">
                                  {stats.views.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Location</span>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                <span className="text-white">
                                  {selectedImage.location}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">Date</span>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-gray-400" />
                                <span className="text-white">
                                  {selectedImage.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateSlide('prev');
                  }}
                  className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 p-2 md:p-4 rounded-lg md:rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group"
                >
                  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateSlide('next');
                  }}
                  className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 p-2 md:p-4 rounded-lg md:rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group"
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
                </button>

                <button
                  onClick={closeLightbox}
                  className="absolute top-2 right-2 md:top-6 md:right-6 p-2 md:p-3 rounded-lg md:rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                >
                  <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </button>

                <div className="absolute top-2 md:top-6 left-1/2 transform -translate-x-1/2">
                  <div className="px-3 py-1 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-black/50 backdrop-blur-sm border border-white/10">
                    <span className="text-white text-xs md:text-sm">
                      {currentSlide + 1} / {galleryImages.length}
                    </span>
                  </div>
                </div>

                {!isMobile && (
                  <div className="absolute top-6 right-24 flex gap-2">
                    <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors">
                      <Download className="w-5 h-5 text-white" />
                    </button>
                    <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors">
                      <Share2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                )}

                {/* Mobile bottom actions */}
                {isMobile && (
                  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-4">
                    <button className="p-3 rounded-xl bg-white/10 backdrop-blur-sm transition-colors">
                      <Download className="w-5 h-5 text-white" />
                    </button>
                    <button className="p-3 rounded-xl bg-white/10 backdrop-blur-sm transition-colors">
                      <Share2 className="w-5 h-5 text-white" />
                    </button>
                  </div>
                )}
              </div>

              <div className="absolute bottom-2 md:bottom-6 left-1/2 transform -translate-x-1/2 text-gray-500 text-xs md:text-sm text-center px-4">
                Click anywhere to close • {!isMobile && "Use arrow keys to navigate"}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </>
  );
}

export default GallerySection;