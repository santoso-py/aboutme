import React, { useState, useEffect, useMemo, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import AppsList from './pages/AppsList';
import Lab from './pages/Lab';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

// Instant Scroll Restoration
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as any });
  }, [pathname]);
  return null;
};

type Language = 'en' | 'id' | 'jp';

const AppContent: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isDark, setIsDark] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [scrollPct, setScrollPercentage] = useState(0);
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    const unsubscribe = scrollYProgress.on("change", (latest) => setScrollPercentage(Math.round(latest * 100)));
    return () => {
      clearInterval(timer);
      unsubscribe();
    };
  }, [scrollYProgress]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDark(true);
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang) setLang(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  return (
    <div className={cn(
      "min-h-screen transition-all duration-1000 selection:bg-accent/20 relative overflow-x-hidden",
      isDark ? "dark text-zinc-100" : "light text-zinc-900",
      `theme-${lang}`
    )}>
      {/* AMBIENT METADATA */}
      <div className="ambient-meta bottom-8 left-8">{time} // Jakarta, ID</div>
      <div className="ambient-meta bottom-8 right-8">Scroll Pos: {scrollPct}%</div>

      <div className="grain-texture" />
      <div className="dot-grid" />
      
      <div 
        className="fixed inset-0 pointer-events-none accent-glow z-0 transition-all duration-1000"
        style={{ background: `radial-gradient(circle 800px at 50% 50%, rgb(var(--accent) / 0.08), transparent 100%)` }}
      />

      {/* MINIMAL NAV */}
      <nav className="fixed top-8 left-8 right-8 flex justify-between items-center z-[100] px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40 hover:opacity-100 transition-opacity">San Rui</Link>
          
          <div className="flex items-center bg-zinc-500/5 backdrop-blur-2xl p-1 rounded-full border border-zinc-500/10 shadow-2xl relative">
            <Link 
              to="/blog" 
              className={cn(
                "px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-colors duration-500 relative z-10",
                location.pathname.startsWith('/blog') ? "text-white" : "opacity-30 hover:opacity-100"
              )}
            >
              Blog
              {location.pathname.startsWith('/blog') && (
                <motion.div 
                  layoutId="activeNav"
                  initial={false}
                  className="absolute inset-0 bg-accent rounded-full shadow-xl shadow-accent/30 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
            <Link 
              to="/apps" 
              className={cn(
                "px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-colors duration-500 relative z-10",
                location.pathname === '/apps' ? "text-white" : "opacity-30 hover:opacity-100"
              )}
            >
              Apps
              {location.pathname === '/apps' && (
                <motion.div 
                  layoutId="activeNav"
                  initial={false}
                  className="absolute inset-0 bg-accent rounded-full shadow-xl shadow-accent/30 -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-zinc-500/5 backdrop-blur-2xl p-1 rounded-full border border-zinc-500/10 shadow-2xl relative">
            {(['en', 'id', 'jp'] as Language[]).map((l) => (
              <button 
                key={l} 
                onClick={() => setLang(l)} 
                className={cn(
                  "px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-colors duration-500 relative z-10",
                  lang === l ? "text-white" : "opacity-30 hover:opacity-100"
                )}
              >
                {l}
                {lang === l && (
                  <motion.div 
                    layoutId="activeLang"
                    initial={false}
                    className="absolute inset-0 bg-accent rounded-full shadow-xl shadow-accent/30 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsDark(!isDark)} 
            className="w-12 h-12 rounded-full flex items-center justify-center bg-zinc-500/5 backdrop-blur-2xl border border-zinc-500/10 shadow-2xl transition-all hover:scale-110"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence mode="wait" initial={false}>
        <Routes>
          <Route path="/" element={<Home lang={lang} isDark={isDark} mousePos={{x:0, y:0}} />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/apps" element={<AppsList />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const App: React.FC = () => (
  <Router>
    <ScrollToTop />
    <AppContent />
  </Router>
);

export default App;
