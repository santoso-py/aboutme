import React from 'react';
import { motion } from 'framer-motion';
import { PrototypePlayer } from '../components/PrototypePlayer';

const Lab: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 max-w-6xl mx-auto px-6 pb-40"
    >
      <div className="mb-24">
        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-accent mb-4 block">Experimental</span>
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
          Interactive <br/> Lab.
        </h2>
      </div>

      <div className="relative">
        <PrototypePlayer />
      </div>
    </motion.div>
  );
};

export default Lab;
