"use client";

import { motion } from "framer-motion";

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Vehicles",
  "Furniture",
  "Books",
];

interface Props {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="
        flex
        flex-wrap
        items-center
        justify-center
        gap-3
      "
    >
      {categories.map((category) => {
        const active = selectedCategory === category;

        return (
          <motion.button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            whileHover={{
              y: -3,
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.96,
            }}
            className={`
              relative
              overflow-hidden
              rounded-full
              px-6
              py-3
              text-sm
              font-semibold
              transition-all
              duration-300
              ${
                active
                  ? "bg-purple-600 text-white shadow-[0_0_25px_rgba(147,51,234,0.35)]"
                  : "border border-white/10 bg-white/[0.04] text-zinc-400 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-300"
              }
            `}
          >
            {/* Active shine */}
            {active && (
              <motion.span
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  inset-y-0
                  w-12
                  rotate-12
                  bg-white/10
                  blur-md
                "
              />
            )}

            <span className="relative z-10">
              {category}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}