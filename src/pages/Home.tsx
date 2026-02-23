import React, { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Sun, Moon, MapPin, Mail, Instagram, ChevronDown, 
  ExternalLink, User, Layers, Layout, ArrowUpRight, 
  Sparkles, Rocket, Cpu, Linkedin
} from 'lucide-react';
import { content } from '../content';
import { PrototypePlayer } from '../components/PrototypePlayer';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

interface HomeProps {
  lang: 'en' | 'id' | 'jp';
  isDark: boolean;
  mousePos: { x: number; y: number };
}

const Home: React.FC<HomeProps> = ({ lang, isDark }) => {
  const containerRef = useRef(null);
  const t = useMemo(() => content[lang], [lang]);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const yHero = useTransform(springScroll, [0, 0.2], [0, -100]);
  const opacityHero = useTransform(springScroll, [0, 0.15], [1, 0]);

  // Luxury Staggered Variants for Scroll Trigger - SNAPPY VERSION
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      scale: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div ref={containerRef}>
      {/* HERO - TRIGGERS ONCE */}
      <motion.section 
        style={{ y: yHero, opacity: opacityHero }} 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="fixed inset-0 flex flex-col items-center justify-center text-center px-6 z-10"
      >
        <motion.div variants={itemVariants} className="relative mb-16">
           <img 
            src="https://lh3.googleusercontent.com/a/ACg8ocJ6dFqK_uBb6otJDaDODQeGY3B9EQFt0RDVxmYHr3C9HqbqjEM6UA=s576-c-no" 
            className="w-52 h-52 rounded-full transition-all duration-1000 object-cover border-8 border-white/5 shadow-[0_0_80px_rgba(var(--accent),0.2)]"
            alt="San Rui"
          />
          <div className="absolute -inset-6 border border-accent/10 rounded-full animate-[spin_10s_linear_infinite] border-dashed" />
          {lang === 'jp' && <div className="absolute -top-4 -right-4 bg-accent text-white px-3 py-1 rounded-lg font-black text-[10px] rotate-12">お前はもう</div>}
        </motion.div>

        <motion.h1 variants={itemVariants} className="hero-title text-7xl md:text-[13rem] font-black tracking-tighter uppercase leading-[0.75] mb-10 transition-all duration-1000">
           {t.title}
        </motion.h1>
        
        <motion.div variants={itemVariants} className="flex items-center gap-6 text-[11px] font-black uppercase tracking-[1em] opacity-30">
          <div className="w-12 h-px bg-accent/50" />
          {t.role}
          <div className="w-12 h-px bg-accent/50" />
        </motion.div>
      </motion.section>

      {/* CONTENT FLOW */}
      <div className="relative z-20 pt-[110vh]">
        <div className="max-w-6xl mx-auto space-y-80 pb-80 px-6">
          
          {/* ABOUT - TRIGGERS ON SCROLL */}
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="text-[10px] font-black uppercase tracking-[0.6em] text-accent mb-16 opacity-60">Philosophy</motion.div>
            <motion.div variants={itemVariants} className="text-3xl md:text-6xl font-light leading-[1.1] tracking-tight mb-24 italic text-balance">
              {t.about.p1}
            </motion.div>
            <div className="grid md:grid-cols-2 gap-20 text-zinc-500 text-xl leading-relaxed text-left">
              <motion.p variants={itemVariants} className="font-light">{t.about.p2}</motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-x-10 gap-y-6">
                 {t.focus.items.map(item => (
                   <div key={item} className="flex items-center gap-4 group cursor-default">
                      <div className="w-2 h-2 rounded-full bg-accent transition-all group-hover:scale-[2.5] shadow-[0_0_10px_rgba(var(--accent),0.5)]" />
                      <span className="text-xs font-black uppercase tracking-widest text-accent group-hover:translate-x-2 transition-transform">{item}</span>
                   </div>
                 ))}
              </motion.div>
            </div>
          </motion.section>

          {/* EXPERIENCE - STAGGERED PER ITEM */}
          <section>
            <div className="text-[10px] font-black uppercase tracking-[0.6em] text-accent mb-32 opacity-60 text-center">Trajectory</div>
            <div className="space-y-40">
              {t.experience.items.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  variants={itemVariants}
                  className="group flex flex-col md:flex-row gap-16 relative"
                >
                  <div className="md:w-1/4 text-[11px] font-black uppercase tracking-[0.3em] opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all duration-700">{item.period}</div>
                  <div className="md:w-3/4 space-y-8 text-left">
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

          {/* PROJECTS SELECTOR - FIX REVEAL */}
          <section id="projects" className="relative">
            <div className="text-[10px] font-black uppercase tracking-[0.6em] text-accent mb-32 opacity-60 text-center">Selected Works</div>
            <div className="space-y-4 w-full max-w-5xl mx-auto">
              {[
                { id: 'cms', title: 'Approval Matrix System', sub: 'Logic Wizard' },
                { id: 'dashboard', title: 'Unified Ops Dashboard', sub: 'Monitoring Control' },
                { id: 'attendance', title: 'Geo-Tracking Mobile', sub: 'Site Validation' },
                { id: 'bot', title: 'Automated Support Bot', sub: 'AI Ticketing' }
              ].map((p, i) => (
                <Link 
                  key={p.id} 
                  to={`/lab?project=${p.id}`}
                  className="group block w-full text-left border-b border-zinc-500/10 py-12 hover:border-accent transition-all relative overflow-hidden"
                >
                  <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    variants={itemVariants}
                    className="flex items-baseline justify-between relative z-10"
                  >
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 group-hover:text-accent group-hover:opacity-100 transition-all">{p.sub}</span>
                      <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter transition-all duration-700">
                        {p.title}
                      </h3>
                    </div>
                    <ArrowUpRight size={48} className="opacity-10 group-hover:opacity-100 group-hover:text-accent transition-all" />
                  </motion.div>
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 text-9xl font-black opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity uppercase tracking-tighter italic">
                    {p.id}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* CONTACT - UPDATED WITH LINKEDIN */}
          <section id="contact" className="text-center min-h-[80vh] flex flex-col justify-center relative">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={containerVariants}
              className="space-y-20 py-20"
            >
              <div className="relative inline-block">
                <motion.div 
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-16 -right-16 text-accent/40 hidden md:block"
                >
                  <Sparkles size={80} strokeWidth={1} />
                </motion.div>
                
                <motion.h2 variants={itemVariants} className="text-6xl md:text-[15rem] font-black tracking-tighter uppercase leading-[0.75] transition-all duration-1000">
                  LET'S <br/> CONNECT
                </motion.h2>
              </div>
              
              <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-12 md:gap-24 px-4 pb-20">
                {[
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/santoso-68511020a/', icon: Linkedin },
                  { label: 'Email', href: 'mailto:snsn04@gmail.com', icon: Mail },
                  { label: 'Instagram', href: 'https://www.instagram.com/san.rui/', icon: Instagram }
                ].map(link => (
                  <a 
                    key={link.label} 
                    href={link.href} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-black uppercase tracking-[0.5em] hover:text-accent transition-all duration-500 relative group py-4 flex items-center gap-3"
                  >
                    <link.icon size={14} className="opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-accent group-hover:w-full transition-all duration-700" />
                  </a>
                ))}
              </motion.div>
            </motion.div>
            
            <footer className="absolute bottom-12 left-0 right-0 opacity-10 text-[10px] font-bold tracking-[1em] uppercase">
              {t.footer}
            </footer>
          </section>

        </div>
      </div>
      
      <motion.div className="fixed bottom-0 left-0 right-0 h-2 bg-accent z-[100] origin-left shadow-[0_-10px_20px_rgba(var(--accent),0.3)]" style={{ scaleX: springScroll }} />
    </div>
  );
};

export default Home;
