import Container from "./Container";
import { 
  Heart, Compass, MapPin, Camera, BookOpen,
  Instagram, Twitter, Mail, ArrowUp,
  Sparkles, Mountain, Waves, Globe
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const journeyStats = [
    { label: "Destinations", value: "19+", icon: <MapPin className="w-4 h-4" /> },
    { label: "Photos", value: "2,450+", icon: <Camera className="w-4 h-4" /> },
    { label: "Stories", value: "47", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Years", value: "3", icon: <Compass className="w-4 h-4" /> }
  ];

  const journeyTypes = [
    { type: "Spiritual", icon: <Sparkles className="w-4 h-4" />, count: 8 },
    { type: "Mountains", icon: <Mountain className="w-4 h-4" />, count: 3 },
    { type: "Coastal", icon: <Waves className="w-4 h-4" />, count: 2 },
    { type: "Cultural", icon: <Globe className="w-4 h-4" />, count: 6 }
  ];

  const recentJourneys = [
    "Varanasi", "Darjeeling", "Somnath", "Vrindavan"
  ];

  return (
    <footer className="relative w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-t border-gray-200 dark:border-gray-800">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Scroll to Top - Responsive positioning */}
      {showScrollTop && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={scrollToTop}
          className="fixed z-50 p-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 transition-all duration-300
          bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8"
        >
          <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      )}

      <Container className="relative z-10 px-4 sm:px-6">
        {/* Main Content */}
        <div className="py-8 sm:py-10 md:py-12">
          {/* Journey Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12">
            {journeyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-orange-500/10 to-amber-500/10 mb-2 sm:mb-3">
                  <div className="text-orange-600 dark:text-orange-400">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-10 md:mb-12">
            {/* Brand & Description */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500">
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    Spiritual Odyssey
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    Sacred Travel Journal
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                Documenting spiritual journeys across India's sacred landscapes through photography and stories.
              </p>
            </div>

            {/* Journey Types */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Journey Types
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {journeyTypes.map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="text-orange-600 dark:text-orange-400">
                        {type.icon}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        {type.type}
                      </span>
                    </div>
                    <span className="text-xs font-medium px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full bg-gradient-to-r from-orange-500/10 to-amber-500/10 text-orange-600 dark:text-orange-400">
                      {type.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Destinations */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                Recent Journeys
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {recentJourneys.map((destination, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm rounded-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    {destination}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-6 sm:my-8" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <span className="text-xs sm:text-sm">Made with love for travel</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-700" />
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                © {currentYear} HorizonHub
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
              
              <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-700" />
              
              <div className="flex items-center gap-4 text-xs sm:text-sm">
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />
    </footer>
  );
}

export default Footer;