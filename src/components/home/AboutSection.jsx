import React, { useState, useMemo, useCallback } from "react";
import { 
  MapPin, Camera, BookOpen, 
  Sunrise, Youtube, Instagram, 
  ArrowUpRight, Compass
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function AboutSection() {
  const [activeTab, setActiveTab] = useState("story");

  // Motion Easing
  const ease = [0.16, 1, 0.3, 1];

  // ✅ Memoized static data
  const tabs = useMemo(() => [
    { id: "story", label: "The Narrative", hindi: "वृत्तांत" },
    { id: "philosophy", label: "Philosophy", hindi: "दर्शन" },
    { id: "gear", label: "Equipment", hindi: "उपकरण" },
    { id: "metrics", label: "Metrics", hindi: "आँकड़े" }
  ], []);

  const socialLinks = useMemo(() => [
    { 
      platform: "YouTube", 
      id: "Video Archive",
      handle: "@spiritualodyssey", 
      url: "https://www.youtube.com/@yourchannel",
      icon: <Youtube className="w-5 h-5" />
    },
    { 
      platform: "Instagram", 
      id: "Visual Feed",
      handle: "@spiritualtravels", 
      url: "https://www.instagram.com/travelwithanoj?igsh=ajR3cWVnN3gwMm5q",
      icon: <Instagram className="w-5 h-5" />
    }
  ], []);

  const gearList = useMemo(() => [
    { type: "Primary Body", model: "Sony α7 IV", spec: "Full-Frame Mirrorless" },
    { type: "Prime Lens", model: "Sony 35mm f/1.4", spec: "G-Master Series" },
    { type: "Wide Zoom", model: "Sony 16-35mm f/2.8", spec: "Architecture/Landscapes" },
    { type: "Drone", model: "DJI Mini 3 Pro", spec: "Aerial Perspectives" },
    { type: "Audio", model: "Rode Wireless GO II", spec: "Ambient/Dialogue" },
    { type: "Pack", model: "Wandrd Prvke 31L", spec: "Weather-Resistant" }
  ], []);

  const philosophyItems = useMemo(() => [
    { title: "Meaning Over Miles", icon: <Compass className="w-5 h-5" />, desc: "Distance is an illusion. I'd rather spend three days sitting silently in one courtyard than rush through ten temples in a day." },
    { title: "Respect & Learn", icon: <BookOpen className="w-5 h-5" />, desc: "Every shrine has its rules, its timeline, and its keepers. Understanding local traditions takes priority over getting the perfect shot." },
    { title: "Capture to Preserve", icon: <Camera className="w-5 h-5" />, desc: "Photography is my anchor to memory. The goal is to record the atmosphere and the geometry so it can be shared with those who cannot make the journey." },
    { title: "Seek the Dawn", icon: <Sunrise className="w-5 h-5" />, desc: "The truest essence of spiritual India reveals itself in the quiet hours of Brahmamuhurtha, long before the crowds arrive." }
  ], []);

  const metricsStats = useMemo(() => [
    { label: "States Documented", value: "09", desc: "Pan-India Coverage" },
    { label: "Sacred Sites", value: "25", desc: "Temples & Monasteries" },
    { label: "Distance (KM)", value: "8K", desc: "Overland Transit" },
    { label: "Archives", value: "2K", desc: "Photographs Processed" }
  ], []);

  const movementPatterns = useMemo(() => [
    { label: "Prime Season", value: "Winter (Oct-Feb)" },
    { label: "Accommodation", value: "Dharamshalas" },
    { label: "Transit Mode", value: "Rail & Overland" },
    { label: "Pacing", value: "Slow / Immersive" }
  ], []);

  // ✅ Memoized tab change handler
  const handleTabChange = useCallback((tabId) => {
    setActiveTab(tabId);
  }, []);

  // ✅ Memoized profile image URL (could be moved to a constant)
  const profileImageUrl = useMemo(() => 
    "https://res.cloudinary.com/dla8tkflq/image/upload/v1767921620/1_djsnby.jpg",
  []);

  return (
    <section id="parichay" className="min-h-screen bg-black text-white relative border-t border-white/5 py-24 select-none overflow-hidden">
      
      {/* ✅ Reduced background ambience for performance */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-white/[0.01] rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/3 w-[1px] h-full bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-16 md:mb-24 space-y-4"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">05 // परिचय (IDENTITY)</span>
            <div className="w-12 h-[1px] bg-white/10" />
            <span className="text-white/40 font-mono text-[10px] tracking-widest uppercase">The Author</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight leading-none">
            Behind The <span className="text-white/20 font-light font-devanagari">लेंस</span>
          </h2>
        </motion.div>

        {/* HERO PROFILE BLOCK */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20 lg:mb-32">
          
          {/* Left Portrait Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="col-span-1 lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-neutral-900 border border-white/10">
              {/* ✅ Optimized image with loading="lazy" */}
              <div 
                className="absolute inset-0 bg-cover bg-center grayscale-[0.3] hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                style={{ backgroundImage: `url(${profileImageUrl})` }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              <div className="absolute inset-0 border border-white/5 rounded-2xl" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest mb-1">Visual Storyteller</div>
                  <div className="text-xl font-light text-white tracking-wide">Anoj Kumar</div>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white/60" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Typography */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center">
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="text-2xl sm:text-3xl md:text-4xl font-light leading-tight text-white mb-6"
            >
              "I don't just photograph places; I attempt to capture the absolute silence, devotion, and scale of India's spiritual geometry."
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="text-white/40 font-light leading-relaxed max-w-xl text-sm md:text-base mb-10"
            >
              Every journey tells a story, and every destination leaves a mark on the soul. Traversing ancient paths through India's heartlands, I document the intersection of human faith and timeless architecture.
            </motion.p>

            {/* Quick Micro-Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/5"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 block">Focus</span>
                <span className="text-white/80 font-light text-sm">Spiritual Heritage</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 block">Base</span>
                <span className="text-white/80 font-light text-sm flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-white/30" /> India
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 block">Medium</span>
                <span className="text-white/80 font-light text-sm">Digital / Mirrorless</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* INTERACTIVE DOSSIER TABS SYSTEM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-white/5 pt-16">
          
          {/* Tab Navigation Column */}
          <div className="col-span-1 lg:col-span-3">
            <div className="sticky top-24 space-y-2 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-none snap-x snap-mandatory">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`relative w-full text-left px-4 md:px-6 py-4 rounded-xl transition-all duration-300 snap-center min-w-[200px] lg:min-w-0 ${
                      isActive ? 'bg-white/[0.03] border border-white/10' : 'bg-transparent border border-transparent hover:bg-white/[0.01]'
                    }`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <span className={`text-sm md:text-base font-light tracking-wide transition-colors ${isActive ? 'text-white' : 'text-white/40'}`}>
                        {tab.label}
                      </span>
                      <span className={`font-devanagari transition-colors ${isActive ? 'text-white/30' : 'text-white/10'}`}>
                        {tab.hindi}
                      </span>
                    </div>
                    {isActive && (
                      <motion.div 
                        layoutId="activeTabIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-1/2 bg-white rounded-r-full hidden lg:block"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Content Viewport */}
          <div className="col-span-1 lg:col-span-9 min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: NARRATIVE */}
              {activeTab === "story" && (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease }}
                  className="space-y-8"
                >
                  <h3 className="text-2xl font-light tracking-tight text-white mb-6">The Genesis of the Journey</h3>
                  <div className="space-y-6 text-sm md:text-base text-white/50 font-light leading-relaxed max-w-3xl">
                    <p>
                      My first profound pilgrimage to Varanasi in 2023 wasn't just a physical trip—it was a catalyst for internal transformation. Standing on the ancient ghats at sunrise, watching devotees perform rituals that have remained unchanged for millennia, I realized travel shouldn't be about ticking geographic boxes.
                    </p>
                    
                    {/* Pull Quote Block */}
                    <div className="py-6 px-8 my-8 border-l border-white/20 bg-white/[0.01] rounded-r-2xl relative">
                      <div className="absolute top-4 left-4 w-12 h-12 text-white/5">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                      <p className="text-lg md:text-xl text-white/80 font-light italic relative z-10 leading-relaxed">
                        "Every temple, every river, every mountain has a story waiting to be heard. The camera captures the photons, but the mind must capture the reverence."
                      </p>
                    </div>

                    <p>
                      Since that moment, my focus shifted entirely. I dedicated myself to exploring India's deep spiritual heritage. From the freezing Himalayan peaks of Darjeeling to the coastal temples of Somnath, each destination serves as a masterclass in faith, scale, and time.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: PHILOSOPHY */}
              {activeTab === "philosophy" && (
                <motion.div
                  key="philosophy"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
                >
                  {philosophyItems.map((phil, idx) => (
                    <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 mb-6">
                        {phil.icon}
                      </div>
                      <h4 className="text-lg text-white tracking-wide font-light mb-3">{phil.title}</h4>
                      <p className="text-sm text-white/40 font-light leading-relaxed">{phil.desc}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* TAB 3: EQUIPMENT */}
              {activeTab === "gear" && (
                <motion.div
                  key="gear"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <div className="mb-8 max-w-2xl">
                    <h3 className="text-2xl font-light tracking-tight text-white mb-4">Hardware & Logistics</h3>
                    <p className="text-sm md:text-base text-white/40 font-light">
                      The terrain is unpredictable, and light is fleeting. Carrying reliable, weather-sealed equipment is not a luxury, but a necessity for documentation.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/5 overflow-hidden">
                    <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 bg-white/[0.02] font-mono text-[9px] uppercase tracking-widest text-white/30">
                      <div className="col-span-4 md:col-span-3">Classification</div>
                      <div className="col-span-8 md:col-span-5">Model / Designation</div>
                      <div className="hidden md:block col-span-4">Primary Application</div>
                    </div>
                    
                    <div className="divide-y divide-white/5 bg-white/[0.01]">
                      {gearList.map((gear, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-white/[0.02] transition-colors items-center group">
                          <div className="col-span-4 md:col-span-3 text-xs text-white/40 font-light">{gear.type}</div>
                          <div className="col-span-8 md:col-span-5 text-sm text-white/80 font-medium tracking-wide group-hover:text-white transition-colors">{gear.model}</div>
                          <div className="hidden md:block col-span-4 text-xs text-white/30 font-light">{gear.spec}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: METRICS */}
              {activeTab === "metrics" && (
                <motion.div
                  key="metrics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
                    {metricsStats.map((stat, idx) => (
                      <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/[0.01] border border-white/5 text-center flex flex-col justify-center">
                        <div className="text-4xl md:text-5xl font-extralight text-white mb-2">{stat.value}</div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">{stat.label}</div>
                        <div className="text-xs text-white/20 font-light">{stat.desc}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-8 rounded-2xl bg-white/[0.01] border border-white/5">
                    <h4 className="text-sm font-mono tracking-widest uppercase text-white/40 mb-6">Movement Patterns</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {movementPatterns.map((pattern, idx) => (
                        <div key={idx} className="flex justify-between items-end border-b border-white/5 pb-3">
                          <span className="text-sm text-white/60 font-light">{pattern.label}</span>
                          <span className="text-white font-medium text-sm tracking-wide">{pattern.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* SOCIAL NETWORK & CTA FOOTER */}
        <div className="mt-32 border-t border-white/5 pt-16">
          <div className="flex items-center gap-3 mb-10">
            <span className="font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase">06 // संजाल (NETWORK)</span>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/20 hover:bg-white/[0.03] transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
                    {social.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-light text-white tracking-wide">{social.platform}</h4>
                    <p className="text-xs font-mono text-white/30 tracking-widest">{social.handle}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/30 group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;