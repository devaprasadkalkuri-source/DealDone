"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Package,
  Phone,
  Mail,
  UserRound,
  MessageCircle,
  CalendarDays,
  ShoppingBag,
  Loader2,
} from "lucide-react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Seller {
  uid?: string;
  name?: string;
  displayName?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  location?: string;
  bio?: string;
  photoURL?: string;
  createdAt?: any;
}

interface Product {
  id: string;
  name?: string;
  price?: number;
  image?: string;
  images?: string[];
  category?: string;
  location?: string;
  description?: string;
  sellerId?: string;
  createdAt?: any;
}

function getDateValue(value: any): Date | null {
  if (!value) return null;

  if (typeof value?.toDate === "function") {
    return value.toDate();
  }

  if (value instanceof Date) {
    return value;
  }

  if (typeof value === "string" || typeof value === "number") {
    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }

  return null;
}

function formatMemberSince(value: any) {
  const date = getDateValue(value);

  if (!date) return "DealDone member";

  return `Member since ${date.toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  })}`;
}

export default function SellerProfilePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const sellerId = params?.id;

  const [seller, setSeller] = useState<Seller | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!sellerId) return;

    async function loadSeller() {
      try {
        setLoading(true);
        setError("");

        // ---------------------------------------------
        // LOAD SELLER PROFILE
        // ---------------------------------------------

        const sellerRef = doc(db, "users", sellerId);
        const sellerSnapshot = await getDoc(sellerRef);

        if (sellerSnapshot.exists()) {
          setSeller({
            uid: sellerSnapshot.id,
            ...(sellerSnapshot.data() as Seller),
          });
        } else {
          setSeller(null);
        }

        // ---------------------------------------------
        // LOAD SELLER'S REAL PRODUCTS
        // ---------------------------------------------

        setProductsLoading(true);

        const productsQuery = query(
          collection(db, "products"),
          where("sellerId", "==", sellerId)
        );

        const productsSnapshot = await getDocs(productsQuery);

        const sellerProducts: Product[] = productsSnapshot.docs.map(
          (productDoc) => ({
            id: productDoc.id,
            ...(productDoc.data() as Omit<Product, "id">),
          })
        );

        sellerProducts.sort((a, b) => {
          const dateA = getDateValue(a.createdAt)?.getTime() || 0;
          const dateB = getDateValue(b.createdAt)?.getTime() || 0;

          return dateB - dateA;
        });

        setProducts(sellerProducts);
      } catch (err) {
        console.error("Seller profile error:", err);
        setError("Unable to load this seller profile.");
      } finally {
        setLoading(false);
        setProductsLoading(false);
      }
    }

    loadSeller();
  }, [sellerId]);

  // ---------------------------------------------------
  // LOADING
  // ---------------------------------------------------

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f6f1] text-[#0a3d2e]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex items-center gap-3 rounded-full border border-[#dfe6d4] bg-white px-6 py-4 shadow-sm">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-semibold">
              Loading seller...
            </span>
          </div>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------
  // ERROR
  // ---------------------------------------------------

  if (error) {
    return (
      <main className="min-h-screen bg-[#f5f6f1] px-5 py-10 text-[#0a3d2e]">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-[32px] border border-[#dfe6d4] bg-white p-10 text-center shadow-[0_25px_80px_rgba(10,61,46,0.08)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf3d5]">
              <UserRound className="h-7 w-7 text-[#0a3d2e]" />
            </div>

            <h1 className="mt-6 text-2xl font-black">
              Something went wrong
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              {error}
            </p>

            <button
              onClick={() => router.back()}
              className="mt-7 rounded-full bg-[#0a3d2e] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------
  // SELLER NOT FOUND
  // ---------------------------------------------------

  if (!seller) {
    return (
      <main className="min-h-screen bg-[#f5f6f1] px-5 py-10 text-[#0a3d2e]">
        <div className="mx-auto flex min-h-[70vh] max-w-xl items-center justify-center">
          <div className="w-full rounded-[32px] border border-[#dfe6d4] bg-white p-10 text-center shadow-[0_25px_80px_rgba(10,61,46,0.08)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf3d5]">
              <UserRound className="h-7 w-7 text-[#0a3d2e]" />
            </div>

            <h1 className="mt-6 text-2xl font-black">
              Seller not found
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              This seller profile is not available.
            </p>

            <button
              onClick={() => router.back()}
              className="mt-7 rounded-full bg-[#0a3d2e] px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------
  // SELLER DATA
  // ---------------------------------------------------

  const sellerName =
    seller.name ||
    seller.displayName ||
    "DealDone Seller";

  const sellerEmail = seller.email || "";

  const sellerPhone =
    seller.phone ||
    seller.phoneNumber ||
    "";

  const sellerLocation =
    seller.location ||
    "";

  const sellerBio =
    seller.bio ||
    "";

  const sellerInitial =
    sellerName.trim().charAt(0).toUpperCase() || "D";

  // ---------------------------------------------------
  // WHATSAPP
  // ---------------------------------------------------

  const cleanPhone = sellerPhone.replace(/\D/g, "");

  const whatsappNumber =
    cleanPhone.length === 10
      ? `91${cleanPhone}`
      : cleanPhone;

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : "";

  // ---------------------------------------------------
  // PAGE
  // ---------------------------------------------------

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f6f1] text-[#0a3d2e]">
      {/* =================================================
          BACKGROUND
      ================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#c9e265]/20 blur-[110px]" />

        <div className="absolute -right-40 top-[35%] h-[500px] w-[500px] rounded-full bg-[#b9d9c5]/30 blur-[120px]" />

        <div className="absolute bottom-[-180px] left-[35%] h-[450px] w-[450px] rounded-full bg-[#dce9b0]/25 blur-[120px]" />
      </div>

      {/* =================================================
          CONTENT
      ================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">

        {/* =================================================
            TOP BAR
        ================================================== */}

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="group flex items-center gap-2 rounded-full border border-[#dce4d4] bg-white/80 px-4 py-2.5 text-sm font-bold text-[#0a3d2e] shadow-sm backdrop-blur-xl transition hover:-translate-x-0.5 hover:bg-white"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-0.5"
            />
            Back
          </button>

          <Link
            href="/"
            className="hidden rounded-full border border-[#dce4d4] bg-white/80 px-4 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-[#0a3d2e] shadow-sm backdrop-blur-xl transition hover:bg-white sm:block"
          >
            DealDone
          </Link>
        </div>

        {/* =================================================
            PROFILE HERO
        ================================================== */}

        <section className="mt-6 overflow-hidden rounded-[34px] border border-[#dce5d7] bg-white shadow-[0_30px_100px_rgba(10,61,46,0.10)]">

          {/* Cover */}

          <div className="relative h-40 overflow-hidden bg-[#0a3d2e] sm:h-52">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(201,226,101,0.38),transparent_32%),radial-gradient(circle_at_85%_80%,rgba(255,255,255,0.10),transparent_35%)]" />

            <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full border border-[#c9e265]/20" />

            <div className="absolute -bottom-32 left-[35%] h-80 w-80 rounded-full border border-white/10" />

            <div className="absolute bottom-5 left-6 text-[9px] font-black uppercase tracking-[0.3em] text-[#c9e265]/70 sm:left-10">
              DealDone Seller
            </div>
          </div>

          {/* Profile body */}

          <div className="relative px-5 pb-7 sm:px-10 sm:pb-10">

            {/* Avatar */}

            <div className="-mt-14 flex flex-col gap-6 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">

                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-[30px] border-[6px] border-white bg-[#c9e265] text-4xl font-black text-[#0a3d2e] shadow-[0_20px_50px_rgba(10,61,46,0.20)] sm:h-32 sm:w-32 sm:rounded-[34px] sm:text-5xl">
                  {seller.photoURL ? (
                    <img
                      src={seller.photoURL}
                      alt={sellerName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    sellerInitial
                  )}
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="max-w-full break-words text-3xl font-black tracking-[-0.04em] text-[#0a3d2e] sm:text-4xl">
                      {sellerName}
                    </h1>

                    <span className="rounded-full bg-[#edf3d5] px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] text-[#0a3d2e]">
                      Seller
                    </span>
                  </div>

                  {sellerLocation && (
                    <div className="mt-2 flex min-w-0 items-center gap-1.5 text-sm text-zinc-500">
                      <MapPin
                        size={15}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        {sellerLocation}
                      </span>
                    </div>
                  )}

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-zinc-400">
                    <CalendarDays
                      size={14}
                      className="shrink-0"
                    />

                    {formatMemberSince(seller.createdAt)}
                  </div>
                </div>
              </div>

              {/* Actions */}

              <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">

                {sellerPhone && whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#0a3d2e] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0a3d2e]/15 transition hover:-translate-y-0.5 hover:bg-[#082f24]"
                  >
                    <MessageCircle size={17} />
                    Contact Seller
                  </a>
                )}

                {sellerEmail && (
                  <a
                    href={`mailto:${sellerEmail}`}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-[#dce4d4] bg-white px-5 py-3.5 text-sm font-bold text-[#0a3d2e] transition hover:bg-[#f7f9f4]"
                  >
                    <Mail size={17} />
                    Email
                  </a>
                )}
              </div>
            </div>

            {/* Bio */}

            {sellerBio && (
              <div className="mt-8 max-w-3xl">
                <div className="text-[9px] font-black uppercase tracking-[0.25em] text-[#0a3d2e]/45">
                  About the seller
                </div>

                <p className="mt-3 break-words text-sm leading-7 text-zinc-600 sm:text-base">
                  {sellerBio}
                </p>
              </div>
            )}

            {/* Stats */}

            <div className="mt-8 grid grid-cols-2 overflow-hidden rounded-[24px] border border-[#e3e8df] bg-[#f8faf5] sm:grid-cols-3">

              <div className="border-b border-[#e3e8df] p-5 sm:border-b-0 sm:border-r">
                <Package className="h-5 w-5 text-[#0a3d2e]" />

                <div className="mt-3 text-2xl font-black text-[#0a3d2e]">
                  {products.length}
                </div>

                <div className="mt-1 text-xs font-medium text-zinc-500">
                  Active listings
                </div>
              </div>

              <div className="border-b border-[#e3e8df] p-5 sm:border-b-0 sm:border-r">
                <ShoppingBag className="h-5 w-5 text-[#0a3d2e]" />

                <div className="mt-3 text-2xl font-black text-[#0a3d2e]">
                  {products.length}
                </div>

                <div className="mt-1 text-xs font-medium text-zinc-500">
                  Products listed
                </div>
              </div>

              <div className="col-span-2 p-5 sm:col-span-1">
                <MapPin className="h-5 w-5 text-[#0a3d2e]" />

                <div className="mt-3 truncate text-base font-black text-[#0a3d2e]">
                  {sellerLocation || "Location not added"}
                </div>

                <div className="mt-1 text-xs font-medium text-zinc-500">
                  Seller location
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =================================================
            LISTINGS HEADER
        ================================================== */}

        <section className="mt-14">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.28em] text-[#0a3d2e]/45">
                Marketplace
              </div>

              <h2 className="mt-2 break-words text-3xl font-black tracking-[-0.04em] text-[#0a3d2e] sm:text-4xl">
                {sellerName}'s listings
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Products currently listed by this seller on DealDone.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-full border border-[#dce4d4] bg-white px-4 py-2.5 text-xs font-bold text-zinc-600 shadow-sm">
              <Package size={14} />
              {products.length}{" "}
              {products.length === 1 ? "listing" : "listings"}
            </div>
          </div>

          {/* =================================================
              PRODUCTS
          ================================================== */}

          {productsLoading ? (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-[28px] border border-[#e1e7dc] bg-white"
                >
                  <div className="h-64 animate-pulse bg-[#e9ede5]" />

                  <div className="space-y-3 p-5">
                    <div className="h-4 w-3/4 animate-pulse rounded-full bg-[#e9ede5]" />
                    <div className="h-6 w-1/2 animate-pulse rounded-full bg-[#e9ede5]" />
                    <div className="h-3 w-1/3 animate-pulse rounded-full bg-[#e9ede5]" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="mt-8 rounded-[30px] border border-dashed border-[#ccd7c7] bg-white/70 px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#edf3d5]">
                <Package className="h-7 w-7 text-[#0a3d2e]" />
              </div>

              <h3 className="mt-5 text-xl font-black text-[#0a3d2e]">
                No active listings
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
                This seller hasn't listed any products yet.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {products.map((product) => {
                const image =
                  product.image ||
                  product.images?.[0] ||
                  "";

                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group min-w-0 overflow-hidden rounded-[28px] border border-[#e0e6dc] bg-white shadow-[0_15px_50px_rgba(10,61,46,0.06)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_25px_70px_rgba(10,61,46,0.12)]"
                  >
                    {/* IMAGE */}

                    <div className="relative h-64 overflow-hidden bg-[#eef1eb]">

                      {image ? (
                        <img
                          src={image}
                          alt={product.name || "Product"}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-zinc-400">
                          <Package size={38} />
                        </div>
                      )}

                      {/* Image overlay */}

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />

                      {/* Category */}

                      {product.category && (
                        <div className="absolute left-4 top-4 max-w-[75%] truncate rounded-full border border-white/70 bg-white/90 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.13em] text-[#0a3d2e] shadow-sm backdrop-blur-md">
                          {product.category}
                        </div>
                      )}

                      {/* Arrow */}

                      <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-[#0a3d2e] text-white opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight size={17} />
                      </div>
                    </div>

                    {/* DETAILS */}

                    <div className="p-5">

                      <h3 className="truncate text-base font-black text-zinc-900 transition-colors group-hover:text-[#0a3d2e]">
                        {product.name || "Untitled product"}
                      </h3>

                      <div className="mt-2 text-xl font-black text-[#0a3d2e]">
                        ₹
                        {Number(product.price || 0).toLocaleString(
                          "en-IN"
                        )}
                      </div>

                      {product.location && (
                        <div className="mt-4 flex min-w-0 items-center gap-1.5 text-xs text-zinc-400">
                          <MapPin
                            size={13}
                            className="shrink-0"
                          />

                          <span className="truncate">
                            {product.location}
                          </span>
                        </div>
                      )}

                      <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
                        <span className="text-xs font-bold text-zinc-500">
                          View deal
                        </span>

                        <ArrowUpRight
                          size={15}
                          className="text-[#0a3d2e] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </div>
                    </div>

                    {/* Bottom line */}

                    <div className="h-[3px] w-0 bg-[#c9e265] transition-all duration-500 group-hover:w-full" />
                  </Link>
                );
              })}

            </div>
          )}
        </section>

        {/* =================================================
            SELLER CONTACT CARD
        ================================================== */}

        <section className="mt-16 overflow-hidden rounded-[32px] bg-[#0a3d2e] p-7 text-white shadow-[0_30px_90px_rgba(10,61,46,0.18)] sm:p-10">

          <div className="relative overflow-hidden">

            <div className="pointer-events-none absolute -right-20 -top-32 h-72 w-72 rounded-full bg-[#c9e265]/10 blur-[70px]" />

            <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

              <div className="max-w-2xl">
                <div className="flex items-center gap-2 text-[#c9e265]">
                  <UserRound size={16} />

                  <span className="text-[10px] font-black uppercase tracking-[0.25em]">
                    Seller profile
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
                  Interested in something from {sellerName}?
                </h2>

                <p className="mt-3 text-sm leading-6 text-white/60">
                  Connect directly with the seller and discuss the product,
                  price, availability, and pickup details.
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

                {sellerPhone && whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-[#c9e265] px-6 py-3.5 text-sm font-black text-[#0a3d2e] transition hover:-translate-y-0.5 hover:bg-[#d6ed82]"
                  >
                    <MessageCircle size={17} />
                    WhatsApp
                  </a>
                )}

                {sellerPhone && (
                  <a
                    href={`tel:${sellerPhone}`}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/15"
                  >
                    <Phone size={17} />
                    Call
                  </a>
                )}

              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}