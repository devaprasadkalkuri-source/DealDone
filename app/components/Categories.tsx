"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Smartphone,
  Shirt,
  CarFront,
  House,
  BookOpen,
  Trophy,
  Gamepad2,
  PawPrint,
} from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Category {
  id: number;
  name: string;
  description: string;
  icon: React.ElementType;
  image: string;
  position: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    description: "Phones, laptops, gadgets & more",
    icon: Smartphone,
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    id: 2,
    name: "Fashion",
    description: "Style that fits you",
    icon: Shirt,
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    id: 3,
    name: "Vehicles",
    description: "Cars, bikes & more",
    icon: CarFront,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    id: 4,
    name: "Home",
    description: "Furniture & essentials",
    icon: House,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    id: 5,
    name: "Books",
    description: "Books for every mind",
    icon: BookOpen,
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    id: 6,
    name: "Sports",
    description: "Gear up & play",
    icon: Trophy,
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    id: 7,
    name: "Gaming",
    description: "Level up your setup",
    icon: Gamepad2,
    image:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
  {
    id: 8,
    name: "Pets",
    description: "Everything for companions",
    icon: PawPrint,
    image:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1000&q=90",
    position: "center",
  },
];

export default function Categories() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategoryCounts() {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const nextCounts: Record<string, number> = {};

        categories.forEach((category) => {
          nextCounts[category.name] = 0;
        });

        snapshot.forEach((productDoc) => {
          const data = productDoc.data();

          const productCategory =
            typeof data.category === "string"
              ? data.category.trim().toLowerCase()
              : "";

          const matchingCategory = categories.find(
            (category) =>
              category.name.toLowerCase() === productCategory
          );

          if (matchingCategory) {
            nextCounts[matchingCategory.name] += 1;
          }
        });

        setCounts(nextCounts);
      } catch (error) {
        console.error("Error loading category counts:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCategoryCounts();
  }, []);

  const getCountLabel = (categoryName: string) => {
    if (loading) {
      return "Loading...";
    }

    const count = counts[categoryName] || 0;

    return `${count} ${count === 1 ? "Listing" : "Listings"}`;
  };

  return (
    <section
      id="categories"
      className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Center glow */}

        <div className="absolute left-1/2 top-[35%] h-[360px] w-[500px] -translate-x-1/2 rounded-full bg-orange-100/30 blur-[100px] sm:h-[500px] sm:w-[700px] sm:blur-[120px]" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Decorative circles */}

        <div className="absolute -left-32 top-[30%] h-56 w-56 rounded-full border border-zinc-900/[0.05] sm:-left-24 sm:h-64 sm:w-64" />

        <div className="absolute -right-32 bottom-[5%] h-64 w-64 rounded-full border border-orange-500/[0.07] sm:-right-28 sm:h-80 sm:w-80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-9 flex flex-col gap-6 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.6,
              }}
              className="mb-4"
            >
              <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-zinc-500 sm:px-4 sm:text-[10px] sm:tracking-[0.18em]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />

                <span className="truncate">
                  Explore categories
                </span>
              </span>
            </motion.div>

            <motion.h2
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.1,
                duration: 0.7,
              }}
              className="max-w-2xl text-[38px] font-black leading-[0.96] tracking-[-2.2px] text-zinc-950 min-[380px]:text-[42px] sm:text-5xl md:text-6xl"
            >
              Find your next
              <span className="text-orange-500">
                {" "}
                favorite.
              </span>
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="mt-4 max-w-xl text-sm leading-6 text-zinc-500 min-[380px]:text-[15px] sm:text-base sm:leading-7 md:text-lg"
            >
              Browse real listings from people around you.
              Explore products by category and find
              something worth the deal.
            </motion.p>
          </div>

          {/* VIEW ALL */}

          <Link
            href="/products"
            className="group inline-flex min-h-[48px] w-full items-center justify-between gap-3 rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-sm font-bold text-zinc-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:text-orange-500 hover:shadow-md sm:w-fit sm:justify-center sm:px-5 sm:py-3"
          >
            <span>View all deals</span>

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        {/* =====================================================
            CATEGORY DISPLAY
        ====================================================== */}

        <div className="relative">
          {/* ===================================================
              DESKTOP — FIRST ROW
          ==================================================== */}

          <div className="hidden items-center justify-center gap-4 lg:flex xl:gap-5">
            {categories.slice(0, 5).map((category, index) => {
              const Icon = category.icon;
              const isCenter = index === 2;

              return (
                <motion.div
                  key={category.id}
                  initial={{
                    opacity: 0,
                    y: 50,
                    scale: 0.94,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: isCenter ? -28 : 0,
                    scale: isCenter ? 1.04 : 1,
                  }}
                  viewport={{
                    once: true,
                    margin: "-80px",
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                  className={`relative ${
                    isCenter
                      ? "w-[240px] xl:w-[250px]"
                      : "w-[210px] xl:w-[220px]"
                  }`}
                >
                  {/* Floor shadow */}

                  <div
                    className={`absolute -bottom-8 left-[8%] h-16 w-[84%] rounded-full blur-2xl ${
                      isCenter
                        ? "bg-purple-300/40"
                        : "bg-zinc-300/50"
                    }`}
                  />

                  <Link
                    href={`/products?category=${encodeURIComponent(
                      category.name
                    )}`}
                    className="group relative block"
                  >
                    <div
                      className={`relative overflow-hidden rounded-[32px] border border-white/70 bg-zinc-200 shadow-[0_25px_55px_rgba(0,0,0,0.12)] transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_35px_70px_rgba(0,0,0,0.18)] ${
                        isCenter
                          ? "h-[420px]"
                          : "h-[370px]"
                      }`}
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        loading="lazy"
                        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                          isCenter
                            ? "object-center"
                            : category.position
                        }`}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/5" />

                      {/* ICON */}

                      <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/25 bg-black/20 text-white backdrop-blur-md">
                        <Icon size={19} strokeWidth={1.8} />
                      </div>

                      {/* ARROW */}

                      <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                        <ArrowUpRight size={17} />
                      </div>

                      {/* CONTENT */}

                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <h3 className="text-2xl font-black tracking-[-0.8px] text-white">
                          {category.name}
                        </h3>

                        <p className="mt-1 text-xs font-medium text-white/70">
                          {category.description}
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-3">
                          <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
                            {getCountLabel(category.name)}
                          </span>

                          <span className="shrink-0 text-xs font-bold text-white/70 transition-colors group-hover:text-white">
                            Explore →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ===================================================
              DESKTOP — SECOND ROW
          ==================================================== */}

          <div className="mt-8 hidden grid-cols-3 gap-5 lg:grid">
            {categories.slice(5).map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.div
                  key={category.id}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.12,
                    duration: 0.6,
                  }}
                >
                  <Link
                    href={`/products?category=${encodeURIComponent(
                      category.name
                    )}`}
                    className="group relative block"
                  >
                    <div className="relative h-[230px] overflow-hidden rounded-[30px] border border-white bg-zinc-200 shadow-[0_20px_45px_rgba(0,0,0,0.09)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_30px_55px_rgba(0,0,0,0.14)]">
                      <img
                        src={category.image}
                        alt={category.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                      <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/20 text-white backdrop-blur-md">
                        <Icon size={17} />
                      </div>

                      <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition-all group-hover:bg-orange-500">
                        <ArrowUpRight size={16} />
                      </div>

                      <div className="absolute bottom-5 left-5 right-5">
                        <div className="flex items-end justify-between gap-4">
                          <div className="min-w-0">
                            <h3 className="text-xl font-black text-white">
                              {category.name}
                            </h3>

                            <p className="mt-1 truncate text-xs text-white/65">
                              {category.description}
                            </p>
                          </div>

                          <span className="shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
                            {loading
                              ? "..."
                              : counts[category.name] || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ===================================================
              TABLET / MOBILE
          ==================================================== */}

          <div className="grid grid-cols-1 gap-4 min-[480px]:gap-5 sm:grid-cols-2 lg:hidden">
            {categories.map((category, index) => {
              const Icon = category.icon;

              return (
                <motion.div
                  key={category.id}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    margin: "-40px",
                  }}
                  transition={{
                    delay: index * 0.045,
                    duration: 0.55,
                  }}
                >
                  <Link
                    href={`/products?category=${encodeURIComponent(
                      category.name
                    )}`}
                    className="group block"
                  >
                    <div className="relative h-[285px] overflow-hidden rounded-[25px] border border-white bg-zinc-200 shadow-[0_16px_35px_rgba(0,0,0,0.09)] transition-all duration-500 active:scale-[0.985] sm:h-[300px] sm:rounded-[28px] sm:hover:-translate-y-2 sm:hover:shadow-xl"
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 sm:group-hover:scale-105"
                      />

                      {/* Gradient */}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Top icon */}

                      <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-black/20 text-white backdrop-blur-md min-[380px]:left-5 min-[380px]:top-5"
                      >
                        <Icon size={18} />
                      </div>

                      {/* Arrow */}

                      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md transition-all duration-300 sm:right-5 sm:top-5 sm:group-hover:bg-orange-500"
                      >
                        <ArrowUpRight size={17} />
                      </div>

                      {/* Bottom content */}

                      <div className="absolute bottom-0 left-0 right-0 p-4 min-[380px]:p-5">
                        <h3 className="text-[22px] font-black tracking-[-0.6px] text-white min-[380px]:text-2xl"
                        >
                          {category.name}
                        </h3>

                        <p className="mt-1 max-w-[90%] text-xs leading-5 text-white/70 min-[380px]:text-sm"
                        >
                          {category.description}
                        </p>

                        <div className="mt-3 flex items-center justify-between gap-2 min-[380px]:mt-4"
                        >
                          <span className="min-w-0 max-w-[70%] truncate rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md min-[380px]:text-xs"
                          >
                            {getCountLabel(category.name)}
                          </span>

                          <span className="shrink-0 text-[10px] font-bold text-white min-[380px]:text-xs"
                          >
                            Explore →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}