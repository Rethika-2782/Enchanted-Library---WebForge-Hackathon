import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface MagicalBookProps {
  isOpen: boolean;
  showContent: boolean;
  onOpen: () => void;
  children: ReactNode;
}

export default function MagicalBook({ isOpen, showContent, onOpen, children }: MagicalBookProps) {
  return (
    <div className="relative" style={{ perspective: '2000px' }}>
      {/* Book Container */}
      <motion.div
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateX: isOpen ? 0 : 10,
          rotateY: isOpen ? -15 : 0,
        }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        {/* Book spine shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#1a0f08] to-transparent z-30" />

        {/* Back Cover (static) */}
        <div className="relative w-80 md:w-96 h-96 md:h-[28rem] bg-gradient-to-br from-[#2a1810] via-[#3d2817] to-[#2a1810] rounded-r-lg rounded-l-sm shadow-2xl border-4 border-[#1a0f08]">
          {/* Leather texture effect */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#1a0f08]"
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Gold border design */}
          <div className="absolute inset-3 border-2 border-[#D4AF37]/40 rounded pointer-events-none" />
          <div className="absolute inset-6 border border-[#D4AF37]/20 rounded pointer-events-none" />

          {/* Center emblem */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 rounded-full border-4 border-[#D4AF37]/50 flex items-center justify-center bg-[#1a0f08]/50">
              <span className="text-4xl">📖</span>
            </div>
          </div>

          {/* Corner decorations */}
          {[
            'top-4 left-4',
            'top-4 right-4',
            'bottom-4 left-4',
            'bottom-4 right-4',
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-8 h-8 border-2 border-[#D4AF37]/30 rounded-full pointer-events-none`}
            />
          ))}
        </div>

        {/* Front cover (animated) */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full origin-left"
          style={{ transformStyle: 'preserve-3d' }}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? -160 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Front cover face */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#2a1810] via-[#3d2817] to-[#2a1810] rounded-r-lg rounded-l-sm shadow-2xl border-4 border-[#1a0f08]"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Leather texture */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-[#1a0f08]"
                  style={{
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            {/* Gold borders */}
            <div className="absolute inset-3 border-2 border-[#D4AF37]/40 rounded pointer-events-none" />
            <div className="absolute inset-6 border border-[#D4AF37]/20 rounded pointer-events-none" />

            {/* Title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="w-20 h-20 rounded-full border-4 border-[#D4AF37]/50 flex items-center justify-center bg-[#1a0f08]/50 mb-4">
                <span className="text-3xl">📚</span>
              </div>
              <h2 className="text-[#D4AF37] font-serif text-xl tracking-wider">Enchanted</h2>
              <p className="text-[#D4AF37]/70 text-sm tracking-widest mt-1">LIBRARY</p>
            </div>
          </div>

          {/* Inside of front cover (the page that shows when opened) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#F5E9D3] via-[#EAD7B7] to-[#F5E9D3] rounded-r-lg rounded-l-sm"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Paper texture lines */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 border-t border-[#8B5E3C]/30"
                  style={{ top: `${i * 5}%` }}
                />
              ))}
            </div>

            {/* Margin line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#D4AF37]/20 pointer-events-none" />
          </div>
        </motion.div>

        {/* Pages (middle content area) - This is where the form goes */}
        <AnimatePresence>
          {isOpen && showContent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none" // Container doesn't accept events
            >
              {/* Content wrapper - THIS MUST ACCEPT POINTER EVENTS */}
              <div className="w-full h-full pointer-events-auto overflow-y-auto">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Magical glow effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 0.5 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-[#D4AF37]/20 via-transparent to-transparent" />
        </motion.div>

        {/* Floating particles around the book */}
        {isOpen && (
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-[#D4AF37] rounded-full opacity-60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.6, 0.2, 0.6],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}