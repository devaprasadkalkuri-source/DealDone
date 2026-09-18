"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Car,
  Check,
  Heart,
  Laptop,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Smartphone,
  Sofa,
  Sparkles,
  Star,
  UserRound,
} from "lucide-react";

const DURATION = 74000;

const scenes = [
  "chaos",
  "converge",
  "brand",
  "account",
  "secure",
  "local",
  "interests",
  "marketplace",
  "journey",
  "deal",
  "done",
  "ready",
] as const;

type Scene = (typeof scenes)[number];

const sceneLabels: Record<Scene, string> = {
  chaos: "START",
  converge: "ONE PLACE",
  brand: "DEALDONE",
  account: "ACCOUNT",
  secure: "SECURE",
  local: "NEARBY",
  interests: "INTERESTS",
  marketplace: "DISCOVER",
  journey: "CONNECT",
  deal: "DEAL",
  done: "DONE",
  ready: "READY",
};

function DealDoneMark({
  size = 72,
  dark = false,
}: {
  size?: number;
  dark?: boolean;
}) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: 12,
        repeat: Infinity,
        ease: "linear",
      }}
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.span
          key={index}
          className={`absolute left-1/2 top-1/2 h-[34%] w-[20%] origin-[50%_100%] rounded-full ${
            dark ? "bg-lime-300" : "bg-emerald-500"
          }`}
          style={{
            transform: `translate(-50%, -100%) rotate(${index * 60}deg)`,
          }}
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.72, 1, 0.72],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: index * 0.12,
            ease: "easeInOut",
          }}
        />
      ))}

      <div
        className={`absolute left-1/2 top-1/2 h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 rounded-full ${
          dark ? "bg-white" : "bg-[#0a3d2e]"
        }`}
      />
    </motion.div>
  );
}

