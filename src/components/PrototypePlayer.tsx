import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Layout, Ticket, UserCheck, Settings, 
  ChevronRight, ArrowLeft, 
  CheckCircle2, Clock, MapPin, Search, 
  Filter, Plus, MoreVertical, Database,
  Bot, ShieldCheck, Mail, Send, AlertTriangle, Sparkles,
  Users, Activity, Zap, Terminal as TerminalIcon,
  Calculator, Truck, LineChart, Sun, Cloud, HandMetal, ArrowUpRight
} from 'lucide-react';

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

type ProjectType = 'cms' | 'dashboard' | 'attendance' | 'bot';

export const PrototypePlayer: React.FC = () => {
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

  const projects = [
    { id: 'cms' as ProjectType, title: 'Approval Matrix System', sub: 'Logic Wizard' },
    { id: 'dashboard' as ProjectType, title: 'Unified Ops Dashboard', sub: 'Monitoring Control' },
    { id: 'attendance' as ProjectType, title: 'Geo-Tracking Mobile', sub: 'Site Validation' },
    { id: 'bot' as ProjectType, title: 'Automated Support Bot', sub: 'AI Ticketing' }
  ];

  return (
    <div className="w-full min-h-[750px] flex flex-col relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!activeProject ? (
          <motion.div 
            key="selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            className="flex-1 flex flex-col items-center justify-center p-6"
          >
            <div className="space-y-4 w-full max-w-5xl">
              {projects.map((p, i) => (
                <motion.button
                  key={p.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveProject(p.id)}
                  className="group block w-full text-left border-b border-zinc-500/10 py-8 hover:border-accent transition-all relative overflow-hidden"
                >
                  <div className="flex items-baseline justify-between relative z-10">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 group-hover:text-accent group-hover:opacity-100 transition-all">{p.sub}</span>
                      <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter transition-all duration-700">
                        {p.title}
                      </h3>
                    </div>
                    <ArrowUpRight size={48} className="opacity-10 group-hover:opacity-100 group-hover:text-accent transition-all" />
                  </div>
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 text-9xl font-black opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity uppercase tracking-tighter italic">
                    {p.id}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="player"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-1 flex flex-col glass-card-luxury border border-zinc-500/10 rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <div className="hologram-scan" />
            <div className="px-10 py-6 border-b border-zinc-500/10 flex justify-between items-center bg-white/5 backdrop-blur-3xl">
              <button 
                onClick={() => setActiveProject(null)}
                className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-accent transition-all"
              >
                <ArrowLeft size={16} /> Exit Prototype
              </button>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-30">Simulation Active // 0{projects.findIndex(p => p.id === activeProject) + 1}</span>
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              </div>
            </div>

            <div className="flex-1 bg-[#fcfcfc] dark:bg-zinc-950 overflow-auto overflow-x-hidden relative">
              {activeProject === 'cms' && <CMSPrototype />}
              {activeProject === 'dashboard' && <DashboardPrototype />}
              {activeProject === 'attendance' && <AttendancePrototype />}
              {activeProject === 'bot' && <BotPrototype />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- CMS: FULL FUNCTIONAL LOGIC ---
const CMSPrototype = () => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({ type: 'PV', user: 'San Rui', role: 'Supervisor', coverage: 'All Companies (*)' });
  const users = [{ name: 'Ahmad Subarjo', role: 'BOD' }, { name: 'Siti Aminah', role: 'Finance Mgr' }, { name: 'San Rui', role: 'Supervisor' }, { name: 'Budi Santoso', role: 'Staff' }];

  return (
    <div className="p-12 max-w-4xl mx-auto space-y-12 h-full flex flex-col justify-center">
      <div className="flex justify-between items-center pb-8 border-b border-zinc-100 dark:border-zinc-900">
        <div>
          <h4 className="text-4xl font-black uppercase tracking-tighter">Matrix Builder</h4>
          <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.3em]">Step {step} of 3 // {step === 1 ? 'Module' : step === 2 ? 'Identity' : 'Result'}</p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map(i => <div key={i} className={cn("w-16 h-1.5 rounded-full transition-all duration-700", i <= step ? "bg-accent" : "bg-zinc-200 dark:bg-zinc-800")} />)}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['PV', 'JV', 'RV', 'LPJ'].map(t => (
                <button key={t} onClick={() => setConfig({...config, type: t})} className={cn("p-10 rounded-[3rem] border-2 transition-all flex flex-col items-center gap-4 group", config.type === t ? "border-accent bg-accent/5 shadow-2xl shadow-accent/5 scale-105" : "border-zinc-100 dark:border-zinc-900 opacity-40 hover:opacity-100")}>
                  <div className={cn("w-14 h-14 rounded-full flex items-center justify-center transition-transform", config.type === t ? "bg-accent text-white" : "bg-zinc-100 dark:bg-zinc-800")}>
                    <Database size={24} />
                  </div>
                  <span className="font-black text-xs tracking-widest">{t}</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="w-full py-8 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-[2.5rem] font-black uppercase text-sm tracking-[0.4em] shadow-2xl active:scale-95 transition-all">Next: User Assignment</button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Target User</label>
                <div className="grid gap-3">
                  {users.map(u => (
                    <button key={u.name} onClick={() => setConfig({...config, user: u.name, role: u.role})} className={cn("p-5 text-left rounded-2xl border transition-all text-sm font-black uppercase tracking-tight", config.user === u.name ? "border-accent bg-accent/5" : "border-zinc-100 dark:border-zinc-800 opacity-40")}>
                      {u.name} <span className="opacity-30 ml-2 text-[10px] font-bold">// {u.role}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Coverage Scope</label>
                {['All Companies (*)', 'Java Region', 'Sumatera Region'].map(scope => (
                  <button key={scope} onClick={() => setConfig({...config, coverage: scope})} className={cn("w-full p-5 text-left rounded-2xl border transition-all text-sm font-black uppercase tracking-tight mb-3", config.coverage === scope ? "border-accent bg-accent/5" : "border-zinc-100 dark:border-zinc-900 opacity-40")}>
                    {scope}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-6">
              <button onClick={() => setStep(1)} className="flex-1 py-8 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] font-black uppercase text-xs tracking-widest">Back</button>
              <button onClick={() => setStep(3)} className="flex-[2] py-8 bg-accent text-white rounded-[2.5rem] font-black uppercase text-sm tracking-[0.4em] shadow-2xl active:scale-95 transition-all">Generate Matrix</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-10">
            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20"><CheckCircle2 size={48} /></div>
            <h5 className="text-4xl font-black uppercase tracking-tighter">Configuration Ready</h5>
            <div className="p-10 bg-zinc-900 rounded-[3rem] text-left font-mono text-[12px] border border-zinc-800 shadow-3xl overflow-hidden relative group">
               <div className="text-zinc-500 mb-6">// Vibe Coding Auto-Generated Script</div>
               <span className="text-indigo-400">INSERT INTO</span> matrix_finance (module, user, role, scope) <br/>
               <span className="text-emerald-400">VALUES</span> (
                 <span className="text-orange-400">'{config.type}'</span>, 
                 <span className="text-orange-400">'{config.user}'</span>, 
                 <span className="text-orange-400">'{config.role}'</span>, 
                 <span className="text-orange-400">'{config.coverage}'</span>
               );
            </div>
            <button onClick={() => setStep(1)} className="text-[11px] font-black uppercase tracking-[0.5em] opacity-40 hover:opacity-100 transition-all hover:text-accent">Reset Configuration</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- DASHBOARD: DYNAMIC INTERACTION ---
const DashboardPrototype = () => {
  const [activeTab, setActiveTab] = useState('Daily');
  const [isSyncing, setIsSyncing] = useState(false);

  return (
    <div className="p-12 space-y-12 text-zinc-900 dark:text-zinc-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-12 border-b border-zinc-100 dark:border-zinc-900">
        <div className="flex items-center gap-8">
          <div className="w-20 h-20 rounded-[2rem] bg-accent text-white flex items-center justify-center shadow-2xl rotate-3"><HandMetal size={40} /></div>
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter">Unified Operations</h2>
            <p className="text-[11px] font-black opacity-30 uppercase tracking-[0.4em]">Live Intelligence Terminal</p>
          </div>
        </div>
        <button onClick={() => {setIsSyncing(true); setTimeout(()=>setIsSyncing(false), 1500)}} className="flex items-center gap-6 bg-zinc-100 dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-accent transition-all group">
           <div className="text-right">
             <div className="text-2xl font-black tabular-nums">{isSyncing ? 'SYNCING...' : '12:42'}</div>
             <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest">System Status: {isSyncing ? 'Busy' : 'Optimal'}</div>
           </div>
           <Cloud className={cn("text-sky-500 transition-transform duration-1000", isSyncing && "animate-bounce scale-125")} size={32} />
        </button>
      </div>

      <div className="space-y-8">
        <div className="flex gap-2 border-b border-zinc-100 dark:border-zinc-900">
          {['Daily', 'Weekly', 'MTD'].map(t => (
            <button key={t} onClick={() => setActiveTab(t)} className={cn("px-10 py-5 text-[11px] font-black uppercase tracking-[0.3em] transition-all relative", activeTab === t ? "text-accent" : "opacity-30")}>
              {t}
              {activeTab === t && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-accent" />}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
           <div className="md:col-span-2 p-12 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[4rem] space-y-10 shadow-sm hover:shadow-xl transition-all">
              <h5 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-4"><Ticket size={32} className="text-accent" /> {activeTab} Summary</h5>
              <div className="grid grid-cols-2 gap-16">
                <motion.div key={activeTab+'1'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <div className="text-7xl font-black tracking-tighter">{activeTab === 'Daily' ? '1,284' : activeTab === 'Weekly' ? '8,421' : '32,104'}</div>
                  <div className="text-[11px] font-black uppercase opacity-40 tracking-[0.3em]">Tickets Created</div>
                </motion.div>
                <motion.div key={activeTab+'2'} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <div className="text-7xl font-black tracking-tighter text-emerald-500">{activeTab === 'Daily' ? '942' : activeTab === 'Weekly' ? '7,102' : '29,842'}</div>
                  <div className="text-[11px] font-black uppercase opacity-40 tracking-[0.3em]">Resolved</div>
                </motion.div>
              </div>
           </div>
           <div className="p-10 bg-accent text-white rounded-[4rem] flex flex-col justify-between overflow-hidden relative group">
              <Sparkles className="absolute top-0 right-0 p-10 opacity-20 -rotate-12 group-hover:scale-110 transition-transform duration-1000" size={200} />
              <div className="space-y-6 relative z-10">
                <h5 className="text-[11px] font-black uppercase tracking-[0.4em] opacity-60">AI Logic Engine</h5>
                <p className="text-3xl font-light leading-snug italic">Traffic log mendeteksi kenaikan anomali di <span className="font-black">Sektor Selatan</span>. Audit segera disarankan.</p>
              </div>
              <button className="w-fit px-8 py-4 bg-white text-accent rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-3xl relative z-10 active:scale-95 transition-all">Run Diagnostics</button>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- ATTENDANCE: FULL SIMULATION ---
const AttendancePrototype = () => {
  const [state, setState] = useState<'idle' | 'detecting' | 'success'>('idle');
  const [location, setLocation] = useState('Detecting current position...');

  const handleClockIn = () => {
    setState('detecting');
    setTimeout(() => { setLocation('PT Pitjarus Teknologi HQ (Within Range)'); setState('success'); }, 2500);
  };

  return (
    <div className="p-16 max-w-xl mx-auto h-full flex flex-col justify-center gap-12 text-zinc-900 dark:text-zinc-100">
      <div className="text-center space-y-6">
        <div className="w-32 h-32 bg-zinc-100 dark:bg-zinc-900 rounded-[4rem] flex items-center justify-center mx-auto border border-zinc-200 dark:border-zinc-800 rotate-6 shadow-2xl">
          <MapPin size={56} className={cn("transition-colors duration-1000", state === 'success' ? 'text-green-500' : 'text-accent')} />
        </div>
        <div>
          <h4 className="text-5xl font-black tracking-tighter uppercase italic">Geo-Log v4</h4>
          <p className="text-[11px] font-black uppercase tracking-[0.5em] opacity-40">Precision Site Validation</p>
        </div>
      </div>

      <div className="p-10 bg-white dark:bg-zinc-900 rounded-[3.5rem] border border-zinc-200 dark:border-zinc-800 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] space-y-10 relative overflow-hidden">
        {state === 'detecting' && <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} className="absolute top-0 left-0 right-0 h-1.5 bg-accent shadow-[0_0_15px_rgba(var(--accent),0.5)]" />}
        <div className="space-y-6">
          <label className="text-[11px] font-black uppercase tracking-[0.4em] opacity-40">Current Status</label>
          <div className={cn("p-8 rounded-3xl border transition-all flex items-center justify-between", state === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : 'border-zinc-100 dark:border-zinc-800')}>
            <div className="flex items-center gap-6">
              {state === 'detecting' ? <Activity className="animate-spin text-accent" size={24} /> : <div className={cn("w-4 h-4 rounded-full animate-pulse", state === 'success' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-zinc-300')} />}
              <span className="text-sm font-black uppercase tracking-widest">{state === 'idle' ? 'Ready to Clock-in' : state === 'detecting' ? 'Validating Site...' : 'Verified Successfully'}</span>
            </div>
          </div>
          <div className="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl text-[11px] font-mono opacity-60 leading-relaxed italic border border-zinc-100 dark:border-zinc-800">{location}</div>
        </div>
        <button onClick={handleClockIn} disabled={state !== 'idle'} className={cn("w-full py-8 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.5em] shadow-3xl transition-all active:scale-95 flex items-center justify-center gap-4", state === 'success' ? 'bg-green-500 text-white' : 'bg-accent text-white shadow-accent/20')}>{state === 'idle' ? <><Zap size={20} /> Submit Clock-In</> : state === 'detecting' ? 'Processing...' : 'Finished'}</button>
        {state === 'success' && <button onClick={() => {setState('idle'); setLocation('Detecting pos...');}} className="w-full text-[10px] font-black uppercase tracking-[0.4em] opacity-30 hover:opacity-100 transition-all">Reset Simulation</button>}
      </div>
    </div>
  );
};

// --- BOT: FULL INTERACTIVE CHAT ---
const BotPrototype = () => {
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Welcome back, San Rui. Our neural engine is active. How can I optimize your workflow today? Ketik "ticket" atau "status".' }]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let reply = 'Maaf, saya belum memahami perintah tersebut. Coba ketik "ticket" atau "status".';
      if (userMsg.toLowerCase().includes('ticket')) reply = 'Baik, sedang menyiapkan form tiket... ID Tiket: #SR-2026-X1. Teknisi di lapangan telah diberitahu.';
      if (userMsg.toLowerCase().includes('status')) reply = 'Status tiket #SR-2026-X1 Anda saat ini: ON PROGRESS oleh Teknisi Budi.';
      setMessages(prev => [...prev, { role: 'bot', text: reply }]);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-zinc-50 dark:bg-zinc-950">
      <div className="flex-1 p-10 space-y-8 overflow-auto flex flex-col">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("max-w-[80%] p-8 rounded-[3rem] text-sm shadow-sm relative group mb-4", m.role === 'bot' ? "bg-white dark:bg-zinc-900 self-start rounded-tl-none border border-zinc-200 dark:border-zinc-800" : "bg-accent self-end ml-auto rounded-tr-none text-white shadow-3xl shadow-accent/20")}>
              {m.role === 'bot' && <div className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent"><Bot size={20} /></div>}
              <p className="leading-relaxed font-bold italic tracking-tight text-lg">"{m.text}"</p>
            </motion.div>
          ))}
          {isTyping && (
            <div className="self-start p-6 bg-white dark:bg-zinc-900 rounded-full flex gap-2 border border-zinc-100 dark:border-zinc-800">
              {[0, 0.2, 0.4].map(d => <div key={d} className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: d+'s' }} />)}
            </div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-10 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-900 flex gap-6 items-center shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
        <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>e.key==='Enter'&&handleSend()} className="flex-1 px-10 py-6 bg-zinc-100 dark:bg-zinc-800 rounded-full border-none outline-none text-sm font-black tracking-widest uppercase" placeholder="Type command: 'ticket'..." />
        <button onClick={handleSend} className="w-20 h-20 bg-accent text-white rounded-full flex items-center justify-center shadow-3xl shadow-accent/30 active:scale-90 transition-all shrink-0"><Send size={28} /></button>
      </div>
    </div>
  );
};
