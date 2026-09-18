"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Heart,
  ArrowRight,
  Check,
  Sparkles,
  Navigation,
  UserRound,
} from "lucide-react";

const scenes = [
  "everything",
  "discover",
  "find",
  "nearby",
  "explore",
  "connect",
  "chat",
  "trust",
  "decide",
  "deal",
  "done",
  "ready",
];

const productImages = [
  "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=85",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=85",
];

function FlowerMark({
  dark = false,
  size = 48,
}: {
  dark?: boolean;
  size?: number;
}) {
  return (
    <motion.div
      animate={{
        rotate: [0, 360],
        scale: [1, 1.08, 1],
      }}
      transition={{
        rotate: {
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        },
        scale: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      className="relative flex shrink-0 items-center justify-center"
      style={{
        width: size,
        height: size,
      }}
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <span
          key={index}
          className={`absolute h-[42%] w-[25%] rounded-full ${
            dark ? "bg-[#0F5C3E]" : "bg-[#D4E84A]"
          }`}
          style={{
            transform: `rotate(${index * 60}deg) translateY(-32%)`,
            transformOrigin: "50% 100%",
          }}
        />
      ))}

      <span
        className={`relative z-10 h-[28%] w-[28%] rounded-full ${
          dark ? "bg-[#D4E84A]" : "bg-[#0A3D2E]"
        }`}
      />
    </motion.div>
  );
}

