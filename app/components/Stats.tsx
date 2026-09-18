"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Package,
  MapPin,
  Layers3,
} from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Stat {
  icon: typeof Package;
  number: string;
  title: string;
  description: string;
}

export default function Stats() {
  const [stats, setStats] = useState<Stat[]>([
    {
      icon: Package,
      number: "0",
      title: "Products Listed",
      description: "Real listings on DealDone",
    },
    {
      icon: Users,
      number: "0",
      title: "Registered Users",
      description: "Accounts created on DealDone",
    },
    {
      icon: MapPin,
      number: "0",
      title: "Locations",
      description: "Places with available listings",
    },
    {
      icon: Layers3,
      number: "0",
      title: "Categories",
      description: "Product categories available",
    },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const productsSnapshot = await getDocs(
          collection(db, "products")
        );

        const usersSnapshot = await getDocs(
          collection(db, "users")
        );

        const products = productsSnapshot.docs.map((doc) => doc.data());

        /* =========================
           UNIQUE LOCATIONS
        ========================= */

        const locations = new Set(
          products
            .map((product: any) => product.location)
            .filter(
              (location): location is string =>
                typeof location === "string" &&
                location.trim().length > 0
            )
            .map((location) => location.trim().toLowerCase())
        );

        /* =========================
           UNIQUE CATEGORIES
        ========================= */

        const categories = new Set(
          products
            .map((product: any) => product.category)
            .filter(
              (category): category is string =>
                typeof category === "string" &&
                category.trim().length > 0
            )
            .map((category) => category.trim().toLowerCase())
        );

        setStats([
          {
            icon: Package,
            number: productsSnapshot.size.toString(),
            title: "Products Listed",
            description: "Real listings on DealDone",
          },
          {
            icon: Users,
            number: usersSnapshot.size.toString(),
            title: "Registered Users",
            description: "Accounts created on DealDone",
          },
          {
            icon: MapPin,
            number: locations.size.toString(),
            title: "Locations",
            description: "Places with available listings",
          },
          {
            icon: Layers3,
            number: categories.size.toString(),
            title: "Categories",
            description: "Product categories available",
          },
        ]);
      } catch (error) {
        console.error("Error loading DealDone stats:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#08060d] px-6 py-24">

      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        {/* Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.08]
            [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]
            [background-size:60px_60px]
          "
        />

        {/* Purple Glow */}
        <motion.div
          animate={{
            x: [0, 120, -80, 0],
            y: [0, -70, 80, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-48
            top-10
            h-[450px]
            w-[450px]
            rounded-full
            bg-purple-600/20
            blur-[130px]
          "
        />

        {/* Orange Glow */}
        <motion.div
          animate={{
            x: [0, -100, 80, 0],
            y: [0, 80, -60, 0],
            scale: [1, 0.9, 1.15, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-48
            bottom-0
            h-[450px]
            w-[450px]
            rounded-full
            bg-orange-500/10
            blur-[130px]
          "
        />

        {/* Center Glow */}
        <motion.div
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-64
            w-64
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-fuchsia-500/20
            blur-[110px]
          "
        />

      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* =====================================================
            HEADING
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="mb-14 text-center"
        >

          {/* Badge */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            viewport={{
              once: true,
            }}
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-purple-500/30
              bg-purple-500/10
              px-5
              py-2
              text-sm
              font-semibold
              text-purple-300
              backdrop-blur-md
            "
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />
            DealDone Marketplace
          </motion.div>

          {/* Heading */}

          <h2
            className="
              text-4xl
              font-extrabold
              tracking-tight
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            Explore the{" "}
            <span
              className="
                bg-gradient-to-r
                from-purple-400
                via-fuchsia-400
                to-orange-400
                bg-clip-text
                text-transparent
              "
            >
              marketplace.
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-base
              leading-relaxed
              text-gray-400
              sm:text-lg
            "
          >
            A quick look at what is currently available
            across the DealDone marketplace.
          </p>

        </motion.div>

        {/* =====================================================
            STAT CARDS
        ===================================================== */}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: 45,
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
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[28px]
                  border
                  border-white/10
                  bg-white/[0.035]
                  p-7
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:border-purple-500/40
                  hover:bg-white/[0.06]
                  hover:shadow-[0_25px_80px_rgba(139,92,246,0.14)]
                "
              >

                {/* Card shine */}

                <motion.div
                  initial={{
                    x: "-120%",
                  }}
                  whileHover={{
                    x: "120%",
                  }}
                  transition={{
                    duration: 0.8,
                  }}
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    w-1/2
                    -skew-x-12
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.06]
                    to-transparent
                  "
                />

                {/* Card glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    bg-purple-500/10
                    blur-3xl
                    transition-all
                    duration-500
                    group-hover:bg-purple-500/20
                  "
                />

                {/* =================================================
                    ICON
                ================================================= */}

                <div
                  className="
                    relative
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-purple-400/20
                    bg-purple-500/10
                    text-purple-300
                    shadow-[0_0_30px_rgba(139,92,246,0.08)]
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:rotate-3
                    group-hover:border-purple-400/40
                    group-hover:bg-purple-500/20
                  "
                >
                  <Icon size={27} strokeWidth={1.8} />
                </div>

                {/* =================================================
                    NUMBER
                ================================================= */}

                <div className="relative mt-7">

                  {loading ? (
                    <div className="h-10 w-20 animate-pulse rounded-lg bg-white/10" />
                  ) : (
                    <motion.h3
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1 + 0.2,
                      }}
                      className="
                        text-4xl
                        font-extrabold
                        tracking-tight
                        text-white
                        sm:text-5xl
                      "
                    >
                      {item.number}
                    </motion.h3>
                  )}

                </div>

                {/* =================================================
                    TITLE
                ================================================= */}

                <h4
                  className="
                    relative
                    mt-3
                    text-lg
                    font-bold
                    text-white
                  "
                >
                  {item.title}
                </h4>

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <p
                  className="
                    relative
                    mt-2
                    text-sm
                    leading-relaxed
                    text-gray-500
                  "
                >
                  {item.description}
                </p>

                {/* =================================================
                    BOTTOM LINE
                ================================================= */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    w-0
                    bg-gradient-to-r
                    from-purple-500
                    via-fuchsia-500
                    to-orange-500
                    transition-all
                    duration-500
                    group-hover:w-full
                  "
                />

              </motion.div>
            );
          })}

        </div>

        {/* =====================================================
            SMALL FOOTER MESSAGE
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            delay: 0.4,
          }}
          viewport={{
            once: true,
          }}
          className="
            mt-10
            text-center
            text-sm
            text-gray-600
          "
        >
          Live marketplace data • Updated from DealDone listings
        </motion.div>

      </div>
    </section>
  );
}