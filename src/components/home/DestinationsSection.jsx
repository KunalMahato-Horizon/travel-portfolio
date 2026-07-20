import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  MapPin, 
  Navigation, Thermometer, 
  Clock, Sunrise, Compass, BookOpen,
  Feather, Quote, Eye,
  Camera, Activity, Award
} from "lucide-react";
import { motion, AnimatePresence, useScroll } from "framer-motion";

// ✅ Optimized Cloudinary function with better sizing
const optimizeCloudinary = (url, isMobile) => {
  if (!url || !url.includes("/upload/")) return url;
  const width = isMobile ? 600 : 1200; // Reduced from 1600px to 1200px
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
};

// ✅ Memoized metadata
const PLACE_META = {
  somnath: {
    hindi: "सोमनाथ",
    state: "Gujarat",
    description: "Where the Arabian Sea meets faith at the first Jyotirlinga, Somnath Temple stands as a testament to eternal devotion.",
    icon: "🛕",
    type: "Jyotirlinga",
    temperature: "32°C",
    season: "Monsoon",
    journeyTime: "2 hours",
    bestTime: "Oct-Feb",
    idealDuration: "2-3 days",
    poet: "Kabir",
    verse: "The sea chants the name of the eternal, wave after wave",
    significance: "First Jyotirlinga",
    energy: "🌊",
    rating: "⭐⭐⭐⭐⭐"
  },
  ujjain: {
    hindi: "उज्जैन",
    state: "Madhya Pradesh",
    description: "Witness the divine Bhasma Aarti at Mahakaleshwar, where ancient traditions meet spiritual awakening.",
    icon: "🔥",
    type: "Jyotirlinga",
    temperature: "28°C",
    season: "Spring",
    journeyTime: "3 hours",
    bestTime: "Nov-Mar",
    idealDuration: "1-2 days",
    poet: "Mirabai",
    verse: "In the flames of devotion, the self dissolves into light",
    significance: "Mahakaleshwar Jyotirlinga",
    energy: "🔥",
    rating: "⭐⭐⭐⭐⭐"
  },
  varanasi: {
    hindi: "काशी",
    state: "Uttar Pradesh",
    description: "The eternal city where life meets the sacred Ganges, and ancient ghats echo with timeless prayers.",
    icon: "🌅",
    type: "Spiritual Capital",
    temperature: "26°C",
    season: "Autumn",
    journeyTime: "4 hours",
    bestTime: "Oct-Mar",
    idealDuration: "3-4 days",
    poet: "Tulsidas",
    verse: "The Ganga flows through time, carrying prayers of countless souls",
    significance: "Moksha City",
    energy: "🌊",
    rating: "⭐⭐⭐⭐⭐"
  },
  ayodhya: {
    hindi: "अयोध्या",
    state: "Uttar Pradesh",
    description: "Birthplace of Lord Rama, where devotion finds its home and the Sarayu River flows with divine heritage.",
    icon: "🏠",
    type: "Sacred City",
    temperature: "34°C",
    season: "Summer",
    journeyTime: "2.5 hours",
    bestTime: "Oct-Mar",
    idealDuration: "1-2 days",
    poet: "Tulsidas",
    verse: "Where dharma walked the earth, every stone holds a story",
    significance: "Rama Janmabhoomi",
    energy: "✨",
    rating: "⭐⭐⭐⭐⭐"
  },
  vrindavan: {
    hindi: "वृन्दावन",
    state: "Uttar Pradesh",
    description: "Land of eternal love between Radha and Krishna, where every corner echoes with divine melodies.",
    icon: "💖",
    type: "Devotional Hub",
    temperature: "36°C",
    season: "Summer",
    journeyTime: "3 hours",
    bestTime: "Oct-Mar",
    idealDuration: "2-3 days",
    poet: "Mirabai",
    verse: "Love manifests in every leaf, every whisper of the breeze",
    significance: "Krishna's Playground",
    energy: "💕",
    rating: "⭐⭐⭐⭐⭐"
  },
  darjeeling: {
    hindi: "दार्जिलिंग",
    state: "West Bengal",
    description: "Where the Himalayas kiss the sky above tea gardens, and ancient monasteries blend with colonial charm.",
    icon: "⛰️",
    type: "Mountain Retreat",
    temperature: "16°C",
    season: "Spring",
    journeyTime: "5 hours",
    bestTime: "Mar-May",
    idealDuration: "3-4 days",
    poet: "Tagore",
    verse: "The mountains hold silence, and silence holds the divine",
    significance: "Himalayan Sanctuary",
    energy: "🌄",
    rating: "⭐⭐⭐⭐"
  },
  mumbai: {
    hindi: "मुंबई",
    state: "Maharashtra",
    description: "Spiritual temples merged with the vibrant energy of the coastal metropolis.",
    icon: "🌊",
    type: "Coastal City",
    temperature: "29°C",
    season: "Winter",
    journeyTime: "—",
    bestTime: "Nov-Feb",
    idealDuration: "2-3 days",
    poet: "Kabir",
    verse: "In the heart of the city, the divine beats like a hidden pulse",
    significance: "Metropolitan Spirituality",
    energy: "🌆",
    rating: "⭐⭐⭐⭐"
  },
  adiyogi: {
    hindi: "आदि योगी",
    state: "Tamil Nadu",
    description: "The iconic Adiyogi monument standing as a beacon of yogic energy and inner transformation.",
    icon: "🧘",
    type: "Spiritual Monument",
    temperature: "27°C",
    season: "Winter",
    journeyTime: "—",
    bestTime: "Oct-Mar",
    idealDuration: "1-2 days",
    poet: "Rumi",
    verse: "Silence is the language of the eternal, spoken by the yogi",
    significance: "Yogic Enlightenment",
    energy: "🌀",
    rating: "⭐⭐⭐⭐⭐"
  }
};

