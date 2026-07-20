import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ✅ Add loading indicator for better UX
const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mx-auto" />
      <p className="mt-4 text-white/40 text-xs md:text-sm tracking-wider font-light">
        Loading Sacred Journey...
      </p>
    </div>
  </div>
);

// ✅ Add preconnect for external resources
const addPreconnects = () => {
  const links = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { rel: 'preconnect', href: 'https://images.unsplash.com' },
    { rel: 'dns-prefetch', href: 'https://images.unsplash.com' },
  ];

  links.forEach(({ rel, href, crossOrigin }) => {
    const link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (crossOrigin) link.crossOrigin = crossOrigin;
    document.head.appendChild(link);
  });
};

// ✅ Add preload for critical images
const preloadCriticalAssets = () => {
  // Preload the first hero image
  const heroImages = [
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
  ];
  
  heroImages.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

// ✅ Execute optimizations before rendering
if (process.env.NODE_ENV === 'production') {
  addPreconnects();
  preloadCriticalAssets();
}

const root = ReactDOM.createRoot(document.getElementById('root'));

// ✅ Use React.startTransition for better performance
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<LoadingFallback />}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);

// ✅ Optimize reportWebVitals to not block rendering
if (process.env.NODE_ENV === 'production') {
  reportWebVitals(console.log);
} else {
  // Only log in development
  reportWebVitals();
}