function Glow({
  className,
  color = "green",
}: {
  className?: string;
  color?: "green" | "lime" | "blue";
}) {
  const colors = {
    green: "bg-emerald-400/20",
    lime: "bg-lime-300/25",
    blue: "bg-blue-400/15",
  };

  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-[100px] ${colors[color]} ${className ?? ""}`}
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.45, 0.8, 0.45],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 61) % 100}%`,
        size: 2 + (i % 3),
        delay: (i % 8) * 0.4,
        duration: 4 + (i % 5),
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-emerald-900/20"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-10, 18, -10],
            opacity: [0.12, 0.5, 0.12],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function GridBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,92,62,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(15,92,62,0.055) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "linear-gradient(to bottom, black, transparent 82%)",
        }}
      />

      <motion.div
        className="absolute left-[-10%] top-[30%] h-px w-[120%] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
        animate={{ x: ["-10%", "10%"] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

/* -------------------------------------------------------
   SCENE 1 — CHAOS
------------------------------------------------------- */

function ChaosScene() {
  const items = [
    {
      icon: Search,
      title: "Search",
      text: "Find products",
      x: "-12%",
      y: "4%",
      rotate: -8,
    },
    {
      icon: Heart,
      title: "Saved",
      text: "Your picks",
      x: "57%",
      y: "2%",
      rotate: 7,
    },
    {
      icon: MapPin,
      title: "Nearby",
      text: "Around you",
      x: "5%",
      y: "63%",
      rotate: 5,
    },
    {
      icon: MessageCircle,
      title: "Messages",
      text: "Talk directly",
      x: "61%",
      y: "66%",
      rotate: -7,
    },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Glow className="left-[15%] top-[20%] h-64 w-64" />
      <Glow color="lime" className="bottom-[10%] right-[15%] h-56 w-56" />

      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            className="absolute w-[180px] rounded-3xl border border-white/80 bg-white/75 p-4 shadow-[0_25px_70px_rgba(15,61,46,0.12)] backdrop-blur-xl"
            style={{
              left: item.x,
              top: item.y,
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: 1,
              scale: [1, 1.04, 1],
              y: [0, -7, 0],
              rotate: item.rotate,
            }}
            transition={{
              opacity: { duration: 0.6, delay: index * 0.15 },
              scale: {
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: 4 + index,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0a3d2e] text-lime-300">
                <Icon size={18} />
              </div>

              <div>
                <p className="text-sm font-bold text-[#17382b]">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[11px] text-zinc-500">
                  {item.text}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-[320px] text-center"
      >
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 rgba(212,232,74,0)",
              "0 0 55px rgba(212,232,74,0.18)",
              "0 0 0 rgba(212,232,74,0)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-[28px] bg-[#0a3d2e]"
        >
          <Search className="text-lime-300" size={30} />
        </motion.div>

        <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-700">
          Everything scattered
        </p>

        <h2 className="mt-4 text-3xl font-black tracking-tight text-[#17382b] sm:text-4xl">
          Finding the right deal
          <span className="block text-emerald-600">
            shouldn't feel complicated.
          </span>
        </h2>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------
   SCENE 2 — CONVERGE
------------------------------------------------------- */

function ConvergeScene() {
  const cards = [
    { label: "Discover", icon: Search, angle: -35 },
    { label: "Nearby", icon: MapPin, angle: 35 },
    { label: "Connect", icon: MessageCircle, angle: 145 },
    { label: "Save", icon: Heart, angle: 215 },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Glow className="left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        className="absolute h-[360px] w-[360px] rounded-full border border-emerald-500/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute h-[250px] w-[250px] rounded-full border border-lime-500/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.label}
            className="absolute flex items-center gap-3 rounded-2xl border border-white/90 bg-white/85 px-4 py-3 shadow-xl backdrop-blur-xl"
            initial={{
              opacity: 0,
              x: Math.cos((card.angle * Math.PI) / 180) * 260,
              y: Math.sin((card.angle * Math.PI) / 180) * 200,
            }}
            animate={{
              opacity: 1,
              x: Math.cos((card.angle * Math.PI) / 180) * 125,
              y: Math.sin((card.angle * Math.PI) / 180) * 95,
            }}
            transition={{
              duration: 1.2,
              delay: index * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <Icon size={17} />
            </div>

            <span className="text-sm font-bold text-[#17382b]">
              {card.label}
            </span>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.9 }}
        className="relative z-20 flex flex-col items-center"
      >
        <div className="flex h-28 w-28 items-center justify-center rounded-[38px] bg-[#0a3d2e] shadow-[0_25px_80px_rgba(10,61,46,0.28)]">
          <DealDoneMark size={76} dark />
        </div>

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.32em] text-emerald-700">
          One place
        </p>

        <h2 className="mt-2 text-3xl font-black text-[#17382b]">
          Your next deal.
        </h2>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------
   SCENE 3 — BRAND
------------------------------------------------------- */

function BrandScene() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Glow className="left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <DealDoneMark size={105} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30, letterSpacing: "0.4em" }}
          animate={{
            opacity: 1,
            y: 0,
            letterSpacing: "-0.04em",
          }}
          transition={{
            delay: 0.45,
            duration: 1,
          }}
          className="mt-8 text-6xl font-black text-[#0a3d2e] sm:text-8xl"
        >
          DEAL<span className="text-emerald-500">DONE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-5 text-lg font-medium text-zinc-500"
        >
          One place for your next deal.
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 150 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-7 h-1 rounded-full bg-lime-400"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   SCENE 4 — ACCOUNT
------------------------------------------------------- */

function AccountScene() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative w-[360px] max-w-[80%]">
        <Glow className="-left-32 top-0 h-64 w-64" />

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 15 }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: 0,
          }}
          transition={{ duration: 1 }}
          className="relative rounded-[32px] border border-white/80 bg-white/90 p-7 shadow-[0_35px_100px_rgba(15,61,46,0.14)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-600">
                Step 01
              </p>

              <h2 className="mt-2 text-2xl font-black text-[#17382b]">
                Let's get you started.
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0a3d2e]">
              <UserRound size={19} className="text-lime-300" />
            </div>
          </div>

          <div className="mt-7 space-y-3">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <p className="text-[10px] text-zinc-400">YOUR NAME</p>
              <motion.p
                animate={{ opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="mt-1 text-sm font-semibold text-zinc-700"
              >
                Your name
              </motion.p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              <p className="text-[10px] text-zinc-400">EMAIL OR PHONE</p>
              <p className="mt-1 text-sm font-semibold text-zinc-700">
                How should we reach you?
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 rounded-2xl bg-[#0a3d2e] py-3 text-sm font-bold text-lime-300">
              Create your account
              <ArrowRight size={16} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   SCENE 5 — SECURE
------------------------------------------------------- */

function SecureScene() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative text-center">
        <Glow
          color="lime"
          className="left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2"
        />

        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            boxShadow: [
              "0 0 0 rgba(212,232,74,0)",
              "0 0 80px rgba(212,232,74,0.25)",
              "0 0 0 rgba(212,232,74,0)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-[42px] bg-[#0a3d2e]"
        >
          <ShieldCheck size={58} className="text-lime-300" />

          <motion.div
            className="absolute inset-3 rounded-[34px] border border-lime-300/20"
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
        </motion.div>

        <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-emerald-700">
          Step 02
        </p>

        <h2 className="mt-3 text-4xl font-black tracking-tight text-[#17382b]">
          Keep your account
          <span className="block text-emerald-600">secure.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-zinc-500">
          Your account keeps your saved deals and conversations together.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   SCENE 6 — LOCAL MAP
------------------------------------------------------- */

function LocalScene() {
  const pins = [
    { left: "18%", top: "25%", delay: 0 },
    { left: "67%", top: "19%", delay: 0.4 },
    { left: "44%", top: "48%", delay: 0.8 },
    { left: "76%", top: "66%", delay: 1.2 },
    { left: "23%", top: "73%", delay: 1.6 },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Glow className="left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative h-[430px] w-[650px] max-w-[88%] overflow-hidden rounded-[40px] border border-white/80 bg-[#eaf4e8] shadow-[0_35px_100px_rgba(15,61,46,0.13)]">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(30deg, transparent 47%, rgba(15,92,62,0.10) 48%, transparent 49%), linear-gradient(120deg, transparent 47%, rgba(15,92,62,0.08) 48%, transparent 49%)",
            backgroundSize: "90px 90px",
          }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/20"
          animate={{ scale: [0.7, 1.3], opacity: [0.7, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a3d2e] shadow-[0_10px_35px_rgba(10,61,46,0.3)]"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <MapPin size={24} className="text-lime-300" />
        </motion.div>

        {pins.map((pin, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: pin.left,
              top: pin.top,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: pin.delay,
              duration: 0.6,
              type: "spring",
            }}
          >
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: pin.delay,
              }}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white bg-white shadow-lg"
            >
              <MapPin size={17} className="text-emerald-600" />
            </motion.div>
          </motion.div>
        ))}

        <div className="absolute left-6 top-6 rounded-2xl border border-white bg-white/85 px-4 py-3 shadow-lg backdrop-blur-xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600">
            Step 03
          </p>
          <p className="mt-1 text-sm font-black text-[#17382b]">
            Deals are better nearby.
          </p>
        </div>

        <div className="absolute bottom-6 right-6 rounded-2xl bg-[#0a3d2e] px-5 py-3 text-xs font-bold text-lime-300 shadow-xl">
          NEAR YOU
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   SCENE 7 — INTERESTS
------------------------------------------------------- */

function InterestsScene() {
  const categories = [
    { name: "Mobiles", icon: Smartphone },
    { name: "Vehicles", icon: Car },
    { name: "Furniture", icon: Sofa },
    { name: "Electronics", icon: Laptop },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-[650px] max-w-[88%]">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600">
            Step 04
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-[#17382b] sm:text-5xl">
            What are you
            <span className="text-emerald-600"> looking for?</span>
          </h2>

          <p className="mt-3 text-sm text-zinc-500">
            Start with the categories that matter to you.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const selected = index < 2;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.7,
                }}
                whileHover={{ y: -5 }}
                className={`relative overflow-hidden rounded-[28px] border p-5 shadow-[0_20px_50px_rgba(15,61,46,0.08)] ${
                  selected
                    ? "border-emerald-500 bg-[#0a3d2e] text-white"
                    : "border-white/80 bg-white/80 text-[#17382b]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                      selected
                        ? "bg-lime-300 text-[#0a3d2e]"
                        : "bg-emerald-50 text-emerald-700"
                    }`}
                  >
                    <Icon size={22} />
                  </div>

                  {selected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-lime-300 text-[#0a3d2e]"
                    >
                      <Check size={15} />
                    </motion.div>
                  )}
                </div>

                <p className="mt-6 text-lg font-black">
                  {category.name}
                </p>

                <p
                  className={`mt-1 text-xs ${
                    selected ? "text-white/60" : "text-zinc-500"
                  }`}
                >
                  Explore nearby listings
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   SCENE 8 — MARKETPLACE
------------------------------------------------------- */

function MarketplaceScene() {
  const cards = [
    {
      icon: Smartphone,
      title: "Discover",
      text: "Find what you need",
    },
    {
      icon: MapPin,
      title: "Nearby",
      text: "See what's around",
    },
    {
      icon: MessageCircle,
      title: "Connect",
      text: "Talk directly",
    },
  ];

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <Glow color="lime" className="left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2" />

      <div className="relative w-[760px] max-w-[90%]">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600">
              Your marketplace
            </p>
            <h2 className="mt-2 text-4xl font-black text-[#17382b]">
              Discover. Your way.
            </h2>
          </div>

          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-lime-300 text-[#0a3d2e] sm:flex"
          >
            <Sparkles size={23} />
          </motion.div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 35 }}
                animate={{
                  opacity: 1,
                  y: [0, -6, 0],
                }}
                transition={{
                  opacity: {
                    delay: index * 0.18,
                    duration: 0.7,
                  },
                  y: {
                    delay: index * 0.18,
                    duration: 4 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="rounded-[28px] border border-white/90 bg-white/85 p-5 shadow-[0_25px_60px_rgba(15,61,46,0.1)] backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0a3d2e] text-lime-300">
                    <Icon size={19} />
                  </div>

                  <Heart size={16} className="text-zinc-300" />
                </div>

                <p className="mt-6 text-lg font-black text-[#17382b]">
                  {card.title}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {card.text}
                </p>

                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-zinc-100">
                  <motion.div
                    className="h-full rounded-full bg-lime-400"
                    initial={{ width: 0 }}
                    animate={{ width: "72%" }}
                    transition={{
                      delay: 0.6 + index * 0.2,
                      duration: 1,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   SCENE 9 — JOURNEY
------------------------------------------------------- */

function JourneyScene() {
  const steps = [
    "DISCOVER",
    "NEARBY",
    "CONNECT",
    "CHAT",
    "DECIDE",
  ];

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-[900px] max-w-[92%]">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600">
            The DealDone journey
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-[#17382b] sm:text-6xl">
            From discovery
            <span className="text-emerald-600"> to decision.</span>
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-[7%] right-[7%] top-1/2 hidden h-px bg-emerald-900/10 md:block" />

          <motion.div
            className="absolute left-[7%] top-1/2 hidden h-1 -translate-y-1/2 rounded-full bg-lime-400 md:block"
            initial={{ width: 0 }}
            animate={{ width: "86%" }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />

          <div className="relative grid grid-cols-2 gap-8 md:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: 1,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  opacity: {
                    delay: index * 0.25,
                    duration: 0.5,
                  },
                  scale: {
                    delay: index * 0.25 + 0.5,
                    duration: 2,
                    repeat: Infinity,
                  },
                }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#f2f7dc] bg-[#0a3d2e] shadow-xl">
                  <span className="text-xs font-black text-lime-300">
                    0{index + 1}
                  </span>
                </div>

                <p className="mt-4 text-[11px] font-black tracking-[0.12em] text-[#17382b]">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   SCENE 10 — DEAL
------------------------------------------------------- */

function DealScene() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0a3d2e]">
      <motion.div
        className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-lime-300/10"
        animate={{ scale: [0.8, 1.1, 0.8], rotate: 360 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute h-72 w-72 rounded-full bg-lime-300/10 blur-[80px]"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      <div className="relative z-10 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.45em] text-lime-300/70">
          When everything lines up
        </p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{
            opacity: 1,
            scale: [1, 1.04, 1],
          }}
          transition={{
            opacity: { duration: 0.7 },
            scale: { duration: 2.5, repeat: Infinity },
          }}
          className="mt-5 text-[100px] font-black leading-none tracking-[-0.08em] text-white sm:text-[170px]"
        >
          DEAL
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 220 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto mt-6 h-2 rounded-full bg-lime-300"
        />

        <p className="mx-auto mt-7 max-w-md text-base leading-7 text-white/60">
          Find it. Talk about it. Make the deal.
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   SCENE 11 — DONE
------------------------------------------------------- */

function DoneScene() {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#0a3d2e]">
      <Glow color="lime" className="left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{
            scale: [1, 1.08, 1],
            rotate: 0,
          }}
          transition={{
            scale: {
              duration: 2.5,
              repeat: Infinity,
            },
            rotate: {
              duration: 0.9,
            },
          }}
          className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-lime-300 shadow-[0_0_80px_rgba(212,232,74,0.25)]"
        >
          <Check size={62} strokeWidth={3} className="text-[#0a3d2e]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-9 text-[100px] font-black leading-none tracking-[-0.08em] text-white sm:text-[150px]"
        >
          DONE.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-5 text-lg text-white/60"
        >
          Your DealDone starts here.
        </motion.p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   SCENE 12 — READY
------------------------------------------------------- */

function ReadyScene() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Glow className="left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: [1, 1.07, 1],
          }}
          transition={{
            opacity: { duration: 0.7 },
            scale: { duration: 3, repeat: Infinity },
          }}
          className="mx-auto flex h-28 w-28 items-center justify-center rounded-[36px] bg-[#0a3d2e] shadow-[0_30px_90px_rgba(10,61,46,0.2)]"
        >
          <DealDoneMark size={78} dark />
        </motion.div>

        <p className="mt-8 text-xs font-black uppercase tracking-[0.35em] text-emerald-600">
          You're almost there
        </p>

        <h2 className="mt-4 text-5xl font-black tracking-[-0.04em] text-[#17382b] sm:text-7xl">
          Ready to find
          <span className="block text-emerald-600">
            your next deal?
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full bg-[#0a3d2e] px-6 py-3 text-sm font-bold text-lime-300 shadow-xl"
        >
          Start exploring
          <ArrowRight size={17} />
        </motion.div>

        <p className="mt-6 text-xs font-semibold tracking-[0.18em] text-zinc-400">
          DISCOVER • CONNECT • DECIDE • DEALDONE
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   MAIN HERO
------------------------------------------------------- */

export default function SignupHero() {
  const [progress, setProgress] = useState(0);

  const sceneIndex = Math.min(
    Math.floor(progress * scenes.length),
    scenes.length - 1
  );

  const scene = scenes[sceneIndex];

  useEffect(() => {
    const start = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const nextProgress = (elapsed % DURATION) / DURATION;

      setProgress(nextProgress);
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const darkScene =
    scene === "deal" ||
    scene === "done";

  return (
    <div
      className={`relative h-full min-h-screen overflow-hidden transition-colors duration-1000 ${
        darkScene
          ? "bg-[#0a3d2e]"
          : "bg-[#f2f7dc]"
      }`}
    >
      {/* Background */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          darkScene ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#f8fbf0] via-[#edf5dc] to-[#dcefd9]" />
      </div>

      <div
        className={`absolute inset-0 bg-[#0a3d2e] transition-opacity duration-1000 ${
          darkScene ? "opacity-100" : "opacity-0"
        }`}
      />

      <GridBackground />
      <Particles />

      {/* Large moving ambient lights */}
      <motion.div
        className={`pointer-events-none absolute -left-32 top-[-10%] h-[500px] w-[500px] rounded-full blur-[120px] transition-colors ${
          darkScene
            ? "bg-emerald-500/10"
            : "bg-emerald-300/25"
        }`}
        animate={{
          x: [0, 80, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className={`pointer-events-none absolute -bottom-32 right-[-10%] h-[550px] w-[550px] rounded-full blur-[130px] transition-colors ${
          darkScene
            ? "bg-lime-300/10"
            : "bg-lime-300/30"
        }`}
        animate={{
          x: [0, -90, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Decorative orbit */}
      <motion.div
        className={`pointer-events-none absolute left-[8%] top-[18%] h-40 w-40 rounded-full border transition-colors ${
          darkScene
            ? "border-lime-300/10"
            : "border-emerald-800/10"
        }`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className={`pointer-events-none absolute bottom-[15%] right-[10%] h-64 w-64 rounded-full border transition-colors ${
          darkScene
            ? "border-lime-300/10"
            : "border-emerald-800/10"
        }`}
        animate={{ rotate: -360 }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Top brand */}
      <div className="absolute left-5 top-5 z-40 flex items-center gap-3 sm:left-8 sm:top-7">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-lg transition-colors ${
            darkScene
              ? "bg-lime-300"
              : "bg-[#0a3d2e]"
          }`}
        >
          <DealDoneMark size={27} dark={!darkScene} />
        </div>

        <div>
          <p
            className={`text-sm font-black tracking-tight transition-colors ${
              darkScene ? "text-white" : "text-[#17382b]"
            }`}
          >
            DEAL<span className="text-emerald-500">DONE</span>
          </p>

          <p
            className={`text-[9px] font-bold uppercase tracking-[0.22em] transition-colors ${
              darkScene ? "text-white/40" : "text-zinc-400"
            }`}
          >
            Local marketplace
          </p>
        </div>
      </div>

      {/* Scene counter */}
      <div className="absolute right-5 top-5 z-40 sm:right-8 sm:top-7">
        <div
          className={`rounded-full border px-4 py-2 text-[10px] font-black tracking-[0.2em] backdrop-blur-xl transition-colors ${
            darkScene
              ? "border-white/10 bg-white/5 text-white/50"
              : "border-white bg-white/65 text-emerald-800/60"
          }`}
        >
          {String(sceneIndex + 1).padStart(2, "0")} /{" "}
          {String(scenes.length).padStart(2, "0")}
          <span className="mx-2 opacity-40">•</span>
          {sceneLabels[scene]}
        </div>
      </div>

      {/* Main animation */}
      <div className="relative z-20 h-full min-h-screen px-4 pb-16 pt-24 sm:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={scene}
            className="h-full min-h-[calc(100vh-150px)]"
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 1.04,
              y: -15,
              filter: "blur(8px)",
            }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {scene === "chaos" && <ChaosScene />}
            {scene === "converge" && <ConvergeScene />}
            {scene === "brand" && <BrandScene />}
            {scene === "account" && <AccountScene />}
            {scene === "secure" && <SecureScene />}
            {scene === "local" && <LocalScene />}
            {scene === "interests" && <InterestsScene />}
            {scene === "marketplace" && <MarketplaceScene />}
            {scene === "journey" && <JourneyScene />}
            {scene === "deal" && <DealScene />}
            {scene === "done" && <DoneScene />}
            {scene === "ready" && <ReadyScene />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom story line */}
      <div className="absolute bottom-5 left-5 right-5 z-40 sm:bottom-7 sm:left-8 sm:right-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 overflow-hidden rounded-full bg-black/10">
            <motion.div
              className={`h-1 rounded-full ${
                darkScene ? "bg-lime-300" : "bg-emerald-600"
              }`}
              style={{
                width: `${progress * 100}%`,
              }}
            />
          </div>

          <span
            className={`hidden text-[10px] font-bold tracking-[0.18em] sm:block ${
              darkScene ? "text-white/40" : "text-zinc-400"
            }`}
          >
            DISCOVER • CONNECT • DEALDONE
          </span>
        </div>
      </div>

      {/* Soft film grain */}
      <div
        className={`pointer-events-none absolute inset-0 z-50 opacity-[0.035] ${
          darkScene ? "bg-white" : "bg-black"
        }`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}