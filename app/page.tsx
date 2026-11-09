"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#050706] text-white">

      {/* =========================================================
          CINEMATIC BACKGROUND
      ========================================================= */}

      <div className="absolute inset-0">

        {/* Large atmospheric glow */}
        <motion.div
          className="absolute left-[20%] top-[20%] h-[500px] w-[500px] rounded-full bg-lime-400/10 blur-[180px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute right-[-10%] bottom-[-20%] h-[600px] w-[600px] rounded-full bg-emerald-500/10 blur-[200px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Cinematic haze */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.65)_75%,#000_100%)]" />

        {/* Film grain */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-screen">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

      </div>


      {/* =========================================================
          DISTANT MARKETPLACE ELEMENTS
      ========================================================= */}

      <motion.div
        className="absolute left-[7%] top-[22%] hidden h-[130px] w-[190px] rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-sm md:block"
        initial={{ opacity: 0, x: -80, y: 30 }}
        animate={{ opacity: 0.35, x: 0, y: 0 }}
        transition={{ duration: 1.8, delay: 1 }}
      >
        <div className="text-[9px] tracking-[0.3em] text-zinc-500">
          NEAR YOU
        </div>
        <div className="mt-5 h-2 w-20 rounded-full bg-white/20" />
        <div className="mt-3 h-2 w-12 rounded-full bg-white/10" />
      </motion.div>


      <motion.div
        className="absolute right-[7%] top-[28%] hidden h-[150px] w-[210px] rounded-2xl border border-white/10 bg-white/[0.025] p-5 backdrop-blur-sm md:block"
        initial={{ opacity: 0, x: 80, y: 20 }}
        animate={{ opacity: 0.3, x: 0, y: 0 }}
        transition={{ duration: 2, delay: 1.3 }}
      >
        <div className="text-[9px] tracking-[0.3em] text-zinc-500">
          LOCAL MARKET
        </div>

        <div className="mt-5 flex gap-2">
          <div className="h-14 w-12 rounded-lg bg-white/10" />
          <div className="h-14 w-12 rounded-lg bg-white/[0.06]" />
          <div className="h-14 w-12 rounded-lg bg-white/[0.04]" />
        </div>
      </motion.div>


      {/* =========================================================
          CENTRAL CINEMATIC SUBJECT
      ========================================================= */}

      <div className="absolute inset-0 flex items-center justify-center">

        {/* Back light */}
        <motion.div
          className="absolute h-[420px] w-[420px] rounded-full bg-lime-300/10 blur-[100px]"
          animate={{
            scale: [0.8, 1.05, 0.8],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Human silhouette placeholder */}
        <motion.div
          className="relative z-10 flex h-[430px] w-[230px] items-end justify-center"
          initial={{ opacity: 0, y: 80, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >

          {/* Head */}
          <div className="absolute top-[15px] h-[100px] w-[78px] rounded-[45%] bg-gradient-to-br from-zinc-600 via-zinc-900 to-black shadow-[0_0_80px_rgba(180,255,80,0.08)]" />

          {/* Neck */}
          <div className="absolute top-[105px] h-[55px] w-[42px] bg-gradient-to-b from-zinc-800 to-black" />

          {/* Body / jacket */}
          <div className="absolute bottom-0 h-[290px] w-[210px] rounded-t-[90px] bg-gradient-to-br from-zinc-700/80 via-zinc-900 to-black shadow-2xl">

            {/* Jacket highlight */}
            <div className="absolute left-[35px] top-[20px] h-[230px] w-[2px] bg-white/10" />

            {/* Shirt */}
            <div className="absolute left-1/2 top-[35px] h-[170px] w-[70px] -translate-x-1/2 bg-gradient-to-b from-zinc-400/20 to-transparent" />

          </div>

          {/* Lime rim light */}
          <div className="absolute right-[5px] top-[70px] h-[300px] w-[3px] rounded-full bg-lime-300/50 blur-[3px]" />

        </motion.div>

      </div>


      {/* =========================================================
          CINEMATIC TYPOGRAPHY
      ========================================================= */}

      <div className="absolute left-[8%] top-1/2 z-30 -translate-y-1/2">

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >

          <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.5em] text-lime-300/80">
            DealDone
          </p>

          <h1 className="text-[clamp(4rem,9vw,9rem)] font-black leading-[0.82] tracking-[-0.07em]">
            FIND
            <br />
            <span className="text-white">IT.</span>
          </h1>

        </motion.div>

        <motion.p
          className="mt-7 max-w-[260px] text-xs uppercase leading-6 tracking-[0.28em] text-zinc-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1.2,
          }}
        >
          Right around
          <br />
          you.
        </motion.p>

      </div>


      {/* =========================================================
          FLOATING PRODUCT ELEMENTS
      ========================================================= */}

      <motion.div
        className="absolute right-[16%] bottom-[20%] z-20 hidden md:block"
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: 0.65,
          y: [0, -12, 0],
        }}
        transition={{
          opacity: { duration: 1, delay: 1.8 },
          y: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <div className="rounded-xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-md">

          <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-500">
            Nearby
          </p>

          <p className="mt-2 text-sm font-semibold">
            Smartphone
          </p>

          <div className="mt-2 flex items-center gap-3">
            <span className="text-xs text-lime-300">
              ₹18,999
            </span>

            <span className="text-[9px] text-zinc-600">
              Hyderabad
            </span>
          </div>

        </div>
      </motion.div>


      {/* =========================================================
          TOP BRAND MARK
      ========================================================= */}

      <motion.div
        className="absolute left-8 top-8 z-40 md:left-12 md:top-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <div className="flex items-center gap-3">

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-300 text-sm font-black text-black">
            D
          </div>

          <div>
            <div className="text-sm font-bold tracking-tight">
              DealDone
            </div>

            <div className="text-[7px] tracking-[0.35em] text-zinc-600">
              LOCAL MARKETPLACE
            </div>
          </div>

        </div>
      </motion.div>


      {/* =========================================================
          SCENE INDICATOR
      ========================================================= */}

      <div className="absolute bottom-8 left-8 right-8 z-40 flex items-center justify-between md:left-12 md:right-12">

        <div className="flex items-center gap-3">

          <div className="h-px w-12 bg-lime-300/50" />

          <span className="text-[8px] uppercase tracking-[0.35em] text-zinc-600">
            01 / 08
          </span>

        </div>

        <span className="text-[8px] uppercase tracking-[0.35em] text-zinc-700">
          FIND IT
        </span>

      </div>


      {/* =========================================================
          CINEMATIC VIGNETTE
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 z-50 shadow-[inset_0_0_180px_60px_rgba(0,0,0,0.75)]" />

    </main>
  );
}