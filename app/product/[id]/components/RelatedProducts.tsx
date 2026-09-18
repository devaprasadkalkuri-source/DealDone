"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  ArrowUpRight,
  MapPin,
  Tag,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  location?: string;
}

interface RelatedProductsProps {
  productId: string;
  category: string;
}

export default function RelatedProducts({
  productId,
  category,
}: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD RELATED PRODUCTS
  // ==========================================

  useEffect(() => {
    let active = true;

    async function loadRelatedProducts() {
      try {
        setLoading(true);

        const productsRef = collection(db, "products");

        const relatedQuery = query(
          productsRef,
          where("category", "==", category),
          limit(8)
        );

        const snapshot = await getDocs(relatedQuery);

        const relatedProducts: Product[] = snapshot.docs
          .map((item) => ({
            id: item.id,
            ...(item.data() as Omit<Product, "id">),
          }))
          .filter((item) => item.id !== productId)
          .slice(0, 4);

        if (active) {
          setProducts(relatedProducts);
        }
      } catch (error) {
        console.error("Error loading related products:", error);

        if (active) {
          setProducts([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    if (productId && category) {
      loadRelatedProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [productId, category]);

  // ==========================================
  // UI
  // ==========================================

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-[#f2f7dc] px-5 py-10 sm:px-8 sm:py-12">
      {/* ======================================
          BACKGROUND ATMOSPHERE
      ======================================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 18, 0],
            y: [0, -12, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d4e84a]/20 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -15, 0],
            y: [0, 12, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-emerald-200/25 blur-3xl"
        />
      </div>

      {/* ======================================
          HEADER
      ======================================= */}

      <div className="relative z-10 mb-8 flex items-end justify-between gap-5">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0a3d2e] text-[#d4e84a]">
              <Sparkles className="h-3.5 w-3.5" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-950/40">
              Keep exploring
            </p>
          </div>

          <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] text-[#0a3d2e] sm:text-4xl">
            Similar Products
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-950/55">
            Discover more listings from the same category currently
            available on DealDone.
          </p>
        </div>

        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#0a3d2e] shadow-sm sm:flex">
          <Tag className="h-5 w-5" />
        </div>
      </div>

      {/* ======================================
          LOADING SKELETON
      ======================================= */}

      {loading && (
        <div className="relative z-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-[1.4rem] border border-emerald-950/5 bg-white p-3 shadow-sm"
            >
              <div className="aspect-square animate-pulse rounded-[1.1rem] bg-emerald-950/5" />

              <div className="space-y-2 px-1 pb-1 pt-4">
                <div className="h-3 w-16 animate-pulse rounded-full bg-emerald-950/5" />

                <div className="h-5 w-3/4 animate-pulse rounded-full bg-emerald-950/5" />

                <div className="h-4 w-1/2 animate-pulse rounded-full bg-emerald-950/5" />

                <div className="h-3 w-2/3 animate-pulse rounded-full bg-emerald-950/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ======================================
          PRODUCTS
      ======================================= */}

      {!loading && products.length > 0 && (
        <div className="relative z-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 18,
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
                duration: 0.45,
                delay: index * 0.07,
              }}
            >
              {/* IMPORTANT:
                  Actual route is /product/[id]
              */}
              <Link
                href={`/product/${product.id}`}
                className="group block overflow-hidden rounded-[1.45rem] border border-emerald-950/5 bg-white p-3 shadow-[0_12px_35px_rgba(10,61,46,0.07)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(10,61,46,0.13)]"
              >
                {/* ==================================
                    IMAGE
                =================================== */}

                <div className="relative aspect-square overflow-hidden rounded-[1.1rem] bg-[#f7f9ee]">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-emerald-950/20">
                      <Tag className="h-8 w-8" />
                    </div>
                  )}

                  {/* Image overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a3d2e]/15 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                  {/* Category */}
                  {product.category && (
                    <div className="absolute left-2.5 top-2.5 max-w-[75%] truncate rounded-full border border-white/40 bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#0a3d2e] shadow-sm backdrop-blur-md">
                      {product.category}
                    </div>
                  )}

                  {/* Open button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#0a3d2e] text-[#d4e84a] opacity-0 shadow-lg transition duration-300 group-hover:opacity-100"
                  >
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </motion.div>
                </div>

                {/* ==================================
                    DETAILS
                =================================== */}

                <div className="px-1 pb-1 pt-4">
                  <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-bold leading-5 text-[#0a3d2e]">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-lg font-black tracking-tight text-[#0a3d2e]">
                    ₹{Number(product.price || 0).toLocaleString("en-IN")}
                  </p>

                  {product.location && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-950/40">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />

                      <span className="truncate">
                        {product.location}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* ======================================
          NO RELATED PRODUCTS
      ======================================= */}

      {!loading && products.length === 0 && (
        <div className="relative z-10 rounded-[1.5rem] border border-emerald-950/8 bg-white px-6 py-10 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f2f7dc] text-[#0a3d2e]">
            <Tag className="h-5 w-5" />
          </div>

          <h3 className="mt-4 font-bold text-[#0a3d2e]">
            No similar products yet
          </h3>

          <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-emerald-950/45">
            There aren't other listings in this category right now.
          </p>
        </div>
      )}
    </section>
  );
}