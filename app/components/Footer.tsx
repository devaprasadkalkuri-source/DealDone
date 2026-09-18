"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  MapPin,
  MessageCircle,
  Search,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0a3d2e] text-[#f2f7dc]">
      {/* =========================
          BACKGROUND ATMOSPHERE
      ========================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-[#d4e84a]/10 blur-3xl sm:-left-40 sm:-top-40 sm:h-[32rem] sm:w-[32rem]" />

        <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl sm:-bottom-40 sm:-right-40 sm:h-[34rem] sm:w-[34rem]" />

        <div className="absolute left-1/2 top-1/3 h-60 w-60 -translate-x-1/2 rounded-full bg-white/5 blur-3xl sm:h-80 sm:w-80" />

        {/* Small floating dots */}
        <span className="absolute left-[10%] top-[25%] h-1.5 w-1.5 rounded-full bg-[#d4e84a]/50 sm:h-2 sm:w-2" />

        <span className="absolute right-[15%] top-[18%] h-2 w-2 rounded-full bg-[#d4e84a]/30 sm:h-3 sm:w-3" />

        <span className="absolute bottom-[30%] left-[22%] h-1.5 w-1.5 rounded-full bg-white/20 sm:h-2 sm:w-2" />
      </div>

      <div className="relative mx-auto max-w-7xl px-3 pb-7 pt-14 min-[360px]:px-4 min-[380px]:pt-16 sm:px-6 sm:pb-10 sm:pt-20 md:px-8 md:pt-28">
        {/* =========================
            FINAL CTA
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.06] px-5 py-9 backdrop-blur-xl min-[360px]:rounded-[1.75rem] min-[360px]:px-6 min-[360px]:py-10 sm:rounded-[2.5rem] sm:px-10 sm:py-14 md:px-16 md:py-16"
        >
          {/* Decorative lime circle */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#d4e84a]/10 blur-2xl sm:-right-24 sm:-top-24 sm:h-72 sm:w-72" />

          <div className="relative grid items-center gap-8 sm:gap-10 md:grid-cols-[1fr_auto]">
            <div>
              {/* Brand mark */}
              <div className="mb-4 flex items-center gap-3 sm:mb-5">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center sm:h-10 sm:w-10">
                  <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
                    {[0, 60, 120, 180, 240, 300].map((rotation) => (
                      <span
                        key={rotation}
                        className="absolute left-1/2 top-1/2 h-3.5 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4e84a] sm:h-4"
                        style={{
                          transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-7px)`,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative h-2.5 w-2.5 rounded-full bg-[#f2f7dc]" />
                </div>

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d4e84a] sm:text-sm sm:tracking-[0.22em]">
                  DealDone
                </span>
              </div>

              {/* CTA Heading */}
              <h2 className="max-w-3xl text-[36px] font-black leading-[0.98] tracking-[-1.5px] min-[360px]:text-[40px] min-[380px]:tracking-[-2px] sm:text-5xl md:text-6xl">
                Find something
                <br />
                <span className="text-[#d4e84a]">
                  worth dealing for.
                </span>
              </h2>

              {/* CTA Description */}
              <p className="mt-5 max-w-xl text-sm leading-6 text-[#f2f7dc]/60 sm:mt-6 sm:text-lg sm:leading-7">
                Discover nearby products, connect directly with sellers,
                and make your next deal happen.
              </p>
            </div>

            {/* CTA Button */}
            <motion.a
              href="/"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#d4e84a] px-5 py-4 text-sm font-bold text-[#0a3d2e] shadow-[0_15px_40px_rgba(212,232,74,0.18)] transition-shadow hover:shadow-[0_20px_55px_rgba(212,232,74,0.28)] min-[380px]:px-6 sm:w-fit sm:text-base"
            >
              Explore Deals

              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </motion.a>
          </div>
        </motion.div>

        {/* =========================
            MAIN FOOTER
        ========================== */}
        <div className="grid gap-10 py-12 min-[380px]:py-14 sm:gap-12 sm:py-16 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <h2 className="text-[28px] font-black tracking-tight sm:text-3xl">
              Deal<span className="text-[#d4e84a]">Done</span>
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-[#f2f7dc]/50 sm:mt-5 sm:leading-7">
              A local marketplace built to make discovering products,
              connecting with people, and making deals feel simple.
            </p>

            <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-[#f2f7dc]/45 sm:mt-6 sm:text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d4e84a]" />

              <span>Local deals, wherever you are.</span>
            </div>
          </div>

          {/* =========================
              EXPLORE
          ========================== */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#d4e84a] sm:mb-5 sm:text-sm sm:tracking-[0.18em]">
              Explore
            </h3>

            <ul className="space-y-3.5 text-sm text-[#f2f7dc]/55 sm:space-y-4">
              <li>
                <a
                  href="/"
                  className="inline-flex min-h-8 items-center transition-colors hover:text-[#d4e84a]"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/products"
                  className="inline-flex min-h-8 items-center transition-colors hover:text-[#d4e84a]"
                >
                  Browse Deals
                </a>
              </li>

              <li>
                <a
                  href="/#categories"
                  className="inline-flex min-h-8 items-center transition-colors hover:text-[#d4e84a]"
                >
                  Categories
                </a>
              </li>

              <li>
                <a
                  href="/sell"
                  className="inline-flex min-h-8 items-center transition-colors hover:text-[#d4e84a]"
                >
                  Sell Something
                </a>
              </li>
            </ul>
          </div>

          {/* =========================
              HOW IT WORKS
          ========================== */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#d4e84a] sm:mb-5 sm:text-sm sm:tracking-[0.18em]">
              How It Works
            </h3>

            <ul className="space-y-3.5 text-sm text-[#f2f7dc]/55 sm:space-y-4">
              <li className="flex min-h-8 items-center gap-2">
                <Search className="h-4 w-4 shrink-0 text-[#d4e84a]/70" />
                Discover
              </li>

              <li className="flex min-h-8 items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-[#d4e84a]/70" />
                Find Nearby
              </li>

              <li className="flex min-h-8 items-center gap-2">
                <MessageCircle className="h-4 w-4 shrink-0 text-[#d4e84a]/70" />
                Connect
              </li>

              <li className="flex min-h-8 items-center gap-2">
                <Heart className="h-4 w-4 shrink-0 text-[#d4e84a]/70" />
                Decide
              </li>
            </ul>
          </div>

          {/* =========================
              BRAND STATEMENT
          ========================== */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#d4e84a] sm:mb-5 sm:text-sm sm:tracking-[0.18em]">
              DealDone
            </h3>

            <p className="text-[26px] font-bold leading-[1.05] text-[#f2f7dc]/90 sm:text-2xl">
              Discover.
              <br />
              Connect.
              <br />
              <span className="text-[#d4e84a]">Deal.</span>
            </p>
          </div>
        </div>

        {/* =========================
            BOTTOM LINE
        ========================== */}
        <div className="flex flex-col gap-5 border-t border-white/10 pt-6 text-[11px] text-[#f2f7dc]/35 min-[380px]:text-xs sm:gap-5 sm:pt-7 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xs leading-5">
            © 2026 DealDone. Built for better local deals.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="/"
              className="inline-flex min-h-8 items-center transition-colors hover:text-[#d4e84a]"
            >
              Privacy
            </a>

            <a
              href="/"
              className="inline-flex min-h-8 items-center transition-colors hover:text-[#d4e84a]"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}