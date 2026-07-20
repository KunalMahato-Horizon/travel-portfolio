import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';

// ✅ Lazy load all sections
const HeroSection = lazy(() => import("../components/home/HeroSection"));
const JourneysSection = lazy(() => import("../components/home/JourneySection"));
const GallerySection = lazy(() => import("../components/home/GallerySection"));
const DestinationsSection = lazy(() => import("../components/home/DestinationsSection"));
const AboutSection = lazy(() => import("../components/home/AboutSection"));

const SectionLoader = () => (
  <div className="min-h-[40vh] bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto" />
      <p className="mt-2 text-white/20 text-[10px] tracking-[0.2em] uppercase font-light">
        Loading Section...
      </p>
    </div>
  </div>
);

// ✅ Lazy load wrapper with Intersection Observer
const LazySection = ({ children, sectionName, loadComponent }) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Preload hero immediately
    if (sectionName === 'HeroSection') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [sectionName]);

  // Preload the component when shouldLoad is true
  useEffect(() => {
    if (shouldLoad) {
      loadComponent();
    }
  }, [shouldLoad, loadComponent]);

  return (
    <div ref={ref}>
      {shouldLoad ? children : <SectionLoader />}
    </div>
  );
};

function Home() {
  return (
    <>
      {/* Hero loads immediately */}
      <LazySection sectionName="HeroSection" loadComponent={() => import("../components/home/HeroSection")}>
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>
      </LazySection>

      {/* Other sections load when scrolled near */}
      <LazySection sectionName="JourneysSection" loadComponent={() => import("../components/home/JourneySection")}>
        <Suspense fallback={<SectionLoader />}>
          <JourneysSection />
        </Suspense>
      </LazySection>

      <LazySection sectionName="GallerySection" loadComponent={() => import("../components/home/GallerySection")}>
        <Suspense fallback={<SectionLoader />}>
          <GallerySection />
        </Suspense>
      </LazySection>

      <LazySection sectionName="DestinationsSection" loadComponent={() => import("../components/home/DestinationsSection")}>
        <Suspense fallback={<SectionLoader />}>
          <DestinationsSection />
        </Suspense>
      </LazySection>

      <LazySection sectionName="AboutSection" loadComponent={() => import("../components/home/AboutSection")}>
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
      </LazySection>
    </>
  );
}

export default Home;