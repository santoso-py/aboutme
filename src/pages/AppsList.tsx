import React from 'react';
import { motion } from 'framer-motion';

const AppsList: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-8"
      >
        <div className="text-[10px] font-black uppercase tracking-[1em] text-accent opacity-60">Ecosystem</div>
        <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
          Coming <br/> Soon.
        </h2>
        <motion.p 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="text-zinc-500 text-sm font-bold uppercase tracking-[0.5em]"
        >
          // Digital Arsenal is under construction
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AppsList;
