
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
    <div
      className="
        -mx-3
        overflow-x-auto
        px-3
        pb-1
        sm:mx-0
        sm:overflow-visible
        sm:px-0
      "
      style={{ scrollbarWidth: "none" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="
          flex
          w-max
          items-center
          gap-2
          sm:w-full
          sm:flex-wrap
          sm:gap-3
          lg:justify-center
        "
      >
        {categories.map((category) => {
          const active = selectedCategory === category;

          return (
            <motion.button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              whileTap={{ scale: 0.96 }}
              className={`
                relative
                shrink-0
                overflow-hidden
                rounded-full
                px-4
                py-2.5
                text-xs
                font-semibold
                transition-colors
                duration-200
                sm:px-6
                sm:py-3
                sm:text-sm
                ${
                  active
                    ? "bg-purple-600 text-white shadow-[0_0_18px_rgba(147,51,234,0.25)]"
                    : "border border-white/10 bg-white/[0.04] text-zinc-400 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-purple-300"
                }
              `}
            >
              {active && (
                <motion.span
                  layoutId="category-highlight"
                  className="absolute inset-0 rounded-full bg-purple-600"
                  transition={{ duration: 0.2 }}
                />
              )}

              <span className="relative z-10">{category}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
