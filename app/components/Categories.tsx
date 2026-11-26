
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
    let active = true;

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

        if (active) setCounts(nextCounts);
      } catch (error) {
        console.error("Error loading category counts:", error);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadCategoryCounts();

    return () => {
      active = false;
    };
  }, []);

  const getCountLabel = (categoryName: string) => {
    if (loading) return "...";

    const count = counts[categoryName] || 0;

    return `${count} ${count === 1 ? "Listing" : "Listings"}`;
  };

  const categoryLink = (name: string) =>
    `/products?category=${encodeURIComponent(name)}`;

  return (
    <section
      id="categories"
      className="relative overflow-hidden bg-white px-3 py-10 min-[380px]:px-4 min-[380px]:py-12 sm:px-6 sm:py-16 md:px-8 md:py-24"
    >
      {/* Background */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[35%] h-64 w-80 -translate-x-1/2 rounded-full bg-orange-100/30 blur-[90px] sm:h-[500px] sm:w-[700px]" />

        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="absolute -left-32 top-[30%] h-56 w-56 rounded-full border border-zinc-900/[0.05] sm:-left-24 sm:h-64 sm:w-64" />

        <div className="absolute -right-32 bottom-[5%] h-64 w-64 rounded-full border border-orange-500/[0.07] sm:-right-28 sm:h-80 sm:w-80" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-6 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3 sm:mb-4"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-zinc-500 sm:px-4 sm:py-2 sm:text-[10px]">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Explore categories
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.6 }}
              className="text-[32px] font-black leading-[1.02] tracking-[-1.5px] text-zinc-950 min-[380px]:text-[38px] sm:text-5xl md:text-6xl"
            >
              Find your next
              <span className="text-orange-500"> favorite.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-3 max-w-xl text-[13px] leading-5 text-zinc-500 min-[380px]:text-sm sm:mt-4 sm:text-base sm:leading-7"
            >
              Browse real listings from people around you.
              Discover something worth the deal.
            </motion.p>
          </div>

          <Link
            href="/products"
            className="group inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-bold text-zinc-800 shadow-sm transition-all hover:border-orange-200 hover:text-orange-500 sm:w-fit sm:justify-center sm:px-5"
          >
            <span>View all deals</span>

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 transition-colors group-hover:bg-orange-500 group-hover:text-white">
              <ArrowRight size={14} />
            </span>
          </Link>
        </div>

        {/* Desktop first row */}

        <div className="hidden items-center justify-center gap-4 lg:flex xl:gap-5">
          {categories.slice(0, 5).map((category, index) => {
            const Icon = category.icon;
            const isCenter = index === 2;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{
                  opacity: 1,
                  y: isCenter ? -24 : 0,
                  scale: isCenter ? 1.04 : 1,
                }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className={`relative ${
                  isCenter ? "w-[240px] xl:w-[250px]" : "w-[210px] xl:w-[220px]"
                }`}
              >
                <div className="absolute -bottom-8 left-[8%] h-16 w-[84%] rounded-full bg-zinc-300/40 blur-2xl" />

                <Link href={categoryLink(category.name)} className="group relative block">
                  <div
                    className={`relative overflow-hidden rounded-[32px] border border-white/70 bg-zinc-200 shadow-[0_25px_55px_rgba(0,0,0,0.12)] transition-all duration-500 group-hover:-translate-y-3 ${
                      isCenter ? "h-[420px]" : "h-[370px]"
                    }`}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/5" />

                    <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/25 bg-black/20 text-white backdrop-blur-md">
                      <Icon size={19} />
                    </div>

                    <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-md group-hover:bg-orange-500">
                      <ArrowUpRight size={17} />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-2xl font-black tracking-tight text-white">
                        {category.name}
                      </h3>

                      <p className="mt-1 text-xs font-medium text-white/70">
                        {category.description}
                      </p>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold text-white backdrop-blur-md">
                          {getCountLabel(category.name)}
                        </span>

                        <span className="text-xs font-bold text-white/70 group-hover:text-white">
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

        {/* Desktop second row */}

        <div className="mt-8 hidden grid-cols-3 gap-5 lg:grid">
          {categories.slice(5).map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link href={categoryLink(category.name)} className="group block">
                  <div className="relative h-[230px] overflow-hidden rounded-[30px] border border-white bg-zinc-200 shadow-[0_20px_45px_rgba(0,0,0,0.09)] transition-all duration-500 group-hover:-translate-y-2">
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

                    <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md group-hover:bg-orange-500">
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
                          {loading ? "..." : counts[category.name] || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile and tablet category cards */}

        <div className="grid grid-cols-2 gap-2.5 min-[380px]:gap-3 sm:gap-5 lg:hidden">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: index * 0.035, duration: 0.45 }}
              >
                <Link
                  href={categoryLink(category.name)}
                  className="group block"
                >
                  <div className="relative h-[190px] overflow-hidden rounded-2xl border border-white bg-zinc-200 shadow-[0_8px_20px_rgba(0,0,0,0.08)] active:scale-[0.98] min-[380px]:h-[215px] min-[380px]:rounded-[22px] sm:h-[280px] sm:rounded-[28px]">
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 sm:group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                    {/* Icon */}

                    <div className="absolute left-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-black/20 text-white backdrop-blur-md min-[380px]:left-3 min-[380px]:top-3 min-[380px]:h-9 min-[380px]:w-9">
                      <Icon size={16} />
                    </div>

                    {/* Arrow */}

                    <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-md min-[380px]:right-3 min-[380px]:top-3 min-[380px]:h-8 min-[380px]:w-8 sm:group-hover:bg-orange-500">
                      <ArrowUpRight size={14} />
                    </div>

                    {/* Content */}

                    <div className="absolute bottom-0 left-0 right-0 p-2.5 min-[380px]:p-3 sm:p-5">
                      <h3 className="text-[15px] font-black leading-tight tracking-tight text-white min-[380px]:text-lg sm:text-2xl">
                        {category.name}
                      </h3>

                      <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-white/75 min-[380px]:text-xs sm:text-sm">
                        {category.description}
                      </p>

                      <div className="mt-2 flex items-center justify-between gap-1.5 min-[380px]:mt-3">
                        <span className="min-w-0 truncate rounded-full border border-white/20 bg-white/10 px-2 py-1 text-[9px] font-bold text-white backdrop-blur-md min-[380px]:px-2.5 min-[380px]:text-[10px] sm:px-3 sm:py-1.5 sm:text-xs">
                          {getCountLabel(category.name)}
                        </span>

                        <span className="shrink-0 text-[9px] font-bold text-white min-[380px]:text-[10px] sm:text-xs">
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
    </section>
  );
}
