"use client";

import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  MessageCircle,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: Search,
    title: "Discover",
    description:
      "Find products across different categories without making the search complicated.",
  },
  {
    number: "02",
    icon: MapPin,
    title: "Find Nearby",
    description:
      "Explore products available around your location and discover local deals.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Connect Directly",
    description:
      "Talk directly with the seller and ask questions before making your decision.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Decide With Confidence",
    description:
      "Check the product details, understand the deal, and decide on your own terms.",
  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden bg-[#f2f7dc] px-5 py-20 sm:px-8 md:py-28">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#c9e265]/30 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#9dd6b5]/30 blur-3xl" />

        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#0a3d2e]/10 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0a3d2e] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#b8df4d]" />
            Why DealDone
          </div>

          <h2 className="text-4xl font-black tracking-[-0.04em] text-[#0a3d2e] sm:text-5xl md:text-6xl">
            A simpler way to
            <span className="block text-[#5f8d20]">
              make a deal.
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-[#527064] sm:text-lg">
            Discover products, find them nearby, connect directly with
            sellers, and decide when the deal feels right.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.number}
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/80 bg-white/80 p-7 shadow-[0_20px_60px_rgba(20,60,45,0.08)] backdrop-blur-xl transition-shadow duration-500 hover:shadow-[0_30px_80px_rgba(20,60,45,0.14)]"
              >
                {/* Number */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black tracking-[0.2em] text-[#91a59b]">
                    {feature.number}
                  </span>

                  <motion.div
                    whileHover={{
                      rotate: 8,
                      scale: 1.08,
                    }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0a3d2e] text-[#c9e265] shadow-lg"
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="mt-12">
                  <h3 className="text-2xl font-black tracking-tight text-[#0a3d2e]">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[#647970]">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom arrow */}
                <div className="mt-8 flex items-center justify-between border-t border-[#0a3d2e]/10 pt-5">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#91a59b]">
                    DealDone
                  </span>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f2f7dc] text-[#0a3d2e] transition-all duration-300 group-hover:bg-[#c9e265]">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Hover glow */}
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-32 w-32 rounded-full bg-[#c9e265]/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="mt-10 overflow-hidden rounded-[2rem] bg-[#0a3d2e] px-7 py-8 shadow-[0_25px_70px_rgba(10,61,46,0.18)] sm:px-10"
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b8df4d]">
                The DealDone way
              </p>

              <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                Discover. Connect. Decide.
                <span className="text-[#c9e265]"> DealDone.</span>
              </h3>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#c9e265] text-[#0a3d2e]">
              <ArrowUpRight className="h-6 w-6" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}