function DestinationsSection() {
  const [destinations, setDestinations] = useState([]);
  const [activeDestination, setActiveDestination] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  const containerRef = useRef(null);
  // Removed: const { scrollYProgress } = useScroll();
  // Using useScroll without destructuring since we only need the ref
  useScroll();

  // ✅ Mobile check with cleanup
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ✅ Auto-play with proper cleanup
  useEffect(() => {
    if (!isAutoPlay || destinations.length === 0) return;
    const interval = setInterval(() => {
      setActiveDestination(prev => (prev + 1) % destinations.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlay, destinations.length]);

  // ✅ Fetch destinations with AbortController and proper dependencies
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);
        
        const response = await fetch(`${API_URL}/api/destinations`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        let destArray = [];
        if (Array.isArray(data)) destArray = data;
        else if (Array.isArray(data.destinations)) destArray = data.destinations;
        else throw new Error("Invalid destination data format");

        if (destArray.length === 0) throw new Error("No destinations found");

        const transformedDestinations = destArray.map((dest, index) => {
          const lookupKey = (dest.slug || dest.name || "").toLowerCase();
          const meta = PLACE_META[lookupKey] || {};
          const rawImage = dest.image || `https://source.unsplash.com/random/1200x800?temple,india,${index}`;

          return {
            id: index,
            name: dest.name || "Unknown Location",
            slug: lookupKey,
            rawImage: rawImage,
            photos: dest.photos || Math.floor(Math.random() * 50) + 20,
            date: dest.date || meta.date || "Timeless",
            hindi: meta.hindi || dest.name,
            state: meta.state || dest.state || "India",
            description: dest.description || meta.description || "A sacred destination of spiritual significance.",
            icon: meta.icon || "🛕",
            type: meta.type || "Sacred Site",
            temperature: meta.temperature || "25°C",
            season: meta.season || "All seasons",
            journeyTime: meta.journeyTime || "—",
            bestTime: meta.bestTime || "Oct–Mar",
            idealDuration: meta.idealDuration || "2–3 days",
            elevation: dest.elevation || meta.elevation || "—",
            poet: meta.poet || "Anonymous",
            verse: meta.verse || "In silence, the sacred speaks",
            significance: meta.significance || "Sacred Site",
            energy: meta.energy || "✨",
            rating: meta.rating || "⭐⭐⭐⭐"
          };
        });

        setDestinations(transformedDestinations);
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // ✅ Memoized stats
  const totalStats = useMemo(() => {
    if (!destinations.length) return null;
    return {
      sites: destinations.length,
      photos: destinations.reduce((sum, dest) => sum + dest.photos, 0),
      days: destinations.reduce((sum, dest) => sum + parseInt(dest.idealDuration || "2"), 0),
      span: "Pan-India"
    };
  }, [destinations]);

  // ✅ Memoized selected and index items
  const selected = useMemo(() => destinations[activeDestination], [destinations, activeDestination]);
  const indexItems = useMemo(() => destinations.filter((_, idx) => idx !== activeDestination), [destinations, activeDestination]);

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
            Opening Sacred Chronicles
          </p>
        </motion.div>
      </section>
    );
  }

  // ✅ Error state
  if (error || !destinations.length) {
    return (
      <section className="min-h-screen bg-black flex items-center justify-center py-20">
        <div className="text-center">
          <Compass className="w-8 h-8 text-white/10 mx-auto mb-4" />
          <p className="text-white/30 font-mono text-xs uppercase tracking-widest mb-6">
            Chronicles Unavailable
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 border border-white/10 bg-white/5 text-white/50 hover:text-white rounded-md text-[10px] tracking-widest font-mono transition-all"
          >
            Re-open Archive
          </button>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={containerRef}
      id="sthan" 
      className="min-h-screen bg-black text-white py-24 select-none border-t border-white/5 relative overflow-hidden"
    >
      
      {/* ✅ Reduced background ambience for performance */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl animate-pulse-slower" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-3xl animate-pulse-slowest" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-gradient-to-b from-amber-400/50 to-amber-400/0 animate-pulse" />
            <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">
              04 // Sacred Chronicles
            </span>
            <div className="w-12 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
            <span className="text-white/40 font-mono text-[10px] tracking-widest uppercase hidden md:block">
              Spiritual Travelogue
            </span>
            {/* Auto-play indicator */}
            <button 
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="ml-auto text-white/20 hover:text-white/40 transition-colors text-[8px] font-mono tracking-widest uppercase flex items-center gap-1.5"
            >
              <div className={`w-1.5 h-1.5 rounded-full ${isAutoPlay ? 'bg-emerald-400 animate-pulse' : 'bg-white/20'}`} />
              {isAutoPlay ? 'Auto' : 'Paused'}
            </button>
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-none">
            <span className="block">Pilgrim</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-purple-400 to-amber-400 bg-[length:200%] animate-gradient mt-1">
              Chronicles
            </span>
          </h2>
          
          <div className="flex items-center gap-4">
            <p className="text-white/20 text-sm max-w-xl font-light mt-2">
              Each destination holds a verse, a prayer, a moment of transcendence
            </p>
            <div className="hidden md:flex items-center gap-2 text-white/10 text-[10px] font-mono">
              <span>0{activeDestination + 1}</span>
              <span className="w-px h-3 bg-white/10" />
              <span>0{destinations.length}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-12 mb-12 border-b border-white/5">
          {[
            { label: "Sacred Sites", value: `0${totalStats.sites}`, icon: <Compass className="w-3 h-3" />, color: "amber" },
            { label: "Visual Records", value: `${totalStats.photos}+`, icon: <Camera className="w-3 h-3" />, color: "purple" },
            { label: "Timeline", value: `${totalStats.days} Days`, icon: <Clock className="w-3 h-3" />, color: "blue" },
            { label: "Poets", value: "5+", icon: <Feather className="w-3 h-3" />, color: "rose" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -2 }}
              className="space-y-1 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              <div className={`flex items-center gap-1.5 text-${stat.color}-400/40 font-mono text-[9px] uppercase tracking-widest`}>
                {stat.icon}
                {stat.label}
              </div>
              <div className="text-2xl md:text-3xl font-light tracking-tight text-white/80">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          
          {/* Left - Featured Destination */}
          <div className="col-span-1 lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected?.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full min-h-[60vh] lg:min-h-[75vh] group"
              >
                {/* ✅ Optimized background image */}
                <motion.div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${optimizeCloudinary(selected?.rawImage, isMobile)})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

                {/* Energy Badge */}
                <div className="absolute top-6 right-6 text-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                  {selected?.energy}
                </div>

                {/* Devanagari Watermark */}
                <div className="absolute top-8 right-14 text-white/[0.03] text-8xl md:text-9xl font-devanagari pointer-events-none select-none">
                  {selected?.hindi}
                </div>

                {/* Content */}
                <div className="relative z-10 p-6 md:p-10 flex flex-col justify-end h-full">
                  <div className="space-y-6 max-w-xl">
                    
                    {/* Badge */}
                    <div className="flex items-center gap-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-md font-mono text-[9px] text-white/60 tracking-widest uppercase">
                        <span>{selected?.icon}</span>
                        <span>{selected?.type}</span>
                      </div>
                      <div className="text-white/20 text-[10px] font-light flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {selected?.significance}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white flex items-baseline gap-3">
                        {selected?.name}
                        <span className="font-devanagari text-2xl text-white/30 hidden sm:inline">{selected?.hindi}</span>
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-white/20 text-xs">{selected?.rating}</span>
                        <span className="text-white/10 text-[8px] tracking-widest uppercase">Sacred Site</span>
                      </div>
                    </div>

                    {/* Verse */}
                    <motion.div 
                      whileHover={{ scale: 1.01 }}
                      className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-amber-400/20 transition-all duration-300"
                    >
                      <div className="flex items-start gap-2">
                        <Quote className="w-4 h-4 text-amber-400/50 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white/60 text-sm italic leading-relaxed">
                            "{selected?.verse}"
                          </p>
                          <p className="text-white/20 text-[10px] mt-1 flex items-center gap-2">
                            <span className="font-devanagari">— {selected?.poet}</span>
                            <span className="w-px h-3 bg-white/10" />
                            <span className="text-[8px] tracking-widest uppercase">Sacred Verse</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <p className="text-sm md:text-base text-white/50 font-light leading-relaxed">
                      {selected?.description}
                    </p>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-5 gap-x-4 pt-6 border-t border-white/10">
                      {[
                        { icon: <MapPin className="w-3 h-3" />, label: "State", value: selected?.state },
                        { icon: <Clock className="w-3 h-3" />, label: "Duration", value: selected?.idealDuration },
                        { icon: <Sunrise className="w-3 h-3" />, label: "Best Time", value: selected?.bestTime },
                        { icon: <Thermometer className="w-3 h-3" />, label: "Climate", value: selected?.temperature },
                        { icon: <Navigation className="w-3 h-3" />, label: "Transit", value: selected?.journeyTime },
                        { icon: <Camera className="w-3 h-3" />, label: "Records", value: `${selected?.photos} Photos` },
                      ].map((spec, idx) => (
                        <motion.div 
                          key={idx}
                          whileHover={{ x: 2 }}
                          className="space-y-1"
                        >
                          <div className="flex items-center gap-1.5 text-white/20 font-mono text-[9px] uppercase tracking-widest">
                            {spec.icon}
                            {spec.label}
                          </div>
                          <div className="text-xs text-white/70 font-light">{spec.value}</div>
                        </motion.div>
                      ))}
                    </div>

                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right - Index */}
          <div className="col-span-1 lg:col-span-5">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest flex items-center gap-2">
                <BookOpen className="w-3 h-3" />
                Chronicle Index
              </span>
              <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
                {indexItems.length} Entries
              </span>
            </div>
            
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none snap-x snap-mandatory">
              {indexItems.map((item) => {
                const originalIndex = destinations.findIndex(d => d.id === item.id);
                const isHovered = hoveredIndex === originalIndex;
                
                return (
                  <motion.div
                    key={item.id}
                    onClick={() => setActiveDestination(originalIndex)}
                    onMouseEnter={() => setHoveredIndex(originalIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    whileHover={{ scale: 1.02 }}
                    className={`min-w-[260px] sm:min-w-[300px] lg:min-w-0 lg:w-full snap-center rounded-xl p-3 flex items-center gap-4 cursor-pointer group transition-all duration-300 ${
                      isHovered 
                        ? 'bg-white/[0.06] border-white/20' 
                        : 'bg-white/[0.01] hover:bg-white/[0.03] border-white/5 hover:border-white/15'
                    } border`}
                  >
                    {/* Thumbnail with Energy Badge - ✅ Optimized */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-neutral-900 border border-white/10 flex-shrink-0">
                      <div 
                        className="absolute inset-0 bg-cover bg-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100"
                        style={{ backgroundImage: `url(${optimizeCloudinary(item.rawImage, true)})` }}
                      />
                      <div className="absolute bottom-0.5 right-0.5 text-xs opacity-30 group-hover:opacity-70 transition-opacity">
                        {item.energy}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-light tracking-wide truncate group-hover:text-white transition-colors text-sm sm:text-base">
                          {item.name}
                        </span>
                        <span className="font-devanagari text-white/20 text-xs sm:text-sm">{item.hindi}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs text-white/30 truncate font-light">
                          {item.state}
                        </span>
                        <span className="w-px h-2 bg-white/10" />
                        <span className="text-white/10 text-[8px] font-mono tracking-widest">
                          {item.type}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-1 font-mono text-[9px] text-white/20 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>{item.idealDuration}</span>
                        <span className="w-px h-2 bg-white/10" />
                        <span className="flex items-center gap-1">
                          <Eye className="w-2.5 h-2.5" />
                          View Chronicle
                        </span>
                      </div>
                    </div>

                    {/* Poet Tag - Vertical */}
                    <div className="hidden sm:flex flex-col items-center text-white/10 text-[7px] font-devanagari tracking-wider">
                      <span>{item.poet}</span>
                      <div className="w-px h-4 bg-white/5 mt-1" />
                    </div>

                    {/* Active Indicator */}
                    {isHovered && (
                      <motion.div
                        layoutId="hoverIndicator"
                        className="absolute -left-px top-1/2 -translate-y-1/2 w-0.5 h-8 bg-gradient-to-b from-amber-400/50 to-purple-400/50 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-white/20 tracking-widest uppercase">
          <div className="flex items-center gap-3">
            <Feather className="w-3 h-3" />
            <span>Sacred Chronicles v2</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="text-[8px] text-white/10">Interactive Edition</span>
          </div>
          
          <div className="font-devanagari text-xs tracking-normal opacity-40 text-white/30 flex items-center gap-2">
            <span>यात्रा एक प्रार्थना है</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="text-[8px] font-mono text-white/10">Every journey is a prayer</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span>{destinations.length} Destinations</span>
            <span className="w-px h-3 bg-white/10" />
            <span>{totalStats?.photos}+ Visuals</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1">
              <Activity className="w-2.5 h-2.5" />
              Live
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default DestinationsSection;