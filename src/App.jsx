import React, { Suspense, lazy, useEffect } from 'react';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { ThemeProvider } from "./context/ThemeContext";

// ✅ Lazy load Home component
const Home = lazy(() => import("./pages/Home"));

// ✅ Loading fallback for the main content
const PageLoader = () => (
  <div className="min-h-[60vh] bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto" />
      <p className="mt-4 text-white/40 text-xs md:text-sm tracking-wider font-light">
        Loading Sacred Journey...
      </p>
    </div>
  </div>
);

function App() {
  // ✅ Prefetch Home component after initial render
  useEffect(() => {
    // Preload Home component in the background
    const prefetchHome = async () => {
      try {
        await import("./pages/Home");
      } catch (error) {
        // Silently fail - component will load normally
      }
    };
    
    // Only prefetch after idle time
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => prefetchHome());
    } else {
      setTimeout(prefetchHome, 1000);
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-bg text-text transition-colors duration-300">
        <Navbar />

        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;