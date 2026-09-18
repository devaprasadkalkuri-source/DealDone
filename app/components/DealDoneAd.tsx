"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";

/* =========================================================
   DEALDONE — THE FIND
   Premium cinematic brand advertisement
========================================================= */

const SCENE_DURATION = 7000;

const media = {
  heroPerson:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=2000&q=90",

  phone:
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1800&q=90",

  laptop:
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1800&q=90",

  camera:
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=90",

  sneaker:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1800&q=90",

  watch:
    "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1800&q=90",

  car:
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=90",

  people:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=2000&q=90",
};

/* =========================================================
   BRAND MARK
========================================================= */

function Logo({
  dark = false,
  large = false,
}: {
  dark?: boolean;
  large?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`relative flex items-center justify-center rounded-[16px] ${
          large ? "h-14 w-14" : "h-10 w-10"
        } ${dark ? "bg-[#0a3d2e]" : "bg-[#c9e265]"}`}
      >
        <div
          className={`absolute rounded-full ${
            large ? "h-2.5 w-2.5" : "h-2 w-2"
          } ${dark ? "bg-[#c9e265]" : "bg-[#0a3d2e]"}`}
        />

        <div
          className={`absolute h-[3px] rounded-full ${
            large ? "w-7" : "w-5"
          } rotate-45 ${dark ? "bg-[#c9e265]" : "bg-[#0a3d2e]"}`}
        />

        <div
          className={`absolute h-[3px] rounded-full ${
            large ? "w-7" : "w-5"
          } -rotate-45 ${dark ? "bg-[#c9e265]" : "bg-[#0a3d2e]"}`}
        />
      </div>

      <div>
        <div
          className={`font-black tracking-[-0.06em] ${
            large ? "text-[21px]" : "text-[16px]"
          } ${dark ? "text-[#0a3d2e]" : "text-white"}`}
        >
          DEALDONE
        </div>

        <div
          className={`text-[7px] font-bold uppercase tracking-[0.3em] ${
            dark ? "text-[#0a3d2e]/40" : "text-white/35"
          }`}
        >
          Local marketplace
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   CINEMATIC IMAGE
========================================================= */

function FilmImage({
  src,
  position = "center",
  zoom = 1.12,
  className = "",
}: {
  src: string;
  position?: string;
  zoom?: number;
  className?: string;
}) {
  return (
    <motion.img
      src={src}
      alt=""
      initial={{ scale: zoom }}
      animate={{ scale: 1 }}
      transition={{
        duration: SCENE_DURATION / 1000,
        ease: "easeOut",
      }}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{
        objectPosition: position,
      }}
    />
  );
}

/* =========================================================
   SCENE 01
   THE HOOK
========================================================= */

function SceneOne() {
  return (
    <section className="relative h-full overflow-hidden bg-black">
      <FilmImage
        src={media.heroPerson}
        position="center 30%"
        zoom={1.18}
        className="brightness-[0.58]"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/35 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* tiny cinematic light */}
      <motion.div
        initial={{ opacity: 0, x: "-100%" }}
        animate={{ opacity: 0.6, x: "100%" }}
        transition={{
          duration: 5,
          ease: "easeInOut",
        }}
        className="absolute top-0 h-full w-[15%] bg-gradient-to-r from-transparent via-[#c9e265]/10 to-transparent blur-3xl"
      />

      <div className="absolute left-8 top-8 z-30">
        <Logo />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-[8%] top-1/2 max-w-[720px] -translate-y-1/2"
      >
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1,
              delay: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[11px] font-bold uppercase tracking-[0.45em] text-[#c9e265]"
          >
            THE FIND
          </motion.div>
        </div>

        <div className="mt-6 overflow-hidden">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.15,
              delay: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[64px] font-black leading-[0.84] tracking-[-0.075em] text-white md:text-[100px]"
          >
            The right
            <br />
            thing is
            <br />
            out there.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.8,
            duration: 0.8,
          }}
          className="mt-8 max-w-[370px] text-[14px] leading-6 text-white/55"
        >
          You just need a better way to find it.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="absolute bottom-8 left-8 text-[8px] font-bold uppercase tracking-[0.35em] text-white/25"
      >
        DISCOVER SOMETHING DIFFERENT
      </motion.div>
    </section>
  );
}

