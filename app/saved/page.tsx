"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
}

export default function SavedProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // ==========================================
  // LOAD SAVED PRODUCTS
  // ==========================================

  useEffect(() => {
    async function loadSavedProducts() {
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const savedRef = collection(
          db,
          "users",
          user.uid,
          "savedProducts"
        );

        const savedSnapshot = await getDocs(savedRef);

        const savedProducts: Product[] = [];

        for (const savedDoc of savedSnapshot.docs) {
          const productId = savedDoc.id;

          const productRef = doc(
            db,
            "products",
            productId
          );

          const productSnapshot = await getDoc(productRef);

          if (productSnapshot.exists()) {
            savedProducts.push({
              id: productSnapshot.id,
              ...(productSnapshot.data() as Omit<
                Product,
                "id"
              >),
            });
          }
        }

        setProducts(savedProducts);
      } catch (error) {
        console.error(
          "Error loading saved products:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadSavedProducts();
  }, []);

  // ==========================================
  // REMOVE SAVED PRODUCT
  // ==========================================

  const handleRemove = async (
    productId: string
  ) => {
    const user = auth.currentUser;

    if (!user) {
      return;
    }

    try {
      setRemovingId(productId);

      const savedRef = doc(
        db,
        "users",
        user.uid,
        "savedProducts",
        productId
      );

      await deleteDoc(savedRef);

      // Remove from screen immediately
      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== productId
        )
      );
    } catch (error) {
      console.error(
        "Error removing saved product:",
        error
      );

      alert(
        "❌ Could not remove saved product."
      );
    } finally {
      setRemovingId(null);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-lg text-zinc-400">
            Loading saved products...
          </p>
        </div>
      </main>
    );
  }

  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!auth.currentUser) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-6 text-6xl">
            ❤️
          </div>

          <h1 className="text-4xl font-bold">
            Login to see your saved products
          </h1>

          <p className="mt-4 text-zinc-400">
            Save products you like and find them
            here later.
          </p>

          <Link
            href="/auth/login"
            className="mt-8 inline-block rounded-2xl bg-orange-500 px-8 py-4 font-bold text-white transition hover:bg-orange-600"
          >
            Login
          </Link>

        </div>
      </main>
    );
  }

  // ==========================================
  // NO SAVED PRODUCTS
  // ==========================================

  if (products.length === 0) {
    return (
      <main className="min-h-screen px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-6 text-6xl">
            🤍
          </div>

          <h1 className="text-4xl font-bold">
            No Saved Products
          </h1>

          <p className="mt-4 text-zinc-400">
            Products you save will appear here.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-2xl bg-orange-500 px-8 py-4 font-bold text-white transition hover:bg-orange-600"
          >
            Browse Products
          </Link>

        </div>
      </main>
    );
  }

  // ==========================================
  // SAVED PRODUCTS
  // ==========================================

  return (
    <main className="min-h-screen px-6 py-12">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10">

          <p className="mb-2 text-orange-400">
            ❤️ Your Collection
          </p>

          <h1 className="text-4xl font-extrabold">
            Saved Products
          </h1>

          <p className="mt-2 text-zinc-400">
            {products.length} product
            {products.length !== 1 ? "s" : ""} saved
          </p>

        </div>

        {/* PRODUCTS GRID */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {products.map((product) => (

            <div
              key={product.id}
              className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition duration-300 hover:-translate-y-1 hover:border-orange-500"
            >

              {/* IMAGE */}

              <Link
                href={`/product/${product.id}`}
              >
                <div className="relative flex h-64 items-center justify-center bg-zinc-950 p-4">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />

                  {/* REMOVE BUTTON */}

                  <button
                    type="button"
                    onClick={() =>
                      handleRemove(product.id)
                    }
                    disabled={
                      removingId === product.id
                    }
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-xl backdrop-blur transition hover:scale-110 hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Remove saved product"
                  >
                    {removingId === product.id
                      ? "..."
                      : "❤️"}
                  </button>

                </div>
              </Link>

              {/* INFO */}

              <div className="p-5">

                {product.category && (
                  <p className="mb-2 text-sm text-orange-400">
                    {product.category}
                  </p>
                )}

                <Link
                  href={`/product/${product.id}`}
                >
                  <h2 className="line-clamp-1 text-xl font-bold hover:text-orange-400">
                    {product.name}
                  </h2>
                </Link>

                <p className="mt-3 text-2xl font-black text-green-400">
                  ₹{" "}
                  {product.price?.toLocaleString()}
                </p>

                <Link
                  href={`/product/${product.id}`}
                  className="mt-5 block rounded-xl border border-zinc-700 py-3 text-center font-semibold transition hover:border-orange-500 hover:bg-zinc-800"
                >
                  View Product →
                </Link>

                {/* REMOVE */}

                <button
                  type="button"
                  onClick={() =>
                    handleRemove(product.id)
                  }
                  disabled={
                    removingId === product.id
                  }
                  className="mt-3 w-full rounded-xl border border-red-900/50 py-3 font-semibold text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {removingId === product.id
                    ? "Removing..."
                    : "❤️ Remove from Saved"}
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}