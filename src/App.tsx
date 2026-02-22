import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, MapPin, Mail, Instagram, Database, Bot, Box, Bolt, 
  ChevronDown, ExternalLink, User, Terminal, Layers, Layout, 
  ArrowUpRight, Globe, Code2, Sparkles, Rocket, Cpu
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { content } from './content';
import { PrototypePlayer } from './components/PrototypePlayer';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

type Language = 'en' | 'id' | 'jp';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isDark, setIsDark] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const t = useMemo(() => content[lang], [lang]);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const yHero = useTransform(springScroll, [0, 0.2], [0, -100]);
  const opacityHero = useTransform(springScroll, [0, 0.15], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <div ref={containerRef} className={cn(
      "min-h-[500vh] transition-all duration-1000 selection:bg-accent/20 relative overflow-x-hidden",
      isDark ? "dark text-zinc-100" : "light text-zinc-900",
      `theme-${lang}`
    )}>
      <div className="grain-texture" />
      <div className="dot-grid" />
      
      <div 
        className="fixed inset-0 pointer-events-none accent-glow z-0 transition-all duration-1000"
        style={{ background: `radial-gradient(circle 800px at ${mousePos.x}px ${mousePos.y}px, rgb(var(--accent) / 0.08), transparent 100%)` }}
      />

      {/* MINIMAL NAV */}
      <nav className="fixed top-8 left-8 right-8 flex justify-between items-center z-[100] px-4">
        <div className="flex items-center gap-6">
          <div className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40">San Rui</div>
          <div className="flex gap-2 bg-white/5 backdrop-blur-2xl p-1.5 rounded-full border border-white/10 shadow-2xl">
            {(['en', 'id', 'jp'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-500",
                  lang === l ? "bg-accent text-white shadow-xl shadow-accent/30" : "opacity-30 hover:opacity-100"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <button 
          onClick={() => setIsDark(!isDark)} 
          className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl transition-all hover:scale-110"
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>

      {/* HERO */}
      <motion.section style={{ y: yHero, opacity: opacityHero }} className="fixed inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: "circOut" }} className="relative mb-16">
           <img 
            src="https://lh3.googleusercontent.com/a/ACg8ocJ6dFqK_uBb6otJDaDODQeGY3B9EQFt0RDVxmYHr3C9HqbqjEM6UA=s576-c-no" 
            className="w-52 h-52 rounded-full transition-all duration-1000 object-cover border-8 border-white/5 shadow-[0_0_80px_rgba(var(--accent),0.2)]"
            alt="San Rui"
          />
          <div className="absolute -inset-6 border border-accent/10 rounded-full animate-[spin_10s_linear_infinite] border-dashed" />
          {lang === 'jp' && <div className="absolute -top-4 -right-4 bg-accent text-white px-3 py-1 rounded-lg font-black text-[10px] rotate-12">お前はもう</div>}
        </motion.div>

        <h1 className="hero-title text-7xl md:text-[13rem] font-black tracking-tighter uppercase leading-[0.75] mb-10 transition-all duration-1000">
           {t.title}
        </h1>
        <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[1em] opacity-30">
          <div className="w-12 h-px bg-accent/50" />
          {t.role}
          <div className="w-12 h-px bg-accent/50" />
        </div>
      </motion.section>

      {/* CONTENT FLOW */}
      <div className="relative z-20 pt-[110vh]">
        <div className="max-w-6xl mx-auto space-y-80 pb-80 px-6">
          
          {/* ABOUT */}
          <motion.section initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-4xl mx-auto text-center">
            <div className="text-[10px] font-black uppercase tracking-[0.6em] text-accent mb-16 opacity-60">Philosophy</div>
            <div className="text-3xl md:text-6xl font-light leading-[1.1] tracking-tight mb-24 italic">
              {t.about.p1}
            </div>
            <div className="grid md:grid-cols-2 gap-20 text-zinc-500 text-xl leading-relaxed text-left">
              <p className="font-light">{t.about.p2}</p>
              <div className="flex flex-wrap gap-x-10 gap-y-6">
                 {t.focus.items.map(item => (
                   <div key={item} className="flex items-center gap-4 group cursor-default">
                      <div className="w-2 h-2 rounded-full bg-accent transition-all group-hover:scale-[2.5] shadow-[0_0_10px_rgba(var(--accent),0.5)]" />
                      <span className="text-xs font-black uppercase tracking-widest text-accent group-hover:translate-x-2 transition-transform">{item}</span>
                   </div>
                 ))}
              </div>
            </div>
          </motion.section>

          {/* EXPERIENCE */}
          <section>
            <div className="text-[10px] font-black uppercase tracking-[0.6em] text-accent mb-32 opacity-60 text-center">Trajectory</div>
            <div className="space-y-40">
              {t.experience.items.map((item, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: idx * 0.1 }} className="group flex flex-col md:flex-row gap-16 relative text-left">
                  <div className="md:w-1/4 text-[11px] font-black uppercase tracking-[0.3em] opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all duration-700">{item.period}</div>
                  <div className="md:w-3/4 space-y-8">
                    <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase transition-all duration-700">{item.role}</h3>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-px bg-accent/30" />
                       <span className="text-sm font-black uppercase tracking-widest text-accent/60">{item.company}</span>
                    </div>
                    <p className="text-2xl text-zinc-500 leading-snug font-light max-w-3xl">{item.desc}</p>
                    <div className="flex flex-wrap gap-3 pt-6">
                      {item.tech.map(tech => (
                        <span key={tech} className="text-[10px] font-black uppercase tracking-widest px-5 py-2 border border-zinc-500/10 rounded-full hover:border-accent hover:text-accent transition-all duration-500 bg-white/5">{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" className="relative">
            <div className="text-[10px] font-black uppercase tracking-[0.6em] text-accent mb-32 opacity-60 text-center">Interactive Lab</div>
            <div className="relative">
               <PrototypePlayer />
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="text-center space-y-40">
            <div className="space-y-20">
              <h2 className="text-6xl md:text-[15rem] font-black tracking-tighter uppercase leading-[0.75] transition-all duration-1000">
                Let's <br/> Scale.
              </h2>
              <div className="flex justify-center gap-24">
                {['Email', 'Instagram'].map(link => (
                  <a key={link} href={link === 'Email' ? 'mailto:snsn04@gmail.com' : 'https://www.instagram.com/san.rui/'} className="text-xs font-black uppercase tracking-[0.5em] hover:text-accent transition-all duration-500 relative group py-4">
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-700" />
                  </a>
                ))}
              </div>
            </div>
            <footer className="pt-40 opacity-10 text-[10px] font-bold tracking-[1em] uppercase">{t.footer}</footer>
          </section>

        </div>
      </div>
      
      <motion.div className="fixed bottom-0 left-0 right-0 h-2 bg-accent z-[100] origin-left shadow-[0_-10px_20px_rgba(var(--accent),0.3)]" style={{ scaleX: springScroll }} />
    </div>
  );
};

export default App;
