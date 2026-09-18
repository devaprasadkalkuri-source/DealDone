"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Heart,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
  UserRound,
} from "lucide-react";

const DURATION = 26000;

const scenes = [
  "welcome",
  "discover",
  "nearby",
  "explore",
  "connect",
  "chat",
  "trust",
  "deal",
  "done",
];

function DealDoneMark({ size = 44 }: { size?: number }) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: size, height: size }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 rounded-full border border-[#3b7df6]/20"
      />

      {Array.from({ length: 6 }).map((_, index) => (
        <motion.span
          key={index}
          className="absolute h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[#3b7df6] to-[#5b9bff]"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) rotate(${index * 60}deg) translateY(-13px)`,
          }}
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.65, 1, 0.65],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="absolute h-3 w-3 rounded-full bg-[#3b7df6] shadow-[0_0_18px_rgba(59,125,246,0.6)]" />
    </div>
  );
}

function FloatingOrb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{
        x: [0, 25, -10, 0],
        y: [0, -20, 15, 0],
        scale: [1, 1.08, 0.95, 1],
      }}
      transition={{
        duration: 9,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute rounded-full blur-3xl ${className}`}
    />
  );
}

function ProductShape({
  icon,
  label,
  className,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -12, 0],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`absolute rounded-3xl border border-white/80 bg-white/80 p-4 shadow-[0_20px_60px_rgba(59,125,246,0.12)] backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3b7df6] to-[#5b9bff] text-white">
          {icon}
        </div>

        <span className="text-xs font-semibold text-[#53647a]">{label}</span>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   SCENE 1 — WELCOME
------------------------------------------------------- */

function WelcomeScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative text-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 flex justify-center"
        >
          <DealDoneMark size={76} />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl font-medium tracking-tight text-[#8d9caf] md:text-5xl"
        >
          Good deals
        </motion.p>

        <motion.p
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-2 text-4xl font-black tracking-tight text-[#3b7df6] md:text-6xl"
        >
          should be easier.
        </motion.p>
      </div>

      <ProductShape
        icon={<Tag size={18} />}
        label="Deals"
        className="left-[8%] top-[22%]"
      />

      <ProductShape
        icon={<MapPin size={18} />}
        label="Nearby"
        className="right-[8%] bottom-[20%]"
        delay={0.8}
      />
    </motion.div>
  );
}

/* -------------------------------------------------------
   SCENE 2 — DISCOVER
------------------------------------------------------- */

function DiscoverScene() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="w-full max-w-[520px]">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a6b3c9]">
            Discover
          </p>

          <h2 className="mt-2 text-4xl font-black tracking-tight text-[#27384e] md:text-5xl">
            Find what
            <span className="text-[#3b7df6]"> you need.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="rounded-[2rem] border border-white bg-white/90 p-3 shadow-[0_30px_80px_rgba(59,125,246,0.13)]"
        >
          <div className="flex items-center gap-3 rounded-[1.4rem] bg-[#f4f7fb] px-5 py-4">
            <Search className="text-[#3b7df6]" size={21} />

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-[#91a0b2]"
            >
              Search for phones, bikes, laptops...
            </motion.span>

            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="h-5 w-px bg-[#3b7df6]"
            />
          </div>
        </motion.div>

        <div className="mt-5 flex flex-wrap gap-3">
          {["Mobiles", "Vehicles", "Furniture", "Electronics"].map(
            (item, index) => (
              <motion.div
                key={item}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + index * 0.1 }}
                className="rounded-full border border-[#dce5ef] bg-white px-4 py-2 text-xs font-semibold text-[#66778c] shadow-sm"
              >
                {item}
              </motion.div>
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   SCENE 3 — NEARBY
------------------------------------------------------- */

function NearbyScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative h-[430px] w-full max-w-[560px] overflow-hidden rounded-[2.5rem] border border-white bg-[#f4f7fb] shadow-[0_35px_90px_rgba(59,125,246,0.13)]">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute left-[10%] top-[25%] h-px w-[80%] rotate-12 bg-[#cdd9e7]" />
          <div className="absolute left-[5%] top-[52%] h-px w-[90%] -rotate-6 bg-[#cdd9e7]" />
          <div className="absolute left-[20%] top-[75%] h-px w-[70%] rotate-3 bg-[#cdd9e7]" />

          <div className="absolute left-[30%] top-0 h-full w-px bg-[#d8e2ed]" />
          <div className="absolute left-[65%] top-0 h-full w-px bg-[#d8e2ed]" />
        </div>

        <div className="absolute left-7 top-7">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a6b3c9]">
            Nearby
          </p>

          <h2 className="mt-2 text-4xl font-black text-[#27384e]">
            Find it
            <span className="text-[#3b7df6]"> nearby.</span>
          </h2>
        </div>

        {[
          { left: "25%", top: "48%", delay: 0 },
          { left: "67%", top: "34%", delay: 0.4 },
          { left: "52%", top: "72%", delay: 0.8 },
        ].map((pin, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: pin.delay, type: "spring" }}
            style={{
              left: pin.left,
              top: pin.top,
            }}
            className="absolute"
          >
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: pin.delay,
              }}
              className="absolute -inset-3 rounded-full bg-[#3b7df6]/10"
            />

            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#3b7df6] text-white shadow-lg">
              <MapPin size={18} />
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-7 left-7 rounded-2xl border border-white bg-white/90 px-4 py-3 shadow-xl backdrop-blur"
        >
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full bg-[#b8df4d]" />
            <span className="text-xs font-semibold text-[#53647a]">
              Products around you
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   SCENE 4 — EXPLORE
------------------------------------------------------- */

function ExploreScene() {
  const cards = [
    { title: "Explore", icon: <Sparkles size={18} /> },
    { title: "Save", icon: <Heart size={18} /> },
    { title: "Compare", icon: <Check size={18} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="w-full max-w-[560px]">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a6b3c9]">
          Explore
        </p>

        <h2 className="mt-2 text-4xl font-black tracking-tight text-[#27384e] md:text-5xl">
          Explore.
          <span className="text-[#3b7df6]"> Choose.</span>
        </h2>

        <div className="mt-9 grid grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ y: 40, opacity: 0, rotate: index % 2 ? 2 : -2 }}
              animate={{ y: 0, opacity: 1, rotate: index % 2 ? -2 : 2 }}
              transition={{
                delay: index * 0.18,
                duration: 0.7,
              }}
              className="rounded-[1.8rem] border border-white bg-white p-4 shadow-[0_25px_65px_rgba(59,125,246,0.1)]"
            >
              <div className="flex aspect-square items-center justify-center rounded-[1.4rem] bg-gradient-to-br from-[#edf4ff] to-[#f7f9fc]">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3b7df6] to-[#5b9bff] text-white shadow-lg">
                  {card.icon}
                </div>
              </div>

              <p className="mt-4 text-center text-xs font-bold text-[#53647a]">
                {card.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   SCENE 5 — CONNECT
------------------------------------------------------- */

function ConnectScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="relative w-full max-w-[560px]">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a6b3c9]">
            Connect
          </p>

          <h2 className="mt-2 text-4xl font-black text-[#27384e] md:text-5xl">
            Talk
            <span className="text-[#3b7df6]"> directly.</span>
          </h2>
        </div>

        <div className="relative mt-12 flex items-center justify-between px-5">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="rounded-[1.8rem] border border-white bg-white p-5 shadow-[0_25px_65px_rgba(59,125,246,0.12)]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#edf4ff] text-[#3b7df6]">
              <UserRound />
            </div>

            <p className="mt-3 text-xs font-bold text-[#53647a]">
              Buyer
            </p>
          </motion.div>

          <div className="relative mx-4 h-px flex-1 bg-[#cfdceb]">
            <motion.div
              animate={{ left: ["0%", "100%"] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-[#3b7df6] shadow-[0_0_15px_rgba(59,125,246,0.55)]"
            />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#3b7df6] to-[#5b9bff] text-white shadow-xl"
            >
              <MessageCircle size={20} />
            </motion.div>
          </div>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="rounded-[1.8rem] border border-white bg-white p-5 shadow-[0_25px_65px_rgba(59,125,246,0.12)]"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f1f5f9] text-[#53647a]">
              <UserRound />
            </div>

            <p className="mt-3 text-xs font-bold text-[#53647a]">
              Seller
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   SCENE 6 — CHAT
------------------------------------------------------- */

function ChatScene() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="w-full max-w-[500px]">
        <div className="mb-7">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#a6b3c9]">
            Connect
          </p>

          <h2 className="mt-2 text-4xl font-black text-[#27384e]">
            Have a
            <span className="text-[#3b7df6]"> conversation.</span>
          </h2>
        </div>

        <div className="rounded-[2rem] border border-white bg-white p-5 shadow-[0_30px_80px_rgba(59,125,246,0.13)]">
          <div className="flex items-center gap-3 border-b border-[#edf1f5] pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#edf4ff] text-[#3b7df6]">
              <MessageCircle size={18} />
            </div>

            <div>
              <p className="text-sm font-bold text-[#27384e]">
                Deal conversation
              </p>

              <p className="text-[10px] text-[#a6b3c9]">
                Direct seller chat
              </p>
            </div>
          </div>

          <div className="space-y-3 py-5">
            <motion.div
              initial={{ x: -15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="w-fit rounded-2xl rounded-tl-md bg-[#f1f5f9] px-4 py-3 text-xs text-[#607187]"
            >
              Is this still available?
            </motion.div>

            <motion.div
              initial={{ x: 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="ml-auto w-fit rounded-2xl rounded-tr-md bg-[#3b7df6] px-4 py-3 text-xs text-white"
            >
              Yes, it is available 👍
            </motion.div>

            <motion.div
              initial={{ x: -15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="w-fit rounded-2xl rounded-tl-md bg-[#f1f5f9] px-4 py-3 text-xs text-[#607187]"
            >
              Great. Let's discuss the deal.
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   SCENE 7 — TRUST
------------------------------------------------------- */

function TrustScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 12,
          }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#3b7df6] to-[#5b9bff] text-white shadow-[0_20px_50px_rgba(59,125,246,0.3)]"
        >
          <ShieldCheck size={42} strokeWidth={1.7} />
        </motion.div>

        <p className="mt-7 text-sm font-semibold uppercase tracking-[0.25em] text-[#a6b3c9]">
          Decide with confidence
        </p>

        <h2 className="mt-3 text-4xl font-black text-[#27384e] md:text-5xl">
          Your choice.
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#8998aa]">
          See the details. Talk to the seller. Ask questions.
          <br />
          Then decide on your terms.
        </p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   SCENE 8 — DEAL
------------------------------------------------------- */

function DealScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{
            scale: [0.6, 1.08, 1],
            opacity: 1,
          }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-[6rem] font-black leading-none tracking-[-0.08em] text-[#3b7df6] md:text-[9rem]"
        >
          DEAL
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mx-auto mt-5 h-1 rounded-full bg-gradient-to-r from-[#3b7df6] to-[#5b9bff]"
        />

        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-5 text-sm font-medium text-[#a6b3c9]"
        >
          Discover. Connect. Decide.
        </motion.p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   SCENE 9 — DONE
------------------------------------------------------- */

function DoneScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 170,
            damping: 12,
          }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#b8df4d] text-[#17324d] shadow-[0_20px_60px_rgba(184,223,77,0.3)]"
        >
          <Check size={46} strokeWidth={3} />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-8 text-7xl font-black tracking-[-0.07em] text-[#27384e] md:text-8xl"
        >
          DONE.
        </motion.p>

        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 text-lg font-semibold text-[#3b7df6]"
        >
          That’s a DealDone.
        </motion.p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   MAIN AUTH HERO
------------------------------------------------------- */

export default function AuthHero() {
  const [sceneIndex, setSceneIndex] = useState(0);

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) % DURATION;
      const progress = elapsed / DURATION;

      const nextIndex = Math.min(
        Math.floor(progress * scenes.length),
        scenes.length - 1
      );

      setSceneIndex(nextIndex);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const scene = scenes[sceneIndex];

  return (
    <section className="relative hidden min-h-screen overflow-hidden bg-[#fafbfc] lg:flex">
      {/* Background glow */}
      <FloatingOrb
        className="left-[-180px] top-[-160px] h-[430px] w-[430px] bg-[#3b7df6]/10"
      />

      <FloatingOrb
        className="bottom-[-200px] right-[-150px] h-[500px] w-[500px] bg-[#b8df4d]/10"
        delay={1}
      />

      <FloatingOrb
        className="right-[25%] top-[20%] h-[220px] w-[220px] bg-[#5b9bff]/5"
        delay={2}
      />

      {/* Very subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(166,179,201,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(166,179,201,0.08) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex w-full flex-col px-10 py-10 xl:px-16">
        {/* Brand */}
        <motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex items-center gap-3"
        >
          <DealDoneMark size={42} />

          <div>
            <p className="text-lg font-black tracking-tight text-[#27384e]">
              DEAL<span className="text-[#3b7df6]">DONE</span>
            </p>

            <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#a6b3c9]">
              Local marketplace
            </p>
          </div>
        </motion.div>

        {/* Animation */}
        <div className="relative flex flex-1 items-center justify-center">
          <AnimatePresence mode="wait">
            {scene === "welcome" && <WelcomeScene key="welcome" />}

            {scene === "discover" && <DiscoverScene key="discover" />}

            {scene === "nearby" && <NearbyScene key="nearby" />}

            {scene === "explore" && <ExploreScene key="explore" />}

            {scene === "connect" && <ConnectScene key="connect" />}

            {scene === "chat" && <ChatScene key="chat" />}

            {scene === "trust" && <TrustScene key="trust" />}

            {scene === "deal" && <DealScene key="deal" />}

            {scene === "done" && <DoneScene key="done" />}
          </AnimatePresence>
        </div>

        {/* Bottom story */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-end justify-between"
        >
          <div>
            <p className="text-xs font-bold text-[#53647a]">
              Discover locally.
            </p>

            <p className="text-xs text-[#a6b3c9]">
              Connect directly. Make the deal.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a6b3c9]">
            <span>DealDone</span>

            <ArrowRight size={12} />

            <span className="text-[#3b7df6]">
              {String(sceneIndex + 1).padStart(2, "0")}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-[2px] bg-[#e9eef4]">
        <motion.div
          key={sceneIndex}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: DURATION / scenes.length / 1000,
            ease: "linear",
          }}
          className="h-full bg-gradient-to-r from-[#3b7df6] to-[#5b9bff]"
        />
      </div>
    </section>
  );
}