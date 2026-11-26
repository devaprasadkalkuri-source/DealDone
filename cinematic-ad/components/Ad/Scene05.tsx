"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Navigation, Compass, Radio } from "lucide-react";
import { DealDoneFlower } from "./BrandMark";

interface SceneProps {
  progress: number; // 0 to 1 for this scene (17s-21s)
  active: boolean;
}

export default function Scene05({ progress, active }: SceneProps) {
  if (!active && (progress < 0 || progress > 1)) return null;

  const pins = [
    {
      id: "p1",
      name: "iPhone 15",
      price: "₹52,000",
      distance: "1.8 km",
      area: "Hitech City",
      img: "/products/iphone15.jpg",
      x: "36%",
      y: "40%",
      delay: 0.3,
    },
    {
      id: "p2",
      name: "MacBook Air",
      price: "₹68,000",
      distance: "2.4 km",
      area: "Madhapur",
      img: "/products/macbook.jpg",
      x: "68%",
      y: "32%",
      delay: 0.5,
    },
    {
      id: "p3",
      name: "Royal Enfield",
      price: "₹1,45,000",
      distance: "3.1 km",
      area: "Jubilee Hills",
      img: "/products/royalenfield.jpg",
      x: "74%",
      y: "68%",
      delay: 0.7,
    },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#0c1f19] via-[#081813] to-[#040e0b] text-white flex flex-col justify-between p-12">
      {/* Background Architectural Vector Map Grid (DealDone Custom Map UI) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:5rem_5rem]" />

        {/* Diagonal stylized avenues */}
        <svg className="w-full h-full stroke-emerald-400/40 fill-none" strokeWidth="1.5">
          <path d="M-100,200 L1200,900" strokeDasharray="6 6" />
          <path d="M300,-100 L900,1000" strokeWidth="2.5" />
          <path d="M100,800 C400,600 700,700 1100,300" strokeWidth="2" />
          <path d="M500,-50 C600,300 400,600 800,1100" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Proximity Concentric Rings from User Location */}
      <div className="absolute left-[45%] top-[55%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {/* User radar center */}
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-16 rounded-full border border-emerald-500/20 bg-emerald-500/5"
        />
        <motion.div
          animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-36 rounded-full border border-emerald-500/15"
        />
        <motion.div
          animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0.05, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-64 rounded-full border border-emerald-500/10"
        />

        {/* Center You Pin */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-6 h-6 rounded-full bg-[#f97316] flex items-center justify-center shadow-[0_0_20px_#f97316] border-2 border-white">
            <div className="w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
          <div className="mt-1 px-2.5 py-0.5 rounded-full bg-black/80 border border-white/20 text-[10px] font-bold text-white whitespace-nowrap backdrop-blur-md">
            Your Location • Madhapur
          </div>
        </div>
      </div>

      {/* Top Header */}
      <div className="relative flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <DealDoneFlower size={34} />
          <span className="font-black text-xl tracking-tight text-white">
            Deal<span className="text-[#f97316]">Done</span>
          </span>
          <div className="flex items-center gap-2 ml-4 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Live Radar</span>
          </div>
        </div>

        <div className="text-xs font-mono tracking-widest text-emerald-400/70">
          05 / 08 • LOCAL DISCOVERY
        </div>
      </div>

      {/* Typography Anchor (Left Side) */}
      <div className="relative z-30 max-w-xl">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="w-4 h-4 text-[#f97316]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#f97316]">
              Hyperlocal Radius
            </span>
          </div>

          <h1 className="text-[clamp(3.5rem,7vw,6.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-white">
            NEAR YOU.
          </h1>

          <p className="mt-3 text-sm text-gray-300 max-w-md font-medium">
            Browse genuine products listed by neighbors in your immediate area. Meet in person or pick up today.
          </p>
        </motion.div>
      </div>

      {/* FLOATING MAP PINS WITH PRODUCT PREVIEWS */}
      {pins.map((pin) => (
        <motion.div
          key={pin.id}
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -6, 0],
          }}
          transition={{
            opacity: { duration: 0.7, delay: pin.delay, ease: [0.16, 1, 0.3, 1] },
            scale: { duration: 0.7, delay: pin.delay, ease: [0.16, 1, 0.3, 1] },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: pin.delay },
          }}
          style={{ left: pin.x, top: pin.y }}
          className="absolute z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
        >
          <div className="flex items-center gap-3 p-2 pr-3.5 rounded-2xl bg-white/95 text-gray-900 shadow-[0_20px_45px_rgba(0,0,0,0.5)] border border-white/20 backdrop-blur-md hover:scale-105 transition-transform cursor-pointer">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
              <Image
                src={pin.img}
                alt={pin.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-gray-900 leading-tight">
                  {pin.name}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black">
                  {pin.distance}
                </span>
              </div>
              <div className="flex items-center justify-between mt-1 gap-2">
                <span className="text-sm font-black text-[#0a3d2e]">
                  {pin.price}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  {pin.area}
                </span>
              </div>
            </div>
          </div>
          {/* Stem / Pin Point */}
          <div className="w-0.5 h-6 bg-white/60 mx-auto" />
          <div className="w-2 h-2 rounded-full bg-emerald-400 mx-auto shadow-[0_0_8px_#34d399]" />
        </motion.div>
      ))}

      {/* Floating HUD Card: Nearby Deals */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-12 right-12 z-30 w-72 rounded-2xl bg-black/60 border border-white/15 p-4 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Nearby Deals
          </span>
          <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
            3 Active
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-gray-300 font-medium">iPhone 15</span>
            <span className="text-[#f97316] font-bold">1.8 km</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300 font-medium">MacBook Air M2</span>
            <span className="text-[#f97316] font-bold">2.4 km</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300 font-medium">Royal Enfield Classic</span>
            <span className="text-[#f97316] font-bold">3.1 km</span>
          </div>
        </div>
      </motion.div>

      {/* Bottom status */}
      <div className="relative z-30 text-xs text-gray-400">
        Radius calibrated to 5.0 km • Instant direct seller contact
      </div>
    </div>
  );
}
