import React, { useState, useEffect } from "react";
import Container from "../layout/Container";
import { 
  MapPin, Calendar, ChevronRight, 
  Mountain, Sparkles, Navigation, 
  Compass, ArrowRight, Camera, 
  Globe, Eye, Wind, Thermometer, 
  Clock, Sunrise, Moon,
  ChevronLeft, ChevronDown
} from "lucide-react";
import { motion } from "framer-motion";


// Optimize Cloudinary image URL
const optimizeCloudinary = (url, isMobile) => {
  if (!url || !url.includes("/upload/")) return url;

  const width = isMobile ? 600 : 1200;

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width}/`
  );
};


/* Local metadata layer (Layer-1 system) - Enhanced with all UI properties */
const PLACE_META = {
  somnath: {
    hindi: "सोमनाथ",
    state: "Gujarat",
    description: "Where the Arabian Sea meets faith at the first Jyotirlinga, Somnath Temple stands as a testament to eternal devotion and resilience through centuries.",
    date: "August 2024",
    icon: "🛕",
    color: "from-amber-500 to-orange-500",
    gradientColor: "#f59e0b",
    type: "Jyotirlinga",
    highlights: ["Coastal Temple", "Ancient Architecture", "Sunrise Rituals", "Sea View"],
    stats: { duration: "3 days", photos: 48, elevation: "Sea Level" },
    temperature: "32°C",
    season: "Monsoon",
    journeyTime: "2 hours",
    spiritualSignificance: "First Jyotirlinga",
    bestTime: "Oct-Feb",
    idealDuration: "2-3 days"
  },
  ujjain: {
    hindi: "उज्जैन",
    state: "Madhya Pradesh",
    description: "Witness the divine Bhasma Aarti at Mahakaleshwar, one of the 12 Jyotirlingas, where ancient traditions meet spiritual awakening.",
    date: "March 2024",
    icon: "🔥",
    color: "from-violet-500 to-purple-500",
    gradientColor: "#8b5cf6",
    type: "Jyotirlinga",
    highlights: ["Bhasma Aarti", "Ancient City", "Kumbh Site", "Sacred River"],
    stats: { duration: "2 days", photos: 36, elevation: "478m" },
    temperature: "28°C",
    season: "Spring",
    journeyTime: "3 hours",
    spiritualSignificance: "Mahakaleshwar Jyotirlinga",
    bestTime: "Nov-Mar",
    idealDuration: "1-2 days"
  },
  varanasi: {
    hindi: "काशी",
    state: "Uttar Pradesh",
    description: "The eternal city where life meets the sacred Ganges, and ancient ghats echo with prayers that have resonated for millennia.",
    date: "October 2024",
    icon: "🌅",
    color: "from-sky-500 to-blue-500",
    gradientColor: "#0ea5e9",
    type: "Spiritual Capital",
    highlights: ["Ganga Aarti", "Ancient Ghats", "Temple City", "Spiritual Hub"],
    stats: { duration: "4 days", photos: 72, elevation: "81m" },
    temperature: "26°C",
    season: "Autumn",
    journeyTime: "4 hours",
    spiritualSignificance: "Moksha City",
    bestTime: "Oct-Mar",
    idealDuration: "3-4 days"
  },
  ayodhya: {
    hindi: "अयोध्या",
    state: "Uttar Pradesh",
    description: "Birthplace of Lord Rama, where devotion finds its home and the Sarayu River flows with stories of divine heritage.",
    date: "April 2025",
    icon: "🏠",
    color: "from-emerald-500 to-teal-500",
    gradientColor: "#10b981",
    type: "Sacred City",
    highlights: ["Ram Temple", "Sarayu River", "Devotional", "Historical"],
    stats: { duration: "2 days", photos: 42, elevation: "93m" },
    temperature: "34°C",
    season: "Summer",
    journeyTime: "2.5 hours",
    spiritualSignificance: "Rama Janmabhoomi",
    bestTime: "Oct-Mar",
    idealDuration: "1-2 days"
  },
  vrindavan: {
    hindi: "वृन्दावन",
    state: "Uttar Pradesh",
    description: "Land of eternal love between Radha and Krishna, where every corner echoes with divine flute melodies and devotional songs.",
    date: "May 2025",
    icon: "💖",
    color: "from-rose-500 to-pink-500",
    gradientColor: "#ec4899",
    type: "Devotional Hub",
    highlights: ["Temples", "Spiritual Heritage", "Culture", "Devotion"],
    stats: { duration: "2 days", photos: 38, elevation: "170m" },
    temperature: "36°C",
    season: "Summer",
    journeyTime: "3 hours",
    spiritualSignificance: "Krishna's Playground",
    bestTime: "Oct-Mar",
    idealDuration: "2-3 days"
  },
  darjeeling: {
    hindi: "दार्जिलिंग",
    state: "West Bengal",
    description: "Where the Himalayas kiss the sky above tea gardens, and ancient monasteries blend with colonial charm in misty mountains.",
    date: "April 2024",
    icon: "⛰️",
    color: "from-green-500 to-emerald-500",
    gradientColor: "#10b981",
    type: "Mountain Retreat",
    highlights: ["Kanchenjunga", "Tea Gardens", "Toy Train", "Monasteries"],
    stats: { duration: "3 days", photos: 56, elevation: "2,042m" },
    temperature: "16°C",
    season: "Spring",
    journeyTime: "5 hours",
    spiritualSignificance: "Himalayan Spirituality",
    bestTime: "Mar-May, Sep-Nov",
    idealDuration: "3-4 days"
  },
  mumbai: {
    hindi: "मुंबई",
    state: "Maharashtra",
    description: "Spiritual temples mixed with the energy of the city.",
    date: "December 2024",
    icon: "🌊",
    color: "from-orange-500 to-pink-500",
    gradientColor: "#f97316",
    type: "Coastal City",
    highlights: ["Temples", "Sea", "City Energy", "Gateway of India"],
    stats: { duration: "3 days", photos: 45, elevation: "14m" },
    temperature: "29°C",
    season: "Winter",
    journeyTime: "—",
    spiritualSignificance: "Metropolitan Spirituality",
    bestTime: "Nov-Feb",
    idealDuration: "2-3 days"
  },
  adiyogi: {
    hindi: "आदि योगी",
    state: "Tamil Nadu",
    description: "The iconic Adiyogi statue and yogic energy.",
    date: "January 2025",
    icon: "🧘",
    color: "from-indigo-500 to-purple-500",
    gradientColor: "#6366f1",
    type: "Spiritual Monument",
    highlights: ["Adiyogi Statue", "Meditation", "Isha Center", "Yoga"],
    stats: { duration: "2 days", photos: 32, elevation: "300m" },
    temperature: "27°C",
    season: "Winter",
    journeyTime: "—",
    spiritualSignificance: "Yogic Enlightenment",
    bestTime: "Oct-Mar",
    idealDuration: "1-2 days"
  }
};

function DestinationsSection() {
  const [destinations, setDestinations] = useState([]);
  const [activeDestination, setActiveDestination] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSelector, setShowMobileSelector] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setShowMobileSelector(false);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);

  // Fallback data in case backend fails
  const fallbackDestinations = [
    {
      id: 0,
      name: "Somnath",
      slug: "somnath",
      image: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      photos: 48,
      ...PLACE_META.somnath
    },
    {
      id: 1,
      name: "Ujjain",
      slug: "ujjain",
      image: "https://images.unsplash.com/photo-1593693399065-7e3d06a4d8a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      photos: 36,
      ...PLACE_META.ujjain
    },
    {
      id: 2,
      name: "Varanasi",
      slug: "varanasi",
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      photos: 72,
      ...PLACE_META.varanasi
    },
    {
      id: 3,
      name: "Ayodhya",
      slug: "ayodhya",
      image: "https://images.unsplash.com/photo-1605954554017-8b65d8a75b5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      photos: 42,
      ...PLACE_META.ayodhya
    },
    {
      id: 4,
      name: "Vrindavan",
      slug: "vrindavan",
      image: "https://images.unsplash.com/photo-1567008447236-2e0f3a6e2539?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      photos: 38,
      ...PLACE_META.vrindavan
    },
    {
      id: 5,
      name: "Darjeeling",
      slug: "darjeeling",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      photos: 56,
      ...PLACE_META.darjeeling
    }
  ];

    // Fetch destination data from backend
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/destinations`
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        const transformedDestinations =
data.destinations?.map((dest, index) => {
  const meta =
    PLACE_META[dest.slug] ||
    PLACE_META[dest.name?.toLowerCase()] ||
    {};

  // ✅ Declare variables FIRST
  const rawImage =
    dest.image ||
    `https://source.unsplash.com/random/800x600?temple${index}`;

  const optimizedImage = optimizeCloudinary(rawImage, isMobile);

  // ✅ Then return object
  return {
    id: index,
    name: dest.name || "Unknown",
    slug: dest.slug || dest.name?.toLowerCase(),

    image: optimizedImage, // ✅ use optimized image

    photos: dest.photos || Math.floor(Math.random() * 50) + 20,

    ...meta,

    stats: {
      duration: meta.idealDuration || "2 days",
      photos: dest.photos || Math.floor(Math.random() * 50) + 20,
      elevation: meta.stats?.elevation || "—",
    },

    date: meta.date || "2024",
    journeyTime: meta.journeyTime || "—",
    temperature: meta.temperature || "25°C",
    season: meta.season || "All seasons",
    bestTime: meta.bestTime || "Oct–Mar",
    idealDuration: meta.idealDuration || "2–3 days",

    spiritualSignificance:
      meta.spiritualSignificance || "Sacred Site",

    highlights:
      meta.highlights || [
        "Spiritual Experience",
        "Cultural Heritage",
        "Historical Significance",
      ],
  };
}) || [];

        if (transformedDestinations.length > 0) {
          setDestinations(transformedDestinations);
        } else {
          setDestinations(fallbackDestinations);
        }

      } catch (err) {
        console.warn(
          "Using fallback data due to fetch error:",
          err.message
        );
        setError(err.message);
        setDestinations(fallbackDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);


  if (loading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <Container>
          <div className="text-center py-20 sm:py-32 md:py-40">
            <div className="inline-flex flex-col items-center">
              <div className="relative mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-4 border-gray-800 border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500 animate-pulse" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Discovering Sacred Journeys</h3>
              <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
                Loading divine destinations and pilgrimage trails...
              </p>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (!destinations.length) {
    return (
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <Container>
          <div className="text-center py-20 sm:py-32 md:py-40">
            <div className="inline-flex flex-col items-center">
              <div className="mb-6 sm:mb-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-orange-500/10 to-purple-500/10 backdrop-blur-sm border border-gray-800">
                <Compass className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">No Destinations Found</h3>
              <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto mb-4 sm:mb-6">
                {error ? `Error: ${error}` : "Unable to load destinations at the moment."}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-gray-800 text-gray-300 hover:text-white hover:border-orange-500/50 transition-all duration-300 text-sm sm:text-base"
              >
                Retry Loading
              </button>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const selectedDestination = destinations[activeDestination];

  // Calculate total journey stats from backend data
  const totalStats = {
    destinations: destinations.length,
    photos: destinations.reduce((sum, dest) => sum + (dest.photos || dest.stats?.photos || 0), 0),
    journeyDays: destinations.reduce((sum, dest) => {
      const days = parseInt(dest.stats?.duration || dest.idealDuration || "2");
      return sum + (isNaN(days) ? 2 : days);
    }, 0),
    distance: `${destinations.length * 500}km` // Simplified calculation
  };

  // Mobile destination selector
  const MobileDestinationSelector = () => (
    <div className="lg:hidden mb-6">
      <button
        onClick={() => setShowMobileSelector(!showMobileSelector)}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800 hover:border-gray-700 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div 
            className="p-2.5 rounded-lg"
            style={{ 
              backgroundColor: selectedDestination.color ? `${selectedDestination.gradientColor}20` : 'rgba(255,255,255,0.05)',
              color: selectedDestination.gradientColor || '#f59e0b'
            }}
          >
            <span className="text-lg">{selectedDestination.icon || "🛕"}</span>
          </div>
          <div className="text-left">
            <div className="font-medium text-gray-100">{selectedDestination.name}</div>
            <div className="text-sm text-gray-500">{selectedDestination.state}</div>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showMobileSelector ? 'rotate-180' : ''}`} />
      </button>

      {showMobileSelector && (
        <div className="mt-2 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800 overflow-hidden">
          <div className="max-h-64 overflow-y-auto p-2">
            {destinations.map((destination, index) => (
              <button
                key={destination.id || destination.slug || index}
                onClick={() => {
                  setActiveDestination(index);
                  setShowMobileSelector(false);
                }}
                className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                  activeDestination === index
                    ? 'bg-gray-800'
                    : 'hover:bg-gray-800/50'
                }`}
              >
                <div 
                  className="p-2 rounded-lg"
                  style={{ 
                    backgroundColor: activeDestination === index 
                      ? (destination.color ? `${destination.gradientColor}20` : 'rgba(255,255,255,0.1)')
                      : 'rgba(255,255,255,0.05)',
                    color: destination.gradientColor || '#f59e0b'
                  }}
                >
                  <span className="text-base">{destination.icon || "🛕"}</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-100">{destination.name}</div>
                  <div className="text-xs text-gray-500">{destination.state}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <section id="sthan" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      {/* Simplified background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/10 via-50% to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/10 via-50% to-transparent" />
        
        {/* Subtle gradient orbs */}
        <div className={`absolute top-20 left-10 ${
          isMobile ? 'w-48 h-48' : 'w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96'
        } bg-gradient-to-br from-orange-500/3 via-transparent to-purple-500/3 rounded-full blur-2xl sm:blur-3xl`} />
        <div className={`absolute bottom-20 right-10 ${
          isMobile ? 'w-48 h-48' : 'w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96'
        } bg-gradient-to-tr from-blue-500/3 via-transparent to-emerald-500/3 rounded-full blur-2xl sm:blur-3xl`} />
      </div>

      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-orange-500/10 backdrop-blur-sm border border-orange-500/20 mb-6 sm:mb-8"
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full animate-pulse" />
            <Compass className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
            <span className="text-xs sm:text-sm font-semibold text-gray-300 tracking-widest">
              SACRED JOURNEYS
            </span>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full animate-pulse" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-6 sm:mb-8"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
              <span className="text-white block">Divine</span>
              <span className="block mt-2 sm:mt-3 md:mt-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-400">
                  Pilgrimage Trails
                </span>
              </span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl sm:max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed font-light tracking-wide px-4"
          >
            Traversing ancient paths through India's spiritual heartlands. 
            Each destination unveils a chapter in the eternal narrative of 
            <span className="text-orange-300 font-normal"> faith</span>, 
            <span className="text-purple-300 font-normal"> heritage</span>, and 
            <span className="text-amber-300 font-normal"> timeless devotion</span>.
          </motion.p>
        </motion.div>

        {/* Journey Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Journey at a Glance</h3>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              A spiritual odyssey measured in moments, memories, and milestones
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12">
            {[
              { 
                value: totalStats.destinations, 
                label: "Divine Destinations", 
                description: "Sacred sites across India",
                icon: "🛕",
                gradient: "from-amber-500 to-orange-500",
                bgGradient: "from-amber-500/10 to-orange-500/10"
              },
              { 
                value: `${totalStats.photos}+`, 
                label: "Memories", 
                description: "Spiritual moments captured",
                icon: "📸",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-500/10 to-pink-500/10"
              },
              { 
                value: totalStats.journeyDays, 
                label: "Journey Days", 
                description: "Days of exploration",
                icon: "🗓️",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-500/10 to-cyan-500/10"
              },
              { 
                value: totalStats.distance, 
                label: "Distance", 
                description: "Across landscapes",
                icon: "🛣️",
                gradient: "from-emerald-500 to-teal-500",
                bgGradient: "from-emerald-500/10 to-teal-500/10"
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-gray-900/80 via-gray-950/80 to-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300 group overflow-hidden"
              >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${stat.bgGradient}`} />
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
                    <div className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-2xl sm:text-3xl opacity-80">{stat.icon}</div>
                  </div>
                  <div className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2">{stat.label}</div>
                  <div className="text-xs sm:text-sm text-gray-400 leading-relaxed">{stat.description}</div>
                </div>
                
                {/* Animated underline */}
                <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${stat.gradient} group-hover:w-full transition-all duration-500`} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile Destination Selector */}
        <MobileDestinationSelector />

        {/* Destination Cards Grid - Hidden on mobile, shown on tablet+ */}
        <div className="hidden lg:block mb-12 lg:mb-20">
          <div className="text-center mb-8 lg:mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-4">Explore Sacred Destinations</h3>
            <p className="text-gray-400 text-sm lg:text-base max-w-2xl mx-auto">
              Select a destination to explore detailed journey insights
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id || destination.slug || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveDestination(index)}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  activeDestination === index
                    ? 'scale-[1.02] ring-2 ring-orange-500/50 shadow-xl lg:shadow-2xl'
                    : 'hover:shadow-xl lg:hover:shadow-2xl'
                }`}
              >
                {/* Card Background Image */}
                <div className="absolute inset-0 rounded-xl lg:rounded-2xl overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ 
                      backgroundImage: `url(${destination.image})`,
                      backgroundPosition: 'center'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${destination.color || 'from-gray-700 to-gray-900'} opacity-20`} />
                </div>

                {/* Card Content */}
                <div className="relative p-4 sm:p-5 md:p-6 h-48 sm:h-52 md:h-56 lg:h-64 flex flex-col justify-between rounded-xl lg:rounded-2xl border border-white/20 backdrop-blur-sm">
                  {/* Top Section */}
                  <div>
                    <div className="flex items-center justify-between mb-2 sm:mb-3 md:mb-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="text-xl sm:text-2xl">{destination.icon || "🛕"}</div>
                        <div>
                          <div className="px-2 py-1 sm:px-3 sm:py-1 bg-black/50 backdrop-blur-sm rounded-full">
                            <span className="text-xs font-medium text-white">
                              {destination.type || "Sacred Site"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="px-2 py-1 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full">
                        <span className="text-xs font-medium text-white">
                          {destination.date || "2024"}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">
                      {destination.name}
                    </h3>
                    <div className="text-base sm:text-lg text-orange-200 font-medium mb-2 sm:mb-3">
                      {destination.hindi || destination.name}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div>
                    <p className="text-gray-200 text-xs sm:text-sm mb-2 sm:mb-3 md:mb-4 line-clamp-2">
                      {destination.description || "A sacred destination of spiritual significance."}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <MapPin className="w-2 h-2 sm:w-3 sm:h-3 text-gray-300" />
                        <span className="text-xs text-gray-300">
                          {destination.state || "India"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                        <div className="flex items-center gap-1">
                          <Camera className="w-2 h-2 sm:w-3 sm:h-3 text-gray-300" />
                          <span className="text-xs text-gray-300">
                            {destination.photos || destination.stats?.photos || 0}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-2 h-2 sm:w-3 sm:h-3 text-gray-300" />
                          <span className="text-xs text-gray-300">
                            {destination.stats?.duration || destination.idealDuration || "2 days"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {activeDestination === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2"
                    >
                      <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-orange-500 to-purple-500 animate-pulse" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selected Destination Details */}
        <motion.div
          key={selectedDestination.id || selectedDestination.slug || activeDestination}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20"
        >
          {/* Left Column - Image & Overview */}
          <div className="lg:col-span-5">
            <div className="relative h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[400px] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-gray-800 shadow-lg lg:shadow-2xl">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                style={{ 
                  backgroundImage: `url(${selectedDestination.image})`,
                  backgroundPosition: 'center'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              {/* Image Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-gradient-to-br ${selectedDestination.color || 'from-gray-700 to-gray-900'} shadow-lg`}>
                      <div className="text-white text-lg sm:text-xl">
                        {selectedDestination.icon || "🛕"}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">{selectedDestination.name}</h3>
                      <div className="text-sm sm:text-base md:text-lg text-gray-300 font-devanagari">
                        {selectedDestination.hindi || selectedDestination.name}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
                  <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                    <MapPin className="w-2 h-2 sm:w-3 sm:h-3 text-gray-300" />
                    <span className="text-xs text-gray-300">
                      {selectedDestination.state || "India"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10">
                    <Calendar className="w-2 h-2 sm:w-3 sm:h-3 text-gray-300" />
                    <span className="text-xs text-gray-300">
                      {selectedDestination.date || "2024"}
                    </span>
                  </div>
                  <div className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs bg-gradient-to-r ${selectedDestination.color || 'from-gray-700 to-gray-900'} text-white font-medium`}>
                    {selectedDestination.type || "Sacred Site"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl bg-gradient-to-b from-gray-900/90 via-gray-950/90 to-gray-900/90 backdrop-blur-sm border border-gray-800 shadow-lg lg:shadow-2xl p-4 sm:p-5 md:p-6 lg:p-8 h-full">
              <div className="mb-4 sm:mb-5 md:mb-6">
                <h4 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Journey Details</h4>
                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                  {selectedDestination.description || "A spiritual journey of faith and devotion."}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                {[
                  { 
                    icon: <Clock className="w-3 h-3 sm:w-4 sm:h-4" />, 
                    label: "Duration", 
                    value: selectedDestination.stats?.duration || selectedDestination.idealDuration || "2 days" 
                  },
                  { 
                    icon: <Mountain className="w-3 h-3 sm:w-4 sm:h-4" />, 
                    label: "Elevation", 
                    value: selectedDestination.stats?.elevation || "—" 
                  },
                  { 
                    icon: <Thermometer className="w-3 h-3 sm:w-4 sm:h-4" />, 
                    label: "Temperature", 
                    value: selectedDestination.temperature || "25°C" 
                  },
                  { 
                    icon: <Wind className="w-3 h-3 sm:w-4 sm:h-4" />, 
                    label: "Season", 
                    value: selectedDestination.season || "All seasons" 
                  },
                  { 
                    icon: <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />, 
                    label: "Travel Time", 
                    value: selectedDestination.journeyTime || "—" 
                  },
                  { 
                    icon: <Camera className="w-3 h-3 sm:w-4 sm:h-4" />, 
                    label: "Photos", 
                    value: selectedDestination.photos || selectedDestination.stats?.photos || 0 
                  },
                  { 
                    icon: <Sunrise className="w-3 h-3 sm:w-4 sm:h-4" />, 
                    label: "Best Time", 
                    value: selectedDestination.bestTime || "Oct-Mar" 
                  },
                  { 
                    icon: <Moon className="w-3 h-3 sm:w-4 sm:h-4" />, 
                    label: "Stay", 
                    value: selectedDestination.idealDuration || "2-3 days" 
                  },
                ].map((stat, idx) => (
                  <div key={idx} className="p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                      <div className="text-gray-400">
                        {stat.icon}
                      </div>
                      <div className="text-xs font-medium text-gray-400">{stat.label}</div>
                    </div>
                    <div className="text-sm sm:text-base md:text-lg font-semibold text-white">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              <div className="mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                  <div className="text-xs sm:text-sm font-semibold text-gray-400">EXPERIENCE HIGHLIGHTS</div>
                </div>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {(selectedDestination.highlights || ["Spiritual Experience", "Cultural Heritage", "Historical Significance"]).map((highlight, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm bg-gray-900/50 border border-gray-800 text-gray-300 rounded-lg hover:border-orange-500/50 hover:text-orange-300 hover:bg-gray-900 transition-all duration-300 cursor-default"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 sm:pt-5 md:pt-6 border-t border-gray-800">
                <div className="flex gap-1">
                  {destinations.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveDestination(idx)}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                        activeDestination === idx
                          ? 'bg-gradient-to-r from-orange-500 to-purple-500 w-4 sm:w-6'
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setActiveDestination((activeDestination - 1 + destinations.length) % destinations.length)}
                    className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50 hover:border-orange-500/30 transition-all duration-300 group"
                  >
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-orange-400 transform rotate-180 group-hover:-translate-x-1 transition-transform" />
                  </button>
                  
                  <div className="text-xs sm:text-sm text-gray-400">
                    {activeDestination + 1} of {destinations.length}
                  </div>
                  
                  <button
                    onClick={() => setActiveDestination((activeDestination + 1) % destinations.length)}
                    className="p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl bg-gray-900/50 border border-gray-800 hover:bg-gray-800/50 hover:border-purple-500/30 transition-all duration-300 group"
                  >
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
            Ready for Your Spiritual Journey?
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-6 sm:mb-8">
            Embark on a pilgrimage of self-discovery and connect with ancient spiritual traditions
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export default DestinationsSection;