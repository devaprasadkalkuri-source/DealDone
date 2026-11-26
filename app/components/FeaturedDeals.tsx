
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
    let active = true;

    async function fetchProducts() {
      try {
        const snapshot = await getDocs(collection(db, "products"));

        const items: Product[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));

        if (active) setProducts(items);
      } catch (error) {
        console.error("Error loading featured deals:", error);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      active = false;
    };
  }, []);

  const featuredProducts = products.slice(0, 4);

  return (
    <section className="relative overflow-hidden px-3 py-10 min-[380px]:px-4 min-[380px]:py-12 sm:px-6 sm:py-20 md:px-8 md:py-28">
      {/* BACKGROUND */}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#8ed8ff_0%,#b9dcff_25%,#d9c8ff_52%,#f5d0e4_73%,#ffd8b5_100%)]" />

        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-sky-300/70 blur-[80px] sm:h-[520px] sm:w-[520px]" />

        <div className="absolute left-[35%] top-[20%] h-[380px] w-[380px] rounded-full bg-violet-300/45 blur-[100px] sm:h-[500px] sm:w-[500px]" />

        <div className="absolute -right-32 bottom-[-120px] h-[420px] w-[420px] rounded-full bg-orange-300/65 blur-[85px] sm:h-[550px] sm:w-[550px]" />

        <div className="absolute right-[25%] top-[8%] h-[240px] w-[240px] rounded-full bg-pink-300/40 blur-[75px] sm:h-[300px] sm:w-[300px]" />

        {/* CLOUDS */}

        <div className="absolute left-[4%] top-[8%] h-14 w-36 rounded-full bg-white/55 blur-[14px] sm:h-20 sm:w-52" />
        <div className="absolute left-[10%] top-[4%] h-12 w-24 rounded-full bg-white/50 blur-[12px]" />
        <div className="absolute left-[17%] top-[9%] h-10 w-20 rounded-full bg-white/45 blur-[10px]" />
        <div className="absolute right-[7%] top-[18%] h-14 w-40 rounded-full bg-white/50 blur-[15px] sm:h-20 sm:w-56" />
        <div className="absolute right-[13%] top-[13%] h-12 w-24 rounded-full bg-white/45 blur-[12px]" />

        {/* ORGANIC BLOBS */}

        <div className="absolute -left-20 bottom-[5%] h-48 w-48 rotate-[-18deg] rounded-[48%_52%_60%_40%] bg-sky-400/25 sm:h-64 sm:w-64" />

        <div className="absolute left-[3%] bottom-[10%] h-24 w-24 rotate-45 rounded-[60%_40%_55%_45%] bg-purple-400/25 sm:h-32 sm:w-32" />

        <div className="absolute -right-16 bottom-[2%] h-56 w-56 rotate-[25deg] rounded-[55%_45%_40%_60%] bg-orange-400/30 sm:h-72 sm:w-72" />

        <div className="absolute right-[7%] bottom-[12%] h-28 w-28 rotate-[-25deg] rounded-[40%_60%_45%_55%] bg-pink-400/25 sm:h-36 sm:w-36" />

        {/* PETALS */}

        <div className="absolute left-[7%] bottom-[27%] h-16 w-10 rotate-[-35deg] rounded-full bg-pink-400/25 sm:h-20 sm:w-12" />
        <div className="absolute left-[10%] bottom-[23%] h-16 w-10 rotate-[35deg] rounded-full bg-purple-400/20 sm:h-20 sm:w-12" />
        <div className="absolute left-[8.5%] bottom-[20%] h-8 w-8 rounded-full bg-orange-300/30" />

        <div className="absolute right-[8%] bottom-[29%] h-20 w-12 rotate-[35deg] rounded-full bg-orange-400/25 sm:h-24 sm:w-14" />
        <div className="absolute right-[11%] bottom-[25%] h-20 w-12 rotate-[-35deg] rounded-full bg-pink-400/25 sm:h-24 sm:w-14" />
        <div className="absolute right-[9.5%] bottom-[21%] h-9 w-9 rounded-full bg-purple-300/30" />

        {/* FLOATING CIRCLES */}

        <div className="absolute left-[27%] top-[15%] h-3 w-3 rounded-full bg-white/65" />
        <div className="absolute left-[31%] top-[10%] h-1.5 w-1.5 rounded-full bg-white/80" />
        <div className="absolute right-[31%] top-[13%] h-2.5 w-2.5 rounded-full bg-white/70" />
        <div className="absolute right-[23%] bottom-[20%] h-3 w-3 rounded-full bg-white/55" />
        <div className="absolute left-[22%] bottom-[18%] h-2.5 w-2.5 rounded-full bg-white/60" />

        {/* SOFT LIGHT */}

        <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15 blur-[80px] sm:h-[420px] sm:w-[420px]" />

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

      {/* CONTENT */}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex flex-col gap-4 sm:mb-14 sm:gap-7 md:flex-row md:items-end md:justify-between"
        >
          <div className="min-w-0">
            <div className="mb-3 flex items-center gap-2.5 sm:mb-5 sm:gap-3">
              <span className="h-[2px] w-6 bg-orange-500 sm:w-8" />

              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-600 sm:text-[10px] sm:tracking-[0.22em]">
                Featured deals
              </span>
            </div>

            <h2 className="text-[34px] font-black leading-[0.96] tracking-[-1.6px] text-zinc-950 min-[380px]:text-[40px] sm:text-[52px] sm:tracking-[-2.5px] md:text-[62px]">
              Good products.
              <br />
              <span className="text-orange-500">Better deals.</span>
            </h2>

            <p className="mt-3 max-w-xl text-[13px] leading-5 text-zinc-700 min-[380px]:text-sm min-[380px]:leading-6 sm:mt-5 sm:text-base sm:leading-7 md:text-lg">
              Discover real products listed by people on
              DealDone. Find something useful and make a
              deal that works for you.
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm font-bold text-zinc-800 shadow-lg backdrop-blur-md transition-all hover:border-orange-200 hover:text-orange-500 sm:w-fit sm:justify-center sm:px-5"
          >
            View all deals

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white transition-colors group-hover:bg-orange-500">
              <ArrowRight size={14} />
            </span>
          </Link>
        </motion.div>

        {/* LOADING */}

        {loading && (
          <div className="grid grid-cols-2 gap-2.5 min-[380px]:gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-lg sm:rounded-[28px]"
              >
                <div className="h-[145px] animate-pulse bg-zinc-100 min-[380px]:h-[170px] sm:h-[315px]" />

                <div className="space-y-2.5 p-3 sm:space-y-4 sm:p-5">
                  <div className="h-3.5 w-3/4 animate-pulse rounded-full bg-zinc-100 sm:h-4" />
                  <div className="h-5 w-1/2 animate-pulse rounded-full bg-zinc-100 sm:h-7" />
                  <div className="h-3 w-2/3 animate-pulse rounded-full bg-zinc-100 sm:h-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}

        {!loading && products.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex min-h-[260px] flex-col items-center justify-center rounded-[24px] border border-white/80 bg-white/75 px-5 py-8 text-center shadow-xl backdrop-blur-md sm:min-h-[350px] sm:rounded-[32px] sm:px-6"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-zinc-400 shadow-sm sm:h-16 sm:w-16">
              <PackageOpen size={26} />
            </div>

            <h3 className="mt-4 text-lg font-black text-zinc-900 sm:mt-5 sm:text-xl">
              No deals yet
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-zinc-500">
              There are no products listed on DealDone yet.
              Be the first to put something up for sale.
            </p>

            <Link
              href="/sell"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-black text-white transition-all hover:bg-orange-500 sm:mt-6 sm:px-6"
            >
              Sell Something
              <ArrowUpRight size={16} />
            </Link>
          </motion.div>
        )}

        {/* PRODUCT GRID */}

        {!loading && featuredProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-2.5 min-[380px]:gap-3 sm:gap-5 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                }}
                whileHover={{ y: -6 }}
                className="group relative min-w-0 overflow-hidden rounded-2xl border border-white/90 bg-white shadow-[0_10px_30px_rgba(35,35,80,0.12)] transition-all duration-300 sm:rounded-[28px] sm:shadow-[0_18px_50px_rgba(35,35,80,0.13)] sm:hover:shadow-[0_30px_80px_rgba(35,35,80,0.20)]"
              >
                {/* IMAGE */}

                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative h-[150px] overflow-hidden bg-[#f3f3f1] min-[380px]:h-[175px] min-[430px]:h-[195px] sm:h-[315px]">
                    {product.image ? (
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.6 }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-300">
                        <PackageOpen size={28} className="sm:h-[42px] sm:w-[42px]" />
                      </div>
                    )}

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-60" />

                    {/* CATEGORY */}

                    {product.category && (
                      <div className="absolute left-2 top-2 max-w-[70%] truncate rounded-full border border-white/70 bg-white/90 px-2 py-1 text-[8px] font-black uppercase tracking-wide text-zinc-700 shadow-sm backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:py-1.5 sm:text-[9px]">
                        {product.category}
                      </div>
                    )}

                    {/* SAVE BUTTON */}

                    <button
                      type="button"
                      aria-label={`Save ${product.name}`}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-white/90 text-zinc-600 shadow-sm backdrop-blur-md transition-all hover:bg-zinc-950 hover:text-white active:scale-95 sm:right-4 sm:top-4 sm:h-10 sm:w-10"
                    >
                      <Heart size={15} strokeWidth={1.8} />
                    </button>

                    {/* DESKTOP ARROW */}

                    <div className="absolute bottom-3 right-3 hidden h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-zinc-950 text-white opacity-0 shadow-lg transition-all group-hover:translate-y-0 group-hover:opacity-100 sm:bottom-4 sm:right-4 sm:flex">
                      <ArrowUpRight size={17} />
                    </div>
                  </div>
                </Link>

                {/* DETAILS */}

                <div className="p-2.5 min-[380px]:p-3 sm:p-5">
                  <Link href={`/product/${product.id}`} className="block min-w-0">
                    <h3 className="truncate text-[12px] font-black tracking-tight text-zinc-900 transition-colors group-hover:text-orange-500 min-[380px]:text-[13px] sm:text-base">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="mt-1.5 text-[15px] font-black tracking-tight text-zinc-950 min-[380px]:text-base sm:mt-2 sm:text-xl">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>

                  {product.location && (
                    <div className="mt-2 flex min-w-0 items-center gap-1 text-[10px] text-zinc-400 sm:mt-4 sm:gap-1.5 sm:text-xs">
                      <MapPin size={11} className="shrink-0 sm:h-[13px] sm:w-[13px]" />

                      <span className="min-w-0 truncate">
                        {product.location}
                      </span>
                    </div>
                  )}

                  <Link
                    href={`/product/${product.id}`}
                    className="mt-2.5 flex min-h-8 items-center justify-between gap-1.5 border-t border-zinc-100 pt-2 text-[10px] font-bold text-zinc-500 transition-colors hover:text-orange-500 min-[380px]:text-[11px] sm:mt-5 sm:min-h-10 sm:gap-3 sm:pt-4 sm:text-xs"
                  >
                    <span>View deal</span>
                    <ArrowRight size={12} className="shrink-0 sm:h-[14px] sm:w-[14px]" />
                  </Link>
                </div>

                {/* HOVER LINE */}

                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-orange-500 transition-all duration-500 group-hover:w-full" />
              </motion.article>
            ))}
          </div>
        )}

        {/* MORE DEALS */}

        {!loading && products.length > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-6 flex justify-center sm:mt-10"
          >
            <Link
              href="/products"
              className="group inline-flex min-h-11 w-full items-center justify-between gap-3 rounded-full border border-white/80 bg-white/85 px-4 py-2.5 text-sm font-black text-zinc-800 shadow-lg backdrop-blur-md transition-all hover:border-orange-200 hover:text-orange-500 sm:w-auto sm:justify-center sm:px-6"
            >
              Explore more deals

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white transition-colors group-hover:bg-orange-500">
                <ArrowRight size={14} />
              </span>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
