"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DealDoneFlower } from "./BrandMark";
import { sound } from "./SoundEngine";

interface SceneProps {
  progress: number; // 0 to 1 for this scene (30s-36s)
  active: boolean;
}

export default function Scene08({ progress, active }: SceneProps) {
  // 0.0 - 0.45: Words sequence (BUY. SELL. DISCOVER. CONNECT.)
  // 0.45 - 1.0: Final DealDone Logo reveal and hold
  const showFinalLogo = progress > 0.42;

  useEffect(() => {
    if (active && showFinalLogo) {
      sound.playLogoChord();
    }
  }, [active, showFinalLogo]);

  if (!active && (progress < 0 || progress > 1)) return null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#faf8f4] via-[#f4efe5] to-[#e8e2d4] flex flex-col items-center justify-center">
      {/* Radiant ambient bloom behind logo */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.15, 0.28, 0.15],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#d4e84a] via-[#f97316] to-[#0a3d2e] blur-[120px] pointer-events-none"
      />

      {/* Subtle fine concentric circles for high-end studio symmetry */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
        <div className="w-[320px] h-[320px] rounded-full border border-[#0a3d2e]/10" />
        <div className="w-[520px] h-[520px] rounded-full border border-[#0a3d2e]/10" />
        <div className="w-[720px] h-[720px] rounded-full border border-[#0a3d2e]/5" />
      </div>

      <AnimatePresence mode="wait">
        {!showFinalLogo ? (
          /* SEQUENCE OF POWERFUL WORDS: BUY. SELL. DISCOVER. CONNECT. */
          <motion.div
            key="words-sequence"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center select-none z-20"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 max-w-4xl px-8">
              {["BUY.", "SELL.", "DISCOVER.", "CONNECT."].map((word, idx) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.18,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`text-[clamp(2.5rem,5.5vw,5.5rem)] font-black tracking-[-0.04em] leading-tight ${
                    idx === 3
                      ? "text-[#f97316]"
                      : "text-[#0a3d2e]"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-[#0a3d2e]"
            >
              Every deal, made locally.
            </motion.p>
          </motion.div>
        ) : (
          /* FINAL DEALDONE LOGO REVEAL & TAGLINE HOLD */
          <motion.div
            key="final-logo"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center select-none z-20"
          >
            {/* Flower Mark in Majestic Size */}
            <motion.div
              initial={{ rotate: -180, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="drop-shadow-[0_20px_40px_rgba(10,61,46,0.2)]"
            >
              <DealDoneFlower size={92} />
            </motion.div>

            {/* DealDone Wordmark */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(3.5rem,8vw,7rem)] font-black tracking-tight text-[#0a3d2e] leading-none mt-6"
            >
              Deal<span className="text-[#f97316]">Done</span>
            </motion.h1>

            {/* Tagline: YOUR LOCAL MARKETPLACE */}
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.1em" }}
              animate={{ opacity: 1, letterSpacing: "0.28em" }}
              transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm md:text-base font-extrabold uppercase text-[#0a3d2e]/70 mt-3"
            >
              YOUR LOCAL MARKETPLACE
            </motion.p>

            {/* Subtle store / web badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="px-4 py-2 rounded-full bg-white/90 border border-[#0a3d2e]/10 text-xs font-bold text-[#0a3d2e] shadow-sm backdrop-blur-md">
                dealdone.in
              </div>
              <div className="px-4 py-2 rounded-full bg-[#0a3d2e] text-white text-xs font-bold shadow-md shadow-emerald-950/20">
                Start Exploring Today
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Scene indicator */}
      <div className="absolute bottom-8 text-xs font-mono tracking-widest text-[#0a3d2e]/30 z-30">
        08 / 08 • FINALE
      </div>
    </div>
  );
}
