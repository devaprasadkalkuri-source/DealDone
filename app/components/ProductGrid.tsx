
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  MapPin,
  Tag,
  RotateCcw,
  IndianRupee,
  Check,
} from "lucide-react";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  description?: string;
  image?: string;
  location?: string;
  condition?: string;
}

const CONDITIONS = ["All", "Like New", "Good", "Fair", "Used"];

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");
  const urlSearch = searchParams.get("search");

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [location, setLocation] = useState("");
  const [condition, setCondition] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedCategory(urlCategory || "All");
    if (urlSearch !== null) setSearch(urlSearch);
  }, [urlCategory, urlSearch]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));
        setProducts(list);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const searchText = search.toLowerCase().trim();
    const locationText = location.toLowerCase().trim();
    const minimum = minPrice.trim() ? Number(minPrice) : null;
    const maximum = maxPrice.trim() ? Number(maxPrice) : null;

    return products.filter((product) => {
      const name = product.name?.toLowerCase() || "";
      const category = product.category?.toLowerCase() || "";
      const description = product.description?.toLowerCase() || "";
      const productLocation = product.location?.toLowerCase() || "";
      const productCondition = product.condition?.toLowerCase() || "";
      const price = Number(product.price || 0);

      const matchesSearch =
        !searchText ||
        name.includes(searchText) ||
        category.includes(searchText) ||
        description.includes(searchText) ||
        productLocation.includes(searchText);

      const matchesCategory =
        selectedCategory === "All" ||
        category === selectedCategory.toLowerCase();

      const matchesMin =
        minimum === null ||
        (Number.isFinite(minimum) && price >= minimum);

      const matchesMax =
        maximum === null ||
        (Number.isFinite(maximum) && price <= maximum);

      const matchesLocation =
        !locationText || productLocation.includes(locationText);

      const matchesCondition =
        condition === "All" ||
        productCondition === condition.toLowerCase();

      return (
        matchesSearch &&
        matchesCategory &&
        matchesMin &&
        matchesMax &&
        matchesLocation &&
        matchesCondition
      );
    });
  }, [
    products,
    search,
    selectedCategory,
    minPrice,
    maxPrice,
    location,
    condition,
  ]);

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0) +
    (location.trim() ? 1 : 0) +
    (condition !== "All" ? 1 : 0);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setLocation("");
    setCondition("All");
  };

  const hasPriceError =
    minPrice !== "" &&
    maxPrice !== "" &&
    Number.isFinite(Number(minPrice)) &&
    Number.isFinite(Number(maxPrice)) &&
    Number(minPrice) > Number(maxPrice);

  if (loading) {
    return (
      <section className="min-h-[45vh] bg-[#08060d] px-3 py-5 pb-28 sm:px-6 sm:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5 space-y-3">
            <div className="h-4 w-28 animate-pulse rounded bg-white/10" />
            <div className="h-8 w-52 animate-pulse rounded bg-white/10" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]"
              >
                <div className="h-[135px] animate-pulse bg-white/[0.06] sm:h-56" />
                <div className="space-y-3 p-3 sm:p-5">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
                  <div className="h-5 w-1/2 animate-pulse rounded bg-white/10" />
                  <div className="h-8 animate-pulse rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#08060d] px-3 py-5 pb-28 sm:px-6 sm:py-12 sm:pb-16">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:60px_60px]" />
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-purple-600/15 blur-[100px] sm:h-[450px] sm:w-[450px]" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-orange-500/10 blur-[100px] sm:h-[450px] sm:w-[450px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 sm:mb-10"
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-[10px] font-semibold text-purple-300 sm:mb-5 sm:px-4 sm:py-2 sm:text-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
            DealDone Marketplace
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Explore{" "}
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
              real deals.
            </span>
          </h1>

          <p className="mt-2 text-xs text-zinc-400 sm:mt-4 sm:text-lg">
            Browse products listed by people on DealDone.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="mb-3 flex gap-2 sm:mb-6 sm:flex-row sm:gap-4">
          <div className="relative min-w-0 flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 sm:left-5 sm:h-5 sm:w-5"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-9 pr-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-purple-500/50 sm:rounded-2xl sm:py-4 sm:pl-14 sm:pr-5 sm:text-base"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-3 text-xs font-semibold text-white sm:rounded-2xl sm:px-5 sm:py-4 sm:text-sm"
          >
            <SlidersHorizontal size={16} className="text-purple-400" />
            Filters
            {activeFilterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-purple-500 px-1 text-[10px]">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Result count */}
        <div className="mb-3 flex items-center justify-between text-xs text-zinc-500 sm:mb-5 sm:text-sm">
          <span>
            Showing{" "}
            <strong className="text-white">{filteredProducts.length}</strong>{" "}
            {filteredProducts.length === 1 ? "listing" : "listings"}
          </span>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-1.5 font-semibold text-purple-300"
            >
              <RotateCcw size={13} />
              Clear filters
            </button>
          )}
        </div>

        {/* Categories */}
        <div className="mb-4 sm:mb-6">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Active filters */}
        {activeFilterCount > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2 sm:mb-6">
            {selectedCategory !== "All" && (
              <button
                onClick={() => setSelectedCategory("All")}
                className="rounded-full border border-purple-400/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-300"
              >
                {selectedCategory} ×
              </button>
            )}
            {minPrice && (
              <button
                onClick={() => setMinPrice("")}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300"
              >
                Min ₹{Number(minPrice).toLocaleString("en-IN")} ×
              </button>
            )}
            {maxPrice && (
              <button
                onClick={() => setMaxPrice("")}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300"
              >
                Max ₹{Number(maxPrice).toLocaleString("en-IN")} ×
              </button>
            )}
            {location && (
              <button
                onClick={() => setLocation("")}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300"
              >
                {location} ×
              </button>
            )}
            {condition !== "All" && (
              <button
                onClick={() => setCondition("All")}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300"
              >
                {condition} ×
              </button>
            )}
          </div>
        )}

        {/* Filter Sheet */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-5"
              onMouseDown={(e) => {
                if (e.target === e.currentTarget) setIsFilterOpen(false);
              }}
            >
              <motion.div
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                exit={{ y: 40 }}
                className="max-h-[85dvh] w-full overflow-y-auto rounded-t-3xl border border-white/10 bg-[#100d16] p-4 pb-[calc(16px+env(safe-area-inset-bottom))] sm:max-w-lg sm:rounded-3xl sm:p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400">
                      Refine results
                    </p>
                    <h2 className="text-xl font-black text-white">Filters</h2>
                  </div>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-zinc-300"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-zinc-300">
                      <Tag size={15} className="text-purple-400" />
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#100d16] px-3 py-3 text-sm text-white outline-none"
                    >
                      <option value="All">All Categories</option>
                      {Array.from(
                        new Set(products.map((p) => p.category).filter(Boolean))
                      )
                        .sort((a, b) => String(a).localeCompare(String(b)))
                        .map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-zinc-300">
                      <IndianRupee size={15} className="text-purple-400" />
                      Price range
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        min="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Minimum"
                        className="min-w-0 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 text-sm text-white outline-none"
                      />
                      <input
                        type="number"
                        min="0"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Maximum"
                        className="min-w-0 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 text-sm text-white outline-none"
                      />
                    </div>
                    {hasPriceError && (
                      <p className="mt-2 text-xs text-red-400">
                        Maximum price must be greater than minimum price.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-zinc-300">
                      <MapPin size={15} className="text-purple-400" />
                      Location
                    </label>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City or area..."
                      className="w-full rounded-xl border border-white/10 bg-white/[0.035] px-3 py-3 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold text-zinc-300">
                      Condition
                    </label>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                      {CONDITIONS.map((item) => (
                        <button
                          key={item}
                          onClick={() => setCondition(item)}
                          className={`rounded-lg border px-2 py-2.5 text-xs font-semibold ${
                            condition === item
                              ? "border-purple-400/40 bg-purple-500/15 text-purple-300"
                              : "border-white/10 bg-white/[0.035] text-zinc-400"
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <button
                    onClick={clearFilters}
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-bold text-zinc-300"
                  >
                    <RotateCcw size={15} />
                    Clear
                  </button>
                  <button
                    onClick={() => setIsFilterOpen(false)}
                    disabled={hasPriceError}
                    className="flex items-center justify-center gap-2 rounded-xl bg-purple-500 py-3 text-sm font-bold text-white disabled:opacity-40"
                  >
                    <Check size={15} />
                    Show {filteredProducts.length}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.2) }}
                className="min-w-0"
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={`₹${Number(product.price || 0).toLocaleString("en-IN")}`}
                  image={product.image}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.025] px-4 text-center sm:min-h-[350px] sm:rounded-[32px] sm:px-6"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-purple-300 sm:mb-6 sm:h-16 sm:w-16 sm:rounded-2xl">
              <Search size={23} />
            </div>
            <h3 className="text-lg font-bold text-white sm:text-2xl">
              No listings found
            </h3>
            <p className="mt-2 max-w-md text-xs text-zinc-500 sm:mt-3 sm:text-sm">
              {selectedCategory !== "All"
                ? `There are currently no ${selectedCategory} listings matching your filters.`
                : "Try changing your search or filters to find more products."}
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 rounded-full border border-purple-400/30 bg-purple-500/10 px-5 py-2.5 text-sm font-semibold text-purple-300 hover:bg-purple-500 hover:text-white sm:mt-7 sm:px-6 sm:py-3"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