/* =========================================================
   SCENE 02
   PRODUCT CONSTELLATION
========================================================= */

function SceneTwo() {
  const products = [
    {
      image: media.laptop,
      label: "TECH",
      position:
        "absolute left-[4%] top-[25%] h-[290px] w-[30%] md:h-[390px]",
      rotate: -7,
      delay: 0,
    },
    {
      image: media.camera,
      label: "CREATE",
      position:
        "absolute left-1/2 top-[20%] z-20 h-[330px] w-[32%] -translate-x-1/2 md:h-[440px]",
      rotate: 2,
      delay: 0.25,
    },
    {
      image: media.sneaker,
      label: "STYLE",
      position:
        "absolute right-[4%] top-[28%] h-[280px] w-[30%]] md:h-[380px]",
      rotate: 7,
      delay: 0.45,
    },
  ];

  return (
    <section className="relative h-full overflow-hidden bg-[#080a08]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#253026_0%,#090b09_55%,#020302_100%)]" />

      {/* decorative lines */}
      <div className="absolute left-1/2 top-0 h-full w-px bg-white/[0.035]" />
      <div className="absolute left-0 top-1/2 h-px w-full bg-white/[0.035]" />

      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="absolute left-1/2 top-[9%] z-40 -translate-x-1/2 text-center"
      >
        <div className="text-[9px] font-bold uppercase tracking-[0.45em] text-[#c9e265]/55">
          Whatever you're looking for
        </div>

        <h2 className="mt-4 whitespace-nowrap text-[38px] font-black tracking-[-0.06em] text-white md:text-[58px]">
          Start with a feeling.
        </h2>
      </motion.div>

      {products.map((product) => (
        <motion.div
          key={product.label}
          initial={{
            opacity: 0,
            scale: 0.7,
            rotate: product.rotate * 2,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: product.rotate,
          }}
          transition={{
            duration: 1.2,
            delay: product.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`${product.position} overflow-hidden rounded-[30px] bg-[#111] shadow-[0_50px_120px_rgba(0,0,0,0.55)]`}
        >
          <motion.img
            src={product.image}
            alt=""
            initial={{ scale: 1.18 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 5,
              delay: product.delay,
              ease: "easeOut",
            }}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

          <div className="absolute bottom-5 left-5">
            <div className="text-[8px] font-bold uppercase tracking-[0.35em] text-white/40">
              {product.label}
            </div>

            <div className="mt-1 text-lg font-black text-white">
              Find your next one.
            </div>
          </div>
        </motion.div>
      ))}

      {/* floating orbit */}
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-1/2 z-30 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9e265]/10"
      />

      <div className="absolute bottom-[8%] left-1/2 z-40 -translate-x-1/2 text-center">
        <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/30">
          TECHNOLOGY · STYLE · LIFE
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SCENE 03
   SEARCH INTO THE WORLD
========================================================= */

function SceneThree() {
  return (
    <section className="relative h-full overflow-hidden bg-[#edf0e9]">
      <div className="absolute right-[-10%] top-[-30%] h-[700px] w-[700px] rounded-full bg-[#c9e265]/30 blur-[120px]" />

      <div className="absolute left-[8%] top-[20%] z-20 max-w-[500px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10px] font-black uppercase tracking-[0.42em] text-[#0a3d2e]/40"
        >
          It starts with one search
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 45 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 1 }}
          className="mt-5 text-[58px] font-black leading-[0.86] tracking-[-0.065em] text-[#0a3d2e] md:text-[78px]"
        >
          What are
          <br />
          you looking
          <br />
          for?
        </motion.h2>
      </div>

      {/* Phone */}
      <motion.div
        initial={{
          opacity: 0,
          x: 260,
          rotate: 13,
          scale: 0.8,
        }}
        animate={{
          opacity: 1,
          x: 0,
          rotate: -5,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
          delay: 0.25,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute right-[13%] top-1/2 h-[590px] w-[300px] -translate-y-1/2"
      >
        <div className="absolute inset-0 rounded-[48px] bg-[#080908] p-[8px] shadow-[0_70px_130px_rgba(0,0,0,0.3)]">
          <div className="relative h-full overflow-hidden rounded-[40px] bg-white">
            <div className="absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />

            <div className="h-full bg-[#f6f7f3] px-5 pb-7 pt-12">
              <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                DEALDONE
              </div>

              <div className="mt-2 text-[21px] font-black tracking-[-0.05em] text-[#0a3d2e]">
                Find something good.
              </div>

              <div className="mt-5 flex h-12 items-center gap-3 rounded-2xl bg-white px-4 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <Search className="h-4 w-4 text-[#0a3d2e]" />

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="text-[11px] font-medium text-zinc-500"
                >
                  Search for a camera...
                </motion.span>

                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                  className="h-4 w-[1px] bg-[#0a3d2e]"
                />
              </div>

              <div className="mt-7 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-400">
                  Nearby
                </span>

                <div className="flex items-center gap-1 text-[9px] font-bold text-[#0a3d2e]">
                  <MapPin className="h-3 w-3" />
                  Around you
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="mt-4 overflow-hidden rounded-[22px] bg-white shadow-sm"
              >
                <img
                  src={media.camera}
                  alt=""
                  className="h-[140px] w-full object-cover"
                />

                <div className="p-4">
                  <div className="text-[13px] font-black text-zinc-900">
                    Mirrorless Camera
                  </div>

                  <div className="mt-1 text-[17px] font-black text-[#0a3d2e]">
                    ₹42,000
                  </div>

                  <div className="mt-2 flex items-center gap-1 text-[9px] text-zinc-400">
                    <MapPin className="h-3 w-3" />
                    Nearby
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* floating search pulse */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute -left-8 bottom-[15%] flex h-16 w-16 items-center justify-center rounded-full bg-[#c9e265] shadow-[0_20px_50px_rgba(10,61,46,0.2)]"
        >
          <Search className="h-6 w-6 text-[#0a3d2e]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* =========================================================
   SCENE 04
   NEARBY DISCOVERY
========================================================= */

function SceneFour() {
  return (
    <section className="relative h-full overflow-hidden bg-[#06110b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,#254331_0%,#07110b_50%,#020503_100%)]" />

      <div className="absolute left-[8%] top-[22%] z-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9e265]/55"
        >
          Not somewhere else
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.15,
            duration: 1,
          }}
          className="mt-5 text-[58px] font-black leading-[0.85] tracking-[-0.065em] text-white md:text-[78px]"
        >
          Somewhere
          <br />
          closer.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-7 max-w-[300px] text-[14px] leading-6 text-white/40"
        >
          The things you're looking for can be right around the corner.
        </motion.p>
      </div>

      {/* map field */}
      <div className="absolute right-[6%] top-[10%] h-[80%] w-[48%] overflow-hidden rounded-[40px] border border-white/10 bg-[#0b1710]">
        {/* map grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(201,226,101,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(201,226,101,0.12) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* roads */}
        <div className="absolute left-[12%] top-[18%] h-[2px] w-[85%] rotate-[18deg] bg-white/10" />
        <div className="absolute left-[8%] top-[53%] h-[2px] w-[90%] rotate-[-9deg] bg-white/10" />
        <div className="absolute left-[40%] top-[-10%] h-[120%] w-[2px] rotate-[13deg] bg-white/10" />

        {/* destination */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 1,
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute left-[57%] top-[38%]"
        >
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9e265]/30"
          />

          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#c9e265] shadow-[0_0_50px_rgba(201,226,101,0.35)]">
            <MapPin className="h-5 w-5 text-[#0a3d2e]" />
          </div>
        </motion.div>

        {/* floating product */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: 1.4,
            duration: 0.9,
          }}
          className="absolute bottom-[13%] left-[9%] w-[245px] overflow-hidden rounded-[25px] border border-white/10 bg-black/55 shadow-2xl backdrop-blur-xl"
        >
          <img
            src={media.camera}
            alt=""
            className="h-[145px] w-full object-cover"
          />

          <div className="p-4">
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
              Found nearby
            </div>

            <div className="mt-1 text-[14px] font-black text-white">
              Mirrorless Camera
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-[15px] font-black text-[#c9e265]">
                ₹42,000
              </span>

              <span className="flex items-center gap-1 text-[9px] text-white/40">
                <MapPin className="h-3 w-3" />
                Nearby
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   SCENE 05
   HUMAN CONNECTION
========================================================= */

function SceneFive() {
  return (
    <section className="relative h-full overflow-hidden bg-black">
      <FilmImage
        src={media.people}
        position="center"
        zoom={1.12}
        className="brightness-[0.52]"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/35 to-black/10" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-[8%] top-1/2 z-20 -translate-y-1/2"
      >
        <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#c9e265]">
          Because it's not just about products
        </div>

        <h2 className="mt-5 text-[58px] font-black leading-[0.85] tracking-[-0.065em] text-white md:text-[78px]">
          It's about
          <br />
          people.
        </h2>

        <p className="mt-7 max-w-[330px] text-[14px] leading-6 text-white/50">
          Discover something. Start a conversation. See where it goes.
        </p>
      </motion.div>

      {/* message glass */}
      <motion.div
        initial={{
          opacity: 0,
          x: 100,
          y: 60,
          scale: 0.85,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        }}
        transition={{
          delay: 1,
          duration: 1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute bottom-[13%] right-[9%] w-[310px] rounded-[30px] border border-white/10 bg-black/55 p-5 shadow-2xl backdrop-blur-2xl"
      >
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 overflow-hidden rounded-full bg-[#c9e265]">
            <img
              src={media.heroPerson}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <div className="text-sm font-bold text-white">
              Interested in this?
            </div>

            <div className="text-[9px] text-white/35">
              DealDone conversation
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl rounded-tl-sm bg-white/[0.08] px-4 py-3 text-[11px] text-white/65">
          I'd like to know more about it.
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            delay: 1.8,
            duration: 1.2,
          }}
          className="mt-4 h-[2px] bg-[#c9e265]"
        />
      </motion.div>
    </section>
  );
}

/* =========================================================
   SCENE 06
   THE CHOICE
========================================================= */

function SceneSix() {
  return (
    <section className="relative h-full overflow-hidden bg-[#f1f3ed]">
      <div className="absolute left-[-15%] top-[-25%] h-[700px] w-[700px] rounded-full bg-[#c9e265]/35 blur-[130px]" />

      <div className="absolute right-[7%] top-[12%] h-[76%] w-[48%] overflow-hidden rounded-[45px] bg-black shadow-[0_60px_120px_rgba(10,61,46,0.22)]">
        <motion.img
          src={media.car}
          alt=""
          initial={{
            scale: 1.18,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 6,
            ease: "easeOut",
          }}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-8"
        >
          <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">
            Sometimes
          </div>

          <div className="mt-2 text-2xl font-black text-white">
            You just know.
          </div>
        </motion.div>
      </div>

      <div className="absolute left-[8%] top-[25%] max-w-[430px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0a3d2e]/35"
        >
          The moment
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.15,
            duration: 1,
          }}
          className="mt-5 text-[62px] font-black leading-[0.83] tracking-[-0.07em] text-[#0a3d2e] md:text-[82px]"
        >
          That's
          <br />
          the one.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 1.1,
          }}
          className="mt-8 flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#c9e265]">
            <Heart className="h-4 w-4 fill-[#0a3d2e] text-[#0a3d2e]" />
          </div>

          <div className="text-xs font-bold text-[#0a3d2e]/60">
            Found it.
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================
   SCENE 07
   CINEMATIC BRAND REVEAL
========================================================= */

function SceneSeven() {
  return (
    <section className="relative flex h-full items-center justify-center overflow-hidden bg-[#050906]">
      {/* green atmosphere */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.3,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute left-1/2 top-1/2 h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9e265]/[0.07] blur-[140px]"
      />

      {/* rings */}
      <motion.div
        initial={{
          scale: 0.2,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.8,
          delay: 0.4,
        }}
        className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c9e265]/10"
      />

      <motion.div
        initial={{
          scale: 0.2,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.8,
          delay: 0.7,
        }}
        className="absolute left-1/2 top-1/2 h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]"
      />

      {/* moving beam */}
      <motion.div
        initial={{
          x: "-140%",
          rotate: -20,
        }}
        animate={{
          x: "140%",
          rotate: -20,
        }}
        transition={{
          duration: 4,
          delay: 0.5,
          ease: "easeInOut",
        }}
        className="absolute top-[-40%] h-[180%] w-[130px] bg-gradient-to-r from-transparent via-[#c9e265]/10 to-transparent blur-2xl"
      />

      <div className="relative z-20 flex flex-col items-center text-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.7,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Logo large />
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          animate={{
            opacity: 1,
            scaleX: 1,
          }}
          transition={{
            delay: 1.2,
            duration: 0.8,
          }}
          className="mt-12 h-px w-24 origin-center bg-[#c9e265]"
        />

        <div className="mt-10 overflow-hidden">
          <motion.h2
            initial={{
              y: "110%",
            }}
            animate={{
              y: 0,
            }}
            transition={{
              delay: 1.35,
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-[56px] font-black leading-[0.84] tracking-[-0.07em] text-white md:text-[88px]"
          >
            Find something
            <br />
            worth finding.
          </motion.h2>
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 2.2,
          }}
          className="mt-8 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/35"
        >
          <span>DISCOVER</span>

          <span className="text-[#c9e265]">/</span>

          <span>CONNECT</span>

          <span className="text-[#c9e265]">/</span>

          <span>DECIDE</span>
        </motion.div>

        <motion.button
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 2.6,
            duration: 0.8,
          }}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={() => {
            window.location.href = "/products";
          }}
          className="mt-10 flex items-center gap-3 rounded-full bg-[#c9e265] px-8 py-4 text-sm font-black text-[#0a3d2e] shadow-[0_20px_70px_rgba(201,226,101,0.15)]"
        >
          Explore DealDone
          <ArrowUpRight className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-[0.5em] text-white/15">
        DEALDONE — LOCAL MARKETPLACE
      </div>
    </section>
  );
}

/* =========================================================
   MAIN AD
========================================================= */

export default function DealDoneAd() {
  const [scene, setScene] = useState(0);

  const totalScenes = 7;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setScene((current) => (current + 1) % totalScenes);
    }, SCENE_DURATION);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-black font-sans">
      <div className="relative h-screen min-h-[680px] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          {scene === 0 && (
            <motion.div
              key="one"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0"
            >
              <SceneOne />
            </motion.div>
          )}

          {scene === 1 && (
            <motion.div
              key="two"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0"
            >
              <SceneTwo />
            </motion.div>
          )}

          {scene === 2 && (
            <motion.div
              key="three"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0"
            >
              <SceneThree />
            </motion.div>
          )}

          {scene === 3 && (
            <motion.div
              key="four"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0"
            >
              <SceneFour />
            </motion.div>
          )}

          {scene === 4 && (
            <motion.div
              key="five"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0"
            >
              <SceneFive />
            </motion.div>
          )}

          {scene === 5 && (
            <motion.div
              key="six"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              className="absolute inset-0"
            >
              <SceneSix />
            </motion.div>
          )}

          {scene === 6 && (
            <motion.div
              key="seven"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1 }}
              className="absolute inset-0"
            >
              <SceneSeven />
            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================
            CINEMATIC PROGRESS
        ================================================= */}

        <div className="absolute bottom-7 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2">
          {Array.from({ length: totalScenes }).map((_, index) => (
            <button
              key={index}
              onClick={() => setScene(index)}
              aria-label={`Go to scene ${index + 1}`}
              className={`relative h-[2px] overflow-hidden rounded-full transition-all duration-500 ${
                index === scene ? "w-16" : "w-4"
              } bg-white/20`}
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#c9e265]"
                initial={{
                  width: index < scene ? "100%" : "0%",
                }}
                animate={{
                  width:
                    index < scene
                      ? "100%"
                      : index === scene
                        ? "100%"
                        : "0%",
                }}
                transition={{
                  duration:
                    index === scene ? SCENE_DURATION / 1000 : 0.3,
                  ease: "linear",
                }}
              />
            </button>
          ))}
        </div>

        {/* scene count */}
        <div className="absolute bottom-7 right-7 z-50 text-[8px] font-bold tracking-[0.3em] text-white/25">
          0{scene + 1} / 07
        </div>

        {/* cinematic side label */}
        <div className="absolute right-7 top-7 z-50 hidden text-[8px] font-bold uppercase tracking-[0.4em] text-white/20 md:block">
          THE FIND — DEALDONE
        </div>
      </div>
    </main>
  );
}