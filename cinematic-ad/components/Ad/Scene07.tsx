"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check, UploadCloud, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { DealDoneFlower } from "./BrandMark";

interface SceneProps {
  progress: number; // 0 to 1 for this scene (25s-30s)
  active: boolean;
}

export default function Scene07({ progress, active }: SceneProps) {
  if (!active && (progress < 0 || progress > 1)) return null;

  // Between 0 and 0.5: Form filling -> List Product button click
  // Between 0.5 and 1.0: Published card floats out in victory!
  const isPublished = progress > 0.48;

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#faf7f3] via-[#f5ede3] to-[#e8dfd3] flex flex-col justify-between p-12">
      {/* Background oversized typographic watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.035] overflow-hidden whitespace-nowrap">
        <span className="text-[26vw] font-black text-[#0a3d2e] tracking-tight uppercase">
          SELL
        </span>
      </div>

      {/* Top Header */}
      <div className="relative flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <DealDoneFlower size={34} />
          <span className="font-black text-xl tracking-tight text-[#0a3d2e]">
            Deal<span className="text-[#f97316]">Done</span>
          </span>
        </div>

        <div className="text-xs font-mono tracking-widest text-[#0a3d2e]/40">
          07 / 08 • EFFORTLESS SELLING
        </div>
      </div>

      {/* Main Composition */}
      <div className="relative w-full max-w-7xl mx-auto my-auto grid grid-cols-12 gap-10 items-center z-20">
        {/* Left Column: Bold Typography & Selling Proposition */}
        <div className="col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#f97316]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#f97316]">
                Simple 30-Second Listing
              </span>
            </div>

            <h1 className="text-[clamp(3.8rem,7.5vw,7.5rem)] font-black leading-[0.88] tracking-[-0.05em] text-[#0a3d2e]">
              SELL.
            </h1>

            <div className="mt-4 text-2xl font-black text-[#1c2925] tracking-tight">
              LIST IT. FIND A BUYER.
            </div>

            <p className="mt-3 text-sm text-gray-600 font-medium leading-relaxed max-w-md">
              Snap photos, set your price, and reach genuine local buyers within minutes. Free listing with zero hidden commissions.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 shadow-sm">
                ✓ 100% Free
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 shadow-sm">
                ✓ Local Buyers
              </span>
              <span className="px-3 py-1 rounded-full bg-white border border-gray-200 text-xs font-bold text-gray-700 shadow-sm">
                ✓ Fast Responses
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Dynamic Listing Flow into Published Product */}
        <div className="col-span-7 relative flex items-center justify-center">
          {!isPublished ? (
            /* SELL FORM SHEET */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-white rounded-[32px] p-6 shadow-[0_30px_70px_rgba(10,61,46,0.12),0_8px_24px_rgba(0,0,0,0.04)] border border-[#0a3d2e]/8"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="font-extrabold text-[#0a3d2e] text-base">
                  List Your Product
                </span>
                <span className="text-[11px] font-bold text-[#f97316] bg-[#f97316]/10 px-2.5 py-0.5 rounded-full">
                  DealDone Sell
                </span>
              </div>

              <div className="space-y-3.5 mt-4">
                {/* Product Name */}
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Product Name
                  </label>
                  <div className="px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 flex items-center justify-between">
                    <span>Sony Alpha A7 III</span>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                      Category
                    </label>
                    <div className="px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900">
                      Electronics
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                      Price
                    </label>
                    <div className="px-3.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs font-extrabold text-[#0a3d2e]">
                      ₹45,000
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Description
                  </label>
                  <div className="px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-[11px] font-medium text-gray-600">
                    Full-frame body + 28-70mm kit lens. Clean sensor, mint condition.
                  </div>
                </div>

                {/* Images Upload Preview */}
                <div>
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Images
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-100 border-2 border-emerald-500">
                      <Image
                        src="/products/camera.jpg"
                        alt="Sony Alpha A7 III"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-emerald-600 text-white text-[8px] font-black text-center py-0.5">
                        Uploaded
                      </div>
                    </div>
                    <div className="flex-1 border-2 border-dashed border-gray-200 rounded-xl h-14 flex items-center justify-center text-gray-400 text-xs gap-1.5">
                      <UploadCloud className="w-4 h-4" />
                      <span>+ Add more photos</span>
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <motion.button
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-full mt-2 py-3.5 rounded-xl bg-[#0a3d2e] hover:bg-[#0c4735] text-white font-extrabold text-sm shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2"
                >
                  <span>LIST PRODUCT</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            /* PUBLISHED PRODUCT CARD (Pops out after listing) */
            <motion.div
              key="published"
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md bg-white rounded-[32px] p-5 shadow-[0_35px_80px_rgba(10,61,46,0.18),0_10px_30px_rgba(0,0,0,0.06)] border-2 border-emerald-500"
            >
              {/* Victory announcement pill */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-extrabold text-xs uppercase tracking-wider text-emerald-800">
                    LIVE NOW • LISTING PUBLISHED
                  </span>
                </div>
                <span className="text-[10px] font-bold text-gray-400">
                  Just now
                </span>
              </div>

              {/* Product preview */}
              <div className="relative w-full h-52 rounded-2xl overflow-hidden mt-3 bg-gray-100">
                <Image
                  src="/products/camera.jpg"
                  alt="Sony Alpha A7 III"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 text-xs font-black text-[#0a3d2e] shadow-md">
                  Active Listing
                </div>
              </div>

              <div className="pt-3 px-1">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-bold text-gray-900 text-lg">
                    Sony Alpha A7 III
                  </h3>
                  <span className="text-xl font-black text-[#0a3d2e]">
                    ₹45,000
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">
                  Electronics • Banjara Hills, Hyderabad
                </p>

                <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-900">
                    Visible to 400+ active buyers nearby
                  </span>
                  <span className="text-[10px] font-black text-emerald-700 uppercase">
                    Promoted
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Sub-bar */}
      <div className="relative z-30 text-xs text-gray-400 border-t border-[#0a3d2e]/10 pt-4 flex items-center justify-between">
        <span>Instant buyer notifications • Zero transaction fees for sellers</span>
        <span className="font-bold text-[#0a3d2e]">DealDone Verified Marketplace</span>
      </div>
    </div>
  );
}
