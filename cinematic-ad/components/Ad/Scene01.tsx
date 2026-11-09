"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { DealDoneFlower } from "./BrandMark";

interface SceneProps {
  progress: number; // 0 to 1 for this scene (0-4s)
  active: boolean;
}

export default function Scene01({ progress, active }: SceneProps) {
  if (!active && (progress < 0 || progress > 1)) return null;

  // Custom easing matching cinematic motion studio rhythm
  // Sub-stages within 0s to 4s:
  // 0 - 1.2s: "FIND" enters with immense impact
  // 1.2 - 2.8s: "WHAT YOU LOVE." lands + realistic product hero card floats in with depth
  // 2.8 - 4.0s: camera drifts, card begins transition glide

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#faf8f5] via-[#f5f2eb] to-[#ece8df] flex items-center justify-center">
      {/* Subtle architectural studio backdrop gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_65%_45%,rgba(249,115,22,0.06),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(10,61,46,0.04),transparent_50%)] pointer-events-none" />

      {/* Subtle studio grid lines for high-end depth */}
      <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Top Brand Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-8 left-12 flex items-center gap-3 z-30"
      >
        <DealDoneFlower size={36} />
        <span className="font-black text-xl tracking-tight text-[#0a3d2e]">
          Deal<span className="text-[#f97316]">Done</span>
        </span>
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#0a3d2e]/40 ml-2 border-l border-[#0a3d2e]/15 pl-3">
          Local Marketplace
        </span>
      </motion.div>

      {/* Scene indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="absolute top-8 right-12 text-xs font-mono tracking-widest text-[#0a3d2e] z-30"
      >
        01 / 08 • INTRO
      </motion.div>

      {/* MAIN COMPOSITION */}
      <div className="relative w-full max-w-7xl h-full mx-auto px-12 flex items-center justify-between z-20">
        {/* Left Column: Oversized Powerful Typography */}
        <div className="flex-1 flex flex-col justify-center max-w-2xl">
          <div className="overflow-hidden py-2">
            <motion.h1
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15,
              }}
              className="text-[clamp(4.5rem,10vw,8.5rem)] font-black leading-[0.88] tracking-[-0.05em] text-[#0a3d2e]"
            >
              FIND
            </motion.h1>
          </div>

          <div className="overflow-hidden py-1">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.65,
              }}
              className="text-[clamp(2.5rem,5.5vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em] text-[#1c2925]"
            >
              WHAT YOU <span className="text-[#f97316]">LOVE.</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex items-center gap-4"
          >
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#0a3d2e]/10 shadow-sm backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-semibold text-[#0a3d2e]/80">
                Verified Nearby Deals
              </span>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f97316]/10 border border-[#f97316]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#f97316]" />
              <span className="text-xs font-bold text-[#f97316]">
                Direct Seller Contact
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Hero Marketplace Product Card Entering with Depth */}
        <div className="flex-1 relative flex items-center justify-center">
          {/* Ambient shadow glow under card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1.4, delay: 0.5 }}
            className="absolute w-80 h-80 rounded-full bg-[#f97316] blur-[90px] pointer-events-none"
          />

          <motion.div
            initial={{ opacity: 0, y: 70, scale: 0.9, rotateX: 12, rotateY: -8 }}
            animate={{
              opacity: 1,
              y: [0, -8, 0],
              scale: 1,
              rotateX: [0, 2, 0],
              rotateY: [0, -3, 0],
            }}
            transition={{
              opacity: { duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
              rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ perspective: 1200 }}
            className="relative w-[340px] rounded-[32px] bg-white p-4 shadow-[0_30px_70px_rgba(10,61,46,0.12),0_10px_25px_rgba(0,0,0,0.06)] border border-[#0a3d2e]/8 backdrop-blur-xl"
          >
            {/* Card Media Container */}
            <div className="relative w-full h-[260px] rounded-[24px] overflow-hidden bg-gradient-to-b from-[#f3f4f6] to-[#e5e7eb]">
              <Image
                src="/products/iphone15.jpg"
                alt="Apple iPhone 15"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Verified pill */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 shadow-md backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-[#0a3d2e] tracking-tight">
                  DealDone Verified
                </span>
              </div>

              {/* Discount pill */}
              <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-[#f97316] text-white text-[11px] font-black shadow-md">
                35% OFF
              </div>

              {/* Distance pill bottom */}
              <div className="absolute bottom-3 left-3.5 px-2.5 py-1 rounded-lg bg-black/50 text-white text-[10px] font-semibold backdrop-blur-md">
                📍 1.8 km away • Hitech City
              </div>
            </div>

            {/* Card Information */}
            <div className="pt-4 px-2 pb-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#0a3d2e] text-lg leading-tight">
                    Apple iPhone 15
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    128 GB • Like New • 98% Battery
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-[#0a3d2e]">₹52,000</div>
                  <div className="text-[11px] text-gray-400 line-through">₹79,900</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#d4e84a] flex items-center justify-center text-[10px] font-black text-[#0a3d2e]">
                    R
                  </div>
                  <span className="text-xs font-semibold text-gray-700">
                    Rohit V. <span className="text-emerald-600 font-bold">★ 4.9</span>
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-[#f97316]">
                  <span>Explore Deal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
