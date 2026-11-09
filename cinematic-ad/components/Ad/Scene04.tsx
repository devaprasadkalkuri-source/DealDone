"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, MapPin } from "lucide-react";
import { DealDoneFlower } from "./BrandMark";

interface SceneProps {
  progress: number; // 0 to 1 for this scene (12s-17s)
  active: boolean;
}

export default function Scene04({ progress, active }: SceneProps) {
  if (!active && (progress < 0 || progress > 1)) return null;

  const cards = [
    {
      id: "iphone",
      title: "Apple iPhone 15",
      subtitle: "128 GB • Like New",
      price: "₹52,000",
      original: "₹79,900",
      discount: "35% OFF",
      location: "Hitech City",
      distance: "1.8 km",
      image: "/products/iphone15.jpg",
      badge: "Top Deal",
      tilt: -2,
      zIndex: 20,
    },
    {
      id: "enfield",
      title: "Royal Enfield Classic 350",
      subtitle: "2023 • 4,800 km • Mint",
      price: "₹1,45,000",
      original: "₹2,20,000",
      discount: "34% OFF",
      location: "Jubilee Hills",
      distance: "3.1 km",
      image: "/products/royalenfield.jpg",
      badge: "Verified Bike",
      tilt: 1.5,
      zIndex: 25,
    },
    {
      id: "macbook",
      title: "MacBook Air M2 16GB",
      subtitle: "512 GB SSD • 38 Cycles",
      price: "₹68,000",
      original: "₹1,14,900",
      discount: "40% OFF",
      location: "Madhapur",
      distance: "2.4 km",
      image: "/products/macbook.jpg",
      badge: "Inspected",
      tilt: -1.5,
      zIndex: 22,
    },
    {
      id: "table",
      title: "Minimal Solid Teak Desk",
      subtitle: "120x60 cm • Steel Legs",
      price: "₹4,500",
      original: "₹12,000",
      discount: "62% OFF",
      location: "Kondapur",
      distance: "2.8 km",
      image: "/products/studytable.jpg",
      badge: "Quick Pickup",
      tilt: 2,
      zIndex: 18,
    },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-[#faf7f2] via-[#f4efe6] to-[#e8e2d6] flex flex-col justify-between p-12">
      {/* Background oversized typographic watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.035] overflow-hidden whitespace-nowrap">
        <span className="text-[28vw] font-black text-[#0a3d2e] tracking-tight uppercase">
          DEALS
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
          04 / 08 • CURATED DEALS
        </div>
      </div>

      {/* Typography & Subhead */}
      <div className="relative z-30 max-w-2xl my-2">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#f97316]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f97316]">
              Handpicked Everyday
            </span>
          </div>
          <h1 className="text-[clamp(3rem,6vw,5.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-[#0a3d2e]">
            REAL DEALS.
          </h1>
        </motion.div>
      </div>

      {/* CARDS COLLAGE CONTAINER (Layered Depth & Subtle Parallax) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto grid grid-cols-4 gap-5 items-center">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 70, scale: 0.88, rotate: card.tilt * 2 }}
            animate={{
              opacity: 1,
              y: [0, index % 2 === 0 ? -6 : 6, 0],
              scale: 1,
              rotate: card.tilt,
            }}
            transition={{
              opacity: { duration: 0.8, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] },
              scale: { duration: 0.8, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 5 + index, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ zIndex: card.zIndex }}
            className="group relative rounded-[28px] bg-white p-3.5 shadow-[0_25px_50px_rgba(10,61,46,0.08),0_4px_12px_rgba(0,0,0,0.03)] border border-[#0a3d2e]/8 hover:border-[#f97316]/40 transition duration-300"
          >
            {/* Card Image */}
            <div className="relative w-full h-44 rounded-[20px] overflow-hidden bg-gray-100">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Badge */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 text-[10px] font-bold text-[#0a3d2e] shadow-sm backdrop-blur-sm flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>{card.badge}</span>
              </div>

              {/* Discount Tag */}
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#f97316] text-white text-[10px] font-black shadow-sm">
                {card.discount}
              </div>

              {/* Distance Tag */}
              <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-medium backdrop-blur-sm flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-[#f97316]" />
                <span>{card.distance} • {card.location}</span>
              </div>
            </div>

            {/* Card Info */}
            <div className="pt-3 px-1">
              <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-1">
                {card.title}
              </h3>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {card.subtitle}
              </p>

              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-baseline justify-between">
                <div>
                  <span className="text-xl font-black text-[#0a3d2e]">
                    {card.price}
                  </span>
                  <span className="text-[11px] text-gray-400 line-through ml-1.5">
                    {card.original}
                  </span>
                </div>

                <div className="text-[11px] font-bold text-[#f97316] group-hover:translate-x-0.5 transition-transform">
                  View →
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Sub-bar */}
      <div className="relative z-30 flex items-center justify-between text-xs text-gray-500 border-t border-[#0a3d2e]/10 pt-4">
        <span className="font-semibold">
          Prices verified by local sellers • Zero hidden commission
        </span>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-[#0a3d2e]">Live in Hyderabad</span>
        </div>
      </div>
    </div>
  );
}
