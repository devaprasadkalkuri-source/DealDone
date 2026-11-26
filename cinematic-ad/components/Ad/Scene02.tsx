"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Search, MapPin, SlidersHorizontal, CheckCircle2, ArrowUpRight } from "lucide-react";
import { DealDoneFlower } from "./BrandMark";
import { sound } from "./SoundEngine";

interface SceneProps {
  progress: number; // 0 to 1 for this scene (4s-8s)
  active: boolean;
}

export default function Scene02({ progress, active }: SceneProps) {
  // Animate search text typing: "iPhone"
  const [typedText, setTypedText] = useState("");
  const targetText = "iPhone";

  useEffect(() => {
    if (!active) {
      setTypedText("");
      return;
    }

    // Type between progress 0.15 and 0.45
    const stepDuration = 120;
    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep < targetText.length) {
        currentStep++;
        setTypedText(targetText.slice(0, currentStep));
        sound.playType();
      } else {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [active]);

  if (!active && (progress < 0 || progress > 1)) return null;

  const results = [
    {
      id: "iphone-15",
      name: "Apple iPhone 15 128GB",
      price: "₹52,000",
      original: "₹79,900",
      tag: "Best Match",
      distance: "1.8 km",
      area: "Hitech City",
      condition: "Like New",
      image: "/products/iphone15.jpg",
      seller: "Rohit V. ★ 4.9",
    },
    {
      id: "macbook-air",
      name: "MacBook Air M2 16GB",
      price: "₹68,000",
      original: "₹1,14,900",
      tag: "Verified",
      distance: "2.4 km",
      area: "Madhapur",
      condition: "Like New",
      image: "/products/macbook.jpg",
      seller: "Vikram S. ★ 5.0",
    },
    {
      id: "samsung-s23",
      name: "Samsung Galaxy S23",
      price: "₹31,000",
      original: "₹74,999",
      tag: "Deal of Day",
      distance: "3.2 km",
      area: "Gachibowli",
      condition: "Good Condition",
      image: "/products/samsung.jpg",
      seller: "Ananya R. ★ 4.8",
    },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#faf8f5] via-[#f4f1ea] to-[#e8e4db] flex flex-col items-center justify-center">
      {/* Background oversized typographic watermark */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
      >
        <span className="text-[22vw] font-black text-[#0a3d2e] tracking-tighter uppercase whitespace-nowrap">
          DISCOVER
        </span>
      </motion.div>

      {/* Top Header */}
      <div className="absolute top-8 left-12 right-12 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <DealDoneFlower size={34} />
          <span className="font-black text-xl tracking-tight text-[#0a3d2e]">
            Deal<span className="text-[#f97316]">Done</span>
          </span>
          <div className="flex items-center gap-1.5 ml-4 px-3 py-1 rounded-full bg-white/70 border border-[#0a3d2e]/10 text-xs font-semibold text-[#0a3d2e]">
            <MapPin className="w-3.5 h-3.5 text-[#f97316]" />
            <span>Hyderabad</span>
          </div>
        </div>

        <div className="text-xs font-mono tracking-widest text-[#0a3d2e]/40">
          02 / 08 • INSTANT SEARCH
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full max-w-5xl mx-auto px-6 z-20 flex flex-col items-center">
        {/* Search Bar Section */}
        <motion.div
          initial={{ opacity: 0, y: -25, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl"
        >
          <div className="relative flex items-center bg-white rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(10,61,46,0.08),0_4px_12px_rgba(0,0,0,0.03)] border border-[#0a3d2e]/10">
            <div className="flex items-center justify-center pl-3 pr-2 text-gray-400">
              <Search className="w-5 h-5 text-[#f97316]" />
            </div>

            <div className="flex-1 text-base font-semibold text-gray-800 flex items-center">
              {typedText.length === 0 ? (
                <span className="text-gray-400 font-normal">
                  Search for something...
                </span>
              ) : (
                <span>{typedText}</span>
              )}
              {/* Blinking cursor */}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.7, repeat: Infinity }}
                className="w-0.5 h-5 bg-[#f97316] ml-1 inline-block"
              />
            </div>

            <div className="flex items-center gap-2 pr-1">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 transition">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
              </button>
              <button className="px-4 py-1.5 rounded-xl bg-[#0a3d2e] text-white text-xs font-bold shadow-sm">
                Search
              </button>
            </div>
          </div>

          {/* Quick Category Chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex items-center justify-center gap-2 mt-3"
          >
            {["All", "Mobiles", "Laptops", "Nearby Only", "Under ₹60k"].map(
              (chip, idx) => (
                <span
                  key={chip}
                  className={`text-[11px] font-bold px-3 py-1 rounded-full cursor-pointer transition ${
                    idx === 1
                      ? "bg-[#0a3d2e] text-white shadow-sm"
                      : "bg-white/80 border border-gray-200 text-gray-600"
                  }`}
                >
                  {chip}
                </span>
              )
            )}
          </motion.div>
        </motion.div>

        {/* Results Stream (The 3 Product Cards) */}
        <div className="w-full grid grid-cols-3 gap-6 mt-8">
          {results.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.5 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative bg-white rounded-3xl p-3.5 shadow-[0_20px_45px_rgba(10,61,46,0.07),0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100/90 flex flex-col group"
            >
              {/* Image Frame */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-[10px] font-bold text-[#0a3d2e] shadow-sm backdrop-blur-sm flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span>{item.tag}</span>
                </div>

                {/* Distance */}
                <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-medium backdrop-blur-sm">
                  {item.distance} • {item.area}
                </div>
              </div>

              {/* Body */}
              <div className="pt-3 px-1 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {item.condition} • {item.seller}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-black text-[#0a3d2e]">
                      {item.price}
                    </span>
                    <span className="text-[10px] text-gray-400 line-through ml-1.5">
                      {item.original}
                    </span>
                  </div>

                  <div className="w-7 h-7 rounded-full bg-[#f97316]/10 flex items-center justify-center text-[#f97316] group-hover:bg-[#f97316] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
