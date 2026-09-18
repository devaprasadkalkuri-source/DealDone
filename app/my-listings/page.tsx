"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

import ProductCard from "@/app/components/ProductCard";

import {
  AlertTriangle,
  ArrowUpRight,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export default function MyListingsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Delete modal state
  const [productToDelete, setProductToDelete] =
    useState<Product | null>(null);

  const [isDeleting, setIsDeleting] =
    useState(false);

  // ==========================================
  // LOAD USER LISTINGS
  // ==========================================

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) {
          setLoading(false);
          return;
        }

        try {
          const q = query(
            collection(db, "products"),
            where("sellerId", "==", user.uid)
          );

          const snapshot = await getDocs(q);

          const myProducts = snapshot.docs.map(
            (productDoc) => ({
              id: productDoc.id,
              ...(productDoc.data() as Omit<
                Product,
                "id"
              >),
            })
          );

          setProducts(myProducts);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // ==========================================
  // OPEN DELETE MODAL
  // ==========================================

  const openDeleteModal = (
    product: Product
  ) => {
    setProductToDelete(product);
  };

  // ==========================================
  // CLOSE DELETE MODAL
  // ==========================================

  const closeDeleteModal = () => {
    if (isDeleting) return;

    setProductToDelete(null);
  };

  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      setIsDeleting(true);

      await deleteDoc(
        doc(
          db,
          "products",
          productToDelete.id
        )
      );

      setProducts((prev) =>
        prev.filter(
          (product) =>
            product.id !==
            productToDelete.id
        )
      );

      setProductToDelete(null);
    } catch (error) {
      console.error(error);

      alert(
        "❌ Failed to delete product. Please try again."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090304] text-white">
        <div className="flex flex-col items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <Loader2
              size={24}
              className="animate-spin text-[#ff3048]"
            />
          </div>

          <p className="text-sm font-semibold text-white/40">
            Loading your listings...
          </p>

        </div>
      </main>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090304] text-white">

      {/* ======================================
          BACKGROUND
      ======================================= */}

      <div className="pointer-events-none fixed inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#4d0710_0%,#210407_35%,#090304_75%)]" />

        <motion.div
          animate={{
            x: [0, 35, -20, 0],
            y: [0, -20, 25, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-[20rem] -top-[15rem] h-[48rem] w-[48rem] rounded-full bg-[#b20b1d]/25 blur-[110px]"
        />

        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 25, -15, 0],
            scale: [1, 0.95, 1.08, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-[18rem] top-[20rem] h-[42rem] w-[42rem] rounded-full bg-[#ff172f]/20 blur-[110px]"
        />

        <div className="absolute left-[20%] top-[25%] h-[30rem] w-[30rem] rounded-full bg-black/40 blur-[100px]" />

        <div className="absolute inset-0 opacity-[0.03] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 180 180%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.55%22/%3E%3C/svg%3E')]" />

      </div>

      {/* ======================================
          CONTENT
      ======================================= */}

      <div className="relative z-10 px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">

        <div className="mx-auto max-w-7xl">

          {/* ==================================
              HEADER
          ================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="mb-10"
          >

            <div className="mb-6 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-xs font-black backdrop-blur-xl">
                  D
                </div>

                <span className="text-xs font-bold tracking-[0.18em] text-white/45">
                  DEALDONE
                </span>

              </div>

              <span className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-white/20 sm:block">
                Your marketplace
              </span>

            </div>

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

              <div>

                <div className="mb-4 flex items-center gap-3">

                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff3048]">
                    Dashboard
                  </span>

                  <span className="h-px w-10 bg-[#ff3048]/40" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/25">
                    Listings
                  </span>

                </div>

                <h1 className="text-5xl font-black leading-none tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                  MY{" "}
                  <span className="text-white/25">
                    LISTINGS.
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-sm leading-6 text-white/35 sm:text-base">
                  Manage the products you&apos;ve
                  published on DealDone.
                </p>

              </div>

              {/* Listing count */}

              <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff3048]/10 text-[#ff3048]">
                  <span className="text-sm font-black">
                    {products.length}
                  </span>
                </div>

                <div>

                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/25">
                    Active
                  </p>

                  <p className="mt-1 text-sm font-bold text-white/70">
                    {products.length === 1
                      ? "Listing"
                      : "Listings"}
                  </p>

                </div>

              </div>

            </div>

          </motion.div>

          {/* ==================================
              EMPTY STATE
          ================================== */}

          {products.length === 0 ? (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] px-6 py-24 text-center shadow-[0_35px_100px_rgba(0,0,0,0.35)] backdrop-blur-[30px] sm:px-10"
            >

              <div className="pointer-events-none absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-[#ff3048]/10 blur-[90px]" />

              <div className="relative z-10 mx-auto max-w-md">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/25">
                  <PackageIcon />
                </div>

                <h2 className="mt-6 text-3xl font-black tracking-tight">
                  No Products Found
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/35">
                  You haven&apos;t posted any
                  products yet.
                </p>

                <Link
                  href="/sell"
                  className="group mx-auto mt-7 flex w-fit items-center gap-3 rounded-2xl bg-[#ff3048] px-5 py-3.5 text-sm font-black text-white shadow-[0_15px_45px_rgba(255,48,72,0.15)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#ff4158]"
                >
                  Sell something
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>

              </div>

            </motion.div>
          ) : (

            /* ==================================
               PRODUCTS
            ================================== */

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {products.map(
                (product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay:
                        index * 0.06,
                    }}
                    className="min-w-0"
                  >

                    {/* Product */}

                    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-2 shadow-[0_25px_70px_rgba(0,0,0,0.3)] backdrop-blur-xl">

                      <ProductCard
                        id={product.id}
                        name={product.name}
                        price={`₹${product.price.toLocaleString()}`}
                        image={product.image}
                      />

                      {/* Actions */}

                      <div className="grid grid-cols-2 gap-2 p-1 pt-3">

                        <Link
                          href={`/edit-product/${product.id}`}
                          className="group flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-bold text-white/65 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white"
                        >

                          <span>
                            ✏️
                          </span>

                          Edit

                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            openDeleteModal(
                              product
                            )
                          }
                          className="group flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#ff3048]/20 bg-[#ff3048]/[0.07] px-3 text-xs font-bold text-[#ff6a7a] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ff3048]/40 hover:bg-[#ff3048]/15 hover:text-white"
                        >

                          <Trash2
                            size={14}
                            className="transition-transform duration-300 group-hover:scale-110"
                          />

                          Delete

                        </button>

                      </div>

                    </div>

                  </motion.div>
                )
              )}

            </div>

          )}

        </div>

      </div>

      {/* ======================================
          DELETE CONFIRMATION MODAL
      ======================================= */}

      <AnimatePresence>

        {productToDelete && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-md"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeDeleteModal();
              }
            }}
          >

            <motion.div
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 15,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/[0.16] bg-[#140608]/90 shadow-[0_40px_120px_rgba(0,0,0,0.7)] backdrop-blur-[35px]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-modal-title"
            >

              {/* Modal glow */}

              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#ff3048]/15 blur-[80px]" />

              <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#9d071b]/15 blur-[80px]" />

              {/* Close */}

              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/35 transition-all hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Close delete confirmation"
              >
                <X size={17} />
              </button>

              <div className="relative z-10 p-6 sm:p-8">

                {/* Warning icon */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#ff3048]/20 bg-[#ff3048]/10 text-[#ff3048] shadow-[0_0_40px_rgba(255,48,72,0.08)]">

                  <AlertTriangle
                    size={25}
                  />

                </div>

                {/* Heading */}

                <div className="mt-6">

                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ff3048]">
                    Delete listing
                  </p>

                  <h2
                    id="delete-modal-title"
                    className="mt-2 pr-8 text-3xl font-black leading-tight tracking-tight text-white"
                  >
                    Remove this product?
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-white/40">
                    This action will permanently
                    remove this listing from
                    DealDone. You won&apos;t be able
                    to recover it.
                  </p>

                </div>

                {/* Product preview */}

                <div className="mt-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-3">

                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">

                    {productToDelete.image ? (
                      <img
                        src={
                          productToDelete.image
                        }
                        alt={
                          productToDelete.name
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-white/20">
                        <PackageIcon />
                      </div>
                    )}

                  </div>

                  <div className="min-w-0">

                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-white/25">
                      Listing
                    </p>

                    <p className="mt-1 truncate text-base font-black text-white/85">
                      {productToDelete.name}
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#ff5267]">
                      ₹
                      {productToDelete.price.toLocaleString()}
                    </p>

                  </div>

                </div>

                {/* Buttons */}

                <div className="mt-7 grid grid-cols-2 gap-3">

                  <button
                    type="button"
                    onClick={
                      closeDeleteModal
                    }
                    disabled={isDeleting}
                    className="min-h-[50px] rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-bold text-white/65 transition-all duration-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleDelete
                    }
                    disabled={isDeleting}
                    className="flex min-h-[50px] items-center justify-center gap-2 rounded-2xl bg-[#ff3048] px-4 text-sm font-black text-white shadow-[0_15px_45px_rgba(255,48,72,0.16)] transition-all duration-300 hover:bg-[#ff4158] hover:shadow-[0_20px_55px_rgba(255,48,72,0.24)] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {isDeleting ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2
                          size={16}
                        />
                        Delete
                      </>
                    )}

                  </button>

                </div>

                <p className="mt-5 text-center text-[9px] font-bold uppercase tracking-[0.14em] text-white/15">
                  This cannot be undone
                </p>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </main>
  );
}

// ==========================================
// EMPTY STATE ICON
// ==========================================

function PackageIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m16.5 9.4-9-5.19" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}