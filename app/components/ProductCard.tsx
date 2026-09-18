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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        group
        relative
        overflow-hidden
        rounded-3xl
        bg-zinc-900
        border
        border-zinc-800
        hover:border-purple-500/60
        shadow-lg
        hover:shadow-[0_20px_60px_rgba(139,92,246,0.18)]
        transition-all
        duration-500
      "
    >

      {/* Animated glow */}
      <div
        className="
          pointer-events-none
          absolute
          -top-24
          -right-24
          w-48
          h-48
          rounded-full
          bg-purple-600/10
          blur-3xl
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-500
        "
      />

      {/* Wishlist */}
      <button
        type="button"
        aria-label="Add to wishlist"
        onClick={(e) => e.preventDefault()}
        className="
          absolute
          top-4
          right-4
          z-20
          w-11
          h-11
          flex
          items-center
          justify-center
          rounded-full
          bg-black/50
          backdrop-blur-md
          border
          border-white/10
          text-white
          hover:bg-purple-600
          hover:border-purple-400
          hover:scale-110
          transition-all
          duration-300
        "
      >
        <Heart size={19} />
      </button>

      {/* Product Image */}
      <Link href={`/product/${id}`}>
        <div className="relative h-64 overflow-hidden bg-zinc-800">

          {image ? (
            <img
              src={image}
              alt={name}
              className="
                w-full
                h-full
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-105
              "
            />
          ) : (
            <div
              className="
                w-full
                h-full
                flex
                flex-col
                items-center
                justify-center
                text-zinc-500
              "
            >
              <ImageOff size={36} />
              <span className="mt-2 text-sm">
                No image available
              </span>
            </div>
          )}

          {/* Bottom image gradient */}
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-24
              bg-gradient-to-t
              from-black/60
              to-transparent
              pointer-events-none
            "
          />

          {/* View icon */}
          <div
            className="
              absolute
              bottom-4
              right-4
              w-10
              h-10
              rounded-full
              bg-black/50
              backdrop-blur-md
              border
              border-white/10
              flex
              items-center
              justify-center
              text-white
              opacity-0
              translate-y-3
              group-hover:opacity-100
              group-hover:translate-y-0
              transition-all
              duration-300
            "
          >
            <ArrowUpRight size={19} />
          </div>
        </div>
      </Link>

      {/* Product Details */}
      <div className="relative p-5">

        {/* Product name */}
        <Link href={`/product/${id}`}>
          <h3
            className="
              text-xl
              font-bold
              text-white
              line-clamp-1
              hover:text-purple-400
              transition-colors
            "
          >
            {name}
          </h3>
        </Link>

        {/* Price */}
        <p className="mt-3 text-2xl font-extrabold text-purple-400">
          {price}
        </p>

        {/* Divider */}
        <div className="my-5 h-px bg-zinc-800" />

        {/* View Deal */}
        <Link href={`/product/${id}`}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-zinc-800
              border
              border-zinc-700
              py-3
              font-semibold
              text-white
              hover:bg-purple-600
              hover:border-purple-500
              transition-all
              duration-300
            "
          >
            View Deal
            <ArrowUpRight size={18} />
          </motion.div>
        </Link>

      </div>
    </motion.div>
  );
}