"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import {
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

import { db } from "@/lib/firebase";

import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import SellerCard from "./components/SellerCard";
import ActionButtons from "./components/ActionButtons";
import RelatedProducts from "./components/RelatedProducts";

interface Product {
  name: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
  category: string;
  sellerName?: string;
  sellerId: string;
  phone: string;
  location: string;
  condition: string;
}

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD PRODUCT
  // ==========================================

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      try {
        setLoading(true);

        const productRef = doc(db, "products", id);
        const productSnap = await getDoc(productRef);

        if (!active) return;

        if (productSnap.exists()) {
          setProduct(productSnap.data() as Product);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error loading product:", error);

        if (active) {
          setProduct(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    if (id) {
      loadProduct();
    } else {
      setLoading(false);
    }

    return () => {
      active = false;
    };
  }, [id]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen overflow-hidden bg-[#f2f7dc] px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-7xl">
          {/* Top skeleton */}
          <div className="mb-8 flex items-center justify-between">
            <div className="h-10 w-28 animate-pulse rounded-full bg-emerald-950/10" />

            <div className="hidden h-9 w-40 animate-pulse rounded-full bg-emerald-950/10 sm:block" />
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
            {/* Gallery skeleton */}
            <div className="overflow-hidden rounded-[2rem] border border-emerald-950/8 bg-white p-3 shadow-sm">
              <div className="aspect-square animate-pulse rounded-[1.5rem] bg-emerald-950/5" />
            </div>

            {/* Information skeleton */}
            <div className="rounded-[2rem] border border-emerald-950/8 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex gap-2">
                <div className="h-8 w-24 animate-pulse rounded-full bg-emerald-950/5" />
                <div className="h-8 w-20 animate-pulse rounded-full bg-emerald-950/5" />
              </div>

              <div className="mt-7 space-y-3">
                <div className="h-10 w-5/6 animate-pulse rounded-xl bg-emerald-950/5" />
                <div className="h-10 w-2/3 animate-pulse rounded-xl bg-emerald-950/5" />
              </div>

              <div className="mt-7 h-28 animate-pulse rounded-[1.5rem] bg-emerald-950/5" />

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="h-28 animate-pulse rounded-[1.35rem] bg-emerald-950/5" />
                <div className="h-28 animate-pulse rounded-[1.35rem] bg-emerald-950/5" />
              </div>

              <div className="mt-4 h-40 animate-pulse rounded-[1.5rem] bg-emerald-950/5" />

              <div className="mt-7 h-52 animate-pulse rounded-[1.6rem] bg-emerald-950/5" />

              <div className="mt-7 space-y-3">
                <div className="h-16 animate-pulse rounded-[1.3rem] bg-emerald-950/5" />
                <div className="h-16 animate-pulse rounded-[1.3rem] bg-emerald-950/5" />
                <div className="h-16 animate-pulse rounded-[1.3rem] bg-emerald-950/5" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // PRODUCT NOT FOUND
  // ==========================================

  if (!product) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f2f7dc] px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#d4e84a]/20 blur-3xl" />

          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md rounded-[2rem] border border-emerald-950/10 bg-white p-8 text-center shadow-[0_25px_70px_rgba(10,61,46,0.10)] sm:p-10"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0a3d2e] text-[#d4e84a] shadow-lg">
            <Sparkles size={26} />
          </div>

          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-950/35">
            DealDone
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#0a3d2e]">
            Product Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-emerald-950/50">
            This listing may have been removed or is no longer available.
          </p>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#0a3d2e] px-6 py-3 text-sm font-bold text-[#f2f7dc] shadow-[0_10px_25px_rgba(10,61,46,0.12)] transition hover:-translate-y-0.5 hover:bg-emerald-900"
          >
            <ArrowLeft size={17} />
            Go Back
          </button>
        </motion.div>
      </main>
    );
  }

  // ==========================================
  // PRODUCT PAGE
  // ==========================================

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f2f7dc]">
      {/* ======================================
          BACKGROUND ATMOSPHERE
      ======================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -15, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#d4e84a]/15 blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -18, 0],
            y: [0, 18, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 top-[35%] h-[30rem] w-[30rem] rounded-full bg-emerald-200/30 blur-3xl"
        />

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/50 blur-3xl"
        />
      </div>

      {/* ======================================
          MAIN CONTAINER
      ======================================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10 lg:px-8">
        {/* =====================================
            TOP BAR
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 flex items-center justify-between sm:mb-9"
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="group inline-flex items-center gap-2 rounded-full border border-emerald-950/10 bg-white/85 px-4 py-2.5 text-sm font-semibold text-[#0a3d2e] shadow-sm backdrop-blur transition hover:-translate-x-0.5 hover:bg-white hover:shadow-md"
          >
            <ArrowLeft
              size={17}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />

            <span>Back</span>
          </button>

          <div className="hidden items-center gap-2 rounded-full border border-emerald-950/10 bg-white/75 px-4 py-2.5 text-xs font-semibold text-emerald-950/55 shadow-sm backdrop-blur sm:flex">
            <ShieldCheck
              size={15}
              className="text-emerald-700"
            />

            Shop with confidence
          </div>
        </motion.div>

        {/* =====================================
            PRODUCT AREA
        ====================================== */}

        <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          {/* ===================================
              LEFT — GALLERY
          ==================================== */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="min-w-0"
          >
            <div className="overflow-hidden rounded-[2rem] border border-emerald-950/10 bg-white p-2 shadow-[0_25px_80px_rgba(10,61,46,0.10)] sm:p-3">
              <ProductGallery
                name={product.name}
                image={product.image}
                images={product.images}
              />
            </div>

            {/* Small confidence strip */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.35,
              }}
              className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-950/8 bg-white/75 px-4 py-3.5 backdrop-blur"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0a3d2e] text-[#d4e84a]">
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold text-[#0a3d2e]">
                  Review before you deal
                </p>

                <p className="mt-0.5 text-xs leading-5 text-emerald-950/45">
                  Check the item details and contact the seller directly.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ===================================
              RIGHT — PRODUCT INFORMATION
          ==================================== */}

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="min-w-0"
          >
            <div className="rounded-[2rem] border border-emerald-950/10 bg-white/92 p-5 shadow-[0_25px_80px_rgba(10,61,46,0.08)] backdrop-blur-xl sm:p-7 lg:p-8">
              {/* PRODUCT INFO */}

              <ProductInfo
                name={product.name}
                price={product.price}
                category={product.category}
                condition={product.condition}
                location={product.location}
                description={product.description}
              />

              {/* =====================================
                  DIVIDER
              ====================================== */}

              <div className="my-7 h-px bg-emerald-950/8" />

              {/* =====================================
                  SELLER
              ====================================== */}

              <SellerCard
                sellerName={product.sellerName || "Seller"}
                phone={product.phone}
                location={product.location}
                sellerId={product.sellerId}
              />

              {/* =====================================
                  ACTIONS
              ====================================== */}

              <div className="mt-7">
                <ActionButtons
                  phone={product.phone}
                  productId={id}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================
            DEAL FLOW
        ====================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.65,
          }}
          className="relative mt-12 overflow-hidden rounded-[2rem] border border-[#0a3d2e] bg-[#0a3d2e] px-6 py-8 shadow-[0_25px_70px_rgba(10,61,46,0.14)] sm:px-8 sm:py-9"
        >
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#d4e84a]/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#d4e84a]" />

                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#d4e84a]/75">
                  DealDone
                </p>
              </div>

              <h2 className="mt-3 text-2xl font-black tracking-tight text-[#f2f7dc] sm:text-3xl">
                Find it. Talk about it. Make the deal.
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#f2f7dc]/55">
                Review the listing, connect with the seller, ask your
                questions, and decide when you&apos;re ready.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {product.category && (
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-[#f2f7dc]/70 backdrop-blur">
                  {product.category}
                </span>
              )}

              {product.condition && (
                <span className="rounded-full bg-[#d4e84a] px-4 py-2 text-xs font-bold text-[#0a3d2e]">
                  {product.condition}
                </span>
              )}
            </div>
          </div>
        </motion.section>

        {/* =====================================
            RELATED PRODUCTS
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mt-16 sm:mt-20"
        >
          <RelatedProducts
            productId={id}
            category={product.category}
          />
        </motion.div>
      </div>
    </main>
  );
}