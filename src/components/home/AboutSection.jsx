import React, { useState, useEffect } from "react"; // Added React import
import Container from "../layout/Container";
import { 
  MapPin, Heart, Globe, Camera, Sparkles, 
  Compass, BookOpen, Star, Users,
  Mountain, Waves, Sunrise, Award,
  Mail, Instagram, Twitter, Linkedin, Github, Youtube,
  ArrowRight, ChevronRight, ExternalLink
} from "lucide-react";
import { motion } from "framer-motion";

function AboutSection() {
  const [activeTab, setActiveTab] = useState("story");
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    { id: "story", label: "My Story", icon: <BookOpen className="w-4 h-4" /> },
    { id: "philosophy", label: "Philosophy", icon: <Sparkles className="w-4 h-4" /> },
    { id: "gear", label: "Travel Gear", icon: <Compass className="w-4 h-4" /> },
    { id: "stats", label: "Stats", icon: <Award className="w-4 h-4" /> }
  ];

  // Updated social links - only YouTube and Instagram WITH LINKS
  const socialLinks = [
    { 
      platform: "YouTube", 
      icon: <Youtube className="w-5 h-5" />, 
      handle: "@spiritualodyssey", 
      url: "https://www.youtube.com/@yourchannel", // Replace with your actual YouTube URL
      color: "from-red-500 to-rose-500" 
    },
    { 
      platform: "Instagram", 
      icon: <Instagram className="w-5 h-5" />, 
      handle: "@spiritualtravels", 
      url: "https://www.instagram.com/travelwithanoj?igsh=ajR3cWVnN3gwMm5q", // Replace with your actual Instagram URL
      color: "from-purple-500 to-pink-500" 
    }
  ];

  const travelStats = [
    { label: "Countries", value: "1", icon: <Globe className="w-6 h-6" />, description: "Focused on India's diversity", gradient: "from-orange-500 to-amber-500" },
    { label: "States", value: "9+", icon: <MapPin className="w-6 h-6" />, description: "Across the nation", gradient: "from-violet-500 to-purple-500" },
    { label: "Sacred Sites", value: "15+", icon: <Sparkles className="w-6 h-6" />, description: "Temples & spiritual places", gradient: "from-blue-500 to-cyan-500" },
    { label: "Photos Taken", value: "2K+", icon: <Camera className="w-6 h-6" />, description: "Memories captured", gradient: "from-emerald-500 to-teal-500" }
  ];

  const favoritePlaces = [
    { name: "Varanasi", type: "Spiritual", icon: <Sparkles className="w-4 h-4" />, color: "from-orange-500 to-amber-500" },
    { name: "Darjeeling", type: "Mountain", icon: <Mountain className="w-4 h-4" />, color: "from-emerald-500 to-teal-500" },
    { name: "Somnath", type: "Coastal", icon: <Waves className="w-4 h-4" />, color: "from-blue-500 to-sky-500" },
    { name: "Vrindavan", type: "Cultural", icon: <Heart className="w-4 h-4" />, color: "from-rose-500 to-pink-500" }
  ];

  return (
    <section id="parichay" className="relative py-12 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-4 md:left-10 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-4 md:right-10 w-48 md:w-96 h-48 md:h-96 bg-gradient-to-tr from-blue-500/5 via-transparent to-emerald-500/5 rounded-full blur-3xl"
        />
      </div>

      <Container className="relative z-10 px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-800 mb-6 md:mb-8">
            <div className="w-4 md:w-8 h-px bg-gradient-to-r from-transparent to-gray-700" />
            <Compass className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
            <span className="text-xs md:text-sm text-gray-400 tracking-wider md:tracking-widest">THE TRAVELER'S STORY</span>
            <div className="w-4 md:w-8 h-px bg-gradient-to-l from-transparent to-gray-700" />
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 tracking-tight"
          >
            <span className="text-white block">Behind the</span>
            <span className="block mt-2 md:mt-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-red-400">
                Lens
              </span>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed px-4"
          >
            Every journey tells a story, and every destination leaves a mark on the soul. 
            This is my collection of moments, memories, and musings from the spiritual path.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-20">
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-1">
            <div className="space-y-6 md:space-y-8">
              {/* Profile Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="group relative bg-gradient-to-b from-gray-900/90 to-gray-950/90 rounded-2xl md:rounded-3xl overflow-hidden border border-gray-800 shadow-xl md:shadow-2xl backdrop-blur-sm"
              >
                <div className="relative h-48 md:h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-emerald-500/10" />
                  
                  <div className="relative h-full flex items-end justify-center p-4 md:p-8">
                    <div className="relative">
                      <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full blur-lg md:blur-xl opacity-30" />
                      <div className="relative w-24 h-24 md:w-40 md:h-40 rounded-full border-4 border-gray-900 shadow-xl md:shadow-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-3xl md:text-5xl">🙏</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-8 pt-0">
                  <div className="relative -top-8 md:-top-10 text-center">
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-1 md:mb-2">
                      Spiritual Traveler
                    </h3>
                    <div className="flex items-center justify-center gap-1 md:gap-2 text-gray-400 text-sm md:text-base mb-3 md:mb-4">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                      <span>Exploring India</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-orange-500/10 text-orange-300 rounded-full text-xs md:text-sm font-medium border border-orange-500/30">
                        Pilgrim
                      </span>
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-purple-500/10 text-purple-300 rounded-full text-xs md:text-sm font-medium border border-purple-500/30">
                        Storyteller
                      </span>
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-emerald-500/10 text-emerald-300 rounded-full text-xs md:text-sm font-medium border border-emerald-500/30">
                        Photographer
                      </span>
                    </div>

                    <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4 md:mb-8 px-2">
                      Capturing moments, seeking meaning, and sharing stories from India's sacred landscapes.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {travelStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: isMobile ? 0 : -4 }}
                    className="group relative p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
                  >
                    <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                      <div className={`p-1.5 md:p-2 rounded-lg md:rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                        <div className="text-white">
                          {React.cloneElement(stat.icon, { className: "w-4 h-4 md:w-6 md:h-6" })}
                        </div>
                      </div>
                      <div>
                        <div className={`text-lg md:text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                          {stat.value}
                        </div>
                        <div className="text-xs md:text-sm font-medium text-gray-300">{stat.label}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 line-clamp-2">{stat.description}</div>
                    
                    {/* Corner accent */}
                    <div className={`absolute top-0 right-0 w-4 h-4 md:w-6 md:h-6 border-t border-r ${stat.gradient.replace('from-', 'border-').replace('to-', '').split(' ')[0]}/30 rounded-tr-xl md:rounded-tr-2xl`} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-1 md:gap-2 mb-8 md:mb-12"
            >
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: isMobile ? 1 : 1.05, y: isMobile ? 0 : -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group px-3 py-2 md:px-6 md:py-4 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 md:gap-3 backdrop-blur-sm border ${
                    activeTab === tab.id
                      ? `bg-gradient-to-r from-orange-500 to-purple-500 text-white shadow-md md:shadow-lg`
                      : 'bg-gray-900/30 text-gray-300 hover:bg-gray-800/30 border-gray-800'
                  }`}
                >
                  {React.cloneElement(tab.icon, { className: "w-3 h-3 md:w-4 md:h-4" })}
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </motion.button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <div className="space-y-8 md:space-y-12">
              {/* Story Tab */}
              {activeTab === "story" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                      The Journey Begins
                    </h3>
                    <div className="space-y-4 md:space-y-6">
                      <p className="text-sm md:text-lg text-gray-300 leading-relaxed">
                        My first pilgrimage to <span className="font-semibold text-orange-400">Varanasi</span> in 2023 wasn't just a trip—it was a transformation. Standing on the ancient ghats at sunrise, watching devotees perform their rituals, I realized travel isn't about ticking boxes. It's about <span className="font-semibold text-purple-400">connecting with the soul of a place</span>.
                      </p>
                      
                      <div className="relative rounded-lg md:rounded-2xl p-4 md:p-8 bg-gradient-to-r from-gray-900/50 to-gray-950/50 border-l-2 md:border-l-4 border-orange-500 backdrop-blur-sm">
                        <Sparkles className="absolute -top-2 -left-2 md:-top-3 md:-left-3 w-5 h-5 md:w-8 md:h-8 text-orange-500" />
                        <p className="text-sm md:text-lg italic text-gray-300">
                          "Traveling through India's sacred sites taught me that every temple, every river, every mountain has a story waiting to be heard. My camera captures images, but my heart captures memories."
                        </p>
                      </div>
                      
                      <p className="text-sm md:text-lg text-gray-300 leading-relaxed">
                        Since that moment, I've dedicated myself to exploring <span className="font-semibold text-emerald-400">India's spiritual heritage</span>. From the Himalayan peaks of Darjeeling to the coastal temples of Somnath, each destination has added a new chapter to my spiritual journey.
                      </p>
                    </div>
                  </div>

                  {/* Favorite Places */}
                  <div>
                    <h4 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                      <Heart className="w-4 h-4 md:w-6 md:h-6 text-rose-400" />
                      Favorite Sacred Destinations
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      {favoritePlaces.map((place, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: isMobile ? 0 : -4 }}
                          className="group relative p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
                        >
                          <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                            <div className={`p-2 md:p-3 rounded-lg md:rounded-lg bg-gradient-to-br ${place.color}`}>
                              <div className="text-white">{React.cloneElement(place.icon, { className: "w-3 h-3 md:w-4 md:h-4" })}</div>
                            </div>
                            <div>
                              <div className="font-semibold text-white text-sm md:text-base">{place.name}</div>
                              <div className="text-xs md:text-sm text-gray-400">{place.type}</div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Sacred site that touched my soul
                          </div>
                          
                          {/* Hover indicator */}
                          <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Philosophy Tab */}
              {activeTab === "philosophy" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                      My Travel Philosophy
                    </h3>
                    <div className="space-y-4 md:space-y-6">
                      {[
                        {
                          title: "Meaning Over Miles",
                          icon: <Sparkles className="w-4 h-4 md:w-6 md:h-6" />,
                          description: "It's not about how far you go, but how deeply you experience where you are. I'd rather spend three days truly connecting with one temple than rush through ten.",
                          gradient: "from-orange-500 to-amber-500"
                        },
                        {
                          title: "Respect & Learn",
                          icon: <BookOpen className="w-4 h-4 md:w-6 md:h-6" />,
                          description: "Every destination has its customs, stories, and people. I travel to learn, not just to see. Understanding local traditions enriches the journey.",
                          gradient: "from-violet-500 to-purple-500"
                        },
                        {
                          title: "Capture to Share",
                          icon: <Camera className="w-4 h-4 md:w-6 md:h-6" />,
                          description: "Photography is my way of preserving moments, but sharing stories is how I keep them alive. Every photo has a story worth telling.",
                          gradient: "from-blue-500 to-cyan-500"
                        }
                      ].map((principle, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 }}
                          whileHover={{ y: isMobile ? 0 : -4 }}
                          className="group p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
                        >
                          <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
                            <div className={`p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br ${principle.gradient}`}>
                              <div className="text-white">{principle.icon}</div>
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">
                                {principle.title}
                              </h4>
                              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                                {principle.description}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Gear Tab */}
              {activeTab === "gear" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                      My Travel Companions
                    </h3>
                    <p className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed">
                      After years of spiritual travel across India, I've learned that the right gear can make all the difference. Here's what always travels with me:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                      {[
                        {
                          name: "Mirrorless Camera",
                          brand: "Sony α7 IV",
                          purpose: "Capturing temple architecture & rituals",
                          icon: <Camera className="w-4 h-4 md:w-5 md:h-5" />,
                          gradient: "from-orange-500 to-amber-500"
                        },
                        {
                          name: "Travel Journal",
                          brand: "Handmade Leather",
                          purpose: "Recording thoughts & experiences",
                          icon: <BookOpen className="w-4 h-4 md:w-5 md:h-5" />,
                          gradient: "from-violet-500 to-purple-500"
                        },
                        {
                          name: "Portable Altar",
                          brand: "Traditional Brass",
                          purpose: "Morning prayers & meditation",
                          icon: <Sparkles className="w-4 h-4 md:w-5 md:h-5" />,
                          gradient: "from-blue-500 to-cyan-500"
                        },
                        {
                          name: "Hiking Boots",
                          brand: "Salomon",
                          purpose: "Mountain temple treks",
                          icon: <Mountain className="w-4 h-4 md:w-5 md:h-5" />,
                          gradient: "from-emerald-500 to-teal-500"
                        }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ y: isMobile ? 0 : -4 }}
                          className="group p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
                        >
                          <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                            <div className={`p-2 md:p-3 rounded-lg md:rounded-lg bg-gradient-to-br ${item.gradient}`}>
                              <div className="text-white">{item.icon}</div>
                            </div>
                            <div>
                              <div className="font-bold text-white text-sm md:text-base">{item.name}</div>
                              <div className="text-xs md:text-sm text-gray-400">{item.brand}</div>
                            </div>
                          </div>
                          <div className="text-xs md:text-sm text-gray-300">{item.purpose}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Stats Tab */}
              {activeTab === "stats" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6 md:space-y-8"
                >
                  <div>
                    <h3 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6">
                      By The Numbers
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
                      {[
                        { label: "Years Traveling", value: "3", trend: "↑", gradient: "from-orange-500 to-amber-500" },
                        { label: "Temples Visited", value: "25+", trend: "↑", gradient: "from-violet-500 to-purple-500" },
                        { label: "Distance Covered", value: "8,450km", trend: "→", gradient: "from-blue-500 to-cyan-500" },
                        { label: "Photos Shared", value: "500+", trend: "↑", gradient: "from-emerald-500 to-teal-500" }
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-center p-3 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border border-gray-800"
                        >
                          <div className={`text-xl md:text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1 md:mb-2`}>
                            {stat.value}
                          </div>
                          <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="space-y-4 md:space-y-6">
                      <div>
                        <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 flex items-center gap-2 md:gap-3">
                          <Sunrise className="w-4 h-4 md:w-6 md:h-6 text-orange-400" />
                          Travel Patterns
                        </h4>
                        <div className="space-y-3 md:space-y-4">
                          {[
                            { activity: "Favorite Time to Travel", detail: "Winter months (Oct-Feb)" },
                            { activity: "Preferred Stay", detail: "Temple dharamshalas & homestays" },
                            { activity: "Travel Style", detail: "Slow, immersive, off-peak seasons" },
                            { activity: "Documentation", detail: "Photos + written journals" }
                          ].map((pattern, index) => (
                            <div key={index} className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-2 md:py-3 border-b border-gray-800">
                              <span className="text-sm md:text-base text-gray-300 mb-1 sm:mb-0">{pattern.activity}</span>
                              <span className="font-semibold text-white text-sm md:text-base">{pattern.detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Social Links - Updated with clickable YouTube and Instagram links */}
            <div className="mt-8 md:mt-16 pt-6 md:pt-12 border-t border-gray-800">
              <h4 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <Users className="w-4 h-4 md:w-6 md:h-6 text-blue-400" />
                Follow the Journey
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-md">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: isMobile ? 0 : -4 }}
                    className={`group relative p-4 md:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br ${social.color} overflow-hidden border border-gray-800 hover:border-white/20 transition-all duration-300 cursor-pointer`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <div className="text-white">{React.cloneElement(social.icon, { className: "w-4 h-4 md:w-5 md:h-5" })}</div>
                        <span className="font-semibold text-white text-sm md:text-base">{social.platform}</span>
                      </div>
                      <div className="text-xs md:text-sm text-gray-200">{social.handle}</div>
                      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="w-3 h-3 md:w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                ))}
              </div>
              
              {/* Optional: You can add this note if you want */}
              <p className="text-xs md:text-sm text-gray-500 mt-3 md:mt-4">
                Click to follow my latest travel stories and videos
              </p>
            </div>
          </div>
        </div>

        {/* Updated CTA - No links, single page site */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-xl md:rounded-3xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm p-6 md:p-12 text-center"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjEwJSIgY3k9IjEwJSIgcj0iMSIgZmlsbD0iI2Y1OWUwYiIvPjwvc3ZnPgo=')]"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-6">
              The Journey Continues
            </h3>
            <p className="text-gray-300 text-sm md:text-lg mb-6 md:mb-10 max-w-2xl mx-auto">
              My spiritual travels through India are an ongoing story. Every journey brings new insights, 
              and every destination reveals new layers of meaning. The path unfolds one step at a time.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-2 md:gap-3 text-gray-400">
                <Compass className="w-4 h-4 md:w-5 md:h-5 text-orange-400" />
                <span className="text-sm md:text-lg">Next Destination: The Himalayas</span>
                <Compass className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
              </div>
              <div className="text-xs md:text-sm text-gray-500">
                Follow along for stories and photos from the next chapter
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default AboutSection;