
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ArrowUpRight, ImageOff } from "lucide-react";

type ProductCardProps = {
  id: string;
  name: string;
  price: string;
  image?: string;
};

export default function ProductCard({
  id,
  name,
  price,
  image,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative min-w-0 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-sm transition-colors hover:border-purple-500/50 sm:rounded-3xl sm:shadow-lg"
    >
      {/* Wishlist */}
      <button
        type="button"
        aria-label="Add to wishlist"
        onClick={(e) => e.preventDefault()}
        className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-purple-600 sm:right-3 sm:top-3 sm:h-10 sm:w-10"
      >
        <Heart size={16} />
      </button>

      {/* Product Image */}
      <Link href={`/product/${id}`} className="block">
        <div className="relative h-[135px] overflow-hidden bg-zinc-800 sm:h-56 md:h-64">
          {image ? (
            <img
              src={image}
              alt={name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-zinc-500">
              <ImageOff size={25} />
              <span className="mt-1 text-xs">No image</span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </Link>

      {/* Product Details */}
      <div className="min-w-0 p-2.5 sm:p-4 md:p-5">
        <Link href={`/product/${id}`}>
          <h3 className="line-clamp-2 min-h-[34px] text-xs font-semibold leading-4 text-white transition-colors hover:text-purple-400 sm:min-h-0 sm:text-base sm:leading-6">
            {name}
          </h3>
        </Link>

        <p className="mt-2 truncate text-base font-extrabold text-purple-400 sm:mt-3 sm:text-xl md:text-2xl">
          {price}
        </p>

        <div className="my-2.5 h-px bg-zinc-800 sm:my-4" />

        <Link href={`/product/${id}`} className="block">
          <motion.div
            whileTap={{ scale: 0.97 }}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-zinc-700 bg-zinc-800 py-2 text-xs font-semibold text-white transition-colors hover:border-purple-500 hover:bg-purple-600 sm:gap-2 sm:rounded-xl sm:py-3 sm:text-sm"
          >
            View Deal
            <ArrowUpRight size={14} />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
