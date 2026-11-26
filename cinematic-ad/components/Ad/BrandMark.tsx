"use client";

import { motion } from "framer-motion";

export function DealDoneFlower({
  size = 48,
  rotate = 0,
  animateRotation = false,
}: {
  size?: number;
  rotate?: number;
  animateRotation?: boolean;
}) {
  const petalCount = 6;
  const petalWidth = size * 0.28;
  const petalHeight = size * 0.52;
  const centerSize = size * 0.58;

  return (
    <div
      className="relative flex items-center justify-center shrink-0 select-none"
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute inset-0"
        animate={
          animateRotation
            ? { rotate: [0, 360] }
            : { rotate }
        }
        transition={
          animateRotation
            ? { duration: 24, repeat: Infinity, ease: "linear" }
            : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
      >
        {Array.from({ length: petalCount }).map((_, i) => {
          const deg = (360 / petalCount) * i;
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full bg-[#d4e84a] shadow-sm"
              style={{
                width: petalWidth,
                height: petalHeight,
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-${size * 0.24}px)`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Center disc */}
      <div
        className="relative flex items-center justify-center rounded-full bg-[#0a3d2e] shadow-[0_4px_16px_rgba(10,61,46,0.3)] z-10"
        style={{ width: centerSize, height: centerSize }}
      >
        <span
          className="font-black text-[#f2f7dc] leading-none"
          style={{ fontSize: size * 0.28 }}
        >
          D
        </span>
      </div>
    </div>
  );
}

export function DealDoneLogo({
  size = "md",
  dark = false,
  showTagline = true,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  dark?: boolean;
  showTagline?: boolean;
}) {
  const pixelSizes = {
    sm: { flower: 34, title: "text-lg", tag: "text-[8px]" },
    md: { flower: 44, title: "text-2xl", tag: "text-[10px]" },
    lg: { flower: 64, title: "text-4xl", tag: "text-xs" },
    xl: { flower: 96, title: "text-6xl", tag: "text-sm" },
  };

  const current = pixelSizes[size];

  return (
    <div className="flex items-center gap-3 select-none">
      <DealDoneFlower size={current.flower} />
      <div className="flex flex-col">
        <h1
          className={`font-black tracking-tight leading-none ${current.title} ${
            dark ? "text-white" : "text-[#0a3d2e]"
          }`}
        >
          Deal<span className="text-[#f97316]">Done</span>
        </h1>
        {showTagline && (
          <span
            className={`font-semibold tracking-[0.22em] uppercase mt-1 ${current.tag} ${
              dark ? "text-white/60" : "text-[#0a3d2e]/60"
            }`}
          >
            Your Local Marketplace
          </span>
        )}
      </div>
    </div>
  );
}
