"use client";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  /* =========================================================
     READ FILTERS FROM URL
  ========================================================= */
  useEffect(() => {
    setSelectedCategory(urlCategory || "All");
    if (urlSearch !== null) {
      setSearch(urlSearch);
    }
  }, [urlCategory, urlSearch]);
  /* =========================================================
     LOAD REAL FIREBASE PRODUCTS
  ========================================================= */
  useEffect(() => {
    async function fetchProducts() {
      try {
        const querySnapshot = await getDocs(
          collection(db, "products")
        );
        const productList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...(data as Omit<Product, "id">),
          };
        });
        setProducts(productList);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
  /* =========================================================
     FILTER PRODUCTS
  ========================================================= */
  const filteredProducts = useMemo(() => {
    const searchText = search.toLowerCase().trim();
    const locationText = location.toLowerCase().trim();
    const minimum =
      minPrice.trim() !== "" ? Number(minPrice) : null;
    const maximum =
      maxPrice.trim() !== "" ? Number(maxPrice) : null;
    return products.filter((product) => {
      const productName =
        product.name?.toLowerCase() || "";
      const productCategory =
        product.category?.toLowerCase() || "";
      const productDescription =
        product.description?.toLowerCase() || "";
      const productLocation =
        product.location?.toLowerCase() || "";
      const productCondition =
        product.condition?.toLowerCase() || "";
      /* SEARCH */
      const matchesSearch =
        !searchText ||
        productName.includes(searchText) ||
        productCategory.includes(searchText) ||
        productDescription.includes(searchText) ||
        productLocation.includes(searchText);
      /* CATEGORY */
      const matchesCategory =
        selectedCategory === "All" ||
        productCategory ===
          selectedCategory.toLowerCase();
      /* PRICE */
      const productPrice = Number(product.price || 0);
      const matchesMinPrice =
        minimum === null ||
        (Number.isFinite(minimum) &&
          productPrice >= minimum);
      const matchesMaxPrice =
        maximum === null ||
        (Number.isFinite(maximum) &&
          productPrice <= maximum);
      /* LOCATION */
      const matchesLocation =
        !locationText ||
        productLocation.includes(locationText);
      /* CONDITION */
      const matchesCondition =
        condition === "All" ||
        productCondition === condition.toLowerCase();
      return (
        matchesSearch &&
        matchesCategory &&
        matchesMinPrice &&
        matchesMaxPrice &&
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
  /* =========================================================
     ACTIVE FILTER COUNT
  ========================================================= */
  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0) +
    (location.trim() ? 1 : 0) +
    (condition !== "All" ? 1 : 0);
  /* =========================================================
     CLEAR FILTERS
  ========================================================= */
  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setMinPrice("");
    setMaxPrice("");
    setLocation("");
    setCondition("All");
  };
  /* =========================================================
     PRICE VALIDATION
  ========================================================= */
  const hasPriceError =
    minPrice !== "" &&
    maxPrice !== "" &&
    Number.isFinite(Number(minPrice)) &&
    Number.isFinite(Number(maxPrice)) &&
    Number(minPrice) > Number(maxPrice);
  /* =========================================================
     LOADING
  ========================================================= */
  if (loading) {
    return (
      <section className="relative min-h-[70vh] overflow-hidden bg-[#08060d] px-6 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div
            className="
              absolute inset-0
              opacity-[0.05]
              [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
              [background-size:60px_60px]
            "
          />
          <div
            className="
              absolute
              -left-40
              top-20
              h-96
              w-96
              rounded-full
              bg-purple-600/20
              blur-[120px]
            "
          />
          <div
            className="
              absolute
              -right-40
              bottom-0
              h-96
              w-96
              rounded-full
              bg-orange-500/10
              blur-[120px]
            "
          />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12">
            <div className="h-6 w-40 animate-pulse rounded-full bg-white/10" />
            <div className="mt-6 h-14 w-96 max-w-full animate-pulse rounded-xl bg-white/10" />
            <div className="mt-4 h-5 w-80 max-w-full animate-pulse rounded-lg bg-white/10" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.035]
                "
              >
                <div className="h-64 animate-pulse bg-white/[0.06]" />
                <div className="space-y-4 p-6">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-white/10" />
                  <div className="h-8 w-1/2 animate-pulse rounded bg-white/10" />
                  <div className="h-10 w-full animate-pulse rounded-xl bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  /* =========================================================
     MAIN
  ========================================================= */
  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#08060d]
        px-4
        py-20
        sm:px-6
        sm:py-24
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute inset-0
            opacity-[0.05]
            [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
            [background-size:60px_60px]
          "
        />
        {/* Purple glow */}
        <motion.div
          animate={{
            x: [0, 100, -70, 0],
            y: [0, -60, 70, 0],
            scale: [1, 1.15, 0.95, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-48
            top-20
            h-[450px]
            w-[450px]
            rounded-full
            bg-purple-600/20
            blur-[130px]
          "
        />
        {/* Orange glow */}
        <motion.div
          animate={{
            x: [0, -80, 70, 0],
            y: [0, 70, -50, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -right-48
            bottom-0
            h-[450px]
            w-[450px]
            rounded-full
            bg-orange-500/10
            blur-[130px]
          "
        />
        {/* Center glow */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-64
            w-64
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-fuchsia-500/20
            blur-[110px]
          "
        />
      </div>
      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ===================================================
            HEADER
        =================================================== */}
        <motion.div
          initial={{
            opacity: 0,
            y: 35,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mb-10"
        >
          <div
            className="
              mb-5
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-purple-500/30
              bg-purple-500/10
              px-4
              py-2
              text-sm
              font-semibold
              text-purple-300
              backdrop-blur-xl
            "
          >
            <span
              className="
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-purple-400
              "
            />
            DealDone Marketplace
          </div>
          <h1
            className="
              text-4xl
              font-black
              tracking-tight
              text-white
              sm:text-5xl
              md:text-6xl
            "
          >
            Explore{" "}
            <span
              className="
                bg-gradient-to-r
                from-purple-400
                via-fuchsia-400
                to-orange-400
                bg-clip-text
                text-transparent
              "
            >
              real deals.
            </span>
          </h1>
          <p
            className="
              mt-4
              max-w-2xl
              text-base
              text-zinc-400
              sm:text-lg
            "
          >
            Browse products listed by people on DealDone.
          </p>
        </motion.div>
        {/* ===================================================
            SEARCH + FILTER BUTTON
        =================================================== */}
        <div
          className="
            mb-6
            flex
            flex-col
            gap-4
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Search */}
          <div className="relative w-full lg:max-w-2xl">
            <Search
              size={21}
              className="
                absolute
                left-5
                top-1/2
                -translate-y-1/2
                text-zinc-500
              "
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, categories, descriptions..."
              className="
                w-full
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                px-14
                py-4
                text-white
                outline-none
                backdrop-blur-xl
                transition
                placeholder:text-zinc-600
                focus:border-purple-500/50
                focus:bg-white/[0.06]
                focus:ring-2
                focus:ring-purple-500/10
              "
            />
          </div>
          {/* Mobile / Desktop filter button */}
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/[0.05]
              px-5
              py-4
              text-sm
              font-semibold
              text-white
              backdrop-blur-xl
              transition
              hover:border-purple-400/30
              hover:bg-white/[0.08]
              lg:w-auto
            "
          >
            <SlidersHorizontal
              size={18}
              className="text-purple-400"
            />
            Filters
            {activeFilterCount > 0 && (
              <span
                className="
                  flex
                  h-6
                  min-w-6
                  items-center
                  justify-center
                  rounded-full
                  bg-purple-500
                  px-2
                  text-xs
                  font-black
                  text-white
                "
              >
                {activeFilterCount}
              </span>
            )}
          </button>
          {/* Desktop count */}
          <div
            className="
              hidden
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/[0.035]
              px-5
              py-4
              text-sm
              backdrop-blur-xl
              lg:flex
            "
          >
            <SlidersHorizontal
              size={17}
              className="text-purple-400"
            />
            <span className="text-zinc-400">
              Showing
            </span>
            <span className="font-bold text-white">
              {filteredProducts.length}
            </span>
            <span className="text-zinc-500">
              {filteredProducts.length === 1
                ? "listing"
                : "listings"}
            </span>
          </div>
        </div>
        {/* ===================================================
            MOBILE COUNT
        =================================================== */}
        <div
          className="
            mb-7
            flex
            items-center
            justify-between
            lg:hidden
          "
        >
          <div className="text-sm text-zinc-500">
            Showing{" "}
            <span className="font-bold text-white">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1
              ? "listing"
              : "listings"}
          </div>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-purple-300
              "
            >
              <RotateCcw size={15} />
              Clear
            </button>
          )}
        </div>
        {/* ===================================================
            CATEGORY FILTER
        =================================================== */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        {/* ===================================================
            ACTIVE FILTER CHIPS
        =================================================== */}
        {activeFilterCount > 0 && (
          <div
            className="
              mb-7
              mt-6
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <span
              className="
                mr-1
                text-xs
                font-semibold
                uppercase
                tracking-[0.14em]
                text-zinc-600
              "
            >
              Active:
            </span>
            {selectedCategory !== "All" && (
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-purple-400/20
                  bg-purple-500/10
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-purple-300
                "
              >
                {selectedCategory}
                <X size={13} />
              </button>
            )}
            {minPrice && (
              <button
                type="button"
                onClick={() => setMinPrice("")}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.05]
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-zinc-300
                "
              >
                Min ₹{Number(minPrice).toLocaleString("en-IN")}
                <X size={13} />
              </button>
            )}
            {maxPrice && (
              <button
                type="button"
                onClick={() => setMaxPrice("")}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.05]
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-zinc-300
                "
              >
                Max ₹{Number(maxPrice).toLocaleString("en-IN")}
                <X size={13} />
              </button>
            )}
            {location && (
              <button
                type="button"
                onClick={() => setLocation("")}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.05]
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-zinc-300
                "
              >
                {location}
                <X size={13} />
              </button>
            )}
            {condition !== "All" && (
              <button
                type="button"
                onClick={() => setCondition("All")}
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.05]
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  text-zinc-300
                "
              >
                {condition}
                <X size={13} />
              </button>
            )}
          </div>
        )}
        {/* ===================================================
            FILTER MODAL
        =================================================== */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed
                inset-0
                z-[100]
                flex
                items-end
                justify-center
                bg-black/70
                p-0
                backdrop-blur-sm
                sm:items-center
                sm:p-6
              "
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                  setIsFilterOpen(false);
                }
              }}
            >
              <motion.div
                initial={{
                  y: 60,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: 60,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  max-h-[90vh]
                  w-full
                  overflow-y-auto
                  rounded-t-[2rem]
                  border
                  border-white/10
                  bg-[#100d16]
                  p-6
                  shadow-2xl
                  sm:max-w-xl
                  sm:rounded-[2rem]
                "
              >
                {/* Header */}
                <div
                  className="
                    mb-7
                    flex
                    items-center
                    justify-between
                  "
                >
                  <div>
                    <p
                      className="
                        text-xs
                        font-bold
                        uppercase
                        tracking-[0.18em]
                        text-purple-400
                      "
                    >
                      Refine results
                    </p>
                    <h2
                      className="
                        mt-1
                        text-2xl
                        font-black
                        text-white
                      "
                    >
                      Filters
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/[0.05]
                      text-zinc-300
                      transition
                      hover:bg-white/[0.1]
                    "
                  >
                    <X size={19} />
                  </button>
                </div>
                <div className="space-y-6">
                  {/* CATEGORY */}
                  <div>
                    <label
                      className="
                        mb-3
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-zinc-300
                      "
                    >
                      <Tag
                        size={16}
                        className="text-purple-400"
                      />
                      Category
                    </label>
                    <div
                      className="
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        p-3
                      "
                    >
                      <select
                        value={selectedCategory}
                        onChange={(e) =>
                          setSelectedCategory(e.target.value)
                        }
                        className="
                          w-full
                          bg-transparent
                          px-2
                          py-2
                          text-sm
                          text-white
                          outline-none
                        "
                      >
                        <option
                          value="All"
                          className="bg-[#100d16]"
                        >
                          All Categories
                        </option>
                        {Array.from(
                          new Set(
                            products
                              .map(
                                (product) =>
                                  product.category
                              )
                              .filter(Boolean)
                          )
                        )
                          .sort((a, b) =>
                            String(a).localeCompare(
                              String(b)
                            )
                          )
                          .map((category) => (
                            <option
                              key={category}
                              value={category}
                              className="bg-[#100d16]"
                            >
                              {category}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  {/* PRICE */}
                  <div>
                    <label
                      className="
                        mb-3
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-zinc-300
                      "
                    >
                      <IndianRupee
                        size={16}
                        className="text-purple-400"
                      />
                      Price range
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="number"
                        min="0"
                        value={minPrice}
                        onChange={(e) =>
                          setMinPrice(e.target.value)
                        }
                        placeholder="Minimum"
                        className="
                          w-full
                          rounded-2xl
                          border
                          border-white/10
                          bg-white/[0.035]
                          px-4
                          py-3
                          text-white
                          outline-none
                          placeholder:text-zinc-600
                          focus:border-purple-500/40
                        "
                      />
                      <input
                        type="number"
                        min="0"
                        value={maxPrice}
                        onChange={(e) =>
                          setMaxPrice(e.target.value)
                        }
                        placeholder="Maximum"
                        className="
                          w-full
                          rounded-2xl
                          border
                          border-white/10
                          bg-white/[0.035]
                          px-4
                          py-3
                          text-white
                          outline-none
                          placeholder:text-zinc-600
                          focus:border-purple-500/40
                        "
                      />
                    </div>
                    {hasPriceError && (
                      <p className="mt-2 text-xs font-medium text-red-400">
                        Maximum price should be greater than minimum price.
                      </p>
                    )}
                  </div>
                  {/* LOCATION */}
                  <div>
                    <label
                      className="
                        mb-3
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-zinc-300
                      "
                    >
                      <MapPin
                        size={16}
                        className="text-purple-400"
                      />
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) =>
                        setLocation(e.target.value)
                      }
                      placeholder="Search by city or area..."
                      className="
                        w-full
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.035]
                        px-4
                        py-3
                        text-white
                        outline-none
                        placeholder:text-zinc-600
                        focus:border-purple-500/40
                      "
                    />
                  </div>
                  {/* CONDITION */}
                  <div>
                    <label
                      className="
                        mb-3
                        block
                        text-sm
                        font-semibold
                        text-zinc-300
                      "
                    >
                      Condition
                    </label>
                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-2
                        sm:grid-cols-5
                      "
                    >
                      {CONDITIONS.map((item) => {
                        const active =
                          condition === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() =>
                              setCondition(item)
                            }
                            className={`
                              rounded-xl
                              border
                              px-3
                              py-3
                              text-xs
                              font-semibold
                              transition
                              ${
                                active
                                  ? "border-purple-400/40 bg-purple-500/15 text-purple-300"
                                  : "border-white/10 bg-white/[0.035] text-zinc-400 hover:bg-white/[0.07]"
                              }
                            `}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* BUTTONS */}
                <div
                  className="
                    mt-8
                    grid
                    grid-cols-2
                    gap-3
                  "
                >
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      px-4
                      py-4
                      text-sm
                      font-bold
                      text-zinc-300
                      transition
                      hover:bg-white/[0.08]
                    "
                  >
                    <RotateCcw size={16} />
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    disabled={hasPriceError}
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      bg-purple-500
                      px-4
                      py-4
                      text-sm
                      font-black
                      text-white
                      transition
                      hover:bg-purple-400
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <Check size={16} />
                    Show {filteredProducts.length}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {/* ===================================================
            PRODUCTS
        =================================================== */}
        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {filteredProducts.map(
              (product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: Math.min(
                      index * 0.05,
                      0.3
                    ),
                  }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={`₹${Number(
                      product.price || 0
                    ).toLocaleString("en-IN")}`}
                    image={product.image}
                  />
                </motion.div>
              )
            )}
          </motion.div>
        ) : (
          /* =================================================
             EMPTY STATE
          ================================================= */
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              flex
              min-h-[350px]
              flex-col
              items-center
              justify-center
              rounded-[32px]
              border
              border-white/10
              bg-white/[0.025]
              px-6
              text-center
              backdrop-blur-xl
            "
          >
            <div
              className="
                mb-6
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-purple-400/20
                bg-purple-500/10
                text-purple-300
              "
            >
              <Search size={28} />
            </div>
            <h3
              className="
                text-2xl
                font-bold
                text-white
              "
            >
              No listings found
            </h3>
            <p
              className="
                mt-3
                max-w-md
                text-zinc-500
              "
            >
              {selectedCategory !== "All"
                ? `There are currently no ${selectedCategory} listings matching your filters.`
                : "Try changing your search or filters to find more products."}
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="
                mt-7
                rounded-full
                border
                border-purple-400/30
                bg-purple-500/10
                px-6
                py-3
                font-semibold
                text-purple-300
                transition
                hover:bg-purple-500
                hover:text-white
              "
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}