"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  MapPin,
  PackageOpen,
} from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  location?: string;
  category?: string;
}

export default function FeaturedDeals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const items: Product[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));

        setProducts(items);
      } catch (error) {
        console.error("Error loading featured deals:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-28">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#8ed8ff_0%,#b9dcff_25%,#d9c8ff_52%,#f5d0e4_73%,#ffd8b5_100%)]" />

        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-sky-300/70 blur-[80px] sm:h-[520px] sm:w-[520px] sm:blur-[90px]" />

        <div className="absolute left-[35%] top-[20%] h-[380px] w-[380px] rounded-full bg-violet-300/45 blur-[100px] sm:h-[500px] sm:w-[500px] sm:blur-[120px]" />

        <div className="absolute -right-32 bottom-[-120px] h-[420px] w-[420px] rounded-full bg-orange-300/65 blur-[85px] sm:h-[550px] sm:w-[550px] sm:blur-[100px]" />

        <div className="absolute right-[25%] top-[8%] h-[240px] w-[240px] rounded-full bg-pink-300/40 blur-[75px] sm:h-[300px] sm:w-[300px] sm:blur-[90px]" />

        {/* CLOUDS */}

        <div className="absolute left-[4%] top-[8%] h-14 w-36 rounded-full bg-white/55 blur-[14px] sm:h-20 sm:w-52 sm:blur-[18px]" />

        <div className="absolute left-[10%] top-[4%] h-12 w-24 rounded-full bg-white/50 blur-[12px] sm:h-16 sm:w-32 sm:blur-[14px]" />

        <div className="absolute left-[17%] top-[9%] h-10 w-20 rounded-full bg-white/45 blur-[10px] sm:h-12 sm:w-24 sm:blur-[12px]" />

        <div className="absolute right-[7%] top-[18%] h-14 w-40 rounded-full bg-white/50 blur-[15px] sm:h-20 sm:w-56 sm:blur-[20px]" />

        <div className="absolute right-[13%] top-[13%] h-12 w-24 rounded-full bg-white/45 blur-[12px] sm:h-14 sm:w-28 sm:blur-[14px]" />

        {/* ORGANIC BLOBS */}

        <div className="absolute -left-20 bottom-[5%] h-48 w-48 rotate-[-18deg] rounded-[48%_52%_60%_40%] bg-sky-400/25 blur-[2px] sm:h-64 sm:w-64" />

        <div className="absolute left-[3%] bottom-[10%] h-24 w-24 rotate-45 rounded-[60%_40%_55%_45%] bg-purple-400/25 sm:h-32 sm:w-32" />

        <div className="absolute -right-16 bottom-[2%] h-56 w-56 rotate-[25deg] rounded-[55%_45%_40%_60%] bg-orange-400/30 blur-[2px] sm:h-72 sm:w-72" />

        <div className="absolute right-[7%] bottom-[12%] h-28 w-28 rotate-[-25deg] rounded-[40%_60%_45%_55%] bg-pink-400/25 sm:h-36 sm:w-36" />

        {/* PETALS */}

        <div className="absolute left-[7%] bottom-[27%] h-16 w-10 rotate-[-35deg] rounded-full bg-pink-400/25 sm:h-20 sm:w-12" />

        <div className="absolute left-[10%] bottom-[23%] h-16 w-10 rotate-[35deg] rounded-full bg-purple-400/20 sm:h-20 sm:w-12" />

        <div className="absolute left-[8.5%] bottom-[20%] h-8 w-8 rounded-full bg-orange-300/30 sm:h-10 sm:w-10" />

        <div className="absolute right-[8%] bottom-[29%] h-20 w-12 rotate-[35deg] rounded-full bg-orange-400/25 sm:h-24 sm:w-14" />

        <div className="absolute right-[11%] bottom-[25%] h-20 w-12 rotate-[-35deg] rounded-full bg-pink-400/25 sm:h-24 sm:w-14" />

        <div className="absolute right-[9.5%] bottom-[21%] h-9 w-9 rounded-full bg-purple-300/30 sm:h-11 sm:w-11" />

        {/* FLOATING CIRCLES */}

        <div className="absolute left-[27%] top-[15%] h-3 w-3 rounded-full bg-white/65 sm:h-4 sm:w-4" />

        <div className="absolute left-[31%] top-[10%] h-1.5 w-1.5 rounded-full bg-white/80 sm:h-2 sm:w-2" />

        <div className="absolute right-[31%] top-[13%] h-2.5 w-2.5 rounded-full bg-white/70 sm:h-3 sm:w-3" />

        <div className="absolute right-[23%] bottom-[20%] h-3 w-3 rounded-full bg-white/55 sm:h-4 sm:w-4" />

        <div className="absolute left-[22%] bottom-[18%] h-2.5 w-2.5 rounded-full bg-white/60 sm:h-3 sm:w-3" />

        {/* SOFT LIGHT */}

        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15 blur-[80px] sm:h-[420px] sm:w-[420px] sm:blur-[100px]" />

        {/* TEXTURE */}

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =================================================
            HEADER
        ================================================== */}

        <motion.div
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="mb-10 flex flex-col gap-7 sm:mb-14 md:flex-row md:items-end md:justify-between"
        >
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-2.5 sm:mb-5 sm:gap-3">
              <span className="h-[2px] w-6 bg-orange-500 sm:w-8" />

              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-600 sm:text-[10px] sm:tracking-[0.22em]">
                Featured deals
              </span>
            </div>

            <h2 className="max-w-3xl text-[38px] font-black leading-[0.94] tracking-[-2px] text-zinc-950 min-[360px]:text-[42px] sm:text-[52px] sm:tracking-[-2.5px] md:text-[62px]">
              Good products.
              <br />

              <span className="text-orange-500">
                Better deals.
              </span>
            </h2>

            <p className="mt-4 max-w-xl text-[14px] leading-6 text-zinc-700 sm:mt-5 sm:text-base sm:leading-7 md:text-lg">
              Discover real products listed by people on
              DealDone. Find something useful and make a
              deal that works for you.
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-white/80 bg-white/85 px-5 py-3 text-sm font-bold text-zinc-800 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:text-orange-500 hover:shadow-xl sm:w-fit"
          >
            View all deals

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white transition-all duration-300 group-hover:bg-orange-500">
              <ArrowRight size={14} />
            </span>
          </Link>
        </motion.div>

        {/* =================================================
            LOADING STATE
        ================================================== */}

        {loading && (
          <div className="grid grid-cols-1 gap-4 min-[360px]:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[24px] border border-white/80 bg-white/90 shadow-[0_20px_60px_rgba(0,0,0,0.10)] sm:rounded-[28px]"
              >
                <div className="h-[270px] animate-pulse bg-zinc-100 min-[360px]:h-[290px] sm:h-[315px]" />

                <div className="space-y-4 p-4 sm:p-5">
                  <div className="h-4 w-3/4 animate-pulse rounded-full bg-zinc-100" />

                  <div className="h-7 w-1/2 animate-pulse rounded-full bg-zinc-100" />

                  <div className="h-4 w-2/3 animate-pulse rounded-full bg-zinc-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* =================================================
            EMPTY STATE
        ================================================== */}

        {!loading && products.length === 0 && (
          <motion.div
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
            className="flex min-h-[320px] flex-col items-center justify-center rounded-[28px] border border-white/80 bg-white/75 px-5 py-10 text-center shadow-xl backdrop-blur-md sm:min-h-[350px] sm:rounded-[32px] sm:px-6"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-zinc-400 shadow-sm sm:h-16 sm:w-16">
              <PackageOpen size={26} className="sm:h-7 sm:w-7" />
            </div>

            <h3 className="mt-5 text-lg font-black text-zinc-900 sm:text-xl">
              No deals yet
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
              There are no products listed on DealDone
              yet. Be the first to put something up for
              sale.
            </p>

            <Link
              href="/sell"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500 sm:px-6"
            >
              Sell Something

              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        )}

        {/* =================================================
            PRODUCT GRID
        ================================================== */}

        {!loading && featuredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-5 min-[390px]:gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <motion.article
                key={product.id}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -9,
                }}
                className="group relative overflow-hidden rounded-[24px] border border-white/90 bg-white shadow-[0_18px_50px_rgba(35,35,80,0.13)] transition-all duration-500 hover:border-white hover:shadow-[0_30px_80px_rgba(35,35,80,0.20)] sm:rounded-[28px]"
              >
                {/* IMAGE */}

                <Link
                  href={`/product/${product.id}`}
                  className="block"
                >
                  <div className="relative h-[275px] overflow-hidden bg-[#f3f3f1] min-[360px]:h-[300px] min-[400px]:h-[320px] sm:h-[315px]">
                    {product.image ? (
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                        whileHover={{
                          scale: 1.07,
                        }}
                        transition={{
                          duration: 0.7,
                          ease: "easeOut",
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-300">
                        <PackageOpen size={38} className="sm:h-[42px] sm:w-[42px]" />
                      </div>
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-60" />

                    {/* CATEGORY */}

                    {product.category && (
                      <div className="absolute left-3 top-3 max-w-[65%] truncate rounded-full border border-white/70 bg-white/90 px-2.5 py-1.5 text-[8px] font-black uppercase tracking-[0.12em] text-zinc-700 shadow-sm backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:text-[9px] sm:tracking-[0.14em]">
                        {product.category}
                      </div>
                    )}

                    {/* SAVE */}

                    <button
                      type="button"
                      aria-label={`Save ${product.name}`}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      className="absolute right-3 top-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/90 text-zinc-600 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-zinc-950 hover:text-white active:scale-95 sm:right-4 sm:top-4"
                    >
                      <Heart
                        size={17}
                        strokeWidth={1.8}
                      />
                    </button>

                    {/* DESKTOP HOVER ARROW */}

                    <div className="absolute bottom-3 right-3 hidden h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-zinc-950 text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-4 sm:right-4 sm:flex">
                      <ArrowUpRight size={17} />
                    </div>
                  </div>
                </Link>

                {/* PRODUCT DETAILS */}

                <div className="p-4 sm:p-5">
                  <Link
                    href={`/product/${product.id}`}
                    className="block min-w-0"
                  >
                    <h3 className="truncate text-[15px] font-black tracking-[-0.3px] text-zinc-900 transition-colors duration-300 group-hover:text-orange-500 sm:text-base">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="mt-2 text-lg font-black tracking-[-0.5px] text-zinc-950 sm:text-xl">
                    ₹
                    {Number(product.price).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  {product.location && (
                    <div className="mt-3 flex min-w-0 items-center gap-1.5 text-xs text-zinc-400 sm:mt-4">
                      <MapPin
                        size={13}
                        className="shrink-0"
                      />

                      <span className="min-w-0 truncate">
                        {product.location}
                      </span>
                    </div>
                  )}

                  <Link
                    href={`/product/${product.id}`}
                    className="mt-4 flex min-h-10 items-center justify-between gap-3 border-t border-zinc-100 pt-3 text-xs font-bold text-zinc-500 transition-colors duration-300 hover:text-orange-500 sm:mt-5 sm:pt-4"
                  >
                    <span>View deal</span>

                    <ArrowRight
                      size={14}
                      className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                {/* ORANGE HOVER LINE */}

                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />
              </motion.article>
            ))}
          </div>
        )}

        {/* =================================================
            MORE DEALS
        ================================================== */}

        {!loading && products.length > 4 && (
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
              delay: 0.2,
            }}
            className="mt-8 flex justify-center sm:mt-10"
          >
            <Link
              href="/products"
              className="group inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-full border border-white/80 bg-white/85 px-5 py-3.5 text-sm font-black text-zinc-800 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:text-orange-500 hover:shadow-xl sm:w-auto sm:px-6"
            >
              Explore more deals

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white transition-colors duration-300 group-hover:bg-orange-500">
                <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}