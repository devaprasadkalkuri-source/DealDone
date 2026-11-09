"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Phone, ShieldCheck, Check, ArrowRight } from "lucide-react";
import { DealDoneFlower } from "./BrandMark";

interface SceneProps {
  progress: number; // 0 to 1 for this scene (21s-25s)
  active: boolean;
}

export default function Scene06({ progress, active }: SceneProps) {
  if (!active && (progress < 0 || progress > 1)) return null;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#faf8f4] via-[#f4eee4] to-[#e8e2d4] flex flex-col justify-between p-12">
      {/* Top Header */}
      <div className="relative flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <DealDoneFlower size={34} />
          <span className="font-black text-xl tracking-tight text-[#0a3d2e]">
            Deal<span className="text-[#f97316]">Done</span>
          </span>
        </div>

        <div className="text-xs font-mono tracking-widest text-[#0a3d2e]/40">
          06 / 08 • DIRECT CONNECTION
        </div>
      </div>

      {/* Main Composition */}
      <div className="relative w-full max-w-7xl mx-auto my-auto grid grid-cols-12 gap-10 items-center z-20">
        {/* Left Side: Editorial Typography */}
        <div className="col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
                Zero Middlemen
              </span>
            </div>

            <h1 className="text-[clamp(3.8rem,7.5vw,7rem)] font-black leading-[0.88] tracking-[-0.05em] text-[#0a3d2e]">
              CONNECT.
            </h1>

            <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#f97316]">
              <span>SEE PRODUCT</span>
              <ArrowRight className="w-4 h-4" />
              <span>CONTACT SELLER</span>
            </div>

            <p className="mt-4 text-sm text-gray-600 font-medium leading-relaxed max-w-md">
              Chat directly with verified sellers in your city. Negotiate, ask questions, or arrange local pickup in seconds.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#0a3d2e]/10 shadow-sm text-xs font-semibold text-[#0a3d2e]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified DealDone Member</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Realistic Product Detail + Seller Contact Sheet */}
        <div className="col-span-7 relative flex items-center justify-center">
          {/* Main Product Detail Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white rounded-[32px] p-5 shadow-[0_30px_70px_rgba(10,61,46,0.12),0_8px_24px_rgba(0,0,0,0.04)] border border-[#0a3d2e]/8"
          >
            {/* Top row with image + core details */}
            <div className="flex gap-5">
              <div className="relative w-44 h-44 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src="/products/iphone15.jpg"
                  alt="iPhone 15"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 text-white text-[9px] font-bold">
                  1.8 km away
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    <Check className="w-3.5 h-3.5" />
                    <span>Verified Listing</span>
                  </div>
                  <h3 className="font-extrabold text-[#0a3d2e] text-xl mt-1 leading-snug">
                    Apple iPhone 15
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Midnight • 128 GB • Like New condition
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 my-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                    98% Battery
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                    Bill & Box
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#0a3d2e]">
                    ₹52,000
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ₹79,900
                  </span>
                </div>
              </div>
            </div>

            {/* SELLER & CONTACT DRAWER (Reveals Smoothly with Depth) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 pt-4 border-t border-gray-100 bg-gradient-to-b from-[#f9fafb] to-white rounded-2xl p-4 border border-gray-100"
            >
              {/* Seller Profile row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#0a3d2e] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    RV
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-gray-900 text-sm">
                        Rohit Varma
                      </h4>
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-black">
                        ✓
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500">
                      ★ 4.9 (18 deals) • Replies in 5 mins
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
                  Online Now
                </span>
              </div>

              {/* Action Buttons: Contact Seller & WhatsApp */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                {/* Primary Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0a3d2e] text-white font-bold text-xs shadow-md shadow-emerald-950/20"
                >
                  <Phone className="w-4 h-4" />
                  <span>Contact Seller</span>
                </motion.button>

                {/* WhatsApp Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-md shadow-green-600/20"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="relative z-30 text-xs text-gray-400 border-t border-[#0a3d2e]/10 pt-4 flex items-center justify-between">
        <span>No phone number sharing required • Built-in secure messaging</span>
        <span className="font-semibold text-[#0a3d2e]">Instant response</span>
      </div>
    </div>
  );
}
