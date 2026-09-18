"use client";

import { motion } from "framer-motion";
import {
  MessageCircle,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
  Star,
} from "lucide-react";

const experiences = [
  {
    icon: MapPin,
    number: "01",
    title: "Find Nearby",
    description:
      "Discover products available around you and explore local deals without endless searching.",
  },
  {
    icon: MessageCircle,
    number: "02",
    title: "Connect Directly",
    description:
      "Talk directly with the seller, ask questions, share details, and understand the deal before deciding.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Decide With Confidence",
    description:
      "See the details, communicate clearly, and make your decision on your own terms.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-[#f2f7dc] px-3 py-16 sm:px-6 sm:py-20 md:px-8 md:py-32">
      {/* =========================
          BACKGROUND
      ========================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-64 w-64 rounded-full bg-[#d4e84a]/25 blur-3xl sm:-left-32 sm:top-20 sm:h-80 sm:w-80" />

        <div className="absolute -right-40 bottom-10 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl sm:-right-32 sm:h-96 sm:w-96" />

        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-3xl sm:h-72 sm:w-72" />

        <div className="absolute left-[8%] top-[18%] h-1.5 w-1.5 rounded-full bg-emerald-700/40 sm:h-2 sm:w-2" />

        <div className="absolute right-[12%] top-[30%] h-2 w-2 rounded-full bg-lime-500/40 sm:h-3 sm:w-3" />

        <div className="absolute bottom-[20%] left-[22%] h-1.5 w-1.5 rounded-full bg-emerald-700/30 sm:h-2 sm:w-2" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* =========================
            HEADING
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-10 max-w-3xl text-center sm:mb-14 md:mb-16"
        >
          {/* Badge */}
          <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-emerald-900/10 bg-white/70 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-900 backdrop-blur sm:mb-5 sm:px-4 sm:text-xs sm:tracking-[0.2em]">
            <Star className="h-3 w-3 shrink-0 fill-current sm:h-3.5 sm:w-3.5" />

            <span className="truncate">
              The DealDone Experience
            </span>
          </div>

          {/* Main heading */}
          <h2 className="text-[38px] font-black leading-[0.98] tracking-[-1.8px] text-[#0a3d2e] min-[360px]:text-[42px] min-[360px]:tracking-[-2px] sm:text-5xl sm:tracking-[-2.5px] md:text-6xl">
            From finding it
            <br />
            <span className="text-emerald-700">
              to making the deal.
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-xl px-2 text-sm leading-6 text-emerald-950/60 min-[360px]:text-[15px] sm:mt-6 sm:px-0 sm:text-lg sm:leading-7">
            DealDone keeps the journey simple — discover something nearby,
            connect with the seller, and decide when the deal feels right.
          </p>
        </motion.div>

        {/* =========================
            EXPERIENCE CARDS
        ========================== */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
          {experiences.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.12,
                }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-[1.5rem] border border-emerald-900/10 bg-white/80 p-5 shadow-[0_16px_50px_rgba(10,61,46,0.07)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_30px_80px_rgba(10,61,46,0.14)] min-[380px]:rounded-[1.75rem] min-[380px]:p-6 sm:rounded-[2rem] sm:p-8"
              >
                {/* Number */}
                <div className="absolute right-4 top-4 text-[10px] font-bold tracking-[0.18em] text-emerald-900/25 min-[380px]:right-5 min-[380px]:top-5 sm:right-6 sm:top-6 sm:text-xs">
                  {item.number}
                </div>

                {/* Decorative circle */}
                <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#d4e84a]/20 transition-transform duration-700 group-hover:scale-150 sm:h-40 sm:w-40" />

                {/* Icon */}
                <div className="relative mb-8 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0a3d2e] text-[#d4e84a] shadow-lg transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110 min-[380px]:h-14 min-[380px]:w-14 min-[380px]:rounded-2xl sm:mb-12">
                  <Icon className="h-5 w-5 min-[380px]:h-6 min-[380px]:w-6" />
                </div>

                <div className="relative">
                  {/* Card title */}
                  <h3 className="text-[22px] font-bold leading-tight text-[#0a3d2e] min-[380px]:text-2xl">
                    {item.title}
                  </h3>

                  {/* Card description */}
                  <p className="mt-3 text-sm leading-6 text-emerald-950/55 min-[380px]:mt-4 min-[380px]:text-base min-[380px]:leading-7">
                    {item.description}
                  </p>

                  {/* Explore */}
                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-800 min-[380px]:mt-8 min-[380px]:text-sm">
                    <span>Explore DealDone</span>

                    <ArrowUpRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================
            BOTTOM STATEMENT
        ========================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-5 overflow-hidden rounded-[1.5rem] bg-[#0a3d2e] px-5 py-10 text-center shadow-[0_25px_70px_rgba(10,61,46,0.18)] min-[380px]:rounded-[1.75rem] min-[380px]:px-6 min-[380px]:py-11 sm:mt-6 sm:rounded-[2rem] sm:px-12 sm:py-12 md:py-16"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4e84a]/20 blur-3xl sm:h-48 sm:w-48" />

          {/* Flower mark */}
          <div className="relative mx-auto mb-5 flex h-11 w-11 items-center justify-center sm:mb-6 sm:h-12 sm:w-12">
            <div className="absolute inset-0 animate-[spin_8s_linear_infinite]">
              {[0, 60, 120, 180, 240, 300].map((rotation) => (
                <span
                  key={rotation}
                  className="absolute left-1/2 top-1/2 h-4 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4e84a] min-[380px]:h-5 min-[380px]:w-2.5"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-9px)`,
                  }}
                />
              ))}
            </div>

            <div className="relative h-2.5 w-2.5 rounded-full bg-[#f2f7dc]" />
          </div>

          {/* Statement */}
          <h3 className="relative text-[28px] font-black leading-tight tracking-[-1px] text-[#f2f7dc] min-[360px]:text-3xl min-[380px]:tracking-tight sm:text-4xl md:text-5xl">
            Good deals feel simple.
          </h3>

          {/* Bottom text */}
          <p className="relative mx-auto mt-3 max-w-xl text-xs leading-5 text-[#f2f7dc]/60 min-[380px]:mt-4 min-[380px]:text-sm min-[380px]:leading-6 sm:text-base">
            Discover. Connect. Decide.
            <span className="font-semibold text-[#d4e84a]">
              {" "}
              DealDone.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}