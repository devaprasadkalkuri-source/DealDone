"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Smartphone,
  Laptop,
  Bike,
  Armchair,
  Headphones,
  BookOpen,
  Sparkles,
  Trophy,
} from "lucide-react";
import { DealDoneFlower } from "./BrandMark";

interface SceneProps {
  progress: number; // 0 to 1 for this scene (8s-12s)
  active: boolean;
}

export default function Scene03({ progress, active }: SceneProps) {
  if (!active && (progress < 0 || progress > 1)) return null;

  const row1 = [
    { label: "MOBILES", icon: Smartphone, img: "/products/iphone15.jpg", color: "bg-white" },
    { label: "LAPTOPS", icon: Laptop, img: "/products/macbook.jpg", color: "bg-white" },
    { label: "BIKES", icon: Bike, img: "/products/royalenfield.jpg", color: "bg-white" },
    { label: "FURNITURE", icon: Armchair, img: "/products/chair.jpg", color: "bg-white" },
    { label: "MOBILES", icon: Smartphone, img: "/products/samsung.jpg", color: "bg-white" },
  ];

  const row2 = [
    { label: "ELECTRONICS", icon: Headphones, img: "/products/camera.jpg", color: "bg-[#0a3d2e] text-white" },
    { label: "BOOKS", icon: BookOpen, img: "/products/books.jpg", color: "bg-white" },
    { label: "FASHION", icon: Sparkles, img: "/products/headphones.jpg", color: "bg-white" },
    { label: "SPORTS", icon: Trophy, img: "/products/bike.jpg", color: "bg-white" },
    { label: "ELECTRONICS", icon: Headphones, img: "/products/camera.jpg", color: "bg-white" },
  ];

  const row3 = [
    { label: "BIKES", icon: Bike, img: "/products/royalenfield.jpg", color: "bg-white" },
    { label: "FURNITURE", icon: Armchair, img: "/products/studytable.jpg", color: "bg-white" },
    { label: "LAPTOPS", icon: Laptop, img: "/products/macbook.jpg", color: "bg-white" },
    { label: "MOBILES", icon: Smartphone, img: "/products/iphone15.jpg", color: "bg-white" },
    { label: "BOOKS", icon: BookOpen, img: "/products/books.jpg", color: "bg-white" },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#faf7f2] via-[#f3eee5] to-[#e7e1d5] flex flex-col justify-center">
      {/* Top Header */}
      <div className="absolute top-8 left-12 right-12 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <DealDoneFlower size={34} />
          <span className="font-black text-xl tracking-tight text-[#0a3d2e]">
            Deal<span className="text-[#f97316]">Done</span>
          </span>
        </div>

        <div className="text-xs font-mono tracking-widest text-[#0a3d2e]/40">
          03 / 08 • ALL CATEGORIES
        </div>
      </div>

      {/* GIANT EDITORIAL TYPOGRAPHY ANCHOR */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-12 top-20 z-10 select-none flex items-center justify-between"
      >
        <h1 className="text-[clamp(3.5rem,7.5vw,7rem)] font-black tracking-[-0.05em] leading-none text-[#0a3d2e]">
          EVERYTHING.
        </h1>
        <div className="text-right">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#f97316] block">
            EXPLORE 8+ CATEGORIES
          </span>
          <span className="text-sm font-semibold text-gray-500 mt-1 block">
            Buy & sell anything near you
          </span>
        </div>
      </motion.div>

      {/* KINETIC CATEGORY PILL ROWS (Inspired by reference video frame 10s) */}
      <div className="relative w-full flex flex-col gap-5 mt-28 z-20 overflow-hidden py-4">
        {/* ROW 1 — Sliding Left */}
        <motion.div
          animate={{ x: [0, -450] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-4 whitespace-nowrap will-change-transform"
        >
          {[...row1, ...row1, ...row1].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`r1-${idx}`}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-[0_12px_30px_rgba(10,61,46,0.06),0_2px_6px_rgba(0,0,0,0.04)] border border-[#0a3d2e]/8 hover:border-[#f97316]/50 transition cursor-pointer"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-black text-xl tracking-tight text-[#0a3d2e]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </motion.div>

        {/* ROW 2 — Sliding Right */}
        <motion.div
          animate={{ x: [-450, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-4 whitespace-nowrap will-change-transform"
        >
          {[...row2, ...row2, ...row2].map((item, idx) => {
            const isHighlight = idx % 3 === 0;
            return (
              <div
                key={`r2-${idx}`}
                className={`flex items-center gap-3.5 px-7 py-3.5 rounded-full shadow-[0_15px_35px_rgba(10,61,46,0.08),0_2px_6px_rgba(0,0,0,0.04)] border transition cursor-pointer ${
                  isHighlight
                    ? "bg-[#0a3d2e] text-white border-transparent shadow-emerald-950/20"
                    : "bg-white text-[#0a3d2e] border-[#0a3d2e]/8"
                }`}
              >
                <div className="relative w-9 h-9 rounded-full overflow-hidden bg-white/20 flex items-center justify-center shrink-0">
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-black text-2xl tracking-tight">
                  {item.label}
                </span>
                {isHighlight && (
                  <span className="text-[10px] uppercase font-bold tracking-widest bg-[#d4e84a] text-[#0a3d2e] px-2 py-0.5 rounded-full ml-1">
                    Hot
                  </span>
                )}
              </div>
            );
          })}
        </motion.div>

        {/* ROW 3 — Sliding Left */}
        <motion.div
          animate={{ x: [-50, -500] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-4 whitespace-nowrap will-change-transform"
        >
          {[...row3, ...row3, ...row3].map((item, idx) => {
            return (
              <div
                key={`r3-${idx}`}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-[0_12px_30px_rgba(10,61,46,0.06),0_2px_6px_rgba(0,0,0,0.04)] border border-[#0a3d2e]/8 hover:border-[#f97316]/50 transition cursor-pointer"
              >
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                  <Image
                    src={item.img}
                    alt={item.label}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="font-black text-xl tracking-tight text-[#0a3d2e]">
                  {item.label}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Floating Spotlight Featured Product on Top Right with 3D Depth */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 6, y: 40 }}
        animate={{ opacity: 1, scale: 1, rotate: [4, 6, 4], y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.3 },
          scale: { duration: 0.8, delay: 0.3 },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-10 right-16 z-30 hidden lg:flex items-center gap-4 p-3.5 rounded-2xl bg-white/95 border border-[#0a3d2e]/10 shadow-[0_25px_50px_rgba(10,61,46,0.14)] backdrop-blur-md"
      >
        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
          <Image
            src="/products/royalenfield.jpg"
            alt="Royal Enfield"
            fill
            className="object-cover"
          />
        </div>
        <div className="pr-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#f97316] block">
            Featured Category
          </span>
          <span className="font-bold text-gray-900 text-sm block">
            Bikes & Automobiles
          </span>
          <span className="text-xs font-black text-[#0a3d2e]">
            420+ Listings Nearby
          </span>
        </div>
      </motion.div>
    </div>
  );
}
