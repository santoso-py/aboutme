import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Sun, Moon, MapPin, Mail, Instagram, Database, Bot, Box, Bolt, 
  ChevronDown, ExternalLink, User, Terminal, Layers, Layout, 
  ArrowUpRight, Globe, Code2, Sparkles, Rocket
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { content } from './content';

function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

type Language = 'en' | 'id' | 'jp';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [isDark, setIsDark] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const t = useMemo(() => content[lang], [lang]);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const yHero = useTransform(springScroll, [0, 0.2], [0, -100]);
  const opacityHero = useTransform(springScroll, [0, 0.15], [1, 0]);
  const yAbout = useTransform(springScroll, [0.1, 0.35], [100, -50]);
  const yExp = useTransform(springScroll, [0.3, 0.55], [150, -50]);
  const yProjects = useTransform(springScroll, [0.5, 0.8], [200, -50]);
  const scaleAvatar = useTransform(springScroll, [0, 0.2], [1, 1.1]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={cn(
      "min-h-[500vh] transition-all duration-700 selection:bg-accent/20",
      isDark ? "dark text-zinc-100" : "light text-zinc-900",
      `theme-${lang}`
    )}>
      {/* BACKGROUND ELEMENTS */}
      <div className="dot-grid" />
      <div 
        className="fixed inset-0 pointer-events-none accent-glow z-0"
        style={{
          background: `radial-gradient(circle 800px at ${mousePos.x}px ${mousePos.y}px, rgb(var(--accent) / 0.1), transparent 100%)`
        }}
      />

      {/* MINIMAL NAVIGATION */}
      <nav className="fixed top-8 left-8 right-8 flex justify-between items-center z-50 px-4">
        <div className="flex items-center gap-6">
          <div className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40">San Rui</div>
          <div className="flex gap-4">
            {(['en', 'id', 'jp'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "text-[9px] font-black uppercase tracking-widest transition-all",
                  lang === l ? "text-accent scale-110" : "opacity-30 hover:opacity-100"
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => setIsDark(!isDark)} className="opacity-30 hover:opacity-100 transition-opacity">
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>

      {/* HERO SECTION */}
      <motion.section 
        style={{ y: yHero, opacity: opacityHero }}
        className="fixed inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
      >
        <motion.div style={{ scale: scaleAvatar }} className="relative mb-12">
           <img 
            src="https://lh3.googleusercontent.com/a/ACg8ocJ6dFqK_uBb6otJDaDODQeGY3B9EQFt0RDVxmYHr3C9HqbqjEM6UA=s576-c-no" 
            className="w-44 h-44 rounded-full transition-all duration-1000 object-cover border-4 border-accent/20"
            alt="San Rui"
          />
          <div className="absolute -inset-4 border border-accent/10 rounded-full animate-pulse" />
        </motion.div>

        <h1 className="text-6xl md:text-[10rem] font-black tracking-tighter uppercase leading-[0.8] mb-8">
           {t.title}
        </h1>
        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.8em] opacity-40">
          <Sparkles size={14} className="text-accent" />
          {t.role}
        </div>
        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 opacity-20"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.section>

      {/* CONTENT FLOW */}
      <div className="relative z-20 pt-[110vh]">
        
        {/* ABOUT & FOCUS */}
        <motion.section 
          style={{ y: yAbout }}
          className="max-w-4xl mx-auto px-6 py-40 mb-60"
        >
          <div className="text-[10px] font-black uppercase tracking-[0.6em] text-accent mb-12 opacity-60 flex items-center gap-4">
            <span className="w-8 h-px bg-accent/30" />
            {t.about.label}
          </div>
          <div className="text-2xl md:text-5xl font-light leading-tight tracking-tight mb-20">
            {t.about.p1}
          </div>
          <div className="grid md:grid-cols-2 gap-12 text-zinc-500 text-lg leading-relaxed">
            <p>{t.about.p2}</p>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
               {t.focus.items.map(item => (
                 <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-accent">{item}</span>
                 </div>
               ))}
            </div>
          </div>
        </motion.section>

        {/* EXPERIENCE (TRAJECTORY) */}
        <motion.section 
          style={{ y: yExp }}
          className="max-w-5xl mx-auto px-6 mb-80"
        >
          <div className="text-[10px] font-black uppercase tracking-[0.6em] text-accent mb-24 opacity-60 text-center">
            {t.experience.label}
          </div>
          
          <div className="space-y-32">
            {t.experience.items.map((item, idx) => (
              <div key={idx} className="group flex flex-col md:flex-row gap-12 relative">
                <div className="md:w-1/4 text-[10px] font-black uppercase tracking-widest opacity-30 group-hover:opacity-100 transition-opacity">
                  {item.period}
                </div>
                <div className="md:w-3/4 space-y-6">
                  <div className="flex flex-wrap items-baseline gap-4">
                    <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">{item.role}</h3>
                    <span className="text-xs font-black uppercase tracking-widest text-accent/60">{item.company}</span>
                  </div>
                  <p className="text-xl text-zinc-500 leading-relaxed font-light">{item.desc}</p>
                  <div className="flex flex-wrap gap-4 pt-4">
                    {item.tech.map(tech => (
                      <span key={tech} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 border border-zinc-500/10 rounded-full group-hover:border-accent/30 group-hover:text-accent transition-all">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PROJECTS (WORKS) */}
        <motion.section 
          style={{ y: yProjects }}
          className="max-w-6xl mx-auto px-6 mb-80"
        >
          <div className="text-[10px] font-black uppercase tracking-[0.6em] text-accent mb-24 opacity-60 text-center">
             {t.projects?.label}
          </div>
          
          <div className="space-y-60">
            {t.projects?.items.map((project, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative flex flex-col md:flex-row items-center gap-12"
              >
                <div className="md:w-1/2 space-y-8">
                   <div className="text-6xl md:text-8xl font-black opacity-[0.03] group-hover:opacity-[0.1] transition-opacity absolute -top-20 -left-10 pointer-events-none">
                     0{idx + 1}
                   </div>
                   <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase group-hover:text-accent transition-colors">
                     {project.title}
                   </h3>
                   <div className="h-px w-24 bg-accent/40" />
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/60">
                     {project.tech}
                   </p>
                   <p className="text-xl text-zinc-500 leading-relaxed font-light max-w-xl">
                     {project.desc}
                   </p>
                   <div className="flex flex-wrap gap-4 pt-4">
                    {project.details.map((detail, dIdx) => (
                      <span key={dIdx} className="text-[8px] font-black uppercase tracking-widest opacity-40">
                        // {detail}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="md:w-1/2 flex justify-end">
                   <ArrowUpRight className="opacity-10 group-hover:text-accent group-hover:opacity-100 transition-all duration-700 group-hover:translate-x-4 group-hover:-translate-y-4" size={120} strokeWidth={1} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SKILLS & CONTACT */}
        <section className="max-w-4xl mx-auto px-6 py-40 text-center space-y-40">
          
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-accent mb-16 opacity-60">
              Tech & Workflow
            </div>
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 text-sm font-black tracking-[0.3em] uppercase opacity-30">
               {['SQL', 'MySQL', 'Power BI', 'Tableau', 'Vibe Coding', 'AI Automation', 'PRD Design', 'MVP Architecture'].map(s => (
                 <span key={s} className="hover:opacity-100 hover:text-accent cursor-default transition-all duration-500">{s}</span>
               ))}
            </div>
          </div>

          <div id="contact" className="space-y-16">
            <div className="inline-block p-4 rounded-full border border-accent/10 mb-4">
               <Rocket className="text-accent animate-pulse" size={40} />
            </div>
            <h2 className="text-5xl md:text-[12rem] font-black tracking-tighter uppercase leading-[0.8] mb-12">
              Ready to <br/> scale?
            </h2>
            <div className="flex justify-center gap-16">
              <a href="mailto:snsn04@gmail.com" className="text-[10px] font-black uppercase tracking-[0.4em] hover:text-accent transition-all relative group">
                Email
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-accent group-hover:w-full transition-all" />
              </a>
              <a href="https://www.instagram.com/san.rui/" className="text-[10px] font-black uppercase tracking-[0.4em] hover:text-accent transition-all relative group">
                Instagram
                <span className="absolute -bottom-2 left-0 w-0 h-px bg-accent group-hover:w-full transition-all" />
              </a>
            </div>
          </div>

          <footer className="pt-40 pb-12 opacity-10 text-[9px] font-black tracking-[0.6em] uppercase">
            {t.footer}
          </footer>
        </section>

      </div>

      {/* SMOOTH PROGRESS BAR */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 h-1.5 bg-accent z-50 origin-left"
        style={{ scaleX: springScroll }}
      />
    </div>
  );
};

export default App;