function Particles({ light = false }: { light?: boolean }) {
  const particles = Array.from({ length: 26 });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, index) => (
        <motion.span
          key={index}
          className={`absolute h-1 w-1 rounded-full ${
            light ? "bg-[#0F5C3E]/20" : "bg-[#D4E84A]/45"
          }`}
          style={{
            left: `${(index * 41) % 100}%`,
            top: `${(index * 67) % 100}%`,
          }}
          animate={{
            y: [0, -35, 0],
            x: [0, index % 2 === 0 ? 18 : -18, 0],
            opacity: [0.05, 0.7, 0.05],
            scale: [0.5, 1.4, 0.5],
          }}
          transition={{
            duration: 4 + (index % 5),
            delay: index * 0.12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function OrbitLines() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-[360px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#D4E84A]/15 sm:h-[520px] sm:w-[950px]"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[720px] sm:w-[720px]"
      />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 h-[650px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#D4E84A]/10 sm:h-[900px] sm:w-[1150px]"
      />
    </div>
  );
}

/* -------------------------------------------------------
   DISCOVER
------------------------------------------------------- */

function DiscoverScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="flex min-h-[560px] w-full items-center justify-center sm:min-h-[700px]"
    >
      <div className="w-full max-w-3xl">
        <div className="mb-7 text-center sm:mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4E84A]/60 sm:text-sm sm:tracking-[0.35em]">
            Step 01
          </p>

          <h2 className="mt-3 text-[54px] font-black tracking-[-0.06em] text-white min-[360px]:text-[62px] sm:mt-4 sm:text-8xl">
            DISCOVER
          </h2>

          <p className="mt-3 px-4 text-sm text-white/50 sm:mt-4 sm:text-lg">
            Find something worth your attention.
          </p>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto w-full max-w-2xl rounded-[22px] border border-white/10 bg-white/[0.08] p-2 shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:rounded-[28px] sm:p-3"
        >
          <div className="flex min-h-[58px] items-center gap-3 rounded-[16px] bg-white px-4 py-3 sm:min-h-0 sm:rounded-[20px] sm:px-5 sm:py-4">
            <Search
              size={19}
              className="shrink-0 text-[#0F5C3E]/50"
            />

            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ duration: 1 }}
              className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-left text-[11px] font-medium text-[#0A3D2E] sm:text-sm"
            >
              Search for phones, bikes, laptops...
            </motion.span>

            <div className="hidden shrink-0 rounded-xl bg-[#D4E84A] px-5 py-2 text-xs font-black text-[#0A3D2E] sm:block">
              Search
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   FIND
------------------------------------------------------- */

function FindScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[560px] w-full items-center justify-center sm:min-h-[700px]"
    >
      <div className="w-full text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4E84A]/60 sm:text-sm sm:tracking-[0.35em]">
          Step 02
        </p>

        <h2 className="mt-4 text-[58px] font-black tracking-[-0.07em] text-white min-[360px]:text-[68px] sm:mt-5 sm:text-8xl">
          FIND
        </h2>

        <div className="mx-auto mt-9 grid max-w-xl grid-cols-2 gap-3 px-1 sm:mt-12 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
          {[
            ["Mobiles", Search],
            ["Vehicles", Navigation],
            ["Furniture", Heart],
            ["Electronics", Sparkles],
          ].map(([label, Icon], index) => {
            const I = Icon as typeof Search;

            return (
              <motion.div
                key={label as string}
                initial={{
                  opacity: 0,
                  y: 40,
                  rotate: index % 2 === 0 ? -5 : 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.6,
                }}
                className="flex min-w-0 items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.08] px-3 py-3 backdrop-blur-xl sm:gap-3 sm:px-5 sm:py-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D4E84A] text-[#0A3D2E] sm:h-10 sm:w-10">
                  <I size={17} />
                </div>

                <span className="truncate text-left text-xs font-bold text-white sm:text-base">
                  {label as string}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   NEARBY
------------------------------------------------------- */

function NearbyScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex min-h-[560px] w-full items-center justify-center sm:min-h-[700px]"
    >
      <div className="relative h-[390px] w-full overflow-hidden rounded-[28px] border border-[#D4E84A]/20 bg-[#0F5C3E] shadow-[0_40px_100px_rgba(0,0,0,0.3)] sm:h-[460px] sm:max-w-4xl sm:rounded-[40px]">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-[10%] top-[25%] h-px w-[80%] rotate-12 bg-[#D4E84A]" />
          <div className="absolute left-[5%] top-[55%] h-px w-[90%] -rotate-6 bg-[#D4E84A]" />
          <div className="absolute left-[20%] top-[75%] h-px w-[70%] rotate-3 bg-[#D4E84A]" />

          <div className="absolute left-[30%] top-[10%] h-[90%] w-px rotate-[15deg] bg-[#D4E84A]" />
          <div className="absolute left-[65%] top-0 h-full w-px -rotate-[18deg] bg-[#D4E84A]" />
        </div>

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.25, 0.12],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4E84A] blur-[60px] sm:h-52 sm:w-52 sm:blur-[70px]"
        />

        {[
          { x: "22%", y: "30%", delay: 0 },
          { x: "70%", y: "22%", delay: 0.5 },
          { x: "62%", y: "70%", delay: 1 },
          { x: "30%", y: "72%", delay: 1.5 },
        ].map((point, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{
              scale: [0.9, 1.15, 0.9],
            }}
            transition={{
              duration: 2,
              delay: point.delay,
              repeat: Infinity,
            }}
            className="absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#D4E84A] shadow-[0_0_35px_rgba(212,232,74,0.45)] sm:h-12 sm:w-12"
            style={{
              left: point.x,
              top: point.y,
            }}
          >
            <MapPin
              size={18}
              className="text-[#0A3D2E] sm:h-5 sm:w-5"
            />
          </motion.div>
        ))}

        <div className="absolute bottom-6 left-5 right-5 sm:bottom-7 sm:left-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4E84A] sm:text-xs sm:tracking-[0.3em]">
            Step 03
          </p>

          <h2 className="mt-1 text-[48px] font-black tracking-[-0.06em] text-white min-[360px]:text-[56px] sm:mt-2 sm:text-7xl">
            NEARBY
          </h2>

          <p className="mt-1 max-w-xs text-xs text-white/45 sm:mt-2 sm:text-sm">
            Great deals can be closer than you think.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   EXPLORE
------------------------------------------------------- */

function ExploreScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[560px] w-full items-center justify-center sm:min-h-[700px]"
    >
      <div className="w-full max-w-5xl">
        <div className="mb-7 text-center sm:mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F5C3E]/50 sm:text-sm sm:tracking-[0.35em]">
            Step 04
          </p>

          <h2 className="mt-2 text-[56px] font-black tracking-[-0.07em] text-[#0A3D2E] min-[360px]:text-[64px] sm:mt-3 sm:text-8xl">
            EXPLORE
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {productImages.map((image, index) => (
            <motion.div
              key={image}
              initial={{
                opacity: 0,
                y: 60,
                rotate: index % 2 === 0 ? -4 : 4,
              }}
              animate={{
                opacity: 1,
                y: 0,
                rotate: 0,
              }}
              transition={{
                delay: index * 0.12,
                duration: 0.65,
              }}
              whileHover={{
                y: -10,
              }}
              className="overflow-hidden rounded-[20px] border border-white bg-white p-1.5 shadow-[0_20px_60px_rgba(15,92,62,0.13)] sm:rounded-[26px] sm:p-2"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[15px] bg-[#EAF4D3] sm:rounded-[20px]">
                <img
                  src={image}
                  alt="Marketplace product"
                  className="h-full w-full object-cover"
                />

                <div className="absolute bottom-2 left-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur sm:bottom-3 sm:left-3 sm:h-9 sm:w-9">
                  <Heart
                    size={13}
                    className="text-[#0A3D2E] sm:h-[15px] sm:w-[15px]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 px-4 text-center text-xs font-semibold text-[#0F5C3E]/50 sm:mt-8 sm:text-sm">
          Browse real products. Compare. Save what you like.
        </p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   CONNECT
------------------------------------------------------- */

function ConnectScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[560px] w-full items-center justify-center sm:min-h-[700px]"
    >
      <div className="w-full max-w-4xl">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F5C3E]/50 sm:text-sm sm:tracking-[0.35em]">
            Step 05
          </p>

          <h2 className="mt-3 text-[55px] font-black tracking-[-0.07em] text-[#0A3D2E] min-[360px]:text-[64px] sm:mt-4 sm:text-8xl">
            CONNECT
          </h2>
        </div>

        <div className="relative mx-auto mt-10 max-w-2xl px-1 sm:mt-14">
          <div className="absolute left-[15%] right-[15%] top-1/2 h-px -translate-y-1/2 bg-[#0F5C3E]/15" />

          <motion.div
            animate={{
              x: [0, 100, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-[15%] top-1/2 z-10 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#D4E84A] shadow-[0_0_25px_#D4E84A] sm:h-3 sm:w-3"
          />

          <div className="relative flex items-center justify-between">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="flex h-24 w-24 flex-col items-center justify-center rounded-[24px] bg-[#0A3D2E] text-white shadow-xl min-[360px]:h-28 min-[360px]:w-28 sm:h-36 sm:w-36 sm:rounded-[28px]"
            >
              <UserRound
                size={23}
                className="text-[#D4E84A] sm:h-7 sm:w-7"
              />

              <span className="mt-2 text-[10px] font-bold sm:mt-3 sm:text-xs">
                Buyer
              </span>
            </motion.div>

            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D4E84A] shadow-xl sm:h-16 sm:w-16"
            >
              <MessageCircle
                size={22}
                className="text-[#0A3D2E] sm:h-[25px] sm:w-[25px]"
              />
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0.5,
              }}
              className="flex h-24 w-24 flex-col items-center justify-center rounded-[24px] bg-white text-[#0A3D2E] shadow-xl min-[360px]:h-28 min-[360px]:w-28 sm:h-36 sm:w-36 sm:rounded-[28px]"
            >
              <UserRound
                size={23}
                className="sm:h-7 sm:w-7"
              />

              <span className="mt-2 text-[10px] font-bold sm:mt-3 sm:text-xs">
                Seller
              </span>
            </motion.div>
          </div>
        </div>

        <p className="mt-9 px-4 text-center text-sm font-medium text-[#0F5C3E]/50 sm:mt-12 sm:text-lg">
          Talk directly before making a deal.
        </p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   CHAT
------------------------------------------------------- */

function ChatScene() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="flex min-h-[560px] w-full items-center justify-center sm:min-h-[700px]"
    >
      <div className="w-full max-w-md">
        <div className="mb-7 text-center sm:mb-9">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0F5C3E]/50 sm:text-sm sm:tracking-[0.35em]">
            Step 06
          </p>

          <h2 className="mt-2 text-[58px] font-black tracking-[-0.07em] text-[#0A3D2E] min-[360px]:text-[66px] sm:mt-3 sm:text-8xl">
            CHAT
          </h2>
        </div>

        <div className="overflow-hidden rounded-[25px] border border-white bg-white shadow-[0_35px_90px_rgba(15,92,62,0.16)] sm:rounded-[32px]">
          <div className="flex items-center gap-3 border-b border-[#0F5C3E]/10 p-4 sm:p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A3D2E] text-[#D4E84A] sm:h-11 sm:w-11">
              <UserRound size={17} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-black text-[#0A3D2E]">
                Seller
              </p>

              <p className="truncate text-[10px] text-[#0F5C3E]/40">
                Product conversation
              </p>
            </div>

            <span className="ml-auto h-2.5 w-2.5 shrink-0 rounded-full bg-[#D4E84A]" />
          </div>

          <div className="space-y-3 bg-[#F2F7DC] p-4 sm:space-y-4 sm:p-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-[84%] rounded-2xl rounded-bl-md bg-white p-3.5 text-xs font-medium text-[#0A3D2E] shadow-sm sm:p-4 sm:text-sm"
            >
              Hi! Is this product still available?
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="ml-auto max-w-[84%] rounded-2xl rounded-br-md bg-[#0A3D2E] p-3.5 text-xs font-medium text-white sm:p-4 sm:text-sm"
            >
              Yes, it is available 👍
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 }}
              className="max-w-[84%] rounded-2xl rounded-bl-md bg-white p-3.5 text-xs font-medium text-[#0A3D2E] shadow-sm sm:p-4 sm:text-sm"
            >
              Great. Can we discuss the deal?
            </motion.div>

            <div className="flex items-center gap-3 rounded-2xl bg-white p-2.5 shadow-sm">
              <div className="h-8 min-w-0 flex-1 rounded-xl bg-[#0F5C3E]/5" />

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D4E84A]">
                <ArrowRight
                  size={16}
                  className="text-[#0A3D2E]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   TRUST
------------------------------------------------------- */

function TrustScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[560px] w-full items-center justify-center text-center sm:min-h-[700px]"
    >
      <div className="w-full">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] bg-[#D4E84A] shadow-[0_0_70px_rgba(212,232,74,0.25)] sm:h-28 sm:w-28 sm:rounded-[34px]"
        >
          <ShieldCheck
            size={47}
            strokeWidth={1.7}
            className="text-[#0A3D2E] sm:h-[55px] sm:w-[55px]"
          />
        </motion.div>

        <p className="mt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4E84A]/60 sm:mt-10 sm:text-sm sm:tracking-[0.35em]">
          Step 07
        </p>

        <h2 className="mt-3 text-[58px] font-black tracking-[-0.07em] text-white min-[360px]:text-[68px] sm:mt-4 sm:text-8xl">
          TRUST
        </h2>

        <p className="mx-auto mt-5 max-w-xl px-4 text-sm leading-6 text-white/50 sm:mt-6 sm:text-lg sm:leading-8">
          See the product. Talk to the seller. Get the details.
          Then decide with confidence.
        </p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   DECIDE
------------------------------------------------------- */

function DecideScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[560px] w-full items-center justify-center text-center sm:min-h-[700px]"
    >
      <div className="w-full">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4E84A]/60 sm:text-sm sm:tracking-[0.35em]">
          Step 08
        </p>

        <h2 className="mt-4 text-[58px] font-black tracking-[-0.07em] text-white min-[360px]:text-[68px] sm:mt-5 sm:text-8xl">
          DECIDE
        </h2>

        <div className="mx-auto mt-9 flex max-w-[270px] items-center justify-center gap-3 sm:mt-12 sm:max-w-md sm:gap-4">
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/10 sm:h-24 sm:w-24"
          >
            <Heart
              size={28}
              className="text-[#D4E84A] sm:h-8 sm:w-8"
            />
          </motion.div>

          <ArrowRight
            size={19}
            className="shrink-0 text-[#D4E84A]"
          />

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2,
              delay: 0.5,
              repeat: Infinity,
            }}
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#D4E84A] sm:h-24 sm:w-24"
          >
            <Check
              size={31}
              className="text-[#0A3D2E] sm:h-9 sm:w-9"
            />
          </motion.div>
        </div>

        <p className="mt-7 px-4 text-sm text-white/45 sm:mt-9 sm:text-lg">
          Like it? Talk about it. Make your move.
        </p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   DEAL
------------------------------------------------------- */

function DealScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[560px] w-full items-center justify-center text-center sm:min-h-[700px]"
    >
      <div className="w-full">
        <div className="flex justify-center">
          <FlowerMark size={42} />
        </div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{
            opacity: 1,
            scale: [0.75, 1.08, 1],
          }}
          transition={{
            duration: 1,
          }}
          className="mt-8 text-[76px] font-black tracking-[-0.09em] text-[#D4E84A] min-[360px]:text-[88px] sm:mt-10 sm:text-[10rem] md:text-[12rem]"
        >
          DEAL
        </motion.h2>

        <motion.div
          animate={{
            width: ["0%", "100%"],
            opacity: [0, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mx-auto mt-3 h-1 max-w-[250px] bg-[#D4E84A] sm:mt-4 sm:max-w-md"
        />
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   DONE
------------------------------------------------------- */

function DoneScene() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[560px] w-full items-center justify-center text-center sm:min-h-[700px]"
    >
      <div>
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{
            scale: 1,
            rotate: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 12,
          }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#D4E84A] shadow-[0_0_80px_rgba(212,232,74,0.35)] sm:h-28 sm:w-28"
        >
          <Check
            size={47}
            strokeWidth={3}
            className="text-[#0A3D2E] sm:h-[54px] sm:w-[54px]"
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-8 text-[78px] font-black tracking-[-0.09em] text-white min-[360px]:text-[90px] sm:mt-10 sm:text-[10rem]"
        >
          DONE.
        </motion.h2>

        <p className="mt-3 text-sm text-white/45 sm:mt-5 sm:text-lg">
          That's a DealDone.
        </p>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   READY
------------------------------------------------------- */

function ReadyScene() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-[560px] w-full flex-col items-center justify-center text-center sm:min-h-[700px]"
    >
      <FlowerMark dark size={58} />

      <motion.h2
        animate={{
          scale: [1, 1.025, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}
        className="mt-8 px-2 text-[48px] font-black leading-[0.96] tracking-[-0.07em] text-[#0A3D2E] min-[360px]:text-[54px] sm:mt-10 sm:text-8xl md:text-9xl"
      >
        Ready to find
        <br />
        your next deal?
      </motion.h2>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="mt-8 flex min-h-12 items-center gap-3 rounded-full bg-[#0A3D2E] px-6 py-3.5 shadow-xl sm:mt-10 sm:px-7 sm:py-4"
      >
        <span className="text-xs font-black text-white sm:text-sm">
          Explore DealDone
        </span>

        <ArrowRight
          size={17}
          className="text-[#D4E84A] sm:h-[18px] sm:w-[18px]"
        />
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   MAIN
------------------------------------------------------- */

export default function WhyChoose() {
  const [scene, setScene] = useState("everything");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;

      const cycleProgress = (elapsed % 47000) / 47000;

      setProgress(cycleProgress);

      const sceneIndex = Math.min(
        Math.floor(cycleProgress * scenes.length),
        scenes.length - 1
      );

      setScene(scenes[sceneIndex]);
    }, 60);

    return () => clearInterval(timer);
  }, []);

  const darkScenes = [
    "everything",
    "discover",
    "find",
    "nearby",
    "connect",
    "trust",
    "decide",
    "deal",
    "done",
  ];

  const isDark = darkScenes.includes(scene);

  return (
    <section
      className={`relative min-h-[720px] overflow-hidden transition-colors duration-1000 sm:min-h-[900px] ${
        isDark ? "bg-[#0A3D2E]" : "bg-[#F2F7DC]"
      }`}
    >
      {/* -------------------------------------------------
          BACKGROUND
      ------------------------------------------------- */}

      <AnimatePresence>
        {isDark ? (
          <motion.div
            key="dark-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_82%,rgba(212,232,74,0.18),transparent_27%),radial-gradient(circle_at_85%_15%,rgba(201,226,101,0.12),transparent_25%)]" />

            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.24, 0.1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -bottom-48 -left-32 h-[420px] w-[420px] rounded-full bg-[#D4E84A] blur-[110px] sm:h-[550px] sm:w-[550px] sm:blur-[140px]"
            />

            <motion.div
              animate={{
                x: [0, 80, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full bg-[#0F5C3E] blur-[80px] sm:h-[500px] sm:w-[500px] sm:blur-[100px]"
            />

            <OrbitLines />
            <Particles />
          </motion.div>
        ) : (
          <motion.div
            key="light-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(212,232,74,0.32),transparent_27%),radial-gradient(circle_at_85%_80%,rgba(15,92,62,0.08),transparent_30%)]" />

            <motion.div
              animate={{
                x: [0, 70, 0],
                y: [0, 35, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -left-32 top-16 h-72 w-72 rounded-full bg-[#D4E84A]/25 blur-[90px] sm:h-96 sm:w-96 sm:blur-[110px]"
            />

            <Particles light />
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------
          CONTENT
      ------------------------------------------------- */}

      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center justify-center px-4 py-16 sm:min-h-[900px] sm:px-8 sm:py-20">
        <AnimatePresence mode="wait">
          {/* OPENING */}

          {scene === "everything" && (
            <motion.div
              key="everything"
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -30,
              }}
              className="flex min-h-[560px] w-full flex-col items-center justify-center text-center sm:min-h-[700px]"
            >
              <FlowerMark size={42} />

              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.32em] text-[#D4E84A]/65 sm:mt-8 sm:text-sm sm:tracking-[0.4em]">
                DealDone
              </p>

              <motion.h2
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                }}
                className="mt-5 text-[58px] font-medium leading-none tracking-[-0.07em] text-white min-[360px]:text-[68px] sm:mt-7 sm:text-9xl md:text-[10rem]"
              >
                Everything
              </motion.h2>

              <p className="mt-5 px-4 text-base text-white/50 sm:mt-7 sm:text-xl">
                starts with something you need.
              </p>

              <motion.div
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.08, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-[#D4E84A] shadow-[0_0_70px_rgba(212,232,74,0.4)] sm:mt-8 sm:h-16 sm:w-16"
              >
                <Search
                  size={24}
                  className="text-[#0A3D2E] sm:h-[27px] sm:w-[27px]"
                />
              </motion.div>
            </motion.div>
          )}

          {scene === "discover" && <DiscoverScene key="discover" />}

          {scene === "find" && <FindScene key="find" />}

          {scene === "nearby" && <NearbyScene key="nearby" />}

          {scene === "explore" && <ExploreScene key="explore" />}

          {scene === "connect" && <ConnectScene key="connect" />}

          {scene === "chat" && <ChatScene key="chat" />}

          {scene === "trust" && <TrustScene key="trust" />}

          {scene === "decide" && <DecideScene key="decide" />}

          {scene === "deal" && <DealScene key="deal" />}

          {scene === "done" && <DoneScene key="done" />}

          {scene === "ready" && <ReadyScene key="ready" />}
        </AnimatePresence>

        {/* -------------------------------------------------
            TIMELINE
        ------------------------------------------------- */}

        <div className="absolute bottom-5 left-1/2 w-[calc(100%-32px)] max-w-4xl -translate-x-1/2 sm:bottom-7 sm:w-[calc(100%-40px)]">
          <div
            className={`h-[2px] ${
              isDark
                ? "bg-white/10"
                : "bg-[#0F5C3E]/10"
            }`}
          >
            <motion.div
              style={{
                width: `${progress * 100}%`,
              }}
              className={`h-full ${
                isDark
                  ? "bg-[#D4E84A]"
                  : "bg-[#0F5C3E]"
              }`}
            />
          </div>

          <div className="mt-2 flex items-center justify-between sm:mt-3">
            <span
              className={`text-[7px] font-bold uppercase tracking-[0.2em] sm:text-[9px] sm:tracking-[0.3em] ${
                isDark
                  ? "text-white/30"
                  : "text-[#0F5C3E]/35"
              }`}
            >
              Discover
            </span>

            <span
              className={`text-[7px] font-bold uppercase tracking-[0.2em] sm:text-[9px] sm:tracking-[0.3em] ${
                isDark
                  ? "text-white/30"
                  : "text-[#0F5C3E]/35"
              }`}
            >
              DealDone
